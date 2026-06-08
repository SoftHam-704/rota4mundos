import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
    Anchor, Globe,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Siglo XIX",
        icon: Compass,
        title: "La Guerra del Chaco y la Formación del Territorio",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "La región de Carmelo Peralta fue escenario de los conflictos de la Guerra del Chaco (1932–1935), uno de los mayores enfrentamientos militares de América del Sur entre Paraguay y Bolivia. Ese período forjó la identidad chaqueña — resistencia, superación y el orgullo de un pueblo que defendió su territorio en las condiciones más extremas del continente.",
        symbol: "Memoria de la Guerra del Chaco",
    },
    {
        era: "Década de 1940",
        icon: Star,
        title: "Fortalecimiento y Ocupación del Norte",
        color: "from-violet-600 to-purple-700",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "Con el fortalecimiento de la presencia paraguaya en el Chaco después de la guerra, la región recibió nuevos núcleos poblacionales e instalaciones militares. La ocupación fue gradual, pero marcó definitivamente el desarrollo del norte paraguayo — impulsando rutas, comercios y asentamientos a orillas del Río Paraguay.",
        symbol: "Fortines Históricos del Chaco",
    },
    {
        era: "1955",
        icon: ArrowRight,
        title: "Creación del Distrito en Honor al Capitán",
        color: "from-indigo-600 to-violet-700",
        accent: "text-indigo-400",
        border: "border-indigo-500/30",
        body: "El 12 de junio de 1955 se creó el Distrito de Carmelo Peralta, nombre dado en homenaje al Capitán Carmelo Peralta — aviador militar paraguayo y héroe nacional. El nombre lleva consigo valentía, patriotismo y la memoria viva de la ocupación histórica del territorio chaqueño.",
        symbol: "Capitán Carmelo Peralta — Héroe Nacional",
    },
    {
        era: "1960 → Hoy",
        icon: Globe,
        title: "De Municipio Aislado al Portal Continental",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "En 1960, Carmelo Peralta fue elevada a la categoría de municipio. Desde entonces, crece como centro estratégico del norte paraguayo. Con la construcción del Puente Bioceánico sobre el Río Paraguay — conectándola a Porto Murtinho/MS — la ciudad se transforma en el portal del Corredor Bioceánico Sudamericano.",
        symbol: "Puente Bioceánico — Símbolo de la Integración",
    },
];

const attractions = [
    { name: "Puente Bioceánico", icon: Anchor, desc: "El símbolo máximo de la integración sudamericana. El puente sobre el Río Paraguay conecta Carmelo Peralta con Porto Murtinho/MS e inaugura el Corredor Bioceánico al Pacífico.", badge: "Integración" },
    { name: "Río Paraguay", icon: Waves, desc: "Paseos fluviales, pesca deportiva y la contemplación de uno de los ríos más majestuosos de América del Sur. Al amanecer, el río refleja el cielo dorado del Chaco.", badge: "Naturaleza" },
    { name: "Pantanal Paraguayo", icon: Trees, desc: "Acceso privilegiado a una de las mayores áreas húmedas del planeta. Fauna exuberante, ríos y vegetación nativa en un estado casi intacto.", badge: "Ecoturismo" },
    { name: "Observación de Aves", icon: Camera, desc: "Tuiuiús, guacamayos, garzas y especies migratorias en abundancia. El cielo de Carmelo Peralta es frecuentemente tomado por vuelos de aves coloridas.", badge: "Fauna" },
    { name: "Cultura Indígena", icon: Compass, desc: "Presencia histórica de los pueblos Ayoreo y Chamacoco — culturas ancestrales con profundo conocimiento de los ríos, la fauna y la espiritualidad del Chaco.", badge: "Patrimonio" },
    { name: "Chaco Paraguayo", icon: Mountain, desc: "Paisajes de vastedad impresionante, calor intenso durante el día y un cielo estrellado por la noche que transforma la experiencia en un espectáculo natural.", badge: "Aventura" },
    { name: "Pesca Deportiva", icon: Fish, desc: "Pacú, dorado y surubí en las aguas del Río Paraguay. Tradición ribereña que ancla la identidad cultural y económica de la región.", badge: "Deporte" },
    { name: "Frontera Brasil-Paraguay", icon: Globe, desc: "Experiencia de integración cultural única: portugués, español y guaraní conviven en las calles, el comercio y la hospitalidad del pueblo fronterizo.", badge: "Cultura" },
];

const dishes = [
    { name: "Sopa Paraguaya", icon: Utensils, desc: "Plato tradicional hecho con maíz, queso y mucho sabor. Uno de los emblemas de la gastronomía paraguaya, presente en todas las mesas de Carmelo Peralta.", tag: "Tradición" },
    { name: "Chipa", icon: Utensils, desc: "Pan de queso típico paraguayo, presente en todas las familias y celebraciones. Se consume caliente, directo del horno de barro, acompañado de tereré.", tag: "Cotidiano" },
    { name: "Pescados del Pantanal", icon: Fish, desc: "Peces de agua dulce preparados con condimentos regionales. Pacú, dorado y surubí llegan frescos directamente del Río Paraguay.", tag: "Río" },
    { name: "Carnes Chaqueñas", icon: Flame, desc: "Preparadas lentamente, conservando sabores intensos del Chaco. Herencia de la ganadería extensiva y la cultura de los domadores del norte paraguayo.", tag: "Chaco" },
    { name: "Tereré", icon: Leaf, desc: "Mucho más que una bebida — representa convivencia, amistad e identidad cultural paraguaya. Compartido en ruedas, expresa la hospitalidad chaqueña.", tag: "Ritual" },
    { name: "Gastronomía Fronteriza", icon: Utensils, desc: "Rica mezcla de sabores paraguayos y brasileños: mandioca, maíz, queso y recetas ribereñas que cruzan fronteras sin perder autenticidad.", tag: "Fusión" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Frontera e Integración",
        morning: "Contemplación del Puente Bioceánico — el símbolo mayor de la integración sudamericana. Caminata por las orillas del Río Paraguay y registro fotográfico al amanecer.",
        afternoon: "Paseo por el centro histórico, Plaza Central y monumentos. Visita al Museo de la Guerra del Chaco y contacto con la identidad chaqueña.",
        evening: "Gastronomía local: sopa paraguaya, chipa y tereré. Puesta de sol sobre el Río Paraguay — uno de los espectáculos más cinematográficos de América del Sur.",
        color: "from-violet-600 to-purple-700",
        icon: Anchor,
    },
    {
        day: "Día 2",
        theme: "Naturaleza y Aventura",
        morning: "Paseo fluvial por el Río Paraguay — observación de fauna, yacarés, carpinchos y tuiuiús. Fotografía de naturaleza al amanecer, cuando el silencio del agua es absoluto.",
        afternoon: "Incursión al Pantanal Paraguayo: vegetación nativa, aves migratorias y paisajes preservados. Visita a comunidades ribereñas y contacto con la cultura local.",
        evening: "Observación del cielo estrellado en el Chaco — sin contaminación lumínica, es uno de los más impresionantes de América del Sur. Cena con pescados del Paraguay.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Día 3",
        theme: "Cultura y Sabores",
        morning: "Cultura indígena: visita a comunidades Ayoreo o Chamacoco. Artesanía en cuero, madera, fibras y artes nativas con tradiciones ancestrales del Chaco.",
        afternoon: "Gastronomía chaqueña: carnes lentas, sopa paraguaya y chipa artesanal. Compras en el comercio local y cruce a Porto Murtinho/MS — experiencia única de integración.",
        evening: "Despedida en las orillas del Río Paraguay. Carmelo Peralta queda — portal entre dos océanos y guardiana del futuro continental.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Carmelo Peralta lleva el nombre del Capitán Carmelo Peralta, aviador militar paraguayo considerado héroe nacional — símbolo de valentía y ocupación del Chaco." },
    { text: "El Puente Bioceánico sobre el Río Paraguay conecta Carmelo Peralta con Porto Murtinho/MS, inaugurando el corredor logístico entre el Atlántico y el Pacífico." },
    { text: "La ciudad es conocida como 'La Puerta del Pantanal' — punto de entrada privilegiado a una de las mayores áreas húmedas del planeta." },
    { text: "El Chaco Paraguayo registra algunas de las temperaturas más altas de América del Sur — y también algunos de los paisajes más vastos y preservados del continente." },
    { text: "Los pueblos Ayoreo y Chamacoco habitan la región desde hace siglos, con conocimientos ancestrales sobre los ríos, la fauna y los ciclos naturales del Chaco y el Pantanal." },
    { text: "Creada como distrito en 1955 y municipio en 1960, Carmelo Peralta es una de las ciudades más jóvenes de Paraguay — pero con una de las historias más densas del Chaco." },
    { text: "La frontera entre Carmelo Peralta y Porto Murtinho es uno de los puntos de confluencia cultural más ricos de América del Sur: guaraní, portugués y español coexisten en las calles." },
    { text: "Con la plena operación del Corredor Bioceánico, Carmelo Peralta está destinada a convertirse en uno de los nodos logísticos más estratégicos entre Brasil, Paraguay, Argentina y Chile." },
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
    const src = useInfographic("carmelo-peralta");
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
                            alt="Infográfico editorial Carmelo Peralta"
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

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Departamento Alto Paraguay"
                name={{ first: "Carmelo", second: "Peralta" }}
                tagline="Primera ciudad paraguaya — al otro lado del puente bioceánico, el Chaco comienza aquí."
                scene="chaco"
                image="/cities/carmelo_peralta.jpg"
                accentColor="#818cf8"
                stats={[
                    { label: "Habitantes (Censo 2022)", value: 18926 },
                    { label: "Fundación", value: 1955 },
                    { label: "Km de Asunción", value: 670, suffix: " km" },
                    { label: "Km a Mariscal Estigarribia", value: 270, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Carmelo Peralta</SectionLabel>
                        <SectionTitle>
                            Donde el Chaco encuentra{" "}
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                                el futuro continental
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Carmelo Peralta es mucho más que una ciudad fronteriza. Ubicada a orillas del Río
                            Paraguay, en la transición entre el Pantanal y el Chaco, representa integración continental,
                            conexión entre pueblos y{" "}
                            <strong className="text-primary-700">el inicio del Corredor Bioceánico hacia el Pacífico</strong>.
                            Con el Puente Bioceánico, esta pequeña ciudad del norte paraguayo se convirtió en uno de los puntos
                            más estratégicos de América del Sur.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Portal Bioceánico",
                                text: "El Puente Bioceánico conecta Carmelo Peralta con Porto Murtinho/MS, convirtiéndola en el primer nodo paraguayo del corredor logístico que une el Atlántico con el Pacífico.",
                                color: "from-violet-50 to-indigo-50",
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Trees,
                                title: "Pantanal Preservado",
                                text: "Acceso privilegiado al Pantanal Paraguayo — una de las mayores zonas húmedas del planeta, con fauna exuberante y paisajes de una naturaleza aún casi intacta.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Cultura Fronteriza",
                                text: "Portugués, español y guaraní conviven en las calles. La influencia de los pueblos Ayoreo y Chamacoco, la hospitalidad chaqueña y la gastronomía ribereña forman una identidad única.",
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
                        <SectionLabel>Raíces de valentía y superación</SectionLabel>
                        <SectionTitle light>
                            De la Guerra del Chaco al{" "}
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
                            Carmelo Peralta fue construida en capas de resistencia, patriotismo y estrategia.
                            De la guerra que definió fronteras al puente que conecta océanos — cada período dejó
                            huellas visibles en la identidad del pueblo chaqueño.
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
                                        Hito Histórico
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    El Puente Bioceánico
                                    <br />
                                    <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                        y el futuro de la ruta
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    El Puente Bioceánico sobre el Río Paraguay — conectando Carmelo Peralta con Porto Murtinho/MS —
                                    es el símbolo más poderoso de la integración sudamericana. Forma parte del Corredor
                                    Bioceánico que unirá Brasil, Paraguay, Argentina y Chile, creando una ruta
                                    directa entre el Océano Atlántico y el Océano Pacífico.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Extensión del puente", val: "~1,7 km", sub: "Sobre el Río Paraguay" },
                                        { label: "Inicio de la Ruta", val: "PY-15", sub: "Ruta bioceánica paraguaya" },
                                        { label: "Destino", val: "Pacífico", sub: "Vía Argentina y Chile" },
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
                            <SectionLabel>Naturaleza Preservada</SectionLabel>
                            <SectionTitle>
                                Entre el Pantanal y{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    el Chaco Salvaje
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                Carmelo Peralta está posicionada exactamente en la transición entre dos de los ecosistemas
                                más fascinantes del planeta. El Pantanal Paraguayo ofrece áreas inundadas, fauna
                                exuberante y ríos de rara belleza. El Chaco impresiona por su vastedad, el cielo estrellado
                                y la resistencia de una naturaleza que desafía cualquier extremo.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Tuiuiús", icon: "🦢" },
                                    { label: "Guacamayos", icon: "🦜" },
                                    { label: "Jaguar", icon: "🐆" },
                                    { label: "Yacarés", icon: "🐊" },
                                    { label: "Carpincho", icon: "🦫" },
                                    { label: "Dorado", icon: "🐟" },
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
                                        { title: "Pantanal Paraguayo", desc: "Una de las mayores áreas húmedas del planeta, con fauna y flora en estado bruto.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Río Paraguay", desc: "Eje vital de la región — pesca, paseos y contemplación del mayor río del Chaco.", color: "from-blue-900/60 to-cyan-900/60", accent: "text-blue-400" },
                                        { title: "Chaco Paraguayo", desc: "Horizontes infinitos, calor intenso, noche estrellada — paisaje que libera.", color: "from-amber-900/50 to-orange-900/50", accent: "text-amber-400" },
                                        { title: "Fauna Exuberante", desc: "Guacamayos, tuiuiús, yacarés, jaguares y especies de aves que encantan a cualquier visitante.", color: "from-violet-900/50 to-purple-900/50", accent: "text-violet-400" },
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
                        <SectionLabel>Un Encuentro de Pueblos y Tradiciones</SectionLabel>
                        <SectionTitle light>
                            Cultura{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                fronteriza
                            </span>{" "}
                            y genuina
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Globe,
                                title: "Identidad Chaqueña",
                                text: "La cultura del Chaco está presente en la música, las danzas, la lengua guaraní y las tradiciones del pueblo.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Star,
                                title: "Influencia Indígena",
                                text: "Tierra de los pueblos Ayoreo y Guaraní, cuyos costumbres y saberes ancestrales permanecen vivos.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Vida Ribereña",
                                text: "El Río Paraguay moldea el modo de vida, la pesca, el comercio y las celebraciones cotidianas.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
                            },
                            {
                                icon: Music,
                                title: "Hospitalidad",
                                text: "Carmelo Peralta recibe con sencillez, alegría y una sonrisa que representa el corazón del Chaco.",
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
                        <SectionLabel>Sabores que Cuentan Historias</SectionLabel>
                        <SectionTitle>
                            Gastronomía del{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Paraguay y el Pantanal
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
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días{" "}
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                                inolvidables
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que?</SectionLabel>
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Cruce por el Puente Bioceánico desde Porto Murtinho/MS (Brasil)",
                                    "Acceso por la Ruta PY-15 desde Asunción (~670 km)",
                                    "Aeropuerto más cercano: Asunción (vuelos a Campo Grande/MS)",
                                ],
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Abril a septiembre: clima más templado, ideal para el Chaco",
                                    "Julio y agosto: temperatura agradable para paseos y observación de fauna",
                                    "Evitar diciembre–febrero: calor extremo y lluvias en el Chaco",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Phone,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Guaraní paraguayo (se acepta Real en la frontera)",
                                    "Documentación: DNI o pasaporte para el cruce",
                                    "Huso horario: UTC-4 (mismo horario de Campo Grande fuera del horario de verano)",
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
                            Carmelo Peralta te espera
                        </h2>
                        <p className="text-violet-200/70 text-lg max-w-xl mx-auto mb-10">
                            El portal del Pantanal Paraguayo y del Corredor Bioceánico Sudamericano.
                            Una ciudad que conecta continentes, culturas y futuros.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-2xl hover:bg-violet-50 transition-colors text-sm"
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
