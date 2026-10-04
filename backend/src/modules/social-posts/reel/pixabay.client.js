// Vídeos gratuitos do Pixabay para o fundo dos Reels (licença Pixabay: uso comercial liberado, sem
// crédito obrigatório). São imagens ILUSTRATIVAS — o Reel leva o selo "Imagens ilustrativas".
// Chave: PIXABAY_API_KEY (vai na query, como a API exige; nunca é logada).
import fs from "fs";
import path from "path";

const API = "https://pixabay.com/api/videos/";

export const configurado = () => Boolean(process.env.PIXABAY_API_KEY);

/**
 * Procura um vídeo para o termo (em inglês dá mais resultado) e devolve o melhor candidato:
 * de preferência em alta resolução, com duração de 6 a 40 s, entre os mais populares.
 * `evitar`: ids já usados no mesmo Reel, para não repetir cena.
 */
export async function buscarVideo(termo, { evitar = [] } = {}) {
    if (!configurado()) throw new Error("PIXABAY_API_KEY não configurada");
    const params = new URLSearchParams({
        key: process.env.PIXABAY_API_KEY, q: termo, video_type: "film", safesearch: "true", per_page: "20", order: "popular",
    });
    const resp = await fetch(`${API}?${params}`);
    if (!resp.ok) throw new Error(`Pixabay respondeu ${resp.status} para "${termo}"`);
    const { hits = [] } = await resp.json();
    const candidatos = hits
        .filter((v) => !evitar.includes(v.id) && v.duration >= 6 && v.duration <= 40)
        .map((v) => {
            const versao = ["large", "medium"].map((k) => v.videos?.[k]).find((x) => x?.url && x.height >= 1080) || v.videos?.medium;
            return versao?.url ? { id: v.id, url: versao.url, largura: versao.width, altura: versao.height, duracao: v.duration, pagina: v.pageURL } : null;
        })
        .filter(Boolean);
    return candidatos[0] || null;
}

/** Baixa o vídeo para um arquivo local (o ffmpeg monta a partir do disco). */
export async function baixar(video, destino) {
    const resp = await fetch(video.url);
    if (!resp.ok) throw new Error(`falha ao baixar vídeo do Pixabay (${resp.status})`);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, Buffer.from(await resp.arrayBuffer()));
    return destino;
}

/**
 * Um vídeo por termo, sem repetir. Termos sem resultado são pulados; se nada vier, devolve [].
 * Retorna os caminhos locais na ordem dos termos encontrados.
 */
export async function videosParaTermos(termos, pasta) {
    const usados = [];
    const arquivos = [];
    for (const [i, termo] of termos.entries()) {
        const v = await buscarVideo(termo, { evitar: usados }).catch(() => null);
        if (!v) continue;
        usados.push(v.id);
        arquivos.push(await baixar(v, path.join(pasta, `cena${i + 1}.mp4`)));
    }
    return arquivos;
}
