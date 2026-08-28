import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const CARDS = [
    {
        tipo:     "INDIVIDUAL",
        label:    "Apoiador",
        title:    "Acredite na Causa",
        desc:     "Pessoas que acreditam na integração da América do Sul e querem fazer parte dessa história.",
        cta:      "Quero apoiar",
        icon:     Heart,
        accent:   "#2A9D8F",
        rgb:      "42,157,143",
        badge:    null,
    },
    {
        tipo:     "EMPRESARIAL",
        label:    "Patrocinador",
        title:    "Conecte sua Marca",
        desc:     "Hotéis, empresas de logística e operadores que querem ser protagonistas na narrativa da rota.",
        cta:      "Falar sobre patrocínio",
        icon:     Building2,
        accent:   "#F4A261",
        rgb:      "244,162,97",
        badge:    "Mais procurado",
    },
    {
        tipo:     "INSTITUCIONAL",
        label:    "Carta de Intenções",
        title:    "Seja Referência",
        desc:     "Prefeituras, secretarias, câmaras de comércio e entidades que querem protagonismo no corredor.",
        cta:      "Manifesto interesse",
        icon:     Landmark,
        accent:   "#818cf8",
        rgb:      "129,140,248",
        badge:    null,
    },
];

function ApoieCard({ card, index }) {
    const ref = useRef(null);

    function handleMouseMove(e) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    const Icon = card.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: index * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    padding: "32px 28px 28px",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className={`apoie-glass-card apoie-card-${card.tipo}`}
            >
                {/* flashlight */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(${card.rgb},0.10), transparent 60%)`,
                    pointerEvents: "none",
                }} />

                {/* badge */}
                {card.badge && (
                    <span style={{
                        position: "absolute", top: "16px", right: "16px",
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

                {/* ícone */}
                <div style={{
                    width: "46px", height: "46px", borderRadius: "12px",
                    background: `rgba(${card.rgb},0.12)`,
                    border: `1px solid rgba(${card.rgb},0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "20px", flexShrink: 0,
                }}>
                    <Icon size={20} style={{ color: card.accent }} />
                </div>

                {/* label */}
                <span style={{
                    fontSize: "9px", fontWeight: 700,
                    color: card.accent, letterSpacing: "0.2em",
                    textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                    marginBottom: "10px", display: "block",
                }}>
                    {card.label}
                </span>

                {/* título */}
                <h3 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.6rem", color: "#fff",
                    letterSpacing: "0.04em", lineHeight: 1.1,
                    marginBottom: "14px",
                }}>
                    {card.title}
                </h3>

                {/* descrição */}
                <p style={{
                    fontSize: "13px", color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75, fontFamily: "Inter, sans-serif",
                    flex: 1, marginBottom: "24px",
                }}>
                    {card.desc}
                </p>

                {/* CTA */}
                <span style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontSize: "11px", fontWeight: 700, color: card.accent,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                    {card.cta} <ArrowRight size={12} />
                </span>

                {/* linha inferior colorida */}
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
    return (
        <section
            id="apoie"
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "100px 0 90px",
                backgroundImage: "url('/rota_asfalto.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {/* overlay escuro para legibilidade */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(2,13,26,0.78) 0%, rgba(2,13,26,0.65) 50%, rgba(2,13,26,0.85) 100%)",
                pointerEvents: "none",
            }} />

            {/* fade superior */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, #020d1a, transparent)", pointerEvents: "none" }} />
            {/* fade inferior */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #020d1a, transparent)", pointerEvents: "none" }} />

            <div className="container-rota" style={{ position: "relative" }}>

                {/* cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "60px" }}
                >
                    <span style={{
                        display: "inline-block", fontSize: "10px", fontWeight: 700,
                        color: "#F4A261", letterSpacing: "0.22em", textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif", marginBottom: "20px",
                        background: "rgba(244,162,97,0.1)", padding: "5px 16px",
                        borderRadius: "100px", border: "1px solid rgba(244,162,97,0.2)",
                    }}>
                        Faça parte
                    </span>

                    <h2 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                        color: "#fff", lineHeight: 0.95,
                        letterSpacing: "0.04em", marginBottom: "20px",
                    }}>
                        A ROTA É FEITA<br />
                        DE ASFALTO.<br />
                        <span style={{ color: "#2A9D8F" }}>ESTE PORTAL É<br />FEITO DE PESSOAS.</span>
                    </h2>

                    <p style={{
                        fontSize: "15px", color: "rgba(255,255,255,0.45)",
                        fontFamily: "Inter, sans-serif", lineHeight: 1.8,
                        maxWidth: "480px", margin: "0 auto",
                    }}>
                        O maior corredor de integração da América do Sul já tem data. A janela de 2026 está aberta — falta o seu nome nele.
                    </p>
                </motion.div>

                {/* 3 cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px",
                    alignItems: "stretch",
                    marginBottom: "48px",
                }}>
                    {CARDS.map((card, i) => (
                        <ApoieCard key={card.tipo} card={card} index={i} />
                    ))}
                </div>

                {/* botão ver todas */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Link
                        to="/apoie"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "14px 36px", borderRadius: "14px",
                            background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                            color: "#061B33", fontSize: "12px", fontWeight: 800,
                            letterSpacing: "0.1em", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", textDecoration: "none",
                            boxShadow: "0 8px 30px rgba(244,162,97,0.3)",
                            transition: "opacity 0.2s, transform 0.2s",
                        }}
                        className="apoie-ver-todas"
                    >
                        Ver todas as formas de participar <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>

            <style>{`
                .apoie-glass-card:hover {
                    border-color: rgba(255,255,255,0.18) !important;
                    transform: translateY(-6px);
                    box-shadow: 0 24px 60px rgba(0,0,0,0.5);
                }
                .apoie-ver-todas:hover { opacity: 0.88; transform: translateY(-2px); }
            `}</style>
        </section>
    );
}
