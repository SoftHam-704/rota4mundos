import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Pause, Headphones, X as XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import RotaRings from "./RotaRings.jsx";

/* ── helper: media query reativo ───────────────────────────── */
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false
    );
    useEffect(() => {
        const mq = window.matchMedia(query);
        const handler = (e) => setMatches(e.matches);
        mq.addEventListener("change", handler);
        setMatches(mq.matches);
        return () => mq.removeEventListener("change", handler);
    }, [query]);
    return matches;
}

/* ─── Player de podcast (compartilhado entre inline + flutuante) ── */
function PodcastPlayer({ floating = false, onClose }) {
    const audioRef = useRef(null);
    const [playing, setPlaying]   = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) { a.pause(); setPlaying(false); }
        else         { a.play();  setPlaying(true); }
    };

    const fmt = (s) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: floating ? "10px 12px 10px 10px" : "10px 16px",
            borderRadius: "100px",
            background: floating ? "rgba(6,27,51,0.92)" : "rgba(255,255,255,0.06)",
            border: "1px solid " + (floating ? "rgba(244,162,97,0.4)" : "rgba(255,255,255,0.1)"),
            backdropFilter: "blur(16px)",
            maxWidth: floating ? "280px" : "320px",
            boxShadow: floating ? "0 12px 30px rgba(0,0,0,0.5)" : "none",
        }}>
            <audio
                ref={audioRef}
                src="https://rota4mundos.com.br/audios/podcast-rota-bioceanica.m4a"
                onTimeUpdate={e => setProgress(e.target.currentTime / (e.target.duration || 1))}
                onLoadedMetadata={e => setDuration(e.target.duration)}
                onEnded={() => setPlaying(false)}
            />

            <button
                onClick={toggle}
                aria-label={playing ? "Pausar podcast" : "Tocar podcast"}
                style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, boxShadow: "0 0 16px rgba(244,162,97,0.4)",
                }}
            >
                {playing
                    ? <Pause style={{ width: "14px", height: "14px", color: "#061B33" }} />
                    : <Play  style={{ width: "14px", height: "14px", color: "#061B33", marginLeft: "2px" }} />
                }
            </button>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                    <Headphones style={{ width: "11px", height: "11px", color: "#F4A261", flexShrink: 0 }} />
                    <span style={{
                        fontSize: "11px", fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "Inter, sans-serif",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                        {playing ? "Reproduzindo..." : "Ouça o Podcast"}
                    </span>
                    {duration > 0 && (
                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", flexShrink: 0, marginLeft: "auto" }}>
                            {fmt(duration * progress)}
                        </span>
                    )}
                </div>
                <div
                    style={{ height: "3px", borderRadius: "4px", background: "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative" }}
                    onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct  = (e.clientX - rect.left) / rect.width;
                        if (audioRef.current) audioRef.current.currentTime = pct * audioRef.current.duration;
                    }}
                >
                    <div style={{ height: "100%", width: `${progress * 100}%`, borderRadius: "4px", background: "linear-gradient(90deg, #F4A261, #E9C46A)", transition: "width 0.25s linear" }} />
                </div>
            </div>

            {floating && (
                <button
                    onClick={onClose}
                    aria-label="Fechar player"
                    style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.6)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                    }}
                >
                    <XIcon size={12} />
                </button>
            )}
        </div>
    );
}

/* ─── Canvas: partículas + pássaros (mobile com menos partículas) ── */
function AtmosphereCanvas({ isMobile }) {
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

        const particleCount = isMobile ? 32 : 80;
        const birdsInit     = isMobile ? 3 : 7;
        const birdGapMs     = isMobile ? 5200 : 3200;

        const particles = Array.from({ length: particleCount }, () => ({
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
        for (let i = 0; i < birdsInit; i++) birds.push(createBird(Math.random() * canvas.width));
        let lastBird = 0;

        const drawBird = (b) => {
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.scale(b.scale, b.scale);
            ctx.globalAlpha = b.opacity;
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-18, -10, -30, -4, -36, 2);
            ctx.bezierCurveTo(-28, 0, -14, 6, 0, 0);
            ctx.fillStyle = "rgba(244,162,97,0.85)"; ctx.fill();
            ctx.beginPath(); ctx.moveTo(0, 0);
            ctx.bezierCurveTo(18, -10, 30, -4, 36, 2);
            ctx.bezierCurveTo(28, 0, 14, 6, 0, 0);
            ctx.fill();
            ctx.beginPath(); ctx.ellipse(0, 1, 5, 2.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(233,196,106,0.9)"; ctx.fill();
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
            if (ts - lastBird > birdGapMs + Math.random() * 4000) {
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
    }, [isMobile]);

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
        { x: 48,  y: 62, label: "Campo Grande",    sub: "🇧🇷 Brasil",    color: "#22c55e", above: true  },
        { x: 160, y: 72, label: "Porto Murtinho",  sub: "🇧🇷 Brasil",    color: "#4ade80", above: false },
        { x: 275, y: 54, label: "Carmelo Peralta", sub: "🇵🇾 Paraguai",  color: "#2dd4bf", above: true  },
        { x: 390, y: 46, label: "Resistencia",     sub: "🇦🇷 Argentina", color: "#60a5fa", above: false },
        { x: 505, y: 58, label: "Mendoza",         sub: "🇦🇷 Argentina", color: "#818cf8", above: true  },
        { x: 620, y: 48, label: "Iquique",         sub: "🇨🇱 Chile",     color: "#f87171", above: false },
    ];
    return (
        <div style={{ width: "100%", overflow: "hidden" }}>
            <svg viewBox="0 0 680 135" width="100%" style={{ overflow: "visible", display: "block" }}>
                <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#22c55e" />
                        <stop offset="30%"  stopColor="#2dd4bf" />
                        <stop offset="65%"  stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <path d="M48,62 Q100,48 160,72 Q215,82 275,54 Q330,32 390,46 Q448,60 505,58 Q560,48 620,48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
                <path d="M48,62 Q100,48 160,72 Q215,82 275,54 Q330,32 390,46 Q448,60 505,58 Q560,48 620,48"
                    fill="none" stroke="url(#rg)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)"
                    style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: "route-draw 2.8s cubic-bezier(.4,0,.2,1) forwards 1.8s" }}
                />
                {cities.map((c, i) => (
                    <g key={i}>
                        <circle cx={c.x} cy={c.y} r={5} fill={c.color} filter="url(#glow)" />
                        <circle cx={c.x} cy={c.y} r={2.5} fill="white" />
                        {c.above ? (
                            <>
                                <text x={c.x} y={c.y - 16} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.02em">{c.label}</text>
                                <text x={c.x} y={c.y - 5}  textAnchor="middle" fill={c.color} fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">{c.sub}</text>
                            </>
                        ) : (
                            <>
                                <text x={c.x} y={c.y + 14} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.02em">{c.label}</text>
                                <text x={c.x} y={c.y + 25} textAnchor="middle" fill={c.color} fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">{c.sub}</text>
                            </>
                        )}
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
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "min(700px, 130%)", height: "500px", background: "radial-gradient(ellipse, rgba(244,162,97,0.08) 0%, rgba(233,196,106,0.04) 45%, transparent 70%)", filter: "blur(60px)" }} />
            <div style={{ position: "absolute", top: "18%", left: "52%", transform: "translateX(-50%)", width: "min(320px, 70%)", height: "320px", background: "radial-gradient(circle, rgba(244,162,97,0.28) 0%, rgba(233,196,106,0.14) 30%, rgba(231,111,81,0.06) 60%, transparent 80%)", filter: "blur(24px)", animation: "glow-pulse 6s ease-in-out infinite" }} />
            <div style={{ position: "absolute", top: "22%", left: "52%", transform: "translateX(-50%)", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(255,220,150,0.45) 0%, rgba(244,162,97,0.25) 50%, transparent 80%)", filter: "blur(8px)", animation: "glow-pulse 4s ease-in-out infinite 0.5s" }} />
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
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(1.5rem, 6.5vw, 2.1rem)", color, lineHeight: 1, letterSpacing: "0.04em" }}>
                {started ? <CountUp end={value} duration={2} suffix={suffix ?? ""} separator="." /> : `0${suffix ?? ""}`}
            </div>
            <div style={{ fontSize: "clamp(9px, 2.4vw, 10px)", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em", marginTop: "4px" }}>
                {label}
            </div>
        </div>
    );
}

/* ─── HERO ──────────────────────────────────────────────────── */
export default function HeroSection() {
    const sectionRef = useRef(null);
    const isMobile   = useMediaQuery("(max-width: 767px)");
    const { scrollY } = useScroll();

    // parallax reduzido no mobile (menos jank, menos battery)
    const videoY   = useTransform(scrollY, [0, 700], [0, isMobile ?  40 :  90]);
    const contentY = useTransform(scrollY, [0, 700], [0, isMobile ? -25 : -55]);
    const opacity  = useTransform(scrollY, [0, 450], [1, 0]);

    const [wordIdx, setWordIdx] = useState(0);
    const words = ["DOIS OCEANOS", "UMA HISTÓRIA", "UM FUTURO"];
    useEffect(() => {
        const iv = setInterval(() => setWordIdx(i => (i + 1) % words.length), 3400);
        return () => clearInterval(iv);
    }, []);

    // mini-player flutuante: mostrar depois do scroll passar do hero
    const [floatingVisible, setFloatingVisible] = useState(false);
    const [floatingDismissed, setFloatingDismissed] = useState(false);
    useEffect(() => {
        if (!isMobile) return;
        const onScroll = () => {
            const y = window.scrollY;
            setFloatingVisible(y > window.innerHeight * 0.4 && y < window.innerHeight * 6);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isMobile]);

    return (
        <>
            <section ref={sectionRef} style={{
                position: "relative", width: "100%", height: "100svh",
                minHeight: isMobile ? "560px" : "600px",
                overflow: "hidden", background: "#020d1a",
                display: "flex", alignItems: "center",
            }}>
                <motion.div style={{ y: videoY, position: "absolute", inset: "-8% 0 -8% 0", zIndex: 0 }}>
                    <video autoPlay muted loop playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.52) saturate(1.3) contrast(1.05)" }}
                        src="/hero-bridge.mp4"
                    />
                </motion.div>

                <SunGlow />

                <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "linear-gradient(180deg, rgba(2,13,26,0.72) 0%, rgba(2,13,26,0) 28%, rgba(2,13,26,0) 55%, rgba(2,13,26,0.96) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "linear-gradient(100deg, rgba(2,13,26,0.82) 0%, rgba(2,13,26,0.45) 45%, rgba(2,13,26,0) 75%)" }} />

                <div className="hero-fog-1" style={{ position: "absolute", bottom: 0, left: "-8%", right: "-8%", height: "38%", zIndex: 4, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,27,51,0.9) 0%, rgba(42,157,143,0.04) 65%, transparent 100%)" }} />
                <div className="hero-fog-2" style={{ position: "absolute", bottom: 0, left: "-4%", right: "-4%", height: "22%", zIndex: 5, pointerEvents: "none", background: "linear-gradient(to top, rgba(2,13,26,0.75) 0%, transparent 100%)" }} />

                <div className="hero-lens-flare" />

                <AtmosphereCanvas isMobile={isMobile} />

                <motion.div style={{ y: contentY, opacity, position: "relative", zIndex: 20, width: "100%" }}>
                    <div className="container-rota" style={{ paddingTop: "clamp(96px, 16vh, 150px)", paddingBottom: "32px" }}>
                        <div className="hero-grid" style={{ minHeight: "calc(100svh - 140px)" }}>

                            {/* Coluna esquerda */}
                            <div>
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "10px",
                                        marginBottom: "clamp(14px, 2.5vh, 28px)",
                                        padding: "6px 14px",
                                        borderRadius: "100px", background: "rgba(244,162,97,0.1)",
                                        border: "1px solid rgba(244,162,97,0.28)", backdropFilter: "blur(12px)",
                                        maxWidth: "100%",
                                    }}
                                >
                                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4A261", boxShadow: "0 0 10px rgba(244,162,97,0.9)", animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
                                    <span style={{
                                        fontSize: "clamp(9px, 2.4vw, 10px)", fontWeight: 700,
                                        color: "#F4A261", letterSpacing: "0.18em",
                                        textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                                    }}>
                                        Rota Bioceânica · 4 Países · 3.500 km
                                    </span>
                                </motion.div>

                                {/* Título linha 1 */}
                                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }}>
                                    <h1 style={{
                                        fontFamily: '"Bebas Neue", sans-serif',
                                        fontSize: "var(--fs-hero-title, clamp(2.8rem, 11vw, 7.5rem))",
                                        color: "#F8FAFC", lineHeight: 0.92,
                                        letterSpacing: "0.03em", margin: 0,
                                    }}>
                                        A PONTE ENTRE
                                    </h1>
                                </motion.div>

                                {/* Título linha 2 — animado */}
                                <motion.div
                                    initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.75, delay: 0.5 }}
                                    style={{
                                        marginBottom: "clamp(12px, 2vh, 24px)",
                                        overflow: "hidden",
                                        height: "clamp(2.6rem, 10vw, 6.9rem)",
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.h1
                                            key={wordIdx}
                                            initial={{ y: "110%", opacity: 0 }}
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={{ y: "-110%", opacity: 0 }}
                                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                            className="hero-title-gradient"
                                            style={{
                                                fontFamily: '"Bebas Neue", sans-serif',
                                                fontSize: "var(--fs-hero-title, clamp(2.8rem, 11vw, 7.5rem))",
                                                lineHeight: 0.92, letterSpacing: "0.03em",
                                                display: "block", margin: 0,
                                            }}
                                        >
                                            {words[wordIdx]}
                                        </motion.h1>
                                    </AnimatePresence>
                                </motion.div>

                                {/* Subtítulo */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.7 }}
                                    style={{
                                        fontFamily: '"Lora", Georgia, serif',
                                        fontSize: "clamp(0.92rem, 2.6vw, 1.15rem)",
                                        fontStyle: "italic", color: "rgba(255,255,255,0.6)",
                                        lineHeight: 1.7, maxWidth: "480px",
                                        marginBottom: "clamp(20px, 3vh, 36px)",
                                    }}
                                >
                                    Do Pantanal ao Pacífico — a maior integração continental da América do Sul, unindo culturas, povos e mercados em 3.500 km de história viva.
                                </motion.p>

                                {/* CTAs */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.85 }}
                                    style={{
                                        display: "flex", gap: "10px", flexWrap: "wrap",
                                        marginBottom: "clamp(20px, 4vh, 52px)",
                                    }}
                                >
                                    <Link to="/cidades" className="btn-amber" style={{
                                        fontSize: "clamp(12px, 3vw, 13px)",
                                        padding: "clamp(11px, 2.4vw, 13px) clamp(20px, 5vw, 28px)",
                                    }}>
                                        Explorar Cidades <ArrowRight size={14} />
                                    </Link>
                                    <Link to="/noticias" className="btn-ghost" style={{
                                        fontSize: "clamp(12px, 3vw, 13px)",
                                        padding: "clamp(11px, 2.4vw, 13px) clamp(20px, 5vw, 28px)",
                                    }}>
                                        Conheça a Rota
                                    </Link>
                                </motion.div>

                                {/* Podcast player — inline só no desktop. No mobile vai pro flutuante. */}
                                {!isMobile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.95 }}
                                        style={{ marginBottom: "clamp(18px, 3vh, 32px)" }}
                                    >
                                        <PodcastPlayer />
                                    </motion.div>
                                )}

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 1.05 }}
                                    style={{
                                        display: "flex", gap: 0,
                                        borderTop: "1px solid rgba(255,255,255,0.08)",
                                        paddingTop: "clamp(14px, 2.5vh, 28px)",
                                    }}
                                >
                                    {[
                                        { value: 3500, suffix: "km", label: "extensão total",    color: "#F4A261", delay: 1200 },
                                        { value: 4,    suffix: "",   label: "países integrados", color: "#2dd4bf", delay: 1350 },
                                        { value: 12,   suffix: "",   label: "cidades na rota",   color: "#60a5fa", delay: 1500 },
                                    ].map((s, i) => (
                                        <div key={i} style={{
                                            flex: 1,
                                            paddingRight: i < 2 ? "clamp(10px, 3vw, 20px)" : 0,
                                            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                            paddingLeft: i > 0 ? "clamp(10px, 3vw, 20px)" : 0,
                                        }}>
                                            <StatCard {...s} />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Coluna direita (escondida no mobile via CSS) */}
                            <motion.div
                                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="hero-right-col"
                                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                            >
                                <div className="glass-card-amber" style={{ padding: "28px 24px", textAlign: "center", boxShadow: "0 0 40px rgba(244,162,97,0.08), inset 0 1px 0 rgba(244,162,97,0.15)" }}>
                                    <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "16px" }}>
                                        Os 4 países da rota
                                    </p>
                                    <RotaRings />
                                </div>

                                <div className="glass-card" style={{ padding: "24px 20px" }}>
                                    <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "14px" }}>
                                        Traçado da rota — Atlântico → Pacífico
                                    </p>
                                    <RouteMap />
                                </div>

                                <div style={{ background: "linear-gradient(135deg, rgba(244,162,97,0.12), rgba(233,196,106,0.06))", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "16px", padding: "20px 22px", display: "flex", alignItems: "center", gap: "16px" }}>
                                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(244,162,97,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "20px" }}>🏆</div>
                                    <div>
                                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#F4A261", fontFamily: "Inter, sans-serif", marginBottom: "3px" }}>Reconhecimento UNESCO</div>
                                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>Patrimônio cultural e natural reconhecido internacionalmente ao longo do corredor</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                    style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", cursor: "pointer" }}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                >
                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>descobrir</span>
                    <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                        <ChevronDown size={20} style={{ color: "rgba(244,162,97,0.5)" }} />
                    </motion.div>
                </motion.div>

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", zIndex: 15, background: "linear-gradient(to bottom, transparent, #061B33)", pointerEvents: "none" }} />
            </section>

            {/* Mini-player flutuante (mobile only) — aparece após rolar o hero */}
            <AnimatePresence>
                {isMobile && floatingVisible && !floatingDismissed && (
                    <motion.div
                        className="podcast-floating-wrap"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <PodcastPlayer floating onClose={() => setFloatingDismissed(true)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
