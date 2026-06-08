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
    Heart, Sparkles,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "10.000 a.C.",
        icon: Compass,
        title: "Ruta Milenaria de los Andes",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "Antes de los Incas, antes de los españoles — la Quebrada de Humahuaca ya era ruta humana. Por milenios, caravanas de llamas atravesaron estos valles llevando lana, cerámica, maíz y metal entre los Andes y las llanuras. El corredor que hoy llamamos Ruta Bioceánica tiene raíces de 10.000 años en este territorio.",
        symbol: "Qhapaq Ñan — Camino Principal Andino",
    },
    {
        era: "Siglos XV–XVI",
        icon: Globe,
        title: "El Inca y la Conquista Española",
        color: "from-rose-700 to-red-800",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "El Imperio Inca integró la Quebrada al Qhapaq Ñan — su red de caminos que conectaba el continente. En 1593, los españoles fundaron San Salvador de Jujuy como nodo estratégico entre Lima y Buenos Aires. La ciudad colonial creció sobre caminos indígenas milenarios, mezclando dos mundos en un único paisaje.",
        symbol: "Fundación de San Salvador de Jujuy — 1593",
    },
    {
        era: "1812 — Éxodo Jujeño",
        icon: Flame,
        title: "El Sacrificio que Salvó la Independencia",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "En agosto de 1812, el General San Martín pidió al pueblo de Jujuy el acto más difícil: abandonar casas, cosechas y animales — e incendiar todo — para negar recursos al ejército realista. El Éxodo Jujeño es considerado uno de los gestos más heroicos de la independencia argentina. Jujuy se sacrificó para que Argentina naciera.",
        symbol: "Éxodo Jujeño — Memoria de la Independencia",
    },
    {
        era: "2003 — UNESCO",
        icon: Star,
        title: "Patrimonio de la Humanidad",
        color: "from-purple-700 to-violet-800",
        accent: "text-purple-400",
        border: "border-purple-500/30",
        body: "En 2003, la UNESCO reconoció la Quebrada de Humahuaca como Patrimonio de la Humanidad — Paisaje Cultural e Itinerario Cultural. El reconocimiento no fue solo turístico: fue el mundo entero diciendo que estos valles, esta cultura y esta espiritualidad andina pertenecen a la memoria colectiva de la humanidad.",
        symbol: "UNESCO World Heritage — Quebrada de Humahuaca 2003",
    },
];

const attractions = [
    { name: "Cerro de los Siete Colores", icon: Mountain, desc: "La montaña más fotogénica de la Argentina. En Purmamarca, las 7 capas geológicas crean una paleta natural que cambia de color con la luz — dorada al amanecer, violeta al atardecer.", badge: "Ícono" },
    { name: "Pucará de Tilcara", icon: Compass, desc: "Fortaleza preincaica a 2.450m de altitud, con visión estratégica sobre la Quebrada. 900 años de ocupación humana visibles en piedra — el mayor sitio arqueológico del noroeste argentino.", badge: "Arqueología" },
    { name: "Quebrada de Humahuaca", icon: Waves, desc: "155 km de cañón andino reconocido por la UNESCO. Estratos coloridos, pueblos históricos, cactus gigantes y un silencio que transforma cualquier viaje en una experiencia espiritual.", badge: "UNESCO" },
    { name: "Salinas Grandes", icon: Star, desc: "A 3.400m de altitud, una de las mayores superficies de sal de América del Sur. Blanco infinito bajo el azul imposible del cielo andino — una de las imágenes más surrealistas del continente.", badge: "Paisaje" },
    { name: "Purmamarca", icon: Camera, desc: "Pueblo andino al pie del Cerro de los Siete Colores. Iglesia colonial, mercado artesanal y un silencio que parece sagrado. Uno de los pueblos más fotogénicos de la Argentina.", badge: "Pueblo" },
    { name: "Humahuaca", icon: Globe, desc: "Ciudad histórica que preserva identidad indígena y colonial. El Monumento a la Independencia y la Iglesia de la Candelaria cuentan siglos de historia en piedra y espiritualidad andina.", badge: "Historia" },
    { name: "Tilcara", icon: Heart, desc: "Centro cultural y arqueológico de los Andes argentinos. Museo, jardín botánico de altura, mercado artesanal y la puerta de entrada al Pucará histórico.", badge: "Cultura" },
    { name: "Carnaval Andino", icon: Music, desc: "El carnaval más colorido del noroeste argentino. La diablada — danza aimará que mezcla cosmovisión indígena y herencia colonial — toma las calles con colores, música y espiritualidad.", badge: "Fiesta" },
];

const dishes = [
    { name: "Humita", icon: Leaf, desc: "Preparación de origen andino con maíz fresco condimentado, asada en chala. Plato simple que lleva siglos de memoria de las culturas precolombinas de los Andes.", tag: "Ancestral" },
    { name: "Tamales Jujeños", icon: Utensils, desc: "Masa de maíz con relleno de carne y especias andinas, envuelta en chala y cocida al vapor. Receta que el Inca reconocería — sobrevivió 500 años inalterada.", tag: "Tradición" },
    { name: "Locro Norteño", icon: Flame, desc: "Guiso espeso de maíz, porotos y carnes — plato de la tradición andina y española servido en celebraciones. En Jujuy, el locro se cocina en las fiestas con paciencia y afecto.", tag: "Festividad" },
    { name: "Empanadas Jujeñas", icon: Utensils, desc: "La versión regional de las empanadas argentinas — con relleno más condimentado y toque de pimiento. Horneadas en horno de barro, tienen sabor de altura y tradición.", tag: "Regional" },
    { name: "Chicha", icon: Waves, desc: "Bebida de maíz fermentado consumida en rituales hace más de 3.000 años en los Andes. En Jujuy, la chicha aún se prepara artesanalmente para celebraciones comunitarias.", tag: "Ritual" },
    { name: "Quinoa Andina", icon: Leaf, desc: "El grano sagrado de los Incas cultivado en el altiplano jujeño a más de 3.500m de altitud. Rico en proteínas, resistente al frío extremo — alimento que sostuvo civilizaciones andinas.", tag: "Altiplano" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Quebrada y Purmamarca",
        morning: "Llegada a San Salvador de Jujuy. Centro histórico colonial — Catedral, Cabildo y mercado indígena. La ciudad ya respira otra temporalidad, más andina, más silenciosa.",
        afternoon: "Purmamarca — el pueblo al pie del Cerro de los Siete Colores. Mercado artesanal de ponchos, cerámica y plata. Caminata alrededor del cerro al atardecer cuando los colores explotan.",
        evening: "Atardecer sobre las montañas coloridas de Purmamarca. El cielo se vuelve dorado, luego violeta, luego estrellado. Jujuy emociona antes de que llegue la cena.",
        color: "from-rose-600 to-red-700",
        icon: Mountain,
    },
    {
        day: "Día 2",
        theme: "Tilcara y Humahuaca",
        morning: "Pucará de Tilcara al amanecer — fortaleza preincaica con visión estratégica de 900 años sobre la Quebrada. La piedra habla. El silencio también.",
        afternoon: "Tilcara: Museo Arqueológico, jardín botánico de altura con cactus gigantes, mercado de artesanía quechua. Seguir hacia Humahuaca por la Quebrada colorida.",
        evening: "Humahuaca histórica — Iglesia de la Candelaria, Monumento a la Independencia, calles empedradas. Cena con tamales y locro. Música andina que no fue ensayada para turistas.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
    {
        day: "Día 3",
        theme: "Salinas y Altitud",
        morning: "Salinas Grandes a 3.400m — blanco infinito, cielo azul imposible, silencio que pesa. Una de las imágenes más surrealistas de América del Sur y una de las mejores fotos del continente.",
        afternoon: "Descenso por las curvas panorámicas entre la Puna y la Quebrada. Paisajes que cambian de color a cada kilómetro — del blanco de la salina al terracota andino.",
        evening: "Regreso por la Quebrada al atardecer — el espectáculo de luz que transforma las montañas. Despedida con chicha y artesanía. Jujuy queda tatuada en la memoria.",
        color: "from-purple-600 to-violet-700",
        icon: Sparkles,
    },
];

const curiosities = [
    { text: "La Quebrada de Humahuaca fue ruta humana por más de 10.000 años antes de ser reconocida por la UNESCO en 2003 — pocos paisajes en el mundo tienen una memoria tan profunda." },
    { text: "El Cerro de los Siete Colores en Purmamarca debe sus 7 colores a 7 épocas geológicas distintas — cada capa representa millones de años de historia de la Tierra visibles a simple vista." },
    { text: "El Éxodo Jujeño de 1812: el pueblo abandonó e incendió Jujuy para negar recursos al ejército realista. San Martín llamó a ese sacrificio 'el acto más heroico de la Revolución'." },
    { text: "El Pucará de Tilcara fue habitado por más de 900 años antes de la llegada de los españoles — su posición estratégica sobre la Quebrada permitía control visual de decenas de kilómetros." },
    { text: "La chicha jujeña — bebida de maíz fermentado — se consume en rituales hace más de 3.000 años en los Andes. En Jujuy, aún se prepara artesanalmente para ceremonias comunitarias." },
    { text: "Las Salinas Grandes están a 3.400 metros de altitud — la presión atmosférica allí es 30% menor. El cielo es más oscuro, las estrellas más brillantes y el silencio más absoluto." },
    { text: "El carnaval de Jujuy incluye la 'diablada' — danza de origen aimará con disfraces que mezclan iconografía precolombina y colonial. Una cosmovisión entera bailada en las calles." },
    { text: "En agosto, ceremonias de Pachamama (Madre Tierra) se realizan en toda la provincia. Alimentos, bebidas y hojas de coca se entierran como ofrenda — tradición ininterrumpida por milenios." },
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
    const src = useInfographic("jujuy");
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
                            src={src}
                            alt="Infografía editorial Jujuy"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Haz clic para ampliar</p>
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
                            alt="Infografía editorial Jujuy"
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

export default function JujuyPageEs() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Provincia de Jujuy"
                name={{ first: "Jujuy", second: "" }}
                tagline="Quebrada de Humahuaca UNESCO — 10.000 años de historia continua en los cañones andinos más coloridos del mundo."
                scene="andes"
                image="/cities/jujuy.jpg"
                accentColor="#f43f5e"
                stats={[
                    { label: "Habitantes", value: 320000 },
                    { label: "Fundación Colonial", value: 1593 },
                    { label: "Km Quebrada UNESCO", value: 155, suffix: " km" },
                    { label: "Años de historia", value: 10000 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Jujuy</SectionLabel>
                        <SectionTitle>
                            Donde la espiritualidad andina{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                nunca se apagó
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Jujuy no se visita — se siente. En las montañas pintadas por el tiempo, en los rituales
                            de la Pachamama que nunca se detuvieron, en los mercados indígenas donde cada pieza lleva
                            milenios.{" "}
                            <strong className="text-primary-700">Es el capítulo más ancestral y espiritual
                            del cruce bioceánico</strong> — donde la ruta deja de ser camino y se convierte
                            en experiencia transcultural profunda.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "Patrimonio UNESCO",
                                text: "Quebrada de Humahuaca — 155km de cañón andino con 10.000 años de historia humana, reconocida por la UNESCO en 2003 como Paisaje e Itinerario Cultural de la Humanidad.",
                                color: "from-rose-50 to-red-50",
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Heart,
                                title: "Pachamama Viva",
                                text: "La espiritualidad andina no es memoria histórica — es cotidiano. Ceremonias de agosto, rituales de ofrenda a la Madre Tierra y una cosmovisión quechua/aimará preservada por milenios.",
                                color: "from-violet-50 to-purple-50",
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Camera,
                                title: "Naturaleza Imposible",
                                text: "Cerro de los Siete Colores en Purmamarca, Salinas Grandes a 3.400m, cañones que cambian de color con la luz. Jujuy es el paisaje más cinematográfico de América del Sur.",
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
                        <SectionLabel>10.000 Años de Memoria Andina</SectionLabel>
                        <SectionTitle light>
                            De ruta milenaria al{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                alma de la humanidad
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Jujuy es una de las tierras con memoria más profunda de América del Sur. Cada período
                            dejó marcas visibles — en piedra, en ritual y en el alma del pueblo andino.
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
                                        Patrimonio de la Humanidad
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Quebrada de Humahuaca
                                    <br />
                                    <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                        10.000 años de memoria andina
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Uno de los escenarios más impresionantes de América del Sur — y uno de los más antiguos.
                                    Por milenios, la Quebrada fue ruta de caravanas, imperios y culturas. En 2003,
                                    la UNESCO reconoció lo que los Andes ya sabían: este valle es Patrimonio de la Humanidad.
                                    155km de color, historia, espiritualidad y naturaleza que no tienen paralelo en el continente.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Extensión total", val: "155 km", sub: "De cañón andino UNESCO" },
                                        { label: "UNESCO desde", val: "2003", sub: "Patrimonio de la Humanidad" },
                                        { label: "Memoria humana", val: "10.000 a.", sub: "De historia continua" },
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
                        <SectionLabel>Identidad Viva</SectionLabel>
                        <SectionTitle light>
                            Pachamama,{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                música y espiritualidad
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "En agosto, ceremonias de ofrenda a la Madre Tierra se celebran en toda la provincia. Alimentos, chicha y coca se entierran — tradición ininterrumpida por milenios.",
                                accent: "text-rose-400",
                                iconBg: "bg-rose-500/15",
                                border: "border-rose-500/20",
                            },
                            {
                                icon: Music,
                                title: "Música Ancestral",
                                text: "Carnavalito, baguala y zamba tocados con quena, siku y bombo legüero. Ritmos que el Inca reconocería — cada nota es memoria colectiva de un pueblo que nunca perdió su identidad.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Herencia Quechua",
                                text: "Jujuy preserva una de las identidades indígenas más fuertes de la Argentina. Lengua, cosmovisión, relación con la tierra y los ciclos naturales forman parte del cotidiano — no de un museo.",
                                accent: "text-pink-400",
                                iconBg: "bg-pink-500/15",
                                border: "border-pink-500/20",
                            },
                            {
                                icon: Sparkles,
                                title: "Carnaval Andino",
                                text: "La diablada jujeña mezcla iconografía precolombina y colonial en una danza de fuerza simbólica rara. El carnaval no es fiesta — es cosmovisión andina bailada en las calles.",
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
                        <SectionLabel>Sabores del Altiplano</SectionLabel>
                        <SectionTitle>
                            Gastronomía de{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                origen milenario
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
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días en{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                Jujuy y la Quebrada
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
                                        { label: "Mañana", text: day.morning },
                                        { label: "Tarde", text: day.afternoon },
                                        { label: "Noche", text: day.evening },
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
                        <SectionLabel>¿Sabías que?</SectionLabel>
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Aeropuerto Internacional Gobernador Héctor Reyes — vuelos desde Buenos Aires, Córdoba y Salta",
                                    "Bus desde Buenos Aires (~24h) o Salta (~2h) por la terminal central",
                                    "Ruta Nacional 9 — conexión directa con Salta y con la Quebrada de Humahuaca",
                                ],
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Abril a octubre: primavera/otoño andino — temperaturas amenas y cielo limpio",
                                    "Febrero/marzo: Carnaval Andino — la diablada toma las calles con música y color",
                                    "Agosto: ceremonias de la Pachamama — experiencia espiritual única",
                                ],
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Altitud: San Salvador 1.259m, Purmamarca 2.324m, Salinas Grandes 3.400m — aclimatación importante",
                                    "Moneda: Peso argentino — cambio favorable para viajeros con dólar/real",
                                    "Idioma: español con palabras quechuas — '¡Jallalla!' es el saludo andino tradicional",
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
                            Jujuy te espera
                        </h2>
                        <p className="text-rose-200/70 text-lg max-w-xl mx-auto mb-10">
                            El Alma Ancestral de los Andes. Donde las montañas tienen siete colores, la Pachamama
                            sigue viva y la Quebrada guarda 10.000 años de memoria humana.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl hover:bg-rose-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                            <Link
                                to="/es/cidades/salta"
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
