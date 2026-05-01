import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe, ChevronDown, User, LogOut } from "lucide-react";

import { useAuthStore } from "../stores/authStore.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const languages = [
        { code: "pt-BR", label: "PT", flag: "🇧🇷" },
        { code: "en-US", label: "EN", flag: "🇺🇸" },
        { code: "es-ES", label: "ES", flag: "🇪🇸" },
    ];

    const navLinks = [
        { to: "/", label: t("nav.home") },
        { to: "/cidades", label: t("nav.cities") },
        { to: "/noticias", label: t("nav.news") },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50"
                    : "bg-transparent"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/logo-icon.png"
                            alt="Rota 4 Mundos"
                            className="h-8 w-8 object-contain"
                        />
                        <div className="hidden sm:block leading-tight">
                            <span className={`font-display font-bold text-lg transition-colors ${isScrolled ? "text-primary-900" : "text-white"}`}>
                                Rota 4 Mundos
                            </span>
                            <span className={`block text-[10px] font-sans tracking-[0.18em] uppercase transition-colors ${isScrolled ? "text-primary-400" : "text-white/50"}`}>
                                Bioceanic Route
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.to)
                                        ? isScrolled
                                            ? "bg-primary-50 text-primary-600"
                                            : "bg-white/20 text-white"
                                        : isScrolled
                                            ? "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isScrolled ? "text-slate-600 hover:bg-slate-50" : "text-white/80 hover:bg-white/10"
                                    }`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{i18n.language.toUpperCase().split("-")[0]}</span>
                                <ChevronDown className="w-3 h-3" />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 min-w-[140px]"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    i18n.changeLanguage(lang.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 ${i18n.language === lang.code ? "text-primary-600 font-medium" : "text-slate-600"
                                                    }`}
                                            >
                                                <span>{lang.flag}</span>
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3 ml-4">
                                {user?.role === "ADMIN" || user?.role === "EDITOR" ? (
                                    <Link
                                        to="/admin"
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isScrolled
                                                ? "bg-primary-50 text-primary-600 hover:bg-primary-100"
                                                : "bg-white/20 text-white hover:bg-white/30"
                                            }`}
                                    >
                                        {t("nav.admin")}
                                    </Link>
                                ) : null}
                                <button
                                    onClick={logout}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isScrolled
                                            ? "text-slate-600 hover:bg-slate-50"
                                            : "text-white/80 hover:bg-white/10"
                                        }`}
                                >
                                    <LogOut className="w-4 h-4" />
                                    {t("nav.logout")}
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`ml-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isScrolled
                                        ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                                        : "bg-white text-primary-900 hover:bg-white/90 shadow-lg"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {t("nav.login")}
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
                            }`}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 shadow-xl"
                    >
                        <div className="container-custom py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive(link.to) ? "bg-primary-50 text-primary-600" : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-slate-100 pt-2 flex gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`px-3 py-2 rounded-lg text-sm ${i18n.language === lang.code ? "bg-primary-50 text-primary-600" : "text-slate-600"
                                            }`}
                                    >
                                        {lang.flag} {lang.label}
                                    </button>
                                ))}
                            </div>
                            {!isAuthenticated && (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-center px-4 py-3 rounded-xl bg-primary-500 text-white font-semibold"
                                >
                                    {t("nav.login")}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
