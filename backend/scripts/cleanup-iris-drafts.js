import { prisma } from "../src/config/database.js";

// Remove rascunhos criados pelo IRIS que não têm relação com o Corredor Bioceânico
async function main() {
    const deleted = await prisma.article.deleteMany({
        where: {
            status: "DRAFT",
            OR: [
                { title: { contains: "logística", mode: "insensitive" } },
                { title: { contains: "granizo", mode: "insensitive" } },
                { title: { contains: "Dourados", mode: "insensitive" } },
                { title: { contains: "motorista", mode: "insensitive" } },
                { title: { contains: "jornada exaustiva", mode: "insensitive" } },
                { title: { contains: "alagamento", mode: "insensitive" } },
            ],
        },
    });

    console.log(`Removidos: ${deleted.count} artigo(s)`);
    await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
