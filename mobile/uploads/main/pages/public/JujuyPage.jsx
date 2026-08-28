import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Heart, Sparkles,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "10.000 a.C.",
        icon: Compass,
        title: "Rota Milenar dos Andes",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "Antes dos Incas, antes dos espanhóis — a Quebrada de Humahuaca já era rota humana. Por milênios, caravanas de lhamas atravessaram esses vales levando lã, cerâmica, milho e metal entre os Andes e as planícies. O corredor que hoje chamamos de Rota Bioceânica tem raízes de 10.000 anos neste território.",
        symbol: "Qhapaq Ñan — Caminho Principal Andino",
    },
    {
        era: "Século XV–XVI",
        icon: Globe,
        title: "O Inca e a Conquista Espanhola",
        color: "from-rose-700 to-red-800",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "O Império Inca integrou a Quebrada ao Qhapaq Ñan — sua rede de caminhos que conectava o continente. Em 1593, os espanhóis fundaram San Salvador de Jujuy como nó estratégico entre Lima e Buenos Aires. A cidade colonial cresceu sobre caminhos indígenas milenares, misturando dois mundos em uma única paisagem.",
        symbol: "Fundação de San Salvador de Jujuy — 1593",
    },
    {
        era: "1812 — Êxodo Jujeño",
        icon: Flame,
        title: "O Sacrifício que Salvou a Independência",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Em agosto de 1812, o General San Martín pediu ao povo de Jujuy o ato mais difícil: abandonar casas, colheitas e animais — e incendiar tudo — para negar recursos ao exército realista. O Êxodo Jujeño é considerado um dos gestos mais heroicos da independência argentina. Jujuy se sacrificou para que a Argentina nascesse.",
        symbol: "Êxodo Jujeño — Memória da Independência",
    },
    {
        era: "2003 — UNESCO",
        icon: Star,
        title: "Patrimônio da Humanidade",
        color: "from-purple-700 to-violet-800",
        accent: "text-purple-400",
        border: "border-purple-500/30",
        body: "Em 2003, a UNESCO reconheceu a Quebrada de Humahuaca como Patrimônio da Humanidade — Paisagem Cultural e Itinerário Cultural. O reconhecimento não foi apenas turístico: foi o mundo inteiro dizendo que esses vales, essa cultura e essa espiritualidade andina pertencem à memória coletiva da humanidade.",
        symbol: "UNESCO World Heritage — Quebrada de Humahuaca 2003",
    },
];

const attractions = [
    { name: "Cerro de los Siete Colores", icon: Mountain, desc: "A montanha mais fotogênida da Argentina. Em Purmamarca, as 7 camadas geológicas criam uma paleta natural que muda de cor com a luz — dourada no amanhecer, violeta ao entardecer.", badge: "Ícone" },
    { name: "Pucará de Tilcara", icon: Compass, desc: "Fortaleza pré-incaica a 2.450m de altitude, com visão estratégica sobre a Quebrada. 900 anos de ocupação humana visíveis em pedra — o maior sítio arqueológico do noroeste argentino.", badge: "Arqueologia" },
    { name: "Quebrada de Humahuaca", icon: Waves, desc: "155 km de cânion andino reconhecido pela UNESCO. Estratos coloridos, vilarejos históricos, cactus gigantes e um silêncio que transforma qualquer viagem numa experiência espiritual.", badge: "UNESCO" },
    { name: "Salinas Grandes", icon: Star, desc: "A 3.400m de altitude, uma das maiores superfícies de sal da América do Sul. Branco infinito sob o azul impossível do céu andino — uma das imagens mais surreais do continente.", badge: "Paisagem" },
    { name: "Purmamarca", icon: Camera, desc: "Vila andina aos pés do Cerro de los Siete Colores. Igreja colonial, mercado artesanal e silêncio que parece sagrado. Um dos vilarejos mais fotogênicos da Argentina.", badge: "Vila" },
    { name: "Humahuaca", icon: Globe, desc: "Cidade histórica que preserva identidade indígena e colonial. O Monumento à Independência e a Igreja da Candelária contam séculos de história em pedra e espiritualidade andina.", badge: "História" },
    { name: "Tilcara", icon: Heart, desc: "Centro cultural e arqueológico dos Andes argentinos. Museu, jardim botânico de altitude, mercado artesanal e a porta de entrada para o Pucará histórico.", badge: "Cultura" },
    { name: "Carnaval Andino", icon: Music, desc: "O carnaval mais colorido do noroeste argentino. A diablada — dança aimará que mistura cosmogonia indígena e herança colonial — toma as ruas com cores, música e espiritualidade.", badge: "Festa" },
];

const dishes = [
    { name: "Humita", icon: Leaf, desc: "Preparação de origem andina com milho fresco temperado, assada em folha. Prato simples que carrega séculos de memória das culturas pré-colombianas dos Andes.", tag: "Ancestral" },
    { name: "Tamales Jujeños", icon: Utensils, desc: "Massa de milho com recheio de carne e temperos andinos, enrolada em folha e cozida no vapor. Receita que o Inca reconheceria — sobreviveu 500 anos inalterada.", tag: "Tradição" },
    { name: "Locro Nortenho", icon: Flame, desc: "Ensopado espesso de milho, feijão e carnes — prato da tradição andina e espanhola servido em celebrações. Em Jujuy, o locro é cozinhado nas festas com paciência e afeto.", tag: "Festividade" },
    { name: "Empanadas Jujeñas", icon: Utensils, desc: "A versão regional das empanadas argentinas — com recheio mais condimentado e toque de pimentão. Assadas em forno de barro, têm sabor de altitude e tradição.", tag: "Regional" },
    { name: "Chicha", icon: Waves, desc: "Bebida de milho fermentado consumida em rituais há mais de 3.000 anos nos Andes. Em Jujuy, a chicha ainda é preparada artesanalmente para celebrações comunitárias.", tag: "Ritual" },
    { name: "Quínoa Andina", icon: Leaf, desc: "O grão sagrado dos Incas cultivado no altiplano jujeño a mais de 3.500m de altitude. Rico em proteínas, resistente ao frio extremo — alimento que sustentou civilizações andinas.", tag: "Altiplano" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Quebrada e Purmamarca",
        morning: "Chegada a San Salvador de Jujuy. Centro histórico colonial — Catedral, Cabildo e mercado indígena. A cidade já respira outra temporalidade, mais andina, mais silenciosa.",
        afternoon: "Purmamarca — a vila aos pés do Cerro de los Siete Colores. Mercado artesanal de ponchos, cerâmica e prata. Caminhada ao redor do cerro ao entardecer quando as cores explodem.",
        evening: "Pôr do sol sobre as montanhas coloridas de Purmamarca. O céu fica dourado, depois violeta, depois estrelado. Jujuy emociona antes do jantar chegar.",
        color: "from-rose-600 to-red-700",
        icon: Mountain,
    },
    {
        day: "Dia 2",
        theme: "Tilcara e Humahuaca",
        morning: "Pucará de Tilcara ao amanhecer — fortaleza pré-incaica com visão estratégica de 900 anos sobre a Quebrada. A pedra fala. O silêncio também.",
        afternoon: "Tilcara: Museu Arqueológico, jardim botânico de altitude com cactus gigantes, mercado de artesanato quéchua. Seguir para Humahuaca pela Quebrada colorida.",
        evening: "Humahuaca histórica — Igreja da Candelária, Monumento à Independência, ruas de pedra. Jantar com tamales e locro. Música andina que não foi ensaiada para turistas.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
    {
        day: "Dia 3",
        theme: "Salinas e Altitude",
        morning: "Salinas Grandes a 3.400m — branco infinito, céu azul impossível, silêncio que pesa. Uma das imagens mais surreais da América do Sul e uma das melhores fotos do continente.",
        afternoon: "Descida pelas curvas panorâmicas entre a Puna e a Quebrada. Paisagens que mudam de cor a cada quilômetro — da brancura do salar ao terracota andino.",
        evening: "Retorno pela Quebrada ao entardecer — o espetáculo de luz que muda as montanhas. Despedida com chicha e artesanato. Jujuy fica tatuada na memória.",
        color: "from-purple-600 to-violet-700",
        icon: Sparkles,
    },
];

const curiosities = [
    { text: "A Quebrada de Humahuaca foi rota humana por mais de 10.000 anos antes de ser reconhecida pela UNESCO em 2003 — poucas paisagens no mundo têm memória tão profunda." },
    { text: "O Cerro de los Siete Colores em Purmamarca deve suas 7 cores a 7 épocas geológicas diferentes — cada camada representa milhões de anos de história da Terra visíveis a olho nu." },
    { text: "O Êxodo Jujeño de 1812: o povo abandonou e incendiou Jujuy para negar recursos ao exército realista. San Martín chamou esse sacrifício de 'o ato mais heroico da Revolução'." },
    { text: "O Pucará de Tilcara foi habitado por mais de 900 anos antes da chegada dos espanhóis — sua posição estratégica sobre a Quebrada permitia controle visual de dezenas de quilômetros." },
    { text: "A chicha jujeña — bebida de milho fermentado — é consumida em rituais há mais de 3.000 anos nos Andes. Em Jujuy, ainda é preparada artesanalmente para cerimônias comunitárias." },
    { text: "As Salinas Grandes ficam a 3.400 metros de altitude — a pressão atmosférica ali é 30% menor. O céu é mais escuro, as estrelas mais brilhantes e o silêncio mais absoluto." },
    { text: "O carnaval de Jujuy inclui a 'diablada' — dança de origem aimará com fantasias que misturam iconografia pré-colombiana e colonial. Uma cosmogonia inteira dançada nas ruas." },
    { text: "Em agosto, cerimônias de Pachamama (Mãe Terra) são realizadas em toda a província. Alimentos, bebidas e folhas de coca são enterrados como oferenda — tradição ininterrupta há milênios." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3"
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
                            src="/infografico-jujuy.png"
                            alt="Infográfico editorial Jujuy"
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
                            src="/infografico-jujuy.png"
                            alt="Infográfico editorial Jujuy"
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

export default function JujuyPage() {
    return (
        <div className="min-h-screen">

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Provincia de Jujuy"
                name={{ first: "Jujuy", second: "" }}
                tagline="Quebrada de Humahuaca UNESCO — 10.000 anos de historia continua nos canions andinos mais coloridos do mundo."
                scene="andes"
                image="/cities/jujuy.png"
                accentColor="#f43f5e"
                stats={[
                    { label: "Habitantes", value: 320000 },
                    { label: "Fundacao Colonial", value: 1593 },
                    { label: "Km Quebrada UNESCO", value: 155, suffix: " km" },
                    { label: "Anos de historia", value: 10000 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Jujuy</SectionLabel>
                        <SectionTitle>
                            Onde a espiritualidade andina{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                nunca se apagou
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Jujuy não se visita — ela se sente. Nas montanhas pintadas pelo tempo, nos rituais da
                            Pachamama que nunca pararam, nos mercados indígenas onde cada peça carrega milênios.{" "}
                            <strong className="text-primary-700">É o capítulo mais ancestral e espiritual
                            da travessia bioceânica</strong> — onde a rota deixa de ser estrada e se torna
                            experiência transcultural profunda.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "Patrimônio UNESCO",
                                text: "Quebrada de Humahuaca — 155km de cânion andino com 10.000 anos de história humana, reconhecida pela UNESCO em 2003 como Paisagem e Itinerário Cultural da Humanidade.",
                                color: "from-rose-50 to-red-50",
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Heart,
                                title: "Pachamama Viva",
                                text: "A espiritualidade andina não é memória histórica — é cotidiano. Cerimônias de agosto, rituais de oferenda à Mãe Terra e uma cosmovisão quéchua/aimará preservada por milênios.",
                                color: "from-violet-50 to-purple-50",
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Camera,
                                title: "Natureza Impossível",
                                text: "Cerro de los Siete Colores em Purmamarca, Salinas Grandes a 3.400m, cânions que mudam de cor com a luz. Jujuy é a paisagem mais cinematográfica da América do Sul.",
                                color: "from-pink-50 to-rose-50",
                                accent: "text-pink-700",
                                iconBg: "bg-pink-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>10.000 Anos de Memória Andina</SectionLabel>
                        <SectionTitle light>
                            De rota milenar à{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                alma da humanidade
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Jujuy é uma das terras com memória mais profunda da América do Sul. Cada período
                            deixou marcas visíveis — em pedra, em ritual e na alma do povo andino.
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

            {/* ── QUEBRADA DE HUMAHUACA SPOTLIGHT ─────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-900/18 via-transparent to-violet-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-rose-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(124,58,237,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                                        Patrimônio da Humanidade
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Quebrada de Humahuaca
                                    <br />
                                    <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                        10.000 anos de memória andina
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Um dos cenários mais impressionantes da América do Sul — e um dos mais antigos.
                                    Por milênios, a Quebrada foi rota de caravanas, impérios e culturas. Em 2003,
                                    a UNESCO reconheceu o que os Andes já sabiam: este vale é Patrimônio da Humanidade.
                                    155km de cor, história, espiritualidade e natureza que não têm paralelo no continente.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Extensão total", val: "155 km", sub: "De cânion andino UNESCO" },
                                        { label: "UNESCO desde", val: "2003", sub: "Patrimônio da Humanidade" },
                                        { label: "Memória humana", val: "10.000 a.", sub: "De história contínua" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-rose-500/10">
                                            <div className="text-2xl font-bold text-rose-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA E ESPIRITUALIDADE ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-rose-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Identidade Viva</SectionLabel>
                        <SectionTitle light>
                            Pachamama,{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                música e espiritualidade
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "Em agosto, cerimônias de oferenda à Mãe Terra são celebradas em toda a província. Alimentos, chicha e coca são enterrados — tradição ininterrupta há milênios.",
                                accent: "text-rose-400",
                                iconBg: "bg-rose-500/15",
                                border: "border-rose-500/20",
                            },
                            {
                                icon: Music,
                                title: "Música Ancestral",
                                text: "Carnavalito, baguala e zamba tocados com quena, siku e bombo legüero. Ritmos que o Inca reconheceria — cada nota é memória coletiva de um povo que nunca perdeu sua identidade.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Herança Quéchua",
                                text: "Jujuy preserva uma das identidades indígenas mais fortes da Argentina. Língua, cosmovisão, relação com a terra e os ciclos naturais fazem parte do cotidiano — não de museu.",
                                accent: "text-pink-400",
                                iconBg: "bg-pink-500/15",
                                border: "border-pink-500/20",
                            },
                            {
                                icon: Sparkles,
                                title: "Carnaval Andino",
                                text: "A diablada jujeña mistura iconografia pré-colombiana e colonial numa dança de força simbólica rara. O carnaval não é festa — é cosmogonia andina dançada nas ruas.",
                                accent: "text-purple-400",
                                iconBg: "bg-purple-500/15",
                                border: "border-purple-500/20",
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
                        <SectionLabel>Sabores do Altiplano</SectionLabel>
                        <SectionTitle>
                            Gastronomia de{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                origem milenar
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
                                    <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-rose-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos e Experiências</SectionLabel>
                        <SectionTitle light>
                            O que fazer em{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                Jujuy
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-rose-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                Jujuy e Quebrada
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-rose-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Você Sabia?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                Jujuy
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
                                <div className="w-7 h-7 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-rose-400" />
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
                                    "Aeroporto Internacional Gobernador Héctor Reyes — voos de Buenos Aires, Córdoba e Salta",
                                    "Ônibus desde Buenos Aires (~24h) ou Salta (~2h) pela rodoviária central",
                                    "Ruta Nacional 9 — conexão direta com Salta e com a Quebrada de Humahuaca",
                                ],
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Calendar,
                                title: "Melhor Época",
                                items: [
                                    "Abril a outubro: primavera/outono andino — temperaturas amenas e céu limpo",
                                    "Fevereiro/março: Carnaval Andino — a diablada toma as ruas com música e cor",
                                    "Agosto: cerimônias da Pachamama — experiência espiritual única",
                                ],
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Globe,
                                title: "Informações Úteis",
                                items: [
                                    "Altitude: San Salvador 1.259m, Purmamarca 2.324m, Salinas Grandes 3.400m — aclimatação importante",
                                    "Moeda: Peso argentino — câmbio favorável para viajantes com dólar/real",
                                    "Idioma: espanhol com palavras quéchua — 'Jallalla!' é a saudação andina tradicional",
                                ],
                                accent: "text-pink-700",
                                iconBg: "bg-pink-100",
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
                    style={{ background: "linear-gradient(135deg, #1e0030 0%, #4c1d95 35%, #6b21a8 65%, #9d174d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/15 rounded-full blur-[90px]" />
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
                            Jujuy espera por você
                        </h2>
                        <p className="text-rose-200/70 text-lg max-w-xl mx-auto mb-10">
                            A Alma Ancestral dos Andes. Onde as montanhas têm sete cores, a Pachamama ainda vive
                            e a Quebrada guarda 10.000 anos de memória humana.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl hover:bg-rose-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                            <Link
                                to="/cidades/salta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Salta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
