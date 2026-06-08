import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ── acento + partícula por cena ───────────────────────────── */
const sceneAccent = {
    pantanal:         { accent: "#ff9a4d", particle: "birds"   },
    "rio-cristalino": { accent: "#5fc7d6", particle: "bubbles" },
    ponte:            { accent: "#ffb86b", particle: "birds"   },
    chaco:            { accent: "#e8a85a", particle: "dust"    },
    andes:            { accent: "#c46a8a", particle: null      },
    pacifico:         { accent: "#3aa0c8", particle: "waves"   },
};

/* ── helper media query ─────────────────────────────────────── */
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

/* ── contador animado ──────────────────────────────────────── */
function CountUp({ to, prefix = "", suffix = "" }) {
    const ref = useRef(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started) {
                setStarted(true);
                const controls = animate(0, to, {
                    duration: 1.6, ease: [0.16, 1, 0.3, 1],
                    onUpdate: (v) => {
                        if (ref.current)
                            ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("pt-BR")}${suffix}`;
                    },
                });
                return () => controls.stop();
            }
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, [to, prefix, suffix, started]);
    return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ── partículas (no mobile: contagem reduzida) ──────────────── */
function Particles({ kind, accent, isMobile }) {
    if (kind === "birds") {
        const n = isMobile ? 3 : 5;
        return (
            <>
                {Array.from({ length: n }).map((_, i) => (
                    <motion.svg
                        key={i} viewBox="0 0 40 20"
                        width={22 + i * 3}
                        style={{ position: "absolute", top: `${18 + i * 7}%`, left: "-10%", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                        initial={{ x: "-10vw" }}
                        animate={{ x: "120vw", y: [0, -10, 0, -6, 0] }}
                        transition={{
                            x: { duration: 24 + i * 5, repeat: Infinity, ease: "linear", delay: i * 4 },
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        }}
                    >
                        <path d="M2,12 Q10,2 20,10 Q30,2 38,12" stroke="#0a0e1c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </motion.svg>
                ))}
            </>
        );
    }
    if (kind === "bubbles") {
        const n = isMobile ? 8 : 16;
        return (
            <>
                {Array.from({ length: n }).map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${Math.random() * 100}%`, bottom: 0,
                            width: 4 + Math.random() * 10,
                            height: 4 + Math.random() * 10,
                            borderRadius: "50%",
                            background: `${accent}66`,
                            border: `1px solid ${accent}`,
                        }}
                        animate={{ y: [-20, -700], opacity: [0, 0.7, 0] }}
                        transition={{ duration: 9 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 8, ease: "easeOut" }}
                    />
                ))}
            </>
        );
    }
    if (kind === "dust") {
        const n = isMobile ? 14 : 26;
        return (
            <>
                {Array.from({ length: n }).map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute",
                            top: `${30 + Math.random() * 50}%`,
                            left: `${Math.random() * 100}%`,
                            width: 2, height: 2,
                            borderRadius: "50%",
                            background: `${accent}aa`,
                        }}
                        animate={{ x: [0, 80, 160], opacity: [0, 1, 0] }}
                        transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 6, ease: "linear" }}
                    />
                ))}
            </>
        );
    }
    if (kind === "waves") {
        return (
            <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "120px", opacity: 0.4 }} viewBox="0 0 1600 100" preserveAspectRatio="none">
                {[0, 1, 2].map((i) => (
                    <motion.path
                        key={i}
                        d="M0,50 Q200,20 400,50 T800,50 T1200,50 T1600,50 L1600,100 L0,100 Z"
                        fill={accent} opacity={0.25 - i * 0.07}
                        animate={{ x: [0, -200, 0] }}
                        transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </svg>
        );
    }
    return null;
}

/* ── componente principal ──────────────────────────────────── */
/**
 * Props:
 *  country      — "Brasil"
 *  countryFlag  — "🇧🇷"
 *  region       — "Capital do Estado"
 *  name         — { first: "Campo", second: "Grande" }
 *  tagline      — string
 *  scene        — "pantanal" | "rio-cristalino" | "ponte" | "chaco" | "andes" | "pacifico"
 *  image        — "/cities/campo_grande.jpg"
 *  accentColor  — override do accent da cena (opcional)
 *  stats        — [{ label, value, prefix?, suffix? }, ...]
 */
export default function CityHero({ country, countryFlag, region, name, tagline, scene, image, accentColor, stats = [] }) {
    const cfg     = sceneAccent[scene] ?? sceneAccent.pantanal;
    const accent  = accentColor ?? cfg.accent;
    const isMobile = useMediaQuery("(max-width: 767px)");

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

    /* Parallax do scroll — desligado no mobile (imagem estática), reduzido no desktop */
    const bgYRaw       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const bgScaleRaw   = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const titleYRaw    = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const particleYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // No mobile: pin tudo no zero
    const bgY       = isMobile ? "0%"  : bgYRaw;
    const bgScale   = isMobile ? 1     : bgScaleRaw;
    const titleY    = isMobile ? "0%"  : titleYRaw;
    const particleY = isMobile ? "0%"  : particleYRaw;

    /* Parallax do mouse — também desligado no mobile */
    const mx = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 50, damping: 20 });
    const bgParallaxXRaw = useTransform(sx, (v) => v * 0.6);
    const bgParallaxX    = isMobile ? 0 : bgParallaxXRaw;

    useEffect(() => {
        if (isMobile) return;
        const onMove = (e) => mx.set((e.clientX / window.innerWidth - 0.5) * 24);
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [mx, isMobile]);

    return (
        <section
            ref={containerRef}
            style={{
                position: "relative",
                minHeight: isMobile ? "min(720px, 100svh)" : "100vh",
                width: "100%", overflow: "hidden",
                backgroundColor: "#061B33",
            }}
        >
            {/* foto HD — Ken Burns só no desktop */}
            <motion.div style={{ position: "absolute", inset: 0, y: bgY, scale: bgScale, x: bgParallaxX }}>
                <motion.img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    style={{
                        width: "100%",
                        height: isMobile ? "100%" : "115%",
                        objectFit: "cover",
                    }}
                    initial={isMobile ? { scale: 1, opacity: 0 } : { scale: 1.04, opacity: 0 }}
                    animate={isMobile ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                    transition={{
                        duration: isMobile ? 1.2 : 2.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
            </motion.div>

            {/* gradientes */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(180deg, rgba(5,8,20,0.55) 0%, rgba(5,8,20,0.15) 30%, rgba(5,8,20,0.55) 75%, rgba(5,8,20,0.92) 100%)",
            }} />
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 30% 60%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
            }} />
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                mixBlendMode: "overlay", opacity: 0.4,
                background: `radial-gradient(circle at 70% 30%, ${accent}, transparent 55%)`,
            }} />
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                opacity: 0.08, mixBlendMode: "overlay",
                backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }} />

            <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", y: particleY }}>
                <Particles kind={cfg.particle} accent={accent} isMobile={isMobile} />
            </motion.div>

            {/* conteúdo */}
            <motion.div
                style={{
                    position: "relative", zIndex: 10,
                    maxWidth: "80rem", margin: "0 auto",
                    padding: isMobile
                        ? "72px 20px 96px"
                        : "80px 24px 120px",
                    opacity: titleOpacity, y: titleY,
                }}
            >
                {/* badge país */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        fontSize: "clamp(10px, 2.6vw, 12px)",
                        textTransform: "uppercase", letterSpacing: "0.22em",
                        color: accent,
                        textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                        fontFamily: "Inter, sans-serif", fontWeight: 700,
                        flexWrap: "wrap",
                    }}
                >
                    <span style={{ fontSize: "clamp(22px, 5.6vw, 26px)" }}>{countryFlag}</span>
                    <span>{country} · {region}</span>
                </motion.div>

                {/* nome da cidade — clamp fluido */}
                <h1 style={{
                    marginTop: "16px",
                    lineHeight: 0.92,
                    textShadow: "0 6px 40px rgba(0,0,0,0.55)",
                }}>
                    <motion.span
                        style={{
                            display: "block",
                            fontSize: "clamp(2.6rem, 13vw, 9rem)",
                            fontWeight: 700, color: "#fff",
                            fontFamily: "'Playfair Display', serif",
                        }}
                        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: isMobile ? 0.8 : 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    >
                        {name.first}
                    </motion.span>
                    <motion.span
                        style={{
                            display: "block",
                            fontSize: "clamp(2.6rem, 13vw, 9rem)",
                            fontWeight: 700, color: accent,
                            fontFamily: "'Playfair Display', serif",
                        }}
                        initial={{ opacity: 0, x: -60, filter: "blur(12px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: isMobile ? 0.9 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                    >
                        {name.second}
                    </motion.span>
                </h1>

                {/* tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    style={{
                        marginTop: "20px",
                        maxWidth: "640px",
                        fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "'Playfair Display', serif",
                        textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                        lineHeight: 1.5,
                    }}
                >
                    {tagline}
                </motion.p>

                {/* stats — grid responsiva */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="city-hero-stats"
                >
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: "rgba(0,0,0,0.4)",
                            backdropFilter: "blur(12px)",
                            padding: "14px 16px",
                            transition: "border-color 0.2s",
                        }}>
                            <div style={{
                                fontSize: "clamp(1.25rem, 5.4vw, 1.875rem)",
                                fontWeight: 700, color: "#fff",
                                fontFamily: "Inter, sans-serif",
                                fontVariantNumeric: "tabular-nums",
                                lineHeight: 1,
                            }}>
                                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                            </div>
                            <div style={{
                                marginTop: "6px",
                                fontSize: "clamp(9px, 2.4vw, 10px)",
                                textTransform: "uppercase", letterSpacing: "0.1em",
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "Inter, sans-serif", fontWeight: 600,
                            }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* scroll cue */}
            <motion.div
                style={{
                    position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)",
                    zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", fontWeight: 600,
                }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            >
                <span>role para descobrir</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
                </motion.div>
            </motion.div>

            <style>{`
                .city-hero-stats {
                    margin-top: 36px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    max-width: 680px;
                }
                @media (min-width: 481px) {
                    .city-hero-stats {
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 12px;
                        margin-top: 48px;
                    }
                }
            `}</style>
        </section>
    );
}
