import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Anchor, Gem, Eye,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Século XIX",
        icon: Gem,
        title: "O Ouro Branco do Deserto",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Antofagasta nasceu do salitre — o fertilizante que alimentou os campos europeus e asiáticos durante décadas. No século XIX, o 'ouro branco do deserto' transformou uma orla árida no maior porto exportador do Pacífico Sul. Engenheiros britânicos, mineiros bolivianos e trabalhadores chilenos construíram a cidade que o deserto não deveria permitir.",
        symbol: "Salitre — o ouro branco que construiu Antofagasta",
    },
    {
        era: "1879–1884",
        icon: Anchor,
        title: "A Guerra do Pacífico",
        color: "from-sky-700 to-blue-800",
        accent: "text-sky-400",
        border: "border-sky-500/30",
        body: "A Guerra do Pacífico foi um dos conflitos mais decisivos da história sul-americana. Chile, Peru e Bolívia disputaram o domínio do deserto de Atacama e seus recursos. Antofagasta estava no centro do conflito — território boliviano que se tornou chileno após a vitória. A memória da guerra moldou identidades nacionais que persistem até hoje.",
        symbol: "Guerra do Pacífico — o conflito que redesenhou o continente",
    },
    {
        era: "Século XX",
        icon: Gem,
        title: "Cobre, Modernidade e Ciência",
        color: "from-orange-700 to-amber-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "Quando o salitre cedeu ao fertilizante sintético, o cobre assumiu o trono. Antofagasta tornou-se capital mundial do cobre — mineral essencial para a eletrificação do planeta. Universidades, centros de pesquisa e inovação tecnológica transformaram a cidade mineradora numa metrópole do conhecimento. O Atacama também revelou seus céus: os melhores observatórios astronômicos do mundo surgiram na região.",
        symbol: "Cobre — o metal do século XX e do futuro",
    },
    {
        era: "Hoje",
        icon: Globe,
        title: "Portal Bioceânico do Pacífico",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Hoje, Antofagasta é a porta de saída da Rota Bioceânica — onde a travessia continental que começa no Pantanal brasileiro finalmente alcança o Pacífico. Porto ativo, segunda cidade mais populosa do norte chileno, polo universitário e destino de observação astronômica de classe mundial. O Atlântico chegou ao Pacífico — e Antofagasta é o fim e o começo de tudo.",
        symbol: "Rota Bioceânica — o Pacífico recebe o continente",
    },
];

const attractions = [
    { name: "La Portada", icon: Waves, desc: "O monumento natural mais famoso do Chile. Arco rochoso de 43m esculpido pelo mar ao longo de milhões de anos — ao entardecer, as falésias douradas refletem no Pacífico azul-profundo. Uma das imagens mais cinematográficas da América do Sul.", badge: "Ícone" },
    { name: "Porto de Antofagasta", icon: Anchor, desc: "O segundo maior porto do norte chileno e um dos mais movimentados do Pacífico Sul. Gruas, navios cargueiros e a escala humana do mar — o ponto onde a Rota Bioceânica toca o oceano.", badge: "Porto" },
    { name: "Ruínas de Huanchaca", icon: Mountain, desc: "Refinaria de prata boliviana do século XIX, preservada no coração da cidade. Hoje é monumento histórico e centro cultural — memória em pedra de quando Antofagasta ainda era território boliviano.", badge: "História" },
    { name: "Valle de la Luna", icon: Camera, desc: "A 100km de Antofagasta, o Vale da Lua oferece uma das paisagens mais extraterrestres da Terra. Dunas, formações de sal e crateras que parecem de outro planeta — o Atacama em sua forma mais radical.", badge: "Atacama" },
    { name: "Observatório Paranal (ESO)", icon: Eye, desc: "O Observatório Europeu do Sul, no deserto a 130km de Antofagasta, abriga o VLT — um dos maiores telescópios do mundo. O céu do Atacama é o mais limpo do planeta para astronomia.", badge: "Ciência" },
    { name: "Praia El Balneario", icon: Waves, desc: "A principal praia urbana de Antofagasta — onde os moradores nadam e pescam no Pacífico com o Atacama ao fundo. O cotidiano da cidade costeira mais extrema do mundo.", badge: "Mar" },
    { name: "Museu Regional de Antofagasta", icon: Star, desc: "Acervo da era salitreira, da Guerra do Pacífico e das culturas pré-colombianas do deserto. A memória de Antofagasta contada com profundidade e sem romantismo.", badge: "Museu" },
    { name: "Salar de Atacama", icon: Gem, desc: "O maior salar do Chile e um dos maiores do mundo — habitat dos flamingos rosados que habitam as lagoas de lítio. A 250km de Antofagasta, uma das vistas mais surreais do Pacífico sul-americano.", badge: "Natureza" },
];

const dishes = [
    { name: "Centolla do Pacífico", icon: Waves, desc: "O caranguejo gigante das águas profundas do Pacífico Sul — de carne suculenta e sabor único. Em Antofagasta, a centolla chega diretamente do mar e é preparada no mesmo dia. Símbolo da gastronomia costeira.", tag: "Ícone" },
    { name: "Ceviche Chileno", icon: Leaf, desc: "Frutos do mar frescos marinados com limão, coentro e ají. A versão chilena é mais suave que a peruana — sabor limpo e nítido do Pacífico sem interferir com a qualidade do pescado.", tag: "Costeiro" },
    { name: "Congrio à la Plancha", icon: Flame, desc: "O peixe mais tradicional da culinária chilena, preparado em Antofagasta com o frescor máximo do Pacífico. Carne firme, sabor delicado — impossível de replicar terra adentro.", tag: "Tradicional" },
    { name: "Empanadas de Mariscos", icon: Utensils, desc: "A empanada chilena recheada com mariscos frescos do Pacífico. Conchas, mexilhões e camarões numa massa assada com técnica artesanal. O snack costeiro mais popular do norte chileno.", tag: "Popular" },
    { name: "Chupe de Mariscos", icon: Utensils, desc: "Ensopado espesso de frutos do mar com leite, queijo e especiarias. Herança culinária andino-costeira que aquece nas noites em que o vento do Pacífico corre livre pelo deserto.", tag: "Conforto" },
    { name: "Vinhos do Norte Chileno", icon: Flame, desc: "Os vinhos do Vale do Elqui e outros produtores do norte chileno chegam às mesas de Antofagasta. Mineralogia do solo árido imprime caráter único — vinhos que o oceano e o deserto constroem juntos.", tag: "Terroir" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Cidade e Porto",
        morning: "Centro histórico de Antofagasta — Praça Colón, Estação Ferroviária (patrimônio da era salitreira) e a Ruínas de Huanchaca. A cidade que o salitre e o cobre construíram.",
        afternoon: "Porto de Antofagasta — onde a Rota Bioceânica toca o Pacífico. Navios, gruas, a escala do comércio continental. O oceano que deu sentido a toda a travessia.",
        evening: "Pôr do sol sobre o Pacífico com frutos do mar na orla. Centolla, ceviche e o mar azul-profundo com o Atacama dourado ao fundo. Antofagasta emociona pela grandiosidade.",
        color: "from-sky-600 to-blue-700",
        icon: Anchor,
    },
    {
        day: "Dia 2",
        theme: "La Portada e Praias",
        morning: "La Portada ao amanhecer — o arco natural de 43m banhado pela luz do Pacífico. As falésias douradas, os pelicanos em voo e o barulho do mar contra a rocha. Impossível não fotografar.",
        afternoon: "Praias do litoral norte — El Balneario e Hornitos. O Pacífico em temperatura amena, com o deserto árido como pano de fundo. A dualidade que define Antofagasta.",
        evening: "Jantar de congrio e chupe de mariscos com vinho chileno. O som do oceano, o silêncio do Atacama ao longe, as estrelas começando a surgir.",
        color: "from-blue-600 to-sky-700",
        icon: Waves,
    },
    {
        day: "Dia 3",
        theme: "Atacama e Astronomia",
        morning: "Valle de la Luna — paisagem extraterrestre a 100km da cidade. Dunas, formações de sal cristalizado e um silêncio mineral que não existe em nenhuma outra parte do planeta.",
        afternoon: "Salar de Atacama — flamingos rosados nas lagoas de lítio. Branco infinito, altitude e o azul impossível do céu atacamenho. A outra face de Antofagasta.",
        evening: "Observação astronômica noturna no deserto. O céu mais limpo do planeta exibe a Via Láctea completa. O mesmo deserto que guarda minerais guarda estrelas — Antofagasta encerra a travessia com o cosmos.",
        color: "from-indigo-600 to-blue-700",
        icon: Eye,
    },
];

const curiosities = [
    { text: "Antofagasta é a cidade com maior contraste altimétrico do mundo em relação à costa — o Atacama sobe de 0 a 4.000m em menos de 200km, criando microclimas extremos que jamais se tocam." },
    { text: "La Portada, o arco natural símbolo de Antofagasta, tem 43 metros de altura e foi formada ao longo de 20 milhões de anos pela erosão do mar — é um dos monumento naturais mais fotografados do Chile." },
    { text: "O deserto de Atacama é o mais seco da Terra — algumas estações meteorológicas do planalto nunca registraram chuva. Os céus são tão limpos que o ESO (European Southern Observatory) instalou seus maiores telescópios ali." },
    { text: "A Guerra do Pacífico (1879–1884) fez com que a Bolívia perdesse seu acesso ao mar. Antofagasta era território boliviano — hoje é chilena. A Bolívia ainda reivindica uma saída para o Pacífico." },
    { text: "Antofagasta é a segunda cidade mais rica do Chile por renda per capita — graças ao cobre. A região produz aproximadamente 10% do cobre mundial, tornando-a estratégica para a eletrificação global." },
    { text: "O Observatório Paranal do ESO, a 130km de Antofagasta, abriga o VLT (Very Large Eye) — com 4 telescópios de 8,2m cada, capazes de ver objetos 4 bilhões de vezes mais fracos que o olho humano." },
    { text: "O litoral de Antofagasta é habitado por lobos marinhos, pelicanos, flamingos e pinguins de Humboldt — espécies adaptadas à Corrente de Humboldt que traz águas frias do Pacífico para o litoral chileno." },
    { text: "Em Antofagasta existem prédios e estruturas da era salitreira do século XIX ainda em uso — a Estação de Trem, construída pelos britânicos em 1872, é a mais antiga em funcionamento no Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3"
        >
            {children}
        </motion.span>
    );
}

function SectionTitle({ children, light = false, className = "" }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${light ? "text-white" : "text-primary-950"} ${className}`}
        >
            {children}
        </motion.h2>
    );
}

/* ─── infográfico ────────────────────────────────────────────── */

function InfograficoSection() {
    const [open, setOpen] = useState(false);
    const src = useInfographic("antofagasta");
    return (
        <>
            <section className="bg-primary-950 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto cursor-zoom-in group"
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={src}
                            alt="Infográfico editorial Antofagasta"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Clique para ampliar</p>
                </div>
            </section>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src}
                            alt="Infográfico editorial Antofagasta"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── page ───────────────────────────────────────────────────── */

export default function AntofagastaPage() {
    return (
        <div className="min-h-screen">

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Regiao de Antofagasta"
                name={{ first: "Antofagasta", second: "" }}
                tagline="Onde o Atacama beija o Pacifico — capital do cobre, dos observatorios e da maior vista continental do oceano."
                scene="pacifico"
                image="/cities/antofagasta.png"
                accentColor="#38bdf8"
                stats={[
                    { label: "Habitantes", value: 500000 },
                    { label: "Fundacao", value: 1866 },
                    { label: "Altitude VLT Paranal (m)", value: 2635, suffix: " m" },
                    { label: "Km de Santiago", value: 1360, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Antofagasta</SectionLabel>
                        <SectionTitle>
                            A cidade entre{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                dois infinitos
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Antofagasta não é apenas um porto — é uma dualidade impossível. De um lado, o
                            deserto mais seco da Terra com seus minerais, seus observatórios e seu silêncio
                            mineral. Do outro, o Pacífico com frutos do mar, falésias douradas e a sensação
                            de fim de travessia.{" "}
                            <strong className="text-primary-700">É onde a Rota Bioceânica finalmente
                            alcança o oceano</strong> — e onde o Atlântico e o Pacífico se encontram
                            através de um continente inteiro.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Portal do Pacífico",
                                text: "O porto de Antofagasta é onde a Rota Bioceânica toca o oceano. Cargueiros, exportação de cobre, e a chegada de mercadorias do Atlântico — o ponto onde o corredor continental se encontra com o comércio global.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Gem,
                                title: "Capital do Cobre",
                                text: "Antofagasta é o centro da maior região produtora de cobre do mundo. O metal que eletrifica o planeta é extraído aqui — e a riqueza mineral transformou uma orla árida numa metrópole do conhecimento e da tecnologia.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Eye,
                                title: "Atacama e Cosmos",
                                text: "O deserto mais seco da Terra cria o céu mais limpo do planeta. Observatórios internacionais capturam estrelas a bilhões de anos-luz. La Portada e o Valle da Lua completam o cenário — natureza impossível em cada direção.",
                                color: "from-indigo-50 to-blue-50",
                                accent: "text-indigo-700",
                                iconBg: "bg-indigo-100",
                            },
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.color}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5`}>
                                    <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
                                </div>
                                <h3 className={`font-display text-xl font-bold ${pillar.accent} mb-3`}>{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{pillar.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HISTÓRIA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Salitre, Guerra e Futuro</SectionLabel>
                        <SectionTitle light>
                            De ouro branco a{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                                portal do cosmos
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Antofagasta foi construída pelo deserto, disputada por guerras e reinventada pelo
                            cobre. Cada período deixou marcas visíveis em pedra, porto e identidade.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {historia.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.6 }}
                                className={`rounded-3xl border ${item.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}
                            >
                                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${item.accent} uppercase tracking-widest`}>
                                                {item.era}
                                            </span>
                                            <h3 className="text-white font-bold text-lg mt-1 leading-tight">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 ml-4`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className={`inline-flex items-center gap-2 text-xs ${item.accent} font-semibold`}>
                                        <ChevronRight className="w-3 h-3" />
                                        {item.symbol}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LA PORTADA SPOTLIGHT ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-900/18 via-transparent to-blue-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-sky-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(251,191,36,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                                        <Waves className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
                                        Monumento Natural do Chile
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    La Portada
                                    <br />
                                    <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                        O arco que o Pacífico esculpiu em 20 milhões de anos
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Ao norte de Antofagasta, o mar esculpiu uma das formações rochosas mais
                                    impressionantes da América do Sul. La Portada é um arco natural de 43 metros
                                    de altura — declarado Monumento Natural em 1990 — onde o Atacama amarelado
                                    contrasta com o azul profundo do Pacífico. Ao entardecer, as cores do deserto
                                    e do oceano se encontram num espetáculo que não precisa de legenda.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Altura da formação", val: "43 m", sub: "Arco esculpido pelo mar" },
                                        { label: "Monumento Natural", val: "1990", sub: "Proteção do Estado chileno" },
                                        { label: "Formação geológica", val: "20 M a.", sub: "Anos de erosão oceânica" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-sky-500/10">
                                            <div className="text-2xl font-bold text-sky-300 font-display mb-1">{stat.val}</div>
                                            <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
                                            <div className="text-white/30 text-xs mt-1">{stat.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── DUALIDADE ATACAMA + PACÍFICO ─────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Entre Dois Mundos</SectionLabel>
                        <SectionTitle light>
                            Deserto, oceano,{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                mineração e cosmos
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Deserto do Atacama",
                                text: "O mais seco da Terra — algumas estações nunca registraram chuva. Salares de lítio, vulcões inativos, Valle da Lua e o silêncio mineral que transforma qualquer viagem numa experiência meditativa.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Oceano Pacífico",
                                text: "Corrente de Humboldt traz águas frias do polo — pelicanos, lobos marinhos, pinguins de Humboldt e frutos do mar extraordinários numa costa árida que não deveria ser fértil.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: Gem,
                                title: "Capital do Cobre",
                                text: "A região produz ~10% do cobre mundial — metal essencial para a eletrificação global. Minas gigantescas, inovação tecnológica e universidades moldaram uma metrópole moderna num deserto radical.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Eye,
                                title: "Observatórios ESO",
                                text: "O céu mais limpo do planeta. O Observatório Paranal abriga o VLT — quatro telescópios de 8,2m. À noite, o Atacama não é apenas deserto: é uma janela para o cosmos.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl border ${card.border} bg-white/[0.04] p-7 hover:bg-white/[0.07] transition-all duration-300`}
                            >
                                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5`}>
                                    <card.icon className={`w-5 h-5 ${card.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${card.accent} mb-3`}>{card.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-14">
                        <SectionLabel>Frutos do Pacífico</SectionLabel>
                        <SectionTitle>
                            Gastronomia{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                do fim da travessia
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="bg-slate-50 rounded-3xl p-7 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                                        {dish.tag}
                                    </span>
                                </div>
                                <h3 className="font-bold text-primary-950 text-base mb-2">{dish.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRAÇÕES ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {attractions.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-sky-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">
                                        {a.badge}
                                    </span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">{a.name}</h3>
                                <p className="text-white/35 text-xs leading-relaxed">{a.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roteiro Sugerido</SectionLabel>
                        <SectionTitle>
                            3 dias em{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                Antofagasta e Atacama
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.12 * i }}
                                className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`bg-gradient-to-r ${day.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70">{day.day}</span>
                                        <day.icon className="w-5 h-5 opacity-70" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold">{day.theme}</h3>
                                </div>
                                <div className="p-6 space-y-4 bg-slate-50">
                                    {[
                                        { label: "Manhã", text: day.morning },
                                        { label: "Tarde", text: day.afternoon },
                                        { label: "Noite", text: day.evening },
                                    ].map((period) => (
                                        <div key={period.label}>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{period.label}</span>
                                            <p className="text-slate-600 text-sm leading-relaxed mt-1">{period.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: 0.06 * i }}
                                className="flex items-start gap-4 bg-white/[0.04] rounded-2xl p-5 border border-white/8"
                            >
                                <div className="w-7 h-7 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-sky-400" />
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <SectionLabel>Planeje sua Visita</SectionLabel>
                        <SectionTitle>Informações Práticas</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Como Chegar",
                                items: [
                                    "Aeroporto Internacional Andrés Sabella Gálvez — voos de Santiago, Lima, Buenos Aires",
                                    "Ônibus desde Santiago (~17h) ou Iquique (~4h) — rodoviária central",
                                    "Ruta 1 e Ruta 5 Norte — conexão com todo o norte do Chile",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "O ano inteiro — Antofagasta tem clima estável com menos de 10mm de chuva anual",
                                    "Inverno (junho-agosto): temperaturas amenas, céus perfeitos para astronomia",
                                    "Verão (dezembro-fevereiro): mar mais quente, ideal para praias e mergulho",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Peso chileno — câmbio favorável para viajantes com dólar/real/euro",
                                    "Altitude: cidade ao nível do mar — sem problemas de aclimatação",
                                    "Idioma: espanhol chileno — sotaque distinto do argentino e boliviano",
                                ],
                                accent: "text-blue-700",
                                iconBg: "bg-blue-100",
                            },
                        ].map((block, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-slate-50 p-7"
                            >
                                <div className={`w-11 h-11 rounded-2xl ${block.iconBg} flex items-center justify-center mb-5`}>
                                    <block.icon className={`w-5 h-5 ${block.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${block.accent} mb-4`}>{block.title}</h3>
                                <ul className="space-y-2.5">
                                    {block.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-slate-600 text-sm">
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section className="section-padding relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #082f49 0%, #0c4a6e 35%, #075985 65%, #0369a1 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇨🇱</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            O Pacífico espera por você
                        </h2>
                        <p className="text-sky-200/70 text-lg max-w-xl mx-auto mb-10">
                            Onde o deserto mais seco da Terra encontra o oceano mais profundo. A chegada definitiva
                            da Rota Bioceânica — onde o Atlântico e o Pacífico se cumprimentam através de um continente.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 font-bold rounded-2xl hover:bg-sky-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                            <Link
                                to="/cidades/tartagal"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Tartagal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
