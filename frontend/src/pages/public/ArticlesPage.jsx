import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Calendar, Eye, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { articlesApi } from "../../api/articles.js";
import dayjs from "dayjs";

const CATEGORY_COLOR = {
    Infraestrutura:  { bg: "#EEF2FF", text: "#4338CA", dot: "#6366F1" },
    Turismo:         { bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
    Economia:        { bg: "#FFF7ED", text: "#9A3412", dot: "#F97316" },
    Cultura:         { bg: "#FDF4FF", text: "#7E22CE", dot: "#A855F7" },
    "Meio Ambiente": { bg: "#F0FDF4", text: "#14532D", dot: "#22C55E" },
    Política:        { bg: "#FFF1F2", text: "#9F1239", dot: "#F43F5E" },
};
const DEFAULT_COLOR = { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" };

export default function ArticlesPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["articles", search, page],
        queryFn: () => articlesApi.list({ search, page, limit: 12 }),
        staleTime: 0,
    });

    const articles   = data?.data?.data || [];
    const pagination = data?.data?.pagination;

    return (
        <div className="min-h-screen" style={{
            background: "#F8FAFC",
            paddingTop: "72px",
            paddingBottom: "60px",
        }}>

            {/* ── Header ── */}
            <div style={{
                position: "relative",
                padding: "clamp(36px, 7vw, 48px) 0 clamp(32px, 6vw, 44px)",
                overflow: "hidden",
                background: "#061B33",
            }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url(/ultimas_noticias.png)",
                    backgroundSize: "cover", backgroundPosition: "center",
                    opacity: 0.18,
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(6,27,51,0.5) 0%, rgba(6,27,51,0.9) 100%)",
                }} />

                <div className="container-rota" style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 1rem" }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p style={{
                            fontSize: "clamp(10px, 2.6vw, 11px)",
                            fontWeight: 700, letterSpacing: "0.2em",
                            color: "#F4A261", textTransform: "uppercase",
                            marginBottom: "10px",
                        }}>
                            IRIS — Monitoramento em Tempo Real
                        </p>
                        <h1 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2rem, 7vw, 3.6rem)",
                            color: "#fff", lineHeight: 1,
                            marginBottom: "12px",
                            letterSpacing: "0.03em",
                        }}>
                            Notícias da Rota
                        </h1>
                        <p style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "clamp(13px, 3.2vw, 15px)",
                            maxWidth: "440px",
                            margin: "0 auto",
                            padding: "0 8px",
                        }}>
                            Acompanhe as últimas novidades sobre o Corredor Bioceânico
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{
                            maxWidth: "480px",
                            margin: "clamp(20px, 4vw, 28px) auto 0",
                            position: "relative",
                            padding: "0 4px",
                        }}
                    >
                        <Search style={{
                            position: "absolute", left: "20px",
                            top: "50%", transform: "translateY(-50%)",
                            width: "18px", height: "18px",
                            color: "rgba(255,255,255,0.4)",
                            pointerEvents: "none",
                        }} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar artigos..."
                            style={{
                                width: "100%",
                                paddingLeft: "48px", paddingRight: "16px",
                                paddingTop: "14px", paddingBottom: "14px",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(255,255,255,0.08)",
                                color: "#fff",
                                fontSize: "15px",
                                outline: "none",
                                boxSizing: "border-box",
                                fontFamily: "Inter, sans-serif",
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* ── Grid ── */}
            <div className="container-rota" style={{ marginTop: "32px", padding: "0 1rem" }}>
                {isLoading ? (
                    <div className="articles-page-grid">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} style={{ background: "#fff", borderRadius: "14px", height: "180px", opacity: 0.5 }} />
                        ))}
                    </div>
                ) : articles.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8" }}>
                        <p style={{ fontSize: "16px" }}>Nenhum artigo encontrado.</p>
                    </div>
                ) : (
                    <div className="articles-page-grid">
                        {articles.map((article, index) => {
                            const cat   = article.category?.name;
                            const color = CATEGORY_COLOR[cat] || DEFAULT_COLOR;
                            return (
                                <motion.article
                                    key={article.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min(index, 8) * 0.04 }}
                                >
                                    <Link to={`/noticias/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                                        <div
                                            className="articles-page-card"
                                            style={{
                                                background: "#fff",
                                                borderRadius: "14px",
                                                padding: "20px",
                                                height: "100%",
                                                boxSizing: "border-box",
                                                border: "1px solid #E2E8F0",
                                                borderLeft: `4px solid ${color.dot}`,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                transition: "box-shadow 0.2s, transform 0.2s",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {cat && (
                                                <span style={{
                                                    display: "inline-block", alignSelf: "flex-start",
                                                    padding: "3px 10px", borderRadius: "20px",
                                                    fontSize: "11px", fontWeight: 700,
                                                    background: color.bg, color: color.text,
                                                    letterSpacing: "0.05em",
                                                    fontFamily: "Inter, sans-serif",
                                                }}>
                                                    {cat}
                                                </span>
                                            )}

                                            <h3 style={{
                                                fontFamily: '"Playfair Display", serif',
                                                fontSize: "clamp(15px, 3.6vw, 16px)",
                                                fontWeight: 700,
                                                color: "#0F172A",
                                                lineHeight: 1.4,
                                                margin: 0, flex: 1,
                                            }}>
                                                {article.title}
                                            </h3>

                                            {article.excerpt && (
                                                <p style={{
                                                    fontSize: "13px",
                                                    color: "#64748B",
                                                    lineHeight: 1.55,
                                                    margin: 0,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    fontFamily: "Inter, sans-serif",
                                                }}>
                                                    {article.excerpt}
                                                </p>
                                            )}

                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "4px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94A3B8", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                        <Calendar style={{ width: "12px", height: "12px" }} />
                                                        {dayjs(article.publishedAt).format("DD/MM/YYYY")}
                                                    </span>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                        <Eye style={{ width: "12px", height: "12px" }} />
                                                        {article.viewCount ?? 0}
                                                    </span>
                                                    {(article._count?.likes ?? 0) > 0 && (
                                                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#F43F5E" }}>
                                                            <Heart style={{ width: "12px", height: "12px", fill: "#F43F5E" }} />
                                                            {article._count.likes}
                                                        </span>
                                                    )}
                                                </div>
                                                <ArrowRight style={{ width: "15px", height: "15px", color: color.dot, flexShrink: 0 }} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {pagination && pagination.totalPages > 1 && (
                    <div style={{
                        display: "flex", justifyContent: "center", flexWrap: "wrap",
                        gap: "6px", marginTop: "32px",
                    }}>
                        {Array.from({ length: pagination.totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                style={{
                                    minWidth: "44px", height: "44px",
                                    borderRadius: "10px",
                                    fontWeight: 600, fontSize: "14px", cursor: "pointer",
                                    border: "none", transition: "all 0.2s",
                                    background: page === i + 1 ? "#061B33" : "#E2E8F0",
                                    color:      page === i + 1 ? "#fff"    : "#475569",
                                    fontFamily: "Inter, sans-serif",
                                    padding: "0 14px",
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .articles-page-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                }
                @media (min-width: 481px) and (max-width: 767px) {
                    .articles-page-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 14px;
                    }
                }
                @media (min-width: 768px) {
                    .articles-page-grid {
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 16px;
                    }
                }
                .articles-page-card:hover {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                    transform: translateY(-2px);
                }
                @media (hover: none) {
                    .articles-page-card:hover { transform: none; box-shadow: none; }
                    .articles-page-card:active {
                        background: #F8FAFC;
                    }
                }
            `}</style>
        </div>
    );
}
