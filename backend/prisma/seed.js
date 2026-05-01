import { PrismaClient, UserRole, ArticleStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Iniciando seed...");

    const adminPassword = await bcrypt.hash("admin@123", 12);
    const editorPassword = await bcrypt.hash("editor@123", 12);

    // Usuários
    const admin = await prisma.user.upsert({
        where: { email: "admin@rotabio.com" },
        update: {},
        create: {
            name: "Administrador",
            email: "admin@rotabio.com",
            passwordHash: adminPassword,
            role: UserRole.ADMIN,
        },
    });

    const editor = await prisma.user.upsert({
        where: { email: "editor@rotabio.com" },
        update: {},
        create: {
            name: "Editor Principal",
            email: "editor@rotabio.com",
            passwordHash: editorPassword,
            role: UserRole.EDITOR,
        },
    });

    console.log("✅ Usuários criados");

    // Categorias
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "infraestrutura" },
            update: {},
            create: { name: "Infraestrutura", slug: "infraestrutura", color: "#0B2E4F" },
        }),
        prisma.category.upsert({
            where: { slug: "economia" },
            update: {},
            create: { name: "Economia", slug: "economia", color: "#1F7A8C" },
        }),
        prisma.category.upsert({
            where: { slug: "turismo" },
            update: {},
            create: { name: "Turismo", slug: "turismo", color: "#F4A261" },
        }),
        prisma.category.upsert({
            where: { slug: "meio-ambiente" },
            update: {},
            create: { name: "Meio Ambiente", slug: "meio-ambiente", color: "#2A9D8F" },
        }),
    ]);

    console.log("✅ Categorias criadas");

    // Cidades da Rota Bioceânica
    const cities = await Promise.all([
        prisma.city.upsert({
            where: { slug: "cuiaba" },
            update: {},
            create: {
                name: "Cuiabá",
                state: "Mato Grosso",
                country: "Brasil",
                slug: "cuiaba",
                description: "Capital do Mato Grosso e ponto estratégico de partida da Rota Bioceânica, conectando o Brasil ao Pacífico.",
                history: "Fundada em 1719 durante a corrida do ouro, Cuiabá é uma cidade de rica herança cultural, mesclando influências indígenas, africanas e europeias.",
                population: 650000,
                economy: "Agropecuária, comércio, serviços e logística. Polo de distribuição para a região Centro-Oeste.",
                latitude: -15.601,
                longitude: -56.0978,
                isHighlight: true,
                order: 1,
            },
        }),
        prisma.city.upsert({
            where: { slug: "santa-cruz-de-la-sierra" },
            update: {},
            create: {
                name: "Santa Cruz de la Sierra",
                state: "Santa Cruz",
                country: "Bolívia",
                slug: "santa-cruz-de-la-sierra",
                description: "Principal centro econômico da Bolívia e porta de entrada para a Rota Bioceânica no território boliviano.",
                history: "Fundada em 1561, Santa Cruz transformou-se de cidade colonial em metrópole moderna, motor econômico da Bolívia.",
                population: 1800000,
                economy: "Hidrocarbonetos, agroindústria, manufatura e comércio internacional.",
                latitude: -17.7833,
                longitude: -63.1821,
                isHighlight: true,
                order: 2,
            },
        }),
        prisma.city.upsert({
            where: { slug: "puerto-suarez" },
            update: {},
            create: {
                name: "Puerto Suárez",
                state: "Santa Cruz",
                country: "Bolívia",
                slug: "puerto-suarez",
                description: "Cidade fronteiriça estratégica com acesso ferroviário direto ao oceano Pacífico via Chile.",
                history: "Localizada na fronteira Brasil-Bolívia, é um importante corredor logístico desde o início do século XX.",
                population: 15000,
                economy: "Comércio fronteiriço, logística ferroviária e transporte internacional.",
                latitude: -18.975,
                longitude: -57.8,
                order: 3,
            },
        }),
        prisma.city.upsert({
            where: { slug: "antofagasta" },
            update: {},
            create: {
                name: "Antofagasta",
                state: "Antofagasta",
                country: "Chile",
                slug: "antofagasta",
                description: "Porto chileno no Pacífico, destino final da Rota Bioceânica e gateway para a Ásia.",
                history: "Cresceu durante o boom do salitre no século XIX e hoje é um dos principais portos do Chile.",
                population: 380000,
                economy: "Mineração, portos, logística marítima e pesca industrial.",
                latitude: -23.65,
                longitude: -70.4,
                isHighlight: true,
                order: 4,
            },
        }),
    ]);

    console.log("✅ Cidades criadas");

    // Artigos de exemplo
    await prisma.article.createMany({
        skipDuplicates: true,
        data: [
            {
                title: "Rota Bioceânica: Transformando a Geopolítica Sul-Americana",
                slug: "rota-bioceanica-transformando-geopolitica",
                excerpt: "A nova rota de integração continental promete reduzir em 40% o tempo de transporte entre Brasil e Ásia, gerando oportunidades sem precedentes para investidores.",
                content: "<p>A Rota Bioceânica representa um dos maiores projetos de infraestrutura da América do Sul no século XXI...</p>",
                status: ArticleStatus.PUBLISHED,
                publishedAt: new Date(),
                featuredImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200",
                authorId: admin.id,
                categoryId: categories[0].id,
                lang: "pt",
                metaTitle: "Rota Bioceânica - Oportunidades de Investimento",
                metaDesc: "Descubra como a Rota Bioceânica está transformando o comércio entre Atlântico e Pacífico.",
            },
            {
                title: "Oportunidades de Investimento em Infraestrutura Logística",
                slug: "oportunidades-investimento-infraestrutura",
                excerpt: "Análise completa dos setores com maior potencial de retorno: portos secos, ferrovias, terminais e zonas de processamento.",
                content: "<p>O corredor bioceânico abre um leque de oportunidades em infraestrutura logística...</p>",
                status: ArticleStatus.PUBLISHED,
                publishedAt: new Date(),
                featuredImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200",
                authorId: editor.id,
                categoryId: categories[1].id,
                lang: "pt",
            },
        ],
    });

    console.log("✅ Artigos criados");

    // Configurações do site
    await prisma.siteSetting.createMany({
        skipDuplicates: true,
        data: [
            { key: "siteTitle", value: "Portal da Rota Bioceânica", type: "string" },
            { key: "siteDescription", value: "Conectando o Brasil ao Pacífico: investimentos, oportunidades e desenvolvimento regional.", type: "string" },
            { key: "contactEmail", value: "contato@rotabioceanica.org", type: "string" },
            { key: "analyticsId", value: "", type: "string" },
            { key: "maintenanceMode", value: "false", type: "boolean" },
        ],
    });

    console.log("✅ Configurações criadas");

    // Newsletter subscribers de exemplo
    await prisma.newsletterSubscriber.createMany({
        skipDuplicates: true,
        data: [
            { email: "investidor@exemplo.com", name: "João Investidor", interests: ["infraestrutura", "economia"], lang: "pt" },
            { email: "parceiro@internacional.com", name: "International Partner", interests: ["turismo", "meio-ambiente"], lang: "en" },
        ],
    });

    console.log("✅ Newsletter criada");
    console.log("🎉 Seed concluído com sucesso!");
}

main()
    .catch((e) => {
        console.error("❌ Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
