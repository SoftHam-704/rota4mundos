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
    Anchor, Wind, ShoppingBag,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Século XIX",
        icon: Mountain,
        title: "O Salitre e a Cidade do Ouro Branco",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Iquique nasceu grande. Durante o século XIX, o salitre transformou esta orla árida numa das cidades mais ricas do Pacífico Sul. Engenheiros britânicos, trabalhadores bolivianos e peruanos construíram teatros, ferrovias e bairros inteiros. A riqueza do deserto ergueu uma cidade que não deveria existir — e que deu ao Chile décadas de prosperidade.",
        symbol: "Salitre — o mineral que construiu o norte chileno",
    },
    {
        era: "21 de Maio de 1879",
        icon: Anchor,
        title: "A Batalha de Iquique — O Herói do Pacífico",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Na Batalha de Iquique, o capitão Arturo Prat abordou sozinho o navio de guerra peruano Huáscar sabendo que seria morto — e morreu. Seu gesto se tornou o ato de heroísmo mais celebrado da história chilena. A data, 21 de maio, é feriado nacional. Iquique carrega essa memória como identidade: a cidade onde o Chile aprendeu o que significa honra.",
        symbol: "Arturo Prat — herói do Pacífico e da nação chilena",
    },
    {
        era: "21 de Dezembro de 1907",
        icon: Flame,
        title: "Santa María de Iquique — A Ferida que Não Fecha",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Em 1907, mais de dois mil trabalhadores do salitre e suas famílias foram massacrados pelo exército chileno na Escola Santa María de Iquique. Homens, mulheres e crianças que pediam melhores condições de trabalho. O episódio é considerado o maior massacre de trabalhadores da América Latina e moldou definitivamente o movimento operário chileno.",
        symbol: "Escola Santa María — memória do movimento operário",
    },
    {
        era: "1975 / Hoje",
        icon: ShoppingBag,
        title: "ZOFRI e a Reinvenção da Cidade",
        color: "from-teal-700 to-cyan-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Quando o salitre morreu, Iquique reinventou-se. Em 1975, a criação da Zona Franca de Iquique (ZOFRI) transformou a cidade numa das mais dinâmicas do norte chileno — conectando Chile, Bolívia, Argentina e Brasil num centro de livre comércio de classe internacional. O deserto que deu salitre agora dá logística, turismo e esportes extremos.",
        symbol: "ZOFRI — a reinvenção comercial do norte chileno",
    },
];

const attractions = [
    { name: "Humberstone & Santa Laura", icon: Mountain, desc: "Cidades fantasmas da era do salitre, Patrimônio UNESCO desde 2005. Teatros, piscinas, casas e máquinas industriais preservados no deserto — uma das experiências históricas mais impactantes da América do Sul.", badge: "UNESCO" },
    { name: "Cerro Dragón", icon: Wind, desc: "A duna de 400 metros que avança sobre a cidade de Iquique — uma das poucas grandes dunas do mundo em área urbana. Sandboard, parapente e uma vista do Pacífico que nenhuma outra cidade oferece.", badge: "Único" },
    { name: "Bairro Histórico", icon: Camera, desc: "Centro histórico de Iquique com casarões de madeira da era salitreira, a Prefeitura Art Nouveau, o Teatro Municipal (1890) e ruas que transportam ao século XIX — patrimônio vivo no meio da cidade moderna.", badge: "Patrimônio" },
    { name: "Playa Cavancha", icon: Waves, desc: "A praia urbana mais famosa de Iquique — surfistas, famílias e o contraste entre o azul profundo do Pacífico e as dunas do Atacama ao fundo. O lugar onde o deserto literalmente termina no mar.", badge: "Praia" },
    { name: "ZOFRI — Zona Franca", icon: ShoppingBag, desc: "Um dos maiores centros de livre comércio da América Latina, movimentando bilhões de dólares anuais. Conexão comercial entre Chile, Bolívia, Argentina, Brasil e Paraguai — o pulmão econômico do norte chileno.", badge: "Comércio" },
    { name: "Museu Regional de Iquique", icon: Star, desc: "Do salitre ao presente — acervo da era mineradora, da Batalha de Iquique e da identidade cultural do norte chileno. A história contada sem romantismo, com profundidade.", badge: "Museu" },
    { name: "Parapente nas Dunas", icon: Wind, desc: "As dunas do Atacama criam condições únicas para parapente e asa delta. A decolagem parte do deserto seco e o aterrisso é na praia — uma experiência que existe em poucos lugares do planeta.", badge: "Aventura" },
    { name: "Pesca e Gastronomia do Cais", icon: Anchor, desc: "O cais pesqueiro de Iquique amanhe com barcos, gaivotas e frutos do mar frescos. Caldilhos, ceviches e congrios preparados nos restaurantes de beira-mar com o produto do dia.", badge: "Gastronômico" },
];

const dishes = [
    { name: "Ceviche Nortino", icon: Waves, desc: "A versão norte-chilena do ceviche, com influência peruana — limão, coentro, ají e frutos do mar fresquíssimos pescados no próprio cais. Sabor limpo e mineral do Pacífico puro.", tag: "Costeiro" },
    { name: "Caldillo de Congrio", icon: Utensils, desc: "Pablo Neruda escreveu um ode a este prato. O congrio cozido lentamente com batatas, tomate e cebola num caldo profundo — a alma da culinária marinha chilena, mais intensa em Iquique.", tag: "Ícone" },
    { name: "Empanadas de Mariscos", icon: Flame, desc: "Mexilhão, camarão e concha numa massa folhada assada à perfeição. Clássico da costa norte do Chile — vendidas nas esquinas do bairro histórico desde o tempo do salitre.", tag: "Tradicional" },
    { name: "Erizo (Ouriço do Mar)", icon: Waves, desc: "Considerado iguaria no norte chileno, o ouriço do mar é consumido cru ou com limão. A Corrente de Humboldt cria exemplares de sabor único — aquoso, mineral, profundamente do Pacífico.", tag: "Especial" },
    { name: "Pisco Sour Chileno", icon: Leaf, desc: "A batalha simbólica: pisco chileno vs. peruano. Em Iquique, o pisco sour é bebido como ritual cotidiano — azedo, espumoso e perfumado. A bebida que define o norte chileno.", tag: "Ritual" },
    { name: "Sopas e Caldillos do Cais", icon: Utensils, desc: "O cais pesqueiro de Iquique produz sopas diárias com o que chegou na madrugada — camarão, vieira, mexilhão e peixe. Caldilhos que os pescadores levam em garrafas para o mar.", tag: "Autêntico" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "História e Patrimônio",
        morning: "Humberstone e Santa Laura ao amanhecer — as cidades fantasmas do salitre a 47km de Iquique. O Teatro, a piscina, as casas e as máquinas preservados no silêncio do deserto. UNESCO vivo.",
        afternoon: "Bairro histórico de Iquique — casarões de madeira, Teatro Municipal (1890), Prefeitura Art Nouveau e a Plaza Prat. A riqueza que o salitre construiu ainda está de pé.",
        evening: "Jantar no cais com caldillo de congrio e pisco sour. O Pacífico ao entardecer — o céu do Atacama muda de azul para dourado, depois para violeta estrelado.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Dia 2",
        theme: "Dunas e Oceano",
        morning: "Cerro Dragón ao amanhecer — a duna de 400m que avança sobre a cidade. Sandboard nas vertentes, vista do Pacífico imensa e a sensação rara de estar ao mesmo tempo no deserto e à beira-mar.",
        afternoon: "Playa Cavancha — surf, snorkeling e a vida costeira intensa de Iquique. Surfistas num mar azul-profundo com dunas douradas ao fundo. A cidade que parece impossível.",
        evening: "Parapente ou asa delta no fim do dia — decolagem da duna, sobrevoo da cidade e aterrissagem na praia. A experiência que só Iquique oferece em toda a América do Sul.",
        color: "from-sky-600 to-blue-700",
        icon: Wind,
    },
    {
        day: "Dia 3",
        theme: "ZOFRI e Pacífico",
        morning: "Escola Santa María de Iquique — monumento ao massacre de 1907 que mudou o Chile. Memória difícil e necessária. A cidade que não esqueceu seus trabalhadores.",
        afternoon: "ZOFRI — a zona franca mais dinâmica do norte chileno. Bilhões de dólares em comércio, conexão com Bolívia, Argentina e Brasil. A reinvenção de Iquique na era bioceânica.",
        evening: "Último pôr do sol sobre o Pacífico. O oceano que a Rota Bioceânica atravessou um continente para alcançar. Ceviche fresco, pisco sour e o silêncio do Atacama ao longe — travessia completa.",
        color: "from-teal-600 to-cyan-700",
        icon: ShoppingBag,
    },
];

const curiosities = [
    { text: "Iquique é uma das cidades mais secas do mundo permanentemente habitadas — a média anual de chuvas é menos de 1mm. A bruma (camanchaca) do Pacífico é a única umidade que a cidade conhece." },
    { text: "O Cerro Dragón é uma das poucas grandes dunas urbanas do mundo — com 400 metros de altura, avança em direção à cidade a uma taxa mensurável anualmente. Iquique convive com o deserto no seu jardim." },
    { text: "O massacre da Escola Santa María de Iquique (1907) foi o maior massacre de trabalhadores da América Latina — 2.000 a 3.600 operários do salitre e familiares assassinados pelo exército. O evento moldou o sindicalismo chileno por gerações." },
    { text: "Arturo Prat, o herói da Batalha de Iquique (1879), abordou o Huáscar com apenas dois homens sabendo que morreria — o gesto tornou-se o maior símbolo de heroísmo da história chilena. 21 de maio é feriado nacional." },
    { text: "Humberstone e Santa Laura foram declaradas Patrimônio da Humanidade pela UNESCO em 2005 — duas das poucas cidades industriais fantasmas protegidas no mundo, preservando máquinas, teatros e casas do século XIX." },
    { text: "A ZOFRI (Zona Franca de Iquique) é responsável por uma parcela significativa do PIB da região de Tarapacá e conecta diretamente o Chile a Bolívia, Argentina, Brasil e Paraguai — logística que a Rota Bioceânica fortalece." },
    { text: "Iquique é considerada a capital do parapente e asa delta do Chile — o vento constante do Pacífico e as dunas do Atacama criam condições excepcionais. Pilotos vêm de todo o mundo para as dunas de Iquique." },
    { text: "A cantata 'La Cantata Santa María de Iquique' (1970), do grupo Quilapayún, é uma das obras musicais mais importantes do Chile — ela narrou o massacre de 1907 e se tornou símbolo de resistência cultural latino-americana." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("iquique");
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
                            alt="Infográfico editorial Iquique"
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
                            alt="Infográfico editorial Iquique"
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

export default function IquiquePage() {
    return (
        <div className="min-h-screen">

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Regiao de Tarapaca"
                name={{ first: "Iquique", second: "" }}
                tagline="Porto historico, duna urbana de 400 metros e a memoria salitreira que moldou o Chile moderno."
                scene="pacifico"
                image="/cities/iquique.png"
                accentColor="#fb923c"
                stats={[
                    { label: "Habitantes", value: 235000 },
                    { label: "Duna urbana (m)", value: 400, suffix: " m" },
                    { label: "UNESCO Humberstone", value: 2005 },
                    { label: "Km de Antofagasta", value: 310, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Iquique</SectionLabel>
                        <SectionTitle>
                            A cidade que o salitre{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                construiu e o mar abraçou
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Iquique tem camadas. Debaixo dos arranha-céus modernos estão casarões de madeira
                            salitreira. Atrás das praias está uma duna de 400 metros. Atrás do comércio global
                            da ZOFRI está a memória de dois mil trabalhadores massacrados.{" "}
                            <strong className="text-primary-700">É a segunda grande saída chilena
                            da Rota Bioceânica</strong> — uma cidade construída por contradições
                            que se tornaram identidade.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "Patrimônio UNESCO",
                                text: "Humberstone e Santa Laura — cidades fantasmas do salitre preservadas no deserto desde 1872. UNESCO desde 2005. Museus vivos onde máquinas, teatros e casas contam o ciclo que construiu o norte chileno.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wind,
                                title: "Cerro Dragón e Esportes",
                                text: "A duna de 400m que avança sobre a cidade cria condições únicas para parapente, sandboard e asa delta. O deserto começa na última rua e o Pacífico começa na próxima — Iquique tem os dois.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI — Polo Comercial",
                                text: "A Zona Franca de Iquique conecta Chile, Bolívia, Argentina, Brasil e Paraguai num centro de livre comércio de classe internacional. A reinvenção pós-salitre que transformou Iquique num hub do Pacífico Sul.",
                                color: "from-teal-50 to-cyan-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Do Salitre à ZOFRI</SectionLabel>
                        <SectionTitle light>
                            História em camadas:{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                heroísmo, tragédia e reinvenção
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Poucas cidades têm uma história tão densa quanto Iquique — batalhas navais,
                            massacres operários, riqueza e decadência, e uma reinvenção que continua.
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

            {/* ── HUMBERSTONE SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/18 via-transparent to-sky-900/12" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-amber-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(6,27,51,0.95) 60%, rgba(14,165,233,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                        <Mountain className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                                        Patrimônio da Humanidade — UNESCO 2005
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Humberstone e Santa Laura
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        O salitre que o deserto preservou
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    A 47km de Iquique, duas cidades inteiras sobrevivem no deserto — paradas no tempo
                                    desde que o salitre morreu. Teatros, piscinas, casas, máquinas e escolas
                                    preservados pela extrema aridez do Atacama. Em 2005, a UNESCO reconheceu
                                    o que o deserto já sabia: este patrimônio industrial é único no mundo.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Fundação", val: "1872", sub: "Humberstone original" },
                                        { label: "UNESCO desde", val: "2005", sub: "Patrimônio Industrial" },
                                        { label: "Distância", val: "47 km", sub: "A leste de Iquique" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-amber-500/10">
                                            <div className="text-2xl font-bold text-amber-300 font-display mb-1">{stat.val}</div>
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

            {/* ── DUALIDADE DUNA + MAR ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Uma Cidade de Extremos</SectionLabel>
                        <SectionTitle light>
                            Salitre, duna,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-sky-300 bg-clip-text text-transparent">
                                Pacífico e memória
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Cerro Dragón",
                                text: "400 metros de duna urbana que avança sobre Iquique. Sandboard, parapente e o visual impossível de deserto + cidade + oceano em uma única foto. Só existe aqui.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Praias e Surf",
                                text: "Playa Cavancha e outras praias urbanas com Pacífico frio e ondas que formam surfistas de classe mundial. O contraste visual com as dunas ao fundo é único na América do Sul.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI",
                                text: "Bilhões de dólares anuais em livre comércio. A Zona Franca conecta todo o cone sul — Chile, Bolívia, Argentina, Brasil e Paraguai. A reinvenção de Iquique no século XXI.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Anchor,
                                title: "Memória Operária",
                                text: "A Escola Santa María e a Cantata de Quilapayún — o massacre de 1907 que nunca foi esquecido. Iquique lembra porque a memória dos trabalhadores é a sua identidade mais profunda.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
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
                        <SectionLabel>Sabores do Norte Chileno</SectionLabel>
                        <SectionTitle>
                            Gastronomia{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                do cais e do deserto
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
                                    <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-amber-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Iquique e arredores
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                                <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-amber-400" />
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
                                    "Aeroporto Internacional Diego Aracena — voos de Santiago (2h), Lima e outras capitais",
                                    "Ônibus desde Santiago (~24h) ou Antofagasta (~4h) pela Ruta 1 Norte",
                                    "Ruta 1 (Panamericana Norte) — conexão litoral com toda a costa do norte chileno",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "O ano inteiro — Iquique tem menos de 1mm de chuva por ano e céu quase sempre limpo",
                                    "Novembro a abril: temperatura do mar mais amena para surf e mergulho",
                                    "Inverno (junho-agosto): vento constante — ideal para parapente e asa delta",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Peso chileno — câmbio favorável para viajantes com dólar/real/euro",
                                    "Altitude: cidade ao nível do mar, mas Humberstone fica a 1.000m — roupas de camada",
                                    "Idioma: espanhol chileno — sotaque distinto e rápido, mas comunicação fácil",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    style={{ background: "linear-gradient(135deg, #1c0a00 0%, #78350f 35%, #92400e 65%, #b45309 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/12 rounded-full blur-[90px]" />
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
                            Iquique espera por você
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            Onde a duna mais alta beija o oceano mais fundo. A segunda grande saída da Rota
                            Bioceânica — salitre, memória e a reinvenção de uma cidade que nunca para.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                            <Link
                                to="/cidades/antofagasta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Antofagasta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
