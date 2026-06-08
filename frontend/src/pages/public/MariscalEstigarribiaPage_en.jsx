import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Fish, Trees, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Plane, Shield,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "20th Century — Origins",
        icon: Shield,
        title: "López de Filippis — The Military Outpost",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Mariscal Estigarribia was born as a military outpost in one of the most isolated regions of Paraguay, then known as López de Filippis. The extreme isolation and relentless Chaco heat forged from the very beginning an identity of resistance and resilience that defines the city to this day.",
        symbol: "Historic Forts of the Chaco",
    },
    {
        era: "1932–1935",
        icon: Star,
        title: "The Chaco War and National Resistance",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Between 1932 and 1935, Paraguay and Bolivia fought for control of the Chaco Boreal in one of the largest conflicts in South American history. Soldiers faced extreme heat, water scarcity, and brutal conditions. Paraguay's victory consolidated the occupation of the Chaco and profoundly shaped regional identity — a living memory preserved in forts, cemeteries, and museums.",
        symbol: "Chaco War Cemeteries and Forts",
    },
    {
        era: "Renaming",
        icon: Compass,
        title: "Tribute to Marshal Estigarribia",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "The city was renamed in honor of Marshal José Félix Estigarribia — national hero of the Chaco War, renowned military strategist, and the foremost symbol of Paraguayan resistance. His name transformed the old outpost into a living monument to Chaco identity.",
        symbol: "Monument to Marshal José Félix Estigarribia",
    },
    {
        era: "Today",
        icon: Globe,
        title: "Hub of the Bioceanic Route PY-15",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Mariscal Estigarribia sits at the crossroads of Route PY-15 (the Bioceanic Corridor) and Route PY-09 (the Transchaco). This position transforms it into a logistics center, supply point, and future industrial hub — a mandatory stop on the great crossings between the Atlantic and the Pacific.",
        symbol: "PY-15 + PY-09 Junction — Ground Zero of the Chaco",
    },
];

const attractions = [
    { name: "Teniente Agripino Enciso National Park", icon: Mountain, desc: "Natural treasures of the Dry Chaco: xerophytic flora, dunes, historic trails, and Chaco War remnants preserved in an untouched landscape.", badge: "Nature" },
    { name: "Military and Missionary Historical Museum", icon: Shield, desc: "A living memory of the Chaco War and the religious missions that shaped the occupation of the region. One of the most significant collections in the Paraguayan interior.", badge: "History" },
    { name: "Dr. Luis María Argaña Airport", icon: Plane, desc: "One of Paraguay's largest airports by runway length. Strategic infrastructure that reinforces the city's logistic importance and international integration potential.", badge: "Logistics" },
    { name: "Sixth Division Lake", icon: Waves, desc: "A mirror of water amid the arid Chaco — a natural refuge that contrasts with the region's vast dryness and offers a uniquely contemplative landscape.", badge: "Nature" },
    { name: "San Miguel Church and Cathedral", icon: Star, desc: "San Miguel Church and Santa María Cathedral preserve the religious and architectural memory of the Chaco colonization, bearing traces of the historic missions.", badge: "Culture" },
    { name: "Chaco War Forts", icon: Shield, desc: "Ancient military structures scattered across the Chaco — silent witnesses to one of the most intense wars in 20th-century South America.", badge: "Heritage" },
    { name: "Indigenous Communities", icon: Globe, desc: "The Nivaclé, Ayoreo, Western Guaraní, and Sanapaná peoples preserve handicrafts, natural medicine, and ancestral spiritual traditions just a few kilometers from the city center.", badge: "Culture" },
    { name: "Chaco Sunset", icon: Camera, desc: "Reddish dust, golden sky, and twisted trees create one of the most visually striking spectacles in South America — impossible to forget.", badge: "Experience" },
];

const dishes = [
    { name: "Sopa Paraguaya", icon: Utensils, desc: "Traditional dish made with corn, cheese, and bold flavor — the emblem of Paraguayan cuisine found on every table throughout the country's interior.", tag: "Tradition" },
    { name: "Chipa", icon: Utensils, desc: "Paraguayan cheese bread, baked in a clay oven. In the Chaco it is eaten warm at breakfast, in the fields, and on long journeys.", tag: "Everyday" },
    { name: "Chaco Grilled Meats", icon: Flame, desc: "Cuts slowly prepared over embers or open fire. The Chaco's extensive ranching produces meats of intense, authentic flavor.", tag: "Chaco" },
    { name: "Rural Country Dishes", icon: Utensils, desc: "Recipes from the Paraguayan interior passed down through generations: broths, stews, cassava, and locally grown ingredients that fed those who built the Chaco.", tag: "Interior" },
    { name: "Tereré", icon: Leaf, desc: "National identity in a gourd. In the Chaco, tereré is even more essential — it refreshes, unites, and marks every pause in the arid life of the interior.", tag: "Ritual" },
    { name: "Indigenous Cuisine", icon: Leaf, desc: "Recipes from the Nivaclé, Ayoreo, and Sanapaná peoples using native Chaco ingredients: fruits, roots, and herbs with centuries of history and wisdom.", tag: "Ancestral" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "History & Culture",
        morning: "Visit the Military and Missionary Historical Museum. Explore the memory of the Chaco War — forts, relics, and narratives of a battle that shaped Paraguay.",
        afternoon: "San Miguel Church and Santa María Cathedral. City center, main square, and an encounter with the historic architecture of the Chaco colonization.",
        evening: "Sunset over the Chaco — a spectacle of golden sky above the vast arid plain. Dinner with sopa paraguaya, chipa, and tereré shared in a circle with local residents.",
        color: "from-amber-600 to-orange-700",
        icon: Shield,
    },
    {
        day: "Day 2",
        theme: "Nature & Adventure",
        morning: "Teniente Agripino Enciso National Park: historic trails, xerophytic flora, dunes, and war remnants. One of the few national parks in the Dry Chaco.",
        afternoon: "Sixth Division Lake — a contemplative stroll and wildlife watching. Birds adapted to the extreme climate, resilient vegetation, and absolute silence.",
        evening: "Stargazing in the Chaco — with no light pollution, one of the most breathtaking night skies in South America. An experience of vastness few travelers ever know.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Day 3",
        theme: "Peoples & Flavors",
        morning: "Visit Nivaclé or Ayoreo indigenous communities: natural fiber handicrafts, traditional medicine, and an ancestral worldview rooted in Chaco territory.",
        afternoon: "Chaco gastronomy: grilled meats, rural dishes, and indigenous cuisine. Shopping for local handicrafts — unique pieces that carry the history of the Chaco peoples.",
        evening: "PY-15 + PY-09 crossroads at dusk — the point where two of the continent's great corridors meet. Mariscal Estigarribia stays with you forever.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Mariscal Estigarribia sits at the exact crossroads of Route PY-15 (the Bioceanic Corridor) and Route PY-09 (the Transchaco) — making it the most strategically important logistics node in the Paraguayan interior." },
    { text: "Dr. Luis María Argaña Airport has one of Paraguay's longest runways — infrastructure inherited from World War II, when the United States used the Chaco as a support base." },
    { text: "The city was originally called López de Filippis and was only renamed Mariscal Estigarribia in honor of the Chaco War hero, José Félix Estigarribia." },
    { text: "Teniente Agripino Enciso National Park is one of the only national parks in the Dry Paraguayan Chaco — protecting fauna and flora adapted to extreme climatic conditions." },
    { text: "The Nivaclé, Ayoreo, Western Guaraní, and Sanapaná peoples have inhabited the region for millennia, with ancestral knowledge of the Chaco that no modern science has managed to replicate." },
    { text: "The Paraguayan Chaco is one of the least densely populated territories in South America — and one of the most biodiverse biomes on the planet, despite its arid appearance." },
    { text: "Mariscal Estigarribia records temperatures ranging from -5°C in winter to +45°C in summer — one of the greatest thermal amplitudes in South America within a single city." },
    { text: "With the full operation of the Bioceanic Corridor, the city is set to become a hub for logistics, hospitality, and services — unprecedented growth for a region that has always lived in isolation." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("mariscal-estigarribia");
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
                            alt="Editorial infographic Mariscal Estigarribia"
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
                            alt="Editorial infographic Mariscal Estigarribia"
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

export default function MariscalEstigarribiaPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Boquerón Department"
                name={{ first: "Mariscal", second: "Estigarribia" }}
                tagline="New logistics hub of the Chaco — strategic crossroads of the bioceanic route and the Transchaco."
                scene="chaco"
                image="/cities/mariscal_estigarribia.jpg"
                accentColor="#a78bfa"
                stats={[
                    { label: "Inhabitants (estimate)", value: 8000 },
                    { label: "Km from Asunción", value: 500, suffix: " km" },
                    { label: "% Indigenous", value: 65, suffix: "%" },
                    { label: "Km from Carmelo Peralta", value: 270, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Mariscal Estigarribia</SectionLabel>
                        <SectionTitle>
                            Where resistance meets{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                the continental future
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Mariscal Estigarribia is the heart of the Paraguayan Chaco. Shaped by the Chaco War,
                            home to indigenous peoples, and positioned at the strategic crossroads of the bioceanic routes,
                            it represents the{" "}
                            <strong className="text-primary-700">essence of a territory that lived in isolation
                            and is now preparing to connect oceans</strong>. Infinite horizons, a cinematic sunset,
                            and a history of resistance that few places on the continent can match.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Compass,
                                title: "Bioceanic Hub",
                                text: "Crossroads of Route PY-15 (Bioceanic Corridor) and Route PY-09 (Transchaco) — a strategic position that will make the city a logistics pole between the two oceans.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Shield,
                                title: "Memory of the War",
                                text: "Forts, museums, cemeteries, and historic trails from the Chaco War (1932–1935) — one of the most brutal battles in South America, which decided Paraguay's destiny.",
                                color: "from-red-50 to-rose-50",
                                accent: "text-red-700",
                                iconBg: "bg-red-100",
                            },
                            {
                                icon: Globe,
                                title: "Peoples of the Chaco",
                                text: "Nivaclé, Ayoreo, Western Guaraní, and Sanapaná preserve ancestral wisdom. Handicrafts, natural medicine, and a worldview rooted in the territory form a unique identity.",
                                color: "from-violet-50 to-purple-50",
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Land of Resistance and Resilience</SectionLabel>
                        <SectionTitle light>
                            From the Chaco War to the{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Continental Corridor
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Mariscal Estigarribia was built in layers of battle, isolation, and strategy.
                            From military outpost to continental logistics node — each period left indelible marks
                            on Chaco identity.
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

            {/* ── ROTA BIOCEÂNICA SPOTLIGHT ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-transparent to-orange-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-amber-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(234,88,12,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                                        Strategic Position
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    PY-15 + PY-09 Junction
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        Ground zero of the Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Mariscal Estigarribia sits at the junction of Route PY-15 — the axis of the Bioceanic Corridor
                                    linking the Atlantic to the Pacific — and Route PY-09, the Transchaco, Paraguay's main
                                    north-south artery. This unique position makes it an inevitable logistics pole
                                    in South American integration.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Bioceanic Route", val: "PY-15", sub: "Atlantic → Pacific" },
                                        { label: "Transchaco", val: "PY-09", sub: "North-South of Paraguay" },
                                        { label: "Airport", val: "Argaña", sub: "One of PY's longest runways" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-amber-500/10">
                                            <div className="text-2xl font-bold text-amber-300 font-display mb-1">{stat.val}</div>
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

            {/* ── NATUREZA ─────────────────────────────────────── */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <SectionLabel>Living Chaco</SectionLabel>
                            <SectionTitle>
                                Extreme nature and{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    hidden biodiversity
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                The Chaco may look arid, but it hides extraordinary biodiversity. Fauna adapted
                                to extreme climates, preserved national parks, and a starry sky that only those
                                who have lived far from the city can imagine. The vastness of the Chaco does not
                                intimidate — it sets you free.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Giant Anteater", icon: "🦣" },
                                    { label: "Macaws", icon: "🦜" },
                                    { label: "Puma", icon: "🐆" },
                                    { label: "Armadillo", icon: "🦔" },
                                    { label: "Caiman", icon: "🐊" },
                                    { label: "Deer", icon: "🦌" },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
                                        <span className="text-2xl">{a.icon}</span>
                                        <span className="text-slate-700 font-semibold text-sm">{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div className="rounded-3xl overflow-hidden bg-primary-950 p-8 border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Dry Chaco", desc: "Xerophytic vegetation, dunes, and extreme climate that forged the most resilient identity in South America.", color: "from-amber-900/60 to-orange-900/60", accent: "text-amber-400" },
                                        { title: "Enciso Park", desc: "Native flora, historic trails, and war remnants in one of the only national parks in the Paraguayan Chaco.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Starry Sky", desc: "With no light pollution, the Chaco offers one of the most spectacular nighttime sky views on the continent.", color: "from-indigo-900/60 to-blue-900/60", accent: "text-indigo-400" },
                                        { title: "Sunset", desc: "Red dust, golden sky, and twisted quebracho trees — one of the most cinematic visual phenomena in South America.", color: "from-red-900/50 to-orange-900/50", accent: "text-red-400" },
                                    ].map((card, i) => (
                                        <div key={i} className={`rounded-2xl bg-gradient-to-br ${card.color} p-5 border border-white/8`}>
                                            <h4 className={`font-bold text-sm ${card.accent} mb-2`}>{card.title}</h4>
                                            <p className="text-white/40 text-xs leading-relaxed">{card.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA E POVOS ──────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Chaco Identity</SectionLabel>
                        <SectionTitle light>
                            Culture of{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                resistance and roots
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Shield,
                                title: "Military Tradition",
                                text: "The memory of the Chaco War permeates every street, monument, and conversation. National pride expressed in museums, forts, and historic cemeteries.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Indigenous Peoples",
                                text: "Nivaclé, Ayoreo, Western Guaraní, and Sanapaná — ancestral cultures with handicrafts, natural medicine, and spirituality rooted in the Chaco.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Guaraní in the Chaco",
                                text: "Spanish, Guaraní, and indigenous dialects coexist in the streets. The Guaraní language is a living identity — spoken in the fields, the market, and at home.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Rural Life",
                                text: "Life in the Chaco has its own rhythm — slow, strong, and bound to the land. Ranching, open countryside, and simple hospitality define the city's daily life.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
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
                        <SectionLabel>Flavors of the Interior</SectionLabel>
                        <SectionTitle>
                            Cuisine of the{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Deep Chaco
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
                                    <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations & Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Mariscal Estigarribia
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-amber-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
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
                            3 days{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                in the heart of the Chaco
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Fun facts about{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Mariscal Estigarribia
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
                                <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-amber-400" />
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
                                    "Route PY-09 (Transchaco) from Asunción — ~500 km (5–6h)",
                                    "Access via Route PY-15 from Carmelo Peralta and the Brazilian border",
                                    "Dr. Luis María Argaña Airport: occasional domestic flights",
                                ],
                                accent: "text-amber-600",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "May to August: Chaco winter, mild temperatures (10–25°C)",
                                    "Avoid December–March: extreme heat above 40°C and heavy rains",
                                    "July is ideal for historic tourism and trails in Enciso Park",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Compass,
                                title: "Useful Information",
                                items: [
                                    "Currency: Paraguayan Guaraní",
                                    "Bring plenty of water — the Chaco is arid and the heat is extreme",
                                    "Fuel and supplies: stock up before entering the deep Chaco",
                                ],
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
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
                    style={{ background: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #92400e 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇵🇾</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Mariscal Estigarribia is waiting for you
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            The heart of the Chaco and the gateway to the continental crossing.
                            A city shaped by war, resistance, and the future of South American integration.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-800 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore the Route <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
