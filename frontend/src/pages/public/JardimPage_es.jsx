import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
} from "lucide-react";

/* ─── datos ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Siglo XIX",
        icon: Compass,
        title: "Guerra de la Triple Alianza y la Retirada de la Laguna",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "La región fue escenario de uno de los episodios más destacados de la historia nacional: la Retirada de la Laguna, durante la Guerra del Paraguay. Las tropas brasileñas atravesaron este territorio en una campaña militar que quedó grabada en la memoria colectiva de Mato Grosso do Sul, consolidando la importancia estratégica de las tierras de la Serra da Bodoquena.",
        symbol: "Cementerio de los Héroes de la Guerra del Paraguay",
    },
    {
        era: "Origen",
        icon: Leaf,
        title: "La Hacienda Jardim y el Nombre de la Ciudad",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "El área pertenecía a la Hacienda Jardim, que dio nombre al futuro poblado. La ocupación definitiva ocurrió con el desarrollo de haciendas y rutas comerciales, impulsada por la actividad ganadera y la riqueza natural de la región — ríos cristalinos, cuevas y una biodiversidad que aún hoy encanta a quienes la visitan.",
        symbol: "Hacienda Jardim",
    },
    {
        era: "Década de 1940",
        icon: ArrowRight,
        title: "La CER-3 y la BR-060",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "La llegada de la Comisión de Carreteras (CER-3) para la construcción de la BR-060 fue un divisor de aguas: impulsó el poblado, atrajo nuevas familias y transformó Jardim en punto de paso e integración regional. El Museo de la CER-3, hoy patrimonio de la ciudad, preserva esta memoria viva.",
        symbol: "Museo de la Comisión de Carreteras (CER-3)",
    },
    {
        era: "1948 → 1979",
        icon: Star,
        title: "De Distrito a Municipio",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "En 1948, Jardim era Distrito de Bela Vista. La emancipación político-administrativa en 1979 transformó el distrito en municipio independiente, abriendo camino para el desarrollo del ecoturismo, la ganadería y la consolidación de Jardim como polo regional de la Serra da Bodoquena.",
        symbol: "Plaza Central de Jardim",
    },
];

const attractions = [
    { name: "Lagoa Misteriosa", icon: Waves, desc: "Una de las cavernas inundadas más profundas del mundo. Aguas de claridad absoluta y azul intenso — referencia internacional en buceo y contemplación.", badge: "Buceo" },
    { name: "Rio da Prata", icon: Fish, desc: "Flotación en aguas azul turquesa con visibilidad excepcional. Peces, vegetación subacuática y paisajes preservados en estado natural.", badge: "Flotación" },
    { name: "Buraco das Araras", icon: Camera, desc: "Gran dolina natural que alberga decenas de guacamayas rojas. Una de las postales más impresionantes de la Serra da Bodoquena.", badge: "Fauna" },
    { name: "Serra da Bodoquena", icon: Mountain, desc: "Área de rica biodiversidad con cascadas, senderos, ríos y cuevas. Reconocida internacionalmente por las aguas cristalinas y el ecosistema preservado.", badge: "Naturaleza" },
    { name: "Grutas y Cavernas", icon: Compass, desc: "Formaciones rocosas impresionantes, ideales para exploración y contemplación. La geología calcárea crea escenarios subterráneos únicos.", badge: "Espeleología" },
    { name: "Cascadas y Senderos", icon: Trees, desc: "Escenarios increíbles para quienes buscan aventura y contacto con la naturaleza. Senderos que revelan la fauna y flora del Cerrado y el Pantanal.", badge: "Aventura" },
    { name: "Balnearios Naturales", icon: Waves, desc: "Contacto directo con ríos cristalinos, peces y mata nativa. Opciones para baño, ocio y contemplación en ambiente totalmente preservado.", badge: "Ocio" },
    { name: "Pesca Deportiva", icon: Fish, desc: "Ríos repletos de especies como pacu, pintado y dorado. Excelente para pesca deportiva en ambiente natural y reglamentado.", badge: "Deporte" },
];

const dishes = [
    { name: "Churrasco Pantanero", icon: Flame, desc: "Carnes preparadas en fuego de suelo, herencia de la vida en el campo y las comitivas pantaneras que recorrían la región.", tag: "Fuego de Suelo" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "Tradición regional ligada a las comitivas y al campo. Plato simple y reconfortante, marcante en la identidad culinaria del interior.", tag: "Tradición" },
    { name: "Pescados Regionales", icon: Fish, desc: "Pacu, pintado y dorado — los grandes protagonistas de las mesas de Jardim, capturados en los ríos cristalinos de la Serra da Bodoquena.", tag: "Río" },
    { name: "Chipa", icon: Utensils, desc: "Bocado horneado de almidón y queso con influencia paraguaya. Consumido en el desayuno, la merienda y a cualquier hora del día.", tag: "Frontera" },
    { name: "Tereré", icon: Leaf, desc: "Mucho más que una bebida — símbolo de convivencia, tradición e identidad sul-mato-grossense compartida en ruedas y conversaciones.", tag: "Ritual" },
    { name: "Gastronomía Regional", icon: Utensils, desc: "Mezcla de sabores del Pantanal, la frontera y el interior: mandioca, maíz, queso y recetas heredadas de las familias pioneras.", tag: "Interior" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Historia y Cultura",
        morning: "Visita al Museo de la CER-3 y al centro histórico. Conocer la historia de la construcción de la BR-060 y el papel estratégico de Jardim en la región.",
        afternoon: "Cementerio de los Héroes de la Guerra del Paraguay y monumentos históricos. Recorrido por el centro, artesanía local y plaza principal.",
        evening: "Cena con gastronomía regional, tereré en rueda con habitantes. Sentir el ritmo tranquilo y hospitalario de una ciudad que vive su pasado con orgullo.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Día 2",
        theme: "Naturaleza y Aventura",
        morning: "Flotación en el Rio da Prata — aguas cristalinas azul turquesa, peces mansos y paisaje subacuático de otro mundo.",
        afternoon: "Visita a la Lagoa Misteriosa para buceo o contemplación. Buraco das Araras: las guacamayas rojas en su hábitat natural impresionan a cualquier visitante.",
        evening: "Sendero ecológico al atardecer. Puesta de sol en la Serra da Bodoquena y cena a base de pescado regional.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Día 3",
        theme: "Sabores y Experiencias",
        morning: "Pesca deportiva en los ríos de la región o visita a balneario natural. Contacto directo con la fauna y flora del Cerrado y el Pantanal.",
        afternoon: "Gastronomía regional: churrasco pantanero, arroz carreteiro y chipa. Compras de artesanía en cuero, madera y semillas.",
        evening: "Despedida con puesta de sol en la Serra. Jardim queda para siempre — así como la claridad de sus aguas.",
        color: "from-emerald-600 to-green-700",
        icon: Leaf,
    },
];

const curiosities = [
    { text: "La Lagoa Misteriosa es una de las cavernas inundadas más profundas del mundo — la profundidad total aún no ha sido completamente mapeada." },
    { text: "El Buraco das Araras es una dolina natural donde decenas de guacamayas rojas hacen su nido, visible a simple vista desde el borde." },
    { text: "La región fue ruta estratégica de la Retirada de la Laguna durante la Guerra del Paraguay — uno de los episodios más dramáticos de la historia brasileña." },
    { text: "El Museo de la CER-3 preserva la historia de la construcción de la BR-060, carretera que transformó Jardim en polo regional en el siglo XX." },
    { text: "Jardim integra la Serra da Bodoquena, reconocida internacionalmente como uno de los mayores acuíferos de agua dulce del planeta." },
    { text: "La transparencia de los ríos de la región es resultado del proceso de filtración por la caliza de la Serra da Bodoquena — fenómeno geológico único." },
    { text: "Guacamayas, tucanes, tapires, jaguares y yacarés conviven a pocos kilómetros del centro urbano de Jardim." },
    { text: "Posicionada estratégicamente en la Ruta Bioceánica, Jardim tiene potencial para convertirse en uno de los grandes destinos de ecoturismo internacional del corredor." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3"
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

/* ─── infografía ─────────────────────────────────────────────── */

function InfograficoSection() {
    const src = useInfographic("jardim");
    const [open, setOpen] = useState(false);
    return (
        <>
            <section className="bg-primary-950 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto cursor-zoom-in group"
                        onClick={() => setOpen(true)}
                    >
                        <img src={src} alt="Infografía editorial Jardim" className="w-full h-auto" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Haga clic para ampliar</p>
                </div>
            </section>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.25 }}
                            src={src} alt="Infografía editorial Jardim"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── página ─────────────────────────────────────────────────── */

export default function JardimPageEs() {
    const isMobile = useIsMobile();
    return (
        <div className="min-h-screen">

            {/* ── HERO ── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Jardim", second: "" }}
                tagline="Serra da Bodoquena, lagunas azul esmeralda y la puerta natural entre el Cerrado y el Pantanal."
                scene="pantanal"
                image="/cities/jardim.jpg"
                accentColor="#86efac"
                stats={[
                    { label: "Habitantes (Censo 2022)", value: 27245 },
                    { label: "Fundación", value: 1948 },
                    { label: "Km de Bonito", value: 80, suffix: " km" },
                    { label: "Km de Campo Grande", value: 220, suffix: " km" },
                ]}
            />

            {/* ── INFOGRAFÍA ── */}
            <InfograficoSection />

            {/* ── BURACO DAS ARARAS ── */}
            <section style={{ background: "linear-gradient(135deg, #0a1f0f 0%, #0d2b1a 50%, #0a1f0f 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/buraco_araras.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
                <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🦜</span>
                            <span style={{ color: "#6ee7b7", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Destaque Natural</span>
                        </div>

                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            Buraco das Araras
                        </h2>
                        <p style={{ color: "#6ee7b7", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            El mayor sumidero natural de Brasil — un abismo vivo a 14 km de Jardim
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Enclavado en la caliza cretácea de la Serra da Bodoquena, el Buraco das Araras es una <strong style={{ color: "#6ee7b7" }}>dolina de colapso</strong> — fenómeno kárstico formado a lo largo de milenios por la disolución de la roca calcárea por aguas ácidas subterráneas. Con aproximadamente 500 metros de diámetro y 100 metros de profundidad, es considerado el mayor sumidero natural de Brasil y uno de los más expresivos de América del Sur.
                            </p>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Las paredes verticales del abismo se convirtieron en el hogar permanente de decenas de <strong style={{ color: "#6ee7b7" }}>guacamayas rojas (Ara chloropterus)</strong> — las majestuosas guacamayas rojas y verdes que dieron nombre al lugar. Cada amanecer transforma la dolina en un espectáculo de colores y sonidos: bandadas enteras alzan vuelo desde el interior del hoyo, cruzando los rayos dorados del sol mientras el eco de sus gritos resuena por las paredes de piedra.
                            </p>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                El Buraco das Araras es una <strong style={{ color: "#6ee7b7" }}>reserva ecológica privada</strong> con estructura de visita responsable: sendero de borde, mirador con plataforma de observación y guías locales entrenados. La experiencia de mirar dentro de este abismo verde — donde las guacamayas circulan como llamas rojas contra el fondo oscuro — es considerada por muchos visitantes el momento más impactante de toda la Ruta Bioceánica.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "⭕", label: "Diámetro", value: "~500 m" },
                                { icon: "⬇️", label: "Profundidad", value: "~100 m" },
                                { icon: "🦜", label: "Guacamayas residentes", value: "decenas" },
                                { icon: "📍", label: "Distancia de Jardim", value: "14 km" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#6ee7b7", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", position: "relative" }}>
                            <img src="/cities/buraco_araras.jpg" alt="Buraco das Araras — dolina de caliza con guacamayas rojas" style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,15,0.7) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                                <p style={{ color: "#d1fae5", fontSize: "0.8rem", opacity: 0.8 }}>Serra da Bodoquena · Jardim, MS · Brasil</p>
                            </div>
                        </div>

                        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#6ee7b7", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Cómo visitar</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🕐", text: "Amanecer y tarde — mejor horario para ver las guacamayas en vuelo" },
                                    { icon: "🚗", text: "14 km del centro de Jardim por la MS-178; acceso en auto" },
                                    { icon: "🎟️", text: "Reserva privada con entrada y guía local incluido" },
                                    { icon: "📷", text: "Mirador con plataforma de observación y cámaras permitidas" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#a7f3d0", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── RESUMEN EJECUTIVO ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Jardim</SectionLabel>
                        <SectionTitle>
                            Donde la historia encuentra{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                la naturaleza cristalina
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-slate-500 leading-relaxed">
                            Jardim es la puerta de entrada a la Serra da Bodoquena — territorio de ríos de transparencia incomparable, cuevas misteriosas y biodiversidad exuberante. Pero la ciudad va más allá de la naturaleza: lleva capítulos de la Guerra del Paraguay, la memoria de la CER-3 y una{" "}
                            <strong className="text-primary-700">identidad pantanera auténtica</strong> que se expresa en la gastronomía, la artesanía y la hospitalidad de su gente.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Waves, title: "Aguas Cristalinas", text: "Lagoa Misteriosa, Rio da Prata y balnearios con visibilidad que revela otro mundo. La geología calcárea de la Bodoquena crea un fenómeno único en el planeta.", color: "from-cyan-50 to-teal-50", accent: "text-teal-600", iconBg: "bg-teal-100" },
                            { icon: Camera, title: "Fauna Silvestre", text: "Guacamayas, tucanes, jaguares, tapires y yacarés a pocos kilómetros del centro. El Buraco das Araras es uno de los espectáculos naturales más impresionantes de Brasil.", color: "from-emerald-50 to-green-50", accent: "text-emerald-700", iconBg: "bg-emerald-100" },
                            { icon: Compass, title: "Memoria e Historia", text: "Cementerio de los Héroes, Museo de la CER-3 y huellas de la Retirada de la Laguna. Jardim es uno de los guardianes de la memoria histórica de Mato Grosso do Sul.", color: "from-amber-50 to-orange-50", accent: "text-amber-700", iconBg: "bg-amber-100" },
                        ].map((pillar, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.color}`}>
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

            {/* ── HISTORIA ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Raíces que cuentan una trayectoria heroica</SectionLabel>
                        <SectionTitle light>
                            De la Guerra del Paraguay a la{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                Ruta Continental
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-base leading-relaxed">
                            Jardim fue construida en capas de historia, valentía y naturaleza. Cada período dejó marcas legibles en sus monumentos, museos y en la memoria oral del pueblo sul-mato-grossense.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {historia.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.08 * i, duration: 0.6 }} className={`rounded-3xl border ${item.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}>
                                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${item.accent} uppercase tracking-widest`}>{item.era}</span>
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-teal-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Símbolo: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LAGOA MISTERIOSA ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>Patrimonio Natural e Histórico</SectionLabel>
                            <SectionTitle>
                                Una ciudad que guarda{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    historia y misterio
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 leading-relaxed mb-8">
                                Jardim preserva tanto los registros naturales de la Serra da Bodoquena como la memoria histórica de la ocupación regional. Del Cementerio de los Héroes al Museo de la CER-3, la ciudad transforma el patrimonio en experiencia cultural viva.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Cementerio de los Héroes", desc: "Hito de la Guerra del Paraguay. Memoria militar e histórica de la valentía del siglo XIX." },
                                    { name: "Museo de la CER-3", desc: "Acervo de la Comisión de Carreteras. Historia de la BR-060 y la transformación regional." },
                                    { name: "Centro Histórico", desc: "Plaza central, Iglesia y edificios que preservan la memoria de las familias pioneras." },
                                    { name: "Artesanía Regional", desc: "Cuero, madera, hueso y fibras: piezas únicas que cuentan la identidad pantanera de Jardim." },
                                    { name: "Ruta de la Retirada de la Laguna", desc: "Trayecto histórico que conecta Jardim con el episodio más destacado de la Guerra del Paraguay en el territorio." },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-200 hover:shadow-sm transition-all">
                                        <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-primary-900 text-sm">{item.name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-primary-950 p-8 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest block mb-4">Maravilla Natural</span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        La Lagoa Misteriosa — profundidad que desafía el conocimiento
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            La Lagoa Misteriosa es una de las cavernas inundadas más profundas del mundo. Sus aguas de claridad absoluta revelan tonalidades de azul imposibles — del turquesa poco profundo al azul marino de las profundidades aún no completamente mapeadas. Buceadores de todo el mundo vienen a Jardim para enfrentar este desafío único.
                                        </p>
                                        <p>
                                            La formación geológica calcárea de la Serra da Bodoquena creó este fenómeno singular: agua que filtra y purifica hasta alcanzar una transparencia que parece irreal. En la superficie, el reflejo del cielo y la mata nativa completa uno de los escenarios más fotogénicos de Brasil.
                                        </p>
                                        <p className="text-teal-400 font-medium italic">
                                            "Existen lugares que desafían el lenguaje. La Lagoa Misteriosa es uno de ellos."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Waves className="w-4 h-4 text-teal-400" />
                                        <span className="text-xs text-white/40">Referencia internacional en buceo en caverna</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NATURALEZA ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Serra da Bodoquena</SectionLabel>
                            <SectionTitle light>
                                Un paraíso de{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    aguas cristalinas
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/55 leading-relaxed mb-8">
                                Jardim integra la región de la Serra da Bodoquena, reconocida internacionalmente por la calidad de sus aguas y la diversidad de ecosistemas. Cerrado, Mata Atlántica y vegetación pantanera se encuentran en un territorio que alberga especies raras y experiencias naturales de nivel mundial.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Lagoa Misteriosa", sub: "Caverna inundada entre las más profundas del mundo. Referencia en buceo técnico" },
                                    { label: "Rio da Prata", sub: "Flotación en aguas azul turquesa. Peces, vegetación y paisajes subacuáticos preservados" },
                                    { label: "Buraco das Araras", sub: "Dolina natural con guacamayas rojas. Espectáculo de la fauna en hábitat intocado" },
                                    { label: "Grutas y Cavernas", sub: "Formaciones calizas milenarias. Espeleología y contemplación en escenarios subterráneos únicos" },
                                    { label: "Pesca Deportiva", sub: "Pacu, pintado y dorado en ríos preservados. Temporada reglamentada y sostenible" },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-teal-500/15">
                                        <Trees className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-teal-300 font-semibold text-sm">{item.label}</span>
                                            <span className="text-white/40 text-xs ml-2">— {item.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Guacamaya", detail: "Símbolo del Buraco das Araras", emoji: "🦜" },
                                { animal: "Dorado", detail: "El rey de los ríos de la Bodoquena", emoji: "🐟" },
                                { animal: "Jaguar", detail: "Depredador del cerrado y pantanal", emoji: "🐆" },
                                { animal: "Tucán", detail: "Color vivo en la mata nativa", emoji: "🦉" },
                            ].map((creature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl bg-teal-900/30 border border-teal-500/20 p-6 text-center hover:bg-teal-900/50 transition-colors">
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-teal-400/70 text-xs mt-1">{creature.detail}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>Tradiciones que forman parte de nuestra gente</SectionLabel>
                            <SectionTitle>
                                Identidad Pantanera{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    viva y acogedora
                                </span>
                            </SectionTitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4 text-slate-500 leading-relaxed">
                                <p>
                                    Jardim lleva las costumbres, las leyendas y los saberes tradicionales del Pantanal sul-mato-grossense. La sencillez, la hospitalidad y la vida rural forman el tejido social de una ciudad donde la gente es acogedora, sencilla y orgullosa de su historia y su tierra.
                                </p>
                                <p>
                                    El <strong className="text-primary-700">chamamé</strong>, la polca paraguaya y el sertanejo raíz animan fiestas y encuentros. El acordeón y la viola están siempre presentes — al igual que el tereré en rueda, que transforma cualquier conversación en ritual de pertenencia.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Identidad Pantanera", desc: "Costumbres, leyendas y saberes tradicionales del Pantanal sul-mato-grossense" },
                                { label: "Artesanía", desc: "Cuero, madera, hueso y fibras — piezas únicas que cuentan historias de generaciones" },
                                { label: "Música y Danza", desc: "Chamamé, polca paraguaya y músicas regionales que animan fiestas y celebraciones" },
                                { label: "Fiestas y Tradiciones", desc: "Fiestas religiosas, cabalgatas, rodeos y eventos que fortalecen la cultura local" },
                            ].map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="rounded-2xl bg-primary-950 p-5">
                                    <Music className="w-5 h-5 text-teal-400 mb-3" />
                                    <div className="font-display font-bold text-white text-base mb-1">{m.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMÍA ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Sabores del Pantanal y la Sierra</SectionLabel>
                        <SectionTitle>
                            Cocina de{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                raíz y afecto
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="text-slate-500 leading-relaxed">
                            La mesa de Jardim combina pescado de río, carne pantanera, mandioca y recetas heredadas de la convivencia cotidiana con la frontera paraguaya. Una cocina de sustento, celebración y memoria afectiva.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.06 * i, duration: 0.5 }} className="card-hover p-7 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-100 group-hover:from-teal-500 group-hover:to-cyan-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">{dish.tag}</span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2">{dish.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRACTIVOS TURÍSTICOS ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Qué ver y hacer</SectionLabel>
                        <SectionTitle>
                            Puntos que{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                definen Jardim
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.07 * i }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">{attr.badge}</span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-sm mb-2">{attr.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{attr.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ITINERARIO ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 días{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                inolvidables
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden">
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
                                    {[
                                        { time: "Mañana", text: day.morning },
                                        { time: "Tarde",  text: day.afternoon },
                                        { time: "Noche",  text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <Clock className="w-3.5 h-3.5 text-teal-400/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-teal-400/80 text-xs font-semibold uppercase tracking-wide">{slot.time}</span>
                                                <p className="text-white/50 text-xs leading-relaxed mt-0.5">{slot.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que...?</SectionLabel>
                        <SectionTitle>
                            Datos que{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                sorprenden
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 p-5 hover:shadow-md transition-shadow">
                                <Star className="w-4 h-4 text-teal-500 mb-3" />
                                <p className="text-primary-800 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMACIÓN PRÁCTICA ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Planifica tu visita</SectionLabel>
                        <SectionTitle light>
                            Información{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                práctica
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <MapPin className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Cómo llegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p><strong className="text-white/80">Desde Campo Grande:</strong> ~220 km por la BR-060 y MS-178. Aproximadamente 3h de viaje.</p>
                                <p><strong className="text-white/80">Desde Bonito:</strong> ~80 km por la MS-178. Cerca de 1h de viaje por la Serra da Bodoquena.</p>
                                <p><strong className="text-white/80">En la Ruta Bioceánica:</strong> Posicionada entre Campo Grande y Porto Murtinho — parada natural en el corredor continental.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Calendar className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Mejor época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Abr → Oct</span>
                                    <span className="text-white/50 text-xs">Estación seca — mejor visibilidad en ríos y lagunas</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Jun → Sep</span>
                                    <span className="text-white/50 text-xs">Temperatura agradable, ideal para senderos y actividades al aire libre</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Todo el año</span>
                                    <span className="text-white/50 text-xs">Lagoa Misteriosa y Buraco das Araras pueden visitarse en cualquier época</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Phone className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Información útil</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Municipio", val: "jardim.ms.gov.br", icon: MapPin },
                                    { label: "Distancia de Bonito", val: "~80 km", icon: MapPin },
                                    { label: "Distancia de Campo Grande", val: "~220 km", icon: MapPin },
                                    { label: "Voucher turístico", val: "Necesario para Lagoa Misteriosa", icon: Camera },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-teal-400/60 flex-shrink-0" />
                                        <div>
                                            <span className="text-white/30 text-xs">{c.label}: </span>
                                            <span className="text-white/70 text-xs font-medium">{c.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Ruta Bioceánica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Jardim — donde la historia encuentra la naturaleza, y la aventura comienza en las aguas cristalinas.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continúa explorando las ciudades que forman el mayor corredor bioceánico de América del Sur.
                        </p>
                        <Link to="/es/cidades" className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-colors group">
                            Ver todas las ciudades
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
