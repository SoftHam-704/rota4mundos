// Agente do Instagram do Rota 4 Mundos.
//
// gerarRascunhos(): transforma reportagens novas da IRIS em rascunhos (arte + legenda revisada) e
//   completa a fila com a série "Cidades da Rota" e os infográficos nos dias sem notícia.
// publicarProximo(): publica o próximo post APROVADO por um humano no admin. Nada vai ao ar sem aprovação.
//
// Falha nunca é silenciosa: erro de geração volta no resumo e é logado; erro de publicação fica no
// post (status FAILED + errorMessage), visível na tela Publicações.
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import logger from "../../config/logger.js";
import { gerarLegenda } from "./caption.service.js";
import { artReportagem, artCidade, artInfografico } from "./art/render.js";
import { CIDADES, urlCidade, infograficoCidade } from "./content/cidades.js";
import * as ig from "./instagram.client.js";

const ASSETS = path.resolve(import.meta.dirname, "..", "..", "..", "assets", "social");
const ALVO_FILA = 4;          // rascunhos + aprovados esperando; abaixo disso entra conteúdo da série
const MAX_REPORTAGENS = 3;     // por rodada
const JANELA_REPORTAGEM_DIAS = 3;

const textoPuro = (html) => String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

async function hashtagsRecentes() {
    const ultimos = await prisma.socialPost.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { caption: true } });
    return [...new Set(ultimos.flatMap((p) => p.caption.match(/#\w+/g) || []))];
}

async function salvarArte(id, jpeg) {
    const dir = path.join(env.UPLOAD_DIR, "social");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${id}.jpg`), jpeg);
    return `${env.APP_BASE_URL}/uploads/social/${id}.jpg`;
}

/** Cria um rascunho a partir de uma origem. Retorna null se a origem já virou post. */
async function criarRascunho({ kind, sourceKey, titulo, material, url, articleId, desenhar }) {
    if (await prisma.socialPost.findFirst({ where: { platform: "INSTAGRAM", sourceKey } })) return null;

    const legenda = await gerarLegenda({ kind, titulo, material, url, hashtagsRecentes: await hashtagsRecentes() });
    const id = randomUUID();
    const imageUrl = await salvarArte(id, await desenhar(legenda));

    return prisma.socialPost.create({
        data: {
            id, platform: "INSTAGRAM", kind, sourceKey, articleId: articleId || null,
            caption: legenda.caption, reviewNote: legenda.reviewNote, imageUrl, status: "DRAFT",
        },
    });
}

const deReportagem = (a) => criarRascunho({
    kind: "REPORTAGEM",
    sourceKey: `artigo:${a.id}`,
    articleId: a.id,
    titulo: a.title,
    url: `https://www.rota4mundos.com.br/noticias/${a.slug}`,
    material: `${a.title}\n\n${a.excerpt || ""}\n\n${textoPuro(a.content)}`,
    desenhar: (l) => artReportagem({ titulo: a.title, resumo: l.linhaArte, categoria: l.categoria }),
});

const materialCidade = (c) => fs.readFileSync(path.join(ASSETS, "cidades", `${c.slug}.txt`), "utf8");

const deCidade = (c) => criarRascunho({
    kind: "CIDADE",
    sourceKey: `cidade:${c.slug}`,
    titulo: `${c.nome} (${c.pais}) — série Cidades da Rota, ${CIDADES.indexOf(c) + 1} de ${CIDADES.length}`,
    url: urlCidade(c.slug),
    material: materialCidade(c),
    desenhar: () => artCidade({ ...c, numero: CIDADES.indexOf(c) + 1, total: CIDADES.length }),
});

const deInfografico = (c) => criarRascunho({
    kind: "INFOGRAFICO",
    sourceKey: `infografico:${c.slug}`,
    titulo: `Infográfico de ${c.nome} (${c.pais})`,
    url: urlCidade(c.slug),
    material: `Post sobre o infográfico ilustrado da cidade, publicado no site.\n\n${materialCidade(c)}`,
    desenhar: (l) => artInfografico({ titulo: c.nome, subtitulo: l.linhaArte, arquivo: infograficoCidade(c.slug) }),
});

// `criadosAgora`: o Pgpool manda leituras para a réplica, que pode ainda não ter o post recém-gravado;
// dentro de uma rodada o agente lembra o que criou em vez de depender da releitura.
async function proximaDaSerie(criadosAgora) {
    const usados = new Set([...(await prisma.socialPost.findMany({
        where: { platform: "INSTAGRAM", kind: { in: ["CIDADE", "INFOGRAFICO"] } }, select: { sourceKey: true },
    })).map((p) => p.sourceKey), ...criadosAgora]);
    const cidade = CIDADES.find((c) => !usados.has(`cidade:${c.slug}`));
    const info = CIDADES.find((c) => fs.existsSync(path.join(ASSETS, "infograficos", infograficoCidade(c.slug))) && !usados.has(`infografico:${c.slug}`));
    const nCidades = [...usados].filter((k) => k.startsWith("cidade:")).length;
    const nInfos = [...usados].filter((k) => k.startsWith("infografico:")).length;
    // alterna inspirar (cidade) e educar (infográfico); a cidade sai antes do infográfico dela
    if (cidade && (nCidades <= nInfos || !info)) return { sourceKey: `cidade:${cidade.slug}`, criar: () => deCidade(cidade) };
    if (info) return { sourceKey: `infografico:${info.slug}`, criar: () => deInfografico(info) };
    return null;
}

export async function gerarRascunhos() {
    const resumo = { reportagens: 0, serie: 0, erros: [] };

    const desde = new Date(Date.now() - JANELA_REPORTAGEM_DIAS * 86400_000);
    const jaPostados = (await prisma.socialPost.findMany({ where: { kind: "REPORTAGEM" }, select: { articleId: true } })).map((p) => p.articleId).filter(Boolean);
    const novas = await prisma.article.findMany({
        where: { status: "PUBLISHED", createdAt: { gte: desde }, id: { notIn: jaPostados } },
        orderBy: { createdAt: "desc" },
        take: MAX_REPORTAGENS,
    });
    for (const a of novas) {
        try { if (await deReportagem(a)) resumo.reportagens++; }
        catch (e) { resumo.erros.push(`reportagem "${a.title}": ${e.message}`); }
    }

    const criadosAgora = new Set();
    let fila = await prisma.socialPost.count({ where: { platform: "INSTAGRAM", status: { in: ["DRAFT", "APPROVED"] } } }) + resumo.reportagens;
    while (fila < ALVO_FILA) {
        const proximo = await proximaDaSerie(criadosAgora);
        if (!proximo) break;
        try {
            const post = await proximo.criar();
            criadosAgora.add(proximo.sourceKey);
            if (post) { resumo.serie++; fila++; }
        } catch (e) { resumo.erros.push(`série: ${e.message}`); break; }
    }

    if (resumo.erros.length) logger.error("Instagram: erros ao gerar rascunhos", { erros: resumo.erros });
    logger.info(`Instagram: rascunhos gerados — ${resumo.reportagens} de reportagem, ${resumo.serie} da série`);
    return resumo;
}

/** Publica um post aprovado. Sem id, pega o próximo da fila (reportagem primeiro, depois o mais antigo aprovado). */
export async function publicarProximo(id) {
    await ig.renovarTokenSePreciso().catch((e) => logger.error("Instagram: falha ao renovar token", { erro: e.message }));

    const post = id
        ? await prisma.socialPost.findUnique({ where: { id } })
        : (await prisma.socialPost.findMany({
            where: { platform: "INSTAGRAM", status: "APPROVED", OR: [{ scheduledFor: null }, { scheduledFor: { lte: new Date() } }] },
            orderBy: [{ approvedAt: "asc" }],
        })).sort((a, b) => (a.kind === "REPORTAGEM" ? 0 : 1) - (b.kind === "REPORTAGEM" ? 0 : 1))[0];
    if (!post) return { publicado: false, motivo: "nenhum post aprovado na fila" };
    // O status lido pode vir da réplica (atrasada); quem decide é a reserva atômica abaixo, feita no principal.

    const { usado, limite } = await ig.cota();
    if (usado >= limite) return { publicado: false, motivo: `cota diária da Meta esgotada (${usado}/${limite})` };

    // Reserva atômica: só um ciclo consegue mover APPROVED → PUBLISHING
    const reserva = await prisma.socialPost.updateMany({
        where: { id: post.id, status: "APPROVED" },
        data: { status: "PUBLISHING", attempts: { increment: 1 }, errorMessage: null },
    });
    if (reserva.count === 0) return { publicado: false, motivo: "o post não está aprovado (ou já foi pego por outro ciclo)" };

    const inicio = new Date();
    try {
        const containerId = await ig.criarConteiner({ imageUrl: post.imageUrl, caption: post.caption });
        await prisma.socialPost.update({ where: { id: post.id }, data: { containerId } });
        await ig.aguardarConteiner(containerId);
        const r = await ig.publicarConteiner({ containerId, caption: post.caption, desde: inicio });
        await prisma.socialPost.update({
            where: { id: post.id },
            data: { status: "PUBLISHED", externalId: r.externalId, permalink: r.permalink, publishedAt: r.publishedAt },
        });
        logger.info(`Instagram: publicado ${r.permalink}`);
        return { publicado: true, permalink: r.permalink };
    } catch (e) {
        await prisma.socialPost.update({ where: { id: post.id }, data: { status: "FAILED", errorMessage: e.message } });
        logger.error("Instagram: falha ao publicar", { postId: post.id, erro: e.message });
        return { publicado: false, motivo: e.message };
    }
}

export async function statusAgente() {
    const porStatus = Object.fromEntries((await prisma.socialPost.groupBy({
        by: ["status"], where: { platform: "INSTAGRAM" }, _count: true,
    })).map((g) => [g.status, g._count]));
    const renovadoEm = (await prisma.siteSetting.findUnique({ where: { key: "ig_token_renovado_em" } }))?.value || null;

    let conta = null, cota = null, erroConta = null;
    try { conta = await ig.conta(); cota = await ig.cota(); }
    catch (e) { erroConta = e.message; }

    return { conta, cota, erroConta, tokenRenovadoEm: renovadoEm, porStatus, horarios: ["12:00", "19:00"] };
}
