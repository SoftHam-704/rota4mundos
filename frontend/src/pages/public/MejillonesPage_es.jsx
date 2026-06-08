import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Anchor, Fish, Mountain, Star, Sun, MapPin,
    Clock, Users, Globe, Award, ArrowRight, X, ZoomIn,
    Utensils, Compass, Droplets, Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";

const AC = "#0891b2";
const ACDIM = "rgba(8,145,178,0.15)";
const ACGLOW = "rgba(8,145,178,0.22)";

/* ── micro-components ───────────────────────────────────── */
function StatCard({ label, value, icon: Icon }) {
    return (
        <div style={{
            textAlign: "center", padding: "22px 16px", borderRadius: "16px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(8,145,178,0.2)",
        }}>
            <Icon size={20} style={{ color: AC, marginBottom: "8px" }} />
            <div style={{ fontSize: "1.45rem", fontFamily: '"Bebas Neue",sans-serif', color: "#fff", letterSpacing: "0.05em" }}>{value}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "4px" }}>{label}</div>
        </div>
    );
}

function HistCard({ icon: Icon, year, title, desc }) {
    return (
        <div style={{
            padding: "24px", borderRadius: "16px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.15)",
            flex: 1, minWidth: "220px",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} style={{ color: AC }} />
                </div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: AC, letterSpacing: "0.1em", textTransform: "uppercase" }}>{year}</span>
            </div>
            <h4 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.25rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "8px" }}>{title}</h4>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</p>
        </div>
    );
}

function AttrCard({ icon: Icon, name, desc }) {
    return (
        <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.12)" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <Icon size={16} style={{ color: AC }} />
            </div>
            <h4 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.1rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "6px" }}>{name}</h4>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{desc}</p>
        </div>
    );
}

function DishCard({ emoji, name, desc }) {
    return (
        <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.12)" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{emoji}</div>
            <h4 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.1rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "6px" }}>{name}</h4>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{desc}</p>
        </div>
    );
}

function CultCard({ icon: Icon, title, desc }) {
    return (
        <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.15)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <Icon size={18} style={{ color: AC }} />
            </div>
            <h4 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.2rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "8px" }}>{title}</h4>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{desc}</p>
        </div>
    );
}

function CurioItem({ icon: Icon, text }) {
    return (
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <Icon size={13} style={{ color: AC }} />
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{text}</p>
        </div>
    );
}

/* ── hero SVG: porto noturno com barco, cais e montanhas ─ */
function PortSVG() {
    return (
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <defs>
                <linearGradient id="sky-mej" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#001429" />
                    <stop offset="55%" stopColor="#002a52" />
                    <stop offset="100%" stopColor="#024e87" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="ocean-mej" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#001e40" />
                </linearGradient>
                <radialGradient id="moon-mej" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0f7ff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="moon-glow-mej" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pier-mej" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5a4030" />
                    <stop offset="100%" stopColor="#3b2a1f" />
                </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="400" height="200" fill="url(#sky-mej)" />

            {/* Stars */}
            {[
                [22, 18], [55, 10], [90, 22], [130, 8], [170, 16], [210, 6],
                [255, 20], [290, 12], [335, 8], [370, 18], [42, 35], [105, 30],
                [185, 28], [310, 32], [360, 38], [145, 42], [75, 48], [240, 40],
            ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.1 : 0.7} fill="white" opacity={0.5 + (i % 4) * 0.12} />
            ))}

            {/* Moon halo */}
            <circle cx="340" cy="38" r="28" fill="url(#moon-glow-mej)" />
            {/* Moon */}
            <circle cx="340" cy="38" r="11" fill="#e0f7ff" opacity="0.92" />
            <circle cx="344" cy="34" r="8" fill="#001e3c" opacity="0.2" />

            {/* Atacama mountain silhouettes — background */}
            <path
                d="M 0 115 L 28 80 L 55 98 L 80 62 L 108 85 L 135 50 L 162 75 L 185 58 L 210 78 L 235 55 L 260 80 L 285 63 L 310 82 L 332 68 L 358 88 L 400 72 L 400 130 L 0 130 Z"
                fill="#00111f" opacity="0.85"
            />
            {/* closer rocky hills */}
            <path
                d="M 0 130 L 30 110 L 60 120 L 90 105 L 125 118 L 155 108 L 180 118 L 400 115 L 400 138 L 0 138 Z"
                fill="#00080f" opacity="0.9"
            />

            {/* Ocean */}
            <rect x="0" y="138" width="400" height="62" fill="url(#ocean-mej)" />

            {/* Wave lines */}
            {[145, 155, 165, 177, 190].map((y, i) => (
                <path key={i}
                    d={`M 0 ${y} Q ${50 + i * 10} ${y - 3} ${100 + i * 5} ${y} Q ${160} ${y + 3} ${220 + i * 5} ${y} Q ${290} ${y - 3} ${400} ${y}`}
                    stroke="#38bdf8" strokeWidth={0.6 - i * 0.08} fill="none" opacity={0.15 + i * 0.04}
                />
            ))}

            {/* Moon reflection on water */}
            <ellipse cx="340" cy="155" rx="15" ry="5" fill="#bae6fd" opacity="0.15" />
            <ellipse cx="340" cy="165" rx="10" ry="3" fill="#bae6fd" opacity="0.08" />

            {/* Pier posts */}
            {[155, 168, 181, 194, 207].map((x, i) => (
                <rect key={i} x={x} y={130 + i % 2} width="3" height={18 - i * 1} fill="url(#pier-mej)" opacity="0.85" />
            ))}
            {/* Pier deck */}
            <rect x="148" y="128" width="66" height="5" rx="1" fill="#7c5c3e" opacity="0.9" />
            {/* Pier planks */}
            {[150, 156, 162, 168, 174, 180, 186, 192, 198, 204].map((x, i) => (
                <rect key={i} x={x} y={128} width="2" height="5" fill="#5a4030" opacity="0.5" />
            ))}

            {/* Fishing boat hull */}
            <path d="M 168 136 Q 182 148 196 136 L 193 131 L 171 131 Z" fill="#1a3a5e" opacity="0.95" />
            {/* Boat cabin */}
            <rect x="176" y="124" width="11" height="9" rx="1" fill="#0c2540" opacity="0.9" />
            {/* Cabin window */}
            <rect x="178" y="126" width="3" height="3" rx="0.5" fill="#bae6fd" opacity="0.5" />
            {/* Mast */}
            <line x1="181" y1="110" x2="181" y2="124" stroke="#5a3e28" strokeWidth="1.2" />
            {/* Boom */}
            <line x1="181" y1="112" x2="191" y2="117" stroke="#7c5638" strokeWidth="0.8" />
            {/* Rope */}
            <line x1="181" y1="110" x2="193" y2="131" stroke="#a07850" strokeWidth="0.5" opacity="0.6" />

            {/* Second smaller boat in distance */}
            <path d="M 250 140 Q 260 146 270 140 L 268 136 L 252 136 Z" fill="#102a48" opacity="0.7" />
            <line x1="258" y1="126" x2="258" y2="136" stroke="#4a3020" strokeWidth="0.8" opacity="0.6" />

            {/* Seagulls */}
            <path d="M 90 95 Q 93 92 96 95" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5" />
            <path d="M 100 90 Q 103 87 106 90" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M 305 85 Q 308 82 311 85" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
        </svg>
    );
}

/* ── main page ──────────────────────────────────────────── */
export default function MejillonesPageEs() {
    const isMobile = useIsMobile();
    const [lightbox, setLightbox] = useState(false);
    const src = useInfographic("mejillones");

    return (
        <div style={{ background: "#001e3c", minHeight: "100vh", color: "#fff", fontFamily: "Inter, sans-serif" }}>

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Región de Antofagasta"
                name={{ first: "Mejillones", second: "" }}
                tagline="El cierre simbólico de la travesía continental — puerto artesanal, camanchaca y el atardecer más emocionante del Pacífico."
                scene="pacifico"
                image="/cities/mejillones.jpg"
                accentColor="#0891b2"
                stats={[
                    { label: "Habitantes (estimación)", value: 12000 },
                    { label: "Fundación", value: 1879 },
                    { label: "Km de Antofagasta", value: 60, suffix: " km" },
                    { label: "Km de la ruta total", value: 3000, suffix: " km" },
                ]}
            />

            {/* ── INFOGRAFÍA LIGHTBOX ─────────────────────────────────── */}
            <section style={{ background: "#001428", padding: "80px 0" }}>
                <div className="container-rota">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ textAlign: "center", marginBottom: "36px" }}
                    >
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", letterSpacing: "0.06em", marginBottom: "10px" }}>
                            INFOGRAFÍA DE LA CIUDAD
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "400px", margin: "0 auto" }}>
                            Datos, rutas y curiosidades de Mejillones en un solo cuadro.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        onClick={() => setLightbox(true)}
                        style={{ position: "relative", maxWidth: "700px", margin: "0 auto", cursor: "zoom-in", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                        <img src={src} alt="Infografía Mejillones" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,20,40,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                            onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "rgba(0,0,0,0.6)", borderRadius: "100px", border: "1px solid rgba(8,145,178,0.4)" }}>
                                <ZoomIn size={16} style={{ color: AC }} />
                                <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Ampliar</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {lightbox && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLightbox(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.35 }}
                            src={src} alt="Infografía Mejillones"
                            style={{ maxWidth: "95vw", maxHeight: "92vh", borderRadius: "16px", objectFit: "contain" }}
                            onClick={e => e.stopPropagation()}
                        />
                        <button onClick={() => setLightbox(false)}
                            style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <X size={18} color="white" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── RESUMEN 3 PILARES ──────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "640px", marginBottom: "52px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>LA ESENCIA DE MEJILLONES</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05, marginBottom: "16px" }}>
                            PUERTO, MAR E<br /><span style={{ color: AC }}>IDENTIDAD COSTERA</span>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                            Mejillones no intenta impresionar por su grandiosidad. Emociona por su verdad. Última parada de la Ruta Bioceánica, es aquí donde el océano finalmente responde al viajero que cruzó un continente.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        {[
                            { icon: Anchor, title: "Puerto Artesanal Vivo", desc: "Botes, muelles, pescadores y mercados de mariscos que funcionan desde hace más de un siglo sin interrupción. La vida marítima real, no reconstituida." },
                            { icon: Mountain, title: "Contraste Único en el Mundo", desc: "El Desierto de Atacama — el más árido del planeta — termina literalmente en el Pacífico. Acantilados rocosos desérticos y aguas profundas del océano comparten el mismo horizonte." },
                            { icon: Globe, title: "Fin Simbólico de la Ruta", desc: "Después del Pantanal, el Chaco, los Andes y el Atacama, Mejillones es donde la travesía continental encuentra el océano. Un puerto a escala humana para un momento de magnitud continental." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                                <CultCard icon={item.icon} title={item.title} desc={item.desc} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HISTORIA ───────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>MEMORIA DEL PUERTO</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            HISTORIA ENTRE<br /><span style={{ color: AC }}>EL SALITRE Y EL PACÍFICO</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {[
                            { icon: Fish, year: "S. XIX", title: "Puerto de Escorrentía", desc: "Mejillones emergió como punto estratégico de salida para el salitre y los minerales del árido interior del Atacama. Trabajadores marítimos y embarcaciones definieron los primeros rasgos de la identidad local." },
                            { icon: Globe, year: "1879–1884", title: "Guerra del Pacífico", desc: "El conflicto que rediseñó el mapa del norte sudamericano convirtió los puertos de la costa en estratégicos para el movimiento militar y el control marítimo. La memoria histórica de la guerra permanece en la identidad de la región." },
                            { icon: Anchor, year: "S. XX", title: "Consolidación Pesquera", desc: "Mientras la era salitrera declinó, la pesca artesanal asumió el papel de sustento e identidad. Los muelles pasaron de los vapores cargados de salitre a las embarcaciones de madera cargadas de mariscos." },
                            { icon: Star, year: "Hoy", title: "Puerto Vivo y Auténtico", desc: "Mejillones preserva lo que muchas ciudades costeras ya perdieron. La rutina del muelle, el mercado de mariscos del amanecer y el atardecer sobre el Pacífico siguen moldeando una identidad insustituible." },
                        ].map((card, i) => (
                            <motion.div key={i} style={{ flex: "1 1 220px" }}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                                <HistCard {...card} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SPOTLIGHT: EL RITMO DEL PUERTO ────────────────────── */}
            <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #001e3c 0%, #003566 50%, #024e87 100%)" }}>
                <div className="container-rota">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "60px", alignItems: "center" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>IDENTIDAD PORTUARIA</span>
                            <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                                EL RITMO DE UN<br /><span style={{ color: AC }}>PUERTO REAL</span>
                            </h2>
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>
                                En Mejillones, el mar no es paisaje — es trabajo, cultura y pertenencia. La ciudad vive en tres tiempos: la madrugada de los pescadores, el mediodía del mercado y el atardecer dorado sobre el Pacífico.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {[
                                    { icon: Clock, title: "Madrugada — Barcos en el Horizonte", desc: "Antes del amanecer, las embarcaciones parten. El muelle despierta en la oscuridad, con el ruido de los motores y el olor a sal. La primera luz del día encuentra los botes ya en el mar." },
                                    { icon: Fish, title: "Mañana — El Mercado Despierta", desc: "Con el regreso de las embarcaciones, el mercado cobra vida. Mejillones, ostras, congrios y erizos frescos llegan directamente del océano al puesto. Las gaviotas disputan los muelles con los compradores." },
                                    { icon: Sun, title: "Atardecer — El Silencio del Pacífico", desc: "El sol desciende sobre el Atacama y pinta el océano de dorado. Los botes se mecen despacio. La brisa marina trae el aroma de la cocina costera. La travesía termina aquí, en paz." },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}
                                        style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(8,145,178,0.15)" }}>
                                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <item.icon size={16} style={{ color: AC }} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "12px", color: "#fff", marginBottom: "4px" }}>{item.title}</div>
                                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                            style={{ position: "relative", aspectRatio: "4/5", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(8,145,178,0.2)" }}>
                            <img src="/cities/mejillones.jpg" alt="Puerto de Mejillones"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,40,0.65) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: AC, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Mejillones, Chile</div>
                                <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.4rem", color: "#fff", letterSpacing: "0.04em" }}>Puerto Natural del Atacama</div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Bahía Natural · Pacífico Sur</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA 4 CARDS ────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>CULTURA E IDENTIDAD</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            EL PACÍFICO<br /><span style={{ color: AC }}>COMO MODO DE VIDA</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                        {[
                            { icon: Anchor, title: "Vida Marítima", desc: "En Mejillones, el mar no es fondo de pantalla — es actividad cotidiana. Los botes, los muelles y los mercados definen el calendario, el sustento y la identidad de quienes nacieron aquí." },
                            { icon: Fish, title: "Pesca Artesanal", desc: "Generación tras generación, los pescadores locales mantienen técnicas y rutas que la industrialización no ha reemplazado. La pesca artesanal es patrimonio vivo de la comunidad." },
                            { icon: Clock, title: "Memoria Salitrera", desc: "La ciudad guarda en su arquitectura y en la memoria colectiva la era del salitre que transformó el norte chileno. Una historia de trabajo duro, migraciones y construcción de identidad." },
                            { icon: Wind, title: "Contemplación Pacífica", desc: "El viento que recorre los muelles al atardecer, el silencio de las olas en el muelle y el cielo estrellado del Atacama sobre el Pacífico crean un ambiente único de profundidad contemplativa." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <CultCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMÍA ────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>GASTRONOMÍA</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            EL MAR<br /><span style={{ color: AC }}>DIRECTO A LA MESA</span>
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: "14px" }}>
                            La cocina de Mejillones se basa en la pesca artesanal y en la abundancia del Pacífico Norte Chileno. Aquí, el concepto de "fresco" tiene un significado literal — el pescado salió del mar horas antes de llegar al plato.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
                        {[
                            { emoji: "🦪", name: "Mejillones", desc: "Los mejillones frescos de la bahía que le dieron nombre a la ciudad. Servidos cocidos, gratinados o en caldos. El símbolo gastronómico local." },
                            { emoji: "🦪", name: "Ostras del Pacífico", desc: "Recolectadas en las aguas frías de la costa, las ostras locales se consumen frescas con limón — una de las delicias más valoradas por los visitantes." },
                            { emoji: "🍲", name: "Caldillo de Congrio", desc: "La sopa más emblemática de la cocina chilena, preparada con congrio rosado local, papas, cilantro y un caldo de intensidad marina incomparable." },
                            { emoji: "🍋", name: "Ceviche Costero", desc: "Preparación al estilo norteño con pescado y mariscos frescos, limón y cilantro. La frescura del Pacífico en cada bocado." },
                            { emoji: "🥟", name: "Empanadas de Mariscos", desc: "Masa crocante rellena con una mezcla de mariscos locales. Símbolo de la cocina portuaria chilena que acompaña cualquier comida." },
                            { emoji: "🦔", name: "Erizos de Mar", desc: "Delicia del norte chileno, consumida cruda o con aceite y limón. Una experiencia intensa de sabor que resume toda la esencia del Pacífico Norte." },
                        ].map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                <DishCard {...dish} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRACCIONES ─────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>QUÉ VISITAR</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            ATRACCIONES DE<br /><span style={{ color: AC }}>MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Anchor, name: "Bahía de Mejillones", desc: "Una de las bahías naturales más protegidas y hermosas del Pacífico Sur. Aguas tranquilas de azul profundo enmarcadas por formaciones áridas del Atacama." },
                            { icon: Fish, name: "Muelle Artesanal", desc: "El corazón vivo del puerto. Botes coloridos, equipos de pesca, gaviotas y pescadores que mantienen una rutina centenaria de trabajo en el mar." },
                            { icon: Utensils, name: "Mercado de Mariscos", desc: "En las primeras horas de la mañana, el mercado local cobra vida con mariscos y pescados frescos recién desembarcados. El olor del Pacífico en estado puro." },
                            { icon: Mountain, name: "Acantilados del Atacama", desc: "Formaciones rocosas áridas que descienden abruptamente hasta el océano. El contraste visual entre el desierto gris y el azul profundo del Pacífico es de rara belleza." },
                            { icon: Compass, name: "Playas Desiertas", desc: "Playas de arena desértica prácticamente sin infraestructura turística. Soledad, silencio oceánico y la línea del horizonte del Pacífico como única compañía." },
                            { icon: Sun, name: "Mirador del Atardecer", desc: "Al atardecer, el cielo limpio del Atacama y la extensión infinita del Pacífico crean un espectáculo cromático de rara intensidad. Dorado, ámbar y azul profundo." },
                            { icon: Clock, name: "Patrimonio Histórico", desc: "Edificaciones e hitos que evocan las eras del salitre y de la Guerra del Pacífico. La arquitectura de la ciudad guarda capas de historia marítima y minera." },
                            { icon: Globe, name: "Hito de la Ruta Bioceánica", desc: "Mejillones es el cierre simbólico de la mayor travesía continental de América del Sur. Del Pantanal al Pacífico — la llegada ocurre aquí." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                                <AttrCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ITINERARIO 3 DÍAS ──────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>SUGERENCIA DE ITINERARIO</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            3 DÍAS EN EL PUERTO<br /><span style={{ color: AC }}>DEL PACÍFICO</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                        {[
                            {
                                day: "DÍA 1", subtitle: "Llegada y Descubrimiento del Puerto",
                                items: ["Llegada desde Antofagasta por la Ruta 1 costera", "Paseo por el muelle artesanal por la tarde", "Mercado de mariscos y primera degustación de mejillones", "Empanadas de mariscos en restaurante local", "Atardecer sobre la bahía — el momento más esperado de la ruta"],
                            },
                            {
                                day: "DÍA 2", subtitle: "Gastronomía y Paisaje",
                                items: ["Caldillo de congrio en el almuerzo en restaurante a orillas del mar", "Paseo por los acantilados del Atacama y playas desiertas", "Ceviche y ostras frescas al atardecer", "Noche en el muelle — silencio del Pacífico y cielo estrellado del Atacama", "Jaibas y erizos para cerrar la noche gastronómica"],
                            },
                            {
                                day: "DÍA 3", subtitle: "Ritual del Amanecer y Partida",
                                items: ["Despertar antes del amanecer — presenciar el regreso de los botes", "Mercado de mariscos por la mañana con pescadores locales", "Última visita al mirador con vista de la bahía", "Café con empanadas y pan de forma chileno", "Partida con la sensación de travesía completa — del Pantanal al Pacífico"],
                            },
                        ].map((dia, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                                style={{ padding: "28px", borderRadius: "18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.15)" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", borderRadius: "100px", background: ACDIM, border: `1px solid rgba(8,145,178,0.3)`, marginBottom: "10px" }}>
                                    <span style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1rem", color: AC, letterSpacing: "0.1em" }}>{dia.day}</span>
                                </div>
                                <h4 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.2rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "16px" }}>{dia.subtitle}</h4>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {dia.items.map((item, j) => (
                                        <li key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: AC, marginTop: "6px", flexShrink: 0 }} />
                                            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ───────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>¿SABÍAS QUE?</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            CURIOSIDADES<br /><span style={{ color: AC }}>SOBRE MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Fish, text: "El nombre 'Mejillones' proviene de los abundantes mejillones que habitan la bahía desde tiempos prehistóricos, cuando los pueblos originarios de la costa ya los consumían." },
                            { icon: Anchor, text: "La bahía de Mejillones es considerada una de las más protegidas del Pacífico Sur por el Atacama, que actúa como barrera natural contra los vientos del interior del continente." },
                            { icon: Globe, text: "Mejillones es el punto de llegada simbólico de la Ruta Bioceánica — aproximadamente 3.000 km de travesía desde Campo Grande, en Brasil, hasta el Pacífico." },
                            { icon: Mountain, text: "El desierto de Atacama termina literalmente en el océano en Mejillones. Los acantilados rocosos áridos descienden directamente al Pacífico sin transición — uno de los contrastes visuales más dramáticos del planeta." },
                            { icon: Star, text: "El cielo nocturno de Mejillones combina dos maravillas: la ausencia de contaminación lumínica del Atacama y el horizonte infinito del Pacífico — una rareza doble para la observación astronómica." },
                            { icon: Users, text: "Con apenas 12.000 habitantes, Mejillones mantiene una escala humana deliberada. La ciudad nunca priorizó el crecimiento acelerado en detrimento de su identidad marítima original." },
                            { icon: Clock, text: "Durante la Guerra del Pacífico (1879–1884), los puertos del norte chileno, incluido Mejillones, tuvieron un papel estratégico en el conflicto que rediseñó las fronteras de Chile, Bolivia y Perú." },
                            { icon: Droplets, text: "La 'camanchaca' — densa niebla marina que cubre el litoral en las primeras horas de la mañana — es un fenómeno característico de Mejillones que crea una atmósfera cinematográfica al amanecer." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                                <CurioItem {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMACIÓN PRÁCTICA ───────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>INFORMACIÓN PRÁCTICA</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            CÓMO LLEGAR<br /><span style={{ color: AC }}>Y PREPARARSE</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Globe, label: "Idioma", value: "Español" },
                            { icon: Award, label: "Moneda", value: "Peso Chileno (CLP)" },
                            { icon: MapPin, label: "Distancia de Antofagasta", value: "~60 km al norte" },
                            { icon: Sun, label: "Clima", value: "Árido · 15–22°C · Camanchaca matutina" },
                            { icon: Compass, label: "Mejor época", value: "Octubre a Abril" },
                            { icon: Clock, label: "Acceso principal", value: "Ruta 1 (costera) desde Antofagasta" },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                style={{ padding: "18px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(8,145,178,0.12)", display: "flex", alignItems: "center", gap: "14px" }}>
                                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: ACDIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <item.icon size={16} style={{ color: AC }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>{item.label}</div>
                                    <div style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>{item.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────────────── */}
            <section style={{ padding: "100px 0", background: "linear-gradient(135deg, #001429 0%, #00264d 40%, #003666 70%, #024e87 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(8,145,178,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div className="container-rota" style={{ position: "relative", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "18px" }}>
                            EL CRUCE ESTÁ COMPLETO
                        </span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                            DEL PANTANAL<br /><span style={{ color: AC }}>AL PACÍFICO</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 40px" }}>
                            Mejillones es donde la Ruta Bioceánica encuentra el océano. Después de ríos, fronteras, montañas y desiertos, el viajero llega a la sensación de llegada — al silencio del Pacífico.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/es/cidades" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "0.875rem 2rem", background: AC, color: "#001e3c",
                                fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em",
                                textTransform: "uppercase", borderRadius: "0.75rem",
                                textDecoration: "none", transition: "all 0.3s",
                            }}>
                                Ver toda la ruta <ArrowRight size={14} />
                            </Link>
                            <Link to="/es/cidades/antofagasta" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "0.875rem 2rem", background: "transparent",
                                color: AC, fontWeight: 700, fontSize: "0.8rem",
                                letterSpacing: "0.1em", textTransform: "uppercase",
                                borderRadius: "0.75rem", textDecoration: "none",
                                border: "1px solid rgba(8,145,178,0.35)",
                                transition: "all 0.3s",
                            }}>
                                ← Antofagasta
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
