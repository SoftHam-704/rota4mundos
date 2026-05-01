import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Globe, Mail, MapPin, ArrowUpRight,
    Instagram, Facebook, Youtube, Linkedin,
    ExternalLink,
} from "lucide-react";

const MARQUEE_ITEMS = [
    "🇧🇷 Brasil", "·", "🇵🇾 Paraguai", "·",
    "🇦🇷 Argentina", "·", "🇨🇱 Chile", "·",
    "Porto Murtinho", "·", "Carmelo Peralta", "·",
    "Concepción", "·", "Resistencia", "·",
    "Mendoza", "·", "Iquique", "·",
    "Atlântico → Pacífico", "·",
];

const NAV_DESTINOS = [
    { to: "/cidades/porto-murtinho", label: "Porto Murtinho" },
    { to: "/cidades/campo-grande",   label: "Campo Grande" },
    { to: "/cidades/bonito",         label: "Bonito" },
    { to: "/cidades",                label: "Concepción" },
    { to: "/cidades",                label: "Ver todas →" },
];

const NAV_PORTAL = [
    { to: "/",          label: "Home" },
    { to: "/noticias",  label: "Notícias" },
    { to: "/cidades",   label: "Destinos" },
    { to: "/sobre",     label: "Sobre a Rota" },
];

const SOCIALS = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook,  label: "Facebook",  href: "#" },
    { icon: Youtube,   label: "YouTube",   href: "#" },
    { icon: Linkedin,  label: "LinkedIn",  href: "#" },
];

function MarqueeStrip() {
    const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div style={{
            overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            padding: "14px 0",
        }}>
            <div style={{ display: "flex", whiteSpace: "nowrap", animation: "footerMarquee 40s linear infinite" }}>
                {items.map((item, i) => (
                    <span key={i} style={{
                        fontSize: "11px", fontWeight: item === "·" ? 400 : 600,
                        color: item === "·" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        paddingRight: "28px", flexShrink: 0,
                    }}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function RouteLineSVG() {
    return (
        <svg viewBox="0 0 320 40" width="280" height="40" style={{ opacity: 0.35, maxWidth: "100%" }}>
            <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#22c55e" />
                    <stop offset="33%"  stopColor="#2dd4bf" />
                    <stop offset="66%"  stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
            </defs>
            <path d="M 10 20 Q 80 8 160 20 Q 240 32 310 20"
                fill="none" stroke="url(#routeGrad)" strokeWidth="1.5"
                strokeDasharray="4 3" />
            {[10, 85, 160, 235, 310].map((x, i) => (
                <circle key={i} cx={x} cy={20} r={3} fill={["#22c55e","#2dd4bf","#60a5fa","#818cf8","#f87171"][i]} />
            ))}
        </svg>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: "linear-gradient(to bottom, #020d1a 0%, #000 100%)", position: "relative", overflow: "hidden" }}>

            {/* noise overlay */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }} />

            {/* ambient top glow */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "700px", height: "300px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(42,157,143,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            {/* marquee */}
            <MarqueeStrip />

            {/* main content */}
            <div className="container-rota" style={{ padding: "72px 1.5rem 56px", position: "relative" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "48px 40px",
                }}>

                    {/* ── Brand col ── */}
                    <div style={{ gridColumn: "span 1" }}>
                        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "20px" }}>
                            <div style={{
                                width: "36px", height: "36px", borderRadius: "10px",
                                background: "linear-gradient(135deg, #2A9D8F, #22d3ee)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Globe size={18} color="#fff" />
                            </div>
                            <div>
                                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.15rem", color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>
                                    Rota Bioceânica
                                </div>
                                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                    4 Mundos
                                </div>
                            </div>
                        </Link>

                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, fontFamily: "Inter, sans-serif", marginBottom: "24px", maxWidth: "240px" }}>
                            O corredor que conecta o Atlântico ao Pacífico — integrando Brasil, Paraguai, Argentina e Chile num único destino.
                        </p>

                        <RouteLineSVG />

                        {/* socials */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                            {SOCIALS.map(({ icon: Icon, label, href }) => (
                                <a key={label} href={href} aria-label={label} style={{
                                    width: "34px", height: "34px", borderRadius: "8px",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.03)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "rgba(255,255,255,0.4)",
                                    transition: "all 0.25s",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(42,157,143,0.5)"; e.currentTarget.style.color = "#2A9D8F"; e.currentTarget.style.background = "rgba(42,157,143,0.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Destinos ── */}
                    <div>
                        <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "20px" }}>
                            Destinos
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                            {NAV_DESTINOS.map(link => (
                                <li key={link.to + link.label}>
                                    <Link to={link.to} style={{
                                        fontSize: "13px", color: "rgba(255,255,255,0.45)",
                                        fontFamily: "Inter, sans-serif", textDecoration: "none",
                                        display: "inline-flex", alignItems: "center", gap: "5px",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Portal ── */}
                    <div>
                        <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#2A9D8F", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "20px" }}>
                            Portal
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                            {NAV_PORTAL.map(link => (
                                <li key={link.to + link.label}>
                                    <Link to={link.to} style={{
                                        fontSize: "13px", color: "rgba(255,255,255,0.45)",
                                        fontFamily: "Inter, sans-serif", textDecoration: "none",
                                        display: "inline-flex", alignItems: "center", gap: "5px",
                                        transition: "color 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contato + Newsletter ── */}
                    <div>
                        <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#818cf8", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "20px" }}>
                            Contato
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                <Mail size={13} style={{ color: "#2A9D8F", marginTop: "1px", flexShrink: 0 }} />
                                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                                    contato@rota4mundos.com.br
                                </span>
                            </li>
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                <MapPin size={13} style={{ color: "#2A9D8F", marginTop: "1px", flexShrink: 0 }} />
                                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                                    Campo Grande, MS — Brasil
                                </span>
                            </li>
                        </ul>

                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                            Newsletter
                        </p>
                        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                style={{
                                    width: "100%", padding: "9px 14px",
                                    borderRadius: "10px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "#fff", fontSize: "12px",
                                    fontFamily: "Inter, sans-serif",
                                    outline: "none", boxSizing: "border-box",
                                }}
                                onFocus={e => e.target.style.borderColor = "rgba(42,157,143,0.5)"}
                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />
                            <button type="submit" style={{
                                padding: "9px 14px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, #2A9D8F, #22d3ee)",
                                border: "none", color: "#fff",
                                fontSize: "11px", fontWeight: 700,
                                letterSpacing: "0.08em", textTransform: "uppercase",
                                cursor: "pointer", fontFamily: "Inter, sans-serif",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                                Inscrever-se
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* bottom bar */}
            <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "20px 0",
            }}>
                <div className="container-rota" style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap", gap: "12px",
                }}>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>
                        © {year} Portal Rota Bioceânica 4 Mundos · Todos os direitos reservados
                    </p>

                    {/* dev credit */}
                    <a
                        href="https://www.softham.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            textDecoration: "none",
                            padding: "6px 14px",
                            borderRadius: "100px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                            backdropFilter: "blur(8px)",
                            transition: "all 0.25s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(244,162,97,0.35)"; e.currentTarget.style.background = "rgba(244,162,97,0.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    >
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            Desenvolvido por
                        </span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#F4A261", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>
                            Hamilton
                        </span>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>·</span>
                        <span style={{ fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
                            SoftHam Sistemas
                        </span>
                        <ExternalLink size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes footerMarquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </footer>
    );
}
