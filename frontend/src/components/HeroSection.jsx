import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe, Mountain, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import RotaRings from "./RotaRings.jsx";

export default function HeroSection() {
    const { t } = useTranslation();

    const stats = [
        { icon: MapPin, value: t("hero.stats.distance"), label: "de travessia continental" },
        { icon: Globe, value: t("hero.stats.countries"), label: "integrados" },
        { icon: Mountain, value: t("hero.stats.cities"), label: "de cultura viva" },
        { icon: Landmark, value: t("hero.stats.time"), label: "Patrimônio Mundial" },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-950">
            {/* Vídeo de fundo */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/hero-bridge.mp4"
            />

            {/* Overlay gradiente para legibilidade */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/90" />

            {/* Névoa na base */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-primary-950 to-transparent" />

            {/* Conteúdo principal */}
            <div className="relative z-20 container-custom pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
                        <span className="text-sm text-white/90 font-medium tracking-wide uppercase">
                            {t("hero.subtitle")}
                        </span>
                    </motion.div>

                    {/* Título principal */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6"
                    >
                        <span className="block">{t("hero.title").split(" ").slice(0, 2).join(" ")}</span>
                        <span className="block text-gradient bg-gradient-to-r from-secondary-300 via-secondary-400 to-orange-400 bg-clip-text text-transparent">
                            {t("hero.title").split(" ").slice(2).join(" ")}
                        </span>
                    </motion.h1>

                    {/* Descrição */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {t("hero.description")}
                    </motion.p>

                    {/* Argolas da rota */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex justify-center mb-10"
                    >
                        <RotaRings />
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                    >
                        <Link to="/cidades" className="btn-secondary group text-base px-8 py-4">
                            <span>{t("hero.ctaPrimary")}</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/noticias" className="btn-outline text-white border-white/30 hover:bg-white/10 text-base px-8 py-4">
                            {t("hero.ctaSecondary")}
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                            >
                                <stat.icon className="w-6 h-6 text-secondary-400 mx-auto mb-3" />
                                <div className="font-display text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                    />
                </div>
            </motion.div>
        </section>
    );
}
