import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, FileText, Mail, TrendingUp, Eye, Heart, Feather, Send, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "../../api/client.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const PAGE_LABELS = {
    "/": "Home", "/cidades": "Destinos", "/noticias": "Notícias", "/apoie": "Apoie", "/colabore": "Colabore",
    "/cidades/campo-grande": "Campo Grande", "/cidades/sidrolandia": "Sidrolândia",
    "/cidades/jardim": "Jardim", "/cidades/bonito": "Bonito", "/cidades/porto-murtinho": "Porto Murtinho",
    "/cidades/carmelo-peralta": "Carmelo Peralta", "/cidades/salta": "Salta",
    "/cidades/jujuy": "Jujuy", "/cidades/tartagal": "Tartagal",
    "/cidades/antofagasta": "Antofagasta", "/cidades/iquique": "Iquique", "/cidades/mejillones": "Mejillones",
};

const CARD_COLORS = {
    sky:     { rgb: "56,189,248",  hex: "#38bdf8" },
    emerald: { rgb: "52,211,153",  hex: "#34d399" },
    blue:    { rgb: "96,165,250",  hex: "#60a5fa" },
    purple:  { rgb: "167,139,250", hex: "#a78bfa" },
    rose:    { rgb: "251,113,133", hex: "#fb7185" },
    amber:   { rgb: "251,191,36",  hex: "#fbbf24" },
    violet:  { rgb: "139,92,246",  hex: "#8b5cf6" },
};

function StatCard({ card, index }) {
    const c = CARD_COLORS[card.color];
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "20px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* glow de fundo */}
            <div style={{
                position: "absolute", top: 0, right: 0,
                width: "80px", height: "80px",
                background: `radial-gradient(circle, rgba(${c.rgb},0.12) 0%, transparent 70%)`,
                pointerEvents: "none",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: `rgba(${c.rgb},0.15)`,
                    border: `1px solid rgba(${c.rgb},0.25)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <card.icon style={{ width: "16px", height: "16px", color: c.hex }} />
                </div>
                <TrendingUp style={{ width: "13px", height: "13px", color: `rgba(${c.rgb},0.5)` }} />
            </div>

            <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "2rem", letterSpacing: "0.04em",
                color: "#f1f5f9", lineHeight: 1,
                marginBottom: "4px",
            }}>
                {card.value?.toLocaleString("pt-BR") ?? "—"}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "2px" }}>
                {card.label}
            </div>
            <div style={{ fontSize: "11px", color: `rgba(${c.rgb},0.7)` }}>
                {card.sub}
            </div>
        </motion.div>
    );
}

function PendingCard({ card, index }) {
    const c = CARD_COLORS[card.alert ? card.color : "violet"];
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.08 }}
        >
            <Link to={card.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                    background: card.alert
                        ? `linear-gradient(135deg, rgba(${CARD_COLORS.amber.rgb},0.12) 0%, rgba(255,255,255,0.03) 100%)`
                        : "rgba(255,255,255,0.03)",
                    border: card.alert
                        ? `1px solid rgba(${CARD_COLORS.amber.rgb},0.3)`
                        : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    padding: "18px 20px",
                    display: "flex", alignItems: "center", gap: "16px",
                    transition: "all 0.2s",
                    cursor: "pointer",
                }}>
                    <div style={{
                        width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                        background: card.alert ? `rgba(${CARD_COLORS.amber.rgb},0.15)` : "rgba(255,255,255,0.06)",
                        border: card.alert ? `1px solid rgba(${CARD_COLORS.amber.rgb},0.25)` : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <card.icon style={{
                            width: "18px", height: "18px",
                            color: card.alert ? CARD_COLORS.amber.hex : "rgba(255,255,255,0.3)",
                        }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                            <span style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: "1.6rem", letterSpacing: "0.04em",
                                color: card.alert ? CARD_COLORS.amber.hex : "rgba(255,255,255,0.4)",
                                lineHeight: 1,
                            }}>
                                {card.value?.toLocaleString("pt-BR") ?? "—"}
                            </span>
                            {card.alert && (
                                <span style={{
                                    fontSize: "10px", fontWeight: 700,
                                    background: `rgba(${CARD_COLORS.amber.rgb},0.2)`,
                                    color: CARD_COLORS.amber.hex,
                                    border: `1px solid rgba(${CARD_COLORS.amber.rgb},0.35)`,
                                    padding: "2px 8px", borderRadius: "20px",
                                    letterSpacing: "0.06em", textTransform: "uppercase",
                                }}>
                                    Ação necessária
                                </span>
                            )}
                        </div>
                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                            {card.label} · {card.sub}
                        </p>
                    </div>

                    <ArrowRight style={{ width: "15px", height: "15px", color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                </div>
            </Link>
        </motion.div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "#0d1f35", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", padding: "10px 14px",
        }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", margin: "0 0 4px" }}>{label}</p>
            <p style={{ color: "#38bdf8", fontSize: "15px", fontWeight: 700, margin: 0 }}>
                {payload[0].value} visitas
            </p>
        </div>
    );
};

export default function DashboardPage() {
    const { data: statsData } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => apiClient.get("/settings/dashboard"),
    });

    const { data: pvData } = useQuery({
        queryKey: ["pageview-stats"],
        queryFn: () => apiClient.get("/pageviews/stats?days=30"),
        refetchInterval: 60_000,
    });

    const stats    = statsData?.data?.data || {};
    const pv       = pvData?.data?.data || {};
    const daily    = pv.daily    || [];
    const topPages = pv.topPages || [];

    const mainCards = [
        { label: "Visitas (30d)",  value: pv.periodTotal,   icon: Eye,      color: "sky",     sub: `${pv.total ?? 0} total` },
        { label: "Artigos",        value: stats.articles,   icon: FileText, color: "emerald", sub: "publicados" },
        { label: "Usuários",       value: stats.users,      icon: Users,    color: "blue",    sub: "cadastrados" },
        { label: "Newsletter",     value: stats.subscribers,icon: Mail,     color: "purple",  sub: "assinantes ativos" },
        { label: "Curtidas",       value: stats.siteLikes,  icon: Heart,    color: "rose",    sub: "no projeto" },
    ];

    const pendingCards = [
        { label: "Colaborações",  value: stats.pendingContributions, icon: Feather, color: "amber",  sub: "aguardando revisão",   href: "/admin/colaboracoes", alert: (stats.pendingContributions ?? 0) > 0 },
        { label: "Posts Sociais", value: stats.pendingSocialPosts,   icon: Send,    color: "violet", sub: "aguardando aprovação", href: "/admin/publicacoes",  alert: (stats.pendingSocialPosts ?? 0) > 0 },
    ];

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
                <h1 style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "2.4rem", letterSpacing: "0.06em",
                    color: "#f1f5f9", margin: 0, lineHeight: 1,
                }}>
                    Dashboard
                </h1>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginTop: "6px" }}>
                    Visão geral do portal · {dayjs().format("DD [de] MMMM [de] YYYY")}
                </p>
            </motion.div>

            {/* Métricas principais */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "12px" }}
                className="admin-grid-5">
                {mainCards.map((card, i) => <StatCard key={card.label} card={card} index={i} />)}
            </div>

            {/* Pendências */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}
                className="admin-grid-2">
                {pendingCards.map((card, i) => <PendingCard key={card.label} card={card} index={i} />)}
            </div>

            {/* Gráfico + Top páginas */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px", marginBottom: "16px" }}
                className="admin-grid-chart">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px", padding: "24px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.2rem", letterSpacing: "0.08em", color: "#f1f5f9", margin: 0 }}>
                            Acessos ao Portal
                        </h3>
                        <span style={{
                            fontSize: "11px", color: "rgba(255,255,255,0.35)",
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                            padding: "4px 12px", borderRadius: "20px",
                        }}>
                            últimos 30 dias
                        </span>
                    </div>
                    {daily.length > 0 ? (
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={daily} barSize={18}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                                    axisLine={false} tickLine={false}
                                    tickFormatter={d => d.slice(5)}
                                />
                                <YAxis
                                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                                    axisLine={false} tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                                <Bar dataKey="views" fill="#38bdf8" radius={[6, 6, 0, 0]}
                                    style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.4))" }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: "13px" }}>
                            Aguardando primeiras visitas...
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px", padding: "24px",
                    }}
                >
                    <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.2rem", letterSpacing: "0.08em", color: "#f1f5f9", margin: "0 0 20px" }}>
                        Páginas mais visitadas
                    </h3>
                    {topPages.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {topPages.map((p, i) => {
                                const label = PAGE_LABELS[p.path] || p.path;
                                const max   = topPages[0].views;
                                const pct   = (p.views / max) * 100;
                                return (
                                    <div key={p.path}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", width: "14px", textAlign: "right" }}>{i + 1}</span>
                                                <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.75)", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {label}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
                                                {p.views.toLocaleString("pt-BR")}
                                            </span>
                                        </div>
                                        <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                                            <div style={{
                                                height: "100%", borderRadius: "2px",
                                                width: `${pct}%`,
                                                background: i === 0
                                                    ? "linear-gradient(90deg, #38bdf8, #818cf8)"
                                                    : "rgba(255,255,255,0.2)",
                                                transition: "width 0.7s ease",
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "40px" }}>
                            Aguardando dados...
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Artigos recentes */}
            {stats.recentArticles?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px", padding: "24px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.2rem", letterSpacing: "0.08em", color: "#f1f5f9", margin: 0 }}>
                            Artigos Recentes
                        </h3>
                        <Link to="/admin/artigos" style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            fontSize: "11px", color: "#38bdf8", textDecoration: "none", fontWeight: 500,
                        }}>
                            Ver todos <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                        </Link>
                    </div>
                    <div>
                        {stats.recentArticles.map((article, i) => (
                            <div key={article.id} style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                padding: "11px 0",
                                borderBottom: i < stats.recentArticles.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                            }}>
                                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", flexShrink: 0 }} />
                                <p style={{ flex: 1, fontSize: "13px", color: "rgba(255,255,255,0.7)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {article.title}
                                </p>
                                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>
                                    {dayjs(article.createdAt).format("DD/MM")}
                                </span>
                                <span style={{
                                    fontSize: "10px", fontWeight: 700, flexShrink: 0,
                                    padding: "2px 8px", borderRadius: "20px",
                                    background: article.status === "PUBLISHED" ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.12)",
                                    color: article.status === "PUBLISHED" ? "#34d399" : "#fbbf24",
                                    border: `1px solid ${article.status === "PUBLISHED" ? "rgba(52,211,153,0.25)" : "rgba(251,191,36,0.25)"}`,
                                }}>
                                    {article.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            <style>{`
                @media (max-width: 1200px) {
                    .admin-grid-5  { grid-template-columns: repeat(3, 1fr) !important; }
                    .admin-grid-chart { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 768px) {
                    .admin-grid-5  { grid-template-columns: repeat(2, 1fr) !important; }
                    .admin-grid-2  { grid-template-columns: 1fr !important; }
                    .admin-grid-chart { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
