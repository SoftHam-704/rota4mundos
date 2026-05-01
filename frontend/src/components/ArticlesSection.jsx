import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { articlesApi } from "../api/articles.js";
import dayjs from "dayjs";

export default function ArticlesSection() {
    const { data, isLoading } = useQuery({
        queryKey: ["articles-latest"],
        queryFn: () => articlesApi.list({ limit: 3 }),
    });

    const articles = data?.data?.data || [];

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-block text-sm font-semibold text-primary-500 uppercase tracking-wider mb-4"
                        >
                            Notícias
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl md:text-5xl font-bold text-primary-950"
                        >
                            Últimas <span className="text-gradient">Atualizações</span>
                        </motion.h2>
                    </div>
                    <Link
                        to="/noticias"
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                    >
                        Ver todas
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-96" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link to={`/noticias/${article.slug}`} className="group block">
                                    <div className="card-hover overflow-hidden">
                                        <div className="relative h-56 overflow-hidden">
                                            {article.featuredImage ? (
                                                <img
                                                    src={article.featuredImage}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700">
                                                    {article.category?.name || "Geral"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {dayjs(article.publishedAt).format("DD/MM/YYYY")}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {article.viewCount}
                                                </span>
                                            </div>
                                            <h3 className="font-display text-lg font-bold text-primary-950 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary-600" />
                                                </div>
                                                <span className="text-sm text-slate-600">{article.author?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
