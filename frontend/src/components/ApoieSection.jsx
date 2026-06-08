import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const CARD_META = [
    { tipo: "INDIVIDUAL",   icon: Heart,    accent: "#2A9D8F", rgb: "42,157,143" },
    { tipo: "EMPRESARIAL",  icon: Building2, accent: "#F4A261", rgb: "244,162,97" },
    { tipo: "INSTITUCIONAL", icon: Landmark, accent: "#818cf8", rgb: "129,140,248" },
];

/* ── helper media query ─────────────────────────────────────── */
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false
    );
    useEffect(() => {
        const mq = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        mq.addEventListener("change", handler);
        setMatches(mq.matches);
        return () => mq.removeEventListener("change", handler);
    }, [query]);
    return matches;
}

function ApoieCard({ card, index, isMobile }) {
    const ref = useRef(null);

    function handleMouseMove(e) {
        if (isMobile) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    const Icon = card.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: "100%" }}
        >
            <Link
                to={`/apoie?tipo=${card.tipo}`}
                ref={ref}
                onMouseMove={handleMouseMove}
                style={{
                    display: "flex", flexDirection: "column",
                    textDecoration: "none",
                    height: "100%",
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(${card.rgb},0.2)`,
                    backdropFilter: "blur(18px)",
                    padding: isMobile ? "26px 22px 24px" : "32px 28px 28px",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className={`apoie-glass-card apoie-card-${card.tipo}`}
            >
                {!isMobile && (
                    <div style={{
                        position: "absolute", inset: 0, borderRadius: "20px",
                        background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(${card.rgb},0.10), transparent 60%)`,
                        pointerEvents: "none",
                    }} />
                )}

                {card.badge && (
                    <span style={{
                        position: "absolute", top: "14px", right: "14px",
                        fontSize: "9px", fontWeight: 700,
                        color: card.accent,
                        background: `rgba(${card.rgb},0.15)`,
                        border: `1px solid rgba(${card.rgb},0.3)`,
                        padding: "3px 10px", borderRadius: "100px",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif",
                    }}>
                        {card.badge}
                    </span>
                )}

                <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `rgba(${card.rgb},0.12)`,
                    border: `1px solid rgba(${card.rgb},0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "16px", flexShrink: 0,
                }}>
                    <Icon size={20} style={{ color: card.accent }} />
                </div>

                <span style={{
                    fontSize: "9px", fontWeight: 700,
                    color: card.accent, letterSpacing: "0.2em",
                    textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                    marginBottom: "8px", display: "block",
                }}>
                    {card.label}
                </span>

                <h3 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(1.4rem, 5.5vw, 1.7rem)",
                    color: "#fff",
                    letterSpacing: "0.04em", lineHeight: 1.05,
                    marginBottom: "12px",
                }}>
                    {card.title}
                </h3>

                <p style={{
                    fontSize: "clamp(12px, 3vw, 13px)",
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.65,
                    fontFamily: "Inter, sans-serif",
                    flex: 1, marginBottom: "20px",
                }}>
                    {card.desc}
                </p>

                <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontSize: "11px", fontWeight: 700, color: card.accent,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                    {card.cta} <ArrowRight size={12} />
                </span>

                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, rgba(${card.rgb},0.5), transparent)`,
                }} />
            </Link>
        </motion.div>
    );
}

export default function ApoieSection() {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const { t } = useLanguage();
    const cardsData = t("apoie.cards");
    const cards = CARD_META.map((meta, i) => ({ ...meta, ...cardsData[i] }));

    return (
        <section
            id="apoie"
            style={{
                position: "relative",
                overflow: "hidden",
                padding: isMobile ? "64px 0 64px" : "100px 0 90px",
                backgroundImage: "url('/rota_asfalto.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: isMobile ? "scroll" : "fixed",
            }}
        >
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(2,13,26,0.82) 0%, rgba(2,13,26,0.7) 50%, rgba(2,13,26,0.9) 100%)",
                pointerEvents: "none",
            }} />

            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to bottom, #020d1a, transparent)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to top, #020d1a, transparent)", pointerEvents: "none" }} />

            <div className="container-rota" style={{ position: "relative" }}>

                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{
                        textAlign: "center",
                        marginBottom: isMobile ? "40px" : "60px",
                    }}
                >
                    <span style={{
                        display: "inline-block",
                        fontSize: "10px", fontWeight: 700,
                        color: "#F4A261", letterSpacing: "0.22em", textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif", marginBottom: "16px",
                        background: "rgba(244,162,97,0.1)",
                        padding: "5px 14px",
                        borderRadius: "100px",
                        border: "1px solid rgba(244,162,97,0.2)",
                    }}>
                        {t("apoie.overline")}
                    </span>

                    <h2 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "var(--fs-section, clamp(2rem, 8vw, 4.5rem))",
                        color: "#fff", lineHeight: 0.95,
                        letterSpacing: "0.04em",
                        marginBottom: "16px",
                    }}>
                        {t("apoie.titlePart1")}<br />
                        {t("apoie.titlePart2")}<br />
                        <span style={{ color: "#2A9D8F" }}>{t("apoie.titlePart3")}<br />{t("apoie.titlePart4")}</span>
                    </h2>

                    <p style={{
                        fontSize: "clamp(13px, 3.4vw, 15px)",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.7,
                        maxWidth: "480px", margin: "0 auto",
                        padding: "0 8px",
                    }}>
                        {t("apoie.description")}
                    </p>
                </motion.div>

                <div className="apoie-cards-grid">
                    {cards.map((card, i) => (
                        <ApoieCard key={card.tipo} card={card} index={i} isMobile={isMobile} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? "32px" : "48px" }}
                >
                    <Link
                        to="/apoie"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: isMobile ? "13px 28px" : "14px 36px",
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                            color: "#061B33",
                            fontSize: isMobile ? "11px" : "12px",
                            fontWeight: 800,
                            letterSpacing: "0.1em", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", textDecoration: "none",
                            boxShadow: "0 8px 30px rgba(244,162,97,0.3)",
                            transition: "opacity 0.2s, transform 0.2s",
                            textAlign: "center",
                            maxWidth: "100%",
                        }}
                        className="apoie-ver-todas"
                    >
                        {isMobile ? t("apoie.ctaMobile") : t("apoie.cta")} <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>

            <style>{`
                .apoie-cards-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                    align-items: stretch;
                }
                @media (min-width: 768px) {
                    .apoie-cards-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 16px;
                    }
                }
                .apoie-glass-card:hover {
                    border-color: rgba(255,255,255,0.18) !important;
                    transform: translateY(-6px);
                    box-shadow: 0 24px 60px rgba(0,0,0,0.5);
                }
                @media (hover: none) {
                    .apoie-glass-card:hover { transform: none !important; }
                    .apoie-glass-card:active {
                        transform: scale(0.98);
                        transition: transform 0.1s;
                    }
                }
                .apoie-ver-todas:hover { opacity: 0.88; transform: translateY(-2px); }
            `}</style>
        </section>
    );
}
