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
        title: "Fundación Española en el Corazón de los Andes",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "Fundada en 1582 por los colonizadores españoles, Salta nació como punto estratégico en las rutas comerciales entre el Atlántico y el Pacífico. Su posición privilegiada entre los Andes, el Altiplano y las regiones indígenas la convirtió durante siglos en el corazón del norte argentino — conectando Argentina, Bolivia, Perú y Chile.",
        symbol: "Centro Histórico Colonial de Salta",
    },
    {
        era: "Siglos XVII–XVIII",
        icon: Globe,
        title: "Ruta Colonial y Comercio Andino",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Salta creció como nodo vital de las rutas coloniales españolas, moviendo oro, plata y productos entre el Pacífico y el Río de la Plata. Las iglesias, casonas y la Catedral Basílica erigidas en ese período definen hasta hoy la silueta histórica de la ciudad — arquitectura que el tiempo no borró.",
        symbol: "Catedral Basílica y Cabildo Histórico",
    },
    {
        era: "Independencia",
        icon: Star,
        title: "El Norte en la Lucha por la Independencia",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "El norte argentino fue escenario decisivo de las guerras de independencia. Salta y su región vieron batallas, héroes y una identidad forjada en la resistencia. El Cabildo histórico preserva esa memoria — espacio donde decisiones que moldearon la Argentina fueron tomadas.",
        symbol: "Cabildo Histórico — Memoria de la Independencia",
    },
    {
        era: "Hoy",
        icon: Music,
        title: "Capital Cultural del Folklore Argentino",
        color: "from-rose-600 to-pink-700",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "Hoy, Salta es reconocida como la capital cultural del folklore argentino. Sus peñas tocan zamba y chacarera en vivo todas las noches, el Tren a las Nubes atraviesa los Andes en una de las experiencias ferroviarias más impresionantes del mundo, y la gastronomía salteña es considerada patrimonio del norte argentino.",
        symbol: "Peñas Folclóricas — Música Viva",
    },
];

const attractions = [
    { name: "Iglesia San Francisco", icon: Mountain, desc: "La torre monumental que domina el centro histórico y se convirtió en el símbolo visual más reconocible de Salta. Arquitectura colonial en su forma más impactante.", badge: "Patrimonio" },
    { name: "Catedral Basílica", icon: Star, desc: "Con su fachada rosada y detalles coloniales, representa la identidad histórica de Salta. Una de las postales más fotogénicas de la Argentina.", badge: "Historia" },
    { name: "Tren a las Nubes", icon: Compass, desc: "Una de las experiencias ferroviarias más impresionantes del planeta. El ferrocarril sube los Andes por montañas, valles y puentes vertiginosos hasta altitudes extremas.", badge: "Aventura" },
    { name: "Peñas Folclóricas", icon: Music, desc: "De noche, las peñas de Salta cobran vida con zamba, chacarera y carnavalito en vivo. Música que no es espectáculo turístico — es identidad cultural viva.", badge: "Cultura" },
    { name: "Valles Calchaquíes", icon: Mountain, desc: "Valles andinos de rara belleza con viñedos de altura, pueblos históricos y paisajes que parecen pintados a mano. Escenario cinematográfico del norte argentino.", badge: "Naturaleza" },
    { name: "Salinas Grandes", icon: Waves, desc: "Una de las mayores salinas de la Argentina — superficie blanca infinita que contrasta con el azul profundo del cielo andino. Una de las imágenes más surrealistas del continente.", badge: "Paisaje" },
    { name: "Cabildo Histórico", icon: Globe, desc: "Símbolo de la independencia argentina, hoy convertido en museo y espacio cultural que preserva la memoria política e histórica del norte argentino.", badge: "Museo" },
    { name: "Quebrada de San Lorenzo", icon: Camera, desc: "Cañón de vegetación exuberante a pocos kilómetros del centro. Senderos, aves y la naturaleza andina accesible sin salir de la región de Salta.", badge: "Naturaleza" },
];

const dishes = [
    { name: "Empanadas Salteñas", icon: Flame, desc: "Consideradas por muchos las mejores de la Argentina. Masa delicada, relleno jugoso de carne cortada a cuchillo con especias regionales. Símbolo absoluto de la ciudad.", tag: "Ícono" },
    { name: "Locro", icon: Utensils, desc: "Plato de la tradición indígena y española preparado en fiestas populares. Maíz, porotos, carnes y especias en un guiso denso que calienta cuerpo y alma.", tag: "Tradición" },
    { name: "Torrontés", icon: Wine, desc: "El vino de identidad argentina, producido en los viñedos de altura de los Valles Calchaquíes. Aromas florales intensos y frescura única generada por el clima andino.", tag: "Altura" },
    { name: "Tamales", icon: Leaf, desc: "Masa de maíz con relleno de carne, enrollada y cocida al vapor en hoja de chala. Herencia indígena directa que permanece viva en la culinaria de Salta.", tag: "Ancestral" },
    { name: "Humita", icon: Utensils, desc: "Preparación de origen andino con maíz fresco condimentado, asado o cocido. Plato simple que lleva siglos de historia de las culturas precolombinas.", tag: "Andino" },
    { name: "Vinos de Altura", icon: Wine, desc: "Los viñedos más altos del mundo producen aquí taninos marcados y aromas únicos. Una experiencia de degustación que solo los Andes pueden crear.", tag: "Premium" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Historia y Arquitectura",
        morning: "Centro histórico colonial: Catedral Basílica, Cabildo Histórico y Plaza 9 de Julio. Salta parece vivir en otro ritmo — más humano, más artístico, más histórico.",
        afternoon: "Iglesia San Francisco y casonas coloniales. Museos de la independencia argentina y la memoria del norte. Tarde de fotografía por las calles que el tiempo preservó.",
        evening: "Primera noche en una peña folclórica — zamba y chacarera en vivo con empanadas salteñas. La música no es show: es el sonido de la identidad de Salta.",
        color: "from-orange-600 to-red-700",
        icon: Globe,
    },
    {
        day: "Día 2",
        theme: "Andes y Paisajes",
        morning: "Tren a las Nubes — el ferrocarril que sube los Andes por puentes vertiginosos y paisajes cinematográficos. Una de las experiencias más impresionantes de América del Sur.",
        afternoon: "Quebrada de San Lorenzo: cañón de vegetación exuberante, senderos y aves andinas. Naturaleza poderosa a pocos minutos del centro histórico.",
        evening: "Atardecer con el cielo dorado sobre las fachadas coloniales. El aroma de comida en las calles, las guitarras que empiezan a sonar — Salta emociona por su atmósfera.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Día 3",
        theme: "Vinos y Cultura",
        morning: "Valles Calchaquíes: viñedos de altura, pueblos históricos y paisajes de los Andes que parecen pintados. Degustación de Torrontés y vinos de altura únicos.",
        afternoon: "Salinas Grandes — superficie blanca infinita bajo el azul profundo del cielo andino. Uno de los escenarios más surrealistas de América del Sur y de las mejores fotos del continente.",
        evening: "Artesanía en los mercados de Salta: ponchos, tejidos andinos, plata y cerámica. Despedida con locro y música — Salta queda como memoria emocional permanente.",
        color: "from-rose-600 to-pink-700",
        icon: Wine,
    },
];

const curiosities = [
    { text: "Salta fue fundada en 1582 — tiene más de 440 años de historia colonial, convirtiéndola en una de las ciudades más antiguas y preservadas de la Argentina." },
    { text: "El apodo 'Salta La Linda' no es marketing — es reconocimiento histórico de viajeros que la llamaron así desde el siglo XIX." },
    { text: "El Tren a las Nubes sube hasta 4.220 metros de altitud, atraviesa 29 puentes y 21 túneles — considerado uno de los recorridos ferroviarios más espectaculares del mundo." },
    { text: "Los viñedos de los Valles Calchaquíes están entre los más altos del mundo, llegando a 3.000 metros de altitud. La altura crea vinos con aromas únicos imposibles de replicar en otras latitudes." },
    { text: "Las peñas folclóricas de Salta son frecuentadas por residentes locales — no son shows para turistas. Allí, la zamba y la chacarera se cantan y bailan como forma de identidad cultural." },
    { text: "La Pachamama (Madre Tierra) sigue siendo venerada en muchas comunidades del norte argentino. En agosto, rituales de ofrenda a la tierra se realizan con alimentos y bebidas." },
    { text: "La Iglesia San Francisco de Salta tiene una de las torres más altas del norte argentino — visible desde prácticamente cualquier punto del centro histórico." },
    { text: "Salta es punto de partida para la Quebrada de Humahuaca (Patrimonio UNESCO), las Salinas y el Paso de Jama — uno de los cruces andinos más impresionantes hacia Chile." },
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
                            alt="Infografía editorial Salta"
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
                            alt="Infografía editorial Salta"
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

export default function SaltaPageEs() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Provincia de Salta"
                name={{ first: "Salta", second: "La Linda" }}
                tagline="El alma folclórica de los Andes argentinos — colonial, vibrante y puerta hacia las nubes."
                scene="andes"
                image="/cities/salta.jpg"
                accentColor="#f97316"
                stats={[
                    { label: "Habitantes", value: 620000 },
                    { label: "Fundación Colonial", value: 1582 },
                    { label: "Altitud (m)", value: 1187, suffix: " m" },
                    { label: "Km de Buenos Aires", value: 1580, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Salta</SectionLabel>
                        <SectionTitle>
                            Donde la música encuentra{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                las montañas
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Salta no se visita con los ojos — se siente. En la zamba que resuena en las peñas, en el
                            aroma de las empanadas recién horneadas, en las fachadas coloniales bañadas por el sol
                            dorado de los Andes. Con 440 años de historia preservada,{" "}
                            <strong className="text-primary-700">es el capítulo más cultural y emocionante
                            del cruce bioceánico</strong> — donde la ruta deja de ser logística y se convierte
                            en experiencia humana profunda.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Music,
                                title: "Capital del Folklore",
                                text: "Zamba, chacarera y carnavalito tocados en vivo todas las noches en las peñas. En Salta, el folklore no es show turístico — es identidad cultural que late desde 1582.",
                                color: "from-orange-50 to-red-50",
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Mountain,
                                title: "Portal Andino",
                                text: "Tren a las Nubes, Valles Calchaquíes, Salinas Grandes y la Quebrada de Humahuaca (UNESCO). Los Andes empiezan aquí — y son cinematográficos en cada curva.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wine,
                                title: "Gastronomía y Vino",
                                text: "Empanadas salteñas consideradas las mejores de la Argentina. Vinos Torrontés de los viñedos más altos del mundo. Locro y tamales — herencia viva de las culturas andinas.",
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
                        <SectionLabel>440 Años de Historia Viva</SectionLabel>
                        <SectionTitle light>
                            De colonia española al{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                alma cultural de los Andes
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Salta fue construida en capas de historia colonial, independencia e identidad cultural.
                            Cada período dejó marcas visibles — en piedra, en música y en el alma del pueblo norteño.
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
                                        Experiencia Única
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Tren a las Nubes
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        El ferrocarril que abraza los Andes
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Una de las experiencias ferroviarias más impresionantes del planeta. El tren parte de
                                    Salta y sube los Andes atravesando 29 puentes, 21 túneles y viaductos vertiginosos
                                    hasta alcanzar 4.220 metros de altitud — con paisajes que ninguna otra ruta
                                    del continente puede ofrecer.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Altitud máxima", val: "4.220 m", sub: "Sobre el nivel del mar" },
                                        { label: "Puentes", val: "29", sub: "Sobre valles y cañones" },
                                        { label: "Túneles", val: "21", sub: "Dentro de los Andes" },
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
                        <SectionLabel>Identidad Viva</SectionLabel>
                        <SectionTitle light>
                            Folklore,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Pachamama y tradición
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Music,
                                title: "Peñas Folclóricas",
                                text: "Zamba, chacarera, carnavalito y baguala en vivo todas las noches. Las peñas son frecuentadas por residentes — no por turistas. Identidad cultural pura.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "La espiritualidad andina permanece viva. En agosto, rituales de ofrenda a la Madre Tierra son celebrados en comunidades del norte argentino.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Herencia Indígena",
                                text: "Los pueblos quechua y aymara moldearon la lengua, las costumbres y la cosmovisión del norte argentino. Mercados, artesanía y música llevan esa herencia viva.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Artesanía Andina",
                                text: "Ponchos, tejidos, cerámica, plata y arte indígena en los mercados de Salta. Cada pieza lleva memoria cultural ancestral transmitida por generaciones.",
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
                        <SectionLabel>Sabores del Norte Argentino</SectionLabel>
                        <SectionTitle>
                            Gastronomía de{" "}
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
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días en{" "}
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que?</SectionLabel>
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Aeropuerto Internacional de Salta — vuelos directos desde Buenos Aires, Córdoba y otras capitales",
                                    "Bus desde Buenos Aires (~22h) o Córdoba (~12h) por la terminal central",
                                    "Acceso por Ruta Nacional 9 y 34 — conexión con la Ruta Bioceánica",
                                ],
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Abril a octubre: primavera y otoño andino, clima ideal para paseos",
                                    "Julio: Carnaval del Norte y fiestas folclóricas más intensas",
                                    "Evitar diciembre–febrero: lluvias de la estación húmeda andina",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Peso argentino — cambio favorable para viajeros con dólar/real",
                                    "Altitud: 1.152 m — aclimatación recomendada antes del Tren a las Nubes (4.220 m)",
                                    "Idioma: español — acento norteño con palabras quechuas",
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
                            Salta La Linda te espera
                        </h2>
                        <p className="text-orange-200/70 text-lg max-w-xl mx-auto mb-10">
                            El alma folclórica de los Andes argentinos. Donde la música, la montaña y la historia
                            colonial se encuentran en el capítulo más emocionante del cruce bioceánico.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-800 font-bold rounded-2xl hover:bg-orange-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                            <Link
                                to="/es/"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar la Ruta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
