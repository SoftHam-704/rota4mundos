import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Trash2, X, CheckCircle, Clock, Send, Instagram, Youtube, Facebook, Linkedin, Twitter, Edit3 } from "lucide-react";
import { socialPostsApi } from "../../api/socialPosts.js";
import { articlesApi } from "../../api/articles.js";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const PLATFORM_ICONS = {
    INSTAGRAM: Instagram,
    YOUTUBE:   Youtube,
    FACEBOOK:  Facebook,
    LINKEDIN:  Linkedin,
    TWITTER:   Twitter,
};

const PLATFORM_COLORS = {
    INSTAGRAM: { bg: "#FDF2F8", text: "#BE185D", border: "#F9A8D4" },
    YOUTUBE:   { bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
    FACEBOOK:  { bg: "#EFF6FF", text: "#1D4ED8", border: "#93C5FD" },
    LINKEDIN:  { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
    TWITTER:   { bg: "#F0F9FF", text: "#0369A1", border: "#7DD3FC" },
};

const STATUS_CONFIG = {
    DRAFT:     { label: "Rascunho",   bg: "#FEF9C3", text: "#854D0E" },
    APPROVED:  { label: "Aprovado",   bg: "#DCFCE7", text: "#166534" },
    SCHEDULED: { label: "Agendado",   bg: "#DBEAFE", text: "#1E40AF" },
    PUBLISHED: { label: "Publicado",  bg: "#F0FDF4", text: "#15803D" },
    REJECTED:  { label: "Rejeitado",  bg: "#FEF2F2", text: "#991B1B" },
};

const EMPTY_FORM = { articleId: "", platform: "INSTAGRAM", caption: "", imageUrl: "", scheduledFor: "" };

export default function AdminPublicationsPage() {
    const queryClient = useQueryClient();
    const [filterStatus, setFilterStatus]   = useState("");
    const [filterPlatform, setFilterPlatform] = useState("");
    const [isModalOpen, setIsModalOpen]     = useState(false);
    const [editingPost, setEditingPost]     = useState(null);
    const [formData, setFormData]           = useState(EMPTY_FORM);

    const { data: postsData, isLoading } = useQuery({
        queryKey: ["social-posts", filterStatus, filterPlatform],
        queryFn: () => socialPostsApi.list({
            ...(filterStatus   && { status: filterStatus }),
            ...(filterPlatform && { platform: filterPlatform }),
        }),
    });

    const { data: articlesData } = useQuery({
        queryKey: ["admin-articles-select"],
        queryFn: () => articlesApi.list({ limit: 100, status: "PUBLISHED" }),
    });

    const createMutation = useMutation({
        mutationFn: socialPostsApi.create,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["social-posts"] }); toast.success("Post criado!"); closeModal(); },
        onError: (err) => toast.error(err.response?.data?.message || "Erro"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => socialPostsApi.update(id, data),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["social-posts"] }); toast.success("Post atualizado!"); closeModal(); },
        onError: (err) => toast.error(err.response?.data?.message || "Erro"),
    });

    const deleteMutation = useMutation({
        mutationFn: socialPostsApi.delete,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["social-posts"] }); toast.success("Post removido!"); },
    });

    const quickStatus = (id, status) => {
        updateMutation.mutate({ id, data: { status } });
    };

    const posts    = postsData?.data?.data || [];
    const articles = articlesData?.data?.data || [];

    const openModal = (post = null) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                articleId:   post.articleId || "",
                platform:    post.platform,
                caption:     post.caption,
                imageUrl:    post.imageUrl || "",
                scheduledFor: post.scheduledFor ? dayjs(post.scheduledFor).format("YYYY-MM-DDTHH:mm") : "",
            });
        } else {
            setEditingPost(null);
            setFormData(EMPTY_FORM);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => { setIsModalOpen(false); setEditingPost(null); };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            articleId:   formData.articleId || null,
            scheduledFor: formData.scheduledFor || null,
        };
        if (editingPost) updateMutation.mutate({ id: editingPost.id, data: payload });
        else createMutation.mutate(payload);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-primary-950">Publicações</h1>
                    <p className="text-slate-500 mt-1">Gerencie posts para redes sociais — Instagram, YouTube e mais</p>
                </div>
                <button onClick={() => openModal()} className="btn-primary">
                    <Plus className="w-5 h-5 mr-2" /> Novo Post
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                >
                    <option value="">Todos os status</option>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                    ))}
                </select>
                <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                >
                    <option value="">Todas as plataformas</option>
                    {Object.keys(PLATFORM_ICONS).map(p => (
                        <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>
                    ))}
                </select>
                <span className="text-sm text-slate-400 ml-auto">{posts.length} post{posts.length !== 1 ? "s" : ""}</span>
            </div>

            {isLoading ? (
                <div className="p-8 text-center text-slate-400">Carregando...</div>
            ) : posts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
                    <Send className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Nenhum post criado ainda</p>
                    <p className="text-slate-400 text-sm mt-1">Crie manualmente ou aguarde o agente HERMES gerar automaticamente</p>
                    <button onClick={() => openModal()} className="btn-primary mt-6">
                        <Plus className="w-4 h-4 mr-2" /> Criar primeiro post
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => {
                        const PlatformIcon = PLATFORM_ICONS[post.platform] || Send;
                        const pColor = PLATFORM_COLORS[post.platform] || PLATFORM_COLORS.INSTAGRAM;
                        const sConfig = STATUS_CONFIG[post.status] || STATUS_CONFIG.DRAFT;
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Platform badge */}
                                    <div
                                        style={{ background: pColor.bg, border: `1px solid ${pColor.border}`, color: pColor.text }}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    >
                                        <PlatformIcon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span style={{ background: pColor.bg, color: pColor.text }} className="text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {post.platform.charAt(0) + post.platform.slice(1).toLowerCase()}
                                            </span>
                                            <span style={{ background: sConfig.bg, color: sConfig.text }} className="text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {sConfig.label}
                                            </span>
                                            {post.article && (
                                                <span className="text-xs text-slate-400 truncate max-w-[200px]">
                                                    📰 {post.article.title}
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-400 ml-auto flex-shrink-0">
                                                {dayjs(post.createdAt).format("DD/MM HH:mm")}
                                            </span>
                                        </div>

                                        {/* Caption */}
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-3">
                                            {post.caption}
                                        </p>

                                        {post.scheduledFor && (
                                            <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Agendado: {dayjs(post.scheduledFor).format("DD/MM/YYYY HH:mm")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        {post.status === "DRAFT" && (
                                            <button
                                                onClick={() => quickStatus(post.id, "APPROVED")}
                                                title="Aprovar"
                                                className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                        {post.status === "APPROVED" && (
                                            <button
                                                onClick={() => quickStatus(post.id, "PUBLISHED")}
                                                title="Marcar como publicado"
                                                className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openModal(post)}
                                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteMutation.mutate(post.id)}
                                            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="font-display text-xl font-bold text-primary-950">
                                {editingPost ? "Editar Post" : "Novo Post"}
                            </h2>
                            <button onClick={closeModal} className="p-2 rounded-lg hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Plataforma</label>
                                    <select
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
                                    >
                                        {Object.keys(PLATFORM_ICONS).map(p => (
                                            <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select
                                        value={formData.status || "DRAFT"}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
                                    >
                                        {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                                            <option key={k} value={k}>{v.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Artigo relacionado (opcional)</label>
                                <select
                                    value={formData.articleId}
                                    onChange={(e) => setFormData({ ...formData, articleId: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
                                >
                                    <option value="">— nenhum —</option>
                                    {articles.map(a => (
                                        <option key={a.id} value={a.id}>{a.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Legenda / Caption</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.caption}
                                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                    placeholder="Escreva o texto do post..."
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm resize-none"
                                />
                                <p className="text-xs text-slate-400 mt-1">{formData.caption.length} caracteres</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">URL da imagem (opcional)</label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Agendamento (opcional)</label>
                                <input
                                    type="datetime-local"
                                    value={formData.scheduledFor}
                                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    {editingPost ? "Salvar" : "Criar"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
