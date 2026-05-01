import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Calendar, User, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articlesApi } from "../../api/articles.js";
import dayjs from "dayjs";

export default function ArticlesPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["articles", search, page],
        queryFn: () => articlesApi.list({ search, page, limit: 9 }),
    });

    const articles = data?.data?.data || [];
    const pagination = data?.data?.pagination;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            <div className="container-custom">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-950 mb-4">Notícias</h1>
                    <p className="text-lg text-slate-500">Acompanhe as últimas novidades sobre a Rota Bioceânica</p>
                </motion.div>

                <div className="max-w-md mx-auto mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar artigos..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-96" />)}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, index) => (
                                <motion.article key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                    <Link to={`/noticias/${article.slug}`} className="group block">
                                        <div className="card-hover overflow-hidden">
                                            <div className="relative h-52 overflow-hidden">
                                                {article.featuredImage ? (
                                                    <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {dayjs(article.publishedAt).format("DD/MM/YYYY")}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.viewCount}</span>
                                                </div>
                                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{article.title}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{article.excerpt}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center"><User className="w-3 h-3 text-primary-600" /></div>
                                                    <span className="text-sm text-slate-600">{article.author?.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-10">
                                {Array.from({ length: pagination.totalPages }, (_, i) => (
                                    <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg font-medium transition-all ${page === i + 1 ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{i + 1}</button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
