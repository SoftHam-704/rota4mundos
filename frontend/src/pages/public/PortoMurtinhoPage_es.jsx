import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Ruler, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Anchor, Mountain, Leaf, Utensils,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const cycles = [
    {
        era: "1892 – inicios s. XX",
        icon: Leaf,
        title: "Ciclo de la Yerba Mate",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "En 1892, el ingeniero Antonio Corrêa da Costa construyó un puerto rústico de madera en la hacienda Três Barras para transportar yerba mate — acto fundacional que definiría el destino de la futura ciudad. El municipio creció, recibió trabajadores y comerciantes, y se consolidó como entreposto estratégico del sur del antiguo Mato Grosso.",
        symbol: "Trenecito de la plaza central",
    },
    {
        era: "Ss. XIX – XX",
        icon: Flame,
        title: "Ciclo del Tanino",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "La abundancia del quebracho transformó Porto Murtinho en polo de extracción e industrialización del tanino — materia prima usada en el curtido de cuero. La Florestal Brasileira S/A dejó huellas imborrables: la Chimenea Florestal Brasileira, ruina que aún hoy se yergue como monumento a la escala industrial de aquella época.",
        symbol: "Chimenea Florestal Brasileira",
    },
    {
        era: "Ss. XIX – XX",
        icon: Anchor,
        title: "Ciclo del Charque",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "El charque completó la tríada económica que levantó la ciudad, integrando Porto Murtinho a redes más amplias de abastecimiento regional. Junto con la yerba mate y el tanino, consolidó el municipio como polo de trabajo, circulación y acumulación de riqueza en distintos momentos del antiguo Mato Grosso unificado.",
        symbol: "Casonas y almacenes de la Rua Dr. Corrêa",
    },
    {
        era: "Continuo",
        icon: Anchor,
        title: "El Puerto y el Comercio Fluvial",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "El Río Paraguay fue la gran avenida líquida de Porto Murtinho. Por él pasaron mercancías, noticias, costumbres y personas de distintos orígenes — paraguayos, uruguayos, españoles y otros grupos que moldearon el tejido social y arquitectónico local. El puerto impulsó importaciones, exportaciones y reforzó el carácter cosmopolita de la ciudad.",
        symbol: "Río Paraguay",
    },
];

const touroDuel = {
    bandido: {
        name: "Toro Bandido",
        color: "from-emerald-600 to-green-700",
        tag: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Identificado por el color verde, el Bandido despierta hinchas fervorosos. Su presencia en la arena se asocia a la transgresión ritualizada, al folclore de la frontera y a la potencia del límite.",
    },
    encantado: {
        name: "Toro Encantado",
        color: "from-yellow-600 to-amber-700",
        tag: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Reconocido por el color amarillo, el Encantado evoca el misterio, la creencia y lo maravilloso popular. Su hinchada celebra la espiritualidad que impregna la fiesta.",
    },
};

const dishes = [
    {
        name: "Pintado a la Parrilla",
        icon: Fish,
        desc: "Clásico regional que valora la calidad del pescado del Río Paraguay, servido con mandioca, arroz y ensaladas frescas.",
        tag: "Pez del Río",
    },
    {
        name: "Pintado con Bocaiúva",
        icon: Fish,
        desc: "Preparación ya celebrada en materiales de promoción turística del municipio — gancho perfecto para el storytelling gastronómico.",
        tag: "Especial de la Casa",
    },
    {
        name: "Sopa Paraguaya",
        icon: Utensils,
        desc: "Pastel salado de maíz, queso y cebolla — presencia indispensable en las mesas de frontera. Engaña el nombre: es sólida y reconfortante.",
        tag: "Frontera",
    },
    {
        name: "Chipa",
        icon: Utensils,
        desc: "Bocado horneado de almidón y queso, consumido en el desayuno, la merienda y en los largos viajes por carretera.",
        tag: "Cotidiano",
    },
    {
        name: "Lambreado",
        icon: Flame,
        desc: "Preparación rústica y bien condimentada, asociada al sabor fuerte del interior y a las cocinas de fuego de leña y brasas vivas.",
        tag: "Interior",
    },
    {
        name: "Tereré",
        icon: Leaf,
        desc: "Más que una bebida — símbolo cultural. La Plaza del Tereré transforma este hábito cotidiano en monumento identitario urbano.",
        tag: "Ritual Social",
    },
];

const attractions = [
    { name: "Morro Pan de Azúcar", icon: Mountain, desc: "~550 metros de altitud, sendero interpretativo y mirador natural hacia el Pantanal del Nabileque y el Chaco paraguayo.", badge: "Naturaleza" },
    { name: "Pantanal del Nabileque", icon: Trees, desc: "Paisaje de planicie inundable, fauna abundante y vocación singular para la contemplación, investigación y turismo sensible.", badge: "Ecosistema" },
    { name: "Castelinho", icon: Star, desc: "Ícono arquitectónico y sentimental de la ciudad, rodeado de narrativas de amor, lujo, decadencia y misterio.", badge: "Leyenda" },
    { name: "Museo Dom Jaime A. Barrera", icon: Camera, desc: "Instalado en la histórica Padaria Cuê (1928), símbolo de memoria y patrimonio urbano.", badge: "Patrimonio 2024" },
    { name: "Trenecito", icon: Anchor, desc: "Monumento simbólico de la yerba mate, instalado en la plaza central — sintetiza un ciclo económico entero en un único objeto.", badge: "Memoria" },
    { name: "Cine-Teatro Murtinhense", icon: Music, desc: "Antiguo depósito de yerba mate transformado en equipamiento cultural a orillas del Río Paraguay.", badge: "Cultura" },
    { name: "Plaza del Tereré", icon: Leaf, desc: "Transforma el hábito cotidiano más murtinhense en espacio urbano e identitario de convivencia.", badge: "Vivencia" },
    { name: "Fecho dos Morros", icon: Anchor, desc: "Paisaje ligado a la pesca, la contemplación y el imaginario fronterizo — puesta de sol sobre el Río Paraguay.", badge: "Contemplación" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Llegada y Memoria Urbana",
        morning: "Llegada, check-in y caminata tranquila por la orilla del Río Paraguay. Primer contacto con la escala humana y el ritmo de la ciudad.",
        afternoon: "Visita al centro histórico: Castelinho, Padaria Cuê/Museo Dom Jaime, Trenecito, plaza central y Cine-Teatro Murtinhense.",
        evening: "Cena con sabores regionales y paseo por la plaza para sentir el pulso local. Ronda de tereré con habitantes.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Día 2",
        theme: "Naturaleza y Río",
        morning: "Salida temprana para paseo en barco, pesca deportiva o contemplación del Río Paraguay y el Pantanal del Nabileque.",
        afternoon: "Subida al Morro Pan de Azúcar para el mirador natural, con foco en fotografía, observación de fauna y amplitud del paisaje.",
        evening: "Puesta de sol pantanera y cena a base de pescado. Conversación con pilotos, pescadores y guías locales.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Día 3",
        theme: "Cultura y Partida",
        morning: "Museo Histórico de Porto Murtinho, Iglesia Sagrado Coração de Jesus y recorrido de monumentos del centro histórico.",
        afternoon: "Experiencia gastronómica completa: chipa, sopa paraguaya y platos de frontera. Compras de artesanía local.",
        evening: "Si hay calendario cultural, priorizar chamamé en vivo, presentaciones de las Meninas Cantoras o vivencias del Toro Candil.",
        color: "from-blue-600 to-indigo-700",
        icon: Music,
    },
];

const curiosities = [
    { text: "Conocida como 'la última guardiana del Río Paraguay' — identidad ribereña y fronteriza en una sola expresión." },
    { text: "17.502 km² de territorio para una población de ~12.859 personas: una vastedad raramente imaginada." },
    { text: "El Trenecito de la plaza central sintetiza un ciclo económico entero (la yerba mate) en un único monumento urbano." },
    { text: "El Castelinho lleva una de las leyendas de amor, decadencia y misterio más persistentes de Mato Grosso do Sul." },
    { text: "En 2024, la Padaria Cuê y la Prefeitura Cuê fueron oficialmente declaradas patrimonio histórico material del estado." },
    { text: "El Toro Candil fue declarado patrimonio inmaterial de Mato Grosso do Sul en 2023." },
    { text: "La Plaza del Tereré elevó un ritual cotidiano de frontera a la categoría de símbolo urbano oficial." },
    { text: "Porto Murtinho vive hoy un momento raro: pasado histórico y futuro logístico continental en el mismo imaginario." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-3"
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

/* ─── page ───────────────────────────────────────────────────── */

function InfograficoSection() {
    const src = useInfographic("porto-murtinho");
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
                        <img src={src} alt="Infografía editorial Porto Murtinho" className="w-full h-auto" />
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
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src} alt="Infografía editorial Porto Murtinho"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function PortoMurtinhoPageEs() {
    const isMobile = useIsMobile();
    const heroRef = useRef(null);

    return (
        <div className="min-h-screen">

            {/* ── HERO ── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Porto", second: "Murtinho" }}
                tagline="La última ciudad brasileña antes del cruce — donde el Río Paraguay separa dos mundos."
                scene="ponte"
                image="/cities/porto_murtinho.jpg"
                accentColor="#F4A261"
                stats={[
                    { label: "Habitantes (Censo 2022)", value: 12859 },
                    { label: "Fundación", value: 1912 },
                    { label: "Territorio (km²)", value: 17502 },
                    { label: "Km de Campo Grande", value: 437, suffix: " km" },
                ]}
            />

            {/* ── INFOGRAFÍA ── */}
            <InfograficoSection />

            {/* ── LA TRAVESÍA ── */}
            <section style={{ background: "linear-gradient(135deg, #140a00 0%, #1f1000 50%, #140a00 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/rio_paraguai.jpg')", backgroundSize: "cover", backgroundPosition: "center 60%", opacity: 0.13 }} />
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,97,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,140,60,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,162,97,0.13)", border: "1px solid rgba(244,162,97,0.35)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>⛵</span>
                            <span style={{ color: "#fdba74", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Hito de la Ruta</span>
                        </div>
                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            La Travesía
                        </h2>
                        <p style={{ color: "#fdba74", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            El Río Paraguay separa dos mundos — y el ferry es el portal entre ellos
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Porto Murtinho es donde Brasil termina. Literalmente. En la orilla del <strong style={{ color: "#fdba74" }}>Río Paraguay</strong>, el viajero embarca en un ferry y cruza aproximadamente 800 metros de agua oscura y silenciosa en dirección a Carmelo Peralta, en Paraguay. Son menos de 15 minutos de travesía — pero es la frontera entre el Pantanal brasileño y el inmenso Chaco paraguayo, entre dos países, dos ecosistemas, dos idiomas y dos tiempos.
                            </p>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                El ferry no tiene nombre glamoroso. No es un puente colgante ni un ferri moderno. Es una embarcación simple, cargando autos, motos y peatones bajo el sol del Pantanal — y es exactamente esa <strong style={{ color: "#fdba74" }}>ausencia de infraestructura monumental</strong> lo que hace el momento tan poderoso. El viajero siente, con el cuerpo, que está cruzando una frontera real. El Morro Pan de Azúcar — formación rocosa que se alza solitaria a la orilla del río — marca el paso como un centinela milenario.
                            </p>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Para los entusiastas de la Ruta Bioceánica, el cruce en Porto Murtinho es el <strong style={{ color: "#fdba74" }}>momento más simbólico de todo el viaje</strong>: es aquí donde Brasil queda atrás y la Ruta de los Cuatro Mundos comienza de verdad — rumbo al Chaco, los Andes y, al fin, el Pacífico. Un puente está en construcción, pero mientras no llega, el ferry carga toda la poesía de la frontera viva.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "🌊", label: "Ancho del Río Paraguay", value: "~800 m" },
                                { icon: "⏱️", label: "Duración del cruce", value: "10–15 min" },
                                { icon: "🏳️", label: "Destino", value: "Carmelo Peralta, PY" },
                                { icon: "🌉", label: "Puente bioceánico", value: "en construcción" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(244,162,97,0.08)", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#fdba74", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(244,162,97,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", position: "relative" }}>
                            <img src="/cities/rio_paraguai.jpg" alt="Morro Pan de Azúcar — Río Paraguay en la frontera Brasil-Paraguay" style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 50%", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,0,0.75) 0%, transparent 55%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                                <p style={{ color: "#fed7aa", fontSize: "0.8rem", opacity: 0.8 }}>Morro Pan de Azúcar · Río Paraguay · Frontera Brasil–Paraguay</p>
                            </div>
                        </div>
                        <div style={{ background: "rgba(244,162,97,0.07)", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#fdba74", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Cómo hacer el cruce</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🛂", text: "Pasaporte válido obligatorio — frontera internacional" },
                                    { icon: "🚗", text: "Vehículos y peatones embarcan a orilla del río, centro de Porto Murtinho" },
                                    { icon: "🕐", text: "Travesía disponible durante el día; confirmar horarios en la ciudad" },
                                    { icon: "💵", text: "Tasa de cruce cobrada por persona y vehículo, en reales o guaraníes" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#fed7aa", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
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
                        <SectionLabel>Quién es Porto Murtinho</SectionLabel>
                        <SectionTitle>
                            Pequeña en población.{" "}
                            <span className="text-gradient">Gigantesca en historia.</span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-slate-500 leading-relaxed">
                            Porto Murtinho se yergue a orillas del Río Paraguay como una ciudad de frontera que mezcla Pantanal, memoria, comercio fluvial, tradición paraguaya, arquitectura histórica y un fuerte sentimiento de pertenencia cultural. Hoy, gana protagonismo nacional como{" "}
                            <strong className="text-primary-700">portal brasileño de la Ruta Bioceánica.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Anchor, title: "Río Paraguay", text: "Eje ecológico, económico y paisajístico de la ciudad. Por él pasaron yerba mate, tanino, charque y el alma de distintas culturas.", color: "from-blue-50 to-teal-50", accent: "text-teal-600", iconBg: "bg-teal-100" },
                            { icon: Camera, title: "Memoria Urbana", text: "Castelinho, Padaria Cuê, Trenecito y una serie de casonas que leyeron los ciclos económicos en las paredes, frontispicios y revoques antiguos.", color: "from-amber-50 to-orange-50", accent: "text-amber-700", iconBg: "bg-amber-100" },
                            { icon: Music, title: "Cultura de Frontera", text: "Chamamé, Toro Candil, cocina mestiza y fe popular tejen una identidad que solo existe en esta esquina singular de América del Sur.", color: "from-red-50 to-rose-50", accent: "text-red-700", iconBg: "bg-red-100" },
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

            {/* ── CICLOS HISTÓRICOS ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Ciclos que construyeron la ciudad</SectionLabel>
                        <SectionTitle light>
                            Del Puerto Rústico a la{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                Ruta Continental
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-base leading-relaxed">
                            Porto Murtinho fue construida en capas. Cada ciclo económico dejó no solo riqueza, sino arquitectura, memoria e identidad — legibles aún hoy en sus calles y monumentos.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {cycles.map((cycle, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.08 * i, duration: 0.6 }} className={`rounded-3xl border ${cycle.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}>
                                <div className={`h-2 bg-gradient-to-r ${cycle.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${cycle.accent} uppercase tracking-widest`}>{cycle.era}</span>
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{cycle.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cycle.color} flex items-center justify-center flex-shrink-0`}>
                                            <cycle.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{cycle.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-secondary-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Símbolo: {cycle.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASTELINHO & LA LEYENDA ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>Arquitectura y Patrimonio</SectionLabel>
                            <SectionTitle>
                                Una ciudad que se lee{" "}
                                <span className="text-gradient">en las paredes</span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 leading-relaxed mb-8">
                                Un paseo por el centro de Porto Murtinho es una clase de historia en frontispicios, ventanas, torres y revoques antiguos. La ciudad preserva edificios que remiten al auge de los ciclos productivos y que fueron oficialmente declarados patrimonio histórico material del estado en 2024.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "El Castelinho", desc: "Ícono arquitectónico y sentimental. Romanticismo, extravagancia y leyenda." },
                                    { name: "Padaria Cuê / Museo Dom Jaime", desc: "Edificio de 1928, declarado patrimonio en 2024. Memoria del comercio y la vida urbana." },
                                    { name: "Prefeitura Cuê", desc: "Sede histórica del poder municipal. También declarada patrimonio en 2024." },
                                    { name: "Cine-Teatro Murtinhense", desc: "Antiguo almacén de yerba mate a orillas del río, hoy escenario de cultura." },
                                    { name: "Parroquia Sagrado Coração de Jesus", desc: "Hito religioso y arquitectónico del centro histórico." },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-sm transition-all">
                                        <ChevronRight className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
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
                                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-secondary-400 uppercase tracking-widest block mb-4">Leyenda Viva</span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        El Amor, la Ruina y el Misterio del Castelinho
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Thomaz Herrera se enamoró de Virgínia — una mujer de linaje europeo sofisticado, acostumbrada a refinamientos que el interior de Brasil difícilmente podía ofrecer. Para impresionarla, Herrera construyó en el corazón de Porto Murtinho un pequeño castillo de rasgos europeos: torres, frontispicios ornamentados y un romanticismo arquitectónico inusual para la frontera.
                                        </p>
                                        <p>
                                            El amor duró. La fortuna, no. La quiebra llegó, la pasión no sobrevivió a la pobreza, y la tragedia ensombreció el final de la historia. El Castelinho quedó. Y con él, la narrativa que lo transformó en personaje: dicen los murtinhenses que la casa guarda los espíritus del amor perdido.
                                        </p>
                                        <p className="text-secondary-400 font-medium italic">
                                            "En Porto Murtinho, la historia oficial convive con la narrativa oral. El Castelinho es el ejemplo más vivo de ello."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Star className="w-4 h-4 text-secondary-400" />
                                        <span className="text-xs text-white/40">Uno de los inmuebles históricos más famosos de Mato Grosso do Sul</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TORO CANDIL ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <SectionLabel>Patrimonio Inmaterial · Mato Grosso do Sul, 2023</SectionLabel>
                        <SectionTitle light>
                            Toro Candil:
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-secondary-400 to-red-400 bg-clip-text text-transparent">
                                fe, fuego y festejo
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/55 text-base leading-relaxed">
                            Pocas manifestaciones resumen tan bien la identidad de Porto Murtinho. Ocurre en la víspera del 8 de diciembre — fecha ligada a la devoción a la Virgen de Caacupé, patrona de Paraguay — y transforma las calles en escenario de comunidad, ritual y pertenencia.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {Object.values(touroDuel).map((touro, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.6 }} className={`rounded-3xl overflow-hidden border ${touro.tag.split(" ")[2]}`}>
                                <div className={`h-3 bg-gradient-to-r ${touro.color}`} />
                                <div className="bg-white/[0.05] p-8">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${touro.tag} mb-4`}>
                                        {i === 0 ? "Verde · La Transgresión" : "Amarillo · El Encanto"}
                                    </span>
                                    <h3 className="font-display text-2xl font-bold text-white mb-3">{touro.name}</h3>
                                    <p className="text-white/55 text-sm leading-relaxed">{touro.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.04] border border-white/10 p-8">
                        <h3 className="font-display text-xl font-bold text-white mb-6">Quién habita la fiesta</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Mascaritas", sub: "Personajes callejeros que encarnan el caos festivo y la irreverencia popular" },
                                { label: "Promesseiras", sub: "Devotas que llevan la dimensión religiosa y de fe de la manifestación" },
                                { label: "Pelota Tata", sub: "La bola de fuego — elemento espectacular que intensifica el clima ritual" },
                                { label: "Escenificación colectiva", sub: "Música, carrera, disputa y dramaturgia comunitaria que envuelven a toda la ciudad" },
                            ].map((elem, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/[0.06]">
                                    <div className="font-semibold text-secondary-400 text-sm mb-1">{elem.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{elem.sub}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CHAMAMÉ ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>Festival Internacional · Tradición Viva</SectionLabel>
                            <SectionTitle>
                                El Chamamé y el{" "}
                                <span className="text-gradient">Alma de la Frontera</span>
                            </SectionTitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4 text-slate-500 leading-relaxed">
                                <p>
                                    Porto Murtinho celebra el chamamé — ritmo de raíces argentinas, paraguayas y guaraníes, profundamente incorporado a la cultura sul-mato-grossense. El Festival Internacional del Chamamé reúne artistas de Brasil, Paraguay y Argentina, además de grupos locales que revelan la fuerza de la formación cultural comunitaria.
                                </p>
                                <p>
                                    La{" "}
                                    <strong className="text-primary-700">Orquesta de Guitarras de Porto Murtinho</strong> y
                                    las{" "}
                                    <strong className="text-primary-700">Meninas Cantoras</strong> son ejemplos vivos de cómo la ciudad no solo vive del pasado: produce cultura en el presente, formando artistas que proyectan el nombre del municipio por el estado y el país.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Polca", desc: "Ritmo de base paraguaya presente en el cotidiano musical de la frontera" },
                                { label: "Guarânia", desc: "Género lírico que une Brasil, Paraguay y Argentina en una misma melodía" },
                                { label: "Chamamé", desc: "Ritmo de raíz guaraní y europea, alma del folclore del noroeste platino" },
                                { label: "Tereré en rueda", desc: "Hábito social y afectivo que acompaña música, conversación y celebración" },
                            ].map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="rounded-2xl bg-primary-950 p-5">
                                    <Music className="w-5 h-5 text-secondary-400 mb-3" />
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
                        <SectionLabel>Sabores del Pantanal y la Frontera</SectionLabel>
                        <SectionTitle>
                            Cocina de{" "}
                            <span className="text-gradient">afecto y memoria</span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="text-slate-500 leading-relaxed">
                            La mesa de Porto Murtinho combina pescado de río, carne, mandioca, maíz, queso y recetas heredadas de la convivencia cotidiana con Paraguay. Es una cocina de sustento y celebración.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.06 * i, duration: 0.5 }} className="card-hover p-7 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 group-hover:from-secondary-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-secondary-500 bg-secondary-50 px-2.5 py-1 rounded-full">{dish.tag}</span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2">{dish.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
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
                            <SectionLabel>Pantanal y Río Paraguay</SectionLabel>
                            <SectionTitle light>
                                La naturaleza que{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    lo define todo
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/55 leading-relaxed mb-8">
                                Porto Murtinho pertenece al bioma Pantanal y tiene en el Río Paraguay su eje ecológico, económico y paisajístico. La ciudad está integrada al Pantanal del Nabileque — subregión de gran relevancia ambiental, marcada por una estacionalidad que moldea el cotidiano, la fauna y la cultura local.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Río Paraguay", sub: "Escenario de pesca, navegación, contemplación, memoria e integración internacional" },
                                    { label: "Pantanal del Nabileque", sub: "Planicies inundables, fauna abundante y estacionalidad que define el ritmo de la vida" },
                                    { label: "Morro Pan de Azúcar", sub: "~550 metros. Mirador natural hacia el Chaco y el Pantanal. Sendero interpretativo" },
                                    { label: "Fauna Emblemática", sub: "Tuiuiús, garzas, loros, yacarés, capibaras y peces de gran porte" },
                                    { label: "Pesca Deportiva", sub: "Jaú, pintado, pacu y dorado. Temporada de feb a nov, respetando la veda" },
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
                                { animal: "Tuiuiú", detail: "Ave símbolo del Pantanal", emoji: "🦢" },
                                { animal: "Pintado", detail: "El mayor pez del Río Paraguay", emoji: "🐟" },
                                { animal: "Yacaré", detail: "Guardián de las orillas inundables", emoji: "🐊" },
                                { animal: "Loro", detail: "Color vivo en los campos pantaneros", emoji: "🦜" },
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

            {/* ── ATRACTIVOS TURÍSTICOS ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Qué ver y hacer</SectionLabel>
                        <SectionTitle>
                            Puntos que{" "}
                            <span className="text-gradient">explican la ciudad</span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.07 * i }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full border border-secondary-200">{attr.badge}</span>
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 días{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
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
                                        { time: "Tarde", text: day.afternoon },
                                        { time: "Noche", text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <Clock className="w-3.5 h-3.5 text-secondary-400/60 mt-0.5" />
                                            </div>
                                            <div>
                                                <span className="text-secondary-400/80 text-xs font-semibold uppercase tracking-wide">{slot.time}</span>
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
                            <span className="text-gradient">sorprenden</span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="rounded-2xl bg-gradient-to-br from-primary-50 to-slate-50 border border-primary-100 p-5 hover:shadow-md transition-shadow">
                                <Star className="w-4 h-4 text-secondary-400 mb-3" />
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
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                práctica
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <MapPin className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Cómo llegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p><strong className="text-white/80">En auto:</strong> 437–440 km de Campo Grande por la BR-267. Aproximadamente 6h30–7h de viaje.</p>
                                <p><strong className="text-white/80">Frontera:</strong> Conexión simbólica con Carmelo Peralta (Paraguay) — próxima parada de la Ruta Bioceánica.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Calendar className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Mejor época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Mar → Oct</span>
                                    <span className="text-white/50 text-xs">Caminos estables, paisajes abiertos y naturaleza</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Feb → Nov</span>
                                    <span className="text-white/50 text-xs">Ventana de pesca deportiva (veda en Dic/Ene)</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">7 Diciembre</span>
                                    <span className="text-white/50 text-xs">Víspera del Toro Candil — imperdible</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Phone className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Contactos útiles</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Turismo", val: "(67) 9 9694-3176", icon: Phone },
                                    { label: "Email Turismo", val: "turismo@portomurtinho.ms.gov.br", icon: Mail },
                                    { label: "Hospital", val: "(67) 3287-1469", icon: Phone },
                                    { label: "Policía Militar", val: "(67) 3287-1300", icon: Phone },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-secondary-400/60 flex-shrink-0" />
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
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-secondary-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Ruta Bioceánica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Porto Murtinho — donde el Río Paraguay encuentra la historia, la cultura y la naturaleza.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continúa explorando las ciudades que forman el mayor corredor bioceánico de América del Sur.
                        </p>
                        <Link
                            to="/es/cidades"
                            className="inline-flex items-center gap-2 bg-white text-orange-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group"
                        >
                            Ver todas las ciudades
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
