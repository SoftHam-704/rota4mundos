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
    Anchor, Wind, ShoppingBag,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "19th Century",
        icon: Mountain,
        title: "Saltpeter and the City of White Gold",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Iquique was born great. During the 19th century, saltpeter transformed this arid coastline into one of the wealthiest cities on the South Pacific. British engineers, Bolivian and Peruvian workers built theaters, railways and entire neighborhoods. The riches of the desert raised a city that should not have existed — and gave Chile decades of prosperity.",
        symbol: "Saltpeter — the mineral that built northern Chile",
    },
    {
        era: "May 21, 1879",
        icon: Anchor,
        title: "The Battle of Iquique — Hero of the Pacific",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "At the Battle of Iquique, Captain Arturo Prat boarded the Peruvian warship Huáscar alone, knowing he would be killed — and he was. His act became the most celebrated display of heroism in Chilean history. The date, May 21, is a national holiday. Iquique carries that memory as its identity: the city where Chile learned what honor means.",
        symbol: "Arturo Prat — hero of the Pacific and the Chilean nation",
    },
    {
        era: "December 21, 1907",
        icon: Flame,
        title: "Santa María de Iquique — The Wound That Never Closed",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "In 1907, more than two thousand saltpeter workers and their families were massacred by the Chilean army at the Santa María de Iquique School. Men, women and children who were demanding better working conditions. The episode is considered the largest worker massacre in Latin America and permanently shaped the Chilean labor movement.",
        symbol: "Santa María School — memory of the labor movement",
    },
    {
        era: "1975 / Today",
        icon: ShoppingBag,
        title: "ZOFRI and the Reinvention of the City",
        color: "from-teal-700 to-cyan-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "When saltpeter died, Iquique reinvented itself. In 1975, the creation of the Iquique Free Trade Zone (ZOFRI) transformed the city into one of the most dynamic in northern Chile — connecting Chile, Bolivia, Argentina and Brazil in a world-class free trade hub. The desert that gave saltpeter now gives logistics, tourism and extreme sports.",
        symbol: "ZOFRI — the commercial reinvention of northern Chile",
    },
];

const attractions = [
    { name: "Humberstone & Santa Laura", icon: Mountain, desc: "Ghost towns from the saltpeter era, UNESCO World Heritage since 2005. Theaters, swimming pools, houses and industrial machinery preserved in the desert — one of the most impactful historical experiences in South America.", badge: "UNESCO" },
    { name: "Cerro Dragón", icon: Wind, desc: "The 400-meter dune advancing over the city of Iquique — one of the few large urban dunes in the world. Sandboarding, paragliding and a Pacific Ocean view that no other city can offer.", badge: "Unique" },
    { name: "Historic District", icon: Camera, desc: "Iquique's historic center with wooden mansions from the saltpeter era, the Art Nouveau City Hall, the Municipal Theater (1890) and streets that transport you to the 19th century — living heritage in the middle of the modern city.", badge: "Heritage" },
    { name: "Playa Cavancha", icon: Waves, desc: "Iquique's most famous urban beach — surfers, families and the contrast between the deep blue Pacific and the Atacama dunes in the background. The place where the desert literally ends at the sea.", badge: "Beach" },
    { name: "ZOFRI — Free Trade Zone", icon: ShoppingBag, desc: "One of the largest free trade centers in Latin America, moving billions of dollars annually. Commercial link between Chile, Bolivia, Argentina, Brazil and Paraguay — the economic engine of northern Chile.", badge: "Commerce" },
    { name: "Iquique Regional Museum", icon: Star, desc: "From saltpeter to the present — collection from the mining era, the Battle of Iquique and the cultural identity of northern Chile. History told without romanticization, with depth.", badge: "Museum" },
    { name: "Paragliding on the Dunes", icon: Wind, desc: "The Atacama dunes create unique conditions for paragliding and hang gliding. The takeoff is from the dry desert and the landing is on the beach — an experience that exists in very few places on the planet.", badge: "Adventure" },
    { name: "Fishing Pier & Gastronomy", icon: Anchor, desc: "Iquique's fishing pier comes alive at dawn with boats, seagulls and fresh seafood. Caldillos, ceviches and conger eels prepared at waterfront restaurants with the day's catch.", badge: "Gastronomic" },
];

const dishes = [
    { name: "Nortino Ceviche", icon: Waves, desc: "The northern Chilean version of ceviche, with Peruvian influence — lemon, cilantro, ají and ultra-fresh seafood caught at the pier itself. Clean, mineral flavor of the pure Pacific.", tag: "Coastal" },
    { name: "Caldillo de Congrio", icon: Utensils, desc: "Pablo Neruda wrote an ode to this dish. Conger eel slowly cooked with potatoes, tomato and onion in a deep broth — the soul of Chilean seafood cuisine, most intense in Iquique.", tag: "Icon" },
    { name: "Seafood Empanadas", icon: Flame, desc: "Mussel, shrimp and clam in perfectly baked puff pastry. A classic of northern Chile's coast — sold on the corners of the historic district since saltpeter times.", tag: "Traditional" },
    { name: "Sea Urchin (Erizo)", icon: Waves, desc: "Considered a delicacy in northern Chile, sea urchin is eaten raw or with lemon. The Humboldt Current creates specimens of unique flavor — watery, mineral, deeply Pacific.", tag: "Special" },
    { name: "Chilean Pisco Sour", icon: Leaf, desc: "The symbolic battle: Chilean vs. Peruvian pisco. In Iquique, the pisco sour is drunk as a daily ritual — sour, frothy and fragrant. The drink that defines northern Chile.", tag: "Ritual" },
    { name: "Pier Soups & Stews", icon: Utensils, desc: "Iquique's fishing pier produces daily soups with whatever arrived before dawn — shrimp, scallop, mussel and fish. Caldillos that fishermen take in flasks out to sea.", tag: "Authentic" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "History & Heritage",
        morning: "Humberstone and Santa Laura at sunrise — the saltpeter ghost towns 47km from Iquique. The theater, the pool, the houses and the machinery preserved in the desert's silence. Living UNESCO.",
        afternoon: "Iquique's historic district — wooden mansions, Municipal Theater (1890), Art Nouveau City Hall and Plaza Prat. The wealth that saltpeter built still stands.",
        evening: "Dinner at the pier with caldillo de congrio and pisco sour. The Pacific at dusk — the Atacama sky shifts from blue to golden, then to violet and stars.",
        color: "from-amber-600 to-orange-700",
        icon: Mountain,
    },
    {
        day: "Day 2",
        theme: "Dunes & Ocean",
        morning: "Cerro Dragón at sunrise — the 400m dune advancing over the city. Sandboarding on the slopes, an immense Pacific view and the rare sensation of being in the desert and at the seaside at the same time.",
        afternoon: "Playa Cavancha — surfing, snorkeling and Iquique's intense coastal life. Surfers on a deep-blue sea with golden dunes in the background. The city that seems impossible.",
        evening: "Paragliding or hang gliding at day's end — taking off from the dune, flying over the city and landing on the beach. The experience that only Iquique offers in all of South America.",
        color: "from-sky-600 to-blue-700",
        icon: Wind,
    },
    {
        day: "Day 3",
        theme: "ZOFRI & Pacific",
        morning: "Santa María de Iquique School — monument to the 1907 massacre that changed Chile. A difficult and necessary memory. The city that did not forget its workers.",
        afternoon: "ZOFRI — the most dynamic free trade zone in northern Chile. Billions of dollars in trade, connection with Bolivia, Argentina and Brazil. Iquique's reinvention in the bioceanic era.",
        evening: "Last sunset over the Pacific. The ocean that the Bioceanic Route crossed a continent to reach. Fresh ceviche, pisco sour and the distant silence of the Atacama — crossing complete.",
        color: "from-teal-600 to-cyan-700",
        icon: ShoppingBag,
    },
];

const curiosities = [
    { text: "Iquique is one of the driest permanently inhabited cities in the world — the annual average rainfall is less than 1mm. The Pacific sea fog (camanchaca) is the only moisture the city ever knows." },
    { text: "Cerro Dragón is one of the few large urban dunes in the world — standing 400 meters tall, it advances toward the city at a measurable annual rate. Iquique lives with the desert in its backyard." },
    { text: "The Santa María de Iquique School massacre (1907) was the largest worker massacre in Latin America — 2,000 to 3,600 saltpeter workers and family members killed by the army. The event shaped Chilean trade unionism for generations." },
    { text: "Arturo Prat, hero of the Battle of Iquique (1879), boarded the Huáscar with only two men knowing he would die — the act became the greatest symbol of heroism in Chilean history. May 21 is a national holiday." },
    { text: "Humberstone and Santa Laura were declared UNESCO World Heritage Sites in 2005 — among the few protected industrial ghost towns in the world, preserving machinery, theaters and houses from the 19th century." },
    { text: "ZOFRI (Iquique Free Trade Zone) accounts for a significant share of the Tarapacá region's GDP and directly connects Chile to Bolivia, Argentina, Brazil and Paraguay — logistics that the Bioceanic Route strengthens." },
    { text: "Iquique is considered the paragliding and hang gliding capital of Chile — the Pacific's constant wind and the Atacama dunes create exceptional conditions. Pilots come from around the world to fly Iquique's dunes." },
    { text: "The cantata 'La Cantata Santa María de Iquique' (1970), by the group Quilapayún, is one of Chile's most important musical works — it narrated the 1907 massacre and became a symbol of Latin American cultural resistance." },
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
    const src = useInfographic("iquique");
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
                            alt="Iquique editorial infographic"
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
                            alt="Iquique editorial infographic"
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

export default function IquiquePageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Tarapacá Region"
                name={{ first: "Iquique", second: "" }}
                tagline="Historic port, 400-meter urban dune and the saltpeter memory that shaped modern Chile."
                scene="pacifico"
                image="/cities/iquique.jpg"
                accentColor="#fb923c"
                stats={[
                    { label: "Inhabitants", value: 235000 },
                    { label: "Urban dune (m)", value: 400, suffix: " m" },
                    { label: "UNESCO Humberstone", value: 2005 },
                    { label: "Km from Antofagasta", value: 310, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Iquique</SectionLabel>
                        <SectionTitle>
                            The city that saltpeter{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                built and the sea embraced
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Iquique has layers. Beneath the modern skyscrapers lie saltpeter-era wooden
                            mansions. Behind the beaches stands a 400-meter dune. Behind ZOFRI's global
                            trade lies the memory of two thousand massacred workers.{" "}
                            <strong className="text-primary-700">It is the second major Chilean gateway
                            of the Bioceanic Route</strong> — a city built by contradictions
                            that became its identity.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Mountain,
                                title: "UNESCO Heritage",
                                text: "Humberstone and Santa Laura — saltpeter ghost towns preserved in the desert since 1872. UNESCO since 2005. Living museums where machinery, theaters and houses tell the cycle that built northern Chile.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Wind,
                                title: "Cerro Dragón & Sports",
                                text: "The 400m dune advancing over the city creates unique conditions for paragliding, sandboarding and hang gliding. The desert starts at the last street and the Pacific starts at the next — Iquique has both.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI — Commercial Hub",
                                text: "The Iquique Free Trade Zone connects Chile, Bolivia, Argentina, Brazil and Paraguay in a world-class free trade center. The post-saltpeter reinvention that transformed Iquique into a South Pacific hub.",
                                color: "from-teal-50 to-cyan-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>From Saltpeter to ZOFRI</SectionLabel>
                        <SectionTitle light>
                            Layered history:{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                heroism, tragedy and reinvention
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Few cities have a history as dense as Iquique — naval battles,
                            worker massacres, wealth and decline, and a reinvention that continues.
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

            {/* ── HUMBERSTONE SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/18 via-transparent to-sky-900/12" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-amber-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(6,27,51,0.95) 60%, rgba(14,165,233,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                        <Mountain className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                                        World Heritage Site — UNESCO 2005
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Humberstone and Santa Laura
                                    <br />
                                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                        The saltpeter the desert preserved
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    47km from Iquique, two entire cities survive in the desert — frozen in time
                                    since saltpeter died. Theaters, swimming pools, houses, machines and schools
                                    preserved by the extreme aridity of the Atacama. In 2005, UNESCO recognized
                                    what the desert already knew: this industrial heritage is unique in the world.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Founded", val: "1872", sub: "Original Humberstone" },
                                        { label: "UNESCO since", val: "2005", sub: "Industrial Heritage" },
                                        { label: "Distance", val: "47 km", sub: "East of Iquique" },
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

            {/* ── DUALIDADE DUNA + MAR ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>A City of Extremes</SectionLabel>
                        <SectionTitle light>
                            Saltpeter, dune,{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-sky-300 bg-clip-text text-transparent">
                                Pacific and memory
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Cerro Dragón",
                                text: "400 meters of urban dune advancing over Iquique. Sandboarding, paragliding and the impossible view of desert + city + ocean in a single photo. It only exists here.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Beaches & Surfing",
                                text: "Playa Cavancha and other urban beaches with cold Pacific and waves that shape world-class surfers. The visual contrast with the dunes behind is unique in South America.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: ShoppingBag,
                                title: "ZOFRI",
                                text: "Billions of dollars annually in free trade. The Free Trade Zone connects the entire southern cone — Chile, Bolivia, Argentina, Brazil and Paraguay. Iquique's reinvention in the 21st century.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Anchor,
                                title: "Workers' Memory",
                                text: "The Santa María School and the Quilapayún Cantata — the 1907 massacre that was never forgotten. Iquique remembers because the memory of its workers is its deepest identity.",
                                accent: "text-red-400",
                                iconBg: "bg-red-500/15",
                                border: "border-red-500/20",
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
                        <SectionLabel>Flavors of Northern Chile</SectionLabel>
                        <SectionTitle>
                            Cuisine{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                of the pier and the desert
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

            {/* ── ATRAÇÕES ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations & Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                            3 days in{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Iquique and surroundings
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
                            Facts about{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                Iquique
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
                                title: "Getting There",
                                items: [
                                    "Diego Aracena International Airport — flights from Santiago (2h), Lima and other capitals",
                                    "Bus from Santiago (~24h) or Antofagasta (~4h) via Ruta 1 Norte",
                                    "Ruta 1 (Panamericana Norte) — coastal connection along the entire northern Chilean coast",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "Year-round — Iquique receives less than 1mm of rain per year and the sky is almost always clear",
                                    "November to April: milder sea temperature for surfing and diving",
                                    "Winter (June–August): constant wind — ideal for paragliding and hang gliding",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Currency: Chilean Peso — favorable exchange rate for travelers with USD/BRL/EUR",
                                    "Altitude: city at sea level, but Humberstone is at 1,000m — layered clothing recommended",
                                    "Language: Chilean Spanish — distinct and fast accent, but easy to communicate",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
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
                    style={{ background: "linear-gradient(135deg, #1c0a00 0%, #78350f 35%, #92400e 65%, #b45309 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/12 rounded-full blur-[90px]" />
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
                            Iquique is waiting for you
                        </h2>
                        <p className="text-amber-200/70 text-lg max-w-xl mx-auto mb-10">
                            Where the tallest dune kisses the deepest ocean. The second great gateway of the
                            Bioceanic Route — saltpeter, memory and the reinvention of a city that never stops.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-900 font-bold rounded-2xl hover:bg-amber-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/cidades/antofagasta"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore Antofagasta <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
