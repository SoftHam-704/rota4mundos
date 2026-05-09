import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, TrendingUp, Globe, Users, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── dados ─────────────────────────────────────────────── */
const COUNTRIES = [
    {
        code: "BR", flag: "🇧🇷", name: "Brasil", theme: "Pantanal & Cerrado",
        num: "01", segment: "Segmento 1 · Atlântico",
        color: "#2A9D8F", colorRgb: "42,157,143",
        gradA: "#021f14", gradB: "#053d28",
        next: { code: "PY", flag: "🇵🇾", name: "Paraguai" },
    },
    {
        code: "PY", flag: "🇵🇾", name: "Paraguai", theme: "Chaco Profundo",
        num: "02", segment: "Segmento 2 · Chaco",
        color: "#818cf8", colorRgb: "129,140,248",
        gradA: "#0d0b2e", gradB: "#1a1760",
        next: { code: "AR", flag: "🇦🇷", name: "Argentina" },
    },
    {
        code: "AR", flag: "🇦🇷", name: "Argentina", theme: "Andes & NOA",
        num: "03", segment: "Segmento 3 · Andes",
        color: "#f43f5e", colorRgb: "244,63,94",
        gradA: "#1f020b", gradB: "#6b0f24",
        next: { code: "CL", flag: "🇨🇱", name: "Chile" },
    },
    {
        code: "CL", flag: "🇨🇱", name: "Chile", theme: "Atacama & Pacífico",
        num: "04", segment: "Segmento 4 · Pacífico",
        color: "#38bdf8", colorRgb: "56,189,248",
        gradA: "#021624", gradB: "#06304d",
        next: null,
    },
];

const ALL_CITIES = [
    { name: "Campo Grande",          country: "BR", state: "Mato Grosso do Sul", population: "906.092", tagline: "A Capital Morena do Cerrado",         desc: "Ponto de partida da rota. Hub logístico e cultural. BIOPARQUE Pantanal e gastronomia plural de capital em expansão.",               href: "/cidades/campo-grande",          accent: "#2A9D8F", accentRgb: "42,157,143",   image: "/cities/campo_grande.png",          routeOrder: 1  },
    { name: "Bonito",                 country: "BR", state: "Mato Grosso do Sul", population: "21.368",  tagline: "O Aquário Natural do Mundo",           desc: "Rios cristalinos de 40m de visibilidade, grutas e cachoeiras. Referência global em ecoturismo.",                                        href: "/cidades/bonito",                accent: "#22d3ee", accentRgb: "34,211,238",   image: "/cities/bonito.png",                routeOrder: 2  },
    { name: "Jardim",                 country: "BR", state: "Mato Grosso do Sul", population: "27.245",  tagline: "Portal da Serra da Bodoquena",         desc: "Sede da Serra da Bodoquena com cavernas, grutas e paisagens únicas do planalto calcário.",                                              href: "/cidades/jardim",                accent: "#86efac", accentRgb: "134,239,172",  image: "/cities/jardim.png",                routeOrder: 3  },
    { name: "Porto Murtinho",         country: "BR", state: "Mato Grosso do Sul", population: "12.859",  tagline: "A Guardiã do Rio Paraguai",            desc: "Última cidade brasileira antes da travessia. Pantanal, Toro Candil e a ponte binacional sobre o Rio Paraguai.",                         href: "/cidades/porto-murtinho",        accent: "#F4A261", accentRgb: "244,162,97",   image: "/cities/porto_murtinho.png",        routeOrder: 4  },
    { name: "Carmelo Peralta",        country: "PY", state: "Alto Paraguay",      population: "5.000",   tagline: "A Travessia Histórica",                desc: "Fronteira com Porto Murtinho — onde a ponte binacional sobre o Rio Paraguai conecta dois oceanos.",                                       href: "/cidades/carmelo-peralta",       accent: "#818cf8", accentRgb: "129,140,248",  image: "/cities/carmelo_peralta.png",       routeOrder: 5  },
    { name: "Mariscal Estigarribia",  country: "PY", state: "Boquerón",           population: "8.000",   tagline: "O Novo Polo Logístico do Chaco",       desc: "Cidade em ascensão no coração do Chaco paraguaio. 65% indígena, 270 km pavimentados.",                                                  href: "/cidades/mariscal-estigarribia", accent: "#a78bfa", accentRgb: "167,139,250",  image: "/cities/mariscal_estigarribia.png", routeOrder: 6  },
    { name: "Filadelfia",             country: "PY", state: "Boquerón",           population: "14.000",  tagline: "A Alma Europeia do Chaco",             desc: "Colônia mennonita que transformou o deserto em polo agroindustrial. Queijos, embutidos e cooperativismo.",                               href: "/cidades/filadelfia",            accent: "#84cc16", accentRgb: "132,204,22",   image: "/cities/filadelfia.png",            routeOrder: 7  },
    { name: "Salta",                  country: "AR", state: "Província de Salta", population: "620.000", tagline: "La Linda — Capital do Folclore Andino", desc: "Centro histórico colonial, Tren a las Nubes a 4.220m e peñas folclóricas com zamba ao vivo.",                                          href: "/cidades/salta",                 accent: "#f97316", accentRgb: "249,115,22",   image: "/cities/salta.png",                 routeOrder: 8  },
    { name: "Jujuy",                  country: "AR", state: "Província de Jujuy", population: "320.000", tagline: "A Alma Ancestral dos Andes",           desc: "Quebrada de Humahuaca (UNESCO), Cerro de los Siete Colores e Pachamama viva há 10.000 anos.",                                             href: "/cidades/jujuy",                 accent: "#f43f5e", accentRgb: "244,63,94",    image: "/cities/jujuy.png",                 routeOrder: 9  },
    { name: "Tartagal",               country: "AR", state: "Salta — NOA",        population: "70.000",  tagline: "Fronteira Cultural do Norte Argentino", desc: "Cinco povos originários ativos, floresta subtropical das Yungas e carnaval multicultural do NOA.",                                       href: "/cidades/tartagal",              accent: "#10b981", accentRgb: "16,185,129",   image: "/cities/tartagal.png",              routeOrder: 10 },
    { name: "Antofagasta",            country: "CL", state: "Região de Antofagasta", population: "500.000", tagline: "Onde o Atacama Beija o Pacífico",  desc: "La Portada, observatórios ESO, capital do cobre e o porto onde o continente encontra o oceano.",                                        href: "/cidades/antofagasta",           accent: "#38bdf8", accentRgb: "56,189,248",   image: "/cities/antofagasta.png",           routeOrder: 11 },
    { name: "Iquique",                country: "CL", state: "Região de Tarapacá",    population: "235.000", tagline: "Porto Histórico e Zona Franca",     desc: "Humberstone UNESCO, Cerro Dragón, memória salitreira e ZOFRI — a cidade que se reinventou sem perder a alma.",                          href: "/cidades/iquique",               accent: "#fb923c", accentRgb: "251,146,60",   image: "/cities/iquique.png",               routeOrder: 12 },
    { name: "Mejillones",             country: "CL", state: "Região de Antofagasta", population: "12.000",  tagline: "O Porto Autêntico do Pacífico",     desc: "Encerramento simbólico da rota. Porto artesanal centenário, pesca viva e o pôr do sol mais emocionante da travessia.",                  href: "/cidades/mejillones",            accent: "#0891b2", accentRgb: "8,145,178",    image: "/cities/mejillones.png",            routeOrder: 13 },
];

/* ── barra de rota animada ──────────────────────────────── */
function RouteBar() {
    const segs = [
        { code: "BR", flag: "🇧🇷", label: "Brasil",   color: "#2A9D8F", w: 4 },
        { code: "PY", flag: "🇵🇾", label: "Paraguai", color: "#818cf8", w: 3 },
        { code: "AR", flag: "🇦🇷", label: "Argentina",color: "#f43f5e", w: 3 },
        { code: "CL", flag: "🇨🇱", label: "Chile",    color: "#38bdf8", w: 3 },
    ];
    return (
        <div style={{ marginTop: "48px", maxWidth: "600px" }}>
            <div style={{ display: "flex", height: "6px", borderRadius: "6px", overflow: "hidden", gap: "2px" }}>
                {segs.map((s, i) => (
                    <motion.div key={s.code}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6 + i * 0.2, duration: 0.9, ease: "easeOut" }}
                        style={{ flex: s.w, background: s.color, borderRadius: "3px", position: "relative", overflow: "hidden" }}
                    >
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ delay: 1.5 + i * 0.15, duration: 1.2, ease: "easeInOut" }}
                            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", width: "60%" }}
                        />
                    </motion.div>
                ))}
            </div>
            <div style={{ display: "flex", marginTop: "10px", gap: "2px" }}>
                {segs.map((s) => (
                    <div key={s.code} style={{ flex: s.w, display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontSize: "11px" }}>{s.flag}</span>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── chapter divider ────────────────────────────────────── */
function ChapterDivider({ country, cityCount, segmentIndex }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            style={{
                position: "relative", overflow: "hidden",
                borderRadius: "20px", marginBottom: "28px",
                background: `linear-gradient(135deg, ${country.gradA} 0%, ${country.gradB} 100%)`,
                border: `1px solid rgba(${country.colorRgb},0.25)`,
                padding: "32px 36px",
            }}
        >
            {/* número watermark */}
            <div style={{
                position: "absolute", top: "-20px", left: "24px",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "10rem", color: `rgba(${country.colorRgb},0.06)`,
                lineHeight: 1, userSelect: "none", pointerEvents: "none",
                letterSpacing: "-0.02em",
            }}>
                {country.num}
            </div>

            {/* shimmer line top */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent 0%, ${country.color} 30%, ${country.color}cc 70%, transparent 100%)`, opacity: 0.7 }} />

            {/* conteúdo */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    style={{ fontSize: "3.5rem", lineHeight: 1 }}
                >
                    {country.flag}
                </motion.span>

                <div style={{ flex: 1 }}>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                            color: "#fff", letterSpacing: "0.06em",
                            lineHeight: 0.9, marginBottom: "6px",
                        }}
                    >
                        {country.name}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                        style={{ fontSize: "13px", color: `rgba(${country.colorRgb},0.8)`, fontFamily: "Inter, sans-serif", fontStyle: "italic", letterSpacing: "0.04em" }}
                    >
                        {country.theme}
                    </motion.p>
                </div>

                {/* badges */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}
                >
                    <span style={{ fontSize: "9px", fontWeight: 700, color: `rgba(${country.colorRgb},0.7)`, fontFamily: "Inter, sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                        {country.segment}
                    </span>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", borderRadius: "100px", background: `rgba(${country.colorRgb},0.12)`, border: `1px solid rgba(${country.colorRgb},0.3)` }}>
                        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1rem", color: country.color, letterSpacing: "0.06em" }}>
                            {cityCount} {cityCount === 1 ? "CIDADE" : "CIDADES"}
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ── conector de travessia ──────────────────────────────── */
function RouteConnector({ from, to }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", padding: "32px 0", justifyContent: "center" }}
        >
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08))` }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 20px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: "14px" }}>{from.flag}</span>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Seguindo para {to.name}
                </span>
                <span style={{ fontSize: "14px" }}>{to.flag}</span>
            </div>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, rgba(255,255,255,0.08), transparent)` }} />
        </motion.div>
    );
}

/* ── card ───────────────────────────────────────────────── */
function CityCard({ city, index }) {
    const cardRef = useRef(null);

    function handleMouse(e) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
        card.style.setProperty("--ax", `${city.accent}`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ height: "100%" }}
        >
            <Link
                to={city.href}
                ref={cardRef}
                onMouseMove={handleMouse}
                style={{
                    display: "flex", flexDirection: "column", height: "100%",
                    textDecoration: "none", position: "relative",
                    borderRadius: "18px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                    transition: "border-color 0.35s, transform 0.35s, box-shadow 0.35s",
                }}
                className="cp-card"
            >
                {/* flashlight hover */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "18px",
                    background: `radial-gradient(480px circle at var(--mx,50%) var(--my,50%), rgba(${city.accentRgb},0.1), transparent 55%)`,
                    pointerEvents: "none", zIndex: 3,
                }} />

                {/* route badge */}
                <div style={{
                    position: "absolute", top: "10px", right: "10px", zIndex: 4,
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
                    border: `1px solid rgba(${city.accentRgb},0.5)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: city.accent, fontFamily: "Inter, sans-serif" }}>{city.routeOrder}</span>
                </div>

                {/* image */}
                <div style={{ position: "relative", height: "165px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={city.image} alt={city.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", display: "block" }}
                        className="cp-img" loading="lazy"
                        onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = `linear-gradient(135deg,#0A1628 0%,${city.accent}22 100%)`; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,27,51,0.05) 0%, rgba(6,27,51,0.8) 100%)" }} />
                    {/* accent line top */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${city.accent}cc, transparent)`, zIndex: 2 }} />
                    {/* state label */}
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", display: "flex", alignItems: "center", gap: "4px", zIndex: 2 }}>
                        <MapPin size={9} style={{ color: city.accent }} />
                        <span style={{ fontSize: "8px", fontWeight: 600, color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif", letterSpacing: "0.07em", textTransform: "uppercase" }}>{city.state}</span>
                    </div>
                </div>

                {/* content */}
                <div style={{ padding: "16px 18px 18px", position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: city.accent, fontFamily: "Inter, sans-serif", fontStyle: "italic", marginBottom: "4px" }}>
                        {city.tagline}
                    </p>
                    <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.9rem", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "10px" }}>
                        {city.name}
                    </h3>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, fontFamily: "Inter, sans-serif", flex: 1, marginBottom: "14px" }}>
                        {city.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
                        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>{city.population} hab.</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 700, color: city.accent, fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            Explorar <ArrowRight size={10} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ── seção de país ──────────────────────────────────────── */
function CountrySection({ country, cities, segmentIndex }) {
    if (cities.length === 0) return null;
    return (
        <div>
            <ChapterDivider country={country} cityCount={cities.length} segmentIndex={segmentIndex} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", alignItems: "stretch" }}>
                {cities.map((city, i) => (
                    <CityCard key={city.name} city={city} index={i} />
                ))}
            </div>
            {country.next && (
                <RouteConnector from={{ flag: country.flag }} to={country.next} />
            )}
        </div>
    );
}

/* ── página ─────────────────────────────────────────────── */
export default function CitiesPage() {
    const [activeCountry, setActiveCountry] = useState("ALL");
    const filtered = activeCountry === "ALL" ? ALL_CITIES : ALL_CITIES.filter(c => c.country === activeCountry);

    return (
        <div style={{ minHeight: "100vh", background: "#061B33" }}>

            {/* ── HERO ──────────────────────────────────── */}
            <section style={{ position: "relative", paddingTop: "112px", paddingBottom: "72px", overflow: "hidden", background: "linear-gradient(180deg, #08111f 0%, #061B33 100%)" }}>
                {/* dot grid */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
                {/* glow */}
                <div style={{ position: "absolute", top: "-10%", left: "60%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,157,143,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "30%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(244,162,97,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="container-rota" style={{ position: "relative" }}>
                    <motion.div initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9 }}>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "18px", background: "rgba(244,162,97,0.08)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(244,162,97,0.18)" }}
                        >
                            Rota Bioceânica · 4 Países · 3.500km
                        </motion.span>

                        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#fff", lineHeight: 0.92, letterSpacing: "0.03em", marginBottom: "22px" }}>
                            Cidades que<br />
                            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>Contam</span>{" "}
                            <span style={{ color: "#2A9D8F" }}>Histórias</span>
                        </h1>

                        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontFamily: "Inter, sans-serif", maxWidth: "520px" }}>
                            De Campo Grande a Mejillones — 13 cidades, 4 países, 3.500 km. O maior corredor bioceânico da América do Sul, contado pelos seus povos, sabores e paisagens.
                        </p>

                        <RouteBar />
                    </motion.div>
                </div>
            </section>

            {/* ── FILTER ────────────────────────────────── */}
            <div style={{ position: "sticky", top: "72px", zIndex: 40, background: "rgba(6,21,41,0.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="container-rota">
                    <div style={{ display: "flex", gap: "6px", padding: "12px 0", flexWrap: "wrap" }}>
                        <button onClick={() => setActiveCountry("ALL")}
                            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif", padding: "7px 16px", borderRadius: "100px", cursor: "pointer", transition: "all 0.25s", border: "1px solid", ...(activeCountry === "ALL" ? { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.18)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }) }}>
                            Toda a rota <span style={{ fontWeight: 800, fontSize: "10px" }}>13</span>
                        </button>
                        {COUNTRIES.map(c => {
                            const count = ALL_CITIES.filter(x => x.country === c.code).length;
                            const active = activeCountry === c.code;
                            return (
                                <button key={c.code} onClick={() => setActiveCountry(c.code)}
                                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif", padding: "7px 16px", borderRadius: "100px", cursor: "pointer", transition: "all 0.25s", border: "1px solid", ...(active ? { background: `rgba(${c.colorRgb},0.14)`, borderColor: `rgba(${c.colorRgb},0.45)`, color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }) }}>
                                    {c.flag} {c.name}
                                    <span style={{ fontWeight: 800, fontSize: "10px", color: active ? c.color : "rgba(255,255,255,0.22)" }}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── GRID ──────────────────────────────────── */}
            <section style={{ padding: "52px 0 72px" }}>
                <div className="container-rota">
                    <AnimatePresence mode="wait">
                        {activeCountry === "ALL" ? (
                            <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                                style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                                {COUNTRIES.map((country, i) => (
                                    <CountrySection key={country.code} country={country} cities={ALL_CITIES.filter(c => c.country === country.code)} segmentIndex={i} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key={activeCountry} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", alignItems: "stretch" }}>
                                {filtered.map((city, i) => <CityCard key={city.name} city={city} index={i} />)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ── CTA PREFEITOS ─────────────────────────── */}
            <section style={{ padding: "80px 0 100px", background: "linear-gradient(180deg, #061B33 0%, #071f3a 50%, #061B33 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,157,143,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="container-rota" style={{ position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "16px", background: "rgba(244,162,97,0.08)", padding: "4px 12px", borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)" }}>
                                Para gestores municipais
                            </span>
                            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1, letterSpacing: "0.04em", marginBottom: "20px" }}>
                                Sua cidade ainda<br /><span style={{ color: "#2A9D8F" }}>não está na rota?</span>
                            </h2>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.52)", lineHeight: 1.8, marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>
                                A Rota Bioceânica já movimenta governos, investidores e turistas de quatro países. Cada cidade incluída no corredor passa a fazer parte do maior projeto de integração continental da América do Sul.
                            </p>
                            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.52)", lineHeight: 1.8, marginBottom: "32px", fontFamily: "Inter, sans-serif" }}>
                                Se você é prefeito ou gestor municipal de uma cidade que integra ou conecta ao corredor bioceânico, este é o momento de colocar seu município no mapa continental.
                            </p>
                            <Link to="/apoie" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0.9rem 2rem", background: "#2A9D8F", color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "0.75rem", textDecoration: "none" }}>
                                <Mail size={14} /> Quero incluir minha cidade
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            {[
                                { icon: Globe,      color: "#38bdf8", colorRgb: "56,189,248",  title: "Visibilidade Internacional",    desc: "Sua cidade passa a ser apresentada a turistas, investidores e governos do Brasil, Paraguai, Argentina e Chile — um portal assistido por quem já está no corredor." },
                                { icon: TrendingUp, color: "#F4A261", colorRgb: "244,162,97",  title: "Posicionamento Econômico",       desc: "O corredor movimenta bilhões em comércio internacional anualmente. Cidades no percurso tornam-se pontos estratégicos de parada, serviço e investimento." },
                                { icon: Users,      color: "#a78bfa", colorRgb: "167,139,250", title: "Integração e Desenvolvimento",   desc: "Fazer parte da rota significa articulação com prefeituras de quatro países e acesso a programas de fomento ao turismo e à logística regional." },
                            ].map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.12 }}
                                    style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: `1px solid rgba(${item.colorRgb},0.14)` }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `rgba(${item.colorRgb},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <item.icon size={18} style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.1rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "5px" }}>{item.title}</h4>
                                        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", lineHeight: 1.65, fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div style={{ padding: "16px 20px", borderRadius: "12px", background: "rgba(42,157,143,0.05)", border: "1px solid rgba(42,157,143,0.14)" }}>
                                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, fontFamily: "Inter, sans-serif", fontStyle: "italic" }}>
                                    "A história da integração sul-americana está sendo escrita agora. As cidades que entrarem primeiro serão lembradas como pioneiras de um novo capítulo continental."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style>{`
                .cp-card:hover {
                    border-color: rgba(255,255,255,0.13) !important;
                    transform: translateY(-6px);
                    box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06);
                }
                .cp-card:hover .cp-img { transform: scale(1.07); }
                @media (max-width: 768px) {
                    .container-rota > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
