import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Século XIX",
        icon: Compass,
        title: "Guerra do Paraguai e a Retirada da Laguna",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "A região foi cenário de um dos episódios mais marcantes da história nacional: a Retirada da Laguna, durante a Guerra do Paraguai. Tropas brasileiras atravessaram esse território em uma campanha militar que ficou gravada na memória coletiva do Mato Grosso do Sul, consolidando a importância estratégica das terras da Serra da Bodoquena.",
        symbol: "Cemitério dos Heróis da Guerra do Paraguai",
    },
    {
        era: "Origem",
        icon: Leaf,
        title: "A Fazenda Jardim e o Nome da Cidade",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "A área pertencia à Fazenda Jardim, que deu nome ao futuro povoado. A ocupação definitiva aconteceu com o desenvolvimento de fazendas e rotas comerciais, impulsionada pela atividade pecuária e pela riqueza natural da região — rios cristalinos, cavernas e uma biodiversidade que ainda hoje encanta quem visita.",
        symbol: "Fazenda Jardim",
    },
    {
        era: "Década de 1940",
        icon: ArrowRight,
        title: "A CER-3 e a BR-060",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "A chegada da Comissão de Estradas de Rodagem (CER-3) para a construção da BR-060 foi divisor de águas: impulsionou o povoado, atraiu novas famílias e transformou Jardim em ponto de passagem e integração regional. O Museu da CER-3, hoje patrimônio da cidade, preserva essa memória viva.",
        symbol: "Museu da Comissão de Estradas (CER-3)",
    },
    {
        era: "1948 → 1979",
        icon: Star,
        title: "De Distrito a Município",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Em 1948, Jardim era Distrito de Bela Vista. A emancipação político-administrativa em 1979 transformou o distrito em município independente, abrindo caminho para o desenvolvimento do ecoturismo, da pecuária e da consolidação de Jardim como polo regional da Serra da Bodoquena.",
        symbol: "Praça Central de Jardim",
    },
];

const attractions = [
    { name: "Lagoa Misteriosa", icon: Waves, desc: "Uma das cavernas alagadas mais profundas do mundo. Águas de clareza absoluta e azul intenso — referência internacional em mergulho e contemplação.", badge: "Mergulho" },
    { name: "Rio da Prata", icon: Fish, desc: "Flutuação em águas azul-turquesa com visibilidade excepcional. Peixes, vegetação subaquática e paisagens preservadas em estado natural.", badge: "Flutuação" },
    { name: "Buraco das Araras", icon: Camera, desc: "Grande dolina natural que abriga dezenas de araras-vermelhas. Um dos cartões-postais mais impressionantes da Serra da Bodoquena.", badge: "Fauna" },
    { name: "Serra da Bodoquena", icon: Mountain, desc: "Área de rica biodiversidade com cachoeiras, trilhas, rios e cavernas. Reconhecida internacionalmente pelas águas cristalinas e ecossistema preservado.", badge: "Natureza" },
    { name: "Grutas e Cavernas", icon: Compass, desc: "Formações rochosas impressionantes, ideais para exploração e contemplação. A geologia calcária cria cenários subterrâneos únicos.", badge: "Espeleologia" },
    { name: "Cachoeiras e Trilhas", icon: Trees, desc: "Cenários incríveis para quem busca aventura e contato com a natureza. Trilhas que revelam a fauna e flora do Cerrado e Pantanal.", badge: "Aventura" },
    { name: "Balneários Naturais", icon: Waves, desc: "Contato direto com rios cristalinos, peixes e mata nativa. Opções para banho, lazer e contemplação em ambiente totalmente preservado.", badge: "Lazer" },
    { name: "Pesca Esportiva", icon: Fish, desc: "Rios repletos de espécies como pacu, pintado e dourado. Excelente para pesca esportiva em ambiente natural e regulamentado.", badge: "Esporte" },
];

const dishes = [
    { name: "Churrasco Pantaneiro", icon: Flame, desc: "Carnes preparadas no fogo de chão, herança da lida do campo e das comitivas pantaneiras que percorriam a região.", tag: "Fogo de Chão" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "Tradição regional ligada às comitivas e ao campo. Prato simples e reconfortante, marcante na identidade culinária do interior.", tag: "Tradição" },
    { name: "Peixes Regionais", icon: Fish, desc: "Pacu, pintado e dourado — os grandes protagonistas das mesas de Jardim, capturados nos rios cristalinos da Serra da Bodoquena.", tag: "Rio" },
    { name: "Chipa", icon: Utensils, desc: "Quitute assado de polvilho e queijo com influência paraguaia. Consumido no café, no lanche e em qualquer hora do dia.", tag: "Fronteira" },
    { name: "Tereré", icon: Leaf, desc: "Muito mais que uma bebida — símbolo de convivência, tradição e identidade sul-mato-grossense partilhada em rodas e conversas.", tag: "Ritual" },
    { name: "Gastronomia Regional", icon: Utensils, desc: "Mistura de sabores do Pantanal, da fronteira e do interior: mandioca, milho, queijo e receitas herdadas das famílias pioneiras.", tag: "Interior" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "História e Cultura",
        morning: "Visita ao Museu da CER-3 e ao centro histórico. Conhecer a história da construção da BR-060 e do papel estratégico de Jardim na região.",
        afternoon: "Cemitério dos Heróis da Guerra do Paraguai e monumentos históricos. Roteiro pelo centro da cidade, artesanato local e praça principal.",
        evening: "Jantar com gastronomia regional, tereré em roda com moradores. Sentir o ritmo tranquilo e hospitaleiro de uma cidade que vive seu passado com orgulho.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Dia 2",
        theme: "Natureza e Aventura",
        morning: "Flutuação no Rio da Prata — águas cristalinas azul-turquesa, peixes mansos e paisagem subaquática de outro mundo.",
        afternoon: "Visita à Lagoa Misteriosa para mergulho ou contemplação. Buraco das Araras: as araras-vermelhas em seu habitat natural impressionam qualquer visitante.",
        evening: "Trilha ecológica ao entardecer. Pôr do sol na Serra da Bodoquena e jantar à base de peixe regional.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Dia 3",
        theme: "Sabores e Experiências",
        morning: "Pesca esportiva nos rios da região ou visita a balneário natural. Contato direto com a fauna e a flora do Cerrado e Pantanal.",
        afternoon: "Gastronomia regional: churrasco pantaneiro, arroz carreteiro e chipa. Compras de artesanato em couro, madeira e sementes.",
        evening: "Despedida com pôr do sol na Serra. Jardim fica para sempre — assim como a clareza das suas águas.",
        color: "from-emerald-600 to-green-700",
        icon: Leaf,
    },
];

const curiosities = [
    { text: "A Lagoa Misteriosa é uma das cavernas alagadas mais profundas do mundo — a profundidade total ainda não foi completamente mapeada." },
    { text: "O Buraco das Araras é uma dolina natural onde dezenas de araras-vermelhas fazem seu ninho, visível a olho nu da borda." },
    { text: "A região foi rota estratégica da Retirada da Laguna durante a Guerra do Paraguai — um dos episódios mais dramáticos da história brasileira." },
    { text: "O Museu da CER-3 preserva a história da construção da BR-060, estrada que transformou Jardim em polo regional no século XX." },
    { text: "Jardim integra a Serra da Bodoquena, reconhecida internacionalmente como um dos maiores aquíferos de água doce do planeta." },
    { text: "A transparência dos rios da região é resultado do processo de filtração pelo calcário da Serra da Bodoquena — fenômeno geológico único." },
    { text: "Araras, tucanos, antas, onças e jacarés convivem a poucos quilômetros do centro urbano de Jardim." },
    { text: "Posicionada estrategicamente na Rota Bioceânica, Jardim tem potencial para se tornar um dos grandes destinos de ecoturismo internacional do corredor." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3"
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
                            src="/infografico-jardim.png"
                            alt="Infográfico editorial Jardim"
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
                            src="/infografico-jardim.png"
                            alt="Infográfico editorial Jardim"
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

export default function JardimPage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-teal-950/60" />
                </div>

                {/* Crystal water glow */}
                <div className="absolute top-[18%] right-[15%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-teal-400/40 via-cyan-500/15 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-teal-300/50 via-cyan-400/20 to-transparent blur-2xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-200 via-teal-400 to-emerald-500 shadow-[0_0_80px_rgba(45,212,191,0.5)] animate-pulse-slow" />
                </div>

                {/* River SVG */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
                        <path
                            d="M0,300 L0,200 Q180,155 360,185 Q540,215 720,170 Q900,125 1080,160 Q1260,195 1440,145 L1440,300 Z"
                            fill="rgba(45,212,191,0.10)"
                        />
                        <path
                            d="M0,300 L0,230 Q200,190 400,215 Q600,240 800,195 Q1000,148 1200,183 Q1350,208 1440,168 L1440,300 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        <path
                            d="M0,300 L0,260 Q300,240 600,255 Q900,270 1200,248 Q1350,240 1440,255 L1440,300 Z"
                            fill="rgba(11,46,79,1)"
                        />
                        {/* Dock */}
                        <rect x="320" y="222" width="5" height="48" fill="rgba(45,212,191,0.5)" />
                        <rect x="300" y="242" width="48" height="4" fill="rgba(45,212,191,0.4)" />
                        <rect x="680" y="207" width="4" height="44" fill="rgba(45,212,191,0.4)" />
                        <rect x="660" y="226" width="38" height="3" fill="rgba(45,212,191,0.3)" />
                        <ellipse cx="330" cy="248" rx="28" ry="5" fill="rgba(45,212,191,0.14)" />
                        <ellipse cx="680" cy="237" rx="22" ry="4" fill="rgba(45,212,191,0.11)" />
                        {/* Birds */}
                        <path d="M480,95 Q484,91 488,95" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <path d="M495,82 Q500,78 505,82" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                        <path d="M440,110 Q444,106 448,110" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 container-custom pb-24 pt-32 w-full">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link
                            to="/cidades"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Cidades da Rota</span>
                        </Link>
                    </motion.div>

                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="text-2xl">🇧🇷</span>
                            <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest">
                                Mato Grosso do Sul · Serra da Bodoquena
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Jardim
                            <br />
                            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                MS
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            Entre História, Natureza e Aventura
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users,    val: "27.245 hab.", sub: "Censo 2022" },
                                { icon: Calendar, val: "1948",        sub: "Fundação" },
                                { icon: MapPin,   val: "Serra da Bodoquena", sub: "Localização" },
                                { icon: Waves,    val: "Lagoa Misteriosa",   sub: "Ícone Natural" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-bold text-sm leading-none">{s.val}</div>
                                        <div className="text-white/40 text-xs mt-0.5">{s.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Jardim</SectionLabel>
                        <SectionTitle>
                            Onde a história encontra{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                a natureza cristalina
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Jardim é a porta de entrada da Serra da Bodoquena — território de rios de transparência
                            incomparável, cavernas misteriosas e biodiversidade exuberante. Mas a cidade vai além da
                            natureza: carrega capítulos da Guerra do Paraguai, a memória da CER-3 e uma{" "}
                            <strong className="text-primary-700">identidade pantaneira autêntica</strong> que se expressa
                            na gastronomia, no artesanato e na hospitalidade do seu povo.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Waves,
                                title: "Águas Cristalinas",
                                text: "Lagoa Misteriosa, Rio da Prata e balneários com visibilidade que revela outro mundo. A geologia calcária da Bodoquena cria um fenômeno único no planeta.",
                                color: "from-cyan-50 to-teal-50",
                                accent: "text-teal-600",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Camera,
                                title: "Fauna Selvagem",
                                text: "Araras, tucanos, onças, antas e jacarés a poucos quilômetros do centro. O Buraco das Araras é um dos espetáculos naturais mais impressionantes do Brasil.",
                                color: "from-emerald-50 to-green-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Compass,
                                title: "Memória e História",
                                text: "Cemitério dos Heróis, Museu da CER-3 e traços da Retirada da Laguna. Jardim é um dos guardiões da memória histórica do Mato Grosso do Sul.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Raízes que contam uma trajetória heroica</SectionLabel>
                        <SectionTitle light>
                            Da Guerra do Paraguai à{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                Rota Continental
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Jardim foi construída em camadas de história, coragem e natureza. Cada período deixou marcas
                            legíveis em seus monumentos, museus e na memória oral do povo sul-mato-grossense.
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
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-teal-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Símbolo: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LAGOA MISTERIOSA ─────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Patrimônio */}
                        <div>
                            <SectionLabel>Patrimônio Natural e Histórico</SectionLabel>
                            <SectionTitle>
                                Uma cidade que guarda{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    história e mistério
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 leading-relaxed mb-8"
                            >
                                Jardim preserva tanto os registros naturais da Serra da Bodoquena quanto a memória
                                histórica da ocupação regional. Do Cemitério dos Heróis ao Museu da CER-3, a cidade
                                transforma patrimônio em experiência cultural viva.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Cemitério dos Heróis", desc: "Marco da Guerra do Paraguai. Memória militar e histórica da bravura do século XIX." },
                                    { name: "Museu da CER-3", desc: "Acervo da Comissão de Estradas de Rodagem. História da BR-060 e da transformação regional." },
                                    { name: "Centro Histórico", desc: "Praça central, Igreja e edificações que preservam a memória das famílias pioneiras." },
                                    { name: "Artesanato Regional", desc: "Couro, madeira, osso e fibras: peças únicas que contam a identidade pantaneira de Jardim." },
                                    { name: "Rota da Retirada da Laguna", desc: "Trajeto histórico que conecta Jardim ao episódio mais marcante da Guerra do Paraguai no território." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-200 hover:shadow-sm transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-primary-900 text-sm">{item.name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Lagoa Misteriosa */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="rounded-3xl bg-primary-950 p-8 md:p-10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                                        Maravilha Natural
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        A Lagoa Misteriosa — profundidade que desafia o conhecimento
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            A Lagoa Misteriosa é uma das cavernas alagadas mais profundas do mundo.
                                            Suas águas de clareza absoluta revelam tonalidades de azul impossíveis —
                                            do turquesa raso ao azul-marinho das profundezas ainda não totalmente
                                            mapeadas. Mergulhadores de todo o planeta vêm até Jardim para encarar
                                            esse desafio único.
                                        </p>
                                        <p>
                                            A formação geológica calcária da Serra da Bodoquena criou esse fenômeno
                                            singular: água que filtra e purifica até atingir uma transparência que
                                            parece irreal. Na superfície, o reflexo do céu e da mata nativa completa
                                            um dos cenários mais fotográficos do Brasil.
                                        </p>
                                        <p className="text-teal-400 font-medium italic">
                                            "Existem lugares que desafiam a linguagem. A Lagoa Misteriosa é um deles."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Waves className="w-4 h-4 text-teal-400" />
                                        <span className="text-xs text-white/40">Referência internacional em mergulho em caverna</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NATUREZA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Serra da Bodoquena</SectionLabel>
                            <SectionTitle light>
                                Um paraíso de{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    águas cristalinas
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8"
                            >
                                Jardim integra a região da Serra da Bodoquena, reconhecida internacionalmente pela
                                qualidade de suas águas e pela diversidade de ecossistemas. Cerrado, Mata Atlântica
                                e vegetação pantaneira se encontram em um território que abriga espécies raras e
                                experiências naturais de nível mundial.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Lagoa Misteriosa", sub: "Caverna alagada entre as mais profundas do mundo. Referência em mergulho técnico" },
                                    { label: "Rio da Prata", sub: "Flutuação em águas azul-turquesa. Peixes, vegetação e paisagens subaquáticas preservadas" },
                                    { label: "Buraco das Araras", sub: "Dolina natural com araras-vermelhas. Espetáculo da fauna em habitat intocado" },
                                    { label: "Grutas e Cavernas", sub: "Formações calcárias milenares. Espeleologia e contemplação em cenários subterrâneos únicos" },
                                    { label: "Pesca Esportiva", sub: "Pacu, pintado e dourado em rios preservados. Temporada regulamentada e sustentável" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-teal-500/15"
                                    >
                                        <Trees className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-teal-300 font-semibold text-sm">{item.label}</span>
                                            <span className="text-white/40 text-xs ml-2">— {item.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Arara", detail: "Símbolo do Buraco das Araras", emoji: "🦜" },
                                { animal: "Dourado", detail: "O rei dos rios da Bodoquena", emoji: "🐟" },
                                { animal: "Onça", detail: "Predador do cerrado e pantanal", emoji: "🐆" },
                                { animal: "Tucano", detail: "Cor viva na mata nativa", emoji: "🦉" },
                            ].map((creature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="rounded-3xl bg-teal-900/30 border border-teal-500/20 p-6 text-center hover:bg-teal-900/50 transition-colors"
                                >
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-teal-400/70 text-xs mt-1">{creature.detail}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>Tradições que fazem parte da nossa gente</SectionLabel>
                            <SectionTitle>
                                Identidade Pantaneira{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    viva e acolhedora
                                </span>
                            </SectionTitle>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4 text-slate-500 leading-relaxed"
                            >
                                <p>
                                    Jardim carrega os costumes, as lendas e os saberes tradicionais do Pantanal
                                    sul-mato-grossense. A simplicidade, a hospitalidade e a vida rural formam o
                                    tecido social de uma cidade onde o povo é acolhedor, simples e orgulhoso
                                    da sua história e da sua terra.
                                </p>
                                <p>
                                    O <strong className="text-primary-700">chamamé</strong>, a polca paraguaia e
                                    o sertanejo raiz animam festas e encontros. O acordeão e a viola são
                                    presença constante — assim como o tereré em roda, que transforma qualquer
                                    conversa em ritual de pertencimento.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Identidade Pantaneira", desc: "Costumes, lendas e saberes tradicionais do Pantanal sul-mato-grossense" },
                                { label: "Artesanato", desc: "Couro, madeira, osso e fibras — peças únicas que contam histórias de gerações" },
                                { label: "Música e Dança", desc: "Chamamé, polca paraguaia e músicas regionais que animam festas e celebrações" },
                                { label: "Festas e Tradições", desc: "Festas religiosas, cavalgadas, rodeios e eventos que fortalecem a cultura local" },
                            ].map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 * i }}
                                    className="rounded-2xl bg-primary-950 p-5"
                                >
                                    <Music className="w-5 h-5 text-teal-400 mb-3" />
                                    <div className="font-display font-bold text-white text-base mb-1">{m.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Sabores do Pantanal e da Serra</SectionLabel>
                        <SectionTitle>
                            Cozinha de{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                raiz e afeto
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed"
                        >
                            A mesa de Jardim combina peixe de rio, carne pantaneira, mandioca e receitas herdadas
                            do convívio cotidiano com a fronteira paraguaia. Uma culinária de sustento, celebração
                            e memória afetiva.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i, duration: 0.5 }}
                                className="card-hover p-7 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-100 group-hover:from-teal-500 group-hover:to-cyan-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                                        {dish.tag}
                                    </span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2">{dish.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>O que ver e fazer</SectionLabel>
                        <SectionTitle>
                            Pontos que{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                definem Jardim
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                        {attr.badge}
                                    </span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-sm mb-2">{attr.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{attr.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roteiro Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 dias{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                inesquecíveis
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
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden"
                            >
                                <div className={`p-5 bg-gradient-to-r ${day.color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                            <day.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white/70 text-xs uppercase tracking-widest">{day.day}</div>
                                            <div className="text-white font-bold text-sm">{day.theme}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[
                                        { time: "Manhã",  text: day.morning },
                                        { time: "Tarde",  text: day.afternoon },
                                        { time: "Noite",  text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <Clock className="w-3.5 h-3.5 text-teal-400/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-teal-400/80 text-xs font-semibold uppercase tracking-wide">
                                                    {slot.time}
                                                </span>
                                                <p className="text-white/50 text-xs leading-relaxed mt-0.5">{slot.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Você sabia?</SectionLabel>
                        <SectionTitle>
                            Fatos que{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                surpreendem
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <Star className="w-4 h-4 text-teal-500 mb-3" />
                                <p className="text-primary-800 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Planeje sua visita</SectionLabel>
                        <SectionTitle light>
                            Informações{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                práticas
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <MapPin className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Como Chegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white/80">De Campo Grande:</strong> ~220 km pela BR-060
                                    e MS-178. Aproximadamente 3h de viagem.
                                </p>
                                <p>
                                    <strong className="text-white/80">De Bonito:</strong> ~80 km pela MS-178.
                                    Cerca de 1h de viagem pela Serra da Bodoquena.
                                </p>
                                <p>
                                    <strong className="text-white/80">Na Rota Bioceânica:</strong> Posicionada
                                    entre Campo Grande e Porto Murtinho — parada natural no corredor continental.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Calendar className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Melhor Época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Abr → Out</span>
                                    <span className="text-white/50 text-xs">Estação seca — melhor visibilidade nos rios e lagoas</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Jun → Set</span>
                                    <span className="text-white/50 text-xs">Temperatura amena, ideal para trilhas e atividades ao ar livre</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Ano todo</span>
                                    <span className="text-white/50 text-xs">Lagoa Misteriosa e Buraco das Araras podem ser visitados em qualquer época</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Phone className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Informações Úteis</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Prefeitura", val: "jardim.ms.gov.br", icon: MapPin },
                                    { label: "Distância de Bonito", val: "~80 km", icon: MapPin },
                                    { label: "Distância de Campo Grande", val: "~220 km", icon: MapPin },
                                    { label: "Voucher turístico", val: "Necessário para Lagoa Misteriosa", icon: Camera },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-teal-400/60 flex-shrink-0" />
                                        <div>
                                            <span className="text-white/30 text-xs">{c.label}: </span>
                                            <span className="text-white/70 text-xs font-medium">{c.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Rota Bioceânica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Jardim — onde a história encontra a natureza, e a aventura começa nas águas cristalinas.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continue explorando as cidades que formam o maior corredor bioceânico da América do Sul.
                        </p>
                        <Link
                            to="/cidades"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-colors group"
                        >
                            Ver todas as cidades
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
