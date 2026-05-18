import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PenLine, Camera, BookOpen, MessageSquare, Sparkles, ChevronDown, Eye, X } from "lucide-react";
import { contributionsApi } from "../../api/contributions.js";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const TYPE_ICONS = { ARTIGO: PenLine, FOTO: Camera, CONTO: BookOpen, DEPOIMENTO: MessageSquare, OUTRO: Sparkles };
const TYPE_LABELS = { ARTIGO: "Artigo", FOTO: "Foto histórica", CONTO: "Conto", DEPOIMENTO: "Depoimento", OUTRO: "Outro" };

const STATUS_CONFIG = {
    PENDENTE:   { label: "Pendente",    bg: "#FEF9C3", text: "#854D0E" },
    EM_REVISAO: { label: "Em revisão",  bg: "#DBEAFE", text: "#1E40AF" },
    APROVADO:   { label: "Aprovado",    bg: "#DCFCE7", text: "#166534" },
    PUBLICADO:  { label: "Publicado",   bg: "#F0FDF4", text: "#15803D" },
    REJEITADO:  { label: "Rejeitado",   bg: "#FEF2F2", text: "#991B1B" },
};

export default function AdminContributionsPage() {
    const queryClient = useQueryClient();
    const [filterStatus, setFilterStatus] = useState("");
    const [viewing, setViewing]           = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["contributions", filterStatus],
        queryFn: () => contributionsApi.list(filterStatus ? { status: filterStatus } : {}),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => contributionsApi.update(id, data),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["contributions"] }); toast.success("Status atualizado!"); },
        onError: () => toast.error("Erro ao atualizar"),
    });

    const contributions = data?.data?.data || [];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-primary-950">Colaborações</h1>
                    <p className="text-slate-500 mt-1">Artigos, fotos e histórias enviadas pela comunidade</p>
                </div>
            </div>

            {/* Filtro */}
            <div className="flex items-center gap-3 mb-6">
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                >
                    <option value="">Todos os status</option>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                    ))}
                </select>
                <span className="text-sm text-slate-400 ml-auto">{contributions.length} contribuição(ões)</span>
            </div>

            {isLoading ? (
                <div className="p-8 text-center text-slate-400">Carregando...</div>
            ) : contributions.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
                    <PenLine className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Nenhuma contribuição recebida ainda</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contribuição</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Autor</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cidade</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Data</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {contributions.map(c => {
                                const Icon = TYPE_ICONS[c.type] || Sparkles;
                                const sc   = STATUS_CONFIG[c.status] || STATUS_CONFIG.PENDENTE;
                                return (
                                    <tr key={c.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-4 h-4 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-primary-950 text-sm">{c.title}</p>
                                                    <p className="text-xs text-slate-400">{TYPE_LABELS[c.type]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <p>{c.name}</p>
                                            <p className="text-xs text-slate-400">{c.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{c.city}</td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <select
                                                    value={c.status}
                                                    onChange={e => updateMutation.mutate({ id: c.id, data: { status: e.target.value } })}
                                                    style={{ background: sc.bg, color: sc.text }}
                                                    className="text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer appearance-none pr-5"
                                                >
                                                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                                                        <option key={k} value={k}>{v.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{dayjs(c.createdAt).format("DD/MM/YYYY")}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => setViewing(c)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de leitura */}
            {viewing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex items-start justify-between p-6 border-b border-slate-100">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{TYPE_LABELS[viewing.type]} · {viewing.city}</p>
                                <h2 className="font-display text-xl font-bold text-primary-950">{viewing.title}</h2>
                                <p className="text-sm text-slate-500 mt-1">{viewing.name} · {viewing.email}</p>
                            </div>
                            <button onClick={() => setViewing(null)} className="p-2 rounded-lg hover:bg-slate-100 ml-4 flex-shrink-0">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">{viewing.content}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
