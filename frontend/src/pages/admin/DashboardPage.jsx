import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, Building2, FileText, MessageSquare, Mail, TrendingUp, Eye, BarChart2, Globe } from "lucide-react";
import { apiClient } from "../../api/client.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PAGE_LABELS = {
    "/":                          "Home",
    "/cidades":                   "Destinos",
    "/cidades/campo-grande":      "Campo Grande",
    "/cidades/sidrolandia":       "Sidrolândia",
    "/cidades/jardim":            "Jardim",
    "/cidades/bonito":            "Bonito",
    "/cidades/porto-murtinho":    "Porto Murtinho",
    "/cidades/carmelo-peralta":   "Carmelo Peralta",
    "/cidades/mariscal-estigarribia": "Mariscal Estigarribia",
    "/cidades/filadelfia":        "Filadelfia",
    "/cidades/salta":             "Salta",
    "/cidades/jujuy":             "Jujuy",
    "/cidades/tartagal":          "Tartagal",
    "/cidades/antofagasta":       "Antofagasta",
    "/cidades/iquique":           "Iquique",
    "/cidades/mejillones":        "Mejillones",
    "/noticias":                  "Notícias",
    "/apoie":                     "Apoie",
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

    const stats   = statsData?.data?.data || {};
    const pv      = pvData?.data?.data || {};
    const daily   = pv.daily   || [];
    const topPages = pv.topPages || [];

    const statsCards = [
        { label: "Visitas (30d)",   value: pv.periodTotal,   icon: Eye,          color: "bg-sky-500"     },
        { label: "Total de visitas", value: pv.total,        icon: BarChart2,    color: "bg-indigo-500"  },
        { label: "Usuários",        value: stats.users,      icon: Users,        color: "bg-blue-500"    },
        { label: "Artigos",         value: stats.articles,   icon: FileText,     color: "bg-emerald-500" },
        { label: "Newsletter",      value: stats.subscribers, icon: Mail,        color: "bg-purple-500"  },
    ];

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl font-bold text-primary-950 mb-2">Dashboard</h1>
                <p className="text-slate-500 mb-8">Visão geral do portal</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {statsCards.map((card, index) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${card.color}/10 flex items-center justify-center`}>
                                <card.icon className={`w-5 h-5 ${card.color.replace("bg-", "text-")}`} />
                            </div>
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="font-display text-2xl font-bold text-primary-950">
                            {card.value?.toLocaleString("pt-BR") ?? "—"}
                        </div>
                        <div className="text-sm text-slate-500">{card.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart — visitas diárias */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display text-lg font-bold text-primary-950">Acessos ao Portal</h3>
                        <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">últimos 30 dias</span>
                    </div>
                    {daily.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={daily}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "#64748b", fontSize: 11 }}
                                    axisLine={false} tickLine={false}
                                    tickFormatter={d => d.slice(5)} // MM-DD
                                />
                                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                    labelFormatter={d => `Data: ${d}`}
                                    formatter={v => [v, "Visitas"]}
                                />
                                <Bar dataKey="views" fill="#1F7A8C" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-300 text-sm">
                            Aguardando primeiras visitas...
                        </div>
                    )}
                </motion.div>

                {/* Top páginas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-display text-lg font-bold text-primary-950 mb-6">Páginas mais visitadas</h3>
                    {topPages.length > 0 ? (
                        <div className="space-y-3">
                            {topPages.map((p, i) => {
                                const label = PAGE_LABELS[p.path] || p.path;
                                const max = topPages[0].views;
                                return (
                                    <div key={p.path}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                                                <span className="text-sm font-medium text-primary-950 truncate max-w-[140px]">{label}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">{p.views.toLocaleString("pt-BR")}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-700"
                                                style={{ width: `${(p.views / max) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-sm text-slate-400 mt-8 text-center">Aguardando dados...</div>
                    )}
                </motion.div>
            </div>

            {/* Artigos recentes */}
            {stats.recentArticles?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-display text-lg font-bold text-primary-950 mb-4">Artigos Recentes</h3>
                    <div className="divide-y divide-slate-50">
                        {stats.recentArticles.map((article) => (
                            <div key={article.id} className="flex items-center gap-3 py-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                                <p className="text-sm font-medium text-primary-950 flex-1 truncate">{article.title}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    article.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                }`}>
                                    {article.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
