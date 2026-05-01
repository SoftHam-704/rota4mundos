import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mail, Users, UserCheck, UserX } from "lucide-react";
import { apiClient } from "../../api/client.js";

export default function AdminNewsletterPage() {
    const { data: statsData } = useQuery({
        queryKey: ["newsletter-stats"],
        queryFn: () => apiClient.get("/newsletter/stats"),
    });

    const { data: subscribersData } = useQuery({
        queryKey: ["newsletter-subscribers"],
        queryFn: () => apiClient.get("/newsletter/subscribers"),
    });

    const stats = statsData?.data?.data || {};
    const subscribers = subscribersData?.data?.data?.data || [];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-primary-950">Newsletter</h1>
                <p className="text-slate-500 mt-1">Gerencie inscritos e envios</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div><span className="text-sm text-slate-500">Total</span></div>
                    <div className="font-display text-3xl font-bold text-primary-950">{stats.total || 0}</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><UserCheck className="w-5 h-5 text-emerald-600" /></div><span className="text-sm text-slate-500">Ativos</span></div>
                    <div className="font-display text-3xl font-bold text-primary-950">{stats.active || 0}</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center"><UserX className="w-5 h-5 text-rose-600" /></div><span className="text-sm text-slate-500">Inativos</span></div>
                    <div className="font-display text-3xl font-bold text-primary-950">{stats.inactive || 0}</div>
                </motion.div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-6 border-b border-slate-100"><h3 className="font-display text-lg font-bold text-primary-950">Inscritos Recentes</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Nome</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Data</th></tr></thead>
                        <tbody className="divide-y divide-slate-100">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 text-sm text-primary-950 font-medium">{sub.email}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{sub.name || "—"}</td>
                                    <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${sub.active ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{sub.active ? "Ativo" : "Inativo"}</span></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(sub.createdAt).toLocaleDateString("pt-BR")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
