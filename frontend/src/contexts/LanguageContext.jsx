import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(undefined);

const VALID_LANGS = ["pt-BR", "es-ES", "en-US"];
const NORMALIZE = { "pt": "pt-BR", "es": "es-ES", "en": "en-US" };

function normalizeLang(lang) {
    if (VALID_LANGS.includes(lang)) return lang;
    return NORMALIZE[lang] || "pt-BR";
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return normalizeLang(localStorage.getItem("rotabio_lang") || "pt-BR");
    });

    useEffect(() => {
        localStorage.setItem("rotabio_lang", language);
    }, [language]);

    const setLanguage = (lang) => setLanguageState(normalizeLang(lang));

    const t = (key) => {
        const keys = key.split(".");
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value ?? key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};

// ─────────────────────────────────────────────────────────────
// TRADUÇÕES
// ─────────────────────────────────────────────────────────────
const translations = {
    "pt-BR": {
        nav: {
            home: "Início",
            cities: "Destinos",
            news: "Notícias",
            about: "Sobre",
            invest: "Invista",
            admin: "Admin",
            login: "Entrar",
            logout: "Sair",
            support: "Apoie",
            supportMobile: "Apoie o projeto",
        },
        hero: {
            badge: "Rota Bioceânica · 4 Países · 3.500 km",
            titleLine1: "A PONTE ENTRE",
            words: ["DOIS OCEANOS", "UMA HISTÓRIA", "UM FUTURO"],
            description: "Do Pantanal ao Pacífico — a maior integração continental da América do Sul, unindo culturas, povos e mercados em 3.500 km de história viva.",
            ctaPrimary: "Explorar Cidades",
            ctaSecondary: "Conheça a Rota",
            podcast: { playing: "Reproduzindo...", idle: "Ouça o Podcast" },
            stats: { distance: "extensão total", countries: "países integrados", cities: "cidades na rota", likes: "curtidas" },
            like: { liked: "Curtido!", cta: "Curtir a Rota" },
            instagram: { title: "Agora siga a rota no Instagram", sub: "@rota4mundos · novidades de 4 países", follow: "Seguir" },
            cards: { countries: "Os 4 países da rota", route: "Traçado da rota — Atlântico → Pacífico", unescoTitle: "Reconhecimento UNESCO", unescoDesc: "Patrimônio cultural e natural reconhecido internacionalmente ao longo do corredor" },
            scroll: "descobrir",
            atlantic: "← Atlântico",
            pacific: "Pacífico →",
        },
        cities: {
            title: "Cidades da Rota",
            subtitle: "Pontos estratégicos de desenvolvimento",
            sectionTitle: "CIDADES QUE",
            sectionTitleHighlight: "CONTAM HISTÓRIAS",
            sectionDescription: "Do Pantanal ao Pacífico — Brasil, Paraguai, Argentina e Chile. Cada parada da rota carrega uma história que o mundo ainda não conhece.",
            routeIndicator: "Atlântico → Pacífico",
            viewAll: "Ver todas as cidades da rota",
            explore: "Explorar Corredor",
            exploreHint: "Clique em um país para explorar as cidades",
            exploreHintMobile: "Toque em um país para explorar",
            scrollHint: "↓ role para ver o livro completo",
            viewCities: "Ver cidades",
            citiesLabel: "cidades",
            population: "População",
            economy: "Economia",
            countries: { brazil: "Brasil", paraguay: "Paraguai", argentina: "Argentina", chile: "Chile" },
        },
        newsletter: {
            title: "Fique por dentro",
            description: "Receba as últimas novidades sobre investimentos e oportunidades na Rota Bioceânica.",
            placeholder: "Seu melhor email",
            button: "Inscrever-se",
            success: "Inscrição realizada com sucesso!",
        },
        footer: {
            rights: "Todos os direitos reservados.",
            contact: "Contato",
            partners: "Parceiros",
            description: "O corredor que conecta o Atlântico ao Pacífico — integrando Brasil, Paraguai, Argentina e Chile num único destino.",
            destinations: "Destinos",
            newsletter: "Newsletter",
            subscribe: "Inscrever-se",
            emailPlaceholder: "seu@email.com",
            viewAll: "Ver todas →",
        },
        colabo: {
            overline: "Colabore com o portal",
            titleMain: "Você faz parte",
            titleHighlight: "desta história",
            description: "Jornalistas locais, historiadores, fotógrafos e contadores de história — envie artigos, fotos antigas ou contos e veja sua voz chegar aos quatro países da rota.",
            cta: "Quero colaborar",
            items: ["Artigos & Reportagens", "Fotos Históricas", "Contos & Depoimentos"],
            more: "+ depoimentos e muito mais",
        },
        apoie: {
            overline: "Faça parte",
            titlePart1: "A ROTA É FEITA",
            titlePart2: "DE ASFALTO.",
            titlePart3: "ESTE PORTAL É",
            titlePart4: "FEITO DE PESSOAS.",
            description: "O maior corredor de integração da América do Sul já tem data. A janela de 2026 está aberta — falta o seu nome nele.",
            cta: "Ver todas as formas de participar",
            ctaMobile: "Ver formas de participar",
            cards: [
                { label: "Apoiador",          title: "Acredite na Causa",  desc: "Pessoas que acreditam na integração da América do Sul e querem fazer parte dessa história.",                                   cta: "Quero apoiar",            badge: "" },
                { label: "Patrocinador",       title: "Conecte sua Marca",  desc: "Hotéis, empresas de logística e operadores que querem ser protagonistas na narrativa da rota.",                              cta: "Falar sobre patrocínio",  badge: "Mais procurado" },
                { label: "Carta de Intenções", title: "Seja Referência",    desc: "Prefeituras, secretarias, câmaras de comércio e entidades que querem protagonismo no corredor.",                            cta: "Manifesto interesse",     badge: "" },
            ],
        },
    },

    "es-ES": {
        nav: {
            home: "Inicio",
            cities: "Ciudades",
            news: "Noticias",
            about: "Nosotros",
            invest: "Invierta",
            admin: "Admin",
            login: "Ingresar",
            logout: "Salir",
            support: "Apoye",
            supportMobile: "Apoye el proyecto",
        },
        hero: {
            badge: "Ruta Bioceánica · 4 Países · 3.500 km",
            titleLine1: "EL PUENTE ENTRE",
            words: ["DOS OCÉANOS", "UNA HISTORIA", "UN FUTURO"],
            description: "Del Pantanal al Pacífico — la mayor integración continental de América del Sur, uniendo culturas, pueblos y mercados en 3.500 km de historia viva.",
            ctaPrimary: "Explorar Ciudades",
            ctaSecondary: "Conoce la Ruta",
            podcast: { playing: "Reproduciendo...", idle: "Escuchar el Podcast" },
            stats: { distance: "extensión total", countries: "países integrados", cities: "ciudades en la ruta", likes: "me gustas" },
            like: { liked: "¡Te gustó!", cta: "Me gusta la Ruta" },
            instagram: { title: "Ahora sigue la ruta en Instagram", sub: "@rota4mundos · novedades de 4 países", follow: "Seguir" },
            cards: { countries: "Los 4 países de la ruta", route: "Trazado de la ruta — Atlántico → Pacífico", unescoTitle: "Reconocimiento UNESCO", unescoDesc: "Patrimonio cultural y natural reconocido internacionalmente a lo largo del corredor" },
            scroll: "descubrir",
            atlantic: "← Atlántico",
            pacific: "Pacífico →",
        },
        cities: {
            title: "Ciudades de la Ruta",
            subtitle: "Puntos estratégicos de desarrollo",
            sectionTitle: "CIUDADES QUE",
            sectionTitleHighlight: "CUENTAN HISTORIAS",
            sectionDescription: "Del Pantanal al Pacífico — Brasil, Paraguay, Argentina y Chile. Cada parada de la ruta lleva una historia que el mundo aún no conoce.",
            routeIndicator: "Atlántico → Pacífico",
            viewAll: "Ver todas las ciudades de la ruta",
            explore: "Explorar el Corredor",
            exploreHint: "Haga clic en un país para explorar las ciudades",
            exploreHintMobile: "Toque un país para explorar",
            scrollHint: "↓ deslice para ver el libro completo",
            viewCities: "Ver ciudades",
            citiesLabel: "ciudades",
            population: "Población",
            economy: "Economía",
            countries: { brazil: "Brasil", paraguay: "Paraguay", argentina: "Argentina", chile: "Chile" },
        },
        newsletter: {
            title: "Manténgase informado",
            description: "Reciba las últimas noticias sobre inversiones y oportunidades en la Ruta Bioceánica.",
            placeholder: "Su mejor correo",
            button: "Suscribirse",
            success: "¡Suscripción realizada con éxito!",
        },
        footer: {
            rights: "Todos los derechos reservados.",
            contact: "Contacto",
            partners: "Socios",
            description: "El corredor que conecta el Atlántico con el Pacífico — integrando Brasil, Paraguay, Argentina y Chile en un único destino.",
            destinations: "Destinos",
            newsletter: "Boletín",
            subscribe: "Suscribirse",
            emailPlaceholder: "su@email.com",
            viewAll: "Ver todos →",
        },
        colabo: {
            overline: "Colabora con el portal",
            titleMain: "Tú eres parte",
            titleHighlight: "de esta historia",
            description: "Periodistas locales, historiadores, fotógrafos y narradores — envía artículos, fotos antiguas o cuentos y verás tu voz llegar a los cuatro países de la ruta.",
            cta: "Quiero colaborar",
            items: ["Artículos y Reportajes", "Fotos Históricas", "Cuentos y Testimonios"],
            more: "+ testimonios y mucho más",
        },
        apoie: {
            overline: "Sé parte",
            titlePart1: "LA RUTA ESTÁ HECHA",
            titlePart2: "DE ASFALTO.",
            titlePart3: "ESTE PORTAL ESTÁ",
            titlePart4: "HECHO DE PERSONAS.",
            description: "El mayor corredor de integración de América del Sur ya tiene fecha. La ventana de 2026 está abierta — falta tu nombre en ella.",
            cta: "Ver todas las formas de participar",
            ctaMobile: "Ver formas de participar",
            cards: [
                { label: "Partidario",         title: "Cree en la Causa",   desc: "Personas que creen en la integración de América del Sur y quieren ser parte de esta historia.",                              cta: "Quiero apoyar",           badge: "" },
                { label: "Patrocinador",        title: "Conecta tu Marca",   desc: "Hoteles, empresas de logística y operadores que quieren ser protagonistas en la narrativa de la ruta.",                    cta: "Hablar de patrocinio",    badge: "Más solicitado" },
                { label: "Carta de Intención",  title: "Sé Referencia",      desc: "Alcaldías, secretarías, cámaras de comercio y entidades que quieren protagonismo en el corredor.",                        cta: "Manifiesto interés",      badge: "" },
            ],
        },
    },

    "en-US": {
        nav: {
            home: "Home",
            cities: "Cities",
            news: "News",
            about: "About",
            invest: "Invest",
            admin: "Admin",
            login: "Login",
            logout: "Logout",
            support: "Support",
            supportMobile: "Support the project",
        },
        hero: {
            badge: "Bioceanic Route · 4 Countries · 3,500 km",
            titleLine1: "THE BRIDGE BETWEEN",
            words: ["TWO OCEANS", "ONE STORY", "ONE FUTURE"],
            description: "From the Pantanal to the Pacific — the greatest continental integration in South America, uniting cultures, peoples and markets across 3,500 km of living history.",
            ctaPrimary: "Explore Cities",
            ctaSecondary: "Discover the Route",
            podcast: { playing: "Playing...", idle: "Listen to the Podcast" },
            stats: { distance: "total extension", countries: "integrated countries", cities: "cities on the route", likes: "likes" },
            like: { liked: "Liked!", cta: "Like the Route" },
            instagram: { title: "Now follow the route on Instagram", sub: "@rota4mundos · news from 4 countries", follow: "Follow" },
            cards: { countries: "The 4 countries of the route", route: "Route map — Atlantic → Pacific", unescoTitle: "UNESCO Recognition", unescoDesc: "Cultural and natural heritage internationally recognized along the corridor" },
            scroll: "discover",
            atlantic: "← Atlantic",
            pacific: "Pacific →",
        },
        cities: {
            title: "Route Cities",
            subtitle: "Strategic development points",
            sectionTitle: "CITIES THAT",
            sectionTitleHighlight: "TELL STORIES",
            sectionDescription: "From the Pantanal to the Pacific — Brazil, Paraguay, Argentina and Chile. Each stop on the route carries a story the world doesn't know yet.",
            routeIndicator: "Atlantic → Pacific",
            viewAll: "See all route cities",
            explore: "Explore the Corridor",
            exploreHint: "Click on a country to explore the cities",
            exploreHintMobile: "Tap a country to explore",
            scrollHint: "↓ scroll to see the full book",
            viewCities: "See cities",
            citiesLabel: "cities",
            population: "Population",
            economy: "Economy",
            countries: { brazil: "Brazil", paraguay: "Paraguay", argentina: "Argentina", chile: "Chile" },
        },
        newsletter: {
            title: "Stay Updated",
            description: "Receive the latest news about investments and opportunities on the Bioceanic Route.",
            placeholder: "Your best email",
            button: "Subscribe",
            success: "Subscription successful!",
        },
        footer: {
            rights: "All rights reserved.",
            contact: "Contact",
            partners: "Partners",
            description: "The corridor connecting the Atlantic to the Pacific — integrating Brazil, Paraguay, Argentina and Chile into a single destination.",
            destinations: "Destinations",
            newsletter: "Newsletter",
            subscribe: "Subscribe",
            emailPlaceholder: "your@email.com",
            viewAll: "See all →",
        },
        colabo: {
            overline: "Collaborate with the portal",
            titleMain: "You are part",
            titleHighlight: "of this story",
            description: "Local journalists, historians, photographers and storytellers — send articles, old photos or stories and see your voice reach the four countries of the route.",
            cta: "I want to collaborate",
            items: ["Articles & Reports", "Historic Photos", "Stories & Testimonials"],
            more: "+ testimonials and much more",
        },
        apoie: {
            overline: "Be part of it",
            titlePart1: "THE ROUTE IS MADE",
            titlePart2: "OF ASPHALT.",
            titlePart3: "THIS PORTAL IS",
            titlePart4: "MADE OF PEOPLE.",
            description: "The greatest integration corridor in South America already has a date. The 2026 window is open — your name is missing from it.",
            cta: "See all ways to participate",
            ctaMobile: "See ways to participate",
            cards: [
                { label: "Supporter",          title: "Believe in the Cause", desc: "People who believe in South American integration and want to be part of this story.",                                       cta: "I want to support",       badge: "" },
                { label: "Sponsor",             title: "Connect Your Brand",   desc: "Hotels, logistics companies and operators who want to be protagonists in the route's narrative.",                         cta: "Talk about sponsorship",  badge: "Most popular" },
                { label: "Letter of Intent",    title: "Be a Reference",       desc: "Municipalities, secretariats, chambers of commerce and entities that want a leading role in the corridor.",             cta: "I express interest",      badge: "" },
            ],
        },
    },
};
