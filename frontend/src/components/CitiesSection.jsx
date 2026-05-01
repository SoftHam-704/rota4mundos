import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { citiesApi } from "../api/cities.js";

export default function CitiesSection() {
    const { t } = useTranslation();
    const { data, isLoading } = useQuery({
        queryKey: ["cities-highlight"],
        queryFn: () => citiesApi.list({ highlight: "true", limit: 4 }),
    });

    const cities = data?.data?.data || [];

    return (
        <section className="section-padding bg-slate-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-block text-sm font-semibold text-primary-500 uppercase tracking-wider mb-4"
                        >
                            Destinos
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl md:text-5xl font-bold text-primary-950"
                        >
                            {t("cities.title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-500 mt-3"
                        >
                            {t("cities.subtitle")}
                        </motion.p>
                    </div>
                    <Link
                        to="/cidades"
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                    >
                        Ver todas
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-2xl h-80" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cities.map((city, index) => (
                            <motion.div
                                key={city.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link to={`/cidades/${city.slug}`} className="group block">
                                    <div className="relative h-80 rounded-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent z-10" />
                                        <div className="absolute inset-0 bg-primary-800">
                                            {city.images?.[0]?.url ? (
                                                <img
                                                    src={city.images[0].url}
                                                    alt={city.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900" />
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                            <div className="flex items-center gap-1 text-secondary-400 text-sm mb-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{city.country}</span>
                                            </div>
                                            <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-secondary-300 transition-colors">
                                                {city.name}
                                            </h3>
                                            <p className="text-white/70 text-sm line-clamp-2">{city.description}</p>
                                            {city.population && (
                                                <div className="flex items-center gap-1 text-white/50 text-xs mt-3">
                                                    <Users className="w-3 h-3" />
                                                    <span>{city.population.toLocaleString()} habitantes</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
