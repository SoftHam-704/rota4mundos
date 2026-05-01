import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { citiesApi } from "../../api/cities.js";

export default function CitiesPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["cities", search, page],
        queryFn: () => citiesApi.list({ search, page, limit: 12 }),
    });

    const cities = data?.data?.data || [];
    const pagination = data?.data?.pagination;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-950 mb-4">
                        Cidades da Rota
                    </h1>
                    <p className="text-lg text-slate-500">
                        Explore os principais destinos do corredor bioceânico
                    </p>
                </motion.div>

                <div className="max-w-md mx-auto mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Buscar cidades..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl h-72" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cities.map((city, index) => (
                                <motion.div
                                    key={city.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/cidades/${city.slug}`} className="group block">
                                        <div className="card-hover overflow-hidden">
                                            <div className="relative h-48 overflow-hidden">
                                                {city.images?.[0]?.url ? (
                                                    <img src={city.images[0].url} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-1 text-primary-500 text-sm mb-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{city.state}, {city.country}</span>
                                                </div>
                                                <h3 className="font-display text-lg font-bold text-primary-950 mb-1 group-hover:text-primary-600 transition-colors">{city.name}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{city.description}</p>
                                                <div className="flex items-center justify-between">
                                                    {city.population && (
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Users className="w-3 h-3" /> {city.population.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <span className="text-primary-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                        Explorar <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-10">
                                {Array.from({ length: pagination.totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${page === i + 1
                                                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                                : "bg-white text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
