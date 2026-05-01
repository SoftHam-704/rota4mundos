import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Ruler, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Anchor, Mountain, Leaf, Utensils,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const cycles = [
    {
        era: "1892 – início séc. XX",
        icon: Leaf,
        title: "Ciclo da Erva-Mate",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "Em 1892, o engenheiro Antonio Corrêa da Costa construiu um porto rústico de madeira na fazenda Três Barras para escoar erva-mate — ato fundador que definiria o destino da futura cidade. O município cresceu, recebeu trabalhadores e comerciantes, e consolidou-se como entreposto estratégico do sul do antigo Mato Grosso.",
        symbol: "Trenzinho da praça central",
    },
    {
        era: "Séc. XIX – XX",
        icon: Flame,
        title: "Ciclo do Tanino",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "A abundância do quebracho transformou Porto Murtinho em polo de extração e industrialização do tanino — matéria-prima usada no curtimento de couro. A Florestal Brasileira S/A deixou marcas indeléveis: a Chaminé Florestal Brasileira, ruína que ainda hoje ergue-se como monumento à escala industrial daquele tempo.",
        symbol: "Chaminé Florestal Brasileira",
    },
    {
        era: "Séc. XIX – XX",
        icon: Anchor,
        title: "Ciclo do Charque",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "O charque completou a tríade econômica que ergueu a cidade, integrando Porto Murtinho a redes mais amplas de abastecimento regional. Junto com a erva-mate e o tanino, consolidou o município como polo de trabalho, circulação e acumulação de riqueza em diferentes momentos do antigo Mato Grosso uno.",
        symbol: "Casarões e armazéns da Rua Dr. Corrêa",
    },
    {
        era: "Contínuo",
        icon: Anchor,
        title: "O Porto e o Comércio Fluvial",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "O Rio Paraguai foi a grande avenida líquida de Porto Murtinho. Por ele passaram mercadorias, notícias, costumes e pessoas de diferentes origens — paraguaios, uruguaios, espanhóis e outros grupos que moldaram o tecido social e arquitetônico local. O porto impulsionou importações, exportações e reforçou o caráter cosmopolita da cidade.",
        symbol: "Rio Paraguai",
    },
];

const touroDuel = {
    bandido: {
        name: "Touro Bandido",
        color: "from-emerald-600 to-green-700",
        tag: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Identificado pela cor verde, o Bandido desperta torcidas fervorosas. Sua presença na arena é associada à transgressão ritualizada, ao folclore da margem e à potência da fronteira.",
    },
    encantado: {
        name: "Touro Encantado",
        color: "from-yellow-600 to-amber-700",
        tag: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Reconhecido pela cor amarela, o Encantado evoca o mistério, a crença e o maravilhoso popular. Sua torcida celebra a espiritualidade que permeia a festa.",
    },
};

const dishes = [
    {
        name: "Pintado Grelhado",
        icon: Fish,
        desc: "Clássico regional que valoriza a qualidade do peixe do Rio Paraguai, servido com mandioca, arroz e saladas frescas.",
        tag: "Peixe do Rio",
    },
    {
        name: "Pintado com Bocaiúva",
        icon: Fish,
        desc: "Preparação já celebrada em materiais de promoção turística do município — gancho perfeito para o storytelling gastronômico.",
        tag: "Especial da Casa",
    },
    {
        name: "Sopa Paraguaia",
        icon: Utensils,
        desc: "Bolo salgado de milho, queijo e cebola — presença indispensável em mesas de fronteira. Engana o nome: é sólida e reconfortante.",
        tag: "Fronteira",
    },
    {
        name: "Chipa",
        icon: Utensils,
        desc: "Quitute assado à base de polvilho e queijo, consumido no café da manhã, no lanche e em longas viagens de estrada.",
        tag: "Cotidiano",
    },
    {
        name: "Lambreado",
        icon: Flame,
        desc: "Preparo rústico e bem temperado, associado ao sabor forte do interior e às cozinhas de fogo a lenha e brasa viva.",
        tag: "Interior",
    },
    {
        name: "Tereré",
        icon: Leaf,
        desc: "Mais do que bebida — símbolo cultural. A Praça do Tereré transforma esse hábito cotidiano em monumento identitário urbano.",
        tag: "Ritual Social",
    },
];

const attractions = [
    { name: "Morro Pão de Açúcar", icon: Mountain, desc: "~550 metros de altitude, trilha interpretativa e mirante natural para o Pantanal do Nabileque e o Chaco paraguaio.", badge: "Natureza" },
    { name: "Pantanal do Nabileque", icon: Trees, desc: "Paisagem de planície alagável, fauna abundante e vocação singular para contemplação, pesquisa e turismo sensível.", badge: "Ecossistema" },
    { name: "Castelinho", icon: Star, desc: "Ícone arquitetônico e sentimental da cidade, cercado por narrativas de amor, luxo, decadência e assombração.", badge: "Lenda" },
    { name: "Museu Dom Jaime A. Barrera", icon: Camera, desc: "Instalado na histórica Padaria Cuê (1928), concluída em tijolo e hoje símbolo de memória e patrimônio urbano.", badge: "Patrimônio 2024" },
    { name: "Trenzinho", icon: Anchor, desc: "Monumento simbólico da erva-mate, instalado na praça central — sintetiza um ciclo econômico inteiro em um único objeto.", badge: "Memória" },
    { name: "Cine-Teatro Murtinhense", icon: Music, desc: "Antigo depósito de erva-mate transformado em equipamento cultural às margens do Rio Paraguai.", badge: "Cultura" },
    { name: "Praça do Tereré", icon: Leaf, desc: "Transforma o hábito cotidiano mais murtinhense em espaço urbano e identitário de convivência.", badge: "Vivência" },
    { name: "Fecho dos Morros", icon: Anchor, desc: "Paisagem ligada à pesca, à contemplação e ao imaginário fronteiriço — pôr do sol sobre o Rio Paraguai.", badge: "Contemplação" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Chegada e Memória Urbana",
        morning: "Chegada, check-in e caminhada leve pela orla do Rio Paraguai. Primeiro contato com a escala humana e o ritmo da cidade.",
        afternoon: "Visita ao centro histórico: Castelinho, Padaria Cuê/Museu Dom Jaime, Trenzinho, praça central e Cine-Teatro Murtinhense.",
        evening: "Jantar com sabores regionais e passeio pela praça para sentir o pulso local. Roda de tereré com moradores.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Dia 2",
        theme: "Natureza e Rio",
        morning: "Saída cedo para passeio de barco, pesca esportiva ou contemplação do Rio Paraguai e do Pantanal do Nabileque.",
        afternoon: "Subida ao Morro Pão de Açúcar para o mirante natural, com foco em fotografia, observação de fauna e amplitude de paisagem.",
        evening: "Pôr do sol pantaneiro e jantar à base de peixe. Conversa com piloteiros, pescadores e guias locais.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Dia 3",
        theme: "Cultura e Partida",
        morning: "Museu Histórico de Porto Murtinho, Igreja Sagrado Coração de Jesus e roteiro de monumentos do centro histórico.",
        afternoon: "Experiência gastronômica completa: chipa, sopa paraguaia e pratos de fronteira. Compras de artesanato local.",
        evening: "Se houver calendário cultural, priorizar chamamé ao vivo, apresentações das Meninas Cantoras ou vivências do Toro Candil.",
        color: "from-blue-600 to-indigo-700",
        icon: Music,
    },
];

const curiosities = [
    { text: "Conhecida como 'a última guardiã do Rio Paraguai' — identidade ribeirinha e fronteiriça em uma só expressão." },
    { text: "17.502 km² de território para uma população de ~12.859 pessoas: uma vastidão raramente imaginada." },
    { text: "O Trenzinho da praça central sintetiza um ciclo econômico inteiro (a erva-mate) em um único monumento urbano." },
    { text: "O Castelinho carrega uma das lendas de amor, decadência e assombração mais persistentes do Mato Grosso do Sul." },
    { text: "Em 2024, a Padaria Cuê e a Prefeitura Cuê foram oficialmente tombadas como patrimônio histórico material do estado." },
    { text: "O Toro Candil foi declarado patrimônio imaterial de Mato Grosso do Sul em 2023." },
    { text: "A Praça do Tereré elevou um ritual cotidiano de fronteira à categoria de símbolo urbano oficial." },
    { text: "Porto Murtinho vive hoje um momento raro: passado histórico e futuro logístico continental no mesmo imaginário." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-3"
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

/* ─── page ───────────────────────────────────────────────────── */

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
                            src="/infografico-porto-murtinho.png"
                            alt="Infográfico editorial Porto Murtinho"
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

            {/* Lightbox */}
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
                        {/* Botão fechar */}
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Imagem ampliada */}
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src="/infografico-porto-murtinho.png"
                            alt="Infográfico editorial Porto Murtinho"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function PortoMurtinhoPage() {
    const heroRef = useRef(null);

    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-amber-950/60" />
                </div>

                {/* Sun glow */}
                <div className="absolute top-[18%] right-[15%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-secondary-400/50 via-secondary-500/20 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-secondary-300/60 via-secondary-400/30 to-transparent blur-2xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-secondary-200 via-secondary-400 to-orange-500 shadow-[0_0_80px_rgba(244,162,97,0.5)] animate-pulse-slow" />
                </div>

                {/* River SVG silhouette */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
                        {/* Water shimmer */}
                        <path
                            d="M0,300 L0,200 Q180,160 360,190 Q540,220 720,175 Q900,130 1080,165 Q1260,200 1440,150 L1440,300 Z"
                            fill="rgba(42,157,143,0.12)"
                        />
                        {/* River bank */}
                        <path
                            d="M0,300 L0,230 Q200,190 400,215 Q600,240 800,195 Q1000,150 1200,185 Q1350,210 1440,170 L1440,300 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        {/* Foreground embankment */}
                        <path
                            d="M0,300 L0,260 Q300,240 600,255 Q900,270 1200,248 Q1350,240 1440,255 L1440,300 Z"
                            fill="rgba(11,46,79,1)"
                        />
                        {/* Dock / cais suggestion */}
                        <rect x="280" y="220" width="6" height="50" fill="rgba(244,162,97,0.5)" />
                        <rect x="260" y="240" width="50" height="4" fill="rgba(244,162,97,0.4)" />
                        <rect x="620" y="205" width="4" height="45" fill="rgba(244,162,97,0.4)" />
                        <rect x="600" y="225" width="40" height="3" fill="rgba(244,162,97,0.3)" />
                        {/* Lights on water */}
                        <ellipse cx="290" cy="245" rx="30" ry="5" fill="rgba(244,162,97,0.15)" />
                        <ellipse cx="620" cy="235" rx="25" ry="4" fill="rgba(244,162,97,0.12)" />
                        {/* Birds */}
                        <path d="M500,100 Q504,96 508,100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <path d="M515,88 Q520,84 525,88" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                        <path d="M460,115 Q464,111 468,115" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
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
                            <span className="text-sm font-semibold text-secondary-400 uppercase tracking-widest">
                                Mato Grosso do Sul · Fronteira Brasil-Paraguai
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Porto
                            <br />
                            <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-orange-400 bg-clip-text text-transparent">
                                Murtinho
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            A Guardiã do Rio Paraguai
                        </motion.p>

                        {/* Stats bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users, val: "12.859 hab.", sub: "Censo 2022" },
                                { icon: Calendar, val: "1912", sub: "Fundação" },
                                { icon: Ruler, val: "17.502 km²", sub: "Território" },
                                { icon: MapPin, val: "437 km", sub: "de Campo Grande" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-secondary-400 flex-shrink-0" />
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
                        <SectionLabel>Quem é Porto Murtinho</SectionLabel>
                        <SectionTitle>
                            Pequena em população.{" "}
                            <span className="text-gradient">Gigantesca em história.</span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Porto Murtinho ergue-se às margens do Rio Paraguai como uma cidade de fronteira que mistura
                            Pantanal, memória, comércio fluvial, tradição paraguaia, arquitetura histórica e um forte
                            sentimento de pertencimento cultural. Hoje, ganha protagonismo nacional como{" "}
                            <strong className="text-primary-700">portal brasileiro da Rota Bioceânica.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Rio Paraguai",
                                text: "Eixo ecológico, econômico e paisagístico da cidade. Por ele passaram erva-mate, tanino, charque e a alma de diferentes culturas.",
                                color: "from-blue-50 to-teal-50",
                                accent: "text-teal-600",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Camera,
                                title: "Memória Urbana",
                                text: "Castelinho, Padaria Cuê, Trenzinho e uma série de casarões que leram os ciclos econômicos nas paredes, platibandas e rebocos antigos.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Music,
                                title: "Cultura de Fronteira",
                                text: "Chamamé, Toro Candil, culinária mestiça e fé popular tecem uma identidade que só existe nessa esquina singular da América do Sul.",
                                color: "from-red-50 to-rose-50",
                                accent: "text-red-700",
                                iconBg: "bg-red-100",
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

            {/* ── CICLOS HISTÓRICOS ────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Ciclos que construíram a cidade</SectionLabel>
                        <SectionTitle light>
                            Do Porto Rústico à{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
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
                            Porto Murtinho foi construída em camadas. Cada ciclo econômico deixou não apenas riqueza,
                            mas arquitetura, memória e identidade — legíveis ainda hoje em suas ruas e monumentos.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {cycles.map((cycle, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.6 }}
                                className={`rounded-3xl border ${cycle.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}
                            >
                                <div className={`h-2 bg-gradient-to-r ${cycle.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${cycle.accent} uppercase tracking-widest`}>
                                                {cycle.era}
                                            </span>
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{cycle.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cycle.color} flex items-center justify-center flex-shrink-0`}>
                                            <cycle.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{cycle.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-secondary-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Símbolo: {cycle.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASTELINHO & A LENDA ─────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Patrimônio */}
                        <div>
                            <SectionLabel>Arquitetura e Patrimônio</SectionLabel>
                            <SectionTitle>
                                Uma cidade que se lê{" "}
                                <span className="text-gradient">nas paredes</span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 leading-relaxed mb-8"
                            >
                                Uma caminhada pelo centro de Porto Murtinho é uma aula de história em platibandas,
                                janelas, torres e rebocos antigos. A cidade preserva edifícios que remetem ao auge
                                dos ciclos produtivos e que foram oficialmente tombados em 2024 como patrimônio
                                histórico material do estado.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "O Castelinho", desc: "Ícone arquitetônico e sentimental. Romantismo, extravagância e lenda." },
                                    { name: "Padaria Cuê / Museu Dom Jaime", desc: "Edifício de 1928, tombado em 2024. Memória do comércio e da vida urbana." },
                                    { name: "Prefeitura Cuê", desc: "Sede histórica do poder municipal. Também tombada em 2024." },
                                    { name: "Cine-Teatro Murtinhense", desc: "Antigo armazém de erva-mate à beira do rio, hoje palco de cultura." },
                                    { name: "Paróquia Sagrado Coração de Jesus", desc: "Marco religioso e arquitetônico do centro histórico." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-sm transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-primary-900 text-sm">{item.name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* A Lenda do Castelinho */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="rounded-3xl bg-primary-950 p-8 md:p-10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-secondary-400 uppercase tracking-widest block mb-4">
                                        Lenda Viva
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        O Amor, a Ruína e o Assombro do Castelinho
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Thomaz Herrera apaixonou-se por Virgínia — uma mulher de linhagem europeia
                                            sofisticada, acostumada a requintes que o interior do Brasil dificilmente
                                            poderia oferecer. Para impressioná-la, Herrera construiu no coração de Porto
                                            Murtinho um castelinho de traços europeus: torres, platibandas ornamentadas
                                            e um romantismo arquitetônico incomum para a fronteira.
                                        </p>
                                        <p>
                                            O amor durou. A fortuna, não. A falência veio, a paixão não sobreviveu
                                            à pobreza, e tragédia assombrou o final da história. O castelinho ficou.
                                            E com ele, a narrativa que o transformou em personagem: dizem os murtinhenses
                                            que a casa guarda os espíritos do amor perdido.
                                        </p>
                                        <p className="text-secondary-400 font-medium italic">
                                            "Em Porto Murtinho, a história oficial convive com a narrativa oral.
                                            O Castelinho é o exemplo mais vivo disso."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Star className="w-4 h-4 text-secondary-400" />
                                        <span className="text-xs text-white/40">Um dos imóveis históricos mais famosos de Mato Grosso do Sul</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TORO CANDIL ──────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <SectionLabel>Patrimônio Imaterial · Mato Grosso do Sul, 2023</SectionLabel>
                        <SectionTitle light>
                            Toro Candil:
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-secondary-400 to-red-400 bg-clip-text text-transparent">
                                fé, fogo e folguedo
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/55 text-base leading-relaxed"
                        >
                            Poucas manifestações resumem tão bem a identidade de Porto Murtinho. Acontece na véspera
                            do dia 8 de dezembro — data ligada à devoção à Virgem de Caacupê, padroeira do Paraguai —
                            e transforma as ruas em palco de comunidade, ritual e pertencimento.
                        </motion.p>
                    </div>

                    {/* O duelo dos touros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {Object.values(touroDuel).map((touro, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i, duration: 0.6 }}
                                className={`rounded-3xl overflow-hidden border ${touro.tag.split(" ")[2]}`}
                            >
                                <div className={`h-3 bg-gradient-to-r ${touro.color}`} />
                                <div className="bg-white/[0.05] p-8">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${touro.tag} mb-4`}>
                                        {i === 0 ? "Verde · A Transgressão" : "Amarelo · O Encanto"}
                                    </span>
                                    <h3 className="font-display text-2xl font-bold text-white mb-3">{touro.name}</h3>
                                    <p className="text-white/55 text-sm leading-relaxed">{touro.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Elementos da festa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl bg-white/[0.04] border border-white/10 p-8"
                    >
                        <h3 className="font-display text-xl font-bold text-white mb-6">Quem habita a festa</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Mascaritas", sub: "Personagens de rua que encarnam o caos festivo e a irreverência popular" },
                                { label: "Promesseiras", sub: "Devotas que carregam a dimensão religiosa e de fé da manifestação" },
                                { label: "Pelota Tata", sub: "A bola de fogo — elemento espetacular que intensifica o clima ritual" },
                                { label: "Encenação coletiva", sub: "Música, corrida, disputa e dramaturgia comunitária que envolvem toda a cidade" },
                            ].map((elem, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/[0.06]">
                                    <div className="font-semibold text-secondary-400 text-sm mb-1">{elem.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{elem.sub}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CHAMAMÉ ──────────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>Festival Internacional · Tradição Viva</SectionLabel>
                            <SectionTitle>
                                O Chamamé e a{" "}
                                <span className="text-gradient">Alma da Fronteira</span>
                            </SectionTitle>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4 text-slate-500 leading-relaxed"
                            >
                                <p>
                                    Porto Murtinho celebra o chamamé — ritmo de raízes argentinas, paraguaias e guaranis,
                                    profundamente incorporado à cultura sul-mato-grossense. O Festival Internacional do
                                    Chamamé reúne artistas do Brasil, Paraguai e Argentina, além de grupos locais que
                                    revelam a força da formação cultural comunitária.
                                </p>
                                <p>
                                    A{" "}
                                    <strong className="text-primary-700">Orquestra de Violões de Porto Murtinho</strong> e
                                    as{" "}
                                    <strong className="text-primary-700">Meninas Cantoras</strong> são exemplos vivos de
                                    como a cidade não vive apenas de passado: ela produz cultura no presente, formando
                                    artistas que projetam o nome do município pelo estado e pelo país.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Polca", desc: "Ritmo de base paraguaia presente no cotidiano musical da fronteira" },
                                { label: "Guarânia", desc: "Gênero lírico que une Brasil, Paraguai e Argentina numa mesma melodia" },
                                { label: "Chamamé", desc: "Ritmo de raíz guarani e europeia, alma do folclore do noroeste platino" },
                                { label: "Tereré em roda", desc: "Hábito social e afetivo que acompanha música, conversa e celebração" },
                            ].map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 * i }}
                                    className="rounded-2xl bg-primary-950 p-5"
                                >
                                    <Music className="w-5 h-5 text-secondary-400 mb-3" />
                                    <div className="font-display font-bold text-white text-base mb-1">{m.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-amber-950/30 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Sabores do Pantanal e da Fronteira</SectionLabel>
                        <SectionTitle>
                            Cozinha de{" "}
                            <span className="text-gradient">afeto e memória</span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed"
                        >
                            A mesa de Porto Murtinho combina peixe de rio, carne, mandioca, milho, queijo e receitas
                            herdadas do convívio cotidiano com o Paraguai. É uma culinária de sustento e celebração.
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
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 group-hover:from-secondary-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-secondary-500 bg-secondary-50 px-2.5 py-1 rounded-full">
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

            {/* ── NATUREZA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Pantanal e Rio Paraguai</SectionLabel>
                            <SectionTitle light>
                                A natureza que{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    define tudo
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8"
                            >
                                Porto Murtinho pertence ao bioma Pantanal e tem no Rio Paraguai seu eixo ecológico,
                                econômico e paisagístico. A cidade está integrada ao Pantanal do Nabileque —
                                sub-região de grande relevância ambiental, marcada por sazonalidade que molda
                                o cotidiano, a fauna e a cultura local.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Rio Paraguai", sub: "Cenário de pesca, navegação, contemplação, memória e integração internacional" },
                                    { label: "Pantanal do Nabileque", sub: "Planícies alagáveis, fauna abundante e sazonalidade que define o ritmo da vida" },
                                    { label: "Morro Pão de Açúcar", sub: "~550 metros. Mirante natural para o Chaco e o Pantanal. Trilha interpretativa" },
                                    { label: "Fauna Emblemática", sub: "Tuiuiús, garças, araras, jacarés, capivaras e peixes de grande porte" },
                                    { label: "Pesca Esportiva", sub: "Jaú, pintado, pacu e dourado. Temporada de fev a nov, respeitando a piracema" },
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

                        {/* Fauna visual cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Tuiuiú", detail: "Ave-símbolo do Pantanal", emoji: "🦢" },
                                { animal: "Pintado", detail: "O maior peixe do Rio Paraguai", emoji: "🐟" },
                                { animal: "Jacaré", detail: "Guardião das margens alagáveis", emoji: "🐊" },
                                { animal: "Arara", detail: "Cor viva nos campos pantaneiros", emoji: "🦜" },
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>O que ver e fazer</SectionLabel>
                        <SectionTitle>
                            Pontos que{" "}
                            <span className="text-gradient">explicam a cidade</span>
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
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full border border-secondary-200">
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roteiro Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 dias{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
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
                                        { time: "Manhã", text: day.morning },
                                        { time: "Tarde", text: day.afternoon },
                                        { time: "Noite", text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <Clock className="w-3.5 h-3.5 text-secondary-400/60 mt-0.5" />
                                            </div>
                                            <div>
                                                <span className="text-secondary-400/80 text-xs font-semibold uppercase tracking-wide">
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
                            <span className="text-gradient">surpreendem</span>
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
                                className="rounded-2xl bg-gradient-to-br from-primary-50 to-slate-50 border border-primary-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <Star className="w-4 h-4 text-secondary-400 mb-3" />
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
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                práticas
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Como chegar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <MapPin className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Como Chegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white/80">De carro:</strong> 437–440 km de Campo Grande via
                                    BR-267. Aproximadamente 6h30–7h de viagem.
                                </p>
                                <p>
                                    <strong className="text-white/80">Fronteira:</strong> Conexão simbólica com Carmelo
                                    Peralta (Paraguai) — próxima parada da Rota Bioceânica.
                                </p>
                            </div>
                        </motion.div>

                        {/* Melhor época */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Calendar className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Melhor Época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Mar → Out</span>
                                    <span className="text-white/50 text-xs">Estradas estáveis, paisagens abertas e natureza</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Fev → Nov</span>
                                    <span className="text-white/50 text-xs">Janela da pesca esportiva (piracema em Dez/Jan)</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">7 Dezembro</span>
                                    <span className="text-white/50 text-xs">Véspera do Toro Candil — imperdível</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contatos */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Phone className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Contatos Úteis</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Turismo", val: "(67) 9 9694-3176", icon: Phone },
                                    { label: "E-mail Turismo", val: "turismo@portomurtinho.ms.gov.br", icon: Mail },
                                    { label: "Hospital", val: "(67) 3287-1469", icon: Phone },
                                    { label: "Polícia Militar", val: "(67) 3287-1300", icon: Phone },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-secondary-400/60 flex-shrink-0" />
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
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-secondary-600 relative overflow-hidden">
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
                            Porto Murtinho — onde o Rio Paraguai encontra a história, a cultura e a natureza.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continue explorando as cidades que formam o maior corredor bioceânico da América do Sul.
                        </p>
                        <Link
                            to="/cidades"
                            className="inline-flex items-center gap-2 bg-white text-orange-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group"
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
