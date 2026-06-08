import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Fish, Trees, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    BookOpen, Heart,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Década de 1930",
        icon: Globe,
        title: "La Huida y la Llegada al Chaco",
        color: "from-lime-700 to-green-800",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Perseguidas por regímenes totalitarios en Rusia, Ucrania y Alemania, familias menonitas emprendieron uno de los mayores éxodos migratorios del siglo XX. Paraguay les ofreció lo que buscaban: libertad religiosa, autonomía cultural y tierras en el Chaco — consideradas inhóspitas por todos. Ellos aceptaron el desafío.",
        symbol: "Llegada de los primeros colonizadores menonitas",
    },
    {
        era: "1930–1950",
        icon: Heart,
        title: "Construyendo desde Cero en el Desierto",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Calor extremo, sequía, aislamiento total y falta de infraestructura. Los primeros años fueron de supervivencia pura. Pero los menonitas trajeron algo que ninguna adversidad pudo derribar: organización colectiva, fe y disciplina de trabajo. Pozo a pozo, plantación a plantación, la ciudad comenzó a surgir.",
        symbol: "Primeros pozos y plantaciones en el Chaco",
    },
    {
        era: "1950–1980",
        icon: Leaf,
        title: "Cooperativa Fernheim y el Milagro Agrícola",
        color: "from-emerald-700 to-teal-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "La Cooperativa Fernheim se convirtió en el motor de transformación de la región. Produjeron leche, quesos y embutidos reconocidos en todo Paraguay. Construyeron escuelas, hospitales y carreteras. El Chaco árido comenzó a florecer — y Filadelfia emergió como el símbolo máximo del cooperativismo sudamericano.",
        symbol: "Cooperativa Fernheim — referencia continental",
    },
    {
        era: "Hoy",
        icon: Compass,
        title: "Polo Regional y Portal Bioceánico",
        color: "from-lime-600 to-olive-700",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Filadelfia es hoy el centro económico del Chaco Paraguayo. Con la Ruta Bioceánica PY-15 pasando por ella, la ciudad se prepara para un nuevo ciclo de desarrollo: polo logístico, destino turístico internacional y conexión entre el Atlántico y el Pacífico. El aislamiento histórico se transforma en integración continental.",
        symbol: "Ruta PY-15 — Corredor Bioceánico",
    },
];

const attractions = [
    { name: "Museo Jakob Unger", icon: BookOpen, desc: "Principal espacio de memoria del Chaco. Preserva documentos históricos, objetos de los primeros colonizadores, registros de la inmigración y memorias de la Guerra del Chaco.", badge: "Historia" },
    { name: "Cooperativa Fernheim", icon: Heart, desc: "Una de las cooperativas más influyentes de América del Sur. Visitar sus instalaciones es entender cómo una comunidad transformó el Chaco árido en polo agroindustrial.", badge: "Cultura" },
    { name: "Arquitectura Menonita", icon: Globe, desc: "Edificaciones que parecen transportar al visitante a una pequeña ciudad de Europa Central. Iglesias, casas y comercios con arquitectura singular y preservada en medio del Chaco.", badge: "Patrimonio" },
    { name: "Lácteos y Quesería", icon: Utensils, desc: "Producción artesanal de quesos y embutidos reconocidos como los mejores de Paraguay. Visita a las instalaciones de la cooperativa con degustación de productos.", badge: "Gastronomía" },
    { name: "Paisaje del Chaco", icon: Mountain, desc: "Campos dorados, molinos en el horizonte, carreteras que se pierden en la inmensidad. El atardecer en Filadelfia con el cielo teñido de naranja es un espectáculo único.", badge: "Naturaleza" },
    { name: "Comunidades Indígenas", icon: Star, desc: "Los pueblos Nivaclé y Enlhet viven cerca de la ciudad, preservando conocimientos ancestrales sobre el Chaco — artesanía en fibras naturales y medicina tradicional.", badge: "Cultura" },
    { name: "Fauna del Chaco Seco", icon: Camera, desc: "Osos hormigueros, tatús, pumas, guacamayos, ñandúes y yacarés en hábitat natural. La diversidad biológica del Chaco sorprende a quien lo visita por primera vez.", badge: "Fauna" },
    { name: "Iglesias Históricas", icon: Heart, desc: "Las iglesias menonitas de Filadelfia son el centro espiritual y cultural de la comunidad — arquitectura sencilla, pero de profundo simbolismo para quienes construyeron el Chaco.", badge: "Espiritual" },
];

const dishes = [
    { name: "Kuchen", icon: Utensils, desc: "Tartas tradicionales alemanas elaboradas con recetas centenarias traídas de Europa Central. Presentes en todas las casas y panaderías de Filadelfia — identidad dulce en cada porción.", tag: "Europeo" },
    { name: "Embutidos Artesanales", icon: Flame, desc: "Chorizos, salames y ahumados producidos con recetas preservadas por las familias menonitas durante generaciones. Sabores de Europa que sobrevivieron al Chaco.", tag: "Tradición" },
    { name: "Quesos y Lácteos", icon: Leaf, desc: "Reconocidos como los mejores de Paraguay. La producción lechera de la Cooperativa Fernheim convirtió a Filadelfia en la capital de los lácteos del Chaco.", tag: "Cooperativa" },
    { name: "Chipa", icon: Utensils, desc: "El pan de queso paraguayo encuentra la tradición europea. En el Chaco, la chipa se consume caliente en el desayuno junto a un tereré — fusión genuina.", tag: "Fusión" },
    { name: "Carnes del Chaco", icon: Flame, desc: "Cortes preparados con la técnica lenta de la tradición rural europea adaptada al Chaco. Sabores intensos de la ganadería extensiva menonita.", tag: "Rural" },
    { name: "Tereré", icon: Leaf, desc: "El guampa de tereré cruza fronteras culturales. En Filadelfia, la bebida paraguaya es adoptada por la comunidad menonita — símbolo de la integración cultural del Chaco.", tag: "Integración" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Memoria e Identidad",
        morning: "Museo Jakob Unger: inmersión en la historia de la inmigración menonita. Documentos, fotos y objetos que cuentan el viaje de quienes llegaron al Chaco con fe y transformaron el desierto.",
        afternoon: "Paseo por la ciudad: arquitectura europea, iglesias históricas y el ritmo singular de Filadelfia. Una ciudad que parece improbable en medio del Chaco Paraguayo.",
        evening: "Cena menonita: kuchen, embutidos artesanales, quesos de la cooperativa y tereré. Probar Filadelfia es entender cómo las culturas se encuentran y se transforman.",
        color: "from-lime-600 to-green-700",
        icon: BookOpen,
    },
    {
        day: "Día 2",
        theme: "Cooperativismo y Producción",
        morning: "Visita a la Cooperativa Fernheim: instalaciones de lácteos, quesería y producción artesanal. Ver de cerca el modelo que transformó el Chaco en referencia agroindustrial.",
        afternoon: "Campos del Chaco: paisajes de vegetación xerófila, fauna nativa y el horizonte infinito de la mayor llanura de América del Sur. Puesta de sol con luz dorada sobre los molinos.",
        evening: "Cielo estrellado del Chaco — sin contaminación lumínica, uno de los más impresionantes del continente. Silencio absoluto que solo quien vivió lejos de la ciudad puede imaginar.",
        color: "from-amber-600 to-yellow-700",
        icon: Leaf,
    },
    {
        day: "Día 3",
        theme: "Pueblos e Integración",
        morning: "Comunidades indígenas Nivaclé: artesanía en fibras naturales, medicina ancestral del Chaco y cosmovisión que contrasta y se complementa con la cultura menonita.",
        afternoon: "Gastronomía de fusión: almuerzo con recetas que unen Europa y Paraguay. Compras de embutidos, quesos y artesanía para llevar la memoria de Filadelfia.",
        evening: "Despedida en la Ruta PY-15 al atardecer — el corredor que conecta Filadelfia con el continente. El Chaco que floreció ahora mira hacia los dos océanos.",
        color: "from-emerald-600 to-teal-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Filadelfia fue construida por inmigrantes menonitas que huyeron de persecuciones en Rusia y Ucrania en los años 1930 — encontrando en el Chaco paraguayo la libertad que buscaban." },
    { text: "La Cooperativa Fernheim es una de las más antiguas e influyentes cooperativas de América del Sur — modelo estudiado en universidades de gestión y desarrollo rural de todo el mundo." },
    { text: "En Filadelfia coexisten cuatro idiomas: alemán, plautdietsch (dialecto menonita), español y guaraní — probablemente el lugar con mayor diversidad lingüística por habitante de América del Sur." },
    { text: "Los quesos y lácteos producidos en Filadelfia son reconocidos como los mejores de Paraguay — exportados a todo el país desde una ciudad en medio del desierto." },
    { text: "La ciudad posee arquitectura que recuerda a una pequeña ciudad de Europa Central — un choque visual impresionante para quien llega tras horas cruzando el Chaco árido." },
    { text: "Durante la Guerra del Chaco (1932–1935), la comunidad menonita ayudó logísticamente al ejército paraguayo — episodio que consolidó la relación de confianza con el Estado paraguayo." },
    { text: "El Museo Jakob Unger preserva uno de los acervos históricos más completos sobre la inmigración menonita en América del Sur — testimonio único de una de las migraciones más improbables de la historia." },
    { text: "La Ruta Bioceánica PY-15 pasa por Filadelfia, transformándola de ciudad aislada en el desierto a eslabón estratégico del corredor logístico entre el Atlántico y el Pacífico." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-lime-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("filadelfia");
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
                            alt="Infográfico editorial Filadelfia"
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
                            alt="Infográfico editorial Filadelfia"
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

export default function FiladelfiePage() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Departamento Boquerón"
                name={{ first: "Filadelfia", second: "" }}
                tagline="Colonia menonita que transformó el desierto del Chaco en polo agroindustrial."
                scene="chaco"
                image="/cities/filadelfia.jpg"
                accentColor="#84cc16"
                stats={[
                    { label: "Habitantes (estimación)", value: 14000 },
                    { label: "Fundación Menonita", value: 1930 },
                    { label: "Idiomas hablados", value: 4 },
                    { label: "Km de Asunción", value: 480, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Filadelfia</SectionLabel>
                        <SectionTitle>
                            Donde Europa floreció en el{" "}
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                corazón del Chaco
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Filadelfia es una de las ciudades más singulares de América del Sur. Construida por inmigrantes
                            menonitas que huyeron de persecuciones en Europa, transformó el Chaco árido en uno de los
                            ejemplos más impresionantes de{" "}
                            <strong className="text-primary-700">cooperativismo, resiliencia e identidad cultural</strong>{" "}
                            del continente. Quesos europeos, molinos en el horizonte y tereré en las ruedas — Filadelfia
                            no deja de sorprender.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: "Cooperativismo",
                                text: "La Cooperativa Fernheim es el modelo que transformó el Chaco. Lácteos, agricultura, educación e infraestructura — todo construido colectivamente por una comunidad que rechazó el aislamiento.",
                                color: "from-lime-50 to-green-50",
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Globe,
                                title: "Identidad Europea",
                                text: "Arquitectura, gastronomía, lengua y valores de Europa Central preservados en medio del Chaco. Cuatro idiomas conviven en las calles — alemán, plautdietsch, español y guaraní.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Compass,
                                title: "Portal Bioceánico",
                                text: "La Ruta PY-15 atraviesa Filadelfia, conectándola al Corredor Bioceánico. De ciudad aislada en el desierto al eslabón estratégico entre el Atlántico y el Pacífico.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>De Europa al Corazón del Chaco</SectionLabel>
                        <SectionTitle light>
                            Un viaje de{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                fe y transformación
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Filadelfia fue construida capa a capa — por inmigrantes que llegaron sin nada y
                            crearon uno de los ejemplos más extraordinarios de desarrollo humano de América del Sur.
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

            {/* ── COOPERATIVA SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-900/15 via-transparent to-green-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-lime-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(132,204,22,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(34,197,94,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/20 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-lime-400 uppercase tracking-widest">
                                        Modelo Continental
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cooperativa Fernheim
                                    <br />
                                    <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                        El milagro del Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    La Cooperativa Fernheim es el corazón económico y social de Filadelfia. Fundada por
                                    los primeros colonizadores menonitas, construyó escuelas, hospitales, carreteras y
                                    una industria lechera reconocida en todo Paraguay. Su modelo de gestión
                                    colectiva es estudiado como referencia de desarrollo sostenible en América del Sur.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Lácteos", val: "Nº 1 PY", sub: "Quesos y derivados" },
                                        { label: "Idiomas", val: "4", sub: "Alemán · Plautdietsch · ES · Guaraní" },
                                        { label: "Ruta", val: "PY-15", sub: "Corredor Bioceánico" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-lime-500/10">
                                            <div className="text-2xl font-bold text-lime-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-lime-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Europa en el Chaco</SectionLabel>
                        <SectionTitle light>
                            Cultura{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                menonita e identidad
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: BookOpen,
                                title: "Preservación Histórica",
                                text: "Museo Jakob Unger, iglesias históricas y documentos que preservan la memoria de la inmigración — uno de los acervos más completos sobre menonitas en América del Sur.",
                                accent: "text-lime-400",
                                iconBg: "bg-lime-500/15",
                                border: "border-lime-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Plurilingüismo",
                                text: "Alemán, plautdietsch, español y guaraní conviven en las calles, escuelas y mercados. Filadelfia es un laboratorio vivo de coexistencia cultural en el Chaco.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Trabajo Colectivo",
                                text: "La ética del trabajo menonita transformó el Chaco en símbolo de prosperidad. Organización, disciplina y cooperación como valores fundadores transmitidos a las nuevas generaciones.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Multiculturalismo",
                                text: "Menonitas europeos, pueblos Nivaclé y Enlhet, paraguayos y migrantes — Filadelfia integró culturas distintas en una identidad nueva y singular, típica del Chaco.",
                                accent: "text-yellow-400",
                                iconBg: "bg-yellow-500/15",
                                border: "border-yellow-500/20",
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
                        <SectionLabel>Un Encuentro entre Europa y Paraguay</SectionLabel>
                        <SectionTitle>
                            Gastronomía de{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                dos mundos
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
                                    <div className="w-10 h-10 rounded-2xl bg-lime-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-lime-700" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-lime-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-full">
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
                            3 días{" "}
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                en el Chaco que floreció
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-lime-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                <div className="w-7 h-7 rounded-xl bg-lime-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-lime-400" />
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
                                    "Ruta PY-09 (Transchaco) desde Asunción — ~450 km (4–5h)",
                                    "Ruta PY-15 desde Mariscal Estigarribia o Carmelo Peralta",
                                    "Autobuses regulares de Asunción a Filadelfia vía Transchaco",
                                ],
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Mayo a agosto: invierno templado, ideal para cruces en el Chaco",
                                    "Junio y julio: temperatura agradable, campos más verdes",
                                    "Evitar diciembre–febrero: calor extremo (+45°C) y carreteras difíciles",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Guaraní paraguayo — cambio disponible en la ciudad",
                                    "Hoteles e infraestructura más desarrollados que otras ciudades del Chaco",
                                    "Mercados con quesos, embutidos y productos de la cooperativa",
                                ],
                                accent: "text-amber-700",
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
                    style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/12 rounded-full blur-[90px]" />
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
                            Filadelfia te espera
                        </h2>
                        <p className="text-lime-200/70 text-lg max-w-xl mx-auto mb-10">
                            El alma europea del Chaco Paraguayo. Donde el cooperativismo transformó el desierto
                            en ejemplo y el aislamiento se convirtió en integración continental.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-2xl hover:bg-green-50 transition-colors text-sm"
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
