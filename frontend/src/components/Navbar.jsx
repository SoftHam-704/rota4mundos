import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, PenLine } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ColaboradorModal from "./ColaboradorModal.jsx";

const NAV_LINKS = [
    { to: "/",         key: "nav.home" },
    { to: "/cidades",  key: "nav.cities" },
    { to: "/noticias", key: "nav.news" },
    { to: "/apoie",    key: "nav.support" },
];

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled]       = useState(false);
    const [isMobileOpen, setIsMobileOpen]   = useState(false);
    const [showColabModal, setShowColabModal] = useState(false);
    const location = useLocation();

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

    // isActive e isHeroPage ignoram o prefixo de idioma
    const pathParts  = location.pathname.split("/").filter(Boolean);
    const urlLang    = ["es", "en"].includes(pathParts[0]) ? pathParts[0] : "pt";
    const langPrefix = urlLang === "pt" ? "" : `/${urlLang}`;
    const cleanPath  = location.pathname.replace(/^\/(es|en)(\/|$)/, "/");
    const isActive   = (path) =>
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
                    <Link to={langPrefix || "/"} className="nav-logo">
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
                                    to={`${langPrefix}${link.to}`}
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
                                    {link.key === "nav.support"
                                        ? <span style={{ color: "#F4A261" }}>{t(link.key)} ✦</span>
                                        : t(link.key)
                                    }
                                </Link>
                            );
                        })}

                        <div style={{ marginLeft: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
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
                                    {user?.role === "LEITOR" && (
                                        <Link to="/minha-conta" style={{
                                            display: "flex", alignItems: "center", gap: "6px",
                                            padding: "7px 14px", borderRadius: "8px",
                                            fontSize: "13px", fontWeight: 600,
                                            fontFamily: "Inter, sans-serif",
                                            color: "#F4A261", textDecoration: "none",
                                            border: "1px solid rgba(244,162,97,0.3)",
                                        }}>
                                            <PenLine size={13} /> Minha Conta
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
                                        <LogOut size={14} /> {t("nav.logout")}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowColabModal(true)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "6px",
                                        padding: "8px 18px", borderRadius: "10px",
                                        fontSize: "13px", fontWeight: 700,
                                        fontFamily: "Inter, sans-serif",
                                        color: "#061B33",
                                        background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                        border: "none", cursor: "pointer",
                                    }}
                                >
                                    <PenLine size={13} /> Colaborar
                                </button>
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
                                        to={`${langPrefix}${link.to}`}
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
                                        {link.key === "nav.support"
                                            ? <span style={{ color: "#F4A261" }}>✦ {t("nav.supportMobile")}</span>
                                            : t(link.key)
                                        }
                                    </Link>
                                );
                            })}

                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "10px", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                {isAuthenticated ? (
                                    <>
                                        {user?.role === "LEITOR" && (
                                            <Link to="/minha-conta" onClick={() => setIsMobileOpen(false)} style={{
                                                display: "flex", alignItems: "center", gap: "8px",
                                                padding: "14px 16px", borderRadius: "10px",
                                                fontSize: "15px", fontWeight: 600,
                                                fontFamily: "Inter, sans-serif",
                                                color: "#F4A261", textDecoration: "none",
                                                background: "rgba(244,162,97,0.08)",
                                                border: "1px solid rgba(244,162,97,0.2)",
                                            }}>
                                                <PenLine size={16} /> Minha Conta
                                            </Link>
                                        )}
                                        <button onClick={logout} style={{
                                            display: "flex", alignItems: "center", gap: "8px",
                                            width: "100%", padding: "14px 16px", borderRadius: "10px",
                                            fontSize: "15px", color: "rgba(255,255,255,0.65)",
                                            fontFamily: "Inter, sans-serif",
                                            background: "none", border: "none",
                                            cursor: "pointer", textAlign: "left",
                                        }}>
                                            <LogOut size={16} /> {t("nav.logout")}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => { setIsMobileOpen(false); setShowColabModal(true); }}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                            width: "100%", padding: "14px", borderRadius: "12px",
                                            fontSize: "15px", fontWeight: 700,
                                            fontFamily: "Inter, sans-serif",
                                            color: "#061B33",
                                            background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                            border: "none", cursor: "pointer",
                                        }}
                                    >
                                        <PenLine size={16} /> Colaborar
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showColabModal && <ColaboradorModal onClose={() => setShowColabModal(false)} />}

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
