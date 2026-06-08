import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Anchor, Gem, Eye,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "19th Century",
        icon: Gem,
        title: "The White Gold of the Desert",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Antofagasta was born from saltpeter — the fertilizer that fed European and Asian fields for decades. In the 19th century, the 'white gold of the desert' transformed an arid shoreline into the largest export port on the South Pacific. British engineers, Bolivian miners, and Chilean workers built the city that the desert should never have allowed.",
        symbol: "Saltpeter — the white gold that built Antofagasta",
    },
    {
        era: "1879–1884",
        icon: Anchor,
        title: "The War of the Pacific",
        color: "from-sky-700 to-blue-800",
        accent: "text-sky-400",
        border: "border-sky-500/30",
        body: "The War of the Pacific was one of the most decisive conflicts in South American history. Chile, Peru, and Bolivia disputed control of the Atacama Desert and its resources. Antofagasta was at the center of the conflict — Bolivian territory that became Chilean after victory. The memory of the war shaped national identities that persist to this day.",
        symbol: "War of the Pacific — the conflict that redrew the continent",
    },
    {
        era: "20th Century",
        icon: Gem,
        title: "Copper, Modernity, and Science",
        color: "from-orange-700 to-amber-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "When saltpeter gave way to synthetic fertilizer, copper took the throne. Antofagasta became the world capital of copper — a mineral essential for electrifying the planet. Universities, research centers, and technological innovation transformed the mining city into a metropolis of knowledge. The Atacama also revealed its skies: the world's best astronomical observatories emerged in the region.",
        symbol: "Copper — the metal of the 20th century and the future",
    },
    {
        era: "Today",
        icon: Globe,
        title: "Pacific Bioceanic Gateway",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Today, Antofagasta is the exit point of the Bioceanic Route — where the continental crossing that begins in the Brazilian Pantanal finally reaches the Pacific. An active port, the second most populous city in northern Chile, a university hub, and a world-class astronomical observation destination. The Atlantic has reached the Pacific — and Antofagasta is the end and the beginning of everything.",
        symbol: "Bioceanic Route — the Pacific receives the continent",
    },
];

const attractions = [
    { name: "La Portada", icon: Waves, desc: "Chile's most famous natural monument. A 43m rock arch sculpted by the sea over millions of years — at sunset, the golden cliffs reflect in the deep-blue Pacific. One of the most cinematic images in South America.", badge: "Icon" },
    { name: "Port of Antofagasta", icon: Anchor, desc: "The second largest port in northern Chile and one of the busiest on the South Pacific. Cranes, cargo ships, and the human scale of the sea — the point where the Bioceanic Route touches the ocean.", badge: "Port" },
    { name: "Huanchaca Ruins", icon: Mountain, desc: "A 19th-century Bolivian silver refinery preserved in the heart of the city. Today a historic monument and cultural center — a memory in stone from when Antofagasta was still Bolivian territory.", badge: "History" },
    { name: "Valle de la Luna", icon: Camera, desc: "100km from Antofagasta, the Valley of the Moon offers one of the most extraterrestrial landscapes on Earth. Dunes, salt formations, and craters that look like another planet — the Atacama in its most radical form.", badge: "Atacama" },
    { name: "Paranal Observatory (ESO)", icon: Eye, desc: "The European Southern Observatory, in the desert 130km from Antofagasta, houses the VLT — one of the world's largest telescopes. The Atacama sky is the cleanest on the planet for astronomy.", badge: "Science" },
    { name: "El Balneario Beach", icon: Waves, desc: "Antofagasta's main urban beach — where residents swim and fish in the Pacific with the Atacama as a backdrop. The everyday life of the world's most extreme coastal city.", badge: "Sea" },
    { name: "Antofagasta Regional Museum", icon: Star, desc: "A collection covering the saltpeter era, the War of the Pacific, and the pre-Columbian cultures of the desert. Antofagasta's memory told with depth and without romanticism.", badge: "Museum" },
    { name: "Salar de Atacama", icon: Gem, desc: "Chile's largest salt flat and one of the biggest in the world — habitat for the pink flamingos that inhabit the lithium lagoons. 250km from Antofagasta, one of the most surreal views in South America.", badge: "Nature" },
];

const dishes = [
    { name: "Pacific King Crab", icon: Waves, desc: "The giant crab from the deep waters of the South Pacific — with juicy meat and a unique flavor. In Antofagasta, king crab arrives straight from the sea and is prepared the same day. A symbol of coastal gastronomy.", tag: "Icon" },
    { name: "Chilean Ceviche", icon: Leaf, desc: "Fresh seafood marinated with lemon, cilantro, and chili. The Chilean version is milder than the Peruvian — a clean, crisp Pacific flavor that lets the quality of the fish speak for itself.", tag: "Coastal" },
    { name: "Grilled Conger Eel", icon: Flame, desc: "The most traditional fish in Chilean cuisine, prepared in Antofagasta with maximum Pacific freshness. Firm flesh, delicate flavor — impossible to replicate inland.", tag: "Traditional" },
    { name: "Seafood Empanadas", icon: Utensils, desc: "The Chilean empanada filled with fresh Pacific seafood. Clams, mussels, and shrimp in a baked dough made with artisan technique. The most popular coastal snack in northern Chile.", tag: "Popular" },
    { name: "Seafood Chupe", icon: Utensils, desc: "A thick seafood stew with milk, cheese, and spices. An Andean-coastal culinary heritage that warms on the nights when the Pacific wind blows free across the desert.", tag: "Comfort" },
    { name: "Northern Chilean Wines", icon: Flame, desc: "Wines from the Elqui Valley and other northern Chilean producers reach the tables of Antofagasta. The mineralogy of the arid soil imprints a unique character — wines built together by the ocean and the desert.", tag: "Terroir" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "City and Port",
        morning: "Antofagasta's historic center — Plaza Colón, the Railway Station (heritage of the saltpeter era), and the Huanchaca Ruins. The city that saltpeter and copper built.",
        afternoon: "Port of Antofagasta — where the Bioceanic Route touches the Pacific. Ships, cranes, the scale of continental trade. The ocean that gave meaning to the entire crossing.",
        evening: "Sunset over the Pacific with seafood on the waterfront. King crab, ceviche, and the deep-blue sea with the golden Atacama as a backdrop. Antofagasta moves you with its grandeur.",
        color: "from-sky-600 to-blue-700",
        icon: Anchor,
    },
    {
        day: "Day 2",
        theme: "La Portada and Beaches",
        morning: "La Portada at dawn — the 43m natural arch bathed in Pacific light. Golden cliffs, pelicans in flight, and the sound of the sea against the rock. Impossible not to photograph.",
        afternoon: "Northern coastal beaches — El Balneario and Hornitos. The Pacific at a mild temperature, with the arid desert as a backdrop. The duality that defines Antofagasta.",
        evening: "Dinner of conger eel and seafood chupe with Chilean wine. The sound of the ocean, the silence of the distant Atacama, and the stars beginning to appear.",
        color: "from-blue-600 to-sky-700",
        icon: Waves,
    },
    {
        day: "Day 3",
        theme: "Atacama and Astronomy",
        morning: "Valle de la Luna — an extraterrestrial landscape 100km from the city. Dunes, crystallized salt formations, and a mineral silence that exists nowhere else on the planet.",
        afternoon: "Salar de Atacama — pink flamingos in the lithium lagoons. Infinite white, altitude, and the impossible blue of the Atacama sky. The other face of Antofagasta.",
        evening: "Nighttime stargazing in the desert. The cleanest sky on the planet displays the complete Milky Way. The same desert that holds minerals holds stars — Antofagasta closes the crossing with the cosmos.",
        color: "from-indigo-600 to-blue-700",
        icon: Eye,
    },
];

const curiosities = [
    { text: "Antofagasta is the city with the greatest altimetric contrast in the world relative to the coast — the Atacama rises from 0 to 4,000m in less than 200km, creating extreme microclimates that never meet." },
    { text: "La Portada, the natural arch that symbolizes Antofagasta, is 43 meters tall and was formed over 20 million years by ocean erosion — it is one of the most photographed natural monuments in Chile." },
    { text: "The Atacama Desert is the driest on Earth — some weather stations on the plateau have never recorded rain. The skies are so clear that the ESO (European Southern Observatory) installed its largest telescopes there." },
    { text: "The War of the Pacific (1879–1884) caused Bolivia to lose its access to the sea. Antofagasta was Bolivian territory — today it is Chilean. Bolivia still claims an outlet to the Pacific." },
    { text: "Antofagasta is the second richest city in Chile by per capita income — thanks to copper. The region produces approximately 10% of the world's copper, making it strategic for global electrification." },
    { text: "The ESO's Paranal Observatory, 130km from Antofagasta, houses the VLT (Very Large Telescope) — with 4 telescopes of 8.2m each, capable of seeing objects 4 billion times fainter than the human eye." },
    { text: "The coastline of Antofagasta is home to sea lions, pelicans, flamingos, and Humboldt penguins — species adapted to the Humboldt Current that brings cold Pacific waters to the Chilean coast." },
    { text: "In Antofagasta there are buildings and structures from the 19th-century saltpeter era still in use — the Train Station, built by the British in 1872, is the oldest operating station in Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3"
        >
            {children}
        </motion.span>
    );
}

function SectionTitle({ children, light = false, className = "" }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${light ? "text-white" : "text-primary-950"} ${className}`}
        >
            {children}
        </motion.h2>
    );
}

/* ─── infográfico ────────────────────────────────────────────── */

function InfograficoSection() {
    const [open, setOpen] = useState(false);
    const src = useInfographic("antofagasta");
    return (
        <>
            <section className="bg-primary-950 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto cursor-zoom-in group"
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={src}
                            alt="Editorial infographic Antofagasta"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Click to enlarge</p>
                </div>
            </section>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src}
                            alt="Editorial infographic Antofagasta"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── page ───────────────────────────────────────────────────── */

export default function AntofagastaPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Antofagasta Region"
                name={{ first: "Antofagasta", second: "" }}
                tagline="Where the Atacama kisses the Pacific — capital of copper, observatories, and the greatest continental ocean view."
                scene="pacifico"
                image="/cities/antofagasta.jpg"
                accentColor="#38bdf8"
                stats={[
                    { label: "Inhabitants", value: 500000 },
                    { label: "Founded", value: 1866 },
                    { label: "VLT Paranal Altitude (m)", value: 2635, suffix: " m" },
                    { label: "Km from Santiago", value: 1360, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Antofagasta</SectionLabel>
                        <SectionTitle>
                            The city between{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                two infinities
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Antofagasta is not merely a port — it is an impossible duality. On one side, the
                            driest desert on Earth with its minerals, observatories, and mineral silence. On the
                            other, the Pacific with seafood, golden cliffs, and the feeling of journey's end.{" "}
                            <strong className="text-primary-700">It is where the Bioceanic Route finally
                            reaches the ocean</strong> — and where the Atlantic and the Pacific meet
                            across an entire continent.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Pacific Gateway",
                                text: "The port of Antofagasta is where the Bioceanic Route touches the ocean. Cargo ships, copper exports, and goods arriving from the Atlantic — the point where the continental corridor meets global trade.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Gem,
                                title: "Copper Capital",
                                text: "Antofagasta is the center of the world's largest copper-producing region. The metal that electrifies the planet is extracted here — and mineral wealth transformed an arid shoreline into a metropolis of knowledge and technology.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Eye,
                                title: "Atacama and Cosmos",
                                text: "The driest desert on Earth creates the clearest sky on the planet. International observatories capture stars billions of light-years away. La Portada and Valle de la Luna complete the scenery — impossible nature in every direction.",
                                color: "from-indigo-50 to-blue-50",
                                accent: "text-indigo-700",
                                iconBg: "bg-indigo-100",
                            },
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.color}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5`}>
                                    <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
                                </div>
                                <h3 className={`font-display text-xl font-bold ${pillar.accent} mb-3`}>{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{pillar.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HISTÓRIA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Saltpeter, War, and Future</SectionLabel>
                        <SectionTitle light>
                            From white gold to{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                                cosmic gateway
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Antofagasta was built by the desert, contested in wars, and reinvented by copper.
                            Each period left visible marks in stone, port, and identity.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {historia.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.6 }}
                                className={`rounded-3xl border ${item.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}
                            >
                                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${item.accent} uppercase tracking-widest`}>
                                                {item.era}
                                            </span>
                                            <h3 className="text-white font-bold text-lg mt-1 leading-tight">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 ml-4`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className={`inline-flex items-center gap-2 text-xs ${item.accent} font-semibold`}>
                                        <ChevronRight className="w-3 h-3" />
                                        {item.symbol}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LA PORTADA SPOTLIGHT ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-900/18 via-transparent to-blue-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-sky-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(251,191,36,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                                        <Waves className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
                                        Natural Monument of Chile
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    La Portada
                                    <br />
                                    <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                        The arch the Pacific carved over 20 million years
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    North of Antofagasta, the sea sculpted one of the most impressive rock formations
                                    in South America. La Portada is a natural arch 43 meters tall — declared a
                                    Natural Monument in 1990 — where the yellowish Atacama contrasts with the deep
                                    blue of the Pacific. At sunset, the colors of the desert and the ocean converge
                                    in a spectacle that needs no caption.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Formation height", val: "43 m", sub: "Arch carved by the sea" },
                                        { label: "Natural Monument", val: "1990", sub: "Protected by the Chilean state" },
                                        { label: "Geological formation", val: "20 M y.", sub: "Years of ocean erosion" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-sky-500/10">
                                            <div className="text-2xl font-bold text-sky-300 font-display mb-1">{stat.val}</div>
                                            <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
                                            <div className="text-white/30 text-xs mt-1">{stat.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── DUALIDADE ATACAMA + PACÍFICO ─────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Between Two Worlds</SectionLabel>
                        <SectionTitle light>
                            Desert, ocean,{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                mining, and cosmos
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Atacama Desert",
                                text: "The driest on Earth — some stations have never recorded rain. Lithium salt flats, dormant volcanoes, Valle de la Luna, and a mineral silence that turns any journey into a meditative experience.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Pacific Ocean",
                                text: "The Humboldt Current brings cold polar waters — pelicans, sea lions, Humboldt penguins, and extraordinary seafood along an arid coast that should not be fertile.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: Gem,
                                title: "Copper Capital",
                                text: "The region produces ~10% of the world's copper — a metal essential for global electrification. Giant mines, technological innovation, and universities shaped a modern metropolis in a radical desert.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Eye,
                                title: "ESO Observatories",
                                text: "The clearest sky on the planet. The Paranal Observatory houses the VLT — four 8.2m telescopes. At night, the Atacama is not just desert: it is a window to the cosmos.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl border ${card.border} bg-white/[0.04] p-7 hover:bg-white/[0.07] transition-all duration-300`}
                            >
                                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5`}>
                                    <card.icon className={`w-5 h-5 ${card.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${card.accent} mb-3`}>{card.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-14">
                        <SectionLabel>Fruits of the Pacific</SectionLabel>
                        <SectionTitle>
                            Cuisine of{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                journey's end
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="bg-slate-50 rounded-3xl p-7 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                                        {dish.tag}
                                    </span>
                                </div>
                                <h3 className="font-bold text-primary-950 text-base mb-2">{dish.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRAÇÕES ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations and Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {attractions.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-sky-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">
                                        {a.badge}
                                    </span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">{a.name}</h3>
                                <p className="text-white/35 text-xs leading-relaxed">{a.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Suggested Itinerary</SectionLabel>
                        <SectionTitle>
                            3 days in{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                Antofagasta and the Atacama
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.12 * i }}
                                className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`bg-gradient-to-r ${day.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70">{day.day}</span>
                                        <day.icon className="w-5 h-5 opacity-70" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold">{day.theme}</h3>
                                </div>
                                <div className="p-6 space-y-4 bg-slate-50">
                                    {[
                                        { label: "Morning", text: day.morning },
                                        { label: "Afternoon", text: day.afternoon },
                                        { label: "Evening", text: day.evening },
                                    ].map((period) => (
                                        <div key={period.label}>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{period.label}</span>
                                            <p className="text-slate-600 text-sm leading-relaxed mt-1">{period.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Facts about{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: 0.06 * i }}
                                className="flex items-start gap-4 bg-white/[0.04] rounded-2xl p-5 border border-white/8"
                            >
                                <div className="w-7 h-7 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-sky-400" />
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <SectionLabel>Plan Your Visit</SectionLabel>
                        <SectionTitle>Practical Information</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "How to Get There",
                                items: [
                                    "Andrés Sabella Gálvez International Airport — flights from Santiago, Lima, Buenos Aires",
                                    "Bus from Santiago (~17h) or Iquique (~4h) — central bus terminal",
                                    "Ruta 1 and Ruta 5 Norte — connections throughout northern Chile",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "Year-round — Antofagasta has a stable climate with less than 10mm of annual rainfall",
                                    "Winter (June–August): mild temperatures, perfect skies for astronomy",
                                    "Summer (December–February): warmer sea, ideal for beaches and diving",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Currency: Chilean peso — favorable exchange rate for travelers with USD/BRL/EUR",
                                    "Altitude: sea-level city — no acclimatization issues",
                                    "Language: Chilean Spanish — accent distinct from Argentine and Bolivian",
                                ],
                                accent: "text-blue-700",
                                iconBg: "bg-blue-100",
                            },
                        ].map((block, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-slate-50 p-7"
                            >
                                <div className={`w-11 h-11 rounded-2xl ${block.iconBg} flex items-center justify-center mb-5`}>
                                    <block.icon className={`w-5 h-5 ${block.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${block.accent} mb-4`}>{block.title}</h3>
                                <ul className="space-y-2.5">
                                    {block.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-slate-600 text-sm">
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section className="section-padding relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #082f49 0%, #0c4a6e 35%, #075985 65%, #0369a1 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇨🇱</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            The Pacific is waiting for you
                        </h2>
                        <p className="text-sky-200/70 text-lg max-w-xl mx-auto mb-10">
                            Where the driest desert on Earth meets the deepest ocean. The definitive arrival of
                            the Bioceanic Route — where the Atlantic and the Pacific greet each other across a continent.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 font-bold rounded-2xl hover:bg-sky-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/cidades/tartagal"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore Tartagal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
