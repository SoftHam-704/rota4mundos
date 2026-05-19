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
export default function MejillonesPage() {
    const isMobile = useIsMobile();
    const [lightbox, setLightbox] = useState(false);
    const src = useInfographic("mejillones");

    return (
        <div style={{ background: "#001e3c", minHeight: "100vh", color: "#fff", fontFamily: "Inter, sans-serif" }}>

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Regiao de Antofagasta"
                name={{ first: "Mejillones", second: "" }}
                tagline="O encerramento simbolico da travessia continental — porto artesanal, camanchaca e o por do sol mais emocionante do Pacifico."
                scene="pacifico"
                image="/cities/mejillones.png"
                accentColor="#0891b2"
                stats={[
                    { label: "Habitantes (estimativa)", value: 12000 },
                    { label: "Fundacao", value: 1879 },
                    { label: "Km de Antofagasta", value: 60, suffix: " km" },
                    { label: "Km da rota total", value: 3000, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO LIGHTBOX ────────────────────────────────── */}
            <section style={{ background: "#001428", padding: "80px 0" }}>
                <div className="container-rota">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ textAlign: "center", marginBottom: "36px" }}
                    >
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", letterSpacing: "0.06em", marginBottom: "10px" }}>
                            INFOGRÁFICO DA CIDADE
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "400px", margin: "0 auto" }}>
                            Dados, rotas e curiosidades de Mejillones em um só quadro.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        onClick={() => setLightbox(true)}
                        style={{ position: "relative", maxWidth: "700px", margin: "0 auto", cursor: "zoom-in", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                        <img src={src} alt="Infográfico Mejillones" style={{ width: "100%", display: "block" }} loading="lazy" />
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
                            src={src} alt="Infográfico Mejillones"
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

            {/* ── RESUMO 3 PILARES ───────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "640px", marginBottom: "52px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>A ESSÊNCIA DE MEJILLONES</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05, marginBottom: "16px" }}>
                            PORTO, MAR E<br /><span style={{ color: AC }}>IDENTIDADE COSTEIRA</span>
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                            Mejillones não tenta impressionar pela grandiosidade. Ela emociona pela verdade. Última parada da Rota Bioceânica, é aqui que o oceano finalmente responde ao viajante que atravessou um continente.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        {[
                            { icon: Anchor, title: "Porto Artesanal Vivo", desc: "Barcos, cais, pescadores e mercados de frutos do mar que funcionam há mais de um século sem interrupção. A vida marítima real, não reconstituída." },
                            { icon: Mountain, title: "Contraste Único no Mundo", desc: "O Deserto do Atacama — o mais árido do planeta — termina literalmente no Pacífico. Falésias rochosas desérticas e águas profundas do oceano dividem o mesmo horizonte." },
                            { icon: Globe, title: "Fim Simbólico da Rota", desc: "Depois de Pantanal, Chaco, Andes e Atacama, Mejillones é onde a travessia continental encontra o oceano. Um porto em escala humana para um momento de magnitude continental." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                                <CultCard icon={item.icon} title={item.title} desc={item.desc} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HISTÓRIA ───────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>MEMÓRIA DO PORTO</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            HISTÓRIA ENTRE<br /><span style={{ color: AC }}>O SALITRE E O PACÍFICO</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {[
                            { icon: Fish, year: "Séc. XIX", title: "Porto de Escoamento", desc: "Mejillones emergiu como ponto estratégico de saída para o salitre e minerais do interior árido do Atacama. Trabalhadores marítimos e embarcações definiram os primeiros traços da identidade local." },
                            { icon: Globe, year: "1879–1884", title: "Guerra do Pacífico", desc: "O conflito que redesenhou o mapa do norte sul-americano tornou os portos da costa estratégicos para movimentação militar e controle marítimo. A memória histórica da guerra permanece na identidade da região." },
                            { icon: Anchor, year: "Séc. XX", title: "Consolidação Pesqueira", desc: "Enquanto a era salitreira declinou, a pesca artesanal assumiu o papel de sustento e identidade. Os cais passaram dos vapores carregados de salitre às embarcações de madeira carregadas de frutos do mar." },
                            { icon: Star, year: "Hoje", title: "Porto Vivo e Autêntico", desc: "Mejillones preserva o que muitas cidades costeiras já perderam. A rotina do cais, o mercado de mariscos do amanhecer e o pôr do sol sobre o Pacífico seguem moldando uma identidade insubstituível." },
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

            {/* ── SPOTLIGHT: O RITMO DO PORTO ────────────────────────── */}
            <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #001e3c 0%, #003566 50%, #024e87 100%)" }}>
                <div className="container-rota">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "60px", alignItems: "center" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>IDENTIDADE PORTUÁRIA</span>
                            <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                                O RITMO DE UM<br /><span style={{ color: AC }}>PORTO REAL</span>
                            </h2>
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "32px" }}>
                                Em Mejillones, o mar não é paisagem — é trabalho, cultura e pertencimento. A cidade vive em três tempos: a madrugada dos pescadores, o meio-dia do mercado e o entardecer dourado sobre o Pacífico.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {[
                                    { icon: Clock, title: "Madrugada — Barcos no Horizonte", desc: "Antes do amanhecer, as embarcações partem. O cais acorda no escuro, com o ruído dos motores e o cheiro de sal. A primeira luz do dia encontra os barcos já no mar." },
                                    { icon: Fish, title: "Manhã — O Mercado Acorda", desc: "Com o retorno das embarcações, o mercado ganha vida. Mexilhões, ostras, congrios e erizos frescos chegam diretamente do oceano à banca. Gaivotas disputam os cais com os compradores." },
                                    { icon: Sun, title: "Entardecer — O Silêncio do Pacífico", desc: "O sol desce sobre o Atacama e pinta o oceano de dourado. Os barcos balançam devagar. A brisa marítima carrega o aroma da cozinha costeira. A travessia termina aqui, em paz." },
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
                            <img src="/cities/mejillones.png" alt="Porto de Mejillones"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,20,40,0.65) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: AC, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Mejillones, Chile</div>
                                <div style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "1.4rem", color: "#fff", letterSpacing: "0.04em" }}>Porto Natural do Atacama</div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Baía Natural · Pacífico Sul</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA 4 CARDS ────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>CULTURA E IDENTIDADE</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            O PACÍFICO<br /><span style={{ color: AC }}>COMO MODO DE VIDA</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                        {[
                            { icon: Anchor, title: "Vida Marítima", desc: "Em Mejillones, o mar não é fundo de tela — é atividade cotidiana. Os barcos, os cais e os mercados definem o calendário, o sustento e a identidade de quem nasceu aqui." },
                            { icon: Fish, title: "Pesca Artesanal", desc: "Geração após geração, os pescadores locais mantêm técnicas e rotas que a industrialização não substituiu. A pesca artesanal é patrimônio vivo da comunidade." },
                            { icon: Clock, title: "Memória Salitreira", desc: "A cidade guarda na arquitetura e na memória coletiva a era do salitre que transformou o norte chileno. Uma história de trabalho duro, migrações e construção de identidade." },
                            { icon: Wind, title: "Contemplação Pacífica", desc: "O vento que percorre os cais ao entardecer, o silêncio das vagas no pier e o céu estrelado do Atacama sobre o Pacífico criam um ambiente único de profundidade contemplativa." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <CultCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>GASTRONOMIA</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            O MAR<br /><span style={{ color: AC }}>DIRETO À MESA</span>
                        </h2>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: "14px" }}>
                            A culinária de Mejillones é fundada na pesca artesanal e na abundância do Pacífico Norte Chileno. Aqui, o conceito de "fresco" tem um significado literal — o peixe saiu do mar horas antes de chegar ao prato.
                        </p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
                        {[
                            { emoji: "🦪", name: "Mejillones", desc: "Os mexilhões frescos da baía que deram nome à cidade. Servidos cozidos, gratinados ou em caldos. O símbolo gastronômico local." },
                            { emoji: "🦪", name: "Ostras do Pacífico", desc: "Colhidas nas águas frias da costa, as ostras locais são consumidas frescas com limão — uma das iguarias mais valorizadas pelos visitantes." },
                            { emoji: "🍲", name: "Caldillo de Congrio", desc: "A sopa mais emblemática da culinária chilena, preparada com o congrio-rosa local, batatas, coentro e um caldo de intensidade marinha incomparável." },
                            { emoji: "🍋", name: "Ceviche Costeiro", desc: "Preparação em estilo nortino com peixe e frutos do mar frescos, limão e coentro. O frescor do Pacífico em cada garfada." },
                            { emoji: "🥟", name: "Empanadas de Mariscos", desc: "Massa crocante recheada com uma mistura de frutos do mar locais. Símbolo da culinária portuária chilena que acompanha qualquer refeição." },
                            { emoji: "🦔", name: "Erizos (Ouriços-do-mar)", desc: "Iguaria do norte chileno, consumida crua ou com azeite e limão. Uma experiência intensa de sabor que resume toda a essência do Pacífico Norte." },
                        ].map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                <DishCard {...dish} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRAÇÕES ───────────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#001e3c" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>O QUE VISITAR</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            ATRAÇÕES DE<br /><span style={{ color: AC }}>MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Anchor, name: "Baía de Mejillones", desc: "Uma das baías naturais mais protegidas e bonitas do Pacífico Sul. Águas calmas de azul profundo emolduradas por formações áridas do Atacama." },
                            { icon: Fish, name: "Cais Artesanal", desc: "O coração vivo do porto. Barcos coloridos, equipamentos de pesca, gaivotas e pescadores que mantêm uma rotina centenária de trabalho no mar." },
                            { icon: Utensils, name: "Mercado de Frutos do Mar", desc: "Nas primeiras horas da manhã, o mercado local ganha vida com mariscos e peixes frescos recém desembarcados. O cheiro do Pacífico em estado puro." },
                            { icon: Mountain, name: "Falésias do Atacama", desc: "Formações rochosas áridas que descem abruptamente até o oceano. O contraste visual entre o deserto cinza e o azul profundo do Pacífico é de rara beleza." },
                            { icon: Compass, name: "Praias Desertas", desc: "Praias de areia desértica praticamente sem infraestrutura turística. Solidão, silêncio oceânico e a linha do horizonte do Pacífico como única companhia." },
                            { icon: Sun, name: "Mirante do Pôr do Sol", desc: "Ao entardecer, o céu limpo do Atacama e a extensão infinita do Pacífico criam um espetáculo cromático de rara intensidade. Dourado, âmbar e azul profundo." },
                            { icon: Clock, name: "Patrimônio Histórico", desc: "Edificações e marcos que remetem às eras do salitre e da Guerra do Pacífico. A arquitetura da cidade guarda camadas de história marítima e mineira." },
                            { icon: Globe, name: "Marco da Rota Bioceânica", desc: "Mejillones é o encerramento simbólico da maior travessia continental da América do Sul. Do Pantanal ao Pacífico — a chegada acontece aqui." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                                <AttrCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO 3 DIAS ─────────────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>SUGESTÃO DE ROTEIRO</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            3 DIAS NO PORTO<br /><span style={{ color: AC }}>DO PACÍFICO</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                        {[
                            {
                                day: "DIA 1", subtitle: "Chegada e Descoberta do Porto",
                                items: ["Chegada por Antofagasta pela Rota 1 costeira", "Passeio pelo cais artesanal à tarde", "Mercado de frutos do mar e primeira degustação de mejillones", "Empanadas de mariscos em restaurante local", "Pôr do sol sobre a baía — o momento mais aguardado da rota"],
                            },
                            {
                                day: "DIA 2", subtitle: "Gastronomia e Paisagem",
                                items: ["Caldillo de congrio no almoço em restaurante ribeirinho", "Passeio pelas falésias do Atacama e praias desertas", "Ceviche e ostras frescas ao entardecer", "Noite no cais — silêncio do Pacífico e céu estrelado do Atacama", "Jaibas e erizos para fechar a noite gastronômica"],
                            },
                            {
                                day: "DIA 3", subtitle: "Ritual da Madrugada e Partida",
                                items: ["Acordar antes do amanhecer — acompanhar o retorno dos barcos", "Mercado de mariscos logo pela manhã com pescadores locais", "Última visita ao mirante com vista da baía", "Café com empanadas e pão de forma chileno", "Partida com a sensação de travessia completa — do Pantanal ao Pacífico"],
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
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>VOCÊ SABIA?</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            CURIOSIDADES<br /><span style={{ color: AC }}>SOBRE MEJILLONES</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Fish, text: "O nome 'Mejillones' vem dos abundantes mexilhões (mejillones em espanhol) que habitam a baía desde tempos pré-históricos, quando os povos originários da costa já os consumiam." },
                            { icon: Anchor, text: "A baía de Mejillones é considerada uma das mais protegidas do Pacífico Sul pelo Atacama, que age como barreira natural contra os ventos vindos do interior do continente." },
                            { icon: Globe, text: "Mejillones é o ponto de chegada simbólico da Rota Bioceânica — aproximadamente 3.000 km de travessia desde Campo Grande, no Brasil, até o Pacífico." },
                            { icon: Mountain, text: "O deserto do Atacama termina literalmente no oceano em Mejillones. As falésias rochosas áridas descem diretamente ao Pacífico sem transição — um dos contrastes visuais mais dramáticos do planeta." },
                            { icon: Star, text: "O céu noturno de Mejillones combina duas maravilhas: a ausência de poluição luminosa do Atacama e o horizonte infinito do Pacífico — uma dupla raridade para observação astronômica." },
                            { icon: Users, text: "Com apenas 12.000 habitantes, Mejillones mantém escala humana deliberada. A cidade nunca priorizou crescimento acelerado em detrimento da identidade marítima original." },
                            { icon: Clock, text: "Durante a Guerra do Pacífico (1879–1884), os portos do norte chileno, incluindo Mejillones, tiveram papel estratégico no conflito que redesenhou as fronteiras do Chile, Bolívia e Peru." },
                            { icon: Droplets, text: "A 'camanchaca' — névoa marítima densa que cobre o litoral nas primeiras horas da manhã — é um fenômeno característico de Mejillones que cria uma atmosfera cinematográfica ao amanhecer." },
                        ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                                <CurioItem {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ───────────────────────────────── */}
            <section style={{ padding: "80px 0", background: "#00162e" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: "520px", marginBottom: "48px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: AC, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>INFORMAÇÕES PRÁTICAS</span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05 }}>
                            COMO CHEGAR<br /><span style={{ color: AC }}>E SE PREPARAR</span>
                        </h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
                        {[
                            { icon: Globe, label: "Idioma", value: "Espanhol" },
                            { icon: Award, label: "Moeda", value: "Peso Chileno (CLP)" },
                            { icon: MapPin, label: "Distância de Antofagasta", value: "~60 km ao norte" },
                            { icon: Sun, label: "Clima", value: "Árido · 15–22°C · Camanchaca matinal" },
                            { icon: Compass, label: "Melhor época", value: "Outubro a Abril" },
                            { icon: Clock, label: "Acesso principal", value: "Ruta 1 (costeira) desde Antofagasta" },
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
                            A TRAVESSIA ESTÁ COMPLETA
                        </span>
                        <h2 style={{ fontFamily: '"Bebas Neue",sans-serif', fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "20px" }}>
                            DO PANTANAL<br /><span style={{ color: AC }}>AO PACÍFICO</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 40px" }}>
                            Mejillones é onde a Rota Bioceânica encontra o oceano. Depois de rios, fronteiras, montanhas e desertos, o viajante chega à sensação de chegada — ao silêncio do Pacífico.
                        </p>
                        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/cidades" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "0.875rem 2rem", background: AC, color: "#001e3c",
                                fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em",
                                textTransform: "uppercase", borderRadius: "0.75rem",
                                textDecoration: "none", transition: "all 0.3s",
                            }}>
                                Ver toda a rota <ArrowRight size={14} />
                            </Link>
                            <Link to="/cidades/antofagasta" style={{
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
