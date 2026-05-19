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
    Wine, Heart,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "1582",
        icon: Compass,
        title: "Fundação Espanhola no Coração dos Andes",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "Fundada em 1582 pelos colonizadores espanhóis, Salta nasceu como ponto estratégico nas rotas comerciais entre o Atlântico e o Pacífico. Sua posição privilegiada entre os Andes, o Altiplano e as regiões indígenas a tornou durante séculos o coração do norte argentino — conectando Argentina, Bolívia, Peru e Chile.",
        symbol: "Centro Histórico Colonial de Salta",
    },
    {
        era: "Século XVII–XVIII",
        icon: Globe,
        title: "Rota Colonial e Comércio Andino",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Salta cresceu como nó vital das rotas coloniais espanholas, movimentando ouro, prata e produtos entre o Pacífico e o Rio da Prata. As igrejas, casarões e a Catedral Basílica erguidos nesse período definem até hoje a silhueta histórica da cidade — arquitetura que o tempo não apagou.",
        symbol: "Catedral Basílica e Cabildo Histórico",
    },
    {
        era: "Independência",
        icon: Star,
        title: "O Norte na Luta pela Independência",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "O norte argentino foi palco decisivo das guerras de independência. Salta e sua região viram batalhas, heróis e uma identidade forjada na resistência. O Cabildo histórico preserva essa memória — espaço onde decisões que moldaram a Argentina foram tomadas.",
        symbol: "Cabildo Histórico — Memória da Independência",
    },
    {
        era: "Hoje",
        icon: Music,
        title: "Capital Cultural do Folclore Argentino",
        color: "from-rose-600 to-pink-700",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "Hoje, Salta é reconhecida como a capital cultural do folclore argentino. Suas peñas tocam zamba e chacarera ao vivo todas as noites, o Tren a las Nubes atravessa os Andes em uma das experiências ferroviárias mais impressionantes do mundo, e a gastronomia salteña é considerada patrimônio do norte argentino.",
        symbol: "Peñas Folclóricas — Música Viva",
    },
];

const attractions = [
    { name: "Iglesia San Francisco", icon: Mountain, desc: "A torre monumental que domina o centro histórico e se tornou o símbolo visual mais reconhecível de Salta. Arquitetura colonial em sua forma mais impactante.", badge: "Patrimônio" },
    { name: "Catedral Basílica", icon: Star, desc: "Com sua fachada rosada e detalhes coloniais, representa a identidade histórica de Salta. Um dos cartões-postais mais fotogênicos da Argentina.", badge: "História" },
    { name: "Tren a las Nubes", icon: Compass, desc: "Uma das experiências ferroviárias mais impressionantes do planeta. A ferrovia sobe os Andes por montanhas, vales e pontes vertiginosas até altitudes extremas.", badge: "Aventura" },
    { name: "Peñas Folclóricas", icon: Music, desc: "À noite, as peñas de Salta ganham vida com zamba, chacarera e carnavalito ao vivo. Música que não é espetáculo turístico — é identidade cultural viva.", badge: "Cultura" },
    { name: "Valles Calchaquíes", icon: Mountain, desc: "Vales andinos de rara beleza com vinhedos de altitude, pueblos históricos e paisagens que parecem pintadas à mão. Cenário cinematográfico do norte argentino.", badge: "Natureza" },
    { name: "Salinas Grandes", icon: Waves, desc: "Um dos maiores salares da Argentina — superfície branca infinita que contrasta com o azul profundo do céu andino. Uma das imagens mais surreais do continente.", badge: "Paisagem" },
    { name: "Cabildo Histórico", icon: Globe, desc: "Símbolo da independência argentina, hoje convertido em museu e espaço cultural que preserva a memória política e histórica do norte argentino.", badge: "Museu" },
    { name: "Quebrada de San Lorenzo", icon: Camera, desc: "Cânion de vegetação exuberante a poucos quilômetros do centro. Trilhas, aves e a natureza andina acessível sem sair da região de Salta.", badge: "Natureza" },
];

const dishes = [
    { name: "Empanadas Salteñas", icon: Flame, desc: "Consideradas por muitos as melhores da Argentina. Massa delicada, recheio suculento de carne cortada na faca com temperos regionais. Símbolo absoluto da cidade.", tag: "Ícone" },
    { name: "Locro", icon: Utensils, desc: "Prato da tradição indígena e espanhola preparado em festas populares. Milho, feijão, carnes e especiarias em um cozido denso que aquece corpo e alma.", tag: "Tradição" },
    { name: "Torrontés", icon: Wine, desc: "O vinho de identidade argentina, produzido nos vinhedos de altitude dos Valles Calchaquíes. Aromas florais intensos e frescor único gerado pelo clima andino.", tag: "Altitude" },
    { name: "Tamales", icon: Leaf, desc: "Massa de milho com recheio de carne, enrolada e cozida no vapor em folha de milho. Herança indígena direta que permanece viva na culinária de Salta.", tag: "Ancestral" },
    { name: "Humita", icon: Utensils, desc: "Preparação de origem andina com milho fresco temperado, assado ou cozido. Prato simples que carrega séculos de história das culturas pré-colombianas.", tag: "Andino" },
    { name: "Vinhos de Altitude", icon: Wine, desc: "Os vinhedos mais altos do mundo produzem aqui taninos marcantes e aromas únicos. Uma experiência de degustação que só os Andes conseguem criar.", tag: "Premium" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "História e Arquitetura",
        morning: "Centro histórico colonial: Catedral Basílica, Cabildo Histórico e Praça 9 de Julho. Salta parece viver em outro ritmo — mais humano, mais artístico, mais histórico.",
        afternoon: "Iglesia San Francisco e casarões coloniais. Museus da independência argentina e a memória do norte. Tarde de fotografia pelas ruas que o tempo preservou.",
        evening: "Primeira noite numa peña folclórica — zamba e chacarera ao vivo com empanadas salteñas. A música não é show: é o som da identidade de Salta.",
        color: "from-orange-600 to-red-700",
        icon: Globe,
    },
    {
        day: "Dia 2",
        theme: "Andes e Paisagens",
        morning: "Tren a las Nubes — a ferrovia que sobe os Andes por pontes vertiginosas e paisagens cinematográficas. Uma das experiências mais impressionantes da América do Sul.",
        afternoon: "Quebrada de San Lorenzo: cânion de vegetação exuberante, trilhas e aves andinas. Natureza poderosa a poucos minutos do centro histórico.",
        evening: "Pôr do sol com o céu dourado sobre as fachadas coloniais. O aroma de comida nas ruas, as guitarras que começam a tocar — Salta emociona pela atmosfera.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Dia 3",
        theme: "Vinhos e Cultura",
        morning: "Valles Calchaquíes: vinhedos de altitude, pueblos históricos e paisagens dos Andes que parecem pintadas. Degustação de Torrontés e vinhos de altitude únicos.",
        afternoon: "Salinas Grandes — superfície branca infinita sob o azul profundo do céu andino. Um dos cenários mais surreais da América do Sul e das melhores fotos do continente.",
        evening: "Artesanato nos mercados de Salta: ponchos, tecidos andinos, prata e cerâmica. Despedida com locro e música — Salta fica como memória emocional permanente.",
        color: "from-rose-600 to-pink-700",
        icon: Wine,
    },
];

const curiosities = [
    { text: "Salta foi fundada em 1582 — tem mais de 440 anos de história colonial, tornando-a uma das cidades mais antigas e preservadas da Argentina." },
    { text: "O apelido 'Salta La Linda' (Salta, a Bela) não é marketing — é reconhecimento histórico de viajantes que a chamaram assim desde o século XIX." },
    { text: "O Tren a las Nubes sobe até 4.220 metros de altitude, atravessa 29 pontes e 21 túneis — considerado um dos percursos ferroviários mais espetaculares do mundo." },
    { text: "Os vinhedos dos Valles Calchaquíes estão entre os mais altos do mundo, chegando a 3.000 metros de altitude. A altitude cria vinhos com aromas únicos impossíveis de replicar em outras latitudes." },
    { text: "As peñas folclóricas de Salta são frequentadas por moradores locais — não são shows para turistas. Ali, a zamba e a chacarera são cantadas e dançadas como forma de identidade cultural." },
    { text: "A Pachamama (Mãe Terra) ainda é reverenciada em muitas comunidades do norte argentino. Em agosto, rituais de oferenda à terra são realizados com alimentos e bebidas." },
    { text: "A Iglesia San Francisco de Salta tem uma das torres mais altas do norte argentino — visível de praticamente qualquer ponto do centro histórico." },
    { text: "Salta é ponto de partida para a Quebrada de Humahuaca (Patrimônio UNESCO), os Salares e o Paso de Jama — um dos cruzamentos andinos mais impressionantes para o Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("salta");
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
                            alt="Infográfico editorial Salta"
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
                            alt="Infográfico editorial Salta"
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

export default function SaltaPage() {
    return (
        <div className="min-h-screen">

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Provincia de Salta"
                name={{ first: "Salta", second: "La Linda" }}
                tagline="A alma folclorica dos Andes argentinos — colonial, vibrante e portao para as nuvens."
                scene="andes"
                image="/cities/salta.png"
                accentColor="#f97316"
                stats={[
                    { label: "Habitantes", value: 620000 },
                    { label: "Fundacao Colonial", value: 1582 },
                    { label: "Altitude (m)", value: 1187, suffix: " m" },
                    { label: "Km de Buenos Aires", value: 1580, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Salta</SectionLabel>
                        <SectionTitle>
                            Onde a música encontra{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                as montanhas
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Salta não se visita com os olhos — ela é sentida. Na zamba que ecoa das peñas, no aroma
                            das empanadas recém-assadas, nas fachadas coloniais banhadas pelo sol dourado dos Andes.
                            Com 440 anos de história preservada,{" "}
                            <strong className="text-primary-700">é o capítulo mais cultural e emocionante
                            da travessia bioceânica</strong> — onde a rota deixa de ser logística e se torna
                            experiência humana profunda.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Music,
                                title: "Capital do Folclore",
                                text: "Zamba, chacarera e carnavalito tocados ao vivo todas as noites nas peñas. Em Salta, o folclore não é show turístico — é identidade cultural que pulsa desde 1582.",
                                color: "from-orange-50 to-red-50",
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Mountain,
                                title: "Portal Andino",
                                text: "Tren a las Nubes, Valles Calchaquíes, Salinas Grandes e a Quebrada de Humahuaca (UNESCO). Os Andes começam aqui — e são cinematográficos em cada curva.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wine,
                                title: "Gastronomia e Vinho",
                                text: "Empanadas salteñas consideradas as melhores da Argentina. Vinhos Torrontés dos vinhedos mais altos do mundo. Locro e tamales — herança viva das culturas andinas.",
                                color: "from-rose-50 to-pink-50",
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>440 Anos de História Viva</SectionLabel>
                        <SectionTitle light>
                            De colônia espanhola à{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                alma cultural dos Andes
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Salta foi construída em camadas de história colonial, independência e identidade cultural.
                            Cada período deixou marcas visíveis — em pedra, em música e na alma do povo nortenho.
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

            {/* ── TREN A LAS NUBES SPOTLIGHT ───────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-orange-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(6,27,51,0.95) 60%, rgba(220,38,38,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                                        Experiência Única
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Tren a las Nubes
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        A ferrovia que abraça os Andes
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Uma das experiências ferroviárias mais impressionantes do planeta. O trem parte de
                                    Salta e sobe os Andes atravessando 29 pontes, 21 túneis e viadutos vertiginosos
                                    até alcançar 4.220 metros de altitude — com paisagens que nenhuma outra estrada
                                    do continente consegue oferecer.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Altitude máxima", val: "4.220 m", sub: "Acima do nível do mar" },
                                        { label: "Pontes", val: "29", sub: "Sobre vales e cânions" },
                                        { label: "Túneis", val: "21", sub: "Dentro dos Andes" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-orange-500/10">
                                            <div className="text-2xl font-bold text-orange-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA E FOLCLORE ───────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Identidade Viva</SectionLabel>
                        <SectionTitle light>
                            Folclore,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Pachamama e tradição
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Music,
                                title: "Peñas Folclóricas",
                                text: "Zamba, chacarera, carnavalito e baguala ao vivo todas as noites. As peñas são frequentadas por moradores — não por turistas. Identidade cultural pura.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "A espiritualidade andina permanece viva. Em agosto, rituais de oferenda à Mãe Terra são celebrados em comunidades do norte argentino.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Herança Indígena",
                                text: "Povos quéchua e aymara moldaram a língua, os costumes e a cosmovisão do norte argentino. Mercados, artesanato e música carregam essa herança viva.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Artesanato Andino",
                                text: "Ponchos, tecidos, cerâmica, prata e arte indígena nos mercados de Salta. Cada peça carrega memória cultural ancestral transmitida por gerações.",
                                accent: "text-rose-400",
                                iconBg: "bg-rose-500/15",
                                border: "border-rose-500/20",
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
                        <SectionLabel>Sabores do Norte Argentino</SectionLabel>
                        <SectionTitle>
                            Gastronomia de{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                alma andina
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
                                    <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Salta
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-orange-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                Salta La Linda
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Salta
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
                                <div className="w-7 h-7 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-orange-400" />
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
                                    "Aeroporto Internacional de Salta — voos diretos de Buenos Aires, Córdoba e outras capitais",
                                    "Ônibus desde Buenos Aires (~22h) ou Córdoba (~12h) pela rodoviária central",
                                    "Acesso pela Ruta Nacional 9 e 34 — conexão com a Rota Bioceânica",
                                ],
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Abril a outubro: primavera e outono andino, clima ideal para passeios",
                                    "Julho: Carnaval do Norte e festas folclóricas mais intensas",
                                    "Evitar dezembro–fevereiro: chuvas da estação úmida andina",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Moeda: Peso argentino — câmbio favorável para viajantes com dólar/real",
                                    "Altitude: 1.152 m — aclimatação recomendada antes do Tren a las Nubes (4.220 m)",
                                    "Idioma: espanhol — sotaque nortenho com palavras quéchua",
                                ],
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
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
                    style={{ background: "linear-gradient(135deg, #431407 0%, #7c2d12 35%, #9a3412 65%, #b45309 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/15 rounded-full blur-[90px]" />
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
                            Salta La Linda espera por você
                        </h2>
                        <p className="text-orange-200/70 text-lg max-w-xl mx-auto mb-10">
                            A alma folclórica dos Andes argentinos. Onde a música, a montanha e a história
                            colonial se encontram no capítulo mais emocionante da travessia bioceânica.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-800 font-bold rounded-2xl hover:bg-orange-50 transition-colors text-sm"
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
