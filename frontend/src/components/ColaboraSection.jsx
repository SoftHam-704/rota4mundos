import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenLine, Camera, BookOpen, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ITEM_ICONS = [PenLine, Camera, BookOpen];

export default function ColaboraSection() {
    const { t } = useTranslation();
    const items = t("colabo.items", { returnObjects: true });
    return (
        <section style={{
            background: "linear-gradient(180deg, #080704 0%, #061220 50%, #080704 100%)",
            padding: "clamp(56px,10vw,96px) 0",
            position: "relative", overflow: "hidden",
        }}>
            {/* Glow dourado central */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 50% 50%, rgba(200,146,42,0.09) 0%, transparent 65%)",
            }} />

            <div className="container-rota" style={{ position: "relative", zIndex: 1, padding: "0 1rem" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "clamp(32px, 6vw, 72px)",
                    alignItems: "center",
                }}>
                    {/* Texto */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <p style={{
                            fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em",
                            color: "#C8922A", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", marginBottom: "14px",
                        }}>
                            {t("colabo.overline")}
                        </p>
                        <h2 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
                            color: "#F5EDD6", letterSpacing: "0.04em",
                            lineHeight: 0.95, margin: "0 0 20px",
                        }}>
                            {t("colabo.titleMain")}<br />
                            <span style={{ color: "#C8922A" }}>{t("colabo.titleHighlight")}</span>
                        </h2>
                        <p style={{
                            fontFamily: '"Lora", Georgia, serif',
                            fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
                            fontStyle: "italic", color: "rgba(245,237,214,0.55)",
                            lineHeight: 1.75, maxWidth: "420px", marginBottom: "32px",
                        }}>
                            {t("colabo.description")}
                        </p>

                        <Link to="/colabore" style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "13px 28px", borderRadius: "50px",
                            background: "linear-gradient(135deg, #C8922A, #E9C46A)",
                            color: "#080704", fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "16px", letterSpacing: "0.1em",
                            textDecoration: "none",
                            boxShadow: "0 4px 24px rgba(200,146,42,0.3)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,146,42,0.4)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,146,42,0.3)"; }}
                        >
                            {t("colabo.cta")} <ArrowRight size={15} />
                        </Link>
                    </motion.div>

                    {/* Cards de tipo */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                    >
                        {items.map((label, i) => {
                            const Icon = ITEM_ICONS[i];
                            return (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "16px",
                                        padding: "18px 22px", borderRadius: "16px",
                                        border: "1px solid rgba(200,146,42,0.15)",
                                        background: "rgba(200,146,42,0.05)",
                                    }}
                                >
                                    <div style={{
                                        width: "40px", height: "40px", borderRadius: "12px",
                                        background: "rgba(200,146,42,0.12)",
                                        border: "1px solid rgba(200,146,42,0.25)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <Icon size={18} style={{ color: "#C8922A" }} />
                                    </div>
                                    <span style={{
                                        fontFamily: '"Playfair Display", serif',
                                        fontSize: "15px", color: "rgba(245,237,214,0.8)",
                                        fontStyle: "italic",
                                    }}>
                                        {label}
                                    </span>
                                </motion.div>
                            );
                        })}

                        <p style={{
                            fontSize: "11px", color: "rgba(245,237,214,0.25)",
                            fontFamily: "Inter, sans-serif", textAlign: "right",
                            marginTop: "4px", fontStyle: "italic",
                        }}>
                            {t("colabo.more")}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
