import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
    Anchor, Globe,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Século XIX",
        icon: Compass,
        title: "A Guerra do Chaco e a Formação do Território",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "A região de Carmelo Peralta foi palco dos conflitos da Guerra do Chaco (1932–1935), um dos maiores confrontos militares da América do Sul entre Paraguai e Bolívia. Esse período forjou a identidade chaqueña — resistência, superação e orgulho de um povo que defendeu seu território nas condições mais extremas do continente.",
        symbol: "Memória da Guerra do Chaco",
    },
    {
        era: "Década de 1940",
        icon: Star,
        title: "Fortalecimento e Ocupação do Norte",
        color: "from-violet-600 to-purple-700",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "Com o fortalecimento da presença paraguaia no Chaco após a guerra, a região recebeu novos núcleos populacionais e instalações militares. A ocupação foi gradual, mas marcou definitivamente o desenvolvimento do norte paraguaio — impulsionando rotas, comércios e assentamentos às margens do Rio Paraguai.",
        symbol: "Fortins Históricos do Chaco",
    },
    {
        era: "1955",
        icon: ArrowRight,
        title: "Criação do Distrito em Honra ao Capitão",
        color: "from-indigo-600 to-violet-700",
        accent: "text-indigo-400",
        border: "border-indigo-500/30",
        body: "Em 12 de junho de 1955, foi criado o Distrito de Carmelo Peralta, nome dado em homenagem ao Capitán Carmelo Peralta — aviador militar paraguaio e herói nacional. O nome carrega coragem, patriotismo e a memória viva da ocupação histórica do território chaqueño.",
        symbol: "Capitán Carmelo Peralta — Herói Nacional",
    },
    {
        era: "1960 → Hoje",
        icon: Globe,
        title: "De Município Isolado ao Portal Continental",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Em 1960, Carmelo Peralta foi elevada à categoria de município. Desde então, cresce como centro estratégico do norte paraguaio. Com a construção da Ponte Bioceânica sobre o Rio Paraguai — ligando-a a Porto Murtinho/MS — a cidade se transforma no portal do Corredor Bioceânico Sul-Americano.",
        symbol: "Ponte Bioceânica — Símbolo da Integração",
    },
];

const attractions = [
    { name: "Ponte Bioceânica", icon: Anchor, desc: "O símbolo máximo da integração sul-americana. A ponte sobre o Rio Paraguai conecta Carmelo Peralta a Porto Murtinho/MS e inaugura o Corredor Bioceânico ao Pacífico.", badge: "Integração" },
    { name: "Rio Paraguai", icon: Waves, desc: "Passeios fluviais, pesca esportiva e contemplação de um dos rios mais majestosos da América do Sul. Ao amanhecer, o rio reflete o céu dourado do Chaco.", badge: "Natureza" },
    { name: "Pantanal Paraguaio", icon: Trees, desc: "Acesso privilegiado a uma das maiores áreas úmidas do planeta. Fauna exuberante, rios e vegetação nativa em estado quase intocado.", badge: "Ecoturismo" },
    { name: "Observação de Aves", icon: Camera, desc: "Tuiuiús, araras, garças e espécies migratórias em abundância. O céu de Carmelo Peralta é frequentemente tomado por voos de aves coloridas.", badge: "Fauna" },
    { name: "Cultura Indígena", icon: Compass, desc: "Presença histórica dos povos Ayoreo e Chamacoco — culturas ancestrais com profundo conhecimento dos rios, fauna e espiritualidade do Chaco.", badge: "Patrimônio" },
    { name: "Chaco Paraguaio", icon: Mountain, desc: "Paisagens de vastidão impressionante, calor intenso durante o dia e um céu estrelado à noite que transforma a experiência em espetáculo natural.", badge: "Aventura" },
    { name: "Pesca Esportiva", icon: Fish, desc: "Pacu, dourado e pintado nas águas do Rio Paraguai. Tradição ribeirinha que ancora a identidade cultural e econômica da região.", badge: "Esporte" },
    { name: "Fronteira Brasil-Paraguai", icon: Globe, desc: "Experiência de integração cultural única: português, espanhol e guarani convivem nas ruas, no comércio e na hospitalidade do povo fronteiriço.", badge: "Cultura" },
];

const dishes = [
    { name: "Sopa Paraguaia", icon: Utensils, desc: "Prato tradicional feito com milho, queijo e muito sabor. Um dos emblemas da culinária paraguaia, presente em todas as mesas de Carmelo Peralta.", tag: "Tradição" },
    { name: "Chipa", icon: Utensils, desc: "Pão de queijo típico paraguaio, presente em todas as famílias e celebrações. Consumido quente, direto do forno de barro, com tereré.", tag: "Cotidiano" },
    { name: "Pescados do Pantanal", icon: Fish, desc: "Peixes de água doce preparados com temperos regionais. Pacu, dourado e pintado chegam frescos diretamente do Rio Paraguai.", tag: "Rio" },
    { name: "Carnes Chaqueñas", icon: Flame, desc: "Preparadas lentamente, preservando sabores intensos do Chaco. Herança da pecuária extensiva e da cultura dos domadores do norte paraguaio.", tag: "Chaco" },
    { name: "Tereré", icon: Leaf, desc: "Muito mais que uma bebida — representa convivência, amizade e identidade cultural paraguaia. Compartilhado em rodas, expressa a hospitalidade chaqueña.", tag: "Ritual" },
    { name: "Gastronomia Fronteiriça", icon: Utensils, desc: "Mistura rica de sabores paraguaios e brasileiros: mandioca, milho, queijo e receitas ribeirinhas que cruzam fronteiras sem perder autenticidade.", tag: "Fusão" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Fronteira e Integração",
        morning: "Contemplação da Ponte Bioceânica — o símbolo maior da integração sul-americana. Caminhada pelas margens do Rio Paraguai e registro fotográfico ao amanhecer.",
        afternoon: "Passeio pelo centro histórico, Praça Central e monumentos. Visita ao Museu da Guerra do Chaco e contato com a identidade chaqueña.",
        evening: "Gastronomia local: sopa paraguaia, chipa e tereré. Pôr do sol sobre o Rio Paraguai — um dos espetáculos mais cinematográficos da América do Sul.",
        color: "from-violet-600 to-purple-700",
        icon: Anchor,
    },
    {
        day: "Dia 2",
        theme: "Natureza e Aventura",
        morning: "Passeio fluvial pelo Rio Paraguai — observação de fauna, jacarés, capivaras e tuiuiús. Fotografia de natureza ao amanhecer, quando o silêncio da água é absoluto.",
        afternoon: "Incursão ao Pantanal Paraguaio: vegetação nativa, aves migratórias e paisagens preservadas. Visita a comunidades ribeirinhas e contato com a cultura local.",
        evening: "Observação do céu estrelado no Chaco — sem poluição luminosa, é um dos mais impressionantes da América do Sul. Jantar com pescados do Paraguai.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Dia 3",
        theme: "Cultura e Sabores",
        morning: "Cultura indígena: visita a comunidades Ayoreo ou Chamacoco. Artesanato em couro, madeira, fibras e artes nativas com tradições ancestrais do Chaco.",
        afternoon: "Gastronomia chaqueña: carnes lentas, sopa paraguaia e chipa artesanal. Compras no comércio local e travessia para Porto Murtinho/MS — experiência única de integração.",
        evening: "Despedida nas margens do Rio Paraguai. Carmelo Peralta fica — portal entre dois oceanos e guardiã do futuro continental.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Carmelo Peralta recebeu o nome do Capitán Carmelo Peralta, aviador militar paraguaio considerado herói nacional — símbolo de coragem e ocupação do Chaco." },
    { text: "A Ponte Bioceânica sobre o Rio Paraguai conecta Carmelo Peralta a Porto Murtinho/MS, inaugurando o corredor logístico entre o Atlântico e o Pacífico." },
    { text: "A cidade é conhecida como 'La Puerta del Pantanal' — ponto de entrada privilegiado para uma das maiores áreas úmidas do planeta." },
    { text: "O Chaco Paraguaio registra algumas das temperaturas mais altas da América do Sul — e também algumas das paisagens mais vastas e preservadas do continente." },
    { text: "Os povos Ayoreo e Chamacoco habitam a região há séculos, com conhecimentos ancestrais sobre os rios, fauna e ciclos naturais do Chaco e do Pantanal." },
    { text: "Criada como distrito em 1955 e município em 1960, Carmelo Peralta é uma das cidades mais jovens do Paraguai — mas com uma das histórias mais densas do Chaco." },
    { text: "A fronteira entre Carmelo Peralta e Porto Murtinho é um dos pontos de confluência cultural mais ricos da América do Sul: guarani, português e espanhol coexistem nas ruas." },
    { text: "Com a operação plena do Corredor Bioceânico, Carmelo Peralta deve se tornar um dos nós logísticos mais estratégicos entre Brasil, Paraguai, Argentina e Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3"
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
                            src="/infografico-carmelo-peralta.png"
                            alt="Infográfico editorial Carmelo Peralta"
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
                            src="/infografico-carmelo-peralta.png"
                            alt="Infográfico editorial Carmelo Peralta"
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

export default function CarmeloPeraltaPage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-violet-950/50" />
                </div>

                {/* River glow — dourado do Chaco */}
                <div className="absolute top-[18%] right-[15%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-violet-400/35 via-indigo-500/12 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-violet-300/45 via-purple-400/18 to-transparent blur-2xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-violet-200 via-indigo-400 to-purple-500 shadow-[0_0_80px_rgba(139,92,246,0.5)] animate-pulse-slow" />
                </div>

                {/* River SVG */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
                        <path
                            d="M0,300 L0,200 Q180,155 360,185 Q540,215 720,170 Q900,125 1080,160 Q1260,195 1440,145 L1440,300 Z"
                            fill="rgba(139,92,246,0.08)"
                        />
                        <path
                            d="M0,300 L0,230 Q200,190 400,215 Q600,240 800,195 Q1000,148 1200,183 Q1350,208 1440,168 L1440,300 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        <path
                            d="M0,300 L0,260 Q300,240 600,255 Q900,270 1200,248 Q1350,240 1440,255 L1440,300 Z"
                            fill="rgba(11,46,79,1)"
                        />
                        {/* Bridge silhouette */}
                        <rect x="580" y="190" width="280" height="4" fill="rgba(139,92,246,0.5)" />
                        <rect x="600" y="180" width="8" height="40" fill="rgba(139,92,246,0.4)" />
                        <rect x="840" y="180" width="8" height="40" fill="rgba(139,92,246,0.4)" />
                        <path d="M604,183 Q720,162 844,183" fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="2" />
                        <ellipse cx="720" cy="210" rx="60" ry="8" fill="rgba(139,92,246,0.10)" />
                        {/* Birds */}
                        <path d="M440,95 Q444,91 448,95" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        <path d="M460,82 Q465,78 470,82" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                        <path d="M490,108 Q494,104 498,108" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
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
                            <span className="text-sm font-semibold text-violet-400 uppercase tracking-widest">
                                Alto Paraguay · Chaco Paraguaio
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Carmelo
                            <br />
                            <span className="bg-gradient-to-r from-violet-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Peralta
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            A Porta do Pantanal Paraguaio
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users,    val: "18.926 hab.", sub: "Censo 2022" },
                                { icon: Calendar, val: "1955",        sub: "Fundação" },
                                { icon: MapPin,   val: "Alto Paraguay", sub: "Departamento" },
                                { icon: Anchor,   val: "Ponte Bioceânica", sub: "Marco da Rota" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
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
                        <SectionLabel>Quem é Carmelo Peralta</SectionLabel>
                        <SectionTitle>
                            Onde o Chaco encontra{" "}
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                                o futuro continental
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Carmelo Peralta é muito mais do que uma cidade de fronteira. Localizada às margens do Rio
                            Paraguai, na transição entre o Pantanal e o Chaco, ela representa integração continental,
                            conexão entre povos e{" "}
                            <strong className="text-primary-700">o início do Corredor Bioceânico rumo ao Pacífico</strong>.
                            Com a Ponte Bioceânica, essa pequena cidade do norte paraguaio tornou-se um dos pontos
                            mais estratégicos da América do Sul.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Portal Bioceânico",
                                text: "A Ponte Bioceânica liga Carmelo Peralta a Porto Murtinho/MS, tornando-a o primeiro nó paraguaio do corredor logístico que conecta o Atlântico ao Pacífico.",
                                color: "from-violet-50 to-indigo-50",
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Trees,
                                title: "Pantanal Preservado",
                                text: "Acesso privilegiado ao Pantanal Paraguaio — uma das maiores zonas úmidas do planeta, com fauna exuberante e paisagens de uma natureza ainda quase intocada.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Cultura Fronteiriça",
                                text: "Português, espanhol e guarani convivem nas ruas. A influência dos povos Ayoreo e Chamacoco, a hospitalidade chaqueña e a gastronomia ribeirinha formam uma identidade única.",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Raízes de coragem e superação</SectionLabel>
                        <SectionTitle light>
                            Da Guerra do Chaco ao{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Portal Continental
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Carmelo Peralta foi construída em camadas de resistência, patriotismo e estratégia.
                            Da guerra que definiu fronteiras à ponte que conecta oceanos — cada período deixou
                            marcas visíveis na identidade do povo chaqueño.
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

            {/* ── PONTE BIOCEÂNICA SPOTLIGHT ───────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-violet-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,27,51,0.95) 60%, rgba(99,102,241,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                                        <Anchor className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
                                        Marco Histórico
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    A Ponte Bioceânica
                                    <br />
                                    <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                        e o futuro da rota
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    A Ponte Bioceânica sobre o Rio Paraguai — ligando Carmelo Peralta a Porto Murtinho/MS —
                                    é o símbolo mais poderoso da integração sul-americana. Ela faz parte do Corredor
                                    Bioceânico que conectará Brasil, Paraguai, Argentina e Chile, criando uma rota
                                    direta entre o Oceano Atlântico e o Oceano Pacífico.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Extensão da ponte", val: "~1,7 km", sub: "Sobre o Rio Paraguai" },
                                        { label: "Início da Rota", val: "PY-15", sub: "Rota bioceânica paraguaia" },
                                        { label: "Destino", val: "Pacífico", sub: "Via Argentina e Chile" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-violet-500/10">
                                            <div className="text-2xl font-bold text-violet-300 font-display mb-1">{stat.val}</div>
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

            {/* ── NATUREZA ─────────────────────────────────────── */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <SectionLabel>Natureza Preservada</SectionLabel>
                            <SectionTitle>
                                Entre o Pantanal e{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    o Chaco Selvagem
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                Carmelo Peralta está posicionada exatamente na transição entre dois dos ecossistemas
                                mais fascinantes do planeta. O Pantanal Paraguaio oferece áreas alagadas, fauna
                                exuberante e rios de rara beleza. O Chaco impressiona pela vastidão, pelo céu estrelado
                                e pela resistência de uma natureza que desafia qualquer extremo.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Tuiuiús", icon: "🦢" },
                                    { label: "Araras", icon: "🦜" },
                                    { label: "Onça-pintada", icon: "🐆" },
                                    { label: "Jacarés", icon: "🐊" },
                                    { label: "Capivara", icon: "🦫" },
                                    { label: "Dourado", icon: "🐟" },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
                                        <span className="text-2xl">{a.icon}</span>
                                        <span className="text-slate-700 font-semibold text-sm">{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden bg-primary-950 p-8 border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Pantanal Paraguaio", desc: "Uma das maiores áreas úmidas do planeta, com fauna e flora em estado bruto.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Rio Paraguai", desc: "Eixo vital da região — pesca, passeios e contemplação do maior rio do Chaco.", color: "from-blue-900/60 to-cyan-900/60", accent: "text-blue-400" },
                                        { title: "Chaco Paraguaio", desc: "Horizontes infinitos, calor intenso, noite estrelada — paisagem que liberta.", color: "from-amber-900/50 to-orange-900/50", accent: "text-amber-400" },
                                        { title: "Fauna Exuberante", desc: "Araras, tuiuiús, jacarés, onças e espécies de aves que encantam qualquer visitante.", color: "from-violet-900/50 to-purple-900/50", accent: "text-violet-400" },
                                    ].map((card, i) => (
                                        <div key={i} className={`rounded-2xl bg-gradient-to-br ${card.color} p-5 border border-white/8`}>
                                            <h4 className={`font-bold text-sm ${card.accent} mb-2`}>{card.title}</h4>
                                            <p className="text-white/40 text-xs leading-relaxed">{card.desc}</p>
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Um Encontro de Povos e Tradições</SectionLabel>
                        <SectionTitle light>
                            Cultura{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                fronteiriça
                            </span>{" "}
                            e genuína
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Globe,
                                title: "Identidade Chaqueña",
                                text: "A cultura do Chaco está presente na música, nas danças, na língua guarani e nas tradições do povo.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Star,
                                title: "Influência Indígena",
                                text: "Terra dos povos Ayoreo e Guarani, cujos costumes e saberes ancestrais permanecem vivos.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Vida Ribeirinha",
                                text: "O Rio Paraguai molda o modo de vida, a pesca, o comércio e as celebrações cotidianas.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
                            },
                            {
                                icon: Music,
                                title: "Hospitalidade",
                                text: "Carmelo Peralta recebe com simplicidade, alegria e um sorriso que representa o coração do Chaco.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
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
                        <SectionLabel>Sabores que Contam Histórias</SectionLabel>
                        <SectionTitle>
                            Gastronomia do{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Paraguai e do Pantanal
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Carmelo Peralta
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-violet-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-violet-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Carmelo Peralta
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
                                <div className="w-7 h-7 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-violet-400" />
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
                                    "Travessia pela Ponte Bioceânica a partir de Porto Murtinho/MS (Brasil)",
                                    "Acesso pela Rota PY-15 a partir de Asunción (~670 km)",
                                    "Aeroporto mais próximo: Asunción (voos para Campo Grande/MS)",
                                ],
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Abril a setembro: clima mais ameno, ideal para o Chaco",
                                    "Julho e agosto: temperatura agradável para passeios e observação de fauna",
                                    "Evitar dezembro–fevereiro: calor extremo e chuvas no Chaco",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Phone,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Guarani paraguaio (aceita-se Real na fronteira)",
                                    "Documentação: RG ou passaporte para travessia",
                                    "Fuso: UTC-4 (mesmo horário de Campo Grande fora do horário de verão)",
                                ],
                                accent: "text-amber-600",
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
                    style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/12 rounded-full blur-[90px]" />
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
                            Carmelo Peralta espera por você
                        </h2>
                        <p className="text-violet-200/70 text-lg max-w-xl mx-auto mb-10">
                            O portal do Pantanal Paraguaio e do Corredor Bioceânico Sul-Americano.
                            Uma cidade que conecta continentes, culturas e futuros.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-2xl hover:bg-violet-50 transition-colors text-sm"
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
