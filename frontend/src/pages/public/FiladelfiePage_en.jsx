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
    BookOpen, Heart,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "1930s",
        icon: Globe,
        title: "The Flight and Arrival in the Chaco",
        color: "from-lime-700 to-green-800",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Fleeing totalitarian regimes in Russia, Ukraine, and Germany, Mennonite families embarked on one of the greatest migratory journeys of the twentieth century. Paraguay offered them what they sought: religious freedom, cultural autonomy, and land in the Chaco — considered inhospitable by everyone. They accepted the challenge.",
        symbol: "Arrival of the first Mennonite settlers",
    },
    {
        era: "1930–1950",
        icon: Heart,
        title: "Building from Scratch in the Desert",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Extreme heat, drought, total isolation, and lack of infrastructure. The early years were pure survival. But the Mennonites brought something no adversity could defeat: collective organization, faith, and work discipline. Well by well, plantation by plantation, the city began to take shape.",
        symbol: "First wells and plantations in the Chaco",
    },
    {
        era: "1950–1980",
        icon: Leaf,
        title: "Fernheim Cooperative and the Agricultural Miracle",
        color: "from-emerald-700 to-teal-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "The Fernheim Cooperative became the engine of transformation for the region. They produced milk, cheeses, and cured meats recognized throughout Paraguay. They built schools, hospitals, and roads. The arid Chaco began to flourish — and Filadelfia emerged as the ultimate symbol of South American cooperativism.",
        symbol: "Fernheim Cooperative — continental reference",
    },
    {
        era: "Today",
        icon: Compass,
        title: "Regional Hub and Bioceanic Gateway",
        color: "from-lime-600 to-olive-700",
        accent: "text-lime-400",
        border: "border-lime-500/30",
        body: "Filadelfia is today the economic center of the Paraguayan Chaco. With the Bioceanic Route PY-15 passing through it, the city is preparing for a new cycle of development: a logistics hub, international tourist destination, and connection between the Atlantic and the Pacific. Historical isolation transforms into continental integration.",
        symbol: "Route PY-15 — Bioceanic Corridor",
    },
];

const attractions = [
    { name: "Jakob Unger Museum", icon: BookOpen, desc: "The Chaco's main memory space. Preserves historical documents, objects from the first settlers, immigration records, and memories of the Chaco War.", badge: "History" },
    { name: "Fernheim Cooperative", icon: Heart, desc: "One of the most influential cooperatives in South America. Visiting its facilities means understanding how a community transformed the arid Chaco into an agro-industrial hub.", badge: "Culture" },
    { name: "Mennonite Architecture", icon: Globe, desc: "Buildings that seem to transport visitors to a small Central European town. Churches, homes, and shops with distinctive, preserved architecture in the middle of the Chaco.", badge: "Heritage" },
    { name: "Dairy and Cheese Factory", icon: Utensils, desc: "Artisanal production of cheeses and cured meats recognized as the best in Paraguay. Tours of the cooperative's facilities with product tastings.", badge: "Gastronomy" },
    { name: "Chaco Landscape", icon: Mountain, desc: "Golden fields, windmills on the horizon, roads that disappear into the vastness. Sunset in Filadelfia with the sky painted orange is a unique spectacle.", badge: "Nature" },
    { name: "Indigenous Communities", icon: Star, desc: "The Nivaclé and Enlhet peoples live near the city, preserving ancestral knowledge of the Chaco — crafts in natural fibers and traditional medicine.", badge: "Culture" },
    { name: "Dry Chaco Wildlife", icon: Camera, desc: "Anteaters, armadillos, pumas, macaws, rheas, and caimans in their natural habitat. The biological diversity of the Chaco surprises first-time visitors.", badge: "Wildlife" },
    { name: "Historic Churches", icon: Heart, desc: "Filadelfia's Mennonite churches are the spiritual and cultural center of the community — simple architecture, but of deep symbolism for those who built the Chaco.", badge: "Spiritual" },
];

const dishes = [
    { name: "Kuchen", icon: Utensils, desc: "Traditional German cakes made with centuries-old recipes brought from Central Europe. Found in every home and bakery in Filadelfia — sweet identity in every slice.", tag: "European" },
    { name: "Artisanal Cured Meats", icon: Flame, desc: "Sausages, salamis, and smoked meats produced with recipes preserved by Mennonite families for generations. Flavors of Europe that survived the Chaco.", tag: "Tradition" },
    { name: "Cheeses and Dairy", icon: Leaf, desc: "Recognized as the best in Paraguay. The Fernheim Cooperative's dairy production turned Filadelfia into the Chaco's dairy capital.", tag: "Cooperative" },
    { name: "Chipa", icon: Utensils, desc: "Paraguayan cheese bread meets European tradition. In the Chaco, chipa is eaten warm at breakfast alongside tereré — a genuine fusion.", tag: "Fusion" },
    { name: "Chaco Meats", icon: Flame, desc: "Cuts prepared with the slow technique of the European rural tradition adapted to the Chaco. Intense flavors from Mennonite extensive cattle ranching.", tag: "Rural" },
    { name: "Tereré", icon: Leaf, desc: "The tereré gourd crosses cultural borders. In Filadelfia, the Paraguayan drink is embraced by the Mennonite community — a symbol of the Chaco's cultural integration.", tag: "Integration" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Memory and Identity",
        morning: "Jakob Unger Museum: an immersion in the history of Mennonite immigration. Documents, photos, and objects that tell the story of those who arrived in the Chaco with faith and transformed the desert.",
        afternoon: "City walk: European architecture, historic churches, and the singular rhythm of Filadelfia. A city that seems improbable in the middle of the Paraguayan Chaco.",
        evening: "Mennonite dinner: kuchen, artisanal cured meats, cooperative cheeses, and tereré. Tasting Filadelfia means understanding how cultures meet and transform each other.",
        color: "from-lime-600 to-green-700",
        icon: BookOpen,
    },
    {
        day: "Day 2",
        theme: "Cooperativism and Production",
        morning: "Visit to the Fernheim Cooperative: dairy, cheese factory, and artisanal production facilities. Seeing up close the model that turned the Chaco into an agro-industrial reference.",
        afternoon: "Chaco fields: xerophytic vegetation landscapes, native wildlife, and the infinite horizon of South America's largest plain. Sunset with golden light over the windmills.",
        evening: "Chaco starry sky — with no light pollution, one of the most impressive on the continent. Absolute silence that only those who have lived far from cities can imagine.",
        color: "from-amber-600 to-yellow-700",
        icon: Leaf,
    },
    {
        day: "Day 3",
        theme: "Peoples and Integration",
        morning: "Nivaclé indigenous communities: crafts in natural fibers, ancestral Chaco medicine, and a worldview that contrasts and complements Mennonite culture.",
        afternoon: "Fusion gastronomy: lunch with recipes that unite Europe and Paraguay. Shopping for cured meats, cheeses, and crafts to take Filadelfia's memory home.",
        evening: "Farewell on Route PY-15 at sunset — the corridor connecting Filadelfia to the continent. The Chaco that flourished now looks toward both oceans.",
        color: "from-emerald-600 to-teal-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Filadelfia was built by Mennonite immigrants who fled persecution in Russia and Ukraine in the 1930s — finding in the Paraguayan Chaco the freedom they were seeking." },
    { text: "The Fernheim Cooperative is one of the oldest and most influential cooperatives in South America — a model studied at universities of management and rural development worldwide." },
    { text: "Four languages coexist in Filadelfia: German, Plautdietsch (Mennonite dialect), Spanish, and Guarani — probably the place with the greatest linguistic diversity per capita in South America." },
    { text: "The cheeses and dairy products made in Filadelfia are recognized as the best in Paraguay — exported across the country from a city in the middle of the desert." },
    { text: "The city features architecture reminiscent of a small Central European town — a striking visual shock for those who arrive after hours crossing the arid Chaco." },
    { text: "During the Chaco War (1932–1935), the Mennonite community provided logistical support to the Paraguayan army — an episode that cemented a relationship of trust with the Paraguayan state." },
    { text: "The Jakob Unger Museum preserves one of the most complete historical collections on Mennonite immigration in South America — a unique testament to one of history's most improbable migrations." },
    { text: "The Bioceanic Route PY-15 passes through Filadelfia, transforming it from an isolated desert town into a strategic link in the logistics corridor between the Atlantic and the Pacific." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-lime-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("filadelfia");
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
                            alt="Editorial infographic Filadelfia"
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
                            alt="Editorial infographic Filadelfia"
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

export default function FiladelfiPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Boquerón Department"
                name={{ first: "Filadelfia", second: "" }}
                tagline="Mennonite colony that transformed the Chaco desert into an agro-industrial hub."
                scene="chaco"
                image="/cities/filadelfia.jpg"
                accentColor="#84cc16"
                stats={[
                    { label: "Inhabitants (estimate)", value: 14000 },
                    { label: "Mennonite founding", value: 1930 },
                    { label: "Languages spoken", value: 4 },
                    { label: "Km from Asunción", value: 480, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Filadelfia</SectionLabel>
                        <SectionTitle>
                            Where Europe flourished in the{" "}
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                heart of the Chaco
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Filadelfia is one of the most singular cities in South America. Built by Mennonite immigrants
                            who fled persecution in Europe, it transformed the arid Chaco into one of the most impressive
                            examples of{" "}
                            <strong className="text-primary-700">cooperativism, resilience, and cultural identity</strong>{" "}
                            on the continent. European cheeses, windmills on the horizon, and tereré circles — Filadelfia
                            never stops surprising.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Heart,
                                title: "Cooperativism",
                                text: "The Fernheim Cooperative is the model that transformed the Chaco. Dairy, agriculture, education, and infrastructure — all built collectively by a community that refused isolation.",
                                color: "from-lime-50 to-green-50",
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Globe,
                                title: "European Identity",
                                text: "Architecture, gastronomy, language, and values of Central Europe preserved in the middle of the Chaco. Four languages coexist on the streets — German, Plautdietsch, Spanish, and Guarani.",
                                color: "from-amber-50 to-yellow-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Compass,
                                title: "Bioceanic Gateway",
                                text: "Route PY-15 crosses Filadelfia, connecting it to the Bioceanic Corridor. From an isolated desert city to the strategic link between the Atlantic and the Pacific.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>From Europe to the Heart of the Chaco</SectionLabel>
                        <SectionTitle light>
                            A journey of{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                faith and transformation
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Filadelfia was built layer by layer — by immigrants who arrived with nothing and
                            created one of the most extraordinary examples of human development in South America.
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

            {/* ── COOPERATIVA SPOTLIGHT ────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-900/15 via-transparent to-green-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-lime-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(132,204,22,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(34,197,94,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/20 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-lime-400 uppercase tracking-widest">
                                        Continental Model
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Fernheim Cooperative
                                    <br />
                                    <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                        The miracle of the Chaco
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    The Fernheim Cooperative is the economic and social heart of Filadelfia. Founded by
                                    the first Mennonite settlers, it built schools, hospitals, roads, and a dairy
                                    industry recognized throughout Paraguay. Its collective management model is studied
                                    as a reference for sustainable development in South America.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Dairy", val: "No. 1 PY", sub: "Cheeses and dairy products" },
                                        { label: "Languages", val: "4", sub: "German · Plautdietsch · ES · Guarani" },
                                        { label: "Route", val: "PY-15", sub: "Bioceanic Corridor" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-lime-500/10">
                                            <div className="text-2xl font-bold text-lime-300 font-display mb-1">{stat.val}</div>
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

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-lime-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Europe in the Chaco</SectionLabel>
                        <SectionTitle light>
                            Mennonite culture{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                and identity
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: BookOpen,
                                title: "Historical Preservation",
                                text: "Jakob Unger Museum, historic churches, and documents that preserve the memory of immigration — one of the most complete collections on Mennonites in South America.",
                                accent: "text-lime-400",
                                iconBg: "bg-lime-500/15",
                                border: "border-lime-500/20",
                            },
                            {
                                icon: Globe,
                                title: "Multilingualism",
                                text: "German, Plautdietsch, Spanish, and Guarani coexist on streets, in schools, and in markets. Filadelfia is a living laboratory of cultural coexistence in the Chaco.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Collective Work",
                                text: "The Mennonite work ethic turned the Chaco into a symbol of prosperity. Organization, discipline, and cooperation as founding values passed down to new generations.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Star,
                                title: "Multiculturalism",
                                text: "European Mennonites, Nivaclé and Enlhet peoples, Paraguayans, and migrants — Filadelfia integrated distinct cultures into a new and singular identity, unique to the Chaco.",
                                accent: "text-yellow-400",
                                iconBg: "bg-yellow-500/15",
                                border: "border-yellow-500/20",
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
                        <SectionLabel>A Meeting Between Europe and Paraguay</SectionLabel>
                        <SectionTitle>
                            Gastronomy of{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                two worlds
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
                                    <div className="w-10 h-10 rounded-2xl bg-lime-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-lime-700" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-700 bg-lime-100 px-3 py-1 rounded-full">
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
                    <div className="absolute top-0 left-0 w-80 h-80 bg-lime-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations and Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-lime-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-lime-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-xs font-bold text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-lime-500 to-green-600 bg-clip-text text-transparent">
                                in the Chaco that flourished
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-lime-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Fun facts about{" "}
                            <span className="bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">
                                Filadelfia
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
                                <div className="w-7 h-7 rounded-xl bg-lime-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-lime-400" />
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
                                    "Route PY-09 (Transchaco) from Asunción — ~450 km (4–5h)",
                                    "Route PY-15 from Mariscal Estigarribia or Carmelo Peralta",
                                    "Regular buses from Asunción to Filadelfia via Transchaco",
                                ],
                                accent: "text-lime-700",
                                iconBg: "bg-lime-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "May to August: mild winter, ideal for Chaco crossings",
                                    "June and July: pleasant temperatures, greener fields",
                                    "Avoid December–February: extreme heat (+45°C) and difficult roads",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Currency: Paraguayan Guarani — exchange available in the city",
                                    "Hotels and infrastructure more developed than other Chaco towns",
                                    "Markets with cheeses, cured meats, and cooperative products",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
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
                    style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/12 rounded-full blur-[90px]" />
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
                            Filadelfia is waiting for you
                        </h2>
                        <p className="text-lime-200/70 text-lg max-w-xl mx-auto mb-10">
                            The European soul of the Paraguayan Chaco. Where cooperativism turned a desert
                            into an example and isolation became continental integration.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-2xl hover:bg-green-50 transition-colors text-sm"
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
