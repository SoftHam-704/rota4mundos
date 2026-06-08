import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight, MousePointer2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const CARD_BASE = {
    brasil:    "cards/card_brasil",
    paraguai:  "cards/card_paraguay",
    argentina: "cards/card_argentina",
    chile:     "cards/card_chile",
};

function CardImage({ id, style, loading = "lazy" }) {
    const base = CARD_BASE[id];
    return (
        <img
            src={`/${base}.webp`}
            alt=""
            style={style}
            draggable={false}
            loading={loading}
            decoding="async"
        />
    );
}

const COUNTRIES = [
    {
        id: "brasil", flag: "🇧🇷", name: "Brasil",
        accent: "#2A9D8F", accentRgb: "42,157,143",
        zone: { top: "19%", left: "13%", width: "36%", height: "36%" },
        thumb: "/cities/campo_grande.jpg",
        cities: [
            { n: "01", name: "Campo Grande",   tagline: "A Capital Morena do Cerrado",       href: "/cidades/campo-grande",   image: "/cities/campo_grande.jpg" },
            { n: "02", name: "Sidrolândia",    tagline: "O Coração Produtivo do MS",         href: "/cidades/sidrolandia",    image: "/cities/sidrolandia.jpg" },
            { n: "03", name: "Jardim",         tagline: "Portal da Serra da Bodoquena",      href: "/cidades/jardim",         image: "/cities/jardim.jpg" },
            { n: "04", name: "Bonito",         tagline: "O Aquário Natural do Mundo",        href: "/cidades/bonito",         image: "/cities/bonito.jpg" },
            { n: "05", name: "Porto Murtinho", tagline: "A Guardiã do Rio Paraguai",         href: "/cidades/porto-murtinho", image: "/cities/porto_murtinho.jpg" },
        ],
    },
    {
        id: "paraguai", flag: "🇵🇾", name: "Paraguai",
        accent: "#a78bfa", accentRgb: "167,139,250",
        zone: { top: "19%", left: "51%", width: "36%", height: "36%" },
        thumb: "/cities/carmelo_peralta.jpg",
        cities: [
            { n: "06", name: "Carmelo Peralta",       tagline: "A Travessia Histórica",     href: "/cidades/carmelo-peralta",       image: "/cities/carmelo_peralta.jpg" },
            { n: "07", name: "Mariscal Estigarribia", tagline: "O Polo Logístico do Chaco", href: "/cidades/mariscal-estigarribia", image: "/cities/mariscal_estigarribia.jpg" },
            { n: "08", name: "Filadelfia",            tagline: "A Alma Europeia do Chaco",  href: "/cidades/filadelfia",            image: "/cities/filadelfia.jpg" },
        ],
    },
    {
        id: "argentina", flag: "🇦🇷", name: "Argentina",
        accent: "#fb923c", accentRgb: "251,146,60",
        zone: { top: "55%", left: "13%", width: "36%", height: "28%" },
        thumb: "/cities/salta.jpg",
        cities: [
            { n: "09", name: "Tartagal", tagline: "Fronteira Cultural do Norte",         href: "/cidades/tartagal", image: "/cities/tartagal.jpg" },
            { n: "10", name: "Jujuy",    tagline: "A Alma Ancestral dos Andes",          href: "/cidades/jujuy",    image: "/cities/jujuy.jpg" },
            { n: "11", name: "Salta",    tagline: "La Linda — Capital do Folclore",      href: "/cidades/salta",    image: "/cities/salta.jpg" },
        ],
    },
    {
        id: "chile", flag: "🇨🇱", name: "Chile",
        accent: "#38bdf8", accentRgb: "56,189,248",
        zone: { top: "55%", left: "51%", width: "36%", height: "28%" },
        thumb: "/cities/antofagasta.jpg",
        cities: [
            { n: "12", name: "Antofagasta", tagline: "Onde o Atacama Beija o Pacífico", href: "/cidades/antofagasta", image: "/cities/antofagasta.jpg" },
            { n: "13", name: "Iquique",     tagline: "Porto Histórico e Zona Franca",   href: "/cidades/iquique",     image: "/cities/iquique.jpg" },
            { n: "14", name: "Mejillones",  tagline: "O Porto Autêntico do Pacífico",   href: "/cidades/mejillones",  image: "/cities/mejillones.jpg" },
        ],
    },
];

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

/* ── desktop: sticky image map (original) ───────────────────── */
function DesktopMap({ onPick, lang }) {
    const { t } = useLanguage();
    const [hoveredId, setHoveredId] = useState(null);
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });
    const imageY      = useTransform(scrollYProgress, [0, 0.75, 1], ["0%", "-14%", "-14%"]);
    const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <div ref={scrollRef} style={{ height: "220vh" }}>
            <div style={{
                position: "sticky", top: 0,
                height: "100vh", overflow: "hidden",
                display: "flex", alignItems: "flex-start",
            }}>
                <motion.div style={{ position: "relative", width: "100%", userSelect: "none", lineHeight: 0, y: imageY }}>
                    <img src={lang === "es" ? "/quatro_paises_es.webp" : lang === "en" ? "/quatro_paises_en.webp" : "/Quarto_paises.webp"} alt="Um Corredor, Quatro Mundos"
                        style={{ width: "100%", height: "auto", display: "block" }}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                    />

                    {COUNTRIES.map((c) => {
                        const isHovered = hoveredId === c.id;
                        return (
                            <div key={c.id}
                                onClick={() => onPick(c.id)}
                                onMouseEnter={() => setHoveredId(c.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    position: "absolute",
                                    top: c.zone.top, left: c.zone.left,
                                    width: c.zone.width, height: c.zone.height,
                                    cursor: "pointer", borderRadius: "4px",
                                    background: isHovered ? `rgba(${c.accentRgb},0.1)` : "transparent",
                                    border: isHovered ? `1px solid rgba(${c.accentRgb},0.35)` : "1px solid transparent",
                                    transition: "background 0.3s, border-color 0.3s",
                                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                                    paddingBottom: "10px",
                                }}
                            >
                                {/* Tooltip no hover */}
                                {isHovered && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            position: "absolute", bottom: "10px",
                                            fontFamily: '"Playfair Display", serif',
                                            fontSize: "11px", fontStyle: "italic",
                                            color: "#e8c97a",
                                            background: "rgba(0,0,0,0.72)",
                                            padding: "3px 12px", borderRadius: "100px",
                                            backdropFilter: "blur(8px)",
                                            border: "1px solid rgba(200,146,42,0.25)",
                                            pointerEvents: "none", whiteSpace: "nowrap",
                                        }}
                                    >
                                        {c.flag} {t("cities.viewCities")} →
                                    </motion.span>
                                )}
                            </div>
                        );
                    })}

                    <motion.div style={{
                        position: "absolute", bottom: "20px", left: "50%", x: "-50%",
                        opacity: hintOpacity, pointerEvents: "none",
                    }}>
                        <motion.div
                            animate={{ y: [0, 7, 0] }}
                            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
                            style={{
                                fontFamily: '"Playfair Display", serif',
                                fontSize: "10px", fontStyle: "italic",
                                color: "rgba(200,146,42,0.55)",
                                letterSpacing: "0.15em", textAlign: "center", whiteSpace: "nowrap",
                            }}
                        >
                            {t("cities.scrollHint")}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

/* ── mobile: grid de cards de país ──────────────────────────── */
function MobileGrid({ onPick, lang }) {
    const { t } = useLanguage();
    return (
        <div className="container-rota" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <div className="cities-mobile-grid">
                {COUNTRIES.map((c, i) => (
                    <motion.button
                        key={c.id}
                        type="button"
                        onClick={() => onPick(c.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        style={{
                            position: "relative",
                            border: "none", background: "none", padding: 0,
                            cursor: "pointer", textAlign: "left",
                            overflow: "hidden",
                            borderRadius: "18px",
                            aspectRatio: "4 / 5",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        <CardImage id={c.id} loading={i === 0 ? "eager" : "lazy"} style={{
                            position: "absolute", inset: 0,
                            width: "100%", height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.55) saturate(1.1)",
                        }} />
                        <div style={{
                            position: "absolute", inset: 0,
                            background: `linear-gradient(180deg, rgba(8,7,4,0.2) 0%, rgba(8,7,4,0.65) 60%, rgba(${c.accentRgb},0.3) 100%)`,
                        }} />
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "16px",
                        }}>
                            <span style={{
                                fontSize: "26px", lineHeight: 1,
                                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                            }}>
                                {c.flag}
                            </span>

                            <div>
                                <p style={{
                                    margin: 0,
                                    fontSize: "9px", fontWeight: 700,
                                    color: `rgba(${c.accentRgb},1)`,
                                    letterSpacing: "0.2em", textTransform: "uppercase",
                                    fontFamily: "Inter, sans-serif",
                                    marginBottom: "4px",
                                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                                }}>
                                    {c.cities.length} {t("cities.citiesLabel")}
                                </p>
                                <h3 style={{
                                    margin: 0,
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                                    color: "#fff",
                                    letterSpacing: "0.04em",
                                    lineHeight: 0.95,
                                    textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                                }}>
                                    {c.name}
                                </h3>
                                <span style={{
                                    display: "inline-flex", alignItems: "center", gap: "4px",
                                    marginTop: "10px",
                                    fontSize: "10px", fontWeight: 700,
                                    color: "rgba(255,255,255,0.85)",
                                    fontFamily: "Inter, sans-serif",
                                    letterSpacing: "0.1em", textTransform: "uppercase",
                                }}>
                                    {t("cities.viewCities")} <ArrowRight size={11} />
                                </span>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

/* ── modal pergaminho — UI mobile-friendly ──────────────────── */
function CountryModal({ country, isMobile, lang, onClose }) {
    const { language: _language } = useLanguage(); // garante re-render ao trocar idioma
    const langPrefix = lang === "pt" ? "" : `/${lang}`;
    return (
        <>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 50,
                    background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.94) 100%)",
                    backdropFilter: "blur(9px)",
                }}
            />

            <motion.div
                key="modal"
                initial={{ opacity: 0, scaleY: 0.03, y: -60 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.05, y: -40, transition: { duration: 0.22, ease: "easeIn" } }}
                transition={{
                    opacity: { duration: 0.18 },
                    scaleY:  { type: "spring", stiffness: 160, damping: 18 },
                    y:       { type: "spring", stiffness: 180, damping: 20 },
                }}
                style={{
                    position: "fixed",
                    top: "50%", left: "50%",
                    x: "-50%", y: "-50%",
                    zIndex: 51,
                    width: isMobile ? "min(420px, 92vw)" : "min(580px, 90vw)",
                    aspectRatio: "4/3",
                    borderRadius: "3px",
                    overflow: "hidden",
                    transformOrigin: "top center",
                    boxShadow: "0 50px 150px rgba(0,0,0,0.95), 0 0 80px rgba(200,146,42,0.08)",
                    userSelect: "none",
                }}
            >
                <CardImage id={country.id} loading="eager" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                }} />

                <button
                    onClick={onClose}
                    aria-label="Fechar"
                    style={{
                        position: "absolute", top: "9%", right: "12%",
                        zIndex: 3,
                        width: "30px", height: "30px",
                        borderRadius: "50%",
                        border: "1px solid rgba(60,30,5,0.35)",
                        background: "rgba(60,30,5,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "rgba(60,30,5,0.6)",
                    }}
                >
                    <X size={13} />
                </button>

                <div style={{
                    position: "absolute",
                    top: "23%", bottom: "13%",
                    left: "12%", right: "6%",
                    zIndex: 2,
                    display: "flex", flexDirection: "column",
                }}>
                    {country.cities.map((city, i) => (
                        <motion.div
                            key={city.name}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 0.28 + i * 0.07 }}
                            style={{ flex: 1 }}
                        >
                            <Link
                                to={`${langPrefix}${city.href}`}
                                onClick={onClose}
                                style={{ display: "block", width: "100%", height: "100%", borderRadius: "6px", transition: "background 0.2s" }}
                                className="scroll-row"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

/* ── componente principal ───────────────────────────────────── */
export default function CitiesSection() {
    const [activeId, setActiveId] = useState(null);
    const isMobile  = useMediaQuery("(max-width: 767px)");
    const { t, language } = useLanguage();
    const { pathname } = useLocation();
    const lang      = language.startsWith("es") ? "es" : language.startsWith("en") ? "en" : "pt";
    const langPrefix = lang === "pt" ? "" : `/${lang}`;
    const country   = COUNTRIES.find(c => c.id === activeId);

    return (
        <section id="cidades" style={{ background: "#080704" }}>

            {/* cabeçalho da seção */}
            <div className="container-rota" style={{
                paddingTop: isMobile ? "44px" : "64px",
                paddingBottom: isMobile ? "24px" : "32px",
                textAlign: "center",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "10px" : "11px",
                        fontWeight: 700, letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#C8922A", marginBottom: "16px",
                    }}>
                        {t("cities.explore")}
                    </p>
                    <motion.div
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "8px 20px", borderRadius: "50px",
                            border: "1px solid rgba(200,146,42,0.35)",
                            background: "rgba(200,146,42,0.08)",
                        }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <MousePointer2 size={14} style={{ color: "#C8922A" }} />
                        <span style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: isMobile ? "12px" : "13px",
                            fontStyle: "italic",
                            color: "rgba(200,146,42,0.9)",
                            letterSpacing: "0.05em",
                        }}>
                            {isMobile ? t("cities.exploreHintMobile") : t("cities.exploreHint")}
                        </span>
                    </motion.div>
                </motion.div>
            </div>

            {/* desktop: sticky map | mobile: grid */}
            {isMobile
                ? <MobileGrid onPick={setActiveId} lang={lang} />
                : <DesktopMap onPick={setActiveId} lang={lang} />
            }

            {/* atalhos de bandeira — só desktop, no mobile o grid já cumpre */}
            {!isMobile && (
                <div className="container-rota" style={{ paddingBottom: "56px" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
                        {COUNTRIES.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setActiveId(c.id)}
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontFamily: '"Playfair Display", serif',
                                    fontSize: "12px", fontStyle: "italic",
                                    color: "rgba(200,146,42,0.4)",
                                    transition: "color 0.2s", padding: "4px 10px",
                                }}
                                className="flag-btn"
                            >
                                {c.flag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {isMobile && <div style={{ height: "40px" }} />}

            <AnimatePresence>
                {activeId && country && (
                    <CountryModal country={country} isMobile={isMobile} lang={lang} onClose={() => setActiveId(null)} />
                )}
            </AnimatePresence>

            <style>{`
                .flag-btn:hover { color: rgba(200,146,42,0.75) !important; }
                .scroll-row:hover { background: rgba(200,146,42,0.14) !important; cursor: pointer; }

                .cities-mobile-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                    padding: 12px 0 8px;
                }
                @media (min-width: 481px) and (max-width: 767px) {
                    .cities-mobile-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 16px;
                    }
                }
            `}</style>
        </section>
    );
}
