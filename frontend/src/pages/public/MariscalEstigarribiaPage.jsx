import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Fish, Trees, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Plane, Shield,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Século XX — Origem",
        icon: Shield,
        title: "López de Filippis — O Posto Militar",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Mariscal Estigarribia nasceu como posto militar em uma das regiões mais isoladas do Paraguai, então conhecida como López de Filippis. O isolamento extremo e o calor implacável do Chaco forjaram desde o início uma identidade de resistência e superação que define a cidade até hoje.",
        symbol: "Fortins Históricos do Chaco",
    },
    {
        era: "1932–1935",
        icon: Star,
        title: "A Guerra do Chaco e a Resistência Nacional",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Entre 1932 e 1935, Paraguai e Bolívia disputaram o controle do Chaco Boreal em um dos maiores conflitos da América do Sul. Soldados enfrentaram calor extremo, escassez de água e condições brutais. A vitória paraguaia consolidou a ocupação do Chaco e moldou profundamente a identidade regional — memória viva em fortins, cemitérios e museus.",
        symbol: "Cemitérios e Fortins da Guerra do Chaco",
    },
    {
        era: "Renomeação",
        icon: Compass,
        title: "Homenagem ao Mariscal Estigarribia",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "A cidade foi renomeada em homenagem ao Mariscal José Félix Estigarribia — herói nacional da Guerra do Chaco, estrategista militar de renome e símbolo maior da resistência paraguaia. Seu nome transformou o antigo posto em monumento vivo à identidade chaqueña.",
        symbol: "Monumento ao Mariscal José Félix Estigarribia",
    },
    {
        era: "Hoje",
        icon: Globe,
        title: "Eixo da Ruta Bioceánica PY-15",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Mariscal Estigarribia está no cruzamento da Ruta PY-15 (Corredor Bioceânico) com a Ruta PY-09 (Transchaco). Essa posição a transforma em centro logístico, ponto de abastecimento e eixo industrial futuro — parada obrigatória das grandes travessias entre o Atlântico e o Pacífico.",
        symbol: "Cruzamento PY-15 + PY-09 — Ponto Zero do Chaco",
    },
];

const attractions = [
    { name: "Parque Nacional Teniente Agripino Enciso", icon: Mountain, desc: "Tesouros naturais do Chaco Seco: flora xerófila, dunas, trilhas históricas e vestígios da Guerra do Chaco preservados em paisagem intocada.", badge: "Natureza" },
    { name: "Museu Histórico Militar e Missionário", icon: Shield, desc: "Memória viva da Guerra do Chaco e das missões religiosas que marcaram a ocupação da região. Um dos acervos mais significativos do interior paraguaio.", badge: "História" },
    { name: "Aeroporto Dr. Luis María Argaña", icon: Plane, desc: "Um dos maiores aeroportos do Paraguai em extensão de pista. Infraestrutura estratégica que reforça a importância logística e o potencial de integração internacional.", badge: "Logística" },
    { name: "Lago da Sexta Divisão", icon: Waves, desc: "Espelho d'água em meio ao Chaco árido — refúgio natural que contrasta com a imensidão seca da região e oferece paisagem contemplativa única.", badge: "Natureza" },
    { name: "Iglesia San Miguel e Catedral", icon: Star, desc: "Iglesia San Miguel e Catedral Santa María guardam a memória religiosa e arquitetônica da colonização do Chaco, com traços das missões históricas.", badge: "Cultura" },
    { name: "Fortins da Guerra do Chaco", icon: Shield, desc: "Antigas estruturas militares espalhadas pelo Chaco — testemunhas silenciosas de uma das guerras mais intensas da América do Sul do século XX.", badge: "Patrimônio" },
    { name: "Comunidades Indígenas", icon: Globe, desc: "Os povos Nivaclé, Ayoreo, Guarani Ocidental e Sanapaná preservam artesanato, medicina natural e tradições espirituais ancestrais a poucos quilômetros do centro.", badge: "Cultura" },
    { name: "Pôr do Sol no Chaco", icon: Camera, desc: "A poeira avermelhada, o céu dourado e as árvores retorcidas criam um dos espetáculos visuais mais impactantes da América do Sul — impossível esquecer.", badge: "Experiência" },
];

const dishes = [
    { name: "Sopa Paraguaia", icon: Utensils, desc: "Prato tradicional feito com milho, queijo e muito sabor — emblema da culinária paraguaia presente em todas as mesas do interior do país.", tag: "Tradição" },
    { name: "Chipa", icon: Utensils, desc: "Pão de queijo paraguaio, assado em forno de barro. No Chaco é consumido quente no café da manhã, no campo e durante as travessias.", tag: "Cotidiano" },
    { name: "Carnes Assadas do Chaco", icon: Flame, desc: "Cortes preparados lentamente em brasa ou fogo de chão. A pecuária extensiva do Chaco produz carnes de sabor intenso e autêntico.", tag: "Chaco" },
    { name: "Pratos Rurais e do Campo", icon: Utensils, desc: "Receitas do interior paraguaio transmitidas entre gerações: caldos, guisados, mandioca e ingredientes da terra que alimentaram quem construiu o Chaco.", tag: "Interior" },
    { name: "Tereré", icon: Leaf, desc: "Identidade nacional em uma cuia. No Chaco, o tereré é ainda mais essencial — refresca, une e marca cada pausa da vida árida do interior.", tag: "Ritual" },
    { name: "Culinária Indígena", icon: Leaf, desc: "Receitas dos povos Nivaclé, Ayoreo e Sanapaná com ingredientes nativos do Chaco: frutos, raízes e ervas com séculos de história e sabedoria.", tag: "Ancestral" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "História e Cultura",
        morning: "Visita ao Museu Histórico Militar e Missionário. Percorrer a memória da Guerra do Chaco — fortins, relíquias e narrativas de uma batalha que moldou o Paraguai.",
        afternoon: "Iglesia San Miguel e Catedral Santa María. Centro da cidade, praça principal e contato com a arquitetura histórica da colonização do Chaco.",
        evening: "Pôr do sol no Chaco — o espetáculo do céu dourado sobre a imensidão árida. Jantar com sopa paraguaia, chipa e tereré em roda com moradores locais.",
        color: "from-amber-600 to-orange-700",
        icon: Shield,
    },
    {
        day: "Dia 2",
        theme: "Natureza e Aventura",
        morning: "Parque Nacional Teniente Agripino Enciso: trilhas históricas, flora xerófila, dunas e vestígios da guerra. Um dos poucos parques nacionais do Chaco Seco.",
        afternoon: "Lago da Sexta Divisão — passeio contemplativo e observação da fauna. Aves adaptadas ao clima extremo, vegetação resistente e silêncio absoluto.",
        evening: "Céu estrelado no Chaco — sem poluição luminosa, é um dos mais impressionantes da América do Sul. Experiência de imensidão que poucos viajantes conhecem.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Dia 3",
        theme: "Povos e Sabores",
        morning: "Visita a comunidades indígenas Nivaclé ou Ayoreo: artesanato em fibras naturais, medicina tradicional e cosmovisão ancestral ligada ao território chaqueño.",
        afternoon: "Gastronomia do Chaco: carnes assadas, pratos rurais e culinária indígena. Compras de artesanato local — peças únicas que carregam a história dos povos do Chaco.",
        evening: "Cruzamento PY-15 + PY-09 ao entardecer — o ponto onde dois grandes corredores do continente se encontram. Mariscal Estigarribia fica para sempre.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Mariscal Estigarribia está no cruzamento exato da Ruta PY-15 (Corredor Bioceânico) com a Ruta PY-09 (Transchaco) — tornando-a o nó logístico mais estratégico do interior paraguaio." },
    { text: "O Aeroporto Dr. Luis María Argaña possui uma das maiores pistas do Paraguai — infraestrutura herdada da Segunda Guerra Mundial, quando os EUA usaram o Chaco como base de apoio." },
    { text: "A cidade foi originalmente chamada de López de Filippis e só foi renomeada para Mariscal Estigarribia em homenagem ao herói da Guerra do Chaco, José Félix Estigarribia." },
    { text: "O Parque Nacional Teniente Agripino Enciso é um dos únicos parques nacionais do Chaco Paraguaio Seco — protegendo fauna e flora adaptadas a condições climáticas extremas." },
    { text: "Os povos Nivaclé, Ayoreo, Guarani Ocidental e Sanapaná habitam a região há milênios, com saberes ancestrais sobre o Chaco que nenhuma ciência moderna conseguiu replicar." },
    { text: "O Chaco Paraguaio é um dos territórios com menor densidade demográfica da América do Sul — e um dos biomas mais biodiversos do planeta, apesar da aparência árida." },
    { text: "Mariscal Estigarribia registra temperaturas entre -5°C no inverno e +45°C no verão — uma das maiores amplitudes térmicas da América do Sul em uma única cidade." },
    { text: "Com a operação plena do Corredor Bioceânico, a cidade tende a se transformar em polo de logística, hotelaria e serviços — crescimento sem precedentes para uma região que sempre viveu no isolamento." },
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
                            src="/infografico-mariscal-estigarribia.png"
                            alt="Infográfico editorial Mariscal Estigarribia"
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
                            src="/infografico-mariscal-estigarribia.png"
                            alt="Infográfico editorial Mariscal Estigarribia"
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

export default function MariscalEstigarribiaPage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient — golden Chaco */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-amber-950/40" />
                </div>

                {/* Chaco sunset glow */}
                <div className="absolute top-[18%] right-[15%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-400/35 via-orange-500/12 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-amber-300/45 via-yellow-400/18 to-transparent blur-2xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-200 via-orange-400 to-red-500 shadow-[0_0_80px_rgba(251,191,36,0.5)] animate-pulse-slow" />
                </div>

                {/* Chaco horizon SVG */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 300" className="w-full" preserveAspectRatio="none">
                        {/* Flat Chaco land */}
                        <path
                            d="M0,300 L0,220 Q360,215 720,222 Q1080,229 1440,218 L1440,300 Z"
                            fill="rgba(251,191,36,0.06)"
                        />
                        <path
                            d="M0,300 L0,240 Q360,235 720,242 Q1080,249 1440,238 L1440,300 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        <path
                            d="M0,300 L0,265 Q360,260 720,267 Q1080,274 1440,263 L1440,300 Z"
                            fill="rgba(11,46,79,1)"
                        />
                        {/* Quebracho trees silhouettes */}
                        <rect x="180" y="195" width="3" height="45" fill="rgba(251,191,36,0.3)" />
                        <path d="M175,195 Q181.5,180 188,195" fill="rgba(251,191,36,0.25)" />
                        <rect x="420" y="200" width="3" height="40" fill="rgba(251,191,36,0.25)" />
                        <path d="M415,200 Q421.5,186 428,200" fill="rgba(251,191,36,0.2)" />
                        <rect x="780" y="198" width="3" height="44" fill="rgba(251,191,36,0.28)" />
                        <path d="M775,198 Q781.5,183 788,198" fill="rgba(251,191,36,0.22)" />
                        <rect x="1100" y="202" width="3" height="38" fill="rgba(251,191,36,0.22)" />
                        <path d="M1095,202 Q1101.5,189 1108,202" fill="rgba(251,191,36,0.18)" />
                        {/* Dust particles */}
                        <circle cx="300" cy="230" r="1.5" fill="rgba(251,191,36,0.2)" />
                        <circle cx="650" cy="226" r="1" fill="rgba(251,191,36,0.15)" />
                        <circle cx="950" cy="232" r="1.5" fill="rgba(251,191,36,0.18)" />
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
                            <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
                                Boquerón · Chaco Paraguaio
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Mariscal
                            <br />
                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                Estigarribia
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            O Coração do Chaco Paraguaio
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users,    val: "8.000 hab.",    sub: "Estimativa" },
                                { icon: Calendar, val: "Séc. XX",        sub: "Origem Militar" },
                                { icon: MapPin,   val: "Boquerón",       sub: "Departamento" },
                                { icon: Compass,  val: "PY-15 + PY-09", sub: "Cruzamento Estratégico" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
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
                        <SectionLabel>Quem é Mariscal Estigarribia</SectionLabel>
                        <SectionTitle>
                            Onde a resistência encontra{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
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
                            Mariscal Estigarribia é o coração do Chaco Paraguaio. Moldada pela Guerra do Chaco,
                            habitada por povos indígenas e posicionada no cruzamento estratégico das rotas bioceânicas,
                            ela representa a{" "}
                            <strong className="text-primary-700">essência de um território que viveu no isolamento
                            e agora se prepara para conectar oceanos</strong>. Horizontes infinitos, pôr do sol
                            cinematográfico e uma história de resistência que poucos lugares do continente conhecem.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Compass,
                                title: "Eixo Bioceânico",
                                text: "Cruzamento da Ruta PY-15 (Corredor Bioceânico) com a Ruta PY-09 (Transchaco) — posição estratégica que tornará a cidade polo logístico entre os dois oceanos.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Shield,
                                title: "Memória da Guerra",
                                text: "Fortins, museus, cemitérios e trilhas históricas da Guerra do Chaco (1932–1935) — uma das batalhas mais brutais da América do Sul, que definiu o destino do Paraguai.",
                                color: "from-red-50 to-rose-50",
                                accent: "text-red-700",
                                iconBg: "bg-red-100",
                            },
                            {
                                icon: Globe,
                                title: "Povos do Chaco",
                                text: "Nivaclé, Ayoreo, Guarani Ocidental e Sanapaná preservam sabedoria ancestral. Artesanato, medicina natural e cosmovisão ligada ao território formam uma identidade única.",
                                color: "from-violet-50 to-purple-50",
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
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
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Terra de Resistência e Superação</SectionLabel>
                        <SectionTitle light>
                            Da Guerra do Chaco ao{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Corredor Continental
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Mariscal Estigarribia foi construída em camadas de batalha, isolamento e estratégia.
                            Do posto militar ao nó logístico continental — cada período deixou marcas indeléveis
                            na identidade chaqueña.
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

            {/* ── ROTA BIOCEÂNICA SPOTLIGHT ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-transparent to-orange-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-amber-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(234,88,12,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                                        Posição Estratégica
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cruzamento PY-15 + PY-09
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        O ponto zero do Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Mariscal Estigarribia está no cruzamento da Ruta PY-15 — eixo do Corredor Bioceânico
                                    que liga Atlântico ao Pacífico — com a Ruta PY-09, a Transchaco, principal artéria
                                    norte-sul do Paraguai. Essa posição única a transforma em polo logístico inevitável
                                    da integração sul-americana.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Rota Bioceânica", val: "PY-15", sub: "Atlântico → Pacífico" },
                                        { label: "Transchaco", val: "PY-09", sub: "Norte-Sul do Paraguai" },
                                        { label: "Aeroporto", val: "Argaña", sub: "Uma das maiores pistas do PY" },
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
                            <SectionLabel>Chaco Vivo</SectionLabel>
                            <SectionTitle>
                                Natureza extrema e{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    biodiversidade escondida
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                O Chaco parece árido, mas esconde uma biodiversidade extraordinária. Fauna adaptada
                                ao clima extremo, parques nacionais preservados e um céu estrelado que só quem
                                viveu longe da cidade consegue imaginar. A imensidão do Chaco não assusta — ela liberta.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Tamanduá", icon: "🦣" },
                                    { label: "Araras", icon: "🦜" },
                                    { label: "Puma", icon: "🐆" },
                                    { label: "Tatu", icon: "🦔" },
                                    { label: "Jacaré", icon: "🐊" },
                                    { label: "Cervo", icon: "🦌" },
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
                        >
                            <div className="rounded-3xl overflow-hidden bg-primary-950 p-8 border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Chaco Seco", desc: "Vegetação xerófila, dunas e clima extremo que forjaram a identidade mais resistente da América do Sul.", color: "from-amber-900/60 to-orange-900/60", accent: "text-amber-400" },
                                        { title: "Parque Enciso", desc: "Flora nativa, trilhas históricas e vestígios da guerra num dos únicos parques nacionais do Chaco Paraguaio.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Céu Estrelado", desc: "Sem poluição luminosa, o Chaco oferece uma das vistas do céu noturno mais espetaculares do continente.", color: "from-indigo-900/60 to-blue-900/60", accent: "text-indigo-400" },
                                        { title: "Pôr do Sol", desc: "Poeira vermelha, céu dourado e quebracho retorcido — um dos fenômenos visuais mais cinematográficos da América do Sul.", color: "from-red-900/50 to-orange-900/50", accent: "text-red-400" },
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

            {/* ── CULTURA E POVOS ──────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Identidade Chaqueña</SectionLabel>
                        <SectionTitle light>
                            Cultura de{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                resistência e raiz
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Shield,
                                title: "Tradição Militar",
                                text: "A memória da Guerra do Chaco permeia cada rua, monumento e conversa. Orgulho nacional expresso em museus, fortins e cemitérios históricos.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Povos Originários",
                                text: "Nivaclé, Ayoreo, Guarani Ocidental e Sanapaná — culturas ancestrais com artesanato, medicina natural e espiritualidade ligada ao Chaco.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Guarani no Chaco",
                                text: "Espanhol, guarani e dialetos indígenas convivem nas ruas. A língua guarani é identidade viva — falada no campo, no mercado e em casa.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Vida Rural",
                                text: "A vida no Chaco tem ritmo próprio — lento, forte e ligado à terra. Pecuária, campo aberto e hospitalidade simples marcam o cotidiano da cidade.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
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
                        <SectionLabel>Sabores do Interior</SectionLabel>
                        <SectionTitle>
                            Gastronomia do{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Chaco Profundo
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Mariscal Estigarribia
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
                            3 dias{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                no coração do Chaco
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
                                Mariscal Estigarribia
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
                                    "Ruta PY-09 (Transchaco) a partir de Asunción — ~500 km (5–6h)",
                                    "Acesso pela Ruta PY-15 vindo de Carmelo Peralta e da fronteira com o Brasil",
                                    "Aeroporto Dr. Luis María Argaña: voos domésticos ocasionais",
                                ],
                                accent: "text-amber-600",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Maio a agosto: inverno do Chaco, temperaturas amenas (10–25°C)",
                                    "Evitar dezembro–março: calor extremo acima de 40°C e chuvas intensas",
                                    "Julho é ideal para turismo histórico e trilhas no Parque Enciso",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Compass,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Guarani paraguaio",
                                    "Levar água em abundância — o Chaco é árido e o calor é extremo",
                                    "Combustível e suprimentos: abastecer antes de entrar no Chaco profundo",
                                ],
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
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
                    style={{ background: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #92400e 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/12 rounded-full blur-[90px]" />
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
                            Mariscal Estigarribia espera por você
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            O coração do Chaco e o portal da travessia continental.
                            Uma cidade moldada pela guerra, pela resistência e pelo futuro da integração sul-americana.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
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
