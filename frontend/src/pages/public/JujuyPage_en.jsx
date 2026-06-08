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
    Heart, Sparkles,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "10,000 BC",
        icon: Compass,
        title: "The Ancient Andean Route",
        color: "from-violet-700 to-purple-800",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "Before the Incas, before the Spanish — the Quebrada de Humahuaca was already a human route. For millennia, llama caravans crossed these valleys carrying wool, ceramics, corn and metal between the Andes and the plains. The corridor we now call the Bioceanic Route has 10,000-year-old roots in this territory.",
        symbol: "Qhapaq Ñan — Main Andean Road",
    },
    {
        era: "15th–16th Century",
        icon: Globe,
        title: "The Inca and the Spanish Conquest",
        color: "from-rose-700 to-red-800",
        accent: "text-rose-400",
        border: "border-rose-500/30",
        body: "The Inca Empire incorporated the Quebrada into the Qhapaq Ñan — its road network that connected the continent. In 1593, the Spanish founded San Salvador de Jujuy as a strategic node between Lima and Buenos Aires. The colonial city grew over millennial indigenous paths, blending two worlds into a single landscape.",
        symbol: "Founding of San Salvador de Jujuy — 1593",
    },
    {
        era: "1812 — Jujuy Exodus",
        icon: Flame,
        title: "The Sacrifice That Saved Independence",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "In August 1812, General San Martín asked the people of Jujuy for the hardest act: to abandon their homes, harvests and animals — and burn everything — to deny resources to the royalist army. The Jujuy Exodus is considered one of the most heroic gestures of Argentine independence. Jujuy sacrificed itself so that Argentina could be born.",
        symbol: "Jujuy Exodus — Memory of Independence",
    },
    {
        era: "2003 — UNESCO",
        icon: Star,
        title: "World Heritage Site",
        color: "from-purple-700 to-violet-800",
        accent: "text-purple-400",
        border: "border-purple-500/30",
        body: "In 2003, UNESCO recognized the Quebrada de Humahuaca as a World Heritage Site — Cultural Landscape and Cultural Itinerary. The recognition was not just touristic: it was the entire world saying that these valleys, this culture and this Andean spirituality belong to the collective memory of humanity.",
        symbol: "UNESCO World Heritage — Quebrada de Humahuaca 2003",
    },
];

const attractions = [
    { name: "Cerro de los Siete Colores", icon: Mountain, desc: "Argentina's most photogenic mountain. In Purmamarca, 7 geological layers create a natural palette that changes color with the light — golden at dawn, violet at dusk.", badge: "Icon" },
    { name: "Pucará de Tilcara", icon: Compass, desc: "Pre-Inca fortress at 2,450m altitude, with a strategic view over the Quebrada. 900 years of human occupation visible in stone — the largest archaeological site in northwest Argentina.", badge: "Archaeology" },
    { name: "Quebrada de Humahuaca", icon: Waves, desc: "155 km of UNESCO-recognized Andean canyon. Colorful strata, historic villages, giant cacti and a silence that transforms any journey into a spiritual experience.", badge: "UNESCO" },
    { name: "Salinas Grandes", icon: Star, desc: "At 3,400m altitude, one of the largest salt flats in South America. Infinite white under the impossible blue of the Andean sky — one of the most surreal images on the continent.", badge: "Landscape" },
    { name: "Purmamarca", icon: Camera, desc: "Andean village at the foot of the Cerro de los Siete Colores. Colonial church, artisan market and a silence that feels sacred. One of Argentina's most photogenic villages.", badge: "Village" },
    { name: "Humahuaca", icon: Globe, desc: "Historic city that preserves indigenous and colonial identity. The Monument to Independence and the Church of Candelaria tell centuries of history in stone and Andean spirituality.", badge: "History" },
    { name: "Tilcara", icon: Heart, desc: "Cultural and archaeological hub of the Argentine Andes. Museum, high-altitude botanical garden, artisan market and the gateway to the historic Pucará.", badge: "Culture" },
    { name: "Andean Carnival", icon: Music, desc: "The most colorful carnival in northwest Argentina. The diablada — an Aymara dance blending indigenous cosmology and colonial heritage — takes to the streets with color, music and spirituality.", badge: "Festival" },
];

const dishes = [
    { name: "Humita", icon: Leaf, desc: "Andean preparation of seasoned fresh corn, cooked in its husk. A simple dish carrying centuries of memory from the pre-Columbian cultures of the Andes.", tag: "Ancestral" },
    { name: "Jujuy Tamales", icon: Utensils, desc: "Corn dough filled with meat and Andean spices, wrapped in corn husks and steamed. A recipe the Inca would recognize — it has survived 500 years unchanged.", tag: "Tradition" },
    { name: "Northern Locro", icon: Flame, desc: "Thick stew of corn, beans and meats — a dish of Andean and Spanish tradition served at celebrations. In Jujuy, locro is cooked at festivals with patience and affection.", tag: "Festive" },
    { name: "Jujuy Empanadas", icon: Utensils, desc: "The regional version of Argentine empanadas — with a more seasoned filling and a touch of pepper. Baked in a clay oven, they carry the flavor of altitude and tradition.", tag: "Regional" },
    { name: "Chicha", icon: Waves, desc: "Fermented corn drink consumed in rituals for over 3,000 years in the Andes. In Jujuy, chicha is still prepared by hand for community celebrations.", tag: "Ritual" },
    { name: "Andean Quinoa", icon: Leaf, desc: "The sacred grain of the Incas grown on the Jujuy plateau at over 3,500m altitude. Rich in protein, resistant to extreme cold — a food that sustained Andean civilizations.", tag: "Altiplano" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Quebrada & Purmamarca",
        morning: "Arrival in San Salvador de Jujuy. Colonial historic center — Cathedral, Cabildo and indigenous market. The city already breathes a different rhythm, more Andean, more silent.",
        afternoon: "Purmamarca — the village at the foot of the Cerro de los Siete Colores. Artisan market of ponchos, ceramics and silver. Hike around the hill at dusk when the colors explode.",
        evening: "Sunset over the colorful mountains of Purmamarca. The sky turns golden, then violet, then starry. Jujuy moves you before dinner even arrives.",
        color: "from-rose-600 to-red-700",
        icon: Mountain,
    },
    {
        day: "Day 2",
        theme: "Tilcara & Humahuaca",
        morning: "Pucará de Tilcara at dawn — a pre-Inca fortress with 900 years of strategic vision over the Quebrada. The stone speaks. So does the silence.",
        afternoon: "Tilcara: Archaeological Museum, high-altitude botanical garden with giant cacti, Quechua craft market. Continue to Humahuaca through the colorful Quebrada.",
        evening: "Historic Humahuaca — Church of Candelaria, Monument to Independence, cobblestone streets. Dinner with tamales and locro. Andean music that was never rehearsed for tourists.",
        color: "from-violet-600 to-purple-700",
        icon: Globe,
    },
    {
        day: "Day 3",
        theme: "Salt Flats & Altitude",
        morning: "Salinas Grandes at 3,400m — infinite white, impossible blue sky, a silence that weighs. One of the most surreal images in South America and one of the best photo opportunities on the continent.",
        afternoon: "Descent through panoramic curves between the Puna and the Quebrada. Landscapes that change color with every kilometer — from the whiteness of the salt flat to Andean terracotta.",
        evening: "Return through the Quebrada at dusk — the light spectacle that transforms the mountains. Farewell with chicha and handicrafts. Jujuy stays tattooed in your memory.",
        color: "from-purple-600 to-violet-700",
        icon: Sparkles,
    },
];

const curiosities = [
    { text: "The Quebrada de Humahuaca was a human route for over 10,000 years before being recognized by UNESCO in 2003 — few landscapes in the world hold such deep memory." },
    { text: "The Cerro de los Siete Colores in Purmamarca owes its 7 colors to 7 different geological epochs — each layer represents millions of years of Earth's history visible to the naked eye." },
    { text: "The Jujuy Exodus of 1812: the people abandoned and burned Jujuy to deny resources to the royalist army. San Martín called this sacrifice 'the most heroic act of the Revolution'." },
    { text: "The Pucará de Tilcara was inhabited for over 900 years before the Spanish arrived — its strategic position over the Quebrada allowed visual control of dozens of kilometers." },
    { text: "Jujuy chicha — fermented corn drink — has been consumed in rituals for over 3,000 years in the Andes. In Jujuy, it is still handcrafted for community ceremonies." },
    { text: "The Salinas Grandes sit at 3,400 meters altitude — atmospheric pressure there is 30% lower. The sky is darker, the stars brighter and the silence more absolute." },
    { text: "Jujuy's carnival includes the 'diablada' — an Aymara dance with costumes that blend pre-Columbian and colonial iconography. An entire cosmology danced in the streets." },
    { text: "In August, Pachamama (Mother Earth) ceremonies are held throughout the province. Food, drinks and coca leaves are buried as offerings — an unbroken tradition for millennia." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("jujuy");
    const [open, setOpen] = useState(false);
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
                            alt="Editorial infographic Jujuy"
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
                            alt="Editorial infographic Jujuy"
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

export default function JujuyPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Province of Jujuy"
                name={{ first: "Jujuy", second: "" }}
                tagline="Quebrada de Humahuaca UNESCO — 10,000 years of continuous history in the world's most colorful Andean canyons."
                scene="andes"
                image="/cities/jujuy.jpg"
                accentColor="#f43f5e"
                stats={[
                    { label: "Inhabitants", value: 320000 },
                    { label: "Colonial Founding", value: 1593 },
                    { label: "Km UNESCO Quebrada", value: 155, suffix: " km" },
                    { label: "Years of history", value: 10000 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Jujuy</SectionLabel>
                        <SectionTitle>
                            Where Andean spirituality{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                never went out
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Jujuy is not visited — it is felt. In the mountains painted by time, in the Pachamama
                            rituals that never stopped, in the indigenous markets where every piece carries millennia.{" "}
                            <strong className="text-primary-700">It is the most ancestral and spiritual chapter
                            of the bioceanic crossing</strong> — where the route stops being a road and becomes
                            a deep transcultural experience.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "UNESCO Heritage",
                                text: "Quebrada de Humahuaca — 155km of Andean canyon with 10,000 years of human history, recognized by UNESCO in 2003 as a Cultural Landscape and Cultural Itinerary of Humanity.",
                                color: "from-rose-50 to-red-50",
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Heart,
                                title: "Living Pachamama",
                                text: "Andean spirituality is not historical memory — it is everyday life. August ceremonies, offerings to Mother Earth and a Quechua/Aymara worldview preserved for millennia.",
                                color: "from-violet-50 to-purple-50",
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Camera,
                                title: "Impossible Nature",
                                text: "Cerro de los Siete Colores in Purmamarca, Salinas Grandes at 3,400m, canyons that change color with the light. Jujuy is the most cinematic landscape in South America.",
                                color: "from-pink-50 to-rose-50",
                                accent: "text-pink-700",
                                iconBg: "bg-pink-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>10,000 Years of Andean Memory</SectionLabel>
                        <SectionTitle light>
                            From an ancient route to{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                the soul of humanity
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Jujuy is one of the lands with the deepest memory in South America. Each period
                            left visible marks — in stone, in ritual and in the soul of the Andean people.
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

            {/* ── QUEBRADA DE HUMAHUACA SPOTLIGHT ─────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-900/18 via-transparent to-violet-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-rose-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(124,58,237,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                                        World Heritage Site
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Quebrada de Humahuaca
                                    <br />
                                    <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                        10,000 years of Andean memory
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    One of the most impressive landscapes in South America — and one of the oldest.
                                    For millennia, the Quebrada was a route for caravans, empires and cultures. In 2003,
                                    UNESCO recognized what the Andes already knew: this valley is a World Heritage Site.
                                    155km of color, history, spirituality and nature with no parallel on the continent.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Total length", val: "155 km", sub: "Of UNESCO Andean canyon" },
                                        { label: "UNESCO since", val: "2003", sub: "World Heritage Site" },
                                        { label: "Human memory", val: "10,000 yr", sub: "Of continuous history" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-rose-500/10">
                                            <div className="text-2xl font-bold text-rose-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA E ESPIRITUALIDADE ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-rose-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Living Identity</SectionLabel>
                        <SectionTitle light>
                            Pachamama,{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                music and spirituality
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Heart,
                                title: "Pachamama",
                                text: "In August, offering ceremonies to Mother Earth are celebrated throughout the province. Food, chicha and coca are buried — an unbroken tradition for millennia.",
                                accent: "text-rose-400",
                                iconBg: "bg-rose-500/15",
                                border: "border-rose-500/20",
                            },
                            {
                                icon: Music,
                                title: "Ancestral Music",
                                text: "Carnavalito, baguala and zamba played with quena, siku and bombo legüero. Rhythms the Inca would recognize — each note is the collective memory of a people who never lost their identity.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Quechua Heritage",
                                text: "Jujuy preserves one of the strongest indigenous identities in Argentina. Language, worldview, relationship with the land and natural cycles are part of daily life — not a museum.",
                                accent: "text-pink-400",
                                iconBg: "bg-pink-500/15",
                                border: "border-pink-500/20",
                            },
                            {
                                icon: Sparkles,
                                title: "Andean Carnival",
                                text: "The Jujuy diablada blends pre-Columbian and colonial iconography in a dance of rare symbolic power. The carnival is not a party — it is Andean cosmology danced in the streets.",
                                accent: "text-purple-400",
                                iconBg: "bg-purple-500/15",
                                border: "border-purple-500/20",
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
                        <SectionLabel>Flavors of the Altiplano</SectionLabel>
                        <SectionTitle>
                            Cuisine of{" "}
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                millennial origin
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
                                    <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-rose-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations & Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                Jujuy
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-rose-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                                Jujuy & the Quebrada
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-rose-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Facts about{" "}
                            <span className="bg-gradient-to-r from-rose-300 to-violet-400 bg-clip-text text-transparent">
                                Jujuy
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
                                <div className="w-7 h-7 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-rose-400" />
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
                                    "Gobernador Héctor Reyes International Airport — flights from Buenos Aires, Córdoba and Salta",
                                    "Bus from Buenos Aires (~24h) or Salta (~2h) from the central bus terminal",
                                    "Ruta Nacional 9 — direct connection to Salta and the Quebrada de Humahuaca",
                                ],
                                accent: "text-rose-700",
                                iconBg: "bg-rose-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "April to October: Andean spring/autumn — mild temperatures and clear skies",
                                    "February/March: Andean Carnival — the diablada takes to the streets with music and color",
                                    "August: Pachamama ceremonies — a unique spiritual experience",
                                ],
                                accent: "text-violet-700",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Altitude: San Salvador 1,259m, Purmamarca 2,324m, Salinas Grandes 3,400m — acclimatization is important",
                                    "Currency: Argentine peso — favorable exchange rate for travelers with dollars/reais",
                                    "Language: Spanish with Quechua words — 'Jallalla!' is the traditional Andean greeting",
                                ],
                                accent: "text-pink-700",
                                iconBg: "bg-pink-100",
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
                    style={{ background: "linear-gradient(135deg, #1e0030 0%, #4c1d95 35%, #6b21a8 65%, #9d174d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/15 rounded-full blur-[90px]" />
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
                            Jujuy is waiting for you
                        </h2>
                        <p className="text-rose-200/70 text-lg max-w-xl mx-auto mb-10">
                            The Ancestral Soul of the Andes. Where the mountains have seven colors, Pachamama still lives
                            and the Quebrada holds 10,000 years of human memory.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-bold rounded-2xl hover:bg-rose-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/cidades/salta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore Salta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
