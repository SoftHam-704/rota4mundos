import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
    {
        category: "Infraestrutura",
        categoryColor: "#F4A261",
        accentRgb: "244,162,97",
        title: "Ponte Bioceânica entre Brasil e Paraguai: obras avançam para conclusão em 2025",
        excerpt: "A Ponte Internacional da Amizade sobre o Rio Paraguai, ligando Porto Murtinho (BR) a Carmelo Peralta (PY), representa o maior projeto de integração continental da América do Sul.",
        date: "28 Abr 2026",
        readTime: "4 min",
        href: "/noticias",
        // ponte suspensa — condiz com artigo da Ponte Bioceânica
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=260&fit=crop&auto=format&q=80",
    },
    {
        category: "Turismo",
        categoryColor: "#2A9D8F",
        accentRgb: "42,157,143",
        title: "Bonito bate recorde de visitantes e consolida posição como destino ecoturístico global",
        excerpt: "Com mais de 300.000 visitantes em 2025, o município sul-mato-grossense recebe reconhecimento da ONU pelo modelo pioneiro de voucher único e capacidade de carga controlada.",
        date: "15 Abr 2026",
        readTime: "3 min",
        href: "/noticias",
        // cardume em água cristalina turquesa — Bonito / Rio da Prata
        image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=260&fit=crop&auto=format&q=80",
    },
    {
        category: "Economia",
        categoryColor: "#818cf8",
        accentRgb: "129,140,248",
        title: "Rota Bioceânica deve movimentar US$ 2,4 bilhões em comércio entre Brasil e Chile até 2030",
        excerpt: "Estudo da CEPAL aponta que o corredor rodoviário conectando o Atlântico ao Pacífico vai reduzir em 30% o custo logístico de exportações do Centro-Oeste brasileiro para os mercados asiáticos.",
        date: "02 Abr 2026",
        readTime: "5 min",
        href: "/noticias",
        // navio porta-contêineres em porto — logística internacional
        image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=260&fit=crop&auto=format&q=80",
    },
];

function ArticleCard({ art, index }) {
    const cardRef = useRef(null);

    function handleMouseMove(e) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: "100%" }}
        >
            <Link
                to={art.href}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                style={{
                    display: "flex", flexDirection: "column",
                    textDecoration: "none",
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    height: "100%",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="article-glass-card"
            >
                {/* flashlight */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(${art.accentRgb},0.07), transparent 60%)`,
                    pointerEvents: "none", zIndex: 3,
                }} />

                {/* image banner */}
                <div style={{ position: "relative", height: "160px", flexShrink: 0, overflow: "hidden" }}>
                    <img
                        src={art.image}
                        alt={art.category}
                        style={{
                            width: "100%", height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                            display: "block",
                        }}
                        className="article-card-img"
                        loading="lazy"
                    />
                    {/* dark overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to bottom, rgba(2,13,26,0.25) 0%, rgba(2,13,26,0.72) 100%)",
                    }} />
                    {/* category badge */}
                    <span style={{
                        position: "absolute", bottom: "12px", left: "14px",
                        fontSize: "9px", fontWeight: 700,
                        fontFamily: "Inter, sans-serif",
                        color: "#fff",
                        background: `rgba(${art.accentRgb},0.25)`,
                        backdropFilter: "blur(8px)",
                        border: `1px solid rgba(${art.accentRgb},0.35)`,
                        padding: "3px 10px",
                        borderRadius: "100px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        zIndex: 2,
                    }}>
                        {art.category}
                    </span>
                </div>

                {/* content */}
                <div style={{ padding: "20px 20px 22px", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "11px" }}>
                        <span style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            fontSize: "10px", color: "rgba(255,255,255,0.25)",
                            fontFamily: "Inter, sans-serif",
                        }}>
                            <Calendar size={9} /> {art.date}
                        </span>
                        <span style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            fontSize: "10px", color: "rgba(255,255,255,0.25)",
                            fontFamily: "Inter, sans-serif",
                        }}>
                            <Clock size={9} /> {art.readTime}
                        </span>
                    </div>

                    <h3 style={{
                        fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.88)",
                        fontFamily: "Inter, sans-serif", lineHeight: 1.55,
                        marginBottom: "10px", flex: 1,
                    }}>
                        {art.title}
                    </h3>

                    <p style={{
                        fontSize: "12px", color: "rgba(255,255,255,0.35)",
                        lineHeight: 1.7, fontFamily: "Inter, sans-serif",
                        marginBottom: "16px",
                    }}>
                        {art.excerpt}
                    </p>

                    <span style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        fontSize: "11px", fontWeight: 700, color: art.categoryColor,
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                        Ler mais <ArrowRight size={11} />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ArticlesSection() {
    return (
        <section style={{ background: "#020d1a", padding: "100px 0", position: "relative", overflow: "hidden" }}>
            {/* ambient glows */}
            <div style={{
                position: "absolute", top: "30%", right: "-10%",
                width: "600px", height: "600px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(244,162,97,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "10%", left: "-5%",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container-rota" style={{ position: "relative" }}>
                <div style={{
                    display: "flex", alignItems: "flex-end",
                    justifyContent: "space-between",
                    flexWrap: "wrap", gap: "16px",
                    marginBottom: "56px",
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span style={{
                            display: "inline-block", fontSize: "10px", fontWeight: 700,
                            color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", marginBottom: "14px",
                            background: "rgba(244,162,97,0.1)", padding: "4px 12px",
                            borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)",
                        }}>
                            Notícias
                        </span>
                        <h2 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2.5rem, 6vw, 4rem)",
                            color: "#fff", lineHeight: 1,
                            letterSpacing: "0.04em",
                        }}>
                            ÚLTIMAS <span style={{ color: "#2A9D8F" }}>ATUALIZAÇÕES</span>
                        </h2>
                    </motion.div>

                    <Link to="/noticias" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 700, color: "#2A9D8F",
                        fontFamily: "Inter, sans-serif", textDecoration: "none",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        border: "1px solid rgba(42,157,143,0.3)",
                        padding: "8px 16px", borderRadius: "100px",
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                    }}>
                        Ver todas <ArrowRight size={13} />
                    </Link>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "16px",
                    alignItems: "stretch",
                }}>
                    {articles.map((art, i) => (
                        <ArticleCard key={i} art={art} index={i} />
                    ))}
                </div>
            </div>

            <style>{`
                .article-glass-card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
                .article-glass-card:hover .article-card-img { transform: scale(1.06); }
            `}</style>
        </section>
    );
}
