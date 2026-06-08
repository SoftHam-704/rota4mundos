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
    Wheat, Tractor, Globe,
} from "lucide-react";

/* ─── datos ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Pueblos Originarios",
        icon: Compass,
        title: "El Pueblo Terena y la Tierra Roja",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Mucho antes de la colonización, el territorio que hoy es Sidrolândia estaba habitado por el pueblo Terena — nación indígena que mantiene hasta hoy una presencia viva y activa en la región. Los Terena cultivan tradiciones seculares de artesanía, espiritualidad y agricultura que resistieron el tiempo y se convirtieron en parte esencial de la identidad cultural del municipio.",
        symbol: "Aldea Indígena Terena — memoria viva",
    },
    {
        era: "Siglo XIX",
        icon: Leaf,
        title: "La Ocupación y la Hacienda Sidrolândia",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "El origen del nombre viene de la Hacienda Sidrolândia, que dio al lugar su primera identidad. La ocupación definitiva se dio por la actividad ganadera y las familias que migraron para explorar las tierras fértiles de Mato Grosso do Sul — suelo rojo, cerrado generoso y ríos abundantes.",
        symbol: "Hacienda Sidrolândia — origen del municipio",
    },
    {
        era: "Siglo XX",
        icon: Wheat,
        title: "La Revolución del Agronegocio",
        color: "from-yellow-600 to-amber-700",
        accent: "text-yellow-400",
        border: "border-yellow-500/30",
        body: "La transformación más radical de Sidrolândia ocurrió con la modernización agrícola. Soja, maíz, ganadería y avicultura convirtieron la ciudad en uno de los mayores polos productivos de Mato Grosso do Sul. Cooperativas, silos y agroindustrias se instalaron, haciendo del municipio una referencia económica en el cinturón productivo del MS.",
        symbol: "Cooperativas y silos — símbolos del nuevo agro",
    },
    {
        era: "Siglo XXI",
        icon: Globe,
        title: "La Ruta Bioceánica y el Nuevo Horizonte",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Con la consolidación de la Ruta Bioceánica, Sidrolândia ganó un nuevo papel estratégico: punto de articulación logística entre Campo Grande y la frontera. Su posición privilegiada en el corredor de exportación la proyecta como eje del nuevo agro sudamericano — donde la producción encuentra la integración continental.",
        symbol: "Corredor Bioceánico — el futuro comienza aquí",
    },
];

const attractions = [
    { name: "Aldeas Terena", icon: Users, desc: "Comunidades indígenas activas que preservan artesanía, lengua, rituales y agricultura tradicional. Una ventana única a 10.000 años de historia sudamericana.", badge: "Cultura" },
    { name: "Paisaje del Cerrado", icon: Trees, desc: "El cerrado genuino del MS — veredas, buritis, ríos de orilla roja y puesta de sol que tiñe el horizonte de cobre y oro.", badge: "Naturaleza" },
    { name: "Fiestas Tradicionales", icon: Music, desc: "Rodeos, cabalgatas, fiestas de cosecha y celebraciones culturales que mezclan tradición indígena, sertaneja y pantanera.", badge: "Eventos" },
    { name: "Pesca en Ríos Regionales", icon: Fish, desc: "Ríos del cerrado con pacu, pintado y dorado. Ambiente preservado para pesca deportiva y contemplación de la naturaleza.", badge: "Deporte" },
    { name: "Cooperativas y Silos", icon: Tractor, desc: "Ruta del agro: visita silos, cooperativas y conoce la cadena productiva que hace de Sidrolândia una de las ciudades económicamente más fuertes del MS.", badge: "Agro" },
    { name: "Artesanía Terena", icon: Star, desc: "Piezas únicas en paja, cerámica, madera y fibras naturales. Cada objeto lleva siglos de técnica y simbología del pueblo Terena.", badge: "Artesanía" },
    { name: "Senderos y Ríos", icon: Compass, desc: "Senderos por el cerrado, bañados y mata de galería. Paisajes que revelan la transición entre lo productivo y lo salvaje.", badge: "Aventura" },
    { name: "Gastronomía Rural", icon: Utensils, desc: "Cocina de hacienda auténtica: churrasco en fuego de suelo, arroz carreteiro, sobá regional y tereré en rueda — identidad del interior del MS.", badge: "Gastronomía" },
];

const dishes = [
    { name: "Churrasco Pantanero", icon: Flame, desc: "Carnes en fuego de suelo, condimento simple y brasa lenta. Herencia de los troperos y de la vida en el campo que define el paladar de Sidrolândia.", tag: "Fuego de Suelo" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "Plato de sustento de las comitivas y del campo. Arroz con carne seca, mandioca y condimentos regionales — sabor que reconforta y pertenece.", tag: "Tradición" },
    { name: "Sobá Regional", icon: Utensils, desc: "La influencia japonesa que llegó al interior del MS y encontró los sabores locales. Plato de identidad y convivencia en el corazón del estado.", tag: "Fusión" },
    { name: "Tereré en Rueda", icon: Leaf, desc: "Mucho más que bebida — es ceremonia. Chimarrão frío con yerba mate, compartido en rueda como símbolo de amistad, hospitalidad y pertenencia.", tag: "Ritual" },
    { name: "Pescados del Cerrado", icon: Fish, desc: "Pacu, pintado y pintado verdadero de los ríos regionales. Fritos, asados o en caldo — platos que llegan directo del agua a la mesa.", tag: "Río" },
    { name: "Cocina de Hacienda", icon: Flame, desc: "Mandioca, maíz, frijoles, queso y recetas heredadas de las familias pioneras. Una cocina que cuenta la historia de quienes hicieron productivo el cerrado.", tag: "Raíz" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Cultura y Pueblo",
        morning: "Visita a las aldeas Terena — artesanía, memoria oral y arquitectura tradicional. Entender cómo el pueblo Terena mantiene viva la identidad en medio del avance del agro moderno.",
        afternoon: "Centro histórico, museo local y puntos de memoria de la colonización. Conversación con líderes comunitarios sobre los desafíos y conquistas del pueblo indígena.",
        evening: "Cena con cocina de hacienda, tereré en rueda y música sertaneja en vivo. Sentir el ritmo pausado y hospitalario del interior productivo del MS.",
        color: "from-amber-600 to-orange-700",
        icon: Users,
    },
    {
        day: "Día 2",
        theme: "Agro y Naturaleza",
        morning: "Ruta del agro: visita a cooperativas, silos y propiedades rurales. Comprender cómo la soja, el maíz y la ganadería transformaron Sidrolândia en una potencia económica del MS.",
        afternoon: "Sendero por el cerrado, río regional y mata de galería. Pesca deportiva o contemplación del paisaje que transita entre lo productivo y lo salvaje.",
        evening: "Puesta de sol cinematográfica sobre los campos — una de las más bellas del corredor bioceánico. Cielo que va del dorado al cobre sobre el cerrado infinito.",
        color: "from-green-600 to-teal-700",
        icon: Tractor,
    },
    {
        day: "Día 3",
        theme: "Ruta y Fronteras",
        morning: "Recorrido por la BR-060 en dirección a Jardim: la carretera que conecta Campo Grande al sur del estado. Entender la posición estratégica de Sidrolândia en el corredor bioceánico.",
        afternoon: "Compras de artesanía Terena y productos regionales. Visita a la feria de productores locales y gastronomía callejera.",
        evening: "Despedida con churrasco pantanero en fuego de suelo. Sidrolândia queda — así como el sabor del cerrado y la memoria de un pueblo que nunca olvidó sus raíces.",
        color: "from-blue-600 to-indigo-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "El pueblo Terena es una de las naciones indígenas más organizadas de Brasil — con escuela propia, lengua viva y producción agrícola tradicional activa hasta hoy." },
    { text: "Sidrolândia es uno de los mayores productores de maíz y soja de Mato Grosso do Sul, integrando el cinturón productivo que abastece el corredor de exportación bioceánico." },
    { text: "La puesta de sol en Sidrolândia es considerada por habitantes y visitantes una de las más cinematográficas del MS — el cerrado amplifica los tonos de cobre, oro y carmín en el horizonte." },
    { text: "La ciudad está posicionada estratégicamente entre Campo Grande y la Serra da Bodoquena, convirtiéndose en parada natural en el mayor corredor bioceánico de América del Sur." },
    { text: "Las cooperativas de Sidrolândia exportan a más de 20 países — granos que salen por el Río Paraguay en dirección al océano Pacífico por la nueva ruta bioceánica." },
    { text: "La palabra Sidrolândia viene de la Hacienda Sidrolândia, que existía en el lugar antes de la fundación del municipio — un nombre que lleva la memoria de la tierra y de quien la trabajó." },
    { text: "La tradición de las cabalgatas y rodeos reúne anualmente miles de visitantes — fiestas que mezclan herencia indígena, sertaneja y pantanera en un único evento de identidad regional." },
    { text: "Sidrolândia está rodeada de tres biomas: Cerrado, Pantanal y la transición hacia la Mata Atlántica — una diversidad ecológica raramente encontrada en un solo municipio." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3"
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
    const src = useInfographic("sidrolandia");
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
                        <img src={src} alt="Infografía editorial Sidrolândia" className="w-full h-auto" />
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
                            src={src} alt="Infografía editorial Sidrolândia"
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

export default function SidrolandiaPageEs() {
    const isMobile = useIsMobile();
    return (
        <div className="min-h-screen">

            {/* ── HERO ── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Sidrolândia", second: "" }}
                tagline="Donde el agronegocio encuentra al pueblo Terena, el cerrado y la logística que mueve un continente."
                scene="pantanal"
                image="/cities/sidrolandia.jpg"
                accentColor="#C8922A"
                stats={[
                    { label: "Habitantes (est. 2022)", value: 51000, suffix: " hab." },
                    { label: "Km de Campo Grande",     value: 70,    suffix: " km" },
                    { label: "Km de Jardim",           value: 160,   suffix: " km" },
                    { label: "Producción de soja (t/año)", value: 120000, suffix: " t" },
                ]}
            />

            {/* ── INFOGRAFÍA ── */}
            <InfograficoSection />

            {/* ── PUEBLO TERENA — destaque ── */}
            <section style={{ background: "linear-gradient(135deg, #1a0f02 0%, #2d1a05 50%, #1a0f02 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/sidrolandia.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
                <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,146,42,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🪶</span>
                            <span style={{ color: "#e8c97a", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Destaque Cultural</span>
                        </div>

                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            El Pueblo Terena
                        </h2>
                        <p style={{ color: "#e8c97a", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            Una nación indígena que resiste, crea y celebra — en el corazón del agro más productivo del MS
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Los <strong style={{ color: "#e8c97a" }}>Terena</strong> son una de las naciones indígenas más organizadas y resilientes de Brasil. Presentes desde hace siglos en el territorio que hoy forma Sidrolândia, mantienen viva una cultura riquísima: lengua propia, artesanía sofisticada, espiritualidad profunda y técnicas de agricultura que conviven con el agronegocio moderno sin perder la identidad.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Las <strong style={{ color: "#e8c97a" }}>aldeas Terena</strong> son espacios de memoria viva — donde los niños aprenden la lengua ancestral, los mayores enseñan la artesanía y los rituales de curación y celebración se practican como forma de resistencia y afirmación. Para el visitante, es una experiencia de contacto humano genuino que ningún museo puede reproducir.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                La <strong style={{ color: "#e8c97a" }}>convivencia entre el pueblo Terena y el agronegocio</strong> es uno de los aspectos más singulares de Sidrolândia — y uno de los temas más relevantes para entender el futuro de la relación entre producción, identidad y territorio en Mato Grosso do Sul.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "🪶", label: "Nación", value: "Terena" },
                                { icon: "🗣️", label: "Lengua viva", value: "Terena (aruak)" },
                                { icon: "🏘️", label: "Aldeas", value: "múltiples activas" },
                                { icon: "🌾", label: "Agricultura", value: "tradicional y moderna" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(200,146,42,0.1)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#e8c97a", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.0rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(200,146,42,0.3)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", position: "relative" }}>
                            <img
                                src="/cities/sidrolandia.jpg"
                                alt="Sidrolândia — cerrado y tradición Terena"
                                style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }}
                                onError={e => { e.target.style.background = "linear-gradient(135deg, #2d1a05, #4a7c59)"; e.target.style.display = "none"; }}
                            />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,2,0.75) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                                <p style={{ color: "#f5e6c8", fontSize: "0.8rem", opacity: 0.8 }}>Cerrado del MS · Sidrolândia · Brasil</p>
                            </div>
                        </div>

                        <div style={{ background: "rgba(200,146,42,0.08)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#e8c97a", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Cómo conocer las aldeas</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🕐", text: "Visitas guiadas con agendamiento previo junto a los líderes comunitarios" },
                                    { icon: "🚗", text: "Aldeas distribuidas en los alrededores del municipio — acceso por camino de tierra" },
                                    { icon: "🪶", text: "Respeto a las tradiciones locales: no fotografiar sin permiso, vestimenta adecuada" },
                                    { icon: "🛒", text: "Artesanía disponible para compra directamente en las aldeas — ingreso para las familias" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#f5e6c8", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
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
                        <SectionLabel>Quién es Sidrolândia</SectionLabel>
                        <SectionTitle>
                            Donde el agro encuentra{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                el alma indígena
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-slate-500 leading-relaxed">
                            Sidrolândia es una paradoja fascinante: una de las ciudades más productivas de Mato Grosso do Sul, con silos, cooperativas y exportaciones que llegan al otro lado del continente — y al mismo tiempo, hogar de un pueblo indígena que mantiene viva una cultura de{" "}
                            <strong className="text-primary-700">milenios entre los campos de soja</strong>. Es el corazón productivo del MS, latiendo entre el futuro y la memoria ancestral.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Wheat, title: "Polo Agroindustrial", text: "Soja, maíz, ganadería y avicultura en escala de exportación. Cooperativas y silos que integran el corredor bioceánico — producción que abastece cuatro países.", color: "from-amber-50 to-orange-50", accent: "text-amber-700", iconBg: "bg-amber-100" },
                            { icon: Users, title: "Pueblo Terena", text: "Nación indígena de lengua aruak con presencia activa, artesanía viva y espiritualidad practicada. Una de las culturas indígenas más organizadas del Brasil central.", color: "from-emerald-50 to-teal-50", accent: "text-emerald-700", iconBg: "bg-emerald-100" },
                            { icon: Globe, title: "Nodo Logístico Bioceánico", text: "Posicionada entre Campo Grande y la frontera, Sidrolândia es eje del corredor de exportación que conecta el agro del MS a los mercados del Pacífico vía Porto Murtinho.", color: "from-blue-50 to-indigo-50", accent: "text-blue-700", iconBg: "bg-blue-100" },
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Raíces que moldean una identidad única</SectionLabel>
                        <SectionTitle light>
                            De la aldea ancestral al{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                corredor bioceánico
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-base leading-relaxed">
                            Sidrolândia fue construida en capas — indígena, colonial, agrícola y logística. Cada período dejó marcas que conviven y se tensan en el paisaje, la cultura y la identidad del municipio más productivo del corredor bioceánico brasileño.
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
                                    <div className="flex items-center gap-2 text-xs text-amber-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Símbolo: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AGRO & NATURALEZA ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>El cinturón productivo del MS</SectionLabel>
                            <SectionTitle>
                                Tierra que{" "}
                                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                    alimenta continentes
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 leading-relaxed mb-8">
                                Sidrolândia integra el cinturón productivo más dinámico de Mato Grosso do Sul. Soja, maíz, ganadería y avicultura forman una cadena de producción que alimenta mercados en Brasil y el exterior — y que ahora encuentra en el corredor bioceánico una vía de exportación directa hasta el Pacífico.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Soja y Maíz", desc: "Siembra en escala industrial con tecnología de punta. Una de las mayores producciones per cápita del MS." },
                                    { name: "Ganadería y Avicultura", desc: "Rebaños bovinos, granjas y frigoríficos que mueven la cadena del frío regional." },
                                    { name: "Cooperativas", desc: "Modelo cooperativista fuerte — asociativismo que garantiza escala, precio y acceso al mercado exterior." },
                                    { name: "Silos y Almacenes", desc: "Infraestructura de almacenamiento que posiciona a Sidrolândia como polo logístico del corredor." },
                                    { name: "Agroindustria", desc: "Procesamiento local que agrega valor a la producción — beneficiadoras, lácteos y producción de pienso." },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-sm transition-all">
                                        <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
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
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-4">Naturaleza y Biodiversidad</span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        El cerrado que resiste entre los campos de producción
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Entre las siembras de soja y los pastizales, el cerrado genuino de Mato Grosso do Sul mantiene bolsones de naturaleza intocada: veredas, buritis, matas de galería y ríos de orilla roja donde la fauna aún se aventura.
                                        </p>
                                        <p>
                                            La posición de Sidrolândia en el encuentro de tres biomas — Cerrado, Pantanal y la transición hacia la Mata Atlántica — crea una diversidad ecológica raramente encontrada en un solo municipio brasileño.
                                        </p>
                                        <p className="text-amber-400 font-medium italic">
                                            "La puesta de sol sobre los campos de Sidrolândia es cinematográfica — el cerrado amplifica cada tono de cobre y dorado en el horizonte."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Trees className="w-4 h-4 text-amber-400" />
                                        <span className="text-xs text-white/40">Tres biomas en transición — biodiversidad singular</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Identidad que sobrevive al tiempo</SectionLabel>
                            <SectionTitle light>
                                Tradición rural y{" "}
                                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    memoria indígena
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/55 leading-relaxed mb-8">
                                Sidrolândia vive un encuentro singular de culturas: la tradición indígena Terena y la cultura sertaneja, pantanera y sureña que llegó con los colonizadores. Cabalgatas, rodeos, fiestas de cosecha y rituales ancestrales conviven en el calendario cultural de una ciudad que no olvida de dónde vino.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Cultura Terena", sub: "Lengua, artesanía, espiritualidad y agricultura tradicional — herencia viva de siglos" },
                                    { label: "Cabalgatas y Rodeos", sub: "Fiestas que reúnen miles — herencia de los troperos y de la labor con el ganado del cerrado" },
                                    { label: "Música Sertaneja Raíz", sub: "Viola, acordeón y chamamé — banda sonora del interior productivo del MS" },
                                    { label: "Artesanía Regional", sub: "Paja, cerámica, cuero y fibras — técnicas milenarias Terena y rurales en cada pieza" },
                                    { label: "Fiestas de Cosecha", sub: "Celebraciones de la zafra que mezclan gratitud, identidad y comunidad" },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-amber-500/15">
                                        <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-amber-300 font-semibold text-sm">{item.label}</span>
                                            <span className="text-white/40 text-xs ml-2">— {item.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Lobo guará", detail: "Símbolo del cerrado preservado", emoji: "🐺" },
                                { animal: "Guacamayas", detail: "Ave del cerrado y la tradición Terena", emoji: "🦜" },
                                { animal: "Capibara", detail: "Reina de los ríos del cerrado", emoji: "🦫" },
                                { animal: "Dorado", detail: "El rey de los ríos regionales", emoji: "🐟" },
                            ].map((creature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl bg-amber-900/20 border border-amber-500/20 p-6 text-center hover:bg-amber-900/35 transition-colors">
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-amber-400/70 text-xs mt-1">{creature.detail}</div>
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
                        <SectionLabel>Sabores del cerrado y la hacienda</SectionLabel>
                        <SectionTitle>
                            Cocina de{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                brasa y afecto
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="text-slate-500 leading-relaxed">
                            La mesa de Sidrolândia es un mapa de la identidad del interior del MS: carne en fuego de suelo, pescado de río, sobá que vino de Japón y tereré que es puro Pantanal. Una cocina que sustenta a quien trabaja y celebra a quien llega.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.06 * i, duration: 0.5 }} className="card-hover p-7 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 group-hover:from-amber-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{dish.tag}</span>
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
                            Experiencias que{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                definen Sidrolândia
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.07 * i }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-amber-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{attr.badge}</span>
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 días{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                en el corazón del MS
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
                                            <Clock className="w-3.5 h-3.5 text-amber-400/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-wide">{slot.time}</span>
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
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                sorprenden
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-5 hover:shadow-md transition-shadow">
                                <Star className="w-4 h-4 text-amber-500 mb-3" />
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
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                práctica
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <MapPin className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Cómo llegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p><strong className="text-white/80">Desde Campo Grande:</strong> ~70 km por la BR-060. Aproximadamente 1h de viaje.</p>
                                <p><strong className="text-white/80">Hacia Jardim:</strong> ~160 km por la BR-060 y MS-178. Cerca de 2h30 de viaje.</p>
                                <p><strong className="text-white/80">En la Ruta Bioceánica:</strong> Segunda parada oficial en Brasil — entre Campo Grande y Jardim.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Calendar className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Mejor época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Abr → Sep</span>
                                    <span className="text-white/50 text-xs">Estación seca — mejor para fiestas, cabalgatas y senderos en el cerrado</span>
                                </div>
                                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <span className="text-green-300 font-semibold text-xs block mb-1">May → Jun</span>
                                    <span className="text-white/50 text-xs">Cosecha de soja — período de mayor movimiento y fiestas tradicionales</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Todo el año</span>
                                    <span className="text-white/50 text-xs">Aldeas Terena reciben visitantes con agendamiento en cualquier época</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Phone className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Información útil</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Distancia de Campo Grande", val: "~70 km", icon: MapPin },
                                    { label: "Distancia de Jardim", val: "~160 km", icon: MapPin },
                                    { label: "Acceso a las aldeas", val: "Agendamiento necesario", icon: Users },
                                    { label: "Infraestructura", val: "Hoteles, restaurantes y estación", icon: Camera },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0" />
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
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Ruta Bioceánica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Sidrolândia — donde la tierra roja alimenta continentes y la memoria Terena resiste al tiempo.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continúa explorando las ciudades que forman el mayor corredor bioceánico de América del Sur.
                        </p>
                        <Link to="/es/cidades" className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors group">
                            Ver todas las ciudades
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
