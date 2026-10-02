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
    const frases = t.match(/[^.!?]+[.!?]+/g) || [];
    let acc = "";
    for (const f of frases) { if ((acc + f).trim().length > max) break; acc += f; }
    return acc.trim() || t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
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
const comFoto = (foto, conteudo, ilustrativa = foto === PONTE) =>
    h("div", { width: W, height: H, position: "relative", background: C.navy },
        img(dataUri(foto), { position: "absolute", top: 0, left: 0, width: W, height: H, objectFit: "cover" }),
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

export const fotoCidade = (foto) => {
    const f = foto && path.join(ASSETS, "social", "cities", `${foto}.jpg`);
    return f && fs.existsSync(f) ? f : PONTE;
};

// ---------- os três modelos ----------

/** Reportagem da IRIS: categoria, título e resumo sobre a ponte ao amanhecer (padrão) ou uma foto dada. */
export function artReportagem({ titulo, resumo, categoria = "Notícia", foto }) {
    const t = clamp(titulo, 110);
    const tamanho = t.length > 60 ? T.xl : T.xxl;
    return rasterizar(comFoto(fotoCidade(foto),
        h("div", { flexDirection: "column", gap: G.l },
            etiqueta(categoria),
            h("div", { fontFamily: "Playfair", fontWeight: 800, fontSize: tamanho, lineHeight: 1.12, color: C.white }, t),
            resumo ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, lineHeight: 1.45, color: C.muted }, clamp(resumo, 160)) : null,
            rodape("Reportagem completa no link da bio"))));
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
            rodape("Guia completo da cidade no link da bio"))));
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
                subtitulo ? h("div", { fontFamily: "Inter", fontWeight: 400, fontSize: T.m, color: C.muted }, clamp(subtitulo, 60)) : null),
            h("div", { borderRadius: 16, overflow: "hidden", border: "4px solid rgba(255,255,255,0.85)" },
                img(dataUri(fonte), { width: largura, height: Math.round((largura * 2) / 3), objectFit: "cover" })),
            rodape("Infográfico completo no link da bio")));
}
