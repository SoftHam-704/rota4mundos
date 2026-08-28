import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Calendar, Eye, ArrowRight } from "lucide-react";
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

    const articles = data?.data?.data || [];
    const pagination = data?.data?.pagination;

    return (
        <div className="min-h-screen" style={{ background: "#F8FAFC", paddingTop: "88px", paddingBottom: "80px" }}>

            {/* ── Header com imagem de fundo ── */}
            <div style={{ position: "relative", padding: "48px 0 44px", overflow: "hidden", background: "#061B33" }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url(/ultimas_noticias.png)",
                    backgroundSize: "cover", backgroundPosition: "center",
                    opacity: 0.18,
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(6,27,51,0.45) 0%, rgba(6,27,51,0.88) 100%)",
                }} />

                <div className="container-custom" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "#F4A261", textTransform: "uppercase", marginBottom: "12px" }}>
                            IRIS — Monitoramento em Tempo Real
                        </p>
                        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(2.4rem, 5vw, 3.6rem)", color: "#fff", lineHeight: 1, marginBottom: "12px" }}>
                            Notícias da Rota
                        </h1>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px" }}>
                            Acompanhe as últimas novidades sobre o Corredor Bioceânico
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ maxWidth: "480px", margin: "28px auto 0", position: "relative" }}>
                        <Search style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", color: "rgba(255,255,255,0.35)" }} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar artigos..."
                            style={{
                                width: "100%", paddingLeft: "48px", paddingRight: "16px",
                                paddingTop: "13px", paddingBottom: "13px",
                                borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.08)", color: "#fff",
                                fontSize: "14px", outline: "none", boxSizing: "border-box",
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* ── Grid de artigos ── */}
            <div className="container-custom" style={{ marginTop: "40px" }}>
                {isLoading ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                        {[...Array(9)].map((_, i) => (
                            <div key={i} style={{ background: "#fff", borderRadius: "14px", height: "180px", opacity: 0.5 }} />
                        ))}
                    </div>
                ) : articles.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "#94A3B8" }}>
                        <p style={{ fontSize: "18px" }}>Nenhum artigo encontrado.</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                        {articles.map((article, index) => {
                            const cat = article.category?.name;
                            const color = CATEGORY_COLOR[cat] || DEFAULT_COLOR;
                            return (
                                <motion.article
                                    key={article.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04 }}
                                >
                                    <Link to={`/noticias/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                                        <div
                                            style={{
                                                background: "#fff",
                                                borderRadius: "14px",
                                                padding: "24px",
                                                height: "100%",
                                                boxSizing: "border-box",
                                                border: "1px solid #E2E8F0",
                                                borderLeft: `4px solid ${color.dot}`,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "12px",
                                                transition: "box-shadow 0.2s, transform 0.2s",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)";
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.boxShadow = "none";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                        >
                                            {cat && (
                                                <span style={{
                                                    display: "inline-block", alignSelf: "flex-start",
                                                    padding: "3px 10px", borderRadius: "20px",
                                                    fontSize: "11px", fontWeight: 700,
                                                    background: color.bg, color: color.text,
                                                    letterSpacing: "0.05em",
                                                }}>
                                                    {cat}
                                                </span>
                                            )}

                                            <h3 style={{
                                                fontFamily: '"Playfair Display", serif',
                                                fontSize: "16px", fontWeight: 700,
                                                color: "#0F172A", lineHeight: 1.4,
                                                margin: 0, flex: 1,
                                            }}>
                                                {article.title}
                                            </h3>

                                            {article.excerpt && (
                                                <p style={{
                                                    fontSize: "13px", color: "#64748B",
                                                    lineHeight: 1.55, margin: 0,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}>
                                                    {article.excerpt}
                                                </p>
                                            )}

                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94A3B8", fontSize: "12px" }}>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                        <Calendar style={{ width: "12px", height: "12px" }} />
                                                        {dayjs(article.publishedAt).format("DD/MM/YYYY")}
                                                    </span>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                        <Eye style={{ width: "12px", height: "12px" }} />
                                                        {article.viewCount ?? 0}
                                                    </span>
                                                </div>
                                                <ArrowRight style={{ width: "15px", height: "15px", color: color.dot }} />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {pagination && pagination.totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "40px" }}>
                        {Array.from({ length: pagination.totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                style={{
                                    width: "40px", height: "40px", borderRadius: "10px",
                                    fontWeight: 600, fontSize: "14px", cursor: "pointer",
                                    border: "none", transition: "all 0.2s",
                                    background: page === i + 1 ? "#061B33" : "#E2E8F0",
                                    color: page === i + 1 ? "#fff" : "#475569",
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
