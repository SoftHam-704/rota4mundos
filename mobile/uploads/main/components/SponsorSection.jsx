import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
    {
        icon: Heart,
        type: "INDIVIDUAL",
        label: "Apoiador",
        accent: "#2A9D8F",
        accentRgb: "42,157,143",
        title: "Acredite na causa",
        desc: "Você não precisa ser uma empresa para fazer parte. Pessoas que acreditam na integração da América do Sul são o coração deste projeto.",
        cta: "Quero apoiar",
    },
    {
        icon: Building2,
        type: "EMPRESARIAL",
        label: "Patrocinador",
        accent: "#F4A261",
        accentRgb: "244,162,97",
        title: "Conecte sua marca",
        desc: "Hotels, operadoras, empresas de logística e serviços — sua marca no coração do corredor que vai transformar o comércio entre dois oceanos.",
        cta: "Falar sobre patrocínio",
        featured: true,
    },
    {
        icon: Landmark,
        type: "INSTITUCIONAL",
        label: "Parceiro Institucional",
        accent: "#818cf8",
        accentRgb: "129,140,248",
        title: "Seja referência",
        desc: "Prefeituras, secretarias, câmaras de comércio e entidades que querem protagonismo na narrativa da rota têm aqui sua vitrine.",
        cta: "Manifeste interesse",
    },
];

function SponsorCard({ card, index }) {
    const ref = useRef(null);

    function handleMouseMove(e) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }

    const Icon = card.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative" }}
        >
            {card.featured && (
                <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, #F4A261, #E9C46A)`,
                    color: "#061B33", fontSize: "9px", fontWeight: 800,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "4px 14px", borderRadius: "100px",
                    fontFamily: "Inter, sans-serif", zIndex: 10,
                    whiteSpace: "nowrap",
                }}>
                    Mais procurado
                </div>
            )}

            <Link
                to={`/apoie?tipo=${card.type}`}
                ref={ref}
                onMouseMove={handleMouseMove}
                style={{
                    display: "flex", flexDirection: "column",
                    textDecoration: "none", height: "100%",
                    position: "relative", borderRadius: "20px", overflow: "hidden",
                    background: card.featured
                        ? `rgba(${card.accentRgb}, 0.06)`
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${card.featured ? `rgba(${card.accentRgb},0.25)` : "rgba(255,255,255,0.07)"}`,
                    backdropFilter: "blur(16px)",
                    padding: "32px 28px",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="sponsor-glass-card"
            >
                {/* flashlight */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(${card.accentRgb},0.09), transparent 60%)`,
                    pointerEvents: "none", zIndex: 0,
                }} />

                {/* top accent */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, transparent, ${card.accent}cc, transparent)`,
                }} />

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* icon + label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                        <div style={{
                            width: "42px", height: "42px", borderRadius: "12px",
                            background: `rgba(${card.accentRgb},0.12)`,
                            border: `1px solid rgba(${card.accentRgb},0.2)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <Icon size={18} style={{ color: card.accent }} />
                        </div>
                        <span style={{
                            fontSize: "10px", fontWeight: 700, color: card.accent,
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "0.15em", textTransform: "uppercase",
                        }}>
                            {card.label}
                        </span>
                    </div>

                    <h3 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "1.75rem", color: "#fff",
                        letterSpacing: "0.04em", lineHeight: 1,
                        marginBottom: "14px",
                    }}>
                        {card.title}
                    </h3>

                    <p style={{
                        fontSize: "13px", color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.75, fontFamily: "Inter, sans-serif",
                        marginBottom: "28px", flex: 1,
                    }}>
                        {card.desc}
                    </p>

                    <span style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 700, color: card.accent,
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                        {card.cta} <ArrowRight size={13} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function SponsorSection() {
    return (
        <section style={{ background: "#061B33", padding: "100px 0", position: "relative", overflow: "hidden" }}>
            {/* ambient glow */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "900px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(244,162,97,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container-rota" style={{ position: "relative" }}>
                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 64px" }}
                >
                    <span style={{
                        display: "inline-block", fontSize: "10px", fontWeight: 700,
                        color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif", marginBottom: "16px",
                        background: "rgba(244,162,97,0.1)", padding: "4px 12px",
                        borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)",
                    }}>
                        Faça parte
                    </span>

                    <h2 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        color: "#fff", lineHeight: 1, letterSpacing: "0.04em",
                        marginBottom: "20px",
                    }}>
                        A ROTA É FEITA DE ASFALTO.<br />
                        <span style={{ color: "#2A9D8F" }}>ESTE PORTAL É FEITO DE PESSOAS.</span>
                    </h2>

                    <p style={{
                        fontSize: "15px", color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.75, fontFamily: "Inter, sans-serif",
                    }}>
                        O maior corredor de integração da América do Sul está sendo construído agora.
                        Entrar antes do pico de 2026 é uma janela que não volta.
                    </p>
                </motion.div>

                {/* cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "16px", alignItems: "stretch",
                }}>
                    {cards.map((card, i) => (
                        <SponsorCard key={card.type} card={card} index={i} />
                    ))}
                </div>

                {/* bottom cta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: "center", marginTop: "52px" }}
                >
                    <Link to="/apoie" style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "0.875rem 2.5rem",
                        background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                        color: "#061B33", fontWeight: 800, fontSize: "0.8rem",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        borderRadius: "0.75rem", border: "none",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        fontFamily: "Inter, sans-serif",
                    }}>
                        Ver todas as formas de participar <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>

            <style>{`
                .sponsor-glass-card:hover {
                    border-color: rgba(255,255,255,0.18) !important;
                    transform: translateY(-6px);
                    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
                }
            `}</style>
        </section>
    );
}
