import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-950 text-white/80">
            <div className="container-custom py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="font-display font-bold text-lg text-white">Rota Bioceânica</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/60 mb-6">
                            Conectando o Brasil ao Pacífico através de um corredor estratégico de desenvolvimento e investimentos.
                        </p>
                    </div>

                    {/* Links rápidos */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-6">Navegação</h3>
                        <ul className="space-y-3">
                            {[
                                { to: "/", label: t("nav.home") },
                                { to: "/cidades", label: t("nav.cities") },
                                { to: "/noticias", label: t("nav.news") },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/60 hover:text-secondary-400 transition-colors flex items-center gap-1 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-6">{t("footer.contact")}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-white/60">
                                <Mail className="w-4 h-4 mt-0.5 text-secondary-400" />
                                <span>contato@rotabioceanica.org</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white/60">
                                <Phone className="w-4 h-4 mt-0.5 text-secondary-400" />
                                <span>+55 (65) 3613-5600</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white/60">
                                <MapPin className="w-4 h-4 mt-0.5 text-secondary-400" />
                                <span>Cuiabá, Mato Grosso - Brasil</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-6">{t("newsletter.title")}</h3>
                        <p className="text-sm text-white/60 mb-4">{t("newsletter.description")}</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder={t("newsletter.placeholder")}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-secondary-400/50 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-xl bg-secondary-500 text-primary-900 font-semibold text-sm hover:bg-secondary-400 transition-colors"
                            >
                                {t("newsletter.button")}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/40">
                        &copy; {currentYear} Portal da Rota Bioceânica. {t("footer.rights")}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                            Termos de Uso
                        </Link>
                        <Link to="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                            Privacidade
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
