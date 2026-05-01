import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { to: "/",       label: "Home" },
    { to: "/cidades", label: "Destinos" },
    { to: "/noticias", label: "Notícias" },
    { to: "/apoie",   label: "Apoie" },
];

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isScrolled, setIsScrolled]         = useState(false);
    const [isMobileOpen, setIsMobileOpen]     = useState(false);
    const [isLangOpen, setIsLangOpen]         = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // fecha menus ao navegar
    useEffect(() => {
        setIsMobileOpen(false);
        setIsLangOpen(false);
    }, [location.pathname]);

    const isActive = (path) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                background: isScrolled
                    ? "rgba(6,27,51,0.92)"
                    : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                borderBottom: isScrolled
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid transparent",
                boxShadow: isScrolled
                    ? "0 4px 32px rgba(0,0,0,0.35)"
                    : "none",
            }}
        >
            <div className="container-rota">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

                    {/* ── Logo ── */}
                    <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <img src="/logo-icon.png" alt="Rota 4 Mundos" style={{ height: "32px", width: "32px", objectFit: "contain" }} />
                        <div style={{ lineHeight: 1.1 }}>
                            <span style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: "1.15rem", color: "#fff",
                                letterSpacing: "0.06em", display: "block",
                            }}>
                                Rota 4 Mundos
                            </span>
                            <span style={{
                                fontSize: "9px", color: "rgba(255,255,255,0.3)",
                                fontFamily: "Inter, sans-serif",
                                letterSpacing: "0.18em", textTransform: "uppercase",
                            }}>
                                Bioceanic Route
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop links ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden-mobile">
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
                                        letterSpacing: link.to === "/apoie" ? "0.04em" : "normal",
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

                        {/* auth */}
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
                                            transition: "all 0.2s",
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
                                        cursor: "pointer", transition: "color 0.2s",
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
                                    transition: "opacity 0.2s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    <User size={13} /> Entrar
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* ── Mobile burger ── */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="show-mobile"
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px", padding: "8px",
                            color: "#fff", cursor: "pointer",
                            display: "none",
                        }}
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
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
                        style={{
                            background: "rgba(6,27,51,0.97)",
                            backdropFilter: "blur(20px)",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                            overflow: "hidden",
                        }}
                    >
                        <div className="container-rota" style={{ padding: "16px 1.5rem 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.to);
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsMobileOpen(false)}
                                        style={{
                                            padding: "12px 16px", borderRadius: "10px",
                                            fontSize: "14px", fontWeight: active ? 700 : 500,
                                            fontFamily: "Inter, sans-serif",
                                            color: active ? "#fff" : "rgba(255,255,255,0.55)",
                                            background: active ? "rgba(255,255,255,0.08)" : "transparent",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {link.to === "/apoie"
                                            ? <span style={{ color: "#F4A261" }}>✦ Apoie o projeto</span>
                                            : link.label
                                        }
                                    </Link>
                                );
                            })}

                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "8px", paddingTop: "12px" }}>
                                {isAuthenticated ? (
                                    <button onClick={logout} style={{
                                        display: "flex", alignItems: "center", gap: "8px",
                                        padding: "12px 16px", borderRadius: "10px",
                                        fontSize: "14px", color: "rgba(255,255,255,0.5)",
                                        fontFamily: "Inter, sans-serif",
                                        background: "none", border: "none", cursor: "pointer",
                                    }}>
                                        <LogOut size={15} /> Sair
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setIsMobileOpen(false)} style={{
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                        padding: "13px", borderRadius: "12px",
                                        fontSize: "14px", fontWeight: 700,
                                        fontFamily: "Inter, sans-serif",
                                        color: "#061B33", textDecoration: "none",
                                        background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                    }}>
                                        <User size={15} /> Entrar
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .hidden-mobile { display: none !important; }
                    .show-mobile   { display: flex !important; }
                }
            `}</style>
        </motion.nav>
    );
}
