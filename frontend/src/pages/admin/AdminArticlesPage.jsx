import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, FileText, Eye } from "lucide-react";
import { articlesApi } from "../../api/articles.js";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export default function AdminArticlesPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [formData, setFormData] = useState({ title: "", slug: "", excerpt: "", content: "", status: "DRAFT" });

    const { data, isLoading } = useQuery({
        queryKey: ["admin-articles", search],
        queryFn: () => articlesApi.list({ search, limit: 50, status: undefined }),
    });

    const createMutation = useMutation({
        mutationFn: articlesApi.create,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-articles"] }); toast.success("Artigo criado!"); closeModal(); },
        onError: (err) => toast.error(err.response?.data?.message || "Erro"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => articlesApi.update(id, data),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-articles"] }); toast.success("Artigo atualizado!"); closeModal(); },
        onError: (err) => toast.error(err.response?.data?.message || "Erro"),
    });

    const deleteMutation = useMutation({
        mutationFn: articlesApi.delete,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-articles"] }); toast.success("Artigo removido!"); },
    });

    const articles = data?.data?.data || [];

    const openModal = (article = null) => {
        if (article) {
            setEditingArticle(article);
            setFormData({ title: article.title, slug: article.slug, excerpt: article.excerpt || "", content: article.content, status: article.status });
        } else {
            setEditingArticle(null);
            setFormData({ title: "", slug: "", excerpt: "", content: "", status: "DRAFT" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => { setIsModalOpen(false); setEditingArticle(null); };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingArticle) updateMutation.mutate({ id: editingArticle.id, data: formData });
        else createMutation.mutate(formData);
    };

    const statusColors = { DRAFT: "bg-amber-50 text-amber-600", PUBLISHED: "bg-emerald-50 text-emerald-600", SCHEDULED: "bg-blue-50 text-blue-600", ARCHIVED: "bg-slate-50 text-slate-600" };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-primary-950">Artigos</h1>
                    <p className="text-slate-500 mt-1">Gerencie as notícias e conteúdos do portal</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary"><Plus className="w-5 h-5 mr-2" /> Novo Artigo</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-4 border-b border-slate-100">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar artigos..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center text-slate-400">Carregando...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Título</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Data</th><th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Ações</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                                {articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center"><FileText className="w-5 h-5 text-primary-600" /></div><div><p className="font-medium text-primary-950">{article.title}</p><p className="text-xs text-slate-500">{article.author?.name}</p></div></div></td>
                                        <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[article.status] || statusColors.DRAFT}`}>{article.status}</span></td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{article.publishedAt ? dayjs(article.publishedAt).format("DD/MM/YYYY") : "—"}</td>
                                        <td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => openModal(article)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600"><Pencil className="w-4 h-4" /></button><button onClick={() => deleteMutation.mutate(article.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100"><h2 className="font-display text-xl font-bold text-primary-950">{editingArticle ? "Editar" : "Novo"} Artigo</h2><button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button></div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Título</label><input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Slug</label><input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Resumo</label><textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Conteúdo (HTML)</label><textarea required rows={6} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 font-mono text-sm" /></div>
                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"><option value="DRAFT">Rascunho</option><option value="PUBLISHED">Publicado</option><option value="SCHEDULED">Agendado</option></select></div>
                            <div className="flex justify-end gap-3 pt-4"><button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">Cancelar</button><button type="submit" className="btn-primary">{editingArticle ? "Salvar" : "Criar"}</button></div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
