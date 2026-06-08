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

            <rect width="400" height="200" fill="url(#sky-mej)" />

            {[
                [22, 18], [55, 10], [90, 22], [130, 8], [170, 16], [210, 6],
                [255, 20], [290, 12], [335, 8], [370, 18], [42, 35], [105, 30],
                [185, 28], [310, 32], [360, 38], [145, 42], [75, 48], [240, 40],
            ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.1 : 0.7} fill="white" opacity={0.5 + (i % 4) * 0.12} />
            ))}

            <circle cx="340" cy="38" r="28" fill="url(#moon-glow-mej)" />
            <circle cx="340" cy="38" r="11" fill="#e0f7ff" opacity="0.92" />
            <circle cx="344" cy="34" r="8" fill="#001e3c" opacity="0.2" />

            <path
                d="M 0 115 L 28 80 L 55 98 L 80 62 L 108 85 L 135 50 L 162 75 L 185 58 L 210 78 L 235 55 L 260 80 L 285 63 L 310 82 L 332 68 L 358 88 L 400 72 L 400 130 L 0 130 Z"
                fill="#00111f" opacity="0.85"
            />
            <path
                d="M 0 130 L 30 110 L 60 120 L 90 105 L 125 118 L 155 108 L 180 118 L 400 115 L 400 138 L 0 138 Z"
                fill="#00080f" opacity="0.9"
            />

            <rect x="0" y="138" width="400" height="62" fill="url(#ocean-mej)" />

            {[145, 155, 165, 177, 190].map((y, i) => (
                <path key={i}
                    d={`M 0 ${y} Q ${50 + i * 10} ${y - 3} ${100 + i * 5} ${y} Q ${160} ${y + 3} ${220 + i * 5} ${y} Q ${290} ${y - 3} ${400} ${y}`}
                    stroke="#38bdf8" strokeWidth={0.6 - i * 0.08} fill="none" opacity={0.15 + i * 0.04}
                />
            ))}

            <ellipse cx="340" cy="155" rx="15" ry="5" fill="#bae6fd" opacity="0.15" />
            <ellipse cx="340" cy="165" rx="10" ry="3" fill="#bae6fd" opacity="0.08" />

            {[155, 168, 181, 194, 207].map((x, i) => (
                <rect key={i} x={x} y={130 + i % 2} width="3" height={18 - i * 1} fill="url(#pier-mej)" opacity="0.85" />
            ))}
            <rect x="148" y="128" width="66" height="5" rx="1" fill="#7c5c3e" opacity="0.9" />
            {[150, 156, 162, 168, 174, 180, 186, 192, 198, 204].map((x, i) => (
                <rect key={i} x={x} y={128} width="2" height="5" fill="#5a4030" opacity="0.5" />
            ))}

            <path d="M 168 136 Q 182 148 196 136 L 193 131 L 171 131 Z" fill="#1a3a5e" opacity="0.95" />
            <rect x="176" y="124" width="11" height="9" rx="1" fill="#0c2540" opacity="0.9" />
            <rect x="178" y="126" width="3" height="3" rx="0.5" fill="#bae6fd" opacity="0.5" />
            <line x1="181" y1="110" x2="181" y2="124" stroke="#5a3e28" strokeWidth="1.2" />
            <line x1="181" y1="112" x2="191" y2="117" stroke="#7c5638" strokeWidth="0.8" />
            <line x1="181" y1="110" x2="193" y2="131" stroke="#a07850" strokeWidth="0.5" opacity="0.6" />

            <path d="M 250 140 Q 260 146 270 140 L 268 136 L 252 136 Z" fill="#102a48" opacity="0.7" />
            <line x1="258" y1="126" x2="258" y2="136" stroke="#4a3020" strokeWidth="0.8" opacity="0.6" />

            <path d="M 90 95 Q 93 92 96 95" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5" />
            <path d="M 100 90 Q 103 87 106 90" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
            <path d="M 305 85 Q 308 82 311 85" stroke="white" strokeWidth="0.7" fill="none" opacity="0.4" />
        </svg>
    );
}

export default function MejillonesPageEn() {
    const isMobile = useIsMobile();
    const [lightbox, setLightbox] = useState(false);
    const src = useInfographic("mejillones");

    return (
        <div style={{ background: "#001e3c", minHeight: "100vh", color: "#fff", fontFamily: "Inter, sans-serif" }}>

            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Antofagasta Region"
                name={{ first: "Mejillones", second: "" }}
                tagline="The symbolic closing of the continental crossing — artisanal port, camanchaca fog, and the most breathtaking sunset on the Pacific."
                scene="pacifico"
                image="/cities/mejillones.jpg"
                accentColor="#0891b2"
                stats={[
                    { label: "Inhabitants (estimate)", value: 12000 },
                    { label: "Founded", value: 1879 },
                    { label: "Km from Antofagasta", value: 60, suffix: " km" },
                    { label: "Km of total route", value: 3000, suffix: " km" },
                ]}
            />

            <section style={{ background: "#001428", padding: "80px 0" }}>
                <div className="container-rota">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ textAlign: "center", marginBottom: "36px" }}
                    >
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", letterSpacing: "0.06em", marginBottom: "10px" }}>
                            CITY INFOGRAPHIC
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "400px", margin: "0 auto" }}>
                            Data, routes, and curiosities about Mejillones in a single frame.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        onClick={() => setLightbox(true)}
                        style={{ position: "relative", maxWidth: "700px", margin: "0 auto", cursor: "zoom-in", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                        <img src={src} alt="Mejillones Infographic" style={{ width: "100%", display: "block" }} loading="lazy" />
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,20,40,0.35)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                            onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "rgba(0,0,0,0.6)", borderRadius: "100px", border: "1px solid rgba(8,145,178,0.4)" }}>
                                <ZoomIn size={16} style={{ color: AC }} />
                                <span style={{ fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Enlarge</span>
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
                            src={src} alt="Mejillones Infographic"
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

            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "640px", marginBottom: "52px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>THE ESSENCE OF MEJILLONES</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05, marginBottom: "16px" }}>
                            PORT, SEA AND<br /><span style={{ color: AC }}>COASTAL IDENTITY</span>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                            Mejillones does not try to impress with grandeur. It moves you with truth. The last stop of the Bioceanic Route, this is where the ocean finally answers the traveler who crossed an entire continent.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        {[
                            { icon: Anchor, title: "Living Artisanal Port", desc: "Boats, docks, fishermen, and seafood markets that have operated for over a century without interruption. Real maritime life, not a reconstruction." },
                            { icon: Mountain, title: "Contrast Unique in the World", desc: "The Atacama Desert — the driest on the planet — ends literally at the Pacific. Desert rocky cliffs and deep ocean waters share the same horizon." },
                            { icon: Globe, title: "Symbolic End of the Route", desc: "After the Pantanal, Chaco, Andes, and Atacama, Mejillones is where the continental crossing meets the ocean. A human-scale port for a moment of continental magnitude." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                                <CultCard icon={item.icon} title={item.title} desc={item.desc} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>PORT MEMORY</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            HISTORY BETWEEN<br /><span style={{ color: AC }}>SALTPETER AND THE PACIFIC</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {[
                            { icon: Fish, year: "19th Century", title: "Export Port", desc: "Mejillones emerged as a strategic outlet for saltpeter and minerals from the arid Atacama interior. Maritime workers and vessels defined the first traces of local identity." },
                            { icon: Globe, year: "1879–1884", title: "War of the Pacific", desc: "The conflict that redrew the map of northern South America made coastal ports strategic for military movement and maritime control. The historical memory of the war remains in the region's identity." },
                            { icon: Anchor, year: "20th Century", title: "Fishing Consolidation", desc: "As the saltpeter era declined, artisanal fishing took over as livelihood and identity. The docks shifted from steamships loaded with saltpeter to wooden vessels loaded with seafood." },
                            { icon: Star, year: "Today", title: "Living and Authentic Port", desc: "Mejillones preserves what many coastal cities have already lost. The dock routine, the dawn seafood market, and the sunset over the Pacific continue to shape an irreplaceable identity." },
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

            <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #001e3c 0%, #003566 50%, #024e87 100%)" }}>
                <div className="container-rota">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "60px", alignItems: "center" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>PORT IDENTITY</span>
                            <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                                THE RHYTHM OF A<br /><span style={{ color: AC }}>REAL PORT</span>
                            </h2>
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>
                                In Mejillones, the sea is not scenery — it is work, culture, and belonging. The city lives in three tempos: the fishermen's early morning, the midday market, and the golden sunset over the Pacific.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {[
                                    { icon: Clock, title: "Early Morning — Boats on the Horizon", desc: "Before dawn, the vessels depart. The dock wakes in darkness, filled with the sound of engines and the smell of salt. The first light of day finds the boats already at sea." },
                                    { icon: Fish, title: "Morning — The Market Comes Alive", desc: "With the return of the boats, the market springs to life. Fresh mussels, oysters, conger eels, and sea urchins arrive directly from the ocean to the stall. Seagulls compete with buyers at the docks." },
                                    { icon: Sun, title: "Sunset — The Silence of the Pacific", desc: "The sun descends over the Atacama and paints the ocean gold. The boats rock gently. The sea breeze carries the aroma of coastal cooking. The crossing ends here, in peace." },
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
                            <img src="/cities/mejillones.jpg" alt="Port of Mejillones"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,40,0.65) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: AC, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Mejillones, Chile</div>
                                <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.4rem", color: "#fff", letterSpacing: "0.04em" }}>Natural Port of the Atacama</div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Natural Bay · South Pacific</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>CULTURE AND IDENTITY</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            THE PACIFIC<br /><span style={{ color: AC }}>AS A WAY OF LIFE</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                        {[
                            { icon: Anchor, title: "Maritime Life", desc: "In Mejillones, the sea is not a backdrop — it is daily activity. Boats, docks, and markets define the calendar, livelihood, and identity of those born here." },
                            { icon: Fish, title: "Artisanal Fishing", desc: "Generation after generation, local fishermen maintain techniques and routes that industrialization has not replaced. Artisanal fishing is the community's living heritage." },
                            { icon: Clock, title: "Saltpeter Memory", desc: "The city holds in its architecture and collective memory the saltpeter era that transformed northern Chile. A history of hard work, migration, and identity-building." },
                            { icon: Wind, title: "Pacific Contemplation", desc: "The wind sweeping the docks at dusk, the silence of the waves at the pier, and the Atacama's starry sky over the Pacific create a unique atmosphere of deep contemplation." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <CultCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>GASTRONOMY</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            THE SEA<br /><span style={{ color: AC }}>STRAIGHT TO THE TABLE</span>
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: "14px" }}>
                            The cuisine of Mejillones is grounded in artisanal fishing and the abundance of the Northern Chilean Pacific. Here, the concept of "fresh" has a literal meaning — the fish left the sea hours before reaching the plate.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
                        {[
                            { emoji: "🦪", name: "Mejillones (Mussels)", desc: "Fresh mussels from the bay that gave the city its name. Served boiled, au gratin, or in broths. The local gastronomic symbol." },
                            { emoji: "🦪", name: "Pacific Oysters", desc: "Harvested from the cold coastal waters, local oysters are enjoyed fresh with lemon — one of the most prized delicacies for visitors." },
                            { emoji: "🍲", name: "Caldillo de Congrio", desc: "The most emblematic soup of Chilean cuisine, prepared with local rose conger eel, potatoes, cilantro, and a broth of unparalleled oceanic intensity." },
                            { emoji: "🍋", name: "Coastal Ceviche", desc: "Prepared in northern style with fresh fish and seafood, lemon, and cilantro. The freshness of the Pacific in every bite." },
                            { emoji: "🥟", name: "Seafood Empanadas", desc: "Crispy pastry filled with a mixture of local seafood. A symbol of Chilean port cuisine that accompanies any meal." },
                            { emoji: "🦔", name: "Erizos (Sea Urchins)", desc: "A delicacy of northern Chile, consumed raw or with olive oil and lemon. An intense flavor experience that captures the entire essence of the Northern Pacific." },
                        ].map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                <DishCard {...dish} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>WHAT TO VISIT</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            ATTRACTIONS IN<br /><span style={{ color: AC }}>MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Anchor, name: "Bay of Mejillones", desc: "One of the most sheltered and beautiful natural bays in the South Pacific. Deep blue calm waters framed by arid Atacama formations." },
                            { icon: Fish, name: "Artisanal Dock", desc: "The living heart of the port. Colorful boats, fishing gear, seagulls, and fishermen maintaining a century-old routine of work at sea." },
                            { icon: Utensils, name: "Seafood Market", desc: "In the early morning hours, the local market comes alive with freshly landed seafood and fish. The scent of the Pacific in its purest state." },
                            { icon: Mountain, name: "Atacama Cliffs", desc: "Arid rocky formations that plunge abruptly into the ocean. The visual contrast between the grey desert and the deep blue Pacific is of rare beauty." },
                            { icon: Compass, name: "Desert Beaches", desc: "Desert sand beaches with virtually no tourist infrastructure. Solitude, oceanic silence, and the Pacific horizon as your only companion." },
                            { icon: Sun, name: "Sunset Viewpoint", desc: "At dusk, the clear Atacama sky and the infinite expanse of the Pacific create a chromatic spectacle of rare intensity. Gold, amber, and deep blue." },
                            { icon: Clock, name: "Historical Heritage", desc: "Buildings and landmarks evoking the saltpeter and War of the Pacific eras. The city's architecture holds layers of maritime and mining history." },
                            { icon: Globe, name: "Bioceanic Route Landmark", desc: "Mejillones is the symbolic closing of South America's greatest continental crossing. From the Pantanal to the Pacific — the arrival happens here." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                                <AttrCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>SUGGESTED ITINERARY</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            3 DAYS AT THE PORT<br /><span style={{ color: AC }}>OF THE PACIFIC</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                        {[
                            {
                                day: "DAY 1", subtitle: "Arrival and Discovery of the Port",
                                items: ["Arrival from Antofagasta via the coastal Route 1", "Afternoon stroll along the artisanal dock", "Seafood market and first tasting of mejillones", "Seafood empanadas at a local restaurant", "Sunset over the bay — the most awaited moment of the route"],
                            },
                            {
                                day: "DAY 2", subtitle: "Gastronomy and Landscape",
                                items: ["Caldillo de congrio for lunch at a waterfront restaurant", "Walk along the Atacama cliffs and desert beaches", "Ceviche and fresh oysters at sunset", "Evening at the dock — Pacific silence and the Atacama starry sky", "Jaibas and erizos to close the gastronomic night"],
                            },
                            {
                                day: "DAY 3", subtitle: "Dawn Ritual and Departure",
                                items: ["Wake before dawn — watch the boats return from sea", "Seafood market in the morning with local fishermen", "Final visit to the viewpoint overlooking the bay", "Coffee with empanadas and Chilean bread", "Departure with the feeling of a complete crossing — from the Pantanal to the Pacific"],
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

            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>DID YOU KNOW?</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            CURIOSITIES<br /><span style={{ color: AC }}>ABOUT MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Fish, text: "The name 'Mejillones' comes from the abundant mussels (mejillones in Spanish) that have inhabited the bay since prehistoric times, when the indigenous coastal peoples already harvested them." },
                            { icon: Anchor, text: "The bay of Mejillones is considered one of the most sheltered in the South Pacific, protected by the Atacama Desert, which acts as a natural barrier against winds from the continental interior." },
                            { icon: Globe, text: "Mejillones is the symbolic arrival point of the Bioceanic Route — approximately 3,000 km of crossing from Campo Grande, in Brazil, to the Pacific." },
                            { icon: Mountain, text: "The Atacama Desert ends literally at the ocean in Mejillones. The arid rocky cliffs descend directly into the Pacific without transition — one of the most dramatic visual contrasts on the planet." },
                            { icon: Star, text: "The night sky over Mejillones combines two wonders: the absence of light pollution from the Atacama and the infinite Pacific horizon — a rare double opportunity for astronomical observation." },
                            { icon: Users, text: "With only 12,000 inhabitants, Mejillones deliberately maintains a human scale. The city never prioritized rapid growth at the expense of its original maritime identity." },
                            { icon: Clock, text: "During the War of the Pacific (1879–1884), the ports of northern Chile, including Mejillones, played a strategic role in the conflict that redrawn the borders of Chile, Bolivia, and Peru." },
                            { icon: Droplets, text: "The 'camanchaca' — a dense marine fog that covers the coastline in the early morning hours — is a characteristic phenomenon of Mejillones that creates a cinematic atmosphere at dawn." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                                <CurioItem {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>PRACTICAL INFORMATION</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            HOW TO GET THERE<br /><span style={{ color: AC }}>AND PREPARE</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Globe, label: "Language", value: "Spanish" },
                            { icon: Award, label: "Currency", value: "Chilean Peso (CLP)" },
                            { icon: MapPin, label: "Distance from Antofagasta", value: "~60 km north" },
                            { icon: Sun, label: "Climate", value: "Arid · 15–22°C · Morning camanchaca" },
                            { icon: Compass, label: "Best season", value: "October to April" },
                            { icon: Clock, label: "Main access", value: "Route 1 (coastal) from Antofagasta" },
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

            <section style={{ padding: "100px 0", background: "linear-gradient(135deg, #001429 0%, #00264d 40%, #003666 70%, #024e87 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(8,145,178,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div className="container-rota" style={{ position: "relative", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "18px" }}>
                            THE CROSSING IS COMPLETE
                        </span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                            FROM THE PANTANAL<br /><span style={{ color: AC }}>TO THE PACIFIC</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 40px" }}>
                            Mejillones is where the Bioceanic Route meets the ocean. After rivers, borders, mountains, and deserts, the traveler arrives at the feeling of arrival — at the silence of the Pacific.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/en/cidades" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "0.875rem 2rem", background: AC, color: "#001e3c",
                                fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em",
                                textTransform: "uppercase", borderRadius: "0.75rem",
                                textDecoration: "none", transition: "all 0.3s",
                            }}>
                                See the full route <ArrowRight size={14} />
                            </Link>
                            <Link to="/en/cidades/antofagasta" style={{
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
