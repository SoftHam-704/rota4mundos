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
    Plane, Shield,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Siglo XX — Origen",
        icon: Shield,
        title: "López de Filippis — El Puesto Militar",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Mariscal Estigarribia nació como puesto militar en una de las regiones más aisladas de Paraguay, entonces conocida como López de Filippis. El aislamiento extremo y el calor implacable del Chaco forjaron desde el principio una identidad de resistencia y superación que define a la ciudad hasta hoy.",
        symbol: "Fortines Históricos del Chaco",
    },
    {
        era: "1932–1935",
        icon: Star,
        title: "La Guerra del Chaco y la Resistencia Nacional",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Entre 1932 y 1935, Paraguay y Bolivia disputaron el control del Chaco Boreal en uno de los mayores conflictos de América del Sur. Los soldados enfrentaron calor extremo, escasez de agua y condiciones brutales. La victoria paraguaya consolidó la ocupación del Chaco y moldeó profundamente la identidad regional — memoria viva en fortines, cementerios y museos.",
        symbol: "Cementerios y Fortines de la Guerra del Chaco",
    },
    {
        era: "Renombramiento",
        icon: Compass,
        title: "Homenaje al Mariscal Estigarribia",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "La ciudad fue renombrada en homenaje al Mariscal José Félix Estigarribia — héroe nacional de la Guerra del Chaco, estratega militar de renombre y símbolo mayor de la resistencia paraguaya. Su nombre transformó el antiguo puesto en un monumento vivo de la identidad chaqueña.",
        symbol: "Monumento al Mariscal José Félix Estigarribia",
    },
    {
        era: "Hoy",
        icon: Globe,
        title: "Eje de la Ruta Bioceánica PY-15",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Mariscal Estigarribia está en el cruce de la Ruta PY-15 (Corredor Bioceánico) con la Ruta PY-09 (Transchaco). Esa posición la transforma en centro logístico, punto de abastecimiento y eje industrial futuro — parada obligatoria de los grandes cruces entre el Atlántico y el Pacífico.",
        symbol: "Cruce PY-15 + PY-09 — Punto Cero del Chaco",
    },
];

const attractions = [
    { name: "Parque Nacional Tte. Agripino Enciso", icon: Mountain, desc: "Tesoros naturales del Chaco Seco: flora xerófila, dunas, senderos históricos y vestigios de la Guerra del Chaco preservados en paisaje intacto.", badge: "Naturaleza" },
    { name: "Museo Histórico Militar y Misionero", icon: Shield, desc: "Memoria viva de la Guerra del Chaco y de las misiones religiosas que marcaron la ocupación de la región. Uno de los acervos más significativos del interior paraguayo.", badge: "Historia" },
    { name: "Aeropuerto Dr. Luis María Argaña", icon: Plane, desc: "Uno de los aeropuertos más grandes de Paraguay en extensión de pista. Infraestructura estratégica que refuerza la importancia logística y el potencial de integración internacional.", badge: "Logística" },
    { name: "Lago de la Sexta División", icon: Waves, desc: "Espejo de agua en medio del Chaco árido — refugio natural que contrasta con la inmensidad seca de la región y ofrece un paisaje contemplativo único.", badge: "Naturaleza" },
    { name: "Iglesia San Miguel y Catedral", icon: Star, desc: "La Iglesia San Miguel y la Catedral Santa María guardan la memoria religiosa y arquitectónica de la colonización del Chaco, con rasgos de las misiones históricas.", badge: "Cultura" },
    { name: "Fortines de la Guerra del Chaco", icon: Shield, desc: "Antiguas estructuras militares diseminadas por el Chaco — testigos silenciosos de una de las guerras más intensas de América del Sur del siglo XX.", badge: "Patrimonio" },
    { name: "Comunidades Indígenas", icon: Globe, desc: "Los pueblos Nivaclé, Ayoreo, Guaraní Occidental y Sanapaná preservan artesanía, medicina natural y tradiciones espirituales ancestrales a pocos kilómetros del centro.", badge: "Cultura" },
    { name: "Puesta de Sol en el Chaco", icon: Camera, desc: "El polvo rojizo, el cielo dorado y los árboles retorcidos crean uno de los espectáculos visuales más impactantes de América del Sur — imposible olvidar.", badge: "Experiencia" },
];

const dishes = [
    { name: "Sopa Paraguaya", icon: Utensils, desc: "Plato tradicional hecho con maíz, queso y mucho sabor — emblema de la gastronomía paraguaya presente en todas las mesas del interior del país.", tag: "Tradición" },
    { name: "Chipa", icon: Utensils, desc: "Pan de queso paraguayo, horneado en horno de barro. En el Chaco se consume caliente en el desayuno, en el campo y durante los cruces.", tag: "Cotidiano" },
    { name: "Carnes Asadas del Chaco", icon: Flame, desc: "Cortes preparados lentamente a las brasas o fuego de tierra. La ganadería extensiva del Chaco produce carnes de sabor intenso y auténtico.", tag: "Chaco" },
    { name: "Platos Rurales del Campo", icon: Utensils, desc: "Recetas del interior paraguayo transmitidas entre generaciones: caldos, guisos, mandioca e ingredientes de la tierra que alimentaron a quienes construyeron el Chaco.", tag: "Interior" },
    { name: "Tereré", icon: Leaf, desc: "Identidad nacional en un guampa. En el Chaco, el tereré es aún más esencial — refresca, une y marca cada pausa de la vida árida del interior.", tag: "Ritual" },
    { name: "Cocina Indígena", icon: Leaf, desc: "Recetas de los pueblos Nivaclé, Ayoreo y Sanapaná con ingredientes nativos del Chaco: frutos, raíces y hierbas con siglos de historia y sabiduría.", tag: "Ancestral" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Historia y Cultura",
        morning: "Visita al Museo Histórico Militar y Misionero. Recorrer la memoria de la Guerra del Chaco — fortines, reliquias y narrativas de una batalla que moldeó Paraguay.",
        afternoon: "Iglesia San Miguel y Catedral Santa María. Centro de la ciudad, plaza principal y contacto con la arquitectura histórica de la colonización del Chaco.",
        evening: "Puesta de sol en el Chaco — el espectáculo del cielo dorado sobre la inmensidad árida. Cena con sopa paraguaya, chipa y tereré en rueda con habitantes locales.",
        color: "from-amber-600 to-orange-700",
        icon: Shield,
    },
    {
        day: "Día 2",
        theme: "Naturaleza y Aventura",
        morning: "Parque Nacional Tte. Agripino Enciso: senderos históricos, flora xerófila, dunas y vestigios de la guerra. Uno de los pocos parques nacionales del Chaco Seco.",
        afternoon: "Lago de la Sexta División — paseo contemplativo y observación de fauna. Aves adaptadas al clima extremo, vegetación resistente y silencio absoluto.",
        evening: "Cielo estrellado en el Chaco — sin contaminación lumínica, uno de los más impresionantes de América del Sur. Experiencia de inmensidad que pocos viajeros conocen.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Día 3",
        theme: "Pueblos y Sabores",
        morning: "Visita a comunidades indígenas Nivaclé o Ayoreo: artesanía en fibras naturales, medicina tradicional y cosmovisión ancestral ligada al territorio chaqueño.",
        afternoon: "Gastronomía del Chaco: carnes asadas, platos rurales y cocina indígena. Compras de artesanía local — piezas únicas que llevan la historia de los pueblos del Chaco.",
        evening: "Cruce PY-15 + PY-09 al atardecer — el punto donde dos grandes corredores del continente se encuentran. Mariscal Estigarribia queda para siempre.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Mariscal Estigarribia está en el cruce exacto de la Ruta PY-15 (Corredor Bioceánico) con la Ruta PY-09 (Transchaco) — convirtiéndola en el nodo logístico más estratégico del interior paraguayo." },
    { text: "El Aeropuerto Dr. Luis María Argaña posee una de las pistas más largas de Paraguay — infraestructura heredada de la Segunda Guerra Mundial, cuando los EE.UU. usaron el Chaco como base de apoyo." },
    { text: "La ciudad fue originalmente llamada López de Filippis y fue renombrada Mariscal Estigarribia en homenaje al héroe de la Guerra del Chaco, José Félix Estigarribia." },
    { text: "El Parque Nacional Tte. Agripino Enciso es uno de los únicos parques nacionales del Chaco Paraguayo Seco — protegiendo fauna y flora adaptadas a condiciones climáticas extremas." },
    { text: "Los pueblos Nivaclé, Ayoreo, Guaraní Occidental y Sanapaná habitan la región desde hace milenios, con saberes ancestrales sobre el Chaco que ninguna ciencia moderna ha logrado replicar." },
    { text: "El Chaco Paraguayo es uno de los territorios con menor densidad demográfica de América del Sur — y uno de los biomas más biodiversos del planeta, a pesar de su apariencia árida." },
    { text: "Mariscal Estigarribia registra temperaturas entre -5°C en invierno y +45°C en verano — una de las mayores amplitudes térmicas de América del Sur en una sola ciudad." },
    { text: "Con la plena operación del Corredor Bioceánico, la ciudad tiende a transformarse en polo de logística, hotelería y servicios — un crecimiento sin precedentes para una región que siempre vivió en el aislamiento." },
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
    const src = useInfographic("mariscal-estigarribia");
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
                            alt="Infográfico editorial Mariscal Estigarribia"
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

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Departamento Boquerón"
                name={{ first: "Mariscal", second: "Estigarribia" }}
                tagline="Nuevo polo logístico del Chaco — cruce estratégico entre la ruta bioceánica y la Transchaco."
                scene="chaco"
                image="/cities/mariscal_estigarribia.jpg"
                accentColor="#a78bfa"
                stats={[
                    { label: "Habitantes (estimación)", value: 8000 },
                    { label: "Km de Asunción", value: 500, suffix: " km" },
                    { label: "% Indígena", value: 65, suffix: "%" },
                    { label: "Km de Carmelo Peralta", value: 270, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Mariscal Estigarribia</SectionLabel>
                        <SectionTitle>
                            Donde la resistencia encuentra{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
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
                            Mariscal Estigarribia es el corazón del Chaco Paraguayo. Moldeada por la Guerra del Chaco,
                            habitada por pueblos indígenas y posicionada en el cruce estratégico de las rutas bioceánicas,
                            representa la{" "}
                            <strong className="text-primary-700">esencia de un territorio que vivió en el aislamiento
                            y ahora se prepara para conectar océanos</strong>. Horizontes infinitos, puesta de sol
                            cinematográfica y una historia de resistencia que pocos lugares del continente conocen.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Compass,
                                title: "Eje Bioceánico",
                                text: "Cruce de la Ruta PY-15 (Corredor Bioceánico) con la Ruta PY-09 (Transchaco) — posición estratégica que convertirá a la ciudad en polo logístico entre los dos océanos.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Shield,
                                title: "Memoria de la Guerra",
                                text: "Fortines, museos, cementerios y senderos históricos de la Guerra del Chaco (1932–1935) — una de las batallas más brutales de América del Sur, que definió el destino de Paraguay.",
                                color: "from-red-50 to-rose-50",
                                accent: "text-red-700",
                                iconBg: "bg-red-100",
                            },
                            {
                                icon: Globe,
                                title: "Pueblos del Chaco",
                                text: "Nivaclé, Ayoreo, Guaraní Occidental y Sanapaná preservan sabiduría ancestral. Artesanía, medicina natural y cosmovisión ligada al territorio forman una identidad única.",
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
                        <SectionLabel>Tierra de Resistencia y Superación</SectionLabel>
                        <SectionTitle light>
                            De la Guerra del Chaco al{" "}
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
                            Mariscal Estigarribia fue construida en capas de batalla, aislamiento y estrategia.
                            Del puesto militar al nodo logístico continental — cada período dejó huellas imborrables
                            en la identidad chaqueña.
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
                                        Posición Estratégica
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cruce PY-15 + PY-09
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        El punto cero del Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Mariscal Estigarribia está en el cruce de la Ruta PY-15 — eje del Corredor Bioceánico
                                    que une el Atlántico con el Pacífico — con la Ruta PY-09, la Transchaco, principal arteria
                                    norte-sur de Paraguay. Esa posición única la transforma en polo logístico inevitable
                                    de la integración sudamericana.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Ruta Bioceánica", val: "PY-15", sub: "Atlántico → Pacífico" },
                                        { label: "Transchaco", val: "PY-09", sub: "Norte-Sur de Paraguay" },
                                        { label: "Aeropuerto", val: "Argaña", sub: "Una de las pistas más largas del PY" },
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
                                Naturaleza extrema y{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    biodiversidad escondida
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                El Chaco parece árido, pero esconde una biodiversidad extraordinaria. Fauna adaptada
                                al clima extremo, parques nacionales preservados y un cielo estrellado que solo quien
                                vivió lejos de la ciudad puede imaginar. La inmensidad del Chaco no asusta — libera.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Oso hormiguero", icon: "🦣" },
                                    { label: "Guacamayos", icon: "🦜" },
                                    { label: "Puma", icon: "🐆" },
                                    { label: "Tatú", icon: "🦔" },
                                    { label: "Yacaré", icon: "🐊" },
                                    { label: "Ciervo", icon: "🦌" },
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
                                        { title: "Chaco Seco", desc: "Vegetación xerófila, dunas y clima extremo que forjaron la identidad más resistente de América del Sur.", color: "from-amber-900/60 to-orange-900/60", accent: "text-amber-400" },
                                        { title: "Parque Enciso", desc: "Flora nativa, senderos históricos y vestigios de la guerra en uno de los únicos parques nacionales del Chaco Paraguayo.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Cielo Estrellado", desc: "Sin contaminación lumínica, el Chaco ofrece una de las vistas del cielo nocturno más espectaculares del continente.", color: "from-indigo-900/60 to-blue-900/60", accent: "text-indigo-400" },
                                        { title: "Puesta de Sol", desc: "Polvo rojo, cielo dorado y quebracho retorcido — uno de los fenómenos visuales más cinematográficos de América del Sur.", color: "from-red-900/50 to-orange-900/50", accent: "text-red-400" },
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
                        <SectionLabel>Identidad Chaqueña</SectionLabel>
                        <SectionTitle light>
                            Cultura de{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                resistencia y raíz
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Shield,
                                title: "Tradición Militar",
                                text: "La memoria de la Guerra del Chaco impregna cada calle, monumento y conversación. Orgullo nacional expresado en museos, fortines y cementerios históricos.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Pueblos Originarios",
                                text: "Nivaclé, Ayoreo, Guaraní Occidental y Sanapaná — culturas ancestrales con artesanía, medicina natural y espiritualidad ligada al Chaco.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Guaraní en el Chaco",
                                text: "Español, guaraní y dialectos indígenas conviven en las calles. La lengua guaraní es identidad viva — hablada en el campo, en el mercado y en casa.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Vida Rural",
                                text: "La vida en el Chaco tiene ritmo propio — lento, fuerte y ligado a la tierra. Ganadería, campo abierto y hospitalidad sencilla marcan el cotidiano de la ciudad.",
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
                        <SectionLabel>Sabores del Interior</SectionLabel>
                        <SectionTitle>
                            Gastronomía del{" "}
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
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                en el corazón del Chaco
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Ruta PY-09 (Transchaco) desde Asunción — ~500 km (5–6h)",
                                    "Acceso por la Ruta PY-15 desde Carmelo Peralta y la frontera con Brasil",
                                    "Aeropuerto Dr. Luis María Argaña: vuelos domésticos ocasionales",
                                ],
                                accent: "text-amber-600",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Mayo a agosto: invierno del Chaco, temperaturas templadas (10–25°C)",
                                    "Evitar diciembre–marzo: calor extremo superior a 40°C y lluvias intensas",
                                    "Julio es ideal para turismo histórico y senderos en el Parque Enciso",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Compass,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Guaraní paraguayo",
                                    "Llevar agua en abundancia — el Chaco es árido y el calor es extremo",
                                    "Combustible y provisiones: abastecer antes de entrar al Chaco profundo",
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
                            Mariscal Estigarribia te espera
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            El corazón del Chaco y el portal del cruce continental.
                            Una ciudad moldeada por la guerra, la resistencia y el futuro de la integración sudamericana.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
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
