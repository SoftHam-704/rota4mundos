import { prisma } from "../src/config/database.js";

const norm = (t) =>
    t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, "");

function dayKey(date) {
    if (!date) return "nodate";
    return new Date(date).toISOString().slice(0, 10);
}

function topicKey(title) {
    return norm(title || "").split(/\s+/).filter((w) => w.length > 2).slice(0, 2).join(" ");
}

async function main() {
    const articles = await prisma.article.findMany({
        orderBy: [{ publishedAt: "asc" }, { createdAt: "asc" }],
        select: { id: true, title: true, publishedAt: true, createdAt: true, status: true },
    });

    const kept = new Map(); // key → article id a manter
    const toDelete = [];

    for (const art of articles) {
        const key = `${dayKey(art.publishedAt)}:${topicKey(art.title)}`;
        if (kept.has(key)) {
            // Prefere manter o PUBLISHED; se empate, mantém o mais antigo (já está no Map)
            const existing = kept.get(key);
            if (art.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
                toDelete.push(existing.id);
                kept.set(key, art);
            } else {
                toDelete.push(art.id);
            }
        } else {
            kept.set(key, art);
        }
    }

    if (toDelete.length === 0) {
        console.log("Nenhum duplicado encontrado.");
    } else {
        console.log(`Removendo ${toDelete.length} artigo(s) duplicado(s)...`);
        const result = await prisma.article.deleteMany({ where: { id: { in: toDelete } } });
        console.log(`Removidos: ${result.count}`);
    }

    await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
