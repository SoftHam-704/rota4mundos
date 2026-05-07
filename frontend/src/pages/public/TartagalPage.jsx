import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Heart, Feather, TreePine,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Milênios antes",
        icon: Feather,
        title: "A Terra dos Povos Originários",
        color: "from-emerald-700 to-green-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "Muito antes de qualquer cidade, esta terra pertencia aos Wichí, Guarani, Chorote, Toba/Qom e Tapiete. Cada povo desenvolveu língua, espiritualidade, artesanato e uma relação profunda com as florestas das Yungas e as planícies do Chaco. Essa herança não é passado — é o presente vivo de Tartagal.",
        symbol: "Cinco povos originários — memória viva",
    },
    {
        era: "Início do Séc. XX",
        icon: Compass,
        title: "A Ferrovia e o Nascimento da Cidade",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Tartagal surgiu oficialmente no início do século XX, quando as ferrovias do norte argentino abriram o interior profundo à colonização e ao comércio. A cidade cresceu como ponto estratégico do NOA — um nó entre os Andes, o Chaco e as rotas que cruzavam em direção à Bolívia e ao Paraguai.",
        symbol: "Ferrovia NOA — portal do interior argentino",
    },
    {
        era: "1920s–1970s",
        icon: Flame,
        title: "Petróleo, Diversidade e Crescimento",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "A descoberta de petróleo transformou Tartagal num dos centros energéticos mais importantes do norte argentino. A exploração trouxe infraestrutura, migração de diferentes regiões e uma diversidade cultural que hoje define a identidade da cidade. O petróleo construiu a cidade — os povos originários lhe deram alma.",
        symbol: "Exploração petrolífera — identidade energética",
    },
    {
        era: "Hoje",
        icon: Globe,
        title: "Fronteira Multicultural na Rota Bioceânica",
        color: "from-teal-700 to-emerald-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Hoje, Tartagal é um dos pontos mais multiculturais do norte argentino — Wichí, Guarani, Chorote, Toba e Tapiete convivem com descendentes de migrantes de toda a Argentina. A Rota Bioceânica reposiciona a cidade como eixo de integração continental, abrindo o NOA para o mundo com autenticidade.",
        symbol: "Rota Bioceânica — integração continental",
    },
];

const attractions = [
    { name: "Comunidades Wichí", icon: Feather, desc: "As comunidades Wichí próximas a Tartagal preservam cestaria, simbologia sagrada e medicina tradicional. Visitas guiadas oferecem contato autêntico com uma das culturas indígenas mais ricas do norte argentino.", badge: "Cultura" },
    { name: "Yungas — Floresta Subtropical", icon: TreePine, desc: "A floresta úmida de montanha que envolve Tartagal é habitat de aves raras, mamíferos e vegetação de alta biodiversidade. Cenário impressionante que contrasta com as planícies chaqueñas.", badge: "Natureza" },
    { name: "Parque Nacional Baritú", icon: Mountain, desc: "Um dos parques mais remotos da Argentina, nas fronteiras de Salta com Bolívia. Yungas intactas, rios cristalinos e uma biodiversidade extraordinária acessível pela região de Tartagal.", badge: "Parque Nacional" },
    { name: "Mercado Municipal", icon: Globe, desc: "O mercado de Tartagal é um mosaico cultural: artesanato indígena, comida regional, línguas misturadas e a energia da fronteira argentina viva. Sem filtros, sem encenação.", badge: "Autêntico" },
    { name: "Artesanato dos Povos Originários", icon: Star, desc: "Cestarias Wichí, tecidos Guarani, esculturas em madeira Chorote e peças com sementes naturais. Cada objeto carrega cosmogonia e memória de comunidades que nunca pararam de criar.", badge: "Artesanato" },
    { name: "Transição Yungas-Chaco", icon: Waves, desc: "A região de Tartagal oferece um fenômeno visual raro: a floresta subtropical das Yungas se dissolve progressivamente no Grande Chaco. Dois biomas, dois mundos, uma mesma paisagem.", badge: "Bioma" },
    { name: "Festas Populares e Carnaval", icon: Music, desc: "As celebrações de Tartagal misturam chacarera, zamba e música indígena tradicional. Carnaval com forte presença comunitária — ritmos que cruzam fronteiras culturais num único espaço.", badge: "Festa" },
    { name: "Fronteira Argentina-Bolívia", icon: Camera, desc: "O cruzamento de Pocitos-Yacuíba, próximo a Tartagal, é uma das passagens fronteiriças mais vivas da Argentina — mercados, encontros culturais e a energia singular das cidades-limites.", badge: "Fronteira" },
];

const dishes = [
    { name: "Humita Nortenha", icon: Leaf, desc: "Milho fresco temperado, assado em palha — herança pré-colombiana que persiste nas cozinhas de Tartagal. Simples, aromático, ancestral.", tag: "Ancestral" },
    { name: "Tamales do NOA", icon: Utensils, desc: "Massa de milho com carne e temperos andinos, enrolada em palha e cozida no vapor. A versão nortenha tem sabor mais profundo — tradição ininterrupta desde os Incas.", tag: "Tradição" },
    { name: "Empanadas Salteñas", icon: Flame, desc: "A empanada da região de Salta chegou a Tartagal com toda sua identidade: massa delicada, recheio de carne na faca e temperos do NOA. Presença diária na vida local.", tag: "Regional" },
    { name: "Locro de Fronteira", icon: Utensils, desc: "O locro de Tartagal incorpora ingredientes locais — milho, feijão, carnes e especiarias — numa versão robusta e densa que aquece nas noites frias da estação seca.", tag: "Festividade" },
    { name: "Carnes Regionais", icon: Flame, desc: "A influência rural e fronteiriça traz à mesa cortes locais preparados em fogo lento. Sabores do interior profundo argentino que nenhum restaurante urbano consegue replicar.", tag: "Fronteira" },
    { name: "Plantas e Remédios Wichí", icon: Leaf, desc: "O conhecimento botânico dos Wichí transforma plantas das Yungas em chás, infusões e remédios tradicionais. Parte da gastronomia espiritual de Tartagal — saberes que a farmácia moderna ainda estuda.", tag: "Tradicional" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Cultura Indígena",
        morning: "Mercado Municipal de Tartagal — artesanato Wichí, Guarani e Chorote. Línguas, aromas e cores que não existem em nenhuma outra cidade argentina. A autenticidade é imediata.",
        afternoon: "Visita guiada a uma comunidade Wichí próxima. Cestaria, medicina tradicional e cosmogonia andina contada pelos próprios guardiões da memória. Tartagal não encena — apresenta.",
        evening: "Janta com humita e empanadas salteñas. Música ao vivo de chacarera e ritmos indígenas numa celebração comunitária que não separa moradores de visitantes.",
        color: "from-emerald-600 to-teal-700",
        icon: Feather,
    },
    {
        day: "Dia 2",
        theme: "Yungas e Natureza",
        morning: "Saída ao amanhecer para as Yungas — a floresta subtropical ao redor de Tartagal. Aves raras, mamíferos e a vegetação densa que cria um microclima úmido e verde impossível nas planícies do Chaco.",
        afternoon: "Transição Yungas-Chaco: o ponto onde a floresta começa a se dissolver e o horizonte se abre. Fenômeno visual único que resume a singularidade geográfica de Tartagal.",
        evening: "Pôr do sol sobre a paisagem de fronteira — o céu dourado sobre o verde subtropical é uma das imagens mais intensas do norte argentino. Silêncio que emociona.",
        color: "from-green-600 to-emerald-700",
        icon: TreePine,
    },
    {
        day: "Dia 3",
        theme: "Fronteira e Rota",
        morning: "Parque Nacional Baritú — o parque mais remoto da Argentina com yungas intactas, rios e biodiversidade excepcional. Uma das visitas mais raras que o NOA oferece.",
        afternoon: "Fronteira Pocitos-Yacuíba: a passagem para a Bolívia mais próxima. Mercados binacionais, culturas que se sobrepõem e a energia singular das cidades de fronteira.",
        evening: "Artesanato final nos mercados de Tartagal — cestaria Wichí, tecidos Guarani. A Rota Bioceânica continua, mas a memória de Tartagal permanece. Despedida com locro.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Tartagal concentra cinco povos originários em presença ativa: Wichí, Guarani, Chorote, Toba/Qom e Tapiete — um dos maiores mosaicos indígenas do norte argentino." },
    { text: "As Yungas que circundam Tartagal são habitat do yaguareté (onça-pintada), do puma e do tapir. A biodiversidade da região é equivalente à de parques nacionais reconhecidos internacionalmente." },
    { text: "O artesanato Wichí de Tartagal é internacionalmente reconhecido — as cestarias utilizam fibras da palma chaguar e técnicas transmitidas por gerações que nenhum livro poderia descrever completamente." },
    { text: "Tartagal é uma das poucas cidades do norte argentino onde o guarani ainda é falado no cotidiano — não como curiosidade histórica, mas como língua viva de comunicação." },
    { text: "A exploração petrolífera que desenvolveu Tartagal na primeira metade do século XX trouxe migrantes de toda a Argentina e criou uma cidade com identidade cultural única — o NOA mais plural." },
    { text: "O Parque Nacional Baritú, acessível pela região de Tartagal, é o único parque nacional argentino que não possui acesso por estrada interna — só entrando pelos rios ou pela Bolívia." },
    { text: "A transição entre as Yungas e o Gran Chaco na região de Tartagal é estudada como fenômeno ecológico único — dois dos biomas mais importantes da América do Sul se encontram num espaço de poucos quilômetros." },
    { text: "Durante o carnaval, Tartagal une chacarera argentina com ritmos Wichí e Guarani num mesmo espaço. É provavelmente o carnaval mais multicultural do norte da Argentina." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3"
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
                            src="/infografico-tartagal.png"
                            alt="Infográfico editorial Tartagal"
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
                            src="/infografico-tartagal.png"
                            alt="Infográfico editorial Tartagal"
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

export default function TartagalPage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">

                {/* Sky gradient — Yungas deep green night */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-[#001a08] to-[#001205]/80" />
                </div>

                {/* Tropical emerald glow */}
                <div className="absolute top-[15%] right-[12%] w-80 h-80 md:w-[420px] md:h-[420px] pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-emerald-500/28 via-green-600/10 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-8 rounded-full bg-gradient-radial from-emerald-400/36 via-teal-500/14 to-transparent blur-2xl" />
                    <div className="absolute inset-20 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 shadow-[0_0_100px_rgba(16,185,129,0.50)] animate-pulse-slow" />
                </div>

                {/* Yungas forest silhouette SVG */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 420" className="w-full" preserveAspectRatio="none">
                        <defs>
                            {/* Mist gradient for Yungas atmosphere */}
                            <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(5,150,105,0.12)" />
                                <stop offset="100%" stopColor="rgba(5,150,105,0)" />
                            </linearGradient>
                        </defs>

                        {/* Stars */}
                        <circle cx="100" cy="45" r="0.9" fill="rgba(255,255,255,0.65)" />
                        <circle cx="290" cy="28" r="1.1" fill="rgba(255,255,255,0.55)" />
                        <circle cx="520" cy="18" r="0.8" fill="rgba(255,255,255,0.60)" />
                        <circle cx="780" cy="25" r="1.0" fill="rgba(255,255,255,0.50)" />
                        <circle cx="1020" cy="35" r="1.2" fill="rgba(255,255,255,0.58)" />
                        <circle cx="1260" cy="22" r="0.9" fill="rgba(255,255,255,0.52)" />
                        <circle cx="420" cy="65" r="0.7" fill="rgba(255,255,255,0.38)" />
                        <circle cx="900" cy="70" r="0.8" fill="rgba(255,255,255,0.42)" />
                        <circle cx="1380" cy="55" r="0.9" fill="rgba(255,255,255,0.48)" />

                        {/* Far mountain ridge — misty blue-green */}
                        <path
                            d="M0,420 L0,290 Q100,255 200,268 Q340,285 440,230 Q540,175 640,210 Q740,245 840,195 Q960,140 1060,170 Q1180,205 1280,165 Q1380,130 1440,148 L1440,420 Z"
                            fill="rgba(5,150,105,0.12)"
                        />

                        {/* Mist layer — Yungas atmospheric */}
                        <rect x="0" y="300" width="1440" height="80" fill="url(#mist)" opacity="0.5" />

                        {/* Mid-ground forest — deep green canopy */}
                        <path
                            d="M0,420 L0,355 Q40,338 80,345 Q120,352 140,330 Q160,308 185,320 Q210,332 240,310 Q270,288 300,302 Q330,316 360,295 Q390,274 420,288 Q450,302 480,280 Q510,258 540,272 Q570,286 600,265 Q630,244 660,260 Q690,276 720,255 Q750,234 780,248 Q810,262 840,242 Q870,222 900,238 Q930,254 960,235 Q990,216 1020,230 Q1050,244 1080,225 Q1110,206 1140,220 Q1170,234 1200,215 Q1230,196 1260,210 Q1290,224 1320,208 Q1360,190 1440,202 L1440,420 Z"
                            fill="rgba(4,120,87,0.38)"
                        />

                        {/* Tree canopy silhouettes — Ceibo and subtropical trees */}
                        {/* Large tree L1 */}
                        <path d="M60,420 L60,310 Q75,270 90,255 Q105,270 120,310 L120,420 Z" fill="rgba(5,90,60,0.75)" />
                        <ellipse cx="90" cy="248" rx="38" ry="28" fill="rgba(5,90,60,0.70)" />
                        <ellipse cx="75" cy="260" rx="25" ry="20" fill="rgba(5,90,60,0.65)" />
                        <ellipse cx="108" cy="258" rx="28" ry="22" fill="rgba(5,90,60,0.65)" />

                        {/* Large tree L2 */}
                        <path d="M200,420 L200,295 Q215,252 228,238 Q241,252 255,295 L255,420 Z" fill="rgba(4,80,50,0.80)" />
                        <ellipse cx="228" cy="230" rx="42" ry="32" fill="rgba(4,80,50,0.75)" />
                        <ellipse cx="210" cy="244" rx="28" ry="22" fill="rgba(4,80,50,0.68)" />
                        <ellipse cx="248" cy="242" rx="30" ry="24" fill="rgba(4,80,50,0.68)" />

                        {/* Palm-like tree center */}
                        <path d="M420,420 L420,305 Q425,290 430,285 Q435,290 440,305 L440,420 Z" fill="rgba(3,105,70,0.72)" />
                        <path d="M430,285 Q400,268 385,255 Q395,258 408,270" fill="none" stroke="rgba(3,105,70,0.65)" strokeWidth="3" />
                        <path d="M430,285 Q460,265 478,252 Q468,256 455,268" fill="none" stroke="rgba(3,105,70,0.65)" strokeWidth="3" />
                        <path d="M430,285 Q420,260 418,245 Q425,255 428,268" fill="none" stroke="rgba(3,105,70,0.65)" strokeWidth="3" />
                        <path d="M430,285 Q442,262 445,248 Q438,258 432,270" fill="none" stroke="rgba(3,105,70,0.65)" strokeWidth="3" />

                        {/* Large tree R1 */}
                        <path d="M620,420 L620,308 Q635,265 648,248 Q661,265 674,308 L674,420 Z" fill="rgba(4,90,58,0.78)" />
                        <ellipse cx="648" cy="240" rx="44" ry="33" fill="rgba(4,90,58,0.72)" />
                        <ellipse cx="628" cy="256" rx="30" ry="23" fill="rgba(4,90,58,0.65)" />
                        <ellipse cx="668" cy="254" rx="32" ry="25" fill="rgba(4,90,58,0.65)" />

                        {/* Medium trees center-right */}
                        <path d="M820,420 L820,320 Q832,285 842,270 Q852,285 862,320 L862,420 Z" fill="rgba(5,85,55,0.72)" />
                        <ellipse cx="842" cy="262" rx="35" ry="26" fill="rgba(5,85,55,0.68)" />

                        {/* Large tree R2 */}
                        <path d="M1020,420 L1020,298 Q1038,255 1052,238 Q1066,255 1080,298 L1080,420 Z" fill="rgba(4,95,62,0.80)" />
                        <ellipse cx="1052" cy="230" rx="46" ry="34" fill="rgba(4,95,62,0.75)" />
                        <ellipse cx="1030" cy="248" rx="30" ry="23" fill="rgba(4,95,62,0.68)" />
                        <ellipse cx="1074" cy="246" rx="34" ry="26" fill="rgba(4,95,62,0.68)" />

                        {/* Far right trees */}
                        <path d="M1260,420 L1260,318 Q1272,278 1282,262 Q1292,278 1302,318 L1302,420 Z" fill="rgba(3,80,52,0.70)" />
                        <ellipse cx="1282" cy="254" rx="38" ry="28" fill="rgba(3,80,52,0.65)" />

                        {/* Foreground bush layer */}
                        <path
                            d="M0,420 L0,395 Q100,378 200,385 Q300,392 400,375 Q500,358 600,370 Q700,382 800,365 Q900,348 1000,362 Q1100,376 1200,365 Q1320,354 1440,370 L1440,420 Z"
                            fill="rgba(5,100,65,0.85)"
                        />

                        {/* Ground */}
                        <path
                            d="M0,420 L0,410 Q360,404 720,414 Q1080,424 1440,410 L1440,420 Z"
                            fill="rgba(11,46,79,1)"
                        />
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
                            <span className="text-2xl">🇦🇷</span>
                            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">
                                Província de Salta · NOA Profundo
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-4"
                        >
                            Tartagal
                            <br />
                            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl italic font-display">
                                Fronteira Cultural do Norte
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10"
                        >
                            Onde os povos originários ainda escrevem a história cotidiana
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: Users,    val: "70.000 hab.",      sub: "Cidade Fronteiriça" },
                                { icon: Feather,  val: "5 Povos",          sub: "Originários ativos" },
                                { icon: MapPin,   val: "Salta — NOA",      sub: "Norte Argentino" },
                                { icon: TreePine, val: "Yungas + Chaco",   sub: "Transição de biomas" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3 flex items-center gap-3">
                                    <s.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
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
                        <SectionLabel>Quem é Tartagal</SectionLabel>
                        <SectionTitle>
                            A Argentina que{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                nenhum guia mostrou
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Tartagal não tem cartão-postal. Tem vida. Tem mercados onde cinco línguas se cruzam,
                            florestas subtropicais que abrigam onças, e comunidades indígenas que nunca pararam
                            de existir.{" "}
                            <strong className="text-primary-700">É o capítulo mais humano e autêntico
                            da travessia bioceânica</strong> — onde a rota encontra a Argentina
                            multicultural e profundamente latino-americana.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Feather,
                                title: "5 Povos Originários",
                                text: "Wichí, Guarani, Chorote, Toba/Qom e Tapiete convivem ativamente em Tartagal. Artesanato, língua, medicina tradicional e cosmovisão — herança viva que define a identidade da cidade.",
                                color: "from-emerald-50 to-green-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: TreePine,
                                title: "Yungas e Chaco",
                                text: "A floresta subtropical das Yungas e as planícies do Gran Chaco se encontram em Tartagal — dois dos biomas mais ricos da América do Sul num fenômeno de transição ecológica único.",
                                color: "from-teal-50 to-emerald-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Fronteira Viva",
                                text: "Próxima às fronteiras com Bolívia e Paraguai, Tartagal é um nó real da integração continental. Na Rota Bioceânica, representa o NOA mais autêntico — sem encenação, sem turismo de vitrine.",
                                color: "from-green-50 to-teal-50",
                                accent: "text-green-700",
                                iconBg: "bg-green-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Da Floresta à Fronteira</SectionLabel>
                        <SectionTitle light>
                            De terra indígena a{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                polo multicultural do NOA
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Tartagal foi construída em camadas — floresta ancestral, ferrovia colonial, petróleo
                            e hoje integração bioceânica. Cada período deixou marcas visíveis no cotidiano da cidade.
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

            {/* ── POVOS ORIGINÁRIOS SPOTLIGHT ──────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/18 via-transparent to-teal-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-emerald-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(5,150,105,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                        <Feather className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                                        Memória Viva
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cinco Povos Originários
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                        A alma multicultural de Tartagal
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Nenhuma cidade do norte argentino concentra tanta diversidade indígena ativa.
                                    Cada povo mantém língua própria, espiritualidade, artesanato e medicina
                                    tradicional. Essa não é uma identidade preservada em museu — é a vida cotidiana
                                    de comunidades que escolheram existir em seus próprios termos.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                    {[
                                        { povo: "Wichí", desc: "Cestaria e medicina botânica", color: "border-emerald-500/30" },
                                        { povo: "Guarani", desc: "Língua e tecidos ancestrais", color: "border-teal-500/30" },
                                        { povo: "Chorote", desc: "Esculturas em madeira", color: "border-green-500/30" },
                                        { povo: "Toba/Qom", desc: "Música e espiritualidade", color: "border-emerald-500/25" },
                                        { povo: "Tapiete", desc: "Arte com sementes naturais", color: "border-teal-500/25" },
                                    ].map((p, i) => (
                                        <div key={i} className={`bg-white/5 rounded-2xl p-4 border ${p.color} text-center`}>
                                            <div className="text-emerald-300 font-bold text-sm mb-1">{p.povo}</div>
                                            <div className="text-white/40 text-xs leading-snug">{p.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── NATUREZA E CULTURA ───────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Floresta, Fronteira e Identidade</SectionLabel>
                        <SectionTitle light>
                            Yungas, Chaco{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                e cultura multicultural
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: TreePine,
                                title: "Yungas",
                                text: "A floresta subtropical de montanha ao redor de Tartagal abriga onça-pintada, puma e tapir. Biodiversidade comparável a parques nacionais — sem portão de entrada nem ingressos.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Gran Chaco",
                                text: "A planície chaqueña começa onde as Yungas terminam. Calor intenso, aves endêmicas e uma paisagem aberta que contrasta dramaticamente com a floresta densa — dois mundos separados por poucos quilômetros.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Music,
                                title: "Música de Fronteira",
                                text: "Chacarera, zamba e ritmos Wichí/Guarani num mesmo espaço. As festas de Tartagal misturam repertório argentino com percussão indígena — carnaval mais multicultural do NOA.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Artesanato Vivo",
                                text: "Cestaria Wichí com fibra de chaguar, tecidos Guarani, esculturas Chorote em madeira nativa. Cada peça é cosmogonia — não produto turístico. Adquiri-las é participar da memória de um povo.",
                                accent: "text-green-400",
                                iconBg: "bg-green-500/15",
                                border: "border-green-500/20",
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
                        <SectionLabel>Sabores Autênticos do NOA</SectionLabel>
                        <SectionTitle>
                            Gastronomia de{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                fronteira e floresta
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
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
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

            {/* ── PONTOS DE INTERESSE ──────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Experiências e Destinos</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                Tartagal
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-emerald-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Tartagal e fronteira
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                Tartagal
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
                                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-emerald-400" />
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
                                    "Aeroporto de Tartagal (voos regionais) ou conexão via Salta (~3h de ônibus pela Ruta 34)",
                                    "Ônibus desde Salta (3h) ou Jujuy (4h) — rodoviária central de Tartagal",
                                    "Ruta Nacional 34 — conexão direta com Salta e com a fronteira boliviana",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Maio a outubro: estação seca — calor moderado, florestas acessíveis e rios limpos",
                                    "Fevereiro/março: Carnaval multicultural — a mistura de culturas é mais visível",
                                    "Evitar novembro–abril: chuvas intensas do verão podem fechar estradas das Yungas",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Peso argentino — câmbio favorável para viajantes com dólar/real",
                                    "Altitude: 450m — clima quente e subtropical, diferente de Salta e Jujuy",
                                    "Idioma: espanhol com guarani — 'Aguyje' é obrigado em guarani",
                                ],
                                accent: "text-green-700",
                                iconBg: "bg-green-100",
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
                    style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 35%, #166534 65%, #15803d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/15 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇦🇷</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Tartagal espera por você
                        </h2>
                        <p className="text-emerald-200/70 text-lg max-w-xl mx-auto mb-10">
                            A Argentina multicultural e profundamente humana. Onde cinco povos originários
                            continuam escrevendo a história cotidiana da terra mais autêntica da Rota Bioceânica.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                            <Link
                                to="/cidades/jujuy"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Jujuy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
