import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { to: "/",         label: "Home" },
    { to: "/cidades",  label: "Destinos" },
    { to: "/noticias", label: "Notícias" },
    { to: "/apoie",    label: "Apoie" },
];

const LANG_FLAGS = { pt: "🇧🇷", es: "🇪🇸", en: "🇬🇧" };

function LangSwitcher({ current, onSwitch, style }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: "2px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", padding: "3px",
            ...style,
        }}>
            {["pt", "es", "en"].map(l => (
                <button
                    key={l}
                    onClick={() => onSwitch(l)}
                    style={{
                        background: current === l ? "rgba(255,255,255,0.15)" : "transparent",
                        border: "none", borderRadius: "5px",
                        padding: "4px 7px",
                        fontSize: "11px", fontWeight: current === l ? 700 : 400,
                        fontFamily: "Inter, sans-serif",
                        color: current === l ? "#fff" : "rgba(255,255,255,0.4)",
                        cursor: "pointer", transition: "all 0.18s",
                        letterSpacing: "0.04em",
                    }}
                >
                    {LANG_FLAGS[l]}
                </button>
            ))}
        </div>
    );
}

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { i18n } = useTranslation();
    const [isScrolled, setIsScrolled]     = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    // Detecta lang atual pelo prefixo da URL
    const pathParts = location.pathname.split("/").filter(Boolean);
    const urlLang   = ["es", "en"].includes(pathParts[0]) ? pathParts[0] : "pt";

    // Troca de idioma: navega para a mesma rota com/sem prefixo
    const switchLang = (newLang) => {
        const hasPrefix = ["es", "en"].includes(pathParts[0]);
        const base = hasPrefix ? "/" + pathParts.slice(1).join("/") : location.pathname;
        const cleanBase = base || "/";
        i18n.changeLanguage(newLang === "pt" ? "pt-BR" : newLang);
        navigate(newLang === "pt" ? cleanBase : "/" + newLang + (cleanBase === "/" ? "" : cleanBase));
    };

    // isActive e isHeroPage ignoram o prefixo de idioma
    const cleanPath = location.pathname.replace(/^\/(es|en)(\/|$)/, "/");
    const isActive  = (path) =>
        path === "/" ? cleanPath === "/" : cleanPath.startsWith(path);

    const isHeroPage = cleanPath === "/";
    const opaque     = isScrolled || !isHeroPage || isMobileOpen;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                background:       opaque ? "rgba(6,27,51,0.97)" : "transparent",
                backdropFilter:   opaque ? "blur(20px)" : "none",
                borderBottom:     opaque ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                boxShadow:        opaque ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
            }}
        >
            <div className="container-rota">
                <div className="nav-bar">

                    {/* ── Logo ── */}
                    <Link to="/" className="nav-logo">
                        <img src="/logo-icon.png" alt="Rota 4 Mundos" />
                        <div style={{ lineHeight: 1.1 }}>
                            <span className="nav-logo-title">Rota 4 Mundos</span>
                            <span className="nav-logo-sub">Bioceanic Route</span>
                        </div>
                    </Link>

                    {/* ── Desktop links ── */}
                    <div className="nav-desktop">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.to);
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    style={{
                                        padding: "7px 14px",
                                        borderRadius: "8px",
                                        fontSize: "13px",
                                        fontWeight: active ? 700 : 500,
                                        fontFamily: "Inter, sans-serif",
                                        color: active ? "#fff" : "rgba(255,255,255,0.55)",
                                        background: active ? "rgba(255,255,255,0.1)" : "transparent",
                                        border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={e => {
                                        if (!active) {
                                            e.currentTarget.style.color = "#fff";
                                            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!active) {
                                            e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                                            e.currentTarget.style.background = "transparent";
                                        }
                                    }}
                                >
                                    {link.to === "/apoie"
                                        ? <span style={{ color: "#F4A261" }}>Apoie ✦</span>
                                        : link.label
                                    }
                                </Link>
                            );
                        })}

                        <div style={{ marginLeft: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <LangSwitcher current={urlLang} onSwitch={switchLang} />
                            {isAuthenticated ? (
                                <>
                                    {(user?.role === "ADMIN" || user?.role === "EDITOR") && (
                                        <Link to="/admin" style={{
                                            padding: "7px 14px", borderRadius: "8px",
                                            fontSize: "13px", fontWeight: 600,
                                            fontFamily: "Inter, sans-serif",
                                            color: "#2A9D8F", textDecoration: "none",
                                            border: "1px solid rgba(42,157,143,0.3)",
                                        }}>
                                            Admin
                                        </Link>
                                    )}
                                    <button onClick={logout} style={{
                                        display: "flex", alignItems: "center", gap: "6px",
                                        padding: "7px 14px", borderRadius: "8px",
                                        fontSize: "13px", fontWeight: 500,
                                        fontFamily: "Inter, sans-serif",
                                        color: "rgba(255,255,255,0.5)",
                                        background: "transparent", border: "none",
                                        cursor: "pointer",
                                    }}>
                                        <LogOut size={14} /> Sair
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "8px 18px", borderRadius: "10px",
                                    fontSize: "13px", fontWeight: 700,
                                    fontFamily: "Inter, sans-serif",
                                    color: "#061B33", textDecoration: "none",
                                    background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                }}>
                                    <User size={13} /> Entrar
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* ── Mobile burger ── */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="nav-burger"
                        aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMobileOpen}
                    >
                        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            background: "rgba(6,27,51,0.97)",
                            backdropFilter: "blur(20px)",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                            overflow: "hidden",
                        }}
                    >
                        <div className="container-rota" style={{ padding: "12px 1rem 20px", display: "flex", flexDirection: "column", gap: "2px" }}>
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.to);
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsMobileOpen(false)}
                                        style={{
                                            padding: "14px 16px",
                                            borderRadius: "10px",
                                            fontSize: "15px",
                                            fontWeight: active ? 700 : 500,
                                            fontFamily: "Inter, sans-serif",
                                            color: active ? "#fff" : "rgba(255,255,255,0.65)",
                                            background: active ? "rgba(255,255,255,0.08)" : "transparent",
                                            textDecoration: "none",
                                            display: "block",
                                        }}
                                    >
                                        {link.to === "/apoie"
                                            ? <span style={{ color: "#F4A261" }}>✦ Apoie o projeto</span>
                                            : link.label
                                        }
                                    </Link>
                                );
                            })}

                            <div style={{ paddingTop: "4px" }}>
                                <LangSwitcher current={urlLang} onSwitch={switchLang} style={{ width: "100%", justifyContent: "center", borderRadius: "10px", padding: "6px" }} />
                            </div>
                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "10px", paddingTop: "12px" }}>
                                {isAuthenticated ? (
                                    <button onClick={logout} style={{
                                        display: "flex", alignItems: "center", gap: "8px",
                                        width: "100%",
                                        padding: "14px 16px", borderRadius: "10px",
                                        fontSize: "15px", color: "rgba(255,255,255,0.65)",
                                        fontFamily: "Inter, sans-serif",
                                        background: "none", border: "none",
                                        cursor: "pointer", textAlign: "left",
                                    }}>
                                        <LogOut size={16} /> Sair
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setIsMobileOpen(false)} style={{
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                        padding: "14px", borderRadius: "12px",
                                        fontSize: "15px", fontWeight: 700,
                                        fontFamily: "Inter, sans-serif",
                                        color: "#061B33", textDecoration: "none",
                                        background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                    }}>
                                        <User size={16} /> Entrar
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 64px;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    min-width: 0;
                }
                .nav-logo img {
                    height: 30px;
                    width: 30px;
                    object-fit: contain;
                    flex-shrink: 0;
                }
                .nav-logo-title {
                    font-family: "Bebas Neue", sans-serif;
                    font-size: 1.05rem;
                    color: #fff;
                    letter-spacing: 0.06em;
                    display: block;
                    white-space: nowrap;
                }
                .nav-logo-sub {
                    font-size: 9px;
                    color: rgba(255,255,255,0.3);
                    font-family: Inter, sans-serif;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .nav-desktop {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .nav-burger {
                    display: none;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    width: 42px;
                    height: 42px;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    flex-shrink: 0;
                }
                @media (min-width: 768px) {
                    .nav-bar { height: 72px; }
                    .nav-logo img { height: 32px; width: 32px; }
                    .nav-logo-title { font-size: 1.15rem; }
                }
                @media (max-width: 767px) {
                    .nav-desktop { display: none !important; }
                    .nav-burger  { display: flex !important; }
                }
            `}</style>
        </motion.nav>
    );
}
