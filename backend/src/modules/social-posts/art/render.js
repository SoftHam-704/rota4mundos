// Gerador das artes do Instagram (1080x1350, 4:5) com a identidade do portal:
// marinho #0A1628/#0B2E4F, dourado #F4A261, Playfair Display nos títulos, Inter no texto
// e as faixas nas cores das quatro bandeiras do logo.
//
// Satori monta o layout com as fontes embutidas (o servidor não tem fontes instaladas)
// e o Resvg rasteriza; o resultado sai em JPEG porque a API do Instagram só aceita JPEG.
import fs from "fs";
import path from "path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const ASSETS = path.resolve(import.meta.dirname, "..", "..", "..", "..", "assets");
const W = 1080;
const H = 1350;

const C = {
    navy: "#0A1628",
    navy2: "#0B2E4F",
    gold: "#F4A261",
    white: "#FFFFFF",
    muted: "rgba(255,255,255,0.78)",
};
// Uma faixa por país, na ordem da rota: Brasil, Paraguai, Argentina, Chile
const BANDEIRAS = ["#009C3B", "#D52B1E", "#74ACDF", "#0039A6"];

// Sistema visual (princípios do Power-Design): tamanhos de uma única escala modular 1.333,
// no máximo 4 tamanhos por peça, espaçamentos na grade de 8 e o dourado como único destaque.
const T = { s: 24, m: 32, l: 42, xl: 56, xxl: 75, hero: 100, mega: 133 };
const G = { xs: 8, s: 16, m: 24, l: 32, xl: 48, xxl: 64 };

const font = (file) => fs.readFileSync(path.join(ASSETS, "fonts", file));
const FONTS = [
    { name: "Playfair", data: font("PlayfairDisplay-Bold.ttf"), weight: 700 },
    { name: "Playfair", data: font("PlayfairDisplay-ExtraBold.ttf"), weight: 800 },
    { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400 },
    { name: "Inter", data: font("Inter-SemiBold.ttf"), weight: 600 },
    { name: "Inter", data: font("Inter-ExtraBold.ttf"), weight: 800 },
];

const dataUri = (file) => {
    const ext = path.extname(file).slice(1).replace("jpg", "jpeg");
    return `data:image/${ext};base64,${fs.readFileSync(file).toString("base64")}`;
};
const LOGO = dataUri(path.join(ASSETS, "social", "logo-icon.png"));
const PONTE = path.join(ASSETS, "social", "ponte.jpg");

// Elemento no formato que o Satori aceita, sem JSX
const h = (type, style, ...children) => ({
    type,
    props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c != null && c !== false) },
});
const img = (src, style) => ({ type: "img", props: { src, style } });

const clamp = (text, max) => {
    const t = String(text || "").replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    // prefere terminar numa frase inteira; só corta no meio se a 1ª frase já não couber
    // fim de frase = pontuação seguida de espaço (não confunde "1.800" nem "R$ 2,5 mi.")
    const frases = t.split(/(?<=[.!?])\s+/);
    let acc = "";
    for (const f of frases) {
        const junto = acc ? `${acc} ${f}` : f;
        if (junto.length > max) break;
        acc = junto;
    }
    return acc || t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
};

// ---------- peças comuns ----------

const cabecalho = () =>
    h("div", { alignItems: "center", gap: G.m },
        h("div", { width: 88, height: 88, borderRadius: 44, background: C.white, alignItems: "center", justifyContent: "center" },
            img(LOGO, { width: 64, height: 64 })),
        h("div", { flexDirection: "column", gap: G.xs },
            h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 4, color: C.white }, "ROTA 4 MUNDOS"),
            h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.s, color: C.muted }, "Rota Bioceânica · Brasil · Paraguai · Argentina · Chile")));

const faixaBandeiras = (altura = G.xs) =>
    h("div", { width: "100%", height: altura }, BANDEIRAS.map((cor) => h("div", { flex: 1, height: altura, background: cor })));

// A etiqueta é o único elemento em dourado da peça
const etiqueta = (texto) =>
    h("div", { alignSelf: "flex-start", background: C.gold, color: C.navy, fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 3, padding: `${G.xs}px ${G.m}px`, borderRadius: 6 },
        texto.toUpperCase());

const rodape = (chamada) =>
    h("div", { flexDirection: "column", gap: G.m },
        faixaBandeiras(),
        h("div", { justifyContent: "space-between", alignItems: "center" },
            h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, color: C.white }, chamada),
            h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, color: C.muted }, "rota4mundos.com.br")));

// Foto de fundo com degradê escuro embaixo, onde fica o texto.
// Ilustração (não foto real) leva o selo "Imagem ilustrativa" no canto superior direito.
// `foto`: caminho de arquivo ou data URI (imagem gerada pelo Gemini)
const comFoto = (foto, conteudo, ilustrativa = foto === PONTE) =>
    h("div", { width: W, height: H, position: "relative", background: C.navy },
        img(foto.startsWith("data:") ? foto : dataUri(foto), { position: "absolute", top: 0, left: 0, width: W, height: H, objectFit: "cover" }),
        h("div", {
            position: "absolute", top: 0, left: 0, width: W, height: H,
            backgroundImage: "linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.05) 22%, rgba(10,22,40,0.35) 48%, rgba(10,22,40,0.92) 70%, rgba(10,22,40,0.98) 100%)",
        }),
        h("div", { position: "absolute", top: 0, left: 0, width: W, height: H, flexDirection: "column", justifyContent: "space-between", padding: G.xxl },
            h("div", { justifyContent: "space-between", alignItems: "flex-start" },
                cabecalho(),
                ilustrativa ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.s, color: C.muted, background: "rgba(10,22,40,0.55)", padding: `${G.xs}px ${G.s}px`, borderRadius: 6 }, "Imagem ilustrativa") : null),
            conteudo));

async function rasterizar(arvore) {
    const svg = await satori(arvore, { width: W, height: H, fonts: FONTS });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
    return sharp(png).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
}

// Fotos de cidade que são ILUSTRAÇÃO (geradas por IA) até chegar a foto oficial — levam o selo.
// Porto Murtinho: ilustração desde 06/10/2026; o Hamilton traz a foto oficial da visita de 09/10.
const ILUSTRATIVAS = new Set(["porto_murtinho"]);
const ilustrativa = (foto) => ILUSTRATIVAS.has(foto);

export const fotoCidade = (foto) => {
    const f = foto && path.join(ASSETS, "social", "cities", `${foto}.jpg`);
    return f && fs.existsSync(f) ? f : PONTE;
};

// ---------- os três modelos ----------

/**
 * Reportagem da IRIS: categoria, título e resumo sobre um fundo.
 * `fundo` (Buffer) é a imagem gerada para o tema — leva o selo "Imagem ilustrativa"; sem ela,
 * usa a ponte ao amanhecer (também ilustração) ou a `foto` informada.
 */
export async function artReportagem({ titulo, resumo, categoria = "Notícia", foto, fundo, chamada = "Reportagem completa no link da bio" }) {
    const fonte = fundo
        ? `data:image/jpeg;base64,${(await sharp(fundo).resize(W, H, { fit: "cover", position: "attention" }).jpeg({ quality: 85, mozjpeg: true }).toBuffer()).toString("base64")}`
        : fotoCidade(foto);
    const t = clamp(titulo, 110);
    const tamanho = t.length > 60 ? T.xl : T.xxl;
    return rasterizar(comFoto(fonte,
        h("div", { flexDirection: "column", gap: G.l },
            etiqueta(categoria),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: tamanho, lineHeight: 1.12, color: C.white }, t),
            resumo ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, lineHeight: 1.45, color: C.muted }, clamp(resumo, 160)) : null,
            rodape(chamada)), Boolean(fundo) || fonte === PONTE || ilustrativa(foto)));
}

/** Série das cidades: número na série, nome grande, país e a frase da página da cidade. */
export function artCidade({ nome, pais, frase, foto, numero, total }) {
    const corPais = { Brasil: BANDEIRAS[0], Paraguai: BANDEIRAS[1], Argentina: BANDEIRAS[2], Chile: BANDEIRAS[3] }[pais] || C.white;
    return rasterizar(comFoto(fotoCidade(foto),
        h("div", { flexDirection: "column", gap: G.m },
            h("div", { alignItems: "center", gap: G.m },
                etiqueta("Cidades da Rota"),
                numero ? h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, color: C.muted, letterSpacing: 2 }, `${String(numero).padStart(2, "0")} / ${total}`) : null),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: nome.length > 12 ? T.hero : T.mega, lineHeight: 1.05, color: C.white }, nome),
            // a cor do país vem junto com o nome escrito: significado nunca só pela cor
            h("div", { alignItems: "center", gap: G.s },
                h("div", { width: 56, height: G.xs, background: corPais, borderRadius: 4 }),
                h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.m, color: C.white, letterSpacing: 2 }, pais.toUpperCase())),
            frase ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, lineHeight: 1.45, color: C.muted }, clamp(frase, 150)) : null,
            rodape("Guia completo da cidade no link da bio")), ilustrativa(foto)));
}

// ---------- carrossel das Histórias da Rota ----------
// Referências da biblioteca (Grigoletto): a CAPA segue o 27 "Paradise/Tromsø" (foto em tela cheia,
// nome gigante em serifa, linha espaçada acima, paginação "01 — 06"); os FATOS seguem o 23 "Silver
// Order" (editorial em papel claro, capitular, serifa). Arco de 6 telas (agency-agents, carousel
// growth engine): a 1ª para a rolagem, as do meio entregam, a última chama para o site.

const PAPEL = "#F4EEE3";
const TINTA = "#14202E";
const OURO_ESCURO = "#A8692A"; // dourado legível sobre papel claro (contraste AA)
const pagina = (n, total, cor) =>
    h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, letterSpacing: 3, color: cor }, `${String(n).padStart(2, "0")} — ${String(total).padStart(2, "0")}`);

/** Tela 1: o gancho. Foto da cidade em tela cheia, nome gigante, frase que para a rolagem. */
export function artCarrosselCapa({ cidade, foto, gancho, total, rotulo = "Histórias da Rota" }) {
    const nome = String(cidade);
    const tamanho = nome.length > 14 ? T.hero : nome.length > 9 ? T.mega : 170;
    return rasterizar(comFoto(fotoCidade(foto),
        h("div", { flexDirection: "column", gap: G.l },
            h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, letterSpacing: 12, color: C.gold }, rotulo.toUpperCase()),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: tamanho, lineHeight: 0.98, color: C.white }, nome),
            h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.l, lineHeight: 1.35, color: C.white }, clamp(gancho, 110)),
            faixaBandeiras(),
            h("div", { justifyContent: "space-between", alignItems: "center" },
                h("div", { alignItems: "center", gap: G.s },
                    h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, color: C.muted, letterSpacing: 3 }, "ARRASTE"),
                    h("div", { width: 56, height: 3, background: C.muted }),
                    h("div", { width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: `14px solid ${C.muted}`, marginLeft: -G.s })),
                pagina(1, total, C.white))), ilustrativa(foto)));
}

/** Telas do meio: um fato verificado por tela, com a fonte embaixo. */
export function artCarrosselFato({ cidade, numero, total, chapeu, titulo, texto, fontes = [] }) {
    const corpo = clamp(texto, 230);
    const capitular = corpo.charAt(0);
    return rasterizar(
        h("div", { width: W, height: H, position: "relative", flexDirection: "column", justifyContent: "space-between", padding: G.xxl, background: PAPEL },
            h("div", { position: "absolute", top: 40, right: 24, fontFamily: "Playfair", fontWeight: 800, fontSize: 560, lineHeight: 1, color: "rgba(168,105,42,0.09)" }, String(numero).padStart(2, "0")),
            h("div", { justifyContent: "space-between", alignItems: "center" },
                h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 4, color: TINTA }, `ROTA 4 MUNDOS  ·  ${String(cidade).toUpperCase()}`),
                pagina(numero, total, TINTA)),
            h("div", { flexDirection: "column", gap: G.xl },
                h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.m, letterSpacing: 5, color: OURO_ESCURO }, String(chapeu).toUpperCase()),
                h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: titulo.length > 16 ? T.xxl : T.hero, lineHeight: 1.06, color: TINTA }, clamp(titulo, 60)),
                h("div", { width: 96, height: 4, background: OURO_ESCURO }),
                h("div", { alignItems: "flex-start", gap: G.m },
                    h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: 200, lineHeight: 0.8, color: OURO_ESCURO, marginTop: 6 }, capitular),
                    h("div", { flex: 1, fontFamily: "Inter", fontWeight: 400, fontSize: T.l, lineHeight: 1.5, color: TINTA }, corpo.slice(1)))),
            h("div", { flexDirection: "column", gap: G.m },
                fontes.length ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.s, color: "rgba(20,32,46,0.62)" }, `Fonte: ${fontes.slice(0, 2).join(" · ")}`) : null,
                faixaBandeiras(6))));
}

/** Última tela: o convite para o site. */
export function artCarrosselFecho({ total, chamada = "A história completa está no portal", endereco = "rota4mundos.com.br/historias" }) {
    return rasterizar(
        h("div", { width: W, height: H, flexDirection: "column", justifyContent: "space-between", padding: G.xxl, backgroundImage: `linear-gradient(180deg, ${C.navy2} 0%, ${C.navy} 100%)` },
            h("div", { justifyContent: "flex-end" }, pagina(total, total, C.muted)),
            h("div", { flexDirection: "column", alignItems: "center", gap: G.xl },
                h("div", { width: 176, height: 176, borderRadius: 88, background: C.white, alignItems: "center", justifyContent: "center" },
                    img(LOGO, { width: 128, height: 128 })),
                h("div", { maxWidth: 760, fontFamily: "Playfair", fontWeight: 800, fontSize: T.hero, lineHeight: 1.08, color: C.white, textAlign: "center", justifyContent: "center" }, chamada),
                h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.l, color: C.gold }, "Link na bio"),
                h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, color: C.muted }, endereco)),
            h("div", { flexDirection: "column", gap: G.m, alignItems: "center" },
                h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.s, letterSpacing: 4, color: C.muted }, "BRASIL · PARAGUAI · ARGENTINA · CHILE"),
                faixaBandeiras())));
}

/** Infográfico do site emoldurado: título em cima, imagem no centro. */
export function artInfografico({ titulo, subtitulo, arquivo }) {
    const fonte = path.join(ASSETS, "social", "infograficos", arquivo);
    const largura = W - 2 * G.xxl - 2 * 4;
    return rasterizar(
        h("div", { width: W, height: H, flexDirection: "column", justifyContent: "space-between", padding: G.xxl, backgroundImage: `linear-gradient(180deg, ${C.navy} 0%, ${C.navy2} 100%)` },
            cabecalho(),
            h("div", { flexDirection: "column", gap: G.s },
                etiqueta("Infográfico"),
                h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: T.xxl, lineHeight: 1.08, color: C.white }, clamp(titulo, 40)),
                subtitulo ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, color: C.muted }, clamp(subtitulo, 120)) : null),
            h("div", { borderRadius: 16, overflow: "hidden", border: "4px solid rgba(255,255,255,0.85)" },
                img(dataUri(fonte), { width: largura, height: Math.round((largura * 2) / 3), objectFit: "cover" })),
            rodape("Infográfico completo no link da bio")));
}
