import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── dados das cidades ──────────────────────────────────── */
const COUNTRIES = [
    {
        code: "BR", flag: "🇧🇷", name: "Brasil", theme: "Pantanal & Cerrado",
        color: "#2A9D8F", colorRgb: "42,157,143",
        headerBg: "linear-gradient(135deg, #052e1c 0%, #064e3b 100%)",
        borderColor: "rgba(42,157,143,0.35)",
    },
    {
        code: "PY", flag: "🇵🇾", name: "Paraguai", theme: "Chaco Profundo",
        color: "#818cf8", colorRgb: "129,140,248",
        headerBg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        borderColor: "rgba(129,140,248,0.35)",
    },
    {
        code: "AR", flag: "🇦🇷", name: "Argentina", theme: "Andes & NOA",
        color: "#f43f5e", colorRgb: "244,63,94",
        headerBg: "linear-gradient(135deg, #4c0519 0%, #881337 100%)",
        borderColor: "rgba(244,63,94,0.35)",
    },
    {
        code: "CL", flag: "🇨🇱", name: "Chile", theme: "Atacama & Pacífico",
        color: "#38bdf8", colorRgb: "56,189,248",
        headerBg: "linear-gradient(135deg, #082f49 0%, #0c4a6e 100%)",
        borderColor: "rgba(56,189,248,0.35)",
    },
];

const ALL_CITIES = [
    /* Brasil */
    { name: "Porto Murtinho", country: "BR", state: "Mato Grosso do Sul", population: "12.859", tagline: "A Guardiã do Rio Paraguai", desc: "Fronteira histórica com o Paraguai. Pantanal, Toro Candil e a travessia do Rio Paraguai.", href: "/cidades/porto-murtinho", accent: "#F4A261", accentRgb: "244,162,97", image: "/cities/porto_murtinho.png", routeOrder: 1 },
    { name: "Campo Grande", country: "BR", state: "Mato Grosso do Sul", population: "906.092", tagline: "A Capital Morena do Cerrado", desc: "Hub logístico e cultural. BIOPARQUE Pantanal e gastronomia plural de capital em expansão.", href: "/cidades/campo-grande", accent: "#2A9D8F", accentRgb: "42,157,143", image: "/cities/campo_grande.png", routeOrder: 2 },
    { name: "Bonito", country: "BR", state: "Mato Grosso do Sul", population: "21.368", tagline: "O Aquário Natural do Mundo", desc: "Rios cristalinos de 40m de visibilidade, grutas e cachoeiras. Referência global em ecoturismo.", href: "/cidades/bonito", accent: "#22d3ee", accentRgb: "34,211,238", image: "/cities/bonito.png", routeOrder: 3 },
    { name: "Jardim", country: "BR", state: "Mato Grosso do Sul", population: "27.245", tagline: "Portal da Serra da Bodoquena", desc: "Sede da Serra da Bodoquena com cavernas, grutas e paisagens únicas do planalto calcário.", href: "/cidades/jardim", accent: "#86efac", accentRgb: "134,239,172", image: "/cities/jardim.png", routeOrder: 4 },
    /* Paraguai */
    { name: "Carmelo Peralta", country: "PY", state: "Alto Paraguay", population: "5.000", tagline: "A Travessia Histórica", desc: "Fronteira com Porto Murtinho — onde a ponte binacional sobre o Rio Paraguai conecta dois oceanos.", href: "/cidades/carmelo-peralta", accent: "#818cf8", accentRgb: "129,140,248", image: "/cities/carmelo_peralta.png", routeOrder: 5 },
    { name: "Mariscal Estigarribia", country: "PY", state: "Boquerón", population: "8.000", tagline: "O Novo Polo Logístico do Chaco", desc: "Cidade em ascensão no coração do Chaco paraguaio. 65% indígena, 270 km pavimentados.", href: "/cidades/mariscal-estigarribia", accent: "#a78bfa", accentRgb: "167,139,250", image: "/cities/mariscal_estigarribia.png", routeOrder: 6 },
    { name: "Filadelfia", country: "PY", state: "Boquerón", population: "14.000", tagline: "A Alma Europeia do Chaco", desc: "Colônia mennonita que transformou o deserto em polo agroindustrial. Queijos, embutidos e cooperativismo.", href: "/cidades/filadelfia", accent: "#84cc16", accentRgb: "132,204,22", image: "/cities/filadelfia.png", routeOrder: 7 },
    /* Argentina */
    { name: "Salta", country: "AR", state: "Província de Salta", population: "620.000", tagline: "La Linda — Capital do Folclore Andino", desc: "Centro histórico colonial, Tren a las Nubes a 4.220m e peñas folclóricas com zamba ao vivo.", href: "/cidades/salta", accent: "#f97316", accentRgb: "249,115,22", image: "/cities/salta.png", routeOrder: 8 },
    { name: "Jujuy", country: "AR", state: "Província de Jujuy", population: "320.000", tagline: "A Alma Ancestral dos Andes", desc: "Quebrada de Humahuaca (UNESCO), Cerro de los Siete Colores e Pachamama viva há 10.000 anos.", href: "/cidades/jujuy", accent: "#f43f5e", accentRgb: "244,63,94", image: "/cities/jujuy.png", routeOrder: 9 },
    { name: "Tartagal", country: "AR", state: "Salta — NOA Profundo", population: "70.000", tagline: "Fronteira Cultural do Norte Argentino", desc: "Cinco povos originários ativos, floresta subtropical das Yungas e carnaval multicultural do NOA.", href: "/cidades/tartagal", accent: "#10b981", accentRgb: "16,185,129", image: "/cities/tartagal.png", routeOrder: 10 },
    /* Chile */
    { name: "Antofagasta", country: "CL", state: "Região de Antofagasta", population: "500.000", tagline: "Onde o Atacama Beija o Pacífico", desc: "La Portada, observatórios ESO, capital do cobre e o porto onde o continente encontra o oceano.", href: "/cidades/antofagasta", accent: "#38bdf8", accentRgb: "56,189,248", image: "/cities/antofagasta.png", routeOrder: 11 },
    { name: "Iquique", country: "CL", state: "Região de Tarapacá", population: "235.000", tagline: "Porto Histórico e Zona Franca", desc: "Humberstone UNESCO, Cerro Dragón, memória salitreira e ZOFRI — a cidade que se reinventou sem perder a alma.", href: "/cidades/iquique", accent: "#fb923c", accentRgb: "251,146,60", image: "/cities/iquique.png", routeOrder: 12 },
    { name: "Mejillones", country: "CL", state: "Região de Antofagasta", population: "12.000", tagline: "O Porto Autêntico do Pacífico", desc: "Encerramento simbólico da rota. Porto artesanal centenário, pesca viva e o pôr do sol mais emocionante da travessia.", href: "/cidades/mejillones", accent: "#0891b2", accentRgb: "8,145,178", image: "/cities/mejillones.png", routeOrder: 13 },
];

/* ── card da cidade ─────────────────────────────────────── */
function CityCard({ city, index, countryColor }) {
    const cardRef = useRef(null);

    function handleMouse(e) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                to={city.href}
                ref={cardRef}
                onMouseMove={handleMouse}
                style={{
                    display: "block", textDecoration: "none",
                    position: "relative", borderRadius: "18px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="cities-page-card"
            >
                {/* flashlight */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "18px",
                    background: `radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(${city.accentRgb},0.09), transparent 60%)`,
                    pointerEvents: "none", zIndex: 3,
                }} />

                {/* route order badge */}
                <div style={{
                    position: "absolute", top: "10px", right: "10px", zIndex: 4,
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                    border: `1px solid rgba(${city.accentRgb},0.45)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <span style={{ fontSize: "8px", fontWeight: 800, color: city.accent, fontFamily: "Inter, sans-serif" }}>{city.routeOrder}</span>
                </div>

                {/* image */}
                <div style={{ position: "relative", height: "150px", overflow: "hidden" }}>
                    <img
                        src={city.image} alt={city.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                        className="cities-page-img"
                        loading="lazy"
                        onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = `linear-gradient(135deg,#0A1628,${city.accent}18)`; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,27,51,0.1) 0%, rgba(6,27,51,0.75) 100%)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${city.accent}bb, transparent)`, zIndex: 2 }} />
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", display: "flex", alignItems: "center", gap: "4px", zIndex: 2 }}>
                        <MapPin size={9} style={{ color: city.accent }} />
                        <span style={{ fontSize: "8px", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>{city.state}</span>
                    </div>
                </div>

                {/* content */}
                <div style={{ padding: "16px 18px 18px", position: "relative", zIndex: 2 }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: city.accent, fontFamily: "Inter, sans-serif", fontStyle: "italic", marginBottom: "4px" }}>
                        {city.tagline}
                    </p>
                    <h3 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "1.85rem",
                        color: "#fff", letterSpacing: "0.04em",
                        lineHeight: 1, marginBottom: "8px",
                    }}>
                        {city.name}
                    </h3>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, fontFamily: "Inter, sans-serif", marginBottom: "14px" }}>
                        {city.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

/* ── header de seção de país ────────────────────────────── */
function CountrySection({ country, cities, index }) {
    if (cities.length === 0) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* country header */}
            <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "20px 24px", borderRadius: "16px", marginBottom: "20px",
                background: country.headerBg,
                border: `1px solid ${country.borderColor}`,
            }}>
                <span style={{ fontSize: "2rem", lineHeight: 1 }}>{country.flag}</span>
                <div>
                    <h2 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "1.8rem", color: "#fff",
                        letterSpacing: "0.06em", lineHeight: 1,
                    }}>
                        {country.name}
                    </h2>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", fontStyle: "italic", marginTop: "2px" }}>
                        {country.theme}
                    </p>
                </div>
                <div style={{
                    marginLeft: "auto",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: `rgba(${country.colorRgb},0.15)`,
                    border: `1px solid rgba(${country.colorRgb},0.3)`,
                }}>
                    <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.1rem", color: country.color }}>{cities.length}</span>
                </div>
            </div>

            {/* grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                {cities.map((city, i) => (
                    <CityCard key={city.name} city={city} index={i} countryColor={country.color} />
                ))}
            </div>
        </motion.div>
    );
}

/* ── página principal ───────────────────────────────────── */
export default function CitiesPage() {
    const [activeCountry, setActiveCountry] = useState("ALL");

    const filtered = activeCountry === "ALL"
        ? ALL_CITIES
        : ALL_CITIES.filter(c => c.country === activeCountry);

    return (
        <div style={{ minHeight: "100vh", background: "#061B33" }}>

            {/* ── HERO ──────────────────────────────────── */}
            <section style={{ position: "relative", paddingTop: "112px", paddingBottom: "64px", overflow: "hidden", background: "linear-gradient(180deg, #0A1628 0%, #061B33 100%)" }}>
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,157,143,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="container-rota" style={{ position: "relative" }}>
                    <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }}>
                        <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "16px", background: "rgba(244,162,97,0.1)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)" }}>
                            Rota Bioceânica · 4 Países · 3.500km
                        </span>
                        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3rem, 8vw, 6rem)", color: "#fff", lineHeight: 1, letterSpacing: "0.04em", marginBottom: "20px" }}>
                            Cidades que Contam<br /><span style={{ color: "#2A9D8F" }}>Histórias</span>
                        </h1>
                        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontFamily: "Inter, sans-serif", maxWidth: "540px" }}>
                            De Porto Murtinho a Mejillones, 13 cidades e 4 países formam o maior corredor bioceânico da América do Sul. Uma travessia de 3.500 km entre dois oceanos.
                        </p>
                    </motion.div>

                    {/* country pills summary */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
                        style={{ display: "flex", gap: "10px", marginTop: "36px", flexWrap: "wrap" }}>
                        {COUNTRIES.map(c => (
                            <div key={c.code} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "100px", background: `rgba(${c.colorRgb},0.1)`, border: `1px solid rgba(${c.colorRgb},0.25)` }}>
                                <span style={{ fontSize: "14px" }}>{c.flag}</span>
                                <span style={{ fontSize: "11px", fontWeight: 600, color: c.color, fontFamily: "Inter, sans-serif" }}>{c.name}</span>
                                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                                    {ALL_CITIES.filter(city => city.country === c.code).length}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── FILTER TABS ────────────────────────────── */}
            <div style={{ position: "sticky", top: "72px", zIndex: 40, background: "rgba(6,27,51,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="container-rota">
                    <div style={{ display: "flex", gap: "8px", padding: "14px 0", flexWrap: "wrap" }}>
                        <button
                            onClick={() => setActiveCountry("ALL")}
                            style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif", padding: "7px 16px", borderRadius: "100px", cursor: "pointer", transition: "all 0.25s", border: "1px solid", ...(activeCountry === "ALL" ? { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }) }}
                        >
                            Todas as cidades
                            <span style={{ fontWeight: 800, fontSize: "10px" }}>13</span>
                        </button>
                        {COUNTRIES.map(c => {
                            const count = ALL_CITIES.filter(city => city.country === c.code).length;
                            const active = activeCountry === c.code;
                            return (
                                <button key={c.code} onClick={() => setActiveCountry(c.code)}
                                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif", padding: "7px 16px", borderRadius: "100px", cursor: "pointer", transition: "all 0.25s", border: "1px solid", ...(active ? { background: `rgba(${c.colorRgb},0.15)`, borderColor: `rgba(${c.colorRgb},0.45)`, color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }) }}>
                                    {c.flag} {c.name}
                                    <span style={{ fontWeight: 800, fontSize: "10px", color: active ? c.color : "rgba(255,255,255,0.25)" }}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── CITY GRID ──────────────────────────────── */}
            <section style={{ padding: "56px 0 80px" }}>
                <div className="container-rota">
                    <AnimatePresence mode="wait">
                        {activeCountry === "ALL" ? (
                            /* vista por país */
                            <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
                                {COUNTRIES.map((country, i) => (
                                    <CountrySection
                                        key={country.code}
                                        country={country}
                                        cities={ALL_CITIES.filter(c => c.country === country.code)}
                                        index={i}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            /* vista filtrada por país */
                            <motion.div key={activeCountry} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                                {filtered.map((city, i) => (
                                    <CityCard key={city.name} city={city} index={i} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <style>{`
                .cities-page-card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
                .cities-page-card:hover .cities-page-img { transform: scale(1.06); }
            `}</style>
        </div>
    );
}
