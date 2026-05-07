import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Fish, Trees, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    BookOpen, Heart,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Década de 1930",
        icon: Globe,
        title: "A Fuga e a Chegada ao Chaco",
        color: "from-lime-700 to-green-800",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Perseguidos por regimes totalitários na Rússia, Ucrânia e Alemanha, famílias mennonitas embarcaram em uma das maiores jornadas migratórias do século XX. O Paraguai lhes ofereceu o que buscavam: liberdade religiosa, autonomia cultural e terras no Chaco — consideradas inóspitas por todos. Eles aceitaram o desafio.",
        symbol: "Chegada dos primeiros colonizadores mennonitas",
    },
    {
        era: "1930–1950",
        icon: Heart,
        title: "Construindo do Zero no Deserto",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Calor extremo, seca, isolamento total e falta de infraestrutura. Os primeiros anos foram de sobrevivência pura. Mas os mennonitas trouxeram algo que nenhuma adversidade conseguiu derrubar: organização coletiva, fé e disciplina de trabalho. Poço a poço, plantação a plantação, a cidade começou a surgir.",
        symbol: "Primeiros poços e plantações no Chaco",
    },
    {
        era: "1950–1980",
        icon: Leaf,
        title: "Cooperativa Fernheim e o Milagre Agrícola",
        color: "from-emerald-700 to-teal-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "A Cooperativa Fernheim tornou-se o motor de transformação da região. Produziram leite, queijos e embutidos reconhecidos em todo o Paraguai. Construíram escolas, hospitais e estradas. O Chaco árido começou a florescer — e Filadelfia emergiu como o símbolo máximo do cooperativismo sul-americano.",
        symbol: "Cooperativa Fernheim — referência continental",
    },
    {
        era: "Hoje",
        icon: Compass,
        title: "Polo Regional e Portal Bioceânico",
        color: "from-lime-600 to-olive-700",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Filadelfia é hoje o centro econômico do Chaco Paraguaio. Com a Ruta Bioceánica PY-15 passando por ela, a cidade se prepara para um novo ciclo de desenvolvimento: polo logístico, ponto turístico internacional e conexão entre o Atlântico e o Pacífico. O isolamento histórico se transforma em integração continental.",
        symbol: "Ruta PY-15 — Corredor Bioceânico",
    },
];

const attractions = [
    { name: "Museo Jakob Unger", icon: BookOpen, desc: "Principal espaço de memória do Chaco. Preserva documentos históricos, objetos dos primeiros colonizadores, registros da imigração e memórias da Guerra do Chaco.", badge: "História" },
    { name: "Cooperativa Fernheim", icon: Heart, desc: "Uma das cooperativas mais influentes da América do Sul. Visitar suas instalações é entender como uma comunidade transformou o Chaco árido em polo agroindustrial.", badge: "Cultura" },
    { name: "Arquitetura Mennonita", icon: Globe, desc: "Edificações que parecem transportar o visitante para uma pequena cidade da Europa Central. Igrejas, casas e comércios com arquitetura singular e preservada no meio do Chaco.", badge: "Patrimônio" },
    { name: "Laticínios e Queijaria", icon: Utensils, desc: "Produção artesanal de queijos e embutidos reconhecidos como os melhores do Paraguai. Visita às instalações da cooperativa com degustação dos produtos.", badge: "Gastronomia" },
    { name: "Paisagem do Chaco", icon: Mountain, desc: "Campos dourados, moinhos no horizonte, estradas que se perdem na imensidão. O entardecer em Filadelfia com o céu tingido de laranja é um espetáculo único.", badge: "Natureza" },
    { name: "Comunidades Indígenas", icon: Star, desc: "Povos Nivaclé e Enlhet vivem próximo à cidade, preservando conhecimentos ancestrais sobre o Chaco — artesanato em fibras naturais e medicina tradicional.", badge: "Cultura" },
    { name: "Fauna do Chaco Seco", icon: Camera, desc: "Tamanduás, tatus, pumas, araras, emas e jacarés em habitat natural. A diversidade biológica do Chaco surpreende quem o visita pela primeira vez.", badge: "Fauna" },
    { name: "Igrejas Históricas", icon: Heart, desc: "As igrejas mennonitas de Filadelfia são o centro espiritual e cultural da comunidade — arquitetura simples, mas de profundo simbolismo para quem construiu o Chaco.", badge: "Espiritual" },
];

const dishes = [
    { name: "Kuchen", icon: Utensils, desc: "Tortas tradicionais alemãs feitas com receitas centenárias trazidas da Europa Central. Presentes em todas as casas e padarias de Filadelfia — identidade doce em cada fatia.", tag: "Europeu" },
    { name: "Embutidos Artesanais", icon: Flame, desc: "Linguiças, salames e defumados produzidos com receitas preservadas pelas famílias mennonitas há gerações. Sabores da Europa que sobreviveram ao Chaco.", tag: "Tradição" },
    { name: "Queijos e Laticínios", icon: Leaf, desc: "Reconhecidos como os melhores do Paraguai. A produção leiteira da Cooperativa Fernheim transformou Filadelfia na capital dos laticínios do Chaco.", tag: "Cooperativa" },
    { name: "Chipa", icon: Utensils, desc: "O pão de queijo paraguaio encontra a tradição europeia. No Chaco, a chipa é consumida quente no café da manhã ao lado de um tereré — fusão genuína.", tag: "Fusão" },
    { name: "Carnes do Chaco", icon: Flame, desc: "Cortes preparados com a técnica lenta da tradição rural europeia adaptada ao Chaco. Sabores intensos da pecuária extensiva mennonita.", tag: "Rural" },
    { name: "Tereré", icon: Leaf, desc: "A cuia de tereré atravessa fronteiras culturais. Em Filadelfia, a bebida paraguaia é adotada pela comunidade mennonita — símbolo da integração cultural do Chaco.", tag: "Integração" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Memória e Identidade",
        morning: "Museo Jakob Unger: mergulho na história da imigração mennonita. Documentos, fotos e objetos que contam a jornada de quem chegou ao Chaco com fé e transformou o deserto.",
        afternoon: "Passeio pela cidade: arquitetura europeia, igrejas históricas e o ritmo singular de Filadelfia. Uma cidade que parece improvável no meio do Chaco Paraguaio.",
        evening: "Jantar mennonita: kuchen, embutidos artesanais, queijos da cooperativa e tereré. Provar Filadelfia é entender como culturas se encontram e se transformam.",
        color: "from-lime-600 to-green-700",
        icon: BookOpen,
    },
    {
        day: "Dia 2",
        theme: "Cooperativismo e Produção",
        morning: "Visita à Cooperativa Fernheim: instalações de laticínios, queijaria e produção artesanal. Ver de perto o modelo que transformou o Chaco em referência agroindustrial.",
        afternoon: "Campos do Chaco: paisagens de vegetação xerófila, fauna nativa e o horizonte infinito da maior planície da América do Sul. Pôr do sol com luz dourada sobre os moinhos.",
        evening: "Céu estrelado do Chaco — sem poluição luminosa, um dos mais impressionantes do continente. Silêncio absoluto que só quem viveu longe da cidade consegue imaginar.",
        color: "from-amber-600 to-yellow-700",
        icon: Leaf,
    },
    {
        day: "Dia 3",
        theme: "Povos e Integração",
        morning: "Comunidades indígenas Nivaclé: artesanato em fibras naturais, medicina ancestral do Chaco e cosmovisão que contrasta e se complementa com a cultura mennonita.",
        afternoon: "Gastronomia de fusão: almoço com receitas que unem Europa e Paraguai. Compras de embutidos, queijos e artesanato para levar a memória de Filadelfia.",
        evening: "Despedida na Ruta PY-15 ao entardecer — o corredor que conecta Filadelfia ao continente. O Chaco que floresceu agora olha para os dois oceanos.",
        color: "from-emerald-600 to-teal-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Filadelfia foi construída por imigrantes mennonitas que fugiram de perseguições na Rússia e Ucrânia nos anos 1930 — encontrando no Chaco paraguaio a liberdade que buscavam." },
    { text: "A Cooperativa Fernheim é uma das mais antigas e influentes cooperativas da América do Sul — modelo estudado em universidades de gestão e desenvolvimento rural do mundo inteiro." },
    { text: "Em Filadelfia coexistem quatro línguas: alemão, plautdietsch (dialeto mennonita), espanhol e guarani — provavelmente o lugar com maior diversidade linguística por habitante da América do Sul." },
    { text: "Os queijos e laticínios produzidos em Filadelfia são reconhecidos como os melhores do Paraguai — exportados para o país inteiro a partir de uma cidade no meio do deserto." },
    { text: "A cidade possui arquitetura que lembra uma pequena cidade da Europa Central — um choque visual impressionante para quem chega após horas atravessando o Chaco árido." },
    { text: "Durante a Guerra do Chaco (1932–1935), a comunidade mennonita ajudou logisticamente o exército paraguaio — episódio que consolidou a relação de confiança com o Estado paraguaio." },
    { text: "O Museo Jakob Unger preserva um dos acervos históricos mais completos sobre a imigração mennonita na América do Sul — testemunho único de uma das migrações mais improváveis da história." },
    { text: "A Ruta Bioceánica PY-15 passa por Filadelfia, transformando-a de cidade isolada no deserto em elo estratégico do corredor logístico entre o Atlântico e o Pacífico." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-lime-400 uppercase tracking-widest mb-3"
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
                            src="/infografico-filadelfia.png"
                            alt="Infográfico editorial Filadelfia"
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
                            src="/infografico-filadelfia.png"
                            alt="Infográfico editorial Filadelfia"
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

export default function FiladelfiePage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient — wheat gold */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-lime-950/30" />
                </div>

                {/* European glow */}
                <div className="absolute top-[18%] right-[15%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-lime-400/30 via-green-500/10 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-lime-300/40 via-yellow-400/15 to-transparent blur-2xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-lime-200 via-green-400 to-emerald-500 shadow-[0_0_80px_rgba(132,204,22,0.45)] animate-pulse-slow" />
                </div>

                {/* Wheat fields horizon SVG */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
                        <path
                            d="M0,300 L0,210 Q360,200 720,208 Q1080,216 1440,205 L1440,300 Z"
                            fill="rgba(132,204,22,0.06)"
                        />
                        <path
                            d="M0,300 L0,235 Q360,225 720,233 Q1080,241 1440,230 L1440,300 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        <path
                            d="M0,300 L0,263 Q360,258 720,265 Q1080,272 1440,261 L1440,300 Z"
                            fill="rgba(11,46,79,1)"
                        />
                        {/* Windmill silhouettes */}
                        <rect x="220" y="172" width="3" height="60" fill="rgba(132,204,22,0.35)" />
                        <line x1="221" y1="185" x2="221" y2="185" stroke="none" />
                        <path d="M221,178 L210,165 M221,178 L232,165 M221,178 L208,188 M221,178 L234,188" fill="none" stroke="rgba(132,204,22,0.3)" strokeWidth="1.5" />
                        <rect x="580" y="178" width="3" height="55" fill="rgba(132,204,22,0.28)" />
                        <path d="M581,184 L570,171 M581,184 L592,171 M581,184 L568,194 M581,184 L594,194" fill="none" stroke="rgba(132,204,22,0.25)" strokeWidth="1.5" />
                        <rect x="980" y="175" width="3" height="58" fill="rgba(132,204,22,0.30)" />
                        <path d="M981,181 L970,168 M981,181 L992,168 M981,181 L968,191 M981,181 L994,191" fill="none" stroke="rgba(132,204,22,0.26)" strokeWidth="1.5" />
                        {/* Wheat stalks */}
                        <path d="M100,232 Q100,220 103,215" fill="none" stroke="rgba(132,204,22,0.2)" strokeWidth="1" />
                        <path d="M350,228 Q350,216 353,211" fill="none" stroke="rgba(132,204,22,0.18)" strokeWidth="1" />
                        <path d="M750,230 Q750,218 753,213" fill="none" stroke="rgba(132,204,22,0.2)" strokeWidth="1" />
                        <path d="M1200,226 Q1200,214 1203,209" fill="none" stroke="rgba(132,204,22,0.17)" strokeWidth="1" />
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
                            <span className="text-2xl">🇵🇾</span>
                            <span className="text-sm font-semibold text-lime-400 uppercase tracking-widest">
                                Boquerón · Chaco Paraguaio
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Fila
                            <span className="bg-gradient-to-r from-lime-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                                delfia
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            A Alma Europeia do Chaco Paraguaio
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users,    val: "~14.000 hab.",       sub: "Estimativa" },
                                { icon: Calendar, val: "Anos 1930",           sub: "Fundação Mennonita" },
                                { icon: MapPin,   val: "Boquerón",            sub: "Departamento" },
                                { icon: Heart,    val: "Coop. Fernheim",      sub: "Motor Econômico" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-lime-400 flex-shrink-0" />
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
                        <SectionLabel>Quem é Filadelfia</SectionLabel>
                        <SectionTitle>
                            Onde a Europa floresceu no{" "}
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                coração do Chaco
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Filadelfia é uma das cidades mais singulares da América do Sul. Construída por imigrantes
                            mennonitas que fugiram de perseguições na Europa, ela transformou o Chaco árido em um dos
                            exemplos mais impressionantes de{" "}
                            <strong className="text-primary-700">cooperativismo, resiliência e identidade cultural</strong>{" "}
                            do continente. Queijos europeus, moinhos no horizonte e tereré nas rodas — Filadelfia
                            não para de surpreender.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: "Cooperativismo",
                                text: "A Cooperativa Fernheim é o modelo que transformou o Chaco. Laticínios, agricultura, educação e infraestrutura — tudo construído coletivamente por uma comunidade que recusou o isolamento.",
                                color: "from-lime-50 to-green-50",
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Globe,
                                title: "Identidade Europeia",
                                text: "Arquitetura, gastronomia, língua e valores da Europa Central preservados no meio do Chaco. Quatro idiomas convivem nas ruas — alemão, plautdietsch, espanhol e guarani.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Compass,
                                title: "Portal Bioceânico",
                                text: "A Ruta PY-15 atravessa Filadelfia, conectando-a ao Corredor Bioceânico. De cidade isolada no deserto ao elo estratégico entre o Atlântico e o Pacífico.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Da Europa ao Coração do Chaco</SectionLabel>
                        <SectionTitle light>
                            Uma jornada de{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                fé e transformação
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Filadelfia foi construída camada a camada — por imigrantes que chegaram sem nada e
                            criaram um dos exemplos mais extraordinários de desenvolvimento humano da América do Sul.
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

            {/* ── COOPERATIVA SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-900/15 via-transparent to-green-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-lime-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(132,204,22,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(34,197,94,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/20 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-lime-400 uppercase tracking-widest">
                                        Modelo Continental
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cooperativa Fernheim
                                    <br />
                                    <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                        O milagre do Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    A Cooperativa Fernheim é o coração econômico e social de Filadelfia. Fundada pelos
                                    primeiros colonizadores mennonitas, ela construiu escolas, hospitais, estradas e
                                    uma indústria leiteira reconhecida em todo o Paraguai. Seu modelo de gestão
                                    coletiva é estudado como referência de desenvolvimento sustentável na América do Sul.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Laticínios", val: "Nº 1 PY", sub: "Queijos e derivados" },
                                        { label: "Idiomas", val: "4", sub: "Alemão · Plautdietsch · ES · Guarani" },
                                        { label: "Rota", val: "PY-15", sub: "Corredor Bioceânico" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-lime-500/10">
                                            <div className="text-2xl font-bold text-lime-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-lime-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Europa no Chaco</SectionLabel>
                        <SectionTitle light>
                            Cultura{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                mennonita e identidade
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: BookOpen,
                                title: "Preservação Histórica",
                                text: "Museo Jakob Unger, igrejas históricas e documentos que preservam a memória da imigração — um dos acervos mais completos sobre mennonitas na América do Sul.",
                                accent: "text-lime-400",
                                iconBg: "bg-lime-500/15",
                                border: "border-lime-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Plurilinguismo",
                                text: "Alemão, plautdietsch, espanhol e guarani convivem nas ruas, escolas e mercados. Filadelfia é um laboratório vivo de coexistência cultural no Chaco.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Trabalho Coletivo",
                                text: "A ética do trabalho mennonita transformou o Chaco em símbolo de prosperidade. Organização, disciplina e cooperação como valores fundadores transmitidos às novas gerações.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Multiculturalismo",
                                text: "Mennonitas europeus, povos Nivaclé e Enlhet, paraguaios e migrantes — Filadelfia integrou culturas distintas numa identidade nova e singular, típica do Chaco.",
                                accent: "text-yellow-400",
                                iconBg: "bg-yellow-500/15",
                                border: "border-yellow-500/20",
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
                        <SectionLabel>Um Encontro entre Europa e Paraguai</SectionLabel>
                        <SectionTitle>
                            Gastronomia de{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                dois mundos
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
                                    <div className="w-10 h-10 rounded-2xl bg-lime-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-lime-700" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full">
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-lime-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-full">
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
                            3 dias{" "}
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                no Chaco que floresceu
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-lime-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                <div className="w-7 h-7 rounded-xl bg-lime-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-lime-400" />
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
                                    "Ruta PY-09 (Transchaco) a partir de Asunción — ~450 km (4–5h)",
                                    "Ruta PY-15 vindo de Mariscal Estigarribia ou Carmelo Peralta",
                                    "Ônibus regulares de Asunción até Filadelfia via Transchaco",
                                ],
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Maio a agosto: inverno ameno, ideal para travessias no Chaco",
                                    "Junho e julho: temperatura agradável, campos mais verdes",
                                    "Evitar dezembro–fevereiro: calor extremo (+45°C) e estradas difíceis",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Guarani paraguaio — câmbio disponível na cidade",
                                    "Hotéis e infraestrutura mais desenvolvidos que outras cidades do Chaco",
                                    "Mercados com queijos, embutidos e produtos da cooperativa",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
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
                    style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇵🇾</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Filadelfia espera por você
                        </h2>
                        <p className="text-lime-200/70 text-lg max-w-xl mx-auto mb-10">
                            A alma europeia do Chaco Paraguaio. Onde o cooperativismo transformou o deserto
                            em exemplo e o isolamento se tornou integração continental.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-2xl hover:bg-green-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                            <Link
                                to="/#cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar a Rota <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
