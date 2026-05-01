import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import RotaRings from "./RotaRings.jsx";

/* ─── Canvas: partículas + pássaros ──────────────────────────── */
function AtmosphereCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let raf;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.12,
            r: Math.random() * 1.4 + 0.3,
            a: Math.random() * 0.5 + 0.15,
            da: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        }));

        const createBird = (startX = -60) => ({
            x: startX,
            y: 80 + Math.random() * canvas.height * 0.38,
            speed: 0.55 + Math.random() * 0.6,
            scale: 0.6 + Math.random() * 0.7,
            opacity: 0.3 + Math.random() * 0.45,
            row: Math.floor(Math.random() * 3),
        });

        const birds = [];
        for (let i = 0; i < 7; i++) birds.push(createBird(Math.random() * canvas.width));
        let lastBird = 0;

        const drawBird = (b) => {
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.scale(b.scale, b.scale);
            ctx.globalAlpha = b.opacity;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-18, -10, -30, -4, -36, 2);
            ctx.bezierCurveTo(-28, 0, -14, 6, 0, 0);
            ctx.fillStyle = "rgba(244,162,97,0.85)";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(18, -10, 30, -4, 36, 2);
            ctx.bezierCurveTo(28, 0, 14, 6, 0, 0);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(0, 1, 5, 2.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(233,196,106,0.9)";
            ctx.fill();
            ctx.restore();
        };

        const tick = (ts) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy; p.a += p.da;
                if (p.a > 0.65 || p.a < 0.08) p.da *= -1;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y);
                ctx.beginPath();
                ctx.moveTo(0, -p.r * 2.2); ctx.lineTo(p.r * 0.6, 0);
                ctx.lineTo(0, p.r * 2.2); ctx.lineTo(-p.r * 0.6, 0);
                ctx.closePath(); ctx.fillStyle = "#F4A261"; ctx.fill(); ctx.restore();
            }
            if (ts - lastBird > 3200 + Math.random() * 4000) {
                birds.push(createBird()); lastBird = ts;
            }
            for (let i = birds.length - 1; i >= 0; i--) {
                const b = birds[i];
                b.x += b.speed;
                b.y += Math.sin(b.x * 0.04 + b.row) * 0.18;
                drawBird(b);
                if (b.x > canvas.width + 80) birds.splice(i, 1);
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, []);

    return (
        <canvas
            ref={ref}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 8, pointerEvents: "none" }}
        />
    );
}

/* ─── Mapa SVG da rota ──────────────────────────────────────── */
function RouteMap() {
    const cities = [
        { x: 68,  y: 62, label: "Porto Murtinho", sub: "Brasil",    color: "#22c55e", flag: "🇧🇷" },
        { x: 210, y: 48, label: "Carmelo Peralta", sub: "Paraguai", color: "#2dd4bf", flag: "🇵🇾" },
        { x: 340, y: 40, label: "Resistencia",    sub: "Argentina", color: "#60a5fa", flag: "🇦🇷" },
        { x: 480, y: 52, label: "Mendoza",        sub: "Argentina", color: "#818cf8", flag: "🇦🇷" },
        { x: 600, y: 42, label: "Iquique",        sub: "Chile",     color: "#f87171", flag: "🇨🇱" },
    ];

    return (
        <div style={{ width: "100%" }}>
            <svg viewBox="0 0 680 110" width="100%" style={{ overflow: "visible", display: "block" }}>
                <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#22c55e" />
                        <stop offset="25%"  stopColor="#2dd4bf" />
                        <stop offset="60%"  stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                <path d="M68,62 Q130,30 210,48 Q270,62 340,40 Q400,22 480,52 Q540,72 600,42"
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
                <path d="M68,62 Q130,30 210,48 Q270,62 340,40 Q400,22 480,52 Q540,72 600,42"
                    fill="none" stroke="url(#rg)" strokeWidth="2.5" strokeLinecap="round"
                    filter="url(#glow)"
                    style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: "route-draw 2.8s cubic-bezier(.4,0,.2,1) forwards 1.8s" }}
                />
                {cities.map((c, i) => (
                    <g key={i}>
                        <circle cx={c.x} cy={c.y} r={13} fill={c.color} opacity={0.12}
                            style={{ animation: "pulse-dot 2.5s ease-in-out infinite", animationDelay: `${i * 0.4}s` }} />
                        <circle cx={c.x} cy={c.y} r={7} fill={c.color} opacity={0.25} />
                        <circle cx={c.x} cy={c.y} r={4.5} fill={c.color} filter="url(#glow)" />
                        <circle cx={c.x} cy={c.y} r={2} fill="white" />
                        <text x={c.x} y={c.y - 18} textAnchor="middle" fill="rgba(255,255,255,0.9)"
                            fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.03em">
                            {c.label}
                        </text>
                        <text x={c.x} y={c.y - 9} textAnchor="middle" fill={c.color}
                            fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
                            {c.flag} {c.sub}
                        </text>
                    </g>
                ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", padding: "0 4px" }}>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif", textTransform: "uppercase" }}>← Atlântico</span>
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif", textTransform: "uppercase" }}>Pacífico →</span>
            </div>
        </div>
    );
}

/* ─── Glow solar ────────────────────────────────────────────── */
function SunGlow() {
    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(244,162,97,0.08) 0%, rgba(233,196,106,0.04) 45%, transparent 70%)", filter: "blur(60px)" }} />
            <div style={{ position: "absolute", top: "18%", left: "52%", transform: "translateX(-50%)", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(244,162,97,0.28) 0%, rgba(233,196,106,0.14) 30%, rgba(231,111,81,0.06) 60%, transparent 80%)", filter: "blur(24px)", animation: "glow-pulse 6s ease-in-out infinite" }} />
            <div style={{ position: "absolute", top: "22%", left: "52%", transform: "translateX(-50%)", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(255,220,150,0.45) 0%, rgba(244,162,97,0.25) 50%, transparent 80%)", filter: "blur(8px)", animation: "glow-pulse 4s ease-in-out infinite 0.5s" }} />
            <div style={{ position: "absolute", top: "18%", bottom: "20%", left: "52%", transform: "translateX(-50%)", width: "3px", background: "linear-gradient(to bottom, rgba(255,220,150,0.15) 0%, rgba(244,162,97,0.08) 60%, transparent 100%)", filter: "blur(4px)" }} />
            <div style={{ position: "absolute", bottom: "12%", left: "52%", transform: "translateX(-50%)", width: "340px", height: "80px", background: "radial-gradient(ellipse, rgba(244,162,97,0.14) 0%, transparent 70%)", filter: "blur(16px)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(2,13,26,0.35) 100%)" }} />
        </div>
    );
}

/* ─── Stat com CountUp ──────────────────────────────────────── */
function StatCard({ value, suffix, label, color, delay }) {
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(1.6rem, 3vw, 2.1rem)", color, lineHeight: 1, letterSpacing: "0.04em" }}>
                {started ? <CountUp end={value} duration={2} suffix={suffix ?? ""} separator="." /> : `0${suffix ?? ""}`}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em", marginTop: "3px" }}>
                {label}
            </div>
        </div>
    );
}

/* ─── HERO ──────────────────────────────────────────────────── */
export default function HeroSection() {
    const sectionRef = useRef(null);
    const { scrollY } = useScroll();

    const videoY   = useTransform(scrollY, [0, 700], [0,  90]);
    const contentY = useTransform(scrollY, [0, 700], [0, -55]);
    const opacity  = useTransform(scrollY, [0, 450], [1,   0]);

    const [wordIdx, setWordIdx] = useState(0);
    const words = ["DOIS OCEANOS", "UMA HISTÓRIA", "UM FUTURO"];
    useEffect(() => {
        const iv = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3400);
        return () => clearInterval(iv);
    }, []);

    return (
        <section ref={sectionRef} style={{
            position: "relative", width: "100%", height: "100svh", minHeight: "600px",
            overflow: "hidden", background: "#020d1a",
            display: "flex", alignItems: "center",
        }}>
            {/* Vídeo com parallax */}
            <motion.div style={{ y: videoY, position: "absolute", inset: "-8% 0 -8% 0", zIndex: 0 }}>
                <video autoPlay muted loop playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.52) saturate(1.3) contrast(1.05)" }}
                    src="/hero-bridge.mp4"
                />
            </motion.div>

            {/* Sol */}
            <SunGlow />

            {/* Overlay topo/base */}
            <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "linear-gradient(180deg, rgba(2,13,26,0.72) 0%, rgba(2,13,26,0) 28%, rgba(2,13,26,0) 55%, rgba(2,13,26,0.96) 100%)" }} />
            {/* Overlay lateral esquerda */}
            <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "linear-gradient(100deg, rgba(2,13,26,0.82) 0%, rgba(2,13,26,0.45) 45%, rgba(2,13,26,0) 75%)" }} />

            {/* Névoas */}
            <div className="hero-fog-1" style={{ position: "absolute", bottom: 0, left: "-8%", right: "-8%", height: "38%", zIndex: 4, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,27,51,0.9) 0%, rgba(42,157,143,0.04) 65%, transparent 100%)" }} />
            <div className="hero-fog-2" style={{ position: "absolute", bottom: 0, left: "-4%", right: "-4%", height: "22%", zIndex: 5, pointerEvents: "none", background: "linear-gradient(to top, rgba(2,13,26,0.75) 0%, transparent 100%)" }} />

            {/* Lens flare */}
            <div className="hero-lens-flare" />

            {/* Canvas */}
            <AtmosphereCanvas />

            {/* Conteúdo */}
            <motion.div style={{ y: contentY, opacity, position: "relative", zIndex: 20, width: "100%" }}>
                <div className="container-rota" style={{ paddingTop: "80px", paddingBottom: "40px" }}>
                    <div className="hero-grid" style={{ minHeight: "calc(100svh - 160px)" }}>

                        {/* Coluna esquerda */}
                        <div>
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "28px", padding: "7px 18px", borderRadius: "100px", background: "rgba(244,162,97,0.1)", border: "1px solid rgba(244,162,97,0.28)", backdropFilter: "blur(12px)" }}
                            >
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4A261", boxShadow: "0 0 10px rgba(244,162,97,0.9)", animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
                                <span style={{ fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
                                    Rota Bioceânica · 4 Países · 3.500 km
                                </span>
                            </motion.div>

                            {/* Título linha 1 */}
                            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }}>
                                <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3.6rem, 8vw, 7.5rem)", color: "#F8FAFC", lineHeight: 0.92, letterSpacing: "0.03em", margin: 0 }}>
                                    A PONTE ENTRE
                                </h1>
                            </motion.div>

                            {/* Título linha 2 — animado */}
                            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.5 }}
                                style={{ marginBottom: "24px", overflow: "hidden", height: "clamp(3.3rem, 7.5vw, 6.9rem)" }}>
                                <AnimatePresence mode="wait">
                                    <motion.h1
                                        key={wordIdx}
                                        initial={{ y: "110%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        exit={{ y: "-110%", opacity: 0 }}
                                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                        className="hero-title-gradient"
                                        style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3.6rem, 8vw, 7.5rem)", lineHeight: 0.92, letterSpacing: "0.03em", display: "block", margin: 0 }}
                                    >
                                        {words[wordIdx]}
                                    </motion.h1>
                                </AnimatePresence>
                            </motion.div>

                            {/* Subtítulo */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
                                style={{ fontFamily: '"Lora", Georgia, serif', fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "36px" }}
                            >
                                Do Pantanal ao Pacífico — a maior integração continental da América do Sul, unindo culturas, povos e mercados em 3.500 km de história viva.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }}
                                style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" }}
                            >
                                <Link to="/cidades" className="btn-amber" style={{ fontSize: "13px", padding: "13px 28px" }}>
                                    Explorar Cidades <ArrowRight size={15} />
                                </Link>
                                <Link to="/noticias" className="btn-ghost" style={{ fontSize: "13px", padding: "13px 28px" }}>
                                    Conheça a Rota
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05 }}
                                style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px" }}
                            >
                                {[
                                    { value: 3500, suffix: "km", label: "extensão total",    color: "#F4A261", delay: 1200 },
                                    { value: 4,    suffix: "",   label: "países integrados", color: "#2dd4bf", delay: 1350 },
                                    { value: 12,   suffix: "",   label: "cidades na rota",   color: "#60a5fa", delay: 1500 },
                                ].map((s, i) => (
                                    <div key={i} style={{ flex: 1, paddingRight: i < 2 ? "20px" : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", paddingLeft: i > 0 ? "20px" : 0 }}>
                                        <StatCard {...s} />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Coluna direita */}
                        <motion.div
                            initial={{ opacity: 0, x: 40, scale: 0.96 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-right-col"
                            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                        >
                            {/* Card argolas */}
                            <div className="glass-card-amber" style={{ padding: "28px 24px", textAlign: "center", boxShadow: "0 0 40px rgba(244,162,97,0.08), inset 0 1px 0 rgba(244,162,97,0.15)" }}>
                                <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "16px" }}>
                                    Os 4 países da rota
                                </p>
                                <RotaRings />
                            </div>

                            {/* Card mapa */}
                            <div className="glass-card" style={{ padding: "24px 20px" }}>
                                <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "14px" }}>
                                    Traçado da rota — Atlântico → Pacífico
                                </p>
                                <RouteMap />
                            </div>

                            {/* Card UNESCO */}
                            <div style={{ background: "linear-gradient(135deg, rgba(244,162,97,0.12), rgba(233,196,106,0.06))", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "16px", padding: "20px 22px", display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(244,162,97,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "20px" }}>
                                    🏆
                                </div>
                                <div>
                                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#F4A261", fontFamily: "Inter, sans-serif", marginBottom: "3px" }}>
                                        Reconhecimento UNESCO
                                    </div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
                                        Patrimônio cultural e natural reconhecido internacionalmente ao longo do corredor
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
                <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>descobrir</span>
                <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronDown size={20} style={{ color: "rgba(244,162,97,0.5)" }} />
                </motion.div>
            </motion.div>

            {/* Blend com próxima seção */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", zIndex: 15, background: "linear-gradient(to bottom, transparent, #061B33)", pointerEvents: "none" }} />
        </section>
    );
}
