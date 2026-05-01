import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp, ArrowLeft, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { citiesApi } from "../../api/cities.js";

export default function CityDetailPage() {
    const { slug } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["city", slug],
        queryFn: () => citiesApi.getBySlug(slug),
    });

    const city = data?.data?.data;

    if (isLoading) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (!city) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold text-primary-950 mb-2">Cidade não encontrada</h1>
                    <Link to="/cidades" className="text-primary-500 hover:underline">Voltar para cidades</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Hero da cidade */}
            <div className="relative h-[50vh] min-h-[400px]">
                {city.images?.[0]?.url ? (
                    <img src={city.images[0].url} alt={city.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
                    <Link to="/cidades" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl font-bold text-white mb-3"
                    >
                        {city.name}
                    </motion.h1>
                    <div className="flex items-center gap-4 text-white/80">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {city.state}, {city.country}</span>
                        {city.population && <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {city.population.toLocaleString()}</span>}
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="font-display text-2xl font-bold text-primary-950 mb-4">Sobre</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{city.description}</p>
                        </section>
                        {city.history && (
                            <section>
                                <h2 className="font-display text-2xl font-bold text-primary-950 mb-4">História</h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{city.history}</p>
                            </section>
                        )}
                        {city.economy && (
                            <section>
                                <h2 className="font-display text-2xl font-bold text-primary-950 mb-4">Economia</h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{city.economy}</p>
                            </section>
                        )}
                    </div>

                    <div className="space-y-6">
                        {city.statistics && (
                            <div className="bg-slate-50 rounded-2xl p-6">
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary-500" /> Estatísticas
                                </h3>
                                <div className="space-y-3">
                                    {city.statistics.gdp && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">PIB</span>
                                            <span className="font-semibold text-primary-900">${Number(city.statistics.gdp).toLocaleString()}</span>
                                        </div>
                                    )}
                                    {city.statistics.literacyRate && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Alfabetização</span>
                                            <span className="font-semibold text-primary-900">{city.statistics.literacyRate}%</span>
                                        </div>
                                    )}
                                    {city.statistics.lifeExpectancy && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Expectativa de vida</span>
                                            <span className="font-semibold text-primary-900">{city.statistics.lifeExpectancy} anos</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {city.latitude && city.longitude && (
                            <div className="bg-slate-50 rounded-2xl p-6">
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary-500" /> Localização
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Lat: {city.latitude} / Long: {city.longitude}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
