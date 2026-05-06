import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Ruler, Calendar,
    Train, Fish, Trees, Leaf, Utensils, Music, Camera,
    Clock, Phone, Flame, Star, ChevronRight, Globe,
    Building2, GraduationCap, Plane, ZoomIn, X,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const ferrovia = {
    antes: "1.800 hab.",
    depois: "50.000 hab.",
    prazo: "< 10 anos",
    ano: "1914",
    detalhe: "A Estrada de Ferro Noroeste do Brasil (EFNOB) chegou a Campo Grande em 14 de outubro de 1914, ligando Bauru (SP) a Corumbá. O impacto foi fulminante: a vila se tornou a maior cidade do Centro-Oeste em menos de uma geração. O complexo ferroviário — 135 edifícios em 22,3 hectares — foi tombado pelo IPHAN em 2009 como patrimônio cultural nacional.",
};

const imigrantes = [
    {
        povo: "Okinawanos",
        flag: "🇯🇵",
        quando: "A partir de 1908",
        legado: "A 3ª maior colônia japonesa do Brasil — e a mais okinawana. Trouxeram o sobá, o tereré japonês, os matsuri e uma culinária que hoje é o DNA gastronômico da cidade.",
        simbolo: "Sobá · Bon Odori · Festival do Japão MS",
        color: "from-red-700 to-rose-800",
        border: "border-red-500/30",
        accent: "text-red-300",
    },
    {
        povo: "Sírios e Libaneses",
        flag: "🇱🇧",
        quando: "A partir de 1894",
        legado: "Chegaram como mascates, tornaram-se comerciantes e industriais. Seu legado está nas ruas do centro histórico e na mesa campo-grandense: esfiha, quibe, kafta e o belewa.",
        simbolo: "Esfiha · Quibe · Comércio do Centro",
        color: "from-green-700 to-emerald-800",
        border: "border-green-500/30",
        accent: "text-green-300",
    },
    {
        povo: "Paraguaios",
        flag: "🇵🇾",
        quando: "Contínuo",
        legado: "80 mil paraguaios vivem em Campo Grande — a maior concentração fora do Paraguai. Trouxeram a língua, o guarani no cotidiano, a chipa, a sopa paraguaia e o tereré como hábito diário.",
        simbolo: "Chipa · Sopa Paraguaia · Tereré UNESCO",
        color: "from-blue-700 to-indigo-800",
        border: "border-blue-500/30",
        accent: "text-blue-300",
    },
    {
        povo: "Gaúchos e Nordestinos",
        flag: "🇧🇷",
        quando: "Séc. XX",
        legado: "Gaúchos trouxeram o chimarrão e a cultura campeira. Nordestinos trouxeram a religiosidade, as festas juninas e a culinária sertaneja. Todos se fundiram na identidade morena da cidade.",
        simbolo: "Churrasco · Arreio · Festas Juninas",
        color: "from-amber-700 to-orange-800",
        border: "border-amber-500/30",
        accent: "text-amber-300",
    },
];

const dishes = [
    {
        name: "Sobá",
        icon: Utensils,
        badge: "Patrimônio IPHAN",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "Macarrão artesanal cozido em caldo de ossobuco, com carne suína, omelete fatiada e cebolinha verde. Criado pelos okinawanos nos anos 1910 e tombado pelo IPHAN como patrimônio cultural imaterial do Brasil. Come-se na Feira Central, de quarta a domingo.",
    },
    {
        name: "Chipa",
        icon: Flame,
        badge: "Fronteira",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Pão paraguaio de polvilho e queijo, mais firme e saboroso que o pão de queijo mineiro. Encontrado em toda a cidade desde o amanhecer — padarias, esquinas, feiras e lanchonetes.",
    },
    {
        name: "Sopa Paraguaia",
        icon: Utensils,
        badge: "Fronteira",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Engana o nome: não é líquida. É um bolo salgado denso e úmido feito com farinha de milho, queijo meia-cura, cebola e ovos — acompanhamento obrigatório no churrasco sul-mato-grossense.",
    },
    {
        name: "Pacu Assado",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "O peixe-símbolo do Pantanal, assado inteiro na brasa com recheio de farofa de couve. Junto com o pintado e o dourado, é presença obrigatória nos almoços de domingo.",
    },
    {
        name: "Mojica de Pintado",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "Peixada pantaneira com pintado cozido em mandioca, tomate e cebola. O amido da mandioca engrossa o caldo naturalmente, criando um creme aveludado de sabor profundo.",
    },
    {
        name: "Tereré",
        icon: Leaf,
        badge: "UNESCO 2020",
        badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Erva-mate em água gelada, servida na guampa de chifre com bomba de metal. Reconhecido pela UNESCO em 2020 como Patrimônio Cultural Imaterial da Humanidade. Bebido diariamente em rodas nas praças, escritórios e calçadas.",
    },
    {
        name: "Arroz Carreteiro",
        icon: Flame,
        badge: "Pantaneiro",
        badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        desc: "Herança das comitivas pantaneiras: arroz com carne-de-sol em pedaços, às vezes com banana-da-terra frita. Sabor defumado e simplicidade que contam a história dos peões que cruzaram o Pantanal.",
    },
    {
        name: "Furrundu",
        icon: Star,
        badge: "Raridade",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "Doce único — caule de mamão cozido com rapadura e especiarias até virar compota escura e aromática. Raridade encontrada em feiras artesanais. Quem prova, nunca esquece.",
    },
];

const attractions = [
    {
        name: "BIOPARQUE Pantanal",
        icon: Fish,
        badge: "Recorde Mundial",
        badgeStyle: "bg-secondary-500/20 text-secondary-300 border-secondary-500/30",
        desc: "Maior aquário de água doce do mundo, inaugurado em 2022. Quase 5 milhões de litros, 220 espécies neotropicais, 100 reproduzidas em cativeiro — 29 inéditas no mundo. Entrada gratuita com agendamento.",
        detail: "Parque das Nações Indígenas · Ter–Sáb 8h30–17h30",
    },
    {
        name: "Parque das Nações Indígenas",
        icon: Trees,
        badge: "1,16 km²",
        badgeStyle: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "Um dos maiores parques urbanos do Brasil. 4 km de pista, lago, BIOPARQUE, Concha Acústica Helena Meirelles, Museu Dom Bosco e Museu de Arte Contemporânea.",
        detail: "Segunda a domingo · 6h–21h · Entrada gratuita",
    },
    {
        name: "Feira Central",
        icon: Utensils,
        badge: "Fundada 1925",
        badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Coração gastronômico e cultural da cidade. 28 restaurantes de sobá, chipa, sopa paraguaia, artesanato e cerveja artesanal na Antiga Estação Ferroviária. A estátua gigante da tigela é o ponto fotográfico mais amado.",
        detail: "Quarta–Domingo · a partir das 16h",
    },
    {
        name: "Complexo Ferroviário EFNOB",
        icon: Train,
        badge: "Patrimônio IPHAN",
        badgeStyle: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        desc: "135 edifícios históricos em 22,3 hectares — tombados pelo IPHAN em 2009. O Memorial da Ferrovia narra o salto de 1.800 para 50.000 habitantes que a ferrovia provocou em menos de uma geração.",
        detail: "Centro histórico · Visita livre",
    },
    {
        name: "Parque dos Poderes",
        icon: Trees,
        badge: "140 ha de Cerrado",
        badgeStyle: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Sede do governo estadual dentro de uma reserva ecológica de 140 hectares. Capivaras, quatis, araras, tucanos e tamanduás circulam livremente entre os palácios. Uma das experiências mais surreais do turismo urbano brasileiro.",
        detail: "Horário administrativo · Fauna mais ativa ao amanhecer",
    },
    {
        name: "Museu das Culturas Dom Bosco",
        icon: Camera,
        badge: "Desde 1951",
        badgeStyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "Acervo salesiano fundado em 1950 com peças raras de etnologia indígena: cerâmica Kadiwéu, adornos Bororo, artefatos Terena. Um dos museus indígenas mais importantes do Brasil.",
        detail: "Ter–Sex 8h–17h · Sáb e feriados 14h–18h",
    },
    {
        name: "Museu José Antônio Pereira",
        icon: Building2,
        badge: "1877",
        badgeStyle: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        desc: "A Fazenda Bálsamo restaurada — único exemplar de arquitetura colonial de 1877 preservado na cidade. Os utensílios da família fundadora, o monjolo e o carro de boi levam o visitante à Campo Grande de 1875.",
        detail: "Ter–Dom 9h–17h · Av. Guaicurus",
    },
    {
        name: "Monumento ao Imigrante",
        icon: Globe,
        badge: "1979",
        badgeStyle: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "Réplica em tamanho real de uma casa típica japonesa, na Praça da República. Inaugurada em 1979 para marcar os 70 anos da imigração okinawana — declaração pública de gratidão a quem fez a cidade.",
        detail: "Praça da República · Centro",
    },
];

const personalidades = [
    {
        nome: "José Antônio Pereira",
        anos: "1821–1899",
        papel: "Fundador",
        hist: "Tropeiro mineiro que chegou à confluência dos córregos Prosa e Segredo em 21 de junho de 1872 com 62 pessoas. Mandou construir a primeira igreja em 1877 e não chegou a ver a cidade se tornar capital — morreu no mesmo ano da emancipação.",
        emoji: "🏗️",
    },
    {
        nome: "Jânio Quadros",
        anos: "1917–1992",
        papel: "Presidente do Brasil",
        hist: "Nascido em Campo Grande em 25 de janeiro de 1917. Advogado, professor, prefeito de SP, governador e Presidente da República em 1961 — o que renunciou após 7 meses num gesto que ainda divide historiadores.",
        emoji: "🏛️",
    },
    {
        nome: "Almir Sater",
        anos: "Nasc. 1956",
        papel: "Músico · Viola Caipira",
        hist: "Nascido em Campo Grande em 14 de novembro de 1956. Autor de \"Tocando em Frente\" (com Renato Teixeira), uma das canções mais gravadas da MPB. Também ator na novela Pantanal (Globo, 1990).",
        emoji: "🎵",
    },
    {
        nome: "Tetê Espíndola",
        anos: "Nasc. Campo Grande",
        papel: "Cantora · MPB",
        hist: "Com o grupo Lírio Selvagem, revolucionou a MPB nos anos 1970 e 1980, misturando Cerrado, Pantanal e vanguarda numa voz inconfundível reconhecida em todo o Brasil.",
        emoji: "🎤",
    },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Memória e Mesa",
        morning: "Chegada. Visita ao Museu José Antônio Pereira (1877) e ao Complexo Ferroviário EFNOB. Café com chipa numa padaria local.",
        afternoon: "Avenida Afonso Pena e Museu das Culturas Dom Bosco. Passagem pelo Monumento ao Imigrante na Praça da República.",
        evening: "Feira Central a partir das 16h: sobá clássico, sopa paraguaia, chipa de forno e tereré. O ritual gastronômico mais campo-grandense que existe.",
        color: "from-amber-600 to-orange-700",
        icon: Utensils,
    },
    {
        day: "Dia 2",
        theme: "Natureza e Recordes",
        morning: "BIOPARQUE Pantanal (agendamento obrigatório). Reserve 2h com o guia especializado — os corredores submersos são uma das experiências mais impactantes do turismo brasileiro.",
        afternoon: "Caminhada no Parque das Nações Indígenas (4 km ao redor do lago). Garças, capivaras, araras e quatis em liberdade a metros do centro da capital.",
        evening: "Jantar em restaurante de culinária nipo-brasileira com ingredientes pantaneiros: sashimi de pintado, temaki de pacu defumado.",
        color: "from-teal-600 to-emerald-700",
        icon: Fish,
    },
    {
        day: "Dia 3",
        theme: "Fauna e Partida",
        morning: "Parque dos Poderes ao amanhecer (6h): tamanduás, araras e capivaras entre os palácios do governo. Uma das experiências mais surreais do Brasil urbano.",
        afternoon: "Mercadão Municipal: erva-mate, chipa embalada, doces de furrundu, artesanato indígena. Almoço com pacu assado ou mojica de pintado.",
        evening: "Partida rumo à próxima parada da Rota Bioceânica: Bonito (297 km) ou Porto Murtinho (439 km).",
        color: "from-blue-600 to-indigo-700",
        icon: Trees,
    },
];

const curiosities = [
    { emoji: "🌳", text: "Capital mais arborizada do Brasil — 91% das ruas com sombra. Tecnologia de monitoramento de árvores usada em tempo real." },
    { emoji: "🐟", text: "O BIOPARQUE tem o maior aquário de água doce do mundo — entrada gratuita. 29 reproduções de espécies foram inéditas no mundo." },
    { emoji: "🍜", text: "O sobá é o único prato de origem estrangeira adaptado tão completamente que virou patrimônio cultural imaterial do Brasil (IPHAN)." },
    { emoji: "🚂", text: "A ferrovia de 1914 multiplicou a população por 28 em menos de 10 anos: de 1.800 para 50.000 habitantes." },
    { emoji: "🇯🇵", text: "A comunidade japonesa de Campo Grande é okinawana — culturalmente distinta do Japão continental, com língua e culinária próprias." },
    { emoji: "🧉", text: "O tereré campo-grandense foi reconhecido pela UNESCO em 2020 como Patrimônio Cultural Imaterial da Humanidade." },
    { emoji: "🏛️", text: "Jânio Quadros — o presidente que renunciou após 7 meses — nasceu em Campo Grande em 25 de janeiro de 1917." },
    { emoji: "🇵🇾", text: "80 mil paraguaios vivem em Campo Grande — a maior concentração de paraguaios fora do próprio Paraguai." },
];

/* ─── helpers ────────────────────────────────────────────────── */
function SLabel({ children }) {
    return (
        <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-3">
            {children}
        </motion.span>
    );
}
function STitle({ children, light = false, className = "" }) {
    return (
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${light ? "text-white" : "text-primary-950"} ${className}`}>
            {children}
        </motion.h2>
    );
}

/* ─── infográfico lightbox ───────────────────────────────────── */
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
                            src="/infografico-campo-grande.png"
                            alt="Infográfico editorial Campo Grande"
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
                            src="/infografico-campo-grande.png"
                            alt="Infográfico editorial Campo Grande"
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
export default function CampoGrandePage() {
    const ferroviaRef = useRef(null);
    const ferroviaInView = useInView(ferroviaRef, { once: true, margin: "-80px" });

    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-primary-950">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-amber-900/40" />
                </div>

                {/* Solo vermelho glow */}
                <div className="absolute top-[20%] left-[20%] w-80 h-80 bg-red-700/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-[15%] right-[15%] w-72 h-72 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-secondary-400/40 via-secondary-500/15 to-transparent blur-3xl animate-pulse-slow" />
                    <div className="absolute inset-10 rounded-full bg-gradient-radial from-secondary-300/50 via-secondary-400/25 to-transparent blur-2xl" />
                    <div className="absolute inset-20 rounded-full bg-gradient-to-br from-secondary-200 via-secondary-400 to-orange-500 shadow-[0_0_80px_rgba(244,162,97,0.5)] animate-pulse-slow" />
                </div>

                {/* Cerrado SVG silhouette */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                    <svg viewBox="0 0 1440 280" className="w-full" preserveAspectRatio="none">
                        {/* Red soil glow */}
                        <ellipse cx="720" cy="280" rx="800" ry="60" fill="rgba(185,28,28,0.12)" />
                        {/* Background cerrado hills */}
                        <path d="M0,280 L0,200 Q120,150 240,180 Q360,110 480,160 Q600,120 720,150 Q840,110 960,155 Q1080,125 1200,165 Q1320,140 1440,175 L1440,280 Z"
                            fill="rgba(6,27,51,0.8)" />
                        {/* Cerrado trees silhouette */}
                        {[80,200,350,500,640,760,900,1040,1180,1320].map((x, i) => (
                            <g key={i} transform={`translate(${x}, ${160 + (i % 3) * 12})`}>
                                <rect x="-2" y="0" width="4" height="35" fill="rgba(11,46,79,0.95)" />
                                <ellipse cx="0" cy="-5" rx={12 + (i%3)*3} ry={18 + (i%2)*4} fill="rgba(11,46,79,0.97)" />
                            </g>
                        ))}
                        {/* Foreground ground */}
                        <path d="M0,280 L0,248 Q240,232 480,244 Q720,256 960,240 Q1200,228 1440,242 L1440,280 Z"
                            fill="rgba(11,46,79,1)" />
                        {/* Red soil strip */}
                        <path d="M0,280 L0,268 Q360,260 720,265 Q1080,270 1440,264 L1440,280 Z"
                            fill="rgba(153,27,27,0.25)" />
                    </svg>
                </div>

                <div className="relative z-10 container-custom pb-24 pt-32 w-full">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link to="/cidades" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm mb-8">
                            <ArrowLeft className="w-4 h-4" />
                            Cidades da Rota
                        </Link>
                    </motion.div>

                    <div className="max-w-3xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🇧🇷</span>
                            <span className="text-sm font-semibold text-secondary-400 uppercase tracking-widest">
                                Mato Grosso do Sul · Capital do Estado
                            </span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-[1.05] mb-4">
                            Campo
                            <br />
                            <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-red-400 bg-clip-text text-transparent">
                                Grande
                            </span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-display text-xl md:text-2xl text-white/60 italic mb-10">
                            A Capital Morena — Porta do Pantanal e Hub da Rota Bioceânica
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4">
                            {[
                                { icon: Users, val: "898 mil hab.", sub: "Censo 2022" },
                                { icon: Calendar, val: "1872", sub: "Fundação" },
                                { icon: Ruler, val: "8.082 km²", sub: "Território" },
                                { icon: MapPin, val: "439 km", sub: "de Porto Murtinho" },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
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

            {/* ── CAPITAL MORENA ───────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SLabel>Quem é Campo Grande</SLabel>
                        <STitle>
                            O solo que deu nome{" "}
                            <span className="text-gradient">a uma identidade</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-lg text-slate-500 leading-relaxed">
                            O latossolo avermelhado pelo óxido de ferro que cobre o território de Campo Grande não é apenas geologia — é identidade. Quando chove, as ruas ficam tingidas de ocre. Quando o calor resseca a terra, a poeira avermelhada flutua no ar.{" "}
                            <strong className="text-primary-700">O povo chamou de terra morena. A cidade se tornou a Capital Morena.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Train, title: "Hub da Rota Bioceânica", text: "A 439 km da ponte binacional sobre o Rio Paraguai (75% concluída em 2026), Campo Grande é o maior centro urbano do corredor bioceânico no lado brasileiro — com rodovias BR-060, BR-163 e BR-262 convergindo na cidade.", color: "from-blue-50 to-indigo-50", acc: "text-blue-700", ib: "bg-blue-100" },
                            { icon: Globe, title: "Porta do Pantanal", text: "Miranda está a 207 km, Bonito a 297 km, o coração do Pantanal Sul a menos de 3h de carro. Campo Grande é o ponto de partida de todos os grandes roteiros ecológicos da maior planície alagável do mundo, Patrimônio Mundial da UNESCO.", color: "from-teal-50 to-emerald-50", acc: "text-teal-700", ib: "bg-teal-100" },
                            { icon: Users, title: "A Cidade dos Encontros", text: "Japoneses okinawanos, sírio-libaneses, paraguaios, gaúchos, nordestinos e pantaneiros formaram, ao longo de 150 anos, a identidade mais plural do Centro-Oeste. O resultado está na mesa, nas festas e no sotaque.", color: "from-amber-50 to-orange-50", acc: "text-amber-700", ib: "bg-amber-100" },
                        ].map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${p.color}`}>
                                <div className={`w-12 h-12 rounded-2xl ${p.ib} flex items-center justify-center mb-5`}>
                                    <p.icon className={`w-6 h-6 ${p.acc}`} />
                                </div>
                                <h3 className={`font-display text-xl font-bold ${p.acc} mb-3`}>{p.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FERROVIA ─────────────────────────────────────── */}
            <section ref={ferroviaRef} className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SLabel>14 de outubro de 1914</SLabel>
                            <STitle light>
                                A ferrovia que{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    multiplicou a cidade
                                </span>
                            </STitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8">
                                {ferrovia.detalhe}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="flex items-center gap-3 text-sm text-secondary-400/70">
                                <Train className="w-4 h-4" />
                                <span>Complexo tombado pelo IPHAN em 2009 como Patrimônio Cultural Nacional</span>
                            </motion.div>
                        </div>

                        {/* Contador dramático */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Antes da ferrovia", val: "1.800", sub: "habitantes", color: "from-slate-700 to-slate-800", icon: Users },
                                { label: "Menos de 10 anos", val: "→", sub: ferrovia.ano, color: "from-secondary-600 to-orange-700", icon: Train },
                                { label: "Depois da ferrovia", val: "50.000", sub: "habitantes", color: "from-teal-700 to-emerald-800", icon: Users },
                            ].map((c, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={ferroviaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{ delay: 0.15 * i, duration: 0.6 }}
                                    className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 text-center`}>
                                    <c.icon className="w-5 h-5 text-white/60 mx-auto mb-3" />
                                    <div className="font-display text-2xl md:text-3xl font-bold text-white">{c.val}</div>
                                    <div className="text-white/50 text-xs mt-1">{c.sub}</div>
                                    <div className="text-white/30 text-[10px] mt-2 uppercase tracking-wide">{c.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── IMIGRANTES ───────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>150 anos de encontros</SLabel>
                        <STitle>
                            Os povos que{" "}
                            <span className="text-gradient">fizeram a cidade</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            Campo Grande é, por definição, uma cidade de encontros. Sua identidade cultural é uma síntese improvável — e riquíssima — de povos, línguas, religiões e culinárias que chegaram em ondas sucessivas ao longo de 150 anos.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {imigrantes.map((im, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.5 }}
                                className={`rounded-3xl border ${im.border} bg-primary-950 overflow-hidden`}>
                                <div className={`h-2 bg-gradient-to-r ${im.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl">{im.flag}</span>
                                                <h3 className="font-display text-xl font-bold text-white">{im.povo}</h3>
                                            </div>
                                            <span className={`text-xs font-semibold ${im.accent} uppercase tracking-wider`}>{im.quando}</span>
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{im.legado}</p>
                                    <div className={`text-xs font-medium ${im.accent} flex items-center gap-2`}>
                                        <Star className="w-3 h-3" />
                                        {im.simbolo}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOBÁ — DESTAQUE EDITORIAL ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-700/8 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SLabel>Patrimônio Cultural Imaterial do Brasil · IPHAN</SLabel>
                            <STitle light>
                                O Sobá:{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    alma da cidade em uma tigela
                                </span>
                            </STitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="space-y-4 text-white/60 text-sm leading-relaxed">
                                <p>
                                    Os primeiros okinawanos que chegaram a Campo Grande nos anos 1910 preparavam o sobá para consumo próprio — tinham <strong className="text-white/80">vergonha de comer o prato em público</strong>, temendo o estranhamento dos vizinhos. Durante anos, o macarrão ficou restrito às cozinhas da comunidade.
                                </p>
                                <p>
                                    O divisor de águas foi <strong className="text-white/80">Hiroshi Katsuren</strong>, o pioneiro que levou o sobá para a Feira Central. Quando os campo-grandenses provaram, o resultado foi imediato. O caldo foi adaptado com ossobuco, a carne suína chegou, a omelete fatiada entrou como guarnição. O sobá se tornou campo-grandense.
                                </p>
                                <p className="text-secondary-400 font-medium italic">
                                    Em 2006, o Decreto Municipal nº 9.685 declarou o sobá de Campo Grande Bem Cultural de Natureza Imaterial. O IPHAN o reconheceu como patrimônio cultural imaterial do Brasil — o único prato de origem estrangeira a receber esse status no país.
                                </p>
                            </motion.div>
                        </div>

                        {/* O que é */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-secondary-500/20 flex items-center justify-center">
                                    <Utensils className="w-5 h-5 text-secondary-400" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-white">O que é o Sobá Campo-Grandense</div>
                                    <div className="text-white/40 text-xs">Decreto Municipal 9.685 / 2006 · IPHAN</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { item: "Macarrão", desc: "Artesanal, espesso e firme — diferente do soba japonês continental (de trigo sarraceno)" },
                                    { item: "Caldo", desc: "Rico, feito a base de ossobuco bovino, cozido lentamente até apurar sabor e corpo" },
                                    { item: "Proteína", desc: "Carne suína e bovina em pedaços, às vezes carne seca desfiada" },
                                    { item: "Guarnição", desc: "Omelete cortada em fios finos, cebolinha verde picada generosamente" },
                                    { item: "Onde comer", desc: "Feira Central — 28 restaurantes especializados, de quarta a domingo a partir das 16h" },
                                ].map((r, i) => (
                                    <div key={i} className="flex gap-3 py-3 border-b border-white/5 last:border-0">
                                        <div className="w-24 flex-shrink-0 font-semibold text-secondary-400 text-xs uppercase tracking-wide mt-0.5">{r.item}</div>
                                        <div className="text-white/50 text-xs leading-relaxed">{r.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA COMPLETA ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>Uma mesa que é um atlas</SLabel>
                        <STitle>
                            Sabores de{" "}
                            <span className="text-gradient">quatro continentes</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            Nenhuma outra cidade do Centro-Oeste concentra em sua mesa uma fusão tão honesta de tantas cozinhas. O resultado não é confusão — é identidade.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {dishes.map((d, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i, duration: 0.5 }}
                                className="card-hover p-6 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <d.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${d.badgeColor}`}>{d.badge}</span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-base mb-2">{d.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BIOPARQUE DESTAQUE ───────────────────────────── */}
            <section className="section-padding bg-teal-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SLabel>Inaugurado em março de 2022 · Entrada Gratuita</SLabel>
                            <STitle light>
                                O maior aquário de{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    água doce do mundo
                                </span>
                            </STitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8">
                                Fica em Campo Grande — e a entrada é gratuita. O BIOPARQUE Pantanal superou 1 milhão de visitantes desde a inauguração e registrou recorde de visitantes internacionais em julho de 2025. Mais do que aquário, é o maior banco genético vivo de água doce do mundo.
                            </motion.p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { num: "~5 milhões", sub: "litros de água" },
                                    { num: "220", sub: "espécies neotropicais" },
                                    { num: "100", sub: "espécies reproduzidas" },
                                    { num: "29", sub: "reproduções inéditas no mundo" },
                                ].map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}
                                        className="rounded-2xl bg-teal-900/40 border border-teal-500/20 p-5 text-center">
                                        <div className="font-display font-bold text-teal-300 text-xl">{s.num}</div>
                                        <div className="text-white/40 text-xs mt-1">{s.sub}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-teal-500/20 p-8">
                            <Fish className="w-8 h-8 text-teal-400 mb-5" />
                            <h3 className="font-display text-xl font-bold text-white mb-4">O que ver no BIOPARQUE</h3>
                            <div className="space-y-3">
                                {[
                                    { t: "Corredor submerso", d: "Observe peixes do Pantanal em escala real — uma das experiências mais impactantes do Brasil" },
                                    { t: "151 espécies do Pantanal", d: "Além de 55 da Amazônia e espécies da África, Oceania, Ásia e América Central" },
                                    { t: "Fauna aquática", d: "Jacarés-de-papo-amarelo, tartarugas, lontras e mamíferos semi-aquáticos" },
                                    { t: "Guia especializado gratuito", d: "Tours de 1h30 incluídos na entrada — revelam os projetos de reprodução de espécies ameaçadas" },
                                    { t: "Agendamento obrigatório", d: "agendamentobioparquepantanal.ms.gov.br — terça a sábado, 8h30–17h30" },
                                ].map((r, i) => (
                                    <div key={i} className="flex gap-3 py-2.5 border-b border-teal-500/10 last:border-0">
                                        <ChevronRight className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-teal-300 font-semibold text-sm">{r.t}</div>
                                            <div className="text-white/40 text-xs mt-0.5">{r.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>O que ver e fazer</SLabel>
                        <STitle>Pontos que <span className="text-gradient">explicam a cidade</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((a, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <a.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${a.badgeStyle}`}>{a.badge}</span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-sm mb-2">{a.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed mb-3">{a.desc}</p>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{a.detail}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PERSONALIDADES ───────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary-500/6 rounded-full blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>Quem faz Campo Grande acontecer</SLabel>
                        <STitle light>
                            Personagens que{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                ficaram na história
                            </span>
                        </STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {personalidades.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 flex gap-5 hover:bg-white/[0.07] transition-colors">
                                <div className="text-4xl flex-shrink-0">{p.emoji}</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-display font-bold text-white text-lg">{p.nome}</h3>
                                    </div>
                                    <div className="text-secondary-400 text-xs font-semibold uppercase tracking-wide mb-3">
                                        {p.anos} · {p.papel}
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed">{p.hist}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>Roteiro Sugerido</SLabel>
                        <STitle>3 dias <span className="text-gradient">inesquecíveis</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                                    {[{ time: "Manhã", text: day.morning }, { time: "Tarde", text: day.afternoon }, { time: "Noite", text: day.evening }].map((s, si) => (
                                        <div key={si} className="flex gap-3">
                                            <Clock className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-primary-500/80 text-xs font-semibold uppercase tracking-wide">{s.time}</span>
                                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{s.text}</p>
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
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SLabel>Você sabia?</SLabel>
                        <STitle light>Fatos que <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">surpreendem</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl bg-white/[0.05] border border-white/8 p-5 hover:bg-white/[0.08] transition-colors">
                                <div className="text-3xl mb-3">{c.emoji}</div>
                                <p className="text-white/60 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SLabel>Planeje sua visita</SLabel>
                        <STitle>Informações <span className="text-gradient">práticas</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Plane className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Como Chegar</h3>
                            <div className="space-y-2.5 text-slate-500 text-sm leading-relaxed">
                                <p><strong className="text-primary-700">Aéreo:</strong> Aeroporto Internacional de Campo Grande (CGR) — voos diretos por Latam, Gol e Azul. 8 km do centro.</p>
                                <p><strong className="text-primary-700">De São Paulo:</strong> 1.014 km via BR-060 (±12h)</p>
                                <p><strong className="text-primary-700">Rota Bioceânica:</strong> 439 km até Porto Murtinho / fronteira com Paraguai via BR-267</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Calendar className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Melhor Época</h3>
                            <div className="space-y-2.5">
                                {[
                                    { p: "Abr → Set", d: "Seco e fresco — melhor época para passeios e natureza", c: "bg-teal-50 border-teal-200 text-teal-700" },
                                    { p: "Jul (inverno)", d: "Festas culturais, clima ideal, alta temporada do Pantanal", c: "bg-blue-50 border-blue-200 text-blue-700" },
                                    { p: "Dez → Mar", d: "Chuvas tropicais intensas — evitar para Pantanal e Bonito", c: "bg-amber-50 border-amber-200 text-amber-700" },
                                ].map((ep, i) => (
                                    <div key={i} className={`p-3 rounded-xl border text-xs ${ep.c}`}>
                                        <span className="font-bold">{ep.p}</span> — {ep.d}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Phone className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Contatos Úteis</h3>
                            <div className="space-y-3">
                                {[
                                    { l: "SECTUR Campo Grande", v: "(67) 4042-1313" },
                                    { l: "BIOPARQUE (agend.)", v: "agendamentobioparquepantanal.ms.gov.br" },
                                    { l: "Museu José A. Pereira", v: "(67) 4042-1313 r.4323" },
                                    { l: "Fundação de Turismo MS", v: "turismo.ms.gov.br" },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-secondary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-slate-400 text-xs">{c.l}: </span>
                                            <span className="text-primary-700 text-xs font-medium">{c.v}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-red-700 via-amber-600 to-secondary-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Rota Bioceânica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Campo Grande — onde o solo vermelho conta uma história de 150 anos de encontros.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            A próxima parada da Rota Bioceânica é Porto Murtinho — a 439 km, à beira do Rio Paraguai.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/cidades/porto-murtinho"
                                className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group">
                                Porto Murtinho →
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/cidades"
                                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:border-white/70 transition-colors">
                                Ver todas as cidades
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
