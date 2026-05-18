import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { articlesApi } from "../api/articles.js";

const CATEGORY_STYLE = {
    "Infraestrutura": { color: "#F4A261", rgb: "244,162,97"  },
    "Turismo":        { color: "#2A9D8F", rgb: "42,157,143"  },
    "Economia":       { color: "#818cf8", rgb: "129,140,248" },
    "Cultura":        { color: "#f472b6", rgb: "244,114,182" },
    "Meio Ambiente":  { color: "#4ade80", rgb: "74,222,128"  },
    "Política":       { color: "#fb923c", rgb: "251,146,60"  },
};
const DEFAULT_STYLE = { color: "#F4A261", rgb: "244,162,97" };

const CATEGORY_IMG = {
    "Infraestrutura": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=260&fit=crop&auto=format&q=80",
    "Turismo":        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600&h=260&fit=crop&auto=format&q=80",
    "Economia":       "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=260&fit=crop&auto=format&q=80",
    "Cultura":        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=260&fit=crop&auto=format&q=80",
    "Meio Ambiente":  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=260&fit=crop&auto=format&q=80",
    "Política":       "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=260&fit=crop&auto=format&q=80",
};
const DEFAULT_IMG = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=260&fit=crop&auto=format&q=80";

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

function formatDate(d) {
    if (!d) return "";
    try { return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return ""; }
}
function readTime(c) { return Math.max(1, Math.ceil((c?.length || 0) / 800)); }
function mapArticle(art) {
    const catName = art.category?.name || "";
    const style   = CATEGORY_STYLE[catName] || DEFAULT_STYLE;
    const image   = art.featuredImage || CATEGORY_IMG[catName] || DEFAULT_IMG;
    return {
        category: catName || "Notícias",
        categoryColor: style.color, accentRgb: style.rgb,
        title:    art.title, excerpt: art.excerpt || "",
        date:     formatDate(art.publishedAt || art.createdAt),
        readTime: `${readTime(art.content)} min`,
        href:     `/noticias/${art.slug}`,
        image,
    };
}

function ArticleCard({ art, index, isTouch }) {
    const cardRef = useRef(null);

    function handleMouseMove(e) {
        if (isTouch) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: "100%" }}
        >
            <Link
                to={art.href}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                style={{
                    display: "flex", flexDirection: "column",
                    textDecoration: "none", position: "relative",
                    borderRadius: "18px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    height: "100%",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="article-glass-card"
            >
                {!isTouch && (
                    <div style={{
                        position: "absolute", inset: 0, borderRadius: "18px",
                        background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(${art.accentRgb},0.07), transparent 60%)`,
                        pointerEvents: "none", zIndex: 3,
                    }} />
                )}

                <div style={{
                    position: "relative",
                    height: "clamp(150px, 38vw, 180px)",
                    flexShrink: 0, overflow: "hidden",
                }}>
                    <img
                        src={art.image} alt={art.category}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                        className="article-card-img" loading="lazy"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(2,13,26,0.25) 0%, rgba(2,13,26,0.72) 100%)" }} />
                    <span style={{
                        position: "absolute", bottom: "12px", left: "14px",
                        fontSize: "9px", fontWeight: 700, fontFamily: "Inter, sans-serif", color: "#fff",
                        background: `rgba(${art.accentRgb},0.25)`, backdropFilter: "blur(8px)",
                        border: `1px solid rgba(${art.accentRgb},0.35)`,
                        padding: "3px 10px", borderRadius: "100px",
                        letterSpacing: "0.1em", textTransform: "uppercase", zIndex: 2,
                    }}>
                        {art.category}
                    </span>
                </div>

                <div style={{
                    padding: "18px 18px 22px",
                    position: "relative", zIndex: 2,
                    display: "flex", flexDirection: "column", flex: 1,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                            <Calendar size={9} /> {art.date}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                            <Clock size={9} /> {art.readTime}
                        </span>
                    </div>
                    <h3 style={{
                        fontSize: "clamp(13px, 3.6vw, 14px)",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.5, marginBottom: "10px", flex: 1,
                    }}>
                        {art.title}
                    </h3>
                    <p style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.65,
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "14px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
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

const SKELETON_ACCENT = ["244,162,97", "42,157,143", "129,140,248"];

function SkeletonCard({ index }) {
    return (
        <div style={{ borderRadius: "18px", overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ height: "150px", background: `radial-gradient(circle at 30% 50%, rgba(${SKELETON_ACCENT[index]},0.08), transparent 70%)`, animation: "pulse 1.8s ease-in-out infinite" }} />
            <div style={{ padding: "18px" }}>
                {[80, 100, 65].map((w, i) => (
                    <div key={i} style={{
                        height: i === 1 ? "14px" : "10px", width: `${w}%`,
                        borderRadius: "6px", background: "rgba(255,255,255,0.06)",
                        marginBottom: "10px", animation: "pulse 1.8s ease-in-out infinite",
                        animationDelay: `${i * 0.15}s`,
                    }} />
                ))}
            </div>
        </div>
    );
}

export default function ArticlesSection() {
    const isTouch = useMediaQuery("(hover: none)");
    const { data, isLoading } = useQuery({
        queryKey: ["articles-home"],
        queryFn: () => articlesApi.list({ limit: 3, status: "PUBLISHED", lang: "pt" }),
        staleTime: 0,
        refetchOnWindowFocus: true,
    });

    const articles = (data?.data?.data || []).map(mapArticle);

    return (
        <section id="noticias" style={{ background: "#020d1a", position: "relative", overflow: "hidden" }}>

            {/* Hero image */}
            <div style={{ position: "relative", width: "100%", lineHeight: 0 }}>
                <motion.img
                    src="/ultimas_noticias.png"
                    alt="Últimas Atualizações — Rota Bioceânica"
                    initial={{ opacity: 0, scale: 1.03 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        width: "100%", height: "auto", display: "block",
                        maxHeight: "clamp(220px, 35vw, 420px)",
                        objectFit: "cover", objectPosition: "center",
                    }}
                    draggable={false}
                />
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "55%",
                    background: "linear-gradient(to bottom, transparent, #020d1a)",
                    pointerEvents: "none",
                }} />
                <Link
                    to="/noticias"
                    style={{
                        position: "absolute", bottom: "18%", left: "5.5%",
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        fontSize: "11px", fontWeight: 700,
                        color: "rgba(255,255,255,0)",
                        padding: "8px 20px", borderRadius: "100px",
                        textDecoration: "none",
                    }}
                    aria-label="Ver todas as notícias"
                />
            </div>

            <div className="container-rota" style={{ paddingTop: 0, paddingBottom: "60px", position: "relative" }}>
                <div style={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,97,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="articles-grid">
                    {isLoading && [0, 1, 2].map(i => <SkeletonCard key={i} index={i} />)}

                    {!isLoading && articles.map((art, i) => (
                        <ArticleCard key={art.href + i} art={art} index={i} isTouch={isTouch} />
                    ))}

                    {!isLoading && articles.length === 0 && (
                        <div style={{ gridColumn: "1 / -1", padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.18)", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                            Nenhuma notícia publicada ainda.
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                    <Link to="/noticias" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "12px", fontWeight: 700, color: "#2A9D8F",
                        fontFamily: "Inter, sans-serif", textDecoration: "none",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        border: "1px solid rgba(42,157,143,0.3)",
                        padding: "10px 22px", borderRadius: "100px",
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                    }}
                    className="ver-todas-link"
                    >
                        Ver todas as notícias <ArrowRight size={13} />
                    </Link>
                </div>
            </div>

            <style>{`
                .articles-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                    align-items: stretch;
                }
                @media (min-width: 481px) and (max-width: 767px) {
                    .articles-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 14px;
                    }
                }
                @media (min-width: 768px) {
                    .articles-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 16px;
                    }
                }
                .article-glass-card:hover {
                    border-color: rgba(255,255,255,0.14) !important;
                    transform: translateY(-5px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                }
                .article-glass-card:hover .article-card-img { transform: scale(1.06); }
                @media (hover: none) {
                    .article-glass-card:hover { transform: none !important; }
                    .article-glass-card:hover .article-card-img { transform: none !important; }
                }
                .ver-todas-link:hover { border-color: rgba(42,157,143,0.6) !important; color: #4bc9b8 !important; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            `}</style>
        </section>
    );
}
