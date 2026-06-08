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
    Wine, Heart,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "1582",
        icon: Compass,
        title: "Spanish Foundation in the Heart of the Andes",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "Founded in 1582 by Spanish colonizers, Salta was born as a strategic point on the trade routes between the Atlantic and the Pacific. Its privileged position between the Andes, the Altiplano and indigenous regions made it for centuries the heart of northern Argentina — connecting Argentina, Bolivia, Peru and Chile.",
        symbol: "Colonial Historic Center of Salta",
    },
    {
        era: "17th–18th Century",
        icon: Globe,
        title: "Colonial Route and Andean Trade",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Salta grew as a vital node of Spanish colonial routes, moving gold, silver and goods between the Pacific and the Río de la Plata. The churches, mansions and the Basilica Cathedral built during this period still define the historic skyline of the city — architecture that time did not erase.",
        symbol: "Basilica Cathedral and Historic Cabildo",
    },
    {
        era: "Independence",
        icon: Star,
        title: "The North in the Fight for Independence",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Northern Argentina was a decisive stage for the independence wars. Salta and its region witnessed battles, heroes and an identity forged in resistance. The historic Cabildo preserves that memory — the space where decisions that shaped Argentina were made.",
        symbol: "Historic Cabildo — Memory of Independence",
    },
    {
        era: "Today",
        icon: Music,
        title: "Cultural Capital of Argentine Folklore",
        color: "from-rose-600 to-pink-700",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "Today, Salta is recognized as the cultural capital of Argentine folklore. Its peñas play zamba and chacarera live every night, the Tren a las Nubes crosses the Andes in one of the most impressive railway experiences in the world, and Salta's gastronomy is considered the heritage of northern Argentina.",
        symbol: "Peñas Folclóricas — Live Music",
    },
];

const attractions = [
    { name: "Iglesia San Francisco", icon: Mountain, desc: "The monumental tower that dominates the historic center and became the most recognizable visual symbol of Salta. Colonial architecture in its most impactful form.", badge: "Heritage" },
    { name: "Basilica Cathedral", icon: Star, desc: "With its pink facade and colonial details, it represents the historic identity of Salta. One of the most photogenic landmarks in Argentina.", badge: "History" },
    { name: "Tren a las Nubes", icon: Compass, desc: "One of the most impressive railway experiences on the planet. The train climbs the Andes through mountains, valleys and vertiginous bridges to extreme altitudes.", badge: "Adventure" },
    { name: "Peñas Folclóricas", icon: Music, desc: "At night, Salta's peñas come alive with live zamba, chacarera and carnavalito. Music that is not a tourist show — it is living cultural identity.", badge: "Culture" },
    { name: "Valles Calchaquíes", icon: Mountain, desc: "Andean valleys of rare beauty with high-altitude vineyards, historic villages and landscapes that look hand-painted. Cinematic scenery of northern Argentina.", badge: "Nature" },
    { name: "Salinas Grandes", icon: Waves, desc: "One of the largest salt flats in Argentina — an infinite white surface that contrasts with the deep blue of the Andean sky. One of the most surreal images on the continent.", badge: "Landscape" },
    { name: "Historic Cabildo", icon: Globe, desc: "Symbol of Argentine independence, now converted into a museum and cultural space that preserves the political and historical memory of northern Argentina.", badge: "Museum" },
    { name: "Quebrada de San Lorenzo", icon: Camera, desc: "A canyon of lush vegetation a few kilometers from the center. Trails, birds and Andean nature accessible without leaving the Salta region.", badge: "Nature" },
];

const dishes = [
    { name: "Empanadas Salteñas", icon: Flame, desc: "Considered by many to be the best in Argentina. Delicate dough, juicy filling of knife-cut beef with regional spices. The absolute symbol of the city.", tag: "Icon" },
    { name: "Locro", icon: Utensils, desc: "A dish from indigenous and Spanish tradition prepared at popular festivities. Corn, beans, meats and spices in a thick stew that warms body and soul.", tag: "Tradition" },
    { name: "Torrontés", icon: Wine, desc: "Argentina's signature wine, produced in the high-altitude vineyards of the Valles Calchaquíes. Intense floral aromas and unique freshness created by the Andean climate.", tag: "Altitude" },
    { name: "Tamales", icon: Leaf, desc: "Corn dough with a meat filling, wrapped and steamed in a corn husk. A direct indigenous heritage that remains alive in Salta's cuisine.", tag: "Ancestral" },
    { name: "Humita", icon: Utensils, desc: "An Andean preparation of seasoned fresh corn, baked or boiled. A simple dish that carries centuries of history from pre-Columbian cultures.", tag: "Andean" },
    { name: "High-Altitude Wines", icon: Wine, desc: "The world's highest vineyards produce striking tannins and unique aromas here. A tasting experience that only the Andes can create.", tag: "Premium" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "History and Architecture",
        morning: "Colonial historic center: Basilica Cathedral, Historic Cabildo and Plaza 9 de Julio. Salta seems to live at a different pace — more human, more artistic, more historic.",
        afternoon: "Iglesia San Francisco and colonial mansions. Museums of Argentine independence and the memory of the north. An afternoon of photography through streets that time preserved.",
        evening: "First night at a folkloric peña — live zamba and chacarera with empanadas salteñas. The music is not a show: it is the sound of Salta's identity.",
        color: "from-orange-600 to-red-700",
        icon: Globe,
    },
    {
        day: "Day 2",
        theme: "Andes and Landscapes",
        morning: "Tren a las Nubes — the railway that climbs the Andes over vertiginous bridges and cinematic landscapes. One of the most impressive experiences in South America.",
        afternoon: "Quebrada de San Lorenzo: a canyon of lush vegetation, trails and Andean birds. Powerful nature just minutes from the historic center.",
        evening: "Sunset with the golden sky over colonial facades. The aroma of food in the streets, the guitars beginning to play — Salta moves you through its atmosphere.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Day 3",
        theme: "Wines and Culture",
        morning: "Valles Calchaquíes: high-altitude vineyards, historic villages and Andean landscapes that look painted. Tasting of Torrontés and unique high-altitude wines.",
        afternoon: "Salinas Grandes — an infinite white surface under the deep blue of the Andean sky. One of the most surreal settings in South America and some of the best photos on the continent.",
        evening: "Crafts at Salta's markets: ponchos, Andean textiles, silver and ceramics. Farewell with locro and music — Salta stays as a permanent emotional memory.",
        color: "from-rose-600 to-pink-700",
        icon: Wine,
    },
];

const curiosities = [
    { text: "Salta was founded in 1582 — it has more than 440 years of colonial history, making it one of the oldest and best-preserved cities in Argentina." },
    { text: "The nickname 'Salta La Linda' (Salta the Beautiful) is not marketing — it is a historical recognition from travelers who called it that since the 19th century." },
    { text: "The Tren a las Nubes climbs to 4,220 meters in altitude, crossing 29 bridges and 21 tunnels — considered one of the most spectacular railway journeys in the world." },
    { text: "The vineyards of the Valles Calchaquíes are among the highest in the world, reaching 3,000 meters in altitude. The altitude creates wines with unique aromas impossible to replicate at other latitudes." },
    { text: "Salta's folkloric peñas are frequented by local residents — they are not shows for tourists. There, zamba and chacarera are sung and danced as a form of cultural identity." },
    { text: "Pachamama (Mother Earth) is still revered in many communities of northern Argentina. In August, offering rituals to the earth are performed with food and drink." },
    { text: "The Iglesia San Francisco in Salta has one of the tallest towers in northern Argentina — visible from virtually any point in the historic center." },
    { text: "Salta is the starting point for the Quebrada de Humahuaca (UNESCO Heritage), the Salt Flats and the Paso de Jama — one of the most impressive Andean crossings to Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("salta");
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
                            alt="Editorial infographic Salta"
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
                            alt="Editorial infographic Salta"
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

export default function SaltaPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Province of Salta"
                name={{ first: "Salta", second: "La Linda" }}
                tagline="The folkloric soul of the Argentine Andes — colonial, vibrant and gateway to the clouds."
                scene="andes"
                image="/cities/salta.jpg"
                accentColor="#f97316"
                stats={[
                    { label: "Inhabitants", value: 620000 },
                    { label: "Colonial Foundation", value: 1582 },
                    { label: "Altitude (m)", value: 1187, suffix: " m" },
                    { label: "Km from Buenos Aires", value: 1580, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Salta</SectionLabel>
                        <SectionTitle>
                            Where music meets{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                the mountains
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Salta is not visited with your eyes — it is felt. In the zamba echoing from the peñas, in the
                            aroma of freshly baked empanadas, in the colonial facades bathed in the golden Andean sun.
                            With 440 years of preserved history,{" "}
                            <strong className="text-primary-700">it is the most cultural and moving chapter
                            of the bioceanic crossing</strong> — where the route stops being logistics and becomes
                            a profound human experience.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Music,
                                title: "Folklore Capital",
                                text: "Zamba, chacarera and carnavalito played live every night at the peñas. In Salta, folklore is not a tourist show — it is cultural identity that has pulsed since 1582.",
                                color: "from-orange-50 to-red-50",
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Mountain,
                                title: "Andean Gateway",
                                text: "Tren a las Nubes, Valles Calchaquíes, Salinas Grandes and the Quebrada de Humahuaca (UNESCO). The Andes begin here — and they are cinematic at every turn.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wine,
                                title: "Gastronomy and Wine",
                                text: "Empanadas salteñas considered the best in Argentina. Torrontés wines from the world's highest vineyards. Locro and tamales — living heritage of Andean cultures.",
                                color: "from-rose-50 to-pink-50",
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>440 Years of Living History</SectionLabel>
                        <SectionTitle light>
                            From Spanish colony to the{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                cultural soul of the Andes
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Salta was built in layers of colonial history, independence and cultural identity.
                            Each period left visible marks — in stone, in music and in the soul of the northern people.
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

            {/* ── TREN A LAS NUBES SPOTLIGHT ───────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-orange-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(6,27,51,0.95) 60%, rgba(220,38,38,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                                        <Compass className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
                                        Unique Experience
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Tren a las Nubes
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        The railway that embraces the Andes
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    One of the most impressive railway experiences on the planet. The train departs from
                                    Salta and climbs the Andes crossing 29 bridges, 21 tunnels and vertiginous viaducts
                                    until reaching 4,220 meters in altitude — with landscapes that no other road
                                    on the continent can offer.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Maximum altitude", val: "4,220 m", sub: "Above sea level" },
                                        { label: "Bridges", val: "29", sub: "Over valleys and canyons" },
                                        { label: "Tunnels", val: "21", sub: "Inside the Andes" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-orange-500/10">
                                            <div className="text-2xl font-bold text-orange-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA E FOLCLORE ───────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Living Identity</SectionLabel>
                        <SectionTitle light>
                            Folklore,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Pachamama and tradition
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Music,
                                title: "Peñas Folclóricas",
                                text: "Zamba, chacarera, carnavalito and baguala live every night. The peñas are frequented by residents — not tourists. Pure cultural identity.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "Andean spirituality remains alive. In August, offering rituals to Mother Earth are celebrated in communities of northern Argentina.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Indigenous Heritage",
                                text: "Quechua and Aymara peoples shaped the language, customs and worldview of northern Argentina. Markets, crafts and music carry this living heritage.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Leaf,
                                title: "Andean Crafts",
                                text: "Ponchos, textiles, ceramics, silver and indigenous art in Salta's markets. Each piece carries ancestral cultural memory passed down through generations.",
                                accent: "text-rose-400",
                                iconBg: "bg-rose-500/15",
                                border: "border-rose-500/20",
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
                        <SectionLabel>Flavors of Northern Argentina</SectionLabel>
                        <SectionTitle>
                            Cuisine with an{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                Andean soul
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
                                    <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations and Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Salta
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-orange-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                                Salta La Linda
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Curiosities about{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Salta
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
                                <div className="w-7 h-7 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-orange-400" />
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
                                    "Salta International Airport — direct flights from Buenos Aires, Córdoba and other capitals",
                                    "Bus from Buenos Aires (~22h) or Córdoba (~12h) from the central bus terminal",
                                    "Access via National Route 9 and 34 — connection with the Bioceanic Route",
                                ],
                                accent: "text-orange-700",
                                iconBg: "bg-orange-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "April to October: Andean spring and autumn, ideal climate for excursions",
                                    "July: Northern Carnival and the most intense folkloric festivities",
                                    "Avoid December–February: rainy season of the Andean wet season",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Currency: Argentine Peso — favorable exchange rate for travelers with dollars",
                                    "Altitude: 1,152 m — acclimatization recommended before the Tren a las Nubes (4,220 m)",
                                    "Language: Spanish — northern accent with Quechua words",
                                ],
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
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
                    style={{ background: "linear-gradient(135deg, #431407 0%, #7c2d12 35%, #9a3412 65%, #b45309 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/15 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇦🇷</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Salta La Linda is waiting for you
                        </h2>
                        <p className="text-orange-200/70 text-lg max-w-xl mx-auto mb-10">
                            The folkloric soul of the Argentine Andes. Where music, mountains and colonial history
                            meet in the most moving chapter of the bioceanic crossing.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-800 font-bold rounded-2xl hover:bg-orange-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/#cidades"
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
