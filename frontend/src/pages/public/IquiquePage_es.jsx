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
    Anchor, Wind, ShoppingBag,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Siglo XIX",
        icon: Mountain,
        title: "El Salitre y la Ciudad del Oro Blanco",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Iquique nació grande. Durante el siglo XIX, el salitre transformó esta orilla árida en una de las ciudades más ricas del Pacífico Sur. Ingenieros británicos, trabajadores bolivianos y peruanos construyeron teatros, ferrocarriles y barrios enteros. La riqueza del desierto levantó una ciudad que no debería existir — y que le dio a Chile décadas de prosperidad.",
        symbol: "Salitre — el mineral que construyó el norte chileno",
    },
    {
        era: "21 de Mayo de 1879",
        icon: Anchor,
        title: "La Batalla de Iquique — El Héroe del Pacífico",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "En la Batalla de Iquique, el capitán Arturo Prat abordó solo el navío de guerra peruano Huáscar sabiendo que sería muerto — y murió. Su gesto se convirtió en el acto de heroísmo más celebrado de la historia chilena. La fecha, 21 de mayo, es feriado nacional. Iquique lleva esa memoria como identidad: la ciudad donde Chile aprendió lo que significa el honor.",
        symbol: "Arturo Prat — héroe del Pacífico y de la nación chilena",
    },
    {
        era: "21 de Diciembre de 1907",
        icon: Flame,
        title: "Santa María de Iquique — La Herida que No Cierra",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "En 1907, más de dos mil trabajadores del salitre y sus familias fueron masacrados por el ejército chileno en la Escuela Santa María de Iquique. Hombres, mujeres y niños que pedían mejores condiciones de trabajo. El episodio es considerado la mayor masacre de trabajadores de América Latina y moldeó definitivamente el movimiento obrero chileno.",
        symbol: "Escuela Santa María — memoria del movimiento obrero",
    },
    {
        era: "1975 / Hoy",
        icon: ShoppingBag,
        title: "ZOFRI y la Reinvención de la Ciudad",
        color: "from-teal-700 to-cyan-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Cuando el salitre murió, Iquique se reinventó. En 1975, la creación de la Zona Franca de Iquique (ZOFRI) transformó la ciudad en una de las más dinámicas del norte chileno — conectando Chile, Bolivia, Argentina y Brasil en un centro de libre comercio de clase internacional. El desierto que dio salitre ahora da logística, turismo y deportes extremos.",
        symbol: "ZOFRI — la reinvención comercial del norte chileno",
    },
];

const attractions = [
    { name: "Humberstone & Santa Laura", icon: Mountain, desc: "Ciudades fantasmas de la era del salitre, Patrimonio UNESCO desde 2005. Teatros, piscinas, casas y máquinas industriales preservados en el desierto — una de las experiencias históricas más impactantes de América del Sur.", badge: "UNESCO" },
    { name: "Cerro Dragón", icon: Wind, desc: "La duna de 400 metros que avanza sobre la ciudad de Iquique — una de las pocas grandes dunas del mundo en área urbana. Sandboard, parapente y una vista del Pacífico que ninguna otra ciudad ofrece.", badge: "Único" },
    { name: "Barrio Histórico", icon: Camera, desc: "Centro histórico de Iquique con casonas de madera de la era salitrera, la Municipalidad Art Nouveau, el Teatro Municipal (1890) y calles que transportan al siglo XIX — patrimonio vivo en medio de la ciudad moderna.", badge: "Patrimonio" },
    { name: "Playa Cavancha", icon: Waves, desc: "La playa urbana más famosa de Iquique — surfistas, familias y el contraste entre el azul profundo del Pacífico y las dunas del Atacama de fondo. El lugar donde el desierto literalmente termina en el mar.", badge: "Playa" },
    { name: "ZOFRI — Zona Franca", icon: ShoppingBag, desc: "Uno de los mayores centros de libre comercio de América Latina, moviendo miles de millones de dólares anuales. Conexión comercial entre Chile, Bolivia, Argentina, Brasil y Paraguay — el pulmón económico del norte chileno.", badge: "Comercio" },
    { name: "Museo Regional de Iquique", icon: Star, desc: "Del salitre al presente — acervo de la era minera, de la Batalla de Iquique y de la identidad cultural del norte chileno. La historia contada sin romanticismo, con profundidad.", badge: "Museo" },
    { name: "Parapente en las Dunas", icon: Wind, desc: "Las dunas del Atacama crean condiciones únicas para parapente y ala delta. El despegue parte del desierto seco y el aterrizaje es en la playa — una experiencia que existe en pocos lugares del planeta.", badge: "Aventura" },
    { name: "Pesca y Gastronomía del Muelle", icon: Anchor, desc: "El muelle pesquero de Iquique amanece con barcos, gaviotas y mariscos frescos. Caldillos, ceviches y congrios preparados en los restaurantes de borde-mar con el producto del día.", badge: "Gastronómico" },
];

const dishes = [
    { name: "Ceviche Nortino", icon: Waves, desc: "La versión norte-chilena del ceviche, con influencia peruana — limón, cilantro, ají y mariscos fresquísimos pescados en el propio muelle. Sabor limpio y mineral del Pacífico puro.", tag: "Costero" },
    { name: "Caldillo de Congrio", icon: Utensils, desc: "Pablo Neruda escribió una oda a este plato. El congrio cocido lentamente con papas, tomate y cebolla en un caldo profundo — el alma de la culinaria marina chilena, más intensa en Iquique.", tag: "Ícono" },
    { name: "Empanadas de Mariscos", icon: Flame, desc: "Mejillón, camarón y almeja en una masa hojaldrada horneada a la perfección. Clásico de la costa norte de Chile — vendidas en las esquinas del barrio histórico desde el tiempo del salitre.", tag: "Tradicional" },
    { name: "Erizo (Erizo de Mar)", icon: Waves, desc: "Considerado manjar en el norte chileno, el erizo de mar se consume crudo o con limón. La Corriente de Humboldt crea ejemplares de sabor único — acuoso, mineral, profundamente del Pacífico.", tag: "Especial" },
    { name: "Pisco Sour Chileno", icon: Leaf, desc: "La batalla simbólica: pisco chileno vs. peruano. En Iquique, el pisco sour se bebe como ritual cotidiano — ácido, espumoso y perfumado. La bebida que define el norte chileno.", tag: "Ritual" },
    { name: "Sopas y Caldillos del Muelle", icon: Utensils, desc: "El muelle pesquero de Iquique produce sopas diarias con lo que llegó de madrugada — camarón, vieira, mejillón y pescado. Caldillos que los pescadores llevan en termos al mar.", tag: "Auténtico" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Historia y Patrimonio",
        morning: "Humberstone y Santa Laura al amanecer — las ciudades fantasmas del salitre a 47km de Iquique. El Teatro, la piscina, las casas y las máquinas preservados en el silencio del desierto. UNESCO vivo.",
        afternoon: "Barrio histórico de Iquique — casonas de madera, Teatro Municipal (1890), Municipalidad Art Nouveau y la Plaza Prat. La riqueza que el salitre construyó sigue en pie.",
        evening: "Cena en el muelle con caldillo de congrio y pisco sour. El Pacífico al atardecer — el cielo del Atacama cambia de azul a dorado, luego a violeta estrellado.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Día 2",
        theme: "Dunas y Océano",
        morning: "Cerro Dragón al amanecer — la duna de 400m que avanza sobre la ciudad. Sandboard en las vertientes, vista inmensa del Pacífico y la sensación rara de estar al mismo tiempo en el desierto y a orillas del mar.",
        afternoon: "Playa Cavancha — surf, snorkel y la vida costera intensa de Iquique. Surfistas en un mar azul profundo con dunas doradas de fondo. La ciudad que parece imposible.",
        evening: "Parapente o ala delta al final del día — despegue de la duna, sobrevuelo de la ciudad y aterrizaje en la playa. La experiencia que solo Iquique ofrece en toda América del Sur.",
        color: "from-sky-600 to-blue-700",
        icon: Wind,
    },
    {
        day: "Día 3",
        theme: "ZOFRI y Pacífico",
        morning: "Escuela Santa María de Iquique — monumento a la masacre de 1907 que cambió a Chile. Memoria difícil y necesaria. La ciudad que no olvidó a sus trabajadores.",
        afternoon: "ZOFRI — la zona franca más dinámica del norte chileno. Miles de millones de dólares en comercio, conexión con Bolivia, Argentina y Brasil. La reinvención de Iquique en la era bioceánica.",
        evening: "Último atardecer sobre el Pacífico. El océano al que la Ruta Bioceánica cruzó un continente para alcanzar. Ceviche fresco, pisco sour y el silencio del Atacama a lo lejos — cruce completo.",
        color: "from-teal-600 to-cyan-700",
        icon: ShoppingBag,
    },
];

const curiosities = [
    { text: "Iquique es una de las ciudades más secas del mundo permanentemente habitadas — el promedio anual de lluvia es menos de 1mm. La bruma (camanchaca) del Pacífico es la única humedad que la ciudad conoce." },
    { text: "El Cerro Dragón es una de las pocas grandes dunas urbanas del mundo — con 400 metros de altura, avanza hacia la ciudad a una tasa mensurable anualmente. Iquique convive con el desierto en su jardín." },
    { text: "La masacre de la Escuela Santa María de Iquique (1907) fue la mayor masacre de trabajadores de América Latina — 2.000 a 3.600 operarios del salitre y familiares asesinados por el ejército. El evento moldeó el sindicalismo chileno por generaciones." },
    { text: "Arturo Prat, el héroe de la Batalla de Iquique (1879), abordó el Huáscar con solo dos hombres sabiendo que moriría — el gesto se convirtió en el mayor símbolo de heroísmo de la historia chilena. El 21 de mayo es feriado nacional." },
    { text: "Humberstone y Santa Laura fueron declaradas Patrimonio de la Humanidad por la UNESCO en 2005 — dos de las pocas ciudades industriales fantasmas protegidas en el mundo, preservando máquinas, teatros y casas del siglo XIX." },
    { text: "La ZOFRI (Zona Franca de Iquique) es responsable de una porción significativa del PIB de la región de Tarapacá y conecta directamente a Chile con Bolivia, Argentina, Brasil y Paraguay — logística que la Ruta Bioceánica fortalece." },
    { text: "Iquique es considerada la capital del parapente y ala delta de Chile — el viento constante del Pacífico y las dunas del Atacama crean condiciones excepcionales. Pilotos vienen de todo el mundo a las dunas de Iquique." },
    { text: "La cantata 'La Cantata Santa María de Iquique' (1970), del grupo Quilapayún, es una de las obras musicales más importantes de Chile — narró la masacre de 1907 y se convirtió en símbolo de resistencia cultural latinoamericana." },
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
    const src = useInfographic("iquique");
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
                            alt="Infografía editorial Iquique"
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
                            alt="Infografía editorial Iquique"
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

export default function IquiquePageEs() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Región de Tarapacá"
                name={{ first: "Iquique", second: "" }}
                tagline="Puerto histórico, duna urbana de 400 metros y la memoria salitrera que moldeó el Chile moderno."
                scene="pacifico"
                image="/cities/iquique.jpg"
                accentColor="#fb923c"
                stats={[
                    { label: "Habitantes", value: 235000 },
                    { label: "Duna urbana (m)", value: 400, suffix: " m" },
                    { label: "UNESCO Humberstone", value: 2005 },
                    { label: "Km de Antofagasta", value: 310, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Iquique</SectionLabel>
                        <SectionTitle>
                            La ciudad que el salitre{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                construyó y el mar abrazó
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Iquique tiene capas. Debajo de los rascacielos modernos están casonas de madera
                            salitrera. Detrás de las playas hay una duna de 400 metros. Detrás del comercio global
                            de la ZOFRI está la memoria de dos mil trabajadores masacrados.{" "}
                            <strong className="text-primary-700">Es la segunda gran salida chilena
                            de la Ruta Bioceánica</strong> — una ciudad construida por contradicciones
                            que se convirtieron en identidad.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "Patrimonio UNESCO",
                                text: "Humberstone y Santa Laura — ciudades fantasmas del salitre preservadas en el desierto desde 1872. UNESCO desde 2005. Museos vivos donde máquinas, teatros y casas cuentan el ciclo que construyó el norte chileno.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wind,
                                title: "Cerro Dragón y Deportes",
                                text: "La duna de 400m que avanza sobre la ciudad crea condiciones únicas para parapente, sandboard y ala delta. El desierto comienza en la última calle y el Pacífico comienza en la próxima — Iquique tiene los dos.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI — Polo Comercial",
                                text: "La Zona Franca de Iquique conecta Chile, Bolivia, Argentina, Brasil y Paraguay en un centro de libre comercio de clase internacional. La reinvención post-salitre que transformó Iquique en un hub del Pacífico Sur.",
                                color: "from-teal-50 to-cyan-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Del Salitre a la ZOFRI</SectionLabel>
                        <SectionTitle light>
                            Historia en capas:{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                heroísmo, tragedia y reinvención
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Pocas ciudades tienen una historia tan densa como Iquique — batallas navales,
                            masacres obreras, riqueza y decadencia, y una reinvención que continúa.
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

            {/* ── HUMBERSTONE SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/18 via-transparent to-sky-900/12" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-amber-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(6,27,51,0.95) 60%, rgba(14,165,233,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                        <Mountain className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                                        Patrimonio de la Humanidad — UNESCO 2005
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Humberstone y Santa Laura
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        El salitre que el desierto preservó
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    A 47km de Iquique, dos ciudades enteras sobreviven en el desierto — detenidas en el tiempo
                                    desde que el salitre murió. Teatros, piscinas, casas, máquinas y escuelas
                                    preservados por la extrema aridez del Atacama. En 2005, la UNESCO reconoció
                                    lo que el desierto ya sabía: este patrimonio industrial es único en el mundo.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Fundación", val: "1872", sub: "Humberstone original" },
                                        { label: "UNESCO desde", val: "2005", sub: "Patrimonio Industrial" },
                                        { label: "Distancia", val: "47 km", sub: "Al este de Iquique" },
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

            {/* ── DUALIDADE DUNA + MAR ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Una Ciudad de Extremos</SectionLabel>
                        <SectionTitle light>
                            Salitre, duna,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-sky-300 bg-clip-text text-transparent">
                                Pacífico y memoria
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Cerro Dragón",
                                text: "400 metros de duna urbana que avanza sobre Iquique. Sandboard, parapente y la vista imposible de desierto + ciudad + océano en una sola foto. Solo existe aquí.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Playas y Surf",
                                text: "Playa Cavancha y otras playas urbanas con Pacífico frío y olas que forman surfistas de clase mundial. El contraste visual con las dunas al fondo es único en América del Sur.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI",
                                text: "Miles de millones de dólares anuales en libre comercio. La Zona Franca conecta todo el cono sur — Chile, Bolivia, Argentina, Brasil y Paraguay. La reinvención de Iquique en el siglo XXI.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Anchor,
                                title: "Memoria Obrera",
                                text: "La Escuela Santa María y la Cantata de Quilapayún — la masacre de 1907 que nunca fue olvidada. Iquique recuerda porque la memoria de los trabajadores es su identidad más profunda.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
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
                        <SectionLabel>Sabores del Norte Chileno</SectionLabel>
                        <SectionTitle>
                            Gastronomía{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                del muelle y del desierto
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

            {/* ── ATRAÇÕES ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días en{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Iquique y alrededores
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Aeropuerto Internacional Diego Aracena — vuelos desde Santiago (2h), Lima y otras capitales",
                                    "Bus desde Santiago (~24h) o Antofagasta (~4h) por la Ruta 1 Norte",
                                    "Ruta 1 (Panamericana Norte) — conexión litoral con toda la costa del norte chileno",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Todo el año — Iquique tiene menos de 1mm de lluvia por año y cielo casi siempre limpio",
                                    "Noviembre a abril: temperatura del mar más amena para surf y buceo",
                                    "Invierno (junio-agosto): viento constante — ideal para parapente y ala delta",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Peso chileno — cambio favorable para viajeros con dólar/real/euro",
                                    "Altitud: ciudad al nivel del mar, pero Humberstone está a 1.000m — ropa de capas",
                                    "Idioma: español chileno — acento distinto y rápido, pero comunicación fácil",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    style={{ background: "linear-gradient(135deg, #1c0a00 0%, #78350f 35%, #92400e 65%, #b45309 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇨🇱</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Iquique te espera
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            Donde la duna más alta besa el océano más profundo. La segunda gran salida de la Ruta
                            Bioceánica — salitre, memoria y la reinvención de una ciudad que nunca para.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                            <Link
                                to="/es/cidades/antofagasta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Antofagasta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
