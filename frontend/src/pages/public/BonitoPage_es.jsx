import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    MapPin, ArrowRight, ArrowLeft, Clock, Users, Droplets,
    Mountain, Fish, Leaf, Star, Camera, Compass, Waves, ZoomIn, X,
} from "lucide-react";

// ─── datos ─────────────────────────────────────────────────────────────────────

const pillars = [
    {
        icon: Droplets,
        title: "Las Aguas Más Claras del Planeta",
        desc: "La caliza de la Serra da Bodoquena filtra y precipita partículas en suspensión, creando visibilidad de hasta 40 metros. Fenómeno científico único en el mundo.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
        icon: Leaf,
        title: "Modelo Global de Ecoturismo",
        desc: "Ley municipal de 1997 implantó capacidad de carga y vouchers obligatorios. Citado por la ONU, WWF y National Geographic como referencia mundial.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        icon: Fish,
        title: "Fauna Acuática Desmitificada",
        desc: "Décadas de protección total tornaron dorados y pacus completamente ajenos a la presencia humana. Un dorado de 1 metro nada a 20 cm de tu cara.",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
];

const historyCycles = [
    {
        period: "Ss. XVIII–XIX",
        title: "Pueblos Originarios",
        content:
            "Kadiwéu, Guaraní y Terena habitaban la Serra da Bodoquena mucho antes de los colonizadores. Los Kadiwéu — los 'indios jinetes' del Pantanal — fueron estudiados por Claude Lévi-Strauss en Tristes Trópicos (1955), fascinado por su cerámica y pintura corporal geométrica de extrema complejidad.",
        color: "border-amber-500/40 bg-amber-500/5",
        accent: "text-amber-400",
    },
    {
        period: "1880–1948",
        title: "Ganadería y Colonización",
        content:
            "El Córrego Bonito dio nombre a la región: colonizadores paulistas y mineiros bautizaron el lugar por la claridad inusual de sus aguas. El Distrito fue creado en 1932, subordinado a Jardim. La emancipación como municipio independiente llegó el 11 de diciembre de 1948.",
        color: "border-teal-500/40 bg-teal-500/5",
        accent: "text-teal-400",
    },
    {
        period: "1986–1991",
        title: "El Redescubrimiento",
        content:
            "Buceadores paulistas redescubren la Gruta do Lago Azul en 1986. Reportajes en las revistas Mergulho y Quatro Rodas ponen a Bonito en el mapa nacional. El crecimiento rápido y desordenado amenaza los mismos recursos que atraen a los visitantes.",
        color: "border-blue-500/40 bg-blue-500/5",
        accent: "text-blue-400",
    },
    {
        period: "1997–hoy",
        title: "La Ley que Salvó a Bonito",
        content:
            "Ley Municipal nº 1.143/1997: capacidad de carga, guía acreditado obligatorio y sistema de vouchers centralizados (Bonito Tour). En 27 años, nunca revocada. La biomasa de peces creció más de un 300% entre 1990 y 2010. Modelo copiado por Fernando de Noronha, Chapada dos Veadeiros y Jalapão.",
        color: "border-emerald-500/40 bg-emerald-500/5",
        accent: "text-emerald-400",
    },
];

const attractions = [
    {
        name: "Rio da Prata",
        badge: "⭐ El Mejor",
        badgeColor: "bg-cyan-500/20 text-cyan-300",
        desc: "Naciente subterránea emerge a 22°C con visibilidad de 40 metros. Flotación de 2,5 km entre dorados, pacus y piraputangas que nadan a tu alrededor sin miedo. El acuario de agua dulce más impresionante del mundo.",
        highlight: "Visibilidad 40m · Temperatura constante 22°C",
        emoji: "🏊",
    },
    {
        name: "Gruta do Lago Azul",
        badge: "🦴 Fósiles",
        badgeColor: "bg-indigo-500/20 text-indigo-300",
        desc: "Caverna de 250m de profundidad con lago de color zafiro. En enero-febrero, rayos de sol entran por el techo creando una columna de luz azul cobalto. En el fondo, fósiles de mastodontes y perezosos gigantes extintos hace 12.000 años.",
        highlight: "Patrimonio Natural · Megafauna Pleistocénica",
        emoji: "💎",
    },
    {
        name: "Abismo Anhumas",
        badge: "🎽 Aventura Extrema",
        badgeColor: "bg-rose-500/20 text-rose-300",
        desc: "Rapel de 72 metros para el interior de una caverna sumergida. Estalactitas de 10m formadas en el aire durante las glaciaciones, ahora visibles bajo el agua. Visibilidad de 50-60m — entre las mayores del mundo en ambiente subterráneo.",
        highlight: "8-10 personas/día · Reserva anticipada obligatoria",
        emoji: "🕳️",
    },
    {
        name: "Buraco das Araras",
        badge: "🦜 Birdwatching",
        badgeColor: "bg-red-500/20 text-red-300",
        desc: "Dolina de 500m de diámetro y 100m de profundidad — una de las mayores de América del Sur. En su interior vive una colonia de 100-150 guacamayas rojas. Guacamayas azules, halcones y búhos completan el espectáculo.",
        highlight: "500m diámetro · 100-150 guacamayas rojas",
        emoji: "🌋",
    },
    {
        name: "Rio Sucuri",
        badge: "🌿 Más Cristalino",
        badgeColor: "bg-emerald-500/20 text-emerald-300",
        desc: "Considerado el río de agua más cristalina del mundo por publicaciones científicas. Nace de resurgencia calcárea a 22°C constantes. Jardines subacuáticos de macrófitas y corriente suavísima — flotación pasiva en una escena de acuario.",
        highlight: "Resurgencia calcárea · Jardines subacuáticos",
        emoji: "💚",
    },
    {
        name: "Boca da Onça",
        badge: "💧 Mayor del MS",
        badgeColor: "bg-blue-500/20 text-blue-300",
        desc: "La mayor cascada de Mato Grosso do Sul, con 156 metros de caída total en múltiples saltos. Trekking de 9km por la Serra da Bodoquena pasando por 7 cascadas menores. La piedra en la base tiene perfil de cabeza de jaguar.",
        highlight: "156m de caída · 9km de sendero",
        emoji: "⛰️",
    },
    {
        name: "Lagoa Misteriosa",
        badge: "🔵 220m Profundidad",
        badgeColor: "bg-violet-500/20 text-violet-300",
        desc: "Una de las dolinas acuáticas más profundas del mundo: 220m estimados. La parte buceeable llega a 90m. Color turquesa a esmeralda según la hora del día. Buceos en la zona profunda requieren trimix y certificación técnica avanzada.",
        highlight: "220m profundidad · Color turquesa-esmeralda",
        emoji: "🌊",
    },
    {
        name: "Aquário Natural",
        badge: "👨‍👩‍👧 Para Todos",
        badgeColor: "bg-sky-500/20 text-sky-300",
        desc: "Naciente dentro de estructura de visita. Peces completamente domesticados tras décadas de protección — nadan alrededor de los visitantes sin ningún miedo. Ideal para niños, adultos mayores y primer contacto con las aguas de Bonito.",
        highlight: "Ideal para familias · Peces muy mansos",
        emoji: "🐟",
    },
];

const foodItems = [
    { name: "Pacu Asado en Sal", badge: "Símbolo", badgeColor: "bg-amber-500/20 text-amber-300", desc: "Pescado entero recubierto de sal gruesa, asado en brasa lenta por 2-3h. La costra sella la humedad. Acompaña arroz, farofa de banana y vinagreta de pimiento biquinho.", emoji: "🔥" },
    { name: "Pintado al Maracuyá", badge: "Clásico", badgeColor: "bg-yellow-500/20 text-yellow-300", desc: "Bagre gigante de carne blanca sin espinas. La salsa de maracuyá es sello registrado de los restaurantes de Bonito. Puede alcanzar 1 metro y 30kg en la naturaleza.", emoji: "🍋" },
    { name: "Dorado a la Parrilla", badge: "Deportivo", badgeColor: "bg-orange-500/20 text-orange-300", desc: "El tigre de los ríos. Carne firme y levemente rosada. Más apreciado en la pesca deportiva que en la mesa, pero es un manjar en los menús bonitenses.", emoji: "🐠" },
    { name: "Piraputanga Frita", badge: "Regional", badgeColor: "bg-pink-500/20 text-pink-300", desc: "Pez de escamas doradas y rosadas, común en el Rio da Prata. Frito entero al momento, crujiente por fuera y jugoso por dentro.", emoji: "🍳" },
    { name: "Helado de Bocaiúva", badge: "Cerrado", badgeColor: "bg-emerald-500/20 text-emerald-300", desc: "La bocaiúva es la palmera símbolo del Cerrado. Su fruto tiene sabor entre coco verde e higo maduro — exótico y único. Helado, licor, rapadura y harina.", emoji: "🌴" },
    { name: "Tereré con Chipa", badge: "Frontera", badgeColor: "bg-teal-500/20 text-teal-300", desc: "Yerba mate helada (el café del MS) acompaña la chipa paraguaya, pan de queso hecho con harina de mandioca y queso horneado en horno de barro.", emoji: "🧉" },
];

const curiosities = [
    { emoji: "🦷", fact: "El pacu tiene dientes molares idénticos a los humanos, usados para romper semillas. Ya ha causado confusión en análisis forenses." },
    { emoji: "🦁", fact: "Un dorado de 1 metro nada a 20cm de tu cara sin huir — resultado de décadas sin ser perturbado. En ríos no protegidos, son depredadores agresivos." },
    { emoji: "🦕", fact: "En el Abismo Anhumas, estalactitas de 10m formadas en el aire seco de las glaciaciones están ahora completamente sumergidas — escultura prehistórica bajo el agua." },
    { emoji: "💀", fact: "Mastodontes y perezosos gigantes extintos hace 12.000 años yacen en el fondo de la Gruta do Lago Azul. El nivel del agua era 80m más bajo en la última glaciación." },
    { emoji: "📊", fact: "Bonito tiene ~23.000 habitantes y recibe ~250.000 turistas/año. Proporción de 10 turistas por habitante — rara en el interior brasileño." },
    { emoji: "🌡️", fact: "Los ríos de naciente calcárea mantienen 22°C exactos todo el año — temperatura de la Tierra a profundidad constante. Nadar en ellos es nadar en el tiempo geológico." },
    { emoji: "🔒", fact: "La Ley de Capacidad de Carga tiene 27 años y nunca fue revocada — atravesó gobiernos de partidos opuestos. Hay consenso total de la sociedad bonitense." },
    { emoji: "🌍", fact: "El PNUMA (ONU), el WWF y National Geographic citan a Bonito entre los 10 mejores ejemplos mundiales de ecoturismo gestionado." },
];

const practicalInfo = [
    {
        icon: MapPin,
        title: "Cómo llegar",
        items: [
            "Vuelo a Campo Grande (CGR) + 297km de carretera",
            "Transfer aeropuerto–Bonito: R$ 150–200/persona",
            "Autobús Campo Grande–Bonito: R$ 80–110 (5h)",
            "Sin vuelos directos regulares",
        ],
    },
    {
        icon: Clock,
        title: "Mejor época",
        items: [
            "Mayo a octubre: seco y más frío (ideal)",
            "Julio: invierno seco, aguas más cristalinas",
            "Dic-mar: lluvias, ríos levemente turbios",
            "Temporada alta: reserve con anticipación",
        ],
    },
    {
        icon: Users,
        title: "Alojamiento",
        items: [
            "Zagaia Eco-Resort: R$ 700–1.500/noche",
            "Posadas medias: R$ 400–700/noche",
            "Posadas simples: R$ 150–300/noche",
            "Haciendas-hotel all-inclusive: R$ 600–1.200",
        ],
    },
];

// ─── infografía lightbox ──────────────────────────────────────────────────────
function InfograficoSection() {
    const [open, setOpen] = useState(false);
    const src = useInfographic("bonito");
    return (
        <>
            <section className="bg-primary-950 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto cursor-zoom-in group"
                        onClick={() => setOpen(true)}
                    >
                        <img src={src} alt="Infografía editorial Bonito" className="w-full h-auto" />
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
                            src={src} alt="Infografía editorial Bonito"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── componente ───────────────────────────────────────────────────────────────

export default function BonitoPageEs() {
    const isMobile = useIsMobile();
    const heroRef = useRef(null);
    useInView(heroRef, { once: true });

    return (
        <main className="bg-primary-950 text-white">

            {/* ── HERO ── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Bonito", second: "" }}
                tagline="Ríos cristalinos de 40 metros de visibilidad — donde la ley de 1997 protege lo que el turismo podría haber destruido."
                scene="rio-cristalino"
                image="/cities/bonito.jpg"
                accentColor="#22d3ee"
                stats={[
                    { label: "Metros de visibilidad", value: 40, suffix: " m" },
                    { label: "Km de Campo Grande", value: 297, suffix: " km" },
                    { label: "Km de Porto Murtinho", value: 140, suffix: " km" },
                    { label: "Años de ley preservada", value: 27 },
                ]}
            />

            {/* ── INFOGRAFÍA ── */}
            <InfograficoSection />

            {/* ── ABISMO ANHUMAS ── */}
            <section style={{ background: "linear-gradient(135deg, #020d14 0%, #031824 50%, #020d14 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/abismo_anhumas.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 0.1 }} />
                <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🕳️</span>
                            <span style={{ color: "#67e8f9", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Destaque Natural</span>
                        </div>
                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            Abismo Anhumas
                        </h2>
                        <p style={{ color: "#67e8f9", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            72 metros de rapel en la oscuridad — y un lago subterráneo que no existe en ningún otro lugar del mundo
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                El Abismo Anhumas es una dolina cárstica de 72 metros de profundidad, formada por el colapso de una caverna subterránea hace miles de años. El descenso se hace en rapel, en la oscuridad casi total, hasta que los pies tocan una <strong style={{ color: "#67e8f9" }}>balsa flotante</strong> en medio de un lago dentro de la tierra — escenario que parece más un planeta alienígena que el interior de Mato Grosso do Sul.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                El lago subterráneo tiene temperatura constante de <strong style={{ color: "#67e8f9" }}>17°C</strong> y visibilidad de hasta 40 metros — la misma transparencia de las aguas superficiales de Bonito, pero aquí en el subsuelo, iluminada solo por linternas y el haz de luz natural que penetra por el agujero de arriba. Estalactitas de hasta 10 metros emergen del agua. Piraputangas y dorados nadan mansamente alrededor de la balsa, indiferentes a la presencia humana.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                La experiencia es considerada una de las más exclusivas del ecoturismo brasileño: <strong style={{ color: "#67e8f9" }}>solo 8 a 10 personas por día</strong> tienen acceso, con reserva anticipada obligatoria — a veces con meses de espera. El límite existe para proteger el frágil ecosistema de la caverna y garantizar que el visitante viva, de hecho, un momento único en el planeta.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "⬇️", label: "Profundidad del rapel", value: "72 m" },
                                { icon: "🌡️", label: "Temperatura del lago", value: "17°C" },
                                { icon: "👁️", label: "Visibilidad subacuática", value: "40 m" },
                                { icon: "🎟️", label: "Lugares por día", value: "8–10 personas" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#67e8f9", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(34,211,238,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", position: "relative" }}>
                            <img src="/cities/abismo_anhumas.jpg" alt="Interior del Abismo Anhumas — lago subterráneo con estalactitas" style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,13,20,0.75) 0%, transparent 55%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                                <p style={{ color: "#cffafe", fontSize: "0.8rem", opacity: 0.8 }}>Bonito · Mato Grosso do Sul · Brasil</p>
                            </div>
                        </div>
                        <div style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#67e8f9", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Cómo visitar</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "📅", text: "Reserva obligatoria con anticipación — lugares se agotan rápido" },
                                    { icon: "💪", text: "Exige buena condición física — rapel técnico con guías especializados" },
                                    { icon: "🤿", text: "Flotación en el lago subterráneo incluida después del rapel" },
                                    { icon: "📷", text: "Cámara a prueba de agua recomendada; el flash perjudica el ecosistema" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#a5f3fc", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── IDENTIDAD ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">Lo que hace a Bonito única</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Tres razones para creer</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pillars.map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border p-7 ${p.bg}`}>
                                <p.icon className={`w-8 h-8 ${p.color} mb-4`} />
                                <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GEOLOGÍA: POR QUÉ LAS AGUAS SON CRISTALINAS ── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                            <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">La ciencia del azul</span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">600 Millones de Años de Filtro</h2>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-12 mb-8">
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                La <strong className="text-white">Serra da Bodoquena</strong> es una formación de rocas calizas del Precámbrico — 600 a 900 millones de años de sedimentación de corales, algas y conchas de un mar prehistórico. Cuando la lluvia, levemente ácida, se infiltra por estas rocas, disuelve el carbonato de calcio y lo transporta en solución.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                Al emerger en los manantiales, el exceso de CO₂ se libera al aire. Sin el gas, el calcio precipita nuevamente como <strong className="text-cyan-300">calcita sólida</strong> — que elimina toda partícula en suspensión del agua. El resultado: <strong className="text-white">visibilidad de hasta 40 metros</strong>.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                El color azul es físico: el agua pura absorbe rojo y amarillo, reflejando el azul — efecto amplificado por el <strong className="text-cyan-300">lecho blanco de calcita</strong> que actúa como espejo. En las grutas, donde no hay turbidez alguna, el azul llega al cobalto y al zafiro.
                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 flex gap-4 items-start">
                            <Droplets className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-white mb-1">Acuífero Guaraní — La Reserva Bajo los Pies</h3>
                                <p className="text-white/55 text-sm leading-relaxed">
                                    Bonito está sobre una zona de recarga del <strong className="text-white">Sistema Acuífero Guaraní</strong>, el mayor acuífero transfronterizo del mundo: 37.000 km³ de agua dulce, extendiéndose por Brasil, Argentina, Paraguay y Uruguay. La Serra da Bodoquena es una de las esponjas que alimenta esta reserva. Preservar la mata nativa de Bonito es preservar agua para 45 millones de personas.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── HISTORIA ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">Raíces y memoria</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">De la Caliza a la Ley</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {historyCycles.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border ${c.color} p-6`}>
                                <span className={`text-xs font-bold uppercase tracking-widest ${c.accent} block mb-2`}>{c.period}</span>
                                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{c.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRACTIVOS ── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/15">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">Qué hacer</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Atractivos que Justifican el Viaje</h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            Cada atractivo tiene cuota diaria controlada por ley. Cuando se acaba, se acaba. Reserve con anticipación.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {attractions.map((a, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{a.emoji}</span>
                                        <h3 className="font-display text-lg font-bold text-white">{a.name}</h3>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${a.badgeColor} border-current/20 whitespace-nowrap flex-shrink-0`}>{a.badge}</span>
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed mb-3">{a.desc}</p>
                                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/70 font-medium">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span>{a.highlight}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SISTEMA BONITO TOUR ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Star className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Sistema Único en Brasil</span>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Bonito Tour — La Ley que Nadie Rompe</h2>
                            </div>
                        </div>
                        <div className="space-y-4 text-white/65 text-sm md:text-base leading-relaxed">
                            <p>
                                Desde 1997, <strong className="text-white">ningún turista entra en ningún atractivo pagado sin voucher de agencia acreditada</strong>. No hay entrada en la portería. No hay negociación. Si la cuota diaria se agotó, no entra — punto.
                            </p>
                            <p>
                                Cada atractivo tiene una <strong className="text-emerald-300">capacidad de carga</strong> definida por estudios técnicos (bioacústica para cuevas, hidrodinámica para ríos, comportamiento animal para el Buraco das Araras). El Abismo Anhumas tiene cuota de apenas <strong className="text-white">8 a 10 personas por día</strong>.
                            </p>
                            <p>
                                El resultado es mensurable: la <strong className="text-white">biomasa de peces creció más del 300%</strong> entre 1990 y 2010. Fernando de Noronha, Chapada dos Veadeiros y Jalapão copiaron partes del modelo — pero ninguno implementó el nivel de integración de Bonito.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── GASTRONOMÍA ── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-amber-950/10">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">A la mesa</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">El Pacu y los Sabores del Río</h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            El pacu no puede pescarse en los ríos turísticos — todos los peces están protegidos. Los que llegan a la mesa provienen de piscicultura licenciada.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {foodItems.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{f.emoji}</span>
                                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${f.badgeColor}`}>{f.badge}</span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{f.name}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ITINERARIO 4 DÍAS ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">Itinerario sugerido</span>
                        <h2 className="font-display text-4xl font-bold text-white">4 Días en Bonito</h2>
                    </motion.div>
                    <div className="space-y-5">
                        {[
                            {
                                day: "Día 1",
                                title: "Llegada y Aguas Cristalinas",
                                items: ["Mañana: Rio da Prata (flotación 2,5km — reserve con anticipación)", "Tarde: Aquário Natural para adaptarse al ambiente", "Noche: Pacu asado en sal en el Cantinho do Peixe"],
                                color: "border-cyan-500/30 bg-cyan-500/5",
                                num: "text-cyan-400",
                            },
                            {
                                day: "Día 2",
                                title: "Grutas y Abismos",
                                items: ["Mañana: Gruta do Lago Azul (enero-febrero: luz única)", "Tarde: Lagoa Misteriosa (opcional: buceo con certificación)", "Noche: Tereré y chipa en el centro histórico"],
                                color: "border-indigo-500/30 bg-indigo-500/5",
                                num: "text-indigo-400",
                            },
                            {
                                day: "Día 3",
                                title: "Aventura en la Sierra",
                                items: ["Mañana: Boca da Onça (trekking 9km, 7 cascadas)", "Tarde: Buraco das Araras (observación de guacamayas rojas)", "Noche: Pintado al maracuyá"],
                                color: "border-emerald-500/30 bg-emerald-500/5",
                                num: "text-emerald-400",
                            },
                            {
                                day: "Día 4",
                                title: "Rio Sucuri y Partida",
                                items: ["Mañana: Rio Sucuri (el más cristalino del mundo)", "Almuerzo: Helado de bocaiúva + artesanía Kadiwéu", "Tarde: Seguir hacia Porto Murtinho (140km) o Campo Grande"],
                                color: "border-teal-500/30 bg-teal-500/5",
                                num: "text-teal-400",
                            },
                        ].map((d, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border ${d.color} p-6 flex gap-5`}>
                                <div className="flex-shrink-0">
                                    <span className={`font-display text-3xl font-bold ${d.num}`}>{i + 1}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold text-white/30 uppercase">{d.day}</span>
                                        <span className="font-semibold text-white text-base">{d.title}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {d.items.map((item, j) => (
                                            <li key={j} className="text-white/55 text-sm flex gap-2">
                                                <span className="text-white/20 mt-1">›</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/10">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">Datos que impresionan</span>
                        <h2 className="font-display text-4xl font-bold text-white">Curiosidades de Bonito</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 hover:bg-white/[0.07] transition-colors">
                                <span className="text-2xl block mb-3">{c.emoji}</span>
                                <p className="text-white/60 text-xs leading-relaxed">{c.fact}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMACIÓN PRÁCTICA ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <span className="text-sm font-semibold text-white/40 uppercase tracking-widest block mb-4">Planificación</span>
                        <h2 className="font-display text-4xl font-bold text-white">Información Práctica</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {practicalInfo.map((info, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/8 bg-white/[0.04] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <info.icon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold text-white">{info.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {info.items.map((item, j) => (
                                        <li key={j} className="text-white/50 text-xs leading-relaxed flex gap-2">
                                            <span className="text-cyan-500/50 mt-0.5">›</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Camera className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Bonito está a 140 km de Porto Murtinho
                        </h2>
                        <p className="text-white/55 leading-relaxed mb-8">
                            La Ruta Bioceánica pasa casi por la puerta de Bonito. Una visita de dos a cuatro días en esta ciudad transforma cualquier travesía continental en una experiencia completa — naturaleza, cultura, gastronomía y una de las leyes ambientales más respetadas del planeta.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/es/cidades/porto-murtinho" className="btn-secondary inline-flex items-center gap-2 group">
                                Próxima parada: Porto Murtinho
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/es/cidades" className="btn-outline border-white/20 text-white/70 hover:bg-white/5 inline-flex items-center gap-2">
                                <Compass className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
