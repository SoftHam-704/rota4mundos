// Reel vertical (1080x1920, ~22 s) de uma reportagem, com a identidade do portal.
//
// Roteiro: (1) abertura — fundo com zoom lento, etiqueta e título; (2–4) três fatos tirados do
// texto da reportagem, um por vez, em cartões; (5) fechamento — marca + "reportagem completa no
// link da bio". Uma barra dourada fina mostra o progresso, como nos stories.
//
// Satori desenha cada camada de texto (PNG transparente, mesmas fontes e cores das artes 4:5) e o
// ffmpeg monta: o fundo recebe o zoom lento, as camadas entram e saem com fade e um leve
// deslocamento. Sai MP4 H.264 + AAC (trilha silenciosa), o formato que a API do Instagram aceita.
//
// ffmpeg: FFMPEG_PATH, ou o pacote `ffmpeg-static` (binário embutido no deploy), ou o do sistema.
import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const ASSETS = path.resolve(import.meta.dirname, "..", "..", "..", "..", "assets");
const W = 1080;
const H = 1920;
const FPS = 30;

const C = { navy: "#0A1628", gold: "#F4A261", white: "#FFFFFF", muted: "rgba(255,255,255,0.80)" };
const BANDEIRAS = ["#009C3B", "#D52B1E", "#74ACDF", "#0039A6"];
const T = { s: 32, m: 42, l: 56, xl: 75, xxl: 100, mega: 160 };
const G = { s: 16, m: 24, l: 32, xl: 48, xxl: 64, xxxl: 96 };

const font = (file) => fs.readFileSync(path.join(ASSETS, "fonts", file));
const FONTS = [
    { name: "Playfair", data: font("PlayfairDisplay-Bold.ttf"), weight: 700 },
    { name: "Playfair", data: font("PlayfairDisplay-ExtraBold.ttf"), weight: 800 },
    { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400 },
    { name: "Inter", data: font("Inter-SemiBold.ttf"), weight: 600 },
    { name: "Inter", data: font("Inter-ExtraBold.ttf"), weight: 800 },
];
const LOGO = `data:image/png;base64,${fs.readFileSync(path.join(ASSETS, "social", "logo-icon.png")).toString("base64")}`;

const h = (type, style, ...children) => ({
    type,
    props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c != null && c !== false) },
});
const img = (src, style) => ({ type: "img", props: { src, style } });
const tela = (style, ...filhos) => h("div", { width: W, height: H, position: "relative", ...style }, ...filhos);

const faixaBandeiras = (altura = 8) =>
    h("div", { width: "100%", height: altura }, BANDEIRAS.map((cor) => h("div", { flex: 1, height: altura, background: cor })));

const marca = (tamanho = 88) =>
    h("div", { alignItems: "center", gap: G.m },
        h("div", { width: tamanho, height: tamanho, borderRadius: tamanho / 2, background: C.white, alignItems: "center", justifyContent: "center" },
            img(LOGO, { width: tamanho * 0.72, height: tamanho * 0.72 })),
        h("div", { flexDirection: "column", gap: 6 },
            h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 5, color: C.white }, "ROTA 4 MUNDOS"),
            h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: 26, color: C.muted }, "Brasil · Paraguai · Argentina · Chile")));

const etiqueta = (texto) =>
    h("div", { alignSelf: "flex-start", background: C.gold, color: C.navy, fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 4, padding: `${G.s}px ${G.l}px`, borderRadius: 8 },
        texto.toUpperCase());

// ---------- as camadas (PNG transparente 1080x1920) ----------

/**
 * Abertura no modo "marca" (fundo padrão do portal): o texto fica no terço de cima, que na arte é
 * vazio, e as quatro faixas + a estrela ficam livres embaixo — a arte aparece o tempo todo.
 */
const camadaAberturaMarca = ({ titulo, categoria }) =>
    tela({ flexDirection: "column" },
        h("div", { position: "absolute", top: 0, left: 0, width: W, height: H, backgroundImage: "linear-gradient(180deg, rgba(10,22,40,0.75) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0) 55%)" }),
        h("div", { flexDirection: "column", gap: G.l, padding: `${G.xxxl}px ${G.xxl}px 0` }, faixaBandeiras(), marca()),
        h("div", { flexDirection: "column", gap: G.xl, padding: `${G.xxxl}px ${G.xxl}px 0` },
            etiqueta(categoria),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: titulo.length > 70 ? T.xl : T.xxl, lineHeight: 1.1, color: C.white }, titulo)));

/** Abertura: degradê embaixo, marca no alto, etiqueta + título embaixo. */
const camadaAbertura = ({ titulo, categoria, ilustrativa }) =>
    tela({ flexDirection: "column", justifyContent: "space-between" },
        h("div", { position: "absolute", top: 0, left: 0, width: W, height: H, backgroundImage: "linear-gradient(180deg, rgba(10,22,40,0.65) 0%, rgba(10,22,40,0) 18%, rgba(10,22,40,0) 42%, rgba(10,22,40,0.88) 66%, rgba(10,22,40,0.97) 100%)" }),
        h("div", { flexDirection: "column", gap: G.l, padding: `${G.xxxl}px ${G.xxl}px 0` },
            faixaBandeiras(), marca(),
            ilustrativa ? h("div", { alignSelf: "flex-end", fontFamily: "Inter", fontSize: 24, color: C.muted, background: "rgba(10,22,40,0.55)", padding: `6px ${G.s}px`, borderRadius: 6 }, ilustrativa === "videos" ? "Imagens ilustrativas" : "Imagem ilustrativa") : null),
        h("div", { flexDirection: "column", gap: G.xl, padding: `0 ${G.xxl}px 440px` }, // fora da faixa de baixo que a legenda do Instagram cobre
            etiqueta(categoria),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: titulo.length > 70 ? T.xl : T.xxl, lineHeight: 1.1, color: C.white }, titulo)));

/** Um fato: véu escuro sobre o fundo e um cartão com o destaque (data, número ou "Lenda"). */
const camadaFato = ({ n, destaque, texto, emMarca }) =>
    tela(emMarca
        // modo marca: véu leve e cartão no alto, deixando as faixas aparecerem embaixo
        ? { alignItems: "flex-start", justifyContent: "center", paddingTop: 300, backgroundImage: "linear-gradient(180deg, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0) 62%)" }
        : { alignItems: "center", justifyContent: "center", background: "rgba(10,22,40,0.72)" },
        h("div", { flexDirection: "column", gap: G.xl, padding: G.xxl, margin: `0 ${G.xxl}px`, width: W - G.xxl * 2, borderLeft: `8px solid ${C.gold}`, background: "rgba(10,22,40,0.55)" },
            h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.s, letterSpacing: 6, color: C.gold }, String(n).padStart(2, "0")),
            destaque ? h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: destaque.length > 8 ? T.xxl : T.mega, lineHeight: 1, color: C.white }, destaque) : null,
            h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.l, lineHeight: 1.35, color: C.white }, texto)));

/** Fechamento: fundo navy cheio, marca grande, chamada e endereço. */
const camadaFim = ({ chamada }) =>
    tela({ flexDirection: "column", alignItems: "center", justifyContent: "center", gap: G.xxl, background: C.navy, padding: G.xxl },
        img(LOGO, { width: 260, height: 260 }),
        h("div", { fontFamily: "Inter", fontWeight: 800, fontSize: T.l, letterSpacing: 8, color: C.white }, "ROTA 4 MUNDOS"),
        h("div", { width: 360 }, faixaBandeiras(10)),
        h("div", { fontFamily: "Playfair", fontWeight: 700, fontSize: T.xl, lineHeight: 1.15, color: C.white, textAlign: "center", justifyContent: "center" }, chamada),
        h("div", { fontFamily: "Inter", fontWeight: 600, fontSize: T.m, color: C.gold }, "rota4mundos.com.br"));

async function png(arvore) {
    const svg = await satori(arvore, { width: W, height: H, fonts: FONTS });
    return new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
}

// O binário do ffmpeg-static é baixado pelo script de instalação do pacote — e o npm do servidor
// NÃO roda scripts de instalação (allow-scripts). Por isso, se o arquivo não estiver lá, o próprio
// Rota roda o install.js do pacote uma vez (baixa o ffmpeg do GitHub) e segue. 05/10/2026: o
// primeiro Reel falhou com "spawn …/ffmpeg-static/ffmpeg ENOENT".
let _ffmpeg;
async function caminhoFfmpeg() {
    if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
    return (_ffmpeg ??= (async () => {
        try {
            const bin = (await import("ffmpeg-static")).default;
            if (bin && fs.existsSync(bin)) return bin;
            if (bin) {
                const pasta = path.dirname(bin);
                await rodarNode(path.join(pasta, "install.js"), pasta);
                if (fs.existsSync(bin)) {
                    fs.chmodSync(bin, 0o755);
                    return bin;
                }
            }
        } catch { /* sem o pacote ou sem rede: tenta o do sistema */ }
        return "ffmpeg";
    })().catch(() => "ffmpeg"));
}

function rodarNode(script, cwd) {
    return new Promise((ok, falha) => {
        const p = spawn(process.execPath, [script], { cwd, stdio: "ignore" });
        p.on("error", falha);
        p.on("close", (code) => (code === 0 ? ok() : falha(new Error(`install.js do ffmpeg-static saiu com ${code}`))));
    });
}

function rodar(bin, args) {
    return new Promise((ok, falha) => {
        const p = spawn(bin, args, { stdio: ["ignore", "ignore", "pipe"] });
        let erro = "";
        p.stderr.on("data", (d) => { erro = (erro + d).slice(-4000); });
        p.on("error", falha);
        p.on("close", (code) => {
            if (process.env.REEL_DEBUG) console.log("[ffmpeg]", (erro.match(/bench:[^\n]*/g) || []).join(" | "));
            code === 0 ? ok() : falha(new Error(`ffmpeg saiu com código ${code}: ${erro.slice(-600)}`));
        });
    });
}

/**
 * Monta o Reel. Retorna { video: Buffer (mp4), capa: Buffer (jpg) }.
 * @param {object} o
 * @param {Buffer} [o.fundo]  imagem de fundo (qualquer proporção; vira 9:16) — usada se não houver `clipes`
 * @param {string[]} [o.clipes] vídeos de fundo (caminhos locais), um por trecho, emendados com fusão
 * @param {string} o.titulo
 * @param {string} o.categoria
 * @param {{destaque?: string, texto: string}[]} o.fatos  até 3, tirados do texto da reportagem
 * @param {boolean|"videos"} [o.ilustrativa=true] fundo gerado por IA leva o selo
 * @param {"marca"} [o.estilo] fundo padrão do portal (assets/social/reel-fundo.jpg): texto no alto
 * @param {string} [o.chamada]
 */
export async function renderReel({ fundo, clipes = [], estilo, titulo, categoria = "Notícia", fatos, ilustrativa = true, chamada = "Reportagem completa no link da bio" }) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "reel-"));
    try {
        const ABERTURA = 5;
        const FATO = 4.2;
        const FIM = 3.8;
        const lista = (fatos || []).slice(0, 3);
        const total = ABERTURA + lista.length * FATO + FIM;

        const comVideo = clipes.length > 0;
        const emMarca = estilo === "marca";
        if (emMarca && !fundo) fundo = fs.readFileSync(path.join(ASSETS, "social", "reel-fundo.jpg"));
        if (!comVideo) {
            // fundo um pouco maior que a tela, para o zoom não mostrar borda
            await sharp(fundo).resize(W * 1.2, H * 1.2, { fit: "cover", position: emMarca ? "centre" : "attention" }).jpeg({ quality: 90 }).toFile(path.join(dir, "fundo.jpg"));
        }
        const camadas = [
            { arq: "abertura.png", arvore: emMarca ? camadaAberturaMarca({ titulo, categoria }) : camadaAbertura({ titulo, categoria, ilustrativa }), ini: 0, fim: ABERTURA + 0.3, sobe: true },
            ...lista.map((f, i) => ({ arq: `fato${i + 1}.png`, arvore: camadaFato({ n: i + 1, ...f, emMarca }), ini: ABERTURA + i * FATO, fim: ABERTURA + (i + 1) * FATO + 0.25, sobe: true })),
            { arq: "fim.png", arvore: camadaFim({ chamada }), ini: total - FIM, fim: total + 1, sobe: false },
        ];
        for (const c of camadas) fs.writeFileSync(path.join(dir, c.arq), await png(c.arvore));

        const saida = path.join(dir, "reel.mp4");
        const ff = await caminhoFfmpeg();
        if (!comVideo) {
            // MEMÓRIA: montar tudo num grafo só (fundo + 5 camadas 1080x1920 abertas juntas) chegou a
            // 1,7 GB e o sistema matou o ffmpeg no servidor (~1 GB). Por partes: cada trecho tem só o
            // fundo e a sua camada; no fim os trechos são emendados sem recodificar.
            const frames = Math.round(total * FPS);
            const partes = [];
            for (let k = 0; k < camadas.length; k++) {
                const c = camadas[k];
                const ultimo = k === camadas.length - 1;
                const dur = (ultimo ? total : camadas[k + 1].ini) - c.ini;
                const entra = 0.55;
                const sai = 0.45;
                const y = c.sobe ? `'if(lt(t,${entra}),60*(1-t/${entra}),0)'` : "0";
                const g = [
                    `[0:v]scale=${W * 1.2}:${H * 1.2},zoompan=z='1+0.12*(on+${Math.round(c.ini * FPS)})/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS},setsar=1[b]`,
                    `[1:v]format=rgba,fade=t=in:st=0:d=${entra}:alpha=1${ultimo ? "" : `,fade=t=out:st=${(dur - sai).toFixed(2)}:d=${sai}:alpha=1`}[c]`,
                    `[b][c]overlay=x=0:y=${y}[o]`,
                    `[o]drawbox=x=0:y=${H - 10}:w='${W}*(t+${c.ini})/${total}':h=10:color=0xF4A261@0.95:t=fill,format=yuv420p[v]`,
                ];
                const arq = path.join(dir, `parte${k}.mp4`);
                await rodar(ff, [
                    "-y", ...(process.env.REEL_DEBUG ? ["-benchmark"] : []),
                    "-loop", "1", "-framerate", String(FPS), "-t", dur.toFixed(3), "-i", path.join(dir, "fundo.jpg"),
                    "-loop", "1", "-framerate", String(FPS), "-t", dur.toFixed(3), "-i", path.join(dir, c.arq),
                    "-f", "lavfi", "-t", dur.toFixed(3), "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
                    "-threads", "2", "-filter_threads", "1", "-filter_complex_threads", "1",
                    "-filter_complex", g.join(";"), "-map", "[v]", "-map", "2:a", "-t", dur.toFixed(3),
                    "-c:v", "libx264", "-preset", "veryfast", "-crf", "21", "-x264-params", "rc-lookahead=10:ref=2", "-profile:v", "high", "-r", String(FPS),
                    "-c:a", "aac", "-b:a", "128k", "-ar", "44100", arq,
                ]);
                partes.push(arq);
            }
            const lista = path.join(dir, "partes.txt");
            fs.writeFileSync(lista, partes.map((a) => `file '${a.split(path.sep).join("/")}'`).join("\n"));
            await rodar(ff, ["-y", "-f", "concat", "-safe", "0", "-i", lista, "-c", "copy", "-movflags", "+faststart", saida]);
        } else {
            // fundo: vídeos emendados com fusão (cada um cortado em 9:16 pelo centro) ou a foto com zoom lento
            const nFundo = comVideo ? clipes.length : 1;
            const f = [];
            if (comVideo) {
                const X = 0.6; // duração de cada fusão
                const L = (total + (nFundo - 1) * X) / nFundo; // trecho de cada vídeo
                clipes.forEach((_, k) => f.push(`[${k}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},setsar=1,trim=duration=${L.toFixed(3)},setpts=PTS-STARTPTS[v${k}]`));
                let atual = "v0";
                for (let k = 1; k < nFundo; k++) {
                    const saida = k === nFundo - 1 ? "b0" : `x${k}`;
                    f.push(`[${atual}][v${k}]xfade=transition=fade:duration=${X}:offset=${(k * (L - X)).toFixed(3)}[${saida}]`);
                    atual = saida;
                }
                if (nFundo === 1) f.push(`[v0]null[b0]`);
            } else {
                const frames = Math.round(total * FPS);
                f.push(`[0:v]scale=${W * 1.2}:${H * 1.2},zoompan=z='1+0.12*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS},setsar=1[b0]`);
            }
            // cada camada entra (fade + sobe 60px) e sai (fade)
            camadas.forEach((c, i) => {
                const entra = 0.55;
                const sai = 0.45;
                f.push(`[${i + nFundo}:v]format=rgba,fade=t=in:st=${c.ini}:d=${entra}:alpha=1${c.fim < total ? `,fade=t=out:st=${(c.fim - sai).toFixed(2)}:d=${sai}:alpha=1` : ""}[c${i}]`);
                const y = c.sobe ? `'if(lt(t,${c.ini + entra}),60*(1-(t-${c.ini})/${entra}),0)'` : "0";
                f.push(`[b${i}][c${i}]overlay=x=0:y=${y}:enable='between(t,${c.ini},${c.fim})'[b${i + 1}]`);
            });
            const n = camadas.length;
            f.push(`[b${n}]drawbox=x=0:y=${H - 10}:w='${W}*t/${total}':h=10:color=0xF4A261@0.95:t=fill,format=yuv420p[v]`);

            const entradasFundo = comVideo
                ? clipes.flatMap((c) => ["-stream_loop", "-1", "-i", c]) // vídeo curto repete até cobrir o trecho
                : ["-loop", "1", "-framerate", String(FPS), "-t", String(total), "-i", path.join(dir, "fundo.jpg")];
            const args = [
                "-y", ...(process.env.REEL_DEBUG ? ["-benchmark"] : []), ...entradasFundo,
                // camadas no mesmo ritmo do vídeo (30 qps): sem conversão de taxa, nada se acumula na memória
                ...camadas.flatMap((c) => ["-loop", "1", "-framerate", String(FPS), "-t", String(total), "-i", path.join(dir, c.arq)]),
                "-f", "lavfi", "-t", String(total), "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
                // MEMÓRIA: o nó da API tem ~1 GB para tudo. Com threads automáticas e preset medium o ffmpeg
                // chegou a 1,7 GB e foi morto pelo sistema (05/10/2026). Poucas threads + preset leve.
                "-threads", "2", "-filter_threads", "1", "-filter_complex_threads", "1",
                "-filter_complex", f.join(";"),
                "-map", "[v]", "-map", `${n + nFundo}:a`, "-t", String(total),
                "-c:v", "libx264", "-preset", "veryfast", "-crf", "21", "-x264-params", "rc-lookahead=10:ref=2", "-profile:v", "high", "-r", String(FPS),
                "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", saida,
            ];
            await rodar(ff, args);

        }

        // capa: o quadro de ~2,5 s do próprio Reel (abertura composta sobre o fundo)
        await rodar(await caminhoFfmpeg(), ["-y", "-ss", "2.5", "-i", saida, "-frames:v", "1", "-q:v", "3", path.join(dir, "capa.jpg")]);
        const capa = fs.readFileSync(path.join(dir, "capa.jpg"));
        return { video: fs.readFileSync(saida), capa, duracao: total };
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}
