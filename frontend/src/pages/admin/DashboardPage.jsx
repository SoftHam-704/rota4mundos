import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Users, Building2, FileText, MessageSquare, Mail, TrendingUp } from "lucide-react";
import { apiClient } from "../../api/client.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsCards = [
    { label: "Usuários", icon: Users, color: "bg-blue-500", api: "users" },
    { label: "Artigos", icon: FileText, color: "bg-emerald-500", api: "articles" },
    { label: "Cidades", icon: Building2, color: "bg-amber-500", api: "cities" },
    { label: "Comentários", icon: MessageSquare, color: "bg-rose-500", api: "comments" },
    { label: "Newsletter", icon: Mail, color: "bg-purple-500", api: "subscribers" },
];

export default function DashboardPage() {
    const { data: statsData } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: () => apiClient.get("/settings/dashboard"),
    });

    const stats = statsData?.data?.data || {};

    const chartData = [
        { name: "Jan", visitas: 4000 },
        { name: "Fev", visitas: 3000 },
        { name: "Mar", visitas: 5000 },
        { name: "Abr", visitas: 2780 },
        { name: "Mai", visitas: 1890 },
        { name: "Jun", visitas: 6390 },
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
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${card.color}/10 flex items-center justify-center`}>
                                <card.icon className={`w-5 h-5 ${card.color.replace("bg-", "text-")}`} />
                            </div>
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="font-display text-2xl font-bold text-primary-950">
                            {stats[card.api]?.toLocaleString() || 0}
                        </div>
                        <div className="text-sm text-slate-500">{card.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-display text-lg font-bold text-primary-950 mb-6">Acessos ao Portal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Bar dataKey="visitas" fill="#1F7A8C" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Recent Articles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >
                    <h3 className="font-display text-lg font-bold text-primary-950 mb-6">Artigos Recentes</h3>
                    <div className="space-y-4">
                        {stats.recentArticles?.map((article) => (
                            <div key={article.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-primary-950 line-clamp-1">{article.title}</p>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${article.status === "PUBLISHED"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-50 text-amber-600"
                                            }`}
                                    >
                                        {article.status}
                                    </span>
                                </div>
                            </div>
                        )) || <p className="text-sm text-slate-400">Nenhum artigo recente</p>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
