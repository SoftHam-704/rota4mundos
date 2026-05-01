import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Eye, Tag, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { articlesApi } from "../../api/articles.js";
import dayjs from "dayjs";

export default function ArticleDetailPage() {
    const { slug } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["article", slug],
        queryFn: () => articlesApi.getBySlug(slug),
    });

    const article = data?.data?.data;

    if (isLoading) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold text-primary-950 mb-2">Artigo não encontrado</h1>
                    <Link to="/noticias" className="text-primary-500 hover:underline">Voltar para notícias</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="pt-20 min-h-screen bg-white">
            <div className="relative h-[40vh] min-h-[300px]">
                {article.featuredImage ? (
                    <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
                    <Link to="/noticias" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Notícias
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        {article.category && (
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">{article.category.name}</span>
                        )}
                        <span className="text-white/70 text-sm flex items-center gap-1"><Calendar className="w-4 h-4" /> {dayjs(article.publishedAt).format("DD/MM/YYYY")}</span>
                    </div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-5xl font-bold text-white max-w-4xl">
                        {article.title}
                    </motion.h1>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <span className="font-medium text-primary-950">{article.author?.name}</span>
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.viewCount} visualizações</span>
                                </div>
                            </div>
                        </div>

                        {article.excerpt && (
                            <p className="text-xl text-slate-600 italic mb-8 leading-relaxed border-l-4 border-secondary-400 pl-6">
                                {article.excerpt}
                            </p>
                        )}

                        <div
                            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary-950 prose-p:text-slate-600 prose-a:text-primary-600 prose-strong:text-primary-900"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {article.tags?.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag className="w-4 h-4 text-slate-400" />
                                    {article.tags.map(({ tag }) => (
                                        <span key={tag.id} className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-600">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comentários */}
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <h3 className="font-display text-xl font-bold text-primary-950 mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" /> Comentários
                            </h3>
                            <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500">
                                Login necessário para comentar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
