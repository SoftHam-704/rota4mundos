import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight, MapPin, Users, Ruler, Calendar,
    Train, Fish, Trees, Leaf, Utensils, Music, Camera,
    Clock, Phone, Flame, Star, ChevronRight, Globe,
    Building2, GraduationCap, Plane, ZoomIn, X,
} from "lucide-react";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";

/* ─── data ──────────────────────────────────────────────────── */

const ferrovia = {
    antes: "1,800 inhab.",
    depois: "50,000 inhab.",
    prazo: "< 10 years",
    ano: "1914",
    detalhe: "The Northwest Brazil Railway (EFNOB) reached Campo Grande on October 14, 1914, connecting Bauru (SP) to Corumbá. The impact was immediate: the village became the largest city in the Center-West in less than a generation. The railway complex — 135 buildings across 22.3 hectares — was listed by IPHAN in 2009 as national cultural heritage.",
};

const imigrantes = [
    {
        povo: "Okinawans",
        flag: "🇯🇵",
        quando: "From 1908 onward",
        legado: "The 3rd largest Japanese colony in Brazil — and the most Okinawan. They brought sobá, Japanese tereré, matsuri festivals, and a culinary tradition that is now the gastronomic DNA of the city.",
        simbolo: "Sobá · Bon Odori · Japan Festival MS",
        color: "from-red-700 to-rose-800",
        border: "border-red-500/30",
        accent: "text-red-300",
    },
    {
        povo: "Syrians and Lebanese",
        flag: "🇱🇧",
        quando: "From 1894 onward",
        legado: "They arrived as peddlers and became merchants and industrialists. Their legacy lives in the streets of the historic center and on the campo-grandense table: esfiha, kibbe, kafta, and belewa.",
        simbolo: "Esfiha · Kibbe · Downtown Commerce",
        color: "from-green-700 to-emerald-800",
        border: "border-green-500/30",
        accent: "text-green-300",
    },
    {
        povo: "Paraguayans",
        flag: "🇵🇾",
        quando: "Ongoing",
        legado: "80,000 Paraguayans live in Campo Grande — the largest concentration outside Paraguay. They brought the language, everyday Guaraní, chipa, Paraguayan soup, and tereré as a daily habit.",
        simbolo: "Chipa · Paraguayan Soup · Tereré UNESCO",
        color: "from-blue-700 to-indigo-800",
        border: "border-blue-500/30",
        accent: "text-blue-300",
    },
    {
        povo: "Gaúchos and Northeasterners",
        flag: "🇧🇷",
        quando: "20th century",
        legado: "Gaúchos brought chimarrão and ranch culture. Northeasterners brought religiosity, June festivals, and backlands cuisine. All merged into the morena identity of the city.",
        simbolo: "Churrasco · Saddle Gear · June Festivals",
        color: "from-amber-700 to-orange-800",
        border: "border-amber-500/30",
        accent: "text-amber-300",
    },
];

const dishes = [
    {
        name: "Sobá",
        icon: Utensils,
        badge: "IPHAN Heritage",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "Handmade noodles cooked in osso buco broth, with pork, sliced omelette, and green onion. Created by Okinawans in the 1910s and listed by IPHAN as intangible cultural heritage of Brazil. Served at the Central Market, Wednesday through Sunday.",
    },
    {
        name: "Chipa",
        icon: Flame,
        badge: "Border",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Paraguayan cheese bread made with tapioca starch — firmer and more flavorful than the Minas cheese bread. Found all over the city from dawn — bakeries, street corners, markets, and snack bars.",
    },
    {
        name: "Paraguayan Soup",
        icon: Utensils,
        badge: "Border",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "The name is misleading: it is not liquid. It is a dense, moist savory cake made with cornmeal, semi-cured cheese, onion, and eggs — a mandatory side dish at Sul-Mato-Grossense barbecues.",
    },
    {
        name: "Grilled Pacu",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "The symbol fish of the Pantanal, grilled whole over embers with a kale farofa stuffing. Along with pintado and dourado, it is a staple at Sunday lunches.",
    },
    {
        name: "Pintado Stew",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "Pantanal-style fish stew with pintado cooked in cassava, tomato, and onion. The cassava starch naturally thickens the broth into a velvety, deeply flavored cream.",
    },
    {
        name: "Tereré",
        icon: Leaf,
        badge: "UNESCO 2020",
        badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Yerba mate in ice-cold water, served in a horn cup with a metal bombilla straw. Recognized by UNESCO in 2020 as Intangible Cultural Heritage of Humanity. Enjoyed daily in circles at plazas, offices, and sidewalks.",
    },
    {
        name: "Arroz Carreteiro",
        icon: Flame,
        badge: "Pantaneiro",
        badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        desc: "A legacy of Pantanal cattle drives: rice with chunks of sun-dried beef, sometimes served with fried plantain. Smoky flavor and simplicity that tell the story of the cowboys who crossed the Pantanal.",
    },
    {
        name: "Furrundu",
        icon: Star,
        badge: "Rarity",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "A one-of-a-kind sweet — papaya stem cooked with raw cane sugar and spices until it becomes a dark, aromatic preserve. A rarity found at artisan fairs. Once tasted, never forgotten.",
    },
];

const attractions = [
    {
        name: "BIOPARQUE Pantanal",
        icon: Fish,
        badge: "World Record",
        badgeStyle: "bg-secondary-500/20 text-secondary-300 border-secondary-500/30",
        desc: "The world's largest freshwater aquarium, opened in 2022. Nearly 5 million liters, 220 neotropical species, 100 bred in captivity — 29 for the first time in the world. Free entry with prior booking.",
        detail: "Parque das Nações Indígenas · Tue–Sat 8:30am–5:30pm",
    },
    {
        name: "Parque das Nações Indígenas",
        icon: Trees,
        badge: "1.16 km²",
        badgeStyle: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "One of the largest urban parks in Brazil. 4 km track, lake, BIOPARQUE, Helena Meirelles Acoustic Shell, Museu Dom Bosco, and Museum of Contemporary Art.",
        detail: "Monday to Sunday · 6am–9pm · Free entry",
    },
    {
        name: "Central Market",
        icon: Utensils,
        badge: "Founded 1925",
        badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "The gastronomic and cultural heart of the city. 28 restaurants serving sobá, chipa, Paraguayan soup, crafts, and craft beer at the Old Railway Station. The giant bowl statue is the most beloved photo spot.",
        detail: "Wednesday–Sunday · from 4pm",
    },
    {
        name: "EFNOB Railway Complex",
        icon: Train,
        badge: "IPHAN Heritage",
        badgeStyle: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        desc: "135 historic buildings across 22.3 hectares — listed by IPHAN in 2009. The Railway Memorial tells the story of the leap from 1,800 to 50,000 inhabitants that the railway triggered in less than a generation.",
        detail: "Historic center · Free to visit",
    },
    {
        name: "Parque dos Poderes",
        icon: Trees,
        badge: "140 ha of Cerrado",
        badgeStyle: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Home of the state government within a 140-hectare ecological reserve. Capybaras, coatis, macaws, toucans, and anteaters roam freely between the government buildings. One of the most surreal experiences in Brazilian urban tourism.",
        detail: "Administrative hours · Wildlife most active at dawn",
    },
    {
        name: "Dom Bosco Cultures Museum",
        icon: Camera,
        badge: "Since 1951",
        badgeStyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "Salesian collection founded in 1950 with rare indigenous ethnology pieces: Kadiwéu ceramics, Bororo ornaments, Terena artifacts. One of the most important indigenous museums in Brazil.",
        detail: "Tue–Fri 8am–5pm · Sat & holidays 2pm–6pm",
    },
    {
        name: "Museu José Antônio Pereira",
        icon: Building2,
        badge: "1877",
        badgeStyle: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        desc: "The restored Fazenda Bálsamo — the only surviving example of 1877 colonial architecture in the city. The founding family's utensils, the water mill, and the ox cart transport visitors to Campo Grande of 1875.",
        detail: "Tue–Sun 9am–5pm · Av. Guaicurus",
    },
    {
        name: "Immigrant Monument",
        icon: Globe,
        badge: "1979",
        badgeStyle: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "A full-scale replica of a typical Japanese house at Praça da República. Inaugurated in 1979 to mark 70 years of Okinawan immigration — a public declaration of gratitude to those who built the city.",
        detail: "Praça da República · Downtown",
    },
];

const personalidades = [
    {
        nome: "José Antônio Pereira",
        anos: "1821–1899",
        papel: "Founder",
        hist: "A cattleman from Minas Gerais who arrived at the confluence of the Prosa and Segredo streams on June 21, 1872, with 62 people. He ordered the first church built in 1877 and did not live to see the city become a state capital — he died the same year as its emancipation.",
        emoji: "🏗️",
    },
    {
        nome: "Jânio Quadros",
        anos: "1917–1992",
        papel: "President of Brazil",
        hist: "Born in Campo Grande on January 25, 1917. Lawyer, teacher, mayor of São Paulo, governor, and President of the Republic in 1961 — the one who resigned after 7 months in a gesture that still divides historians.",
        emoji: "🏛️",
    },
    {
        nome: "Almir Sater",
        anos: "Born 1956",
        papel: "Musician · Viola Caipira",
        hist: "Born in Campo Grande on November 14, 1956. Author of \"Tocando em Frente\" (with Renato Teixeira), one of the most recorded songs in Brazilian popular music. Also an actor in the Pantanal telenovela (Globo, 1990).",
        emoji: "🎵",
    },
    {
        nome: "Tetê Espíndola",
        anos: "Born in Campo Grande",
        papel: "Singer · Brazilian Popular Music",
        hist: "With the group Lírio Selvagem, she revolutionized Brazilian popular music in the 1970s and 1980s, blending Cerrado, Pantanal, and avant-garde in an unmistakable voice recognized across Brazil.",
        emoji: "🎤",
    },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Memory & Table",
        morning: "Arrival. Visit the Museu José Antônio Pereira (1877) and the EFNOB Railway Complex. Coffee with chipa at a local bakery.",
        afternoon: "Afonso Pena Avenue and the Dom Bosco Cultures Museum. Stop at the Immigrant Monument at Praça da República.",
        evening: "Central Market from 4pm: classic sobá, Paraguayan soup, oven-baked chipa, and tereré. The most campo-grandense gastronomic ritual there is.",
        color: "from-amber-600 to-orange-700",
        icon: Utensils,
    },
    {
        day: "Day 2",
        theme: "Nature & Records",
        morning: "BIOPARQUE Pantanal (advance booking required). Allow 2h with the specialist guide — the submerged corridors are one of the most impactful experiences in Brazilian tourism.",
        afternoon: "Walk through Parque das Nações Indígenas (4 km around the lake). Herons, capybaras, macaws, and coatis roaming free just meters from the city center.",
        evening: "Dinner at a Nikkei restaurant featuring Pantanal ingredients: pintado sashimi, smoked pacu temaki.",
        color: "from-teal-600 to-emerald-700",
        icon: Fish,
    },
    {
        day: "Day 3",
        theme: "Wildlife & Departure",
        morning: "Parque dos Poderes at dawn (6am): anteaters, macaws, and capybaras among the government buildings. One of the most surreal experiences in urban Brazil.",
        afternoon: "Mercadão Municipal: yerba mate, packaged chipa, furrundu sweets, indigenous crafts. Lunch with grilled pacu or pintado stew.",
        evening: "Departure toward the next stop on the Bioceanic Route: Bonito (297 km) or Porto Murtinho (439 km).",
        color: "from-blue-600 to-indigo-700",
        icon: Trees,
    },
];

const curiosities = [
    { emoji: "🌳", text: "Brazil's most tree-lined capital — 91% of streets have shade. Real-time tree monitoring technology in active use." },
    { emoji: "🐟", text: "The BIOPARQUE holds the world's largest freshwater aquarium — free entry. 29 captive breeding projects were firsts in the world." },
    { emoji: "🍜", text: "Sobá is the only foreign-origin dish so thoroughly adapted that it became an intangible cultural heritage of Brazil (IPHAN)." },
    { emoji: "🚂", text: "The 1914 railway multiplied the population 28-fold in under 10 years: from 1,800 to 50,000 inhabitants." },
    { emoji: "🇯🇵", text: "Campo Grande's Japanese community is Okinawan — culturally distinct from mainland Japan, with its own language and cuisine." },
    { emoji: "🧉", text: "Campo Grande's tereré was recognized by UNESCO in 2020 as Intangible Cultural Heritage of Humanity." },
    { emoji: "🏛️", text: "Jânio Quadros — the president who resigned after 7 months — was born in Campo Grande on January 25, 1917." },
    { emoji: "🇵🇾", text: "80,000 Paraguayans live in Campo Grande — the largest concentration of Paraguayans outside Paraguay itself." },
];

/* ─── helpers ────────────────────────────────────────────────── */
function SLabel({ children }) {
    return (
        <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-3">
            {children}
        </motion.span>
    );
}
function STitle({ children, light = false, className = "" }) {
    return (
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${light ? "text-white" : "text-primary-950"} ${className}`}>
            {children}
        </motion.h2>
    );
}

/* ─── infográfico lightbox ───────────────────────────────────── */
function InfograficoSection() {
    const src = useInfographic("campo-grande");
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
                            alt="Campo Grande editorial infographic"
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
                            alt="Campo Grande editorial infographic"
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
export default function CampoGrandePageEn() {
    const ferroviaRef = useRef(null);
    const ferroviaInView = useInView(ferroviaRef, { once: true, margin: "-80px" });

    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <CityHero
                country="Brazil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul · State Capital"
                name={{ first: "Campo", second: "Grande" }}
                tagline="The Morena Capital — gateway to the Pantanal and hub of the Bioceanic Route."
                scene="pantanal"
                image="/cities/campo_grande.jpg"
                accentColor="#F4A261"
                stats={[
                    { label: "Inhabitants (2022 Census)", value: 916, suffix: "k" },
                    { label: "Elevated to municipality", value: 1899 },
                    { label: "Territory (km²)", value: 8082 },
                    { label: "Km to Porto Murtinho", value: 439 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── CAPITAL MORENA ───────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SLabel>Who is Campo Grande</SLabel>
                        <STitle>
                            The soil that gave name{" "}
                            <span className="text-gradient">to an identity</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-lg text-slate-500 leading-relaxed">
                            The iron oxide-reddened latosol that covers Campo Grande's territory is not just geology — it is identity. When it rains, the streets turn ochre. When the heat dries the earth, reddish dust floats in the air.{" "}
                            <strong className="text-primary-700">The people called it dark earth. The city became the Morena Capital.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Train, title: "Bioceanic Route Hub", text: "439 km from the binational bridge over the Paraguay River (75% complete in 2026), Campo Grande is the largest urban center on the bioceanic corridor on the Brazilian side — with highways BR-060, BR-163, and BR-262 converging in the city.", color: "from-blue-50 to-indigo-50", acc: "text-blue-700", ib: "bg-blue-100" },
                            { icon: Globe, title: "Gateway to the Pantanal", text: "Miranda is 207 km away, Bonito 297 km, the heart of the Southern Pantanal less than 3 hours by car. Campo Grande is the departure point for all major ecological itineraries of the world's largest floodplain, a UNESCO World Heritage Site.", color: "from-teal-50 to-emerald-50", acc: "text-teal-700", ib: "bg-teal-100" },
                            { icon: Users, title: "The City of Encounters", text: "Okinawan Japanese, Syrian-Lebanese, Paraguayans, Gaúchos, Northeasterners, and Pantaneiros formed, over 150 years, the most plural identity in the Center-West. The result is in the food, the festivals, and the accent.", color: "from-amber-50 to-orange-50", acc: "text-amber-700", ib: "bg-amber-100" },
                        ].map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${p.color}`}>
                                <div className={`w-12 h-12 rounded-2xl ${p.ib} flex items-center justify-center mb-5`}>
                                    <p.icon className={`w-6 h-6 ${p.acc}`} />
                                </div>
                                <h3 className={`font-display text-xl font-bold ${p.acc} mb-3`}>{p.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FERROVIA ─────────────────────────────────────── */}
            <section ref={ferroviaRef} className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SLabel>October 14, 1914</SLabel>
                            <STitle light>
                                The railway that{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    multiplied the city
                                </span>
                            </STitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8">
                                {ferrovia.detalhe}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="flex items-center gap-3 text-sm text-secondary-400/70">
                                <Train className="w-4 h-4" />
                                <span>Complex listed by IPHAN in 2009 as National Cultural Heritage</span>
                            </motion.div>
                        </div>

                        {/* Dramatic counter */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Before the railway", val: "1,800", sub: "inhabitants", color: "from-slate-700 to-slate-800", icon: Users },
                                { label: "Less than 10 years", val: "→", sub: ferrovia.ano, color: "from-secondary-600 to-orange-700", icon: Train },
                                { label: "After the railway", val: "50,000", sub: "inhabitants", color: "from-teal-700 to-emerald-800", icon: Users },
                            ].map((c, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={ferroviaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{ delay: 0.15 * i, duration: 0.6 }}
                                    className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 text-center`}>
                                    <c.icon className="w-5 h-5 text-white/60 mx-auto mb-3" />
                                    <div className="font-display text-2xl md:text-3xl font-bold text-white">{c.val}</div>
                                    <div className="text-white/50 text-xs mt-1">{c.sub}</div>
                                    <div className="text-white/30 text-[10px] mt-2 uppercase tracking-wide">{c.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── IMIGRANTES ───────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>150 years of encounters</SLabel>
                        <STitle>
                            The peoples who{" "}
                            <span className="text-gradient">built the city</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            Campo Grande is, by definition, a city of encounters. Its cultural identity is an unlikely — and extraordinarily rich — synthesis of peoples, languages, religions, and cuisines that arrived in successive waves over 150 years.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {imigrantes.map((im, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.5 }}
                                className={`rounded-3xl border ${im.border} bg-primary-950 overflow-hidden`}>
                                <div className={`h-2 bg-gradient-to-r ${im.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl">{im.flag}</span>
                                                <h3 className="font-display text-xl font-bold text-white">{im.povo}</h3>
                                            </div>
                                            <span className={`text-xs font-semibold ${im.accent} uppercase tracking-wider`}>{im.quando}</span>
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{im.legado}</p>
                                    <div className={`text-xs font-medium ${im.accent} flex items-center gap-2`}>
                                        <Star className="w-3 h-3" />
                                        {im.simbolo}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOBÁ — DESTAQUE EDITORIAL ────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-700/8 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SLabel>Intangible Cultural Heritage of Brazil · IPHAN</SLabel>
                            <STitle light>
                                Sobá:{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    the soul of the city in a bowl
                                </span>
                            </STitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="space-y-4 text-white/60 text-sm leading-relaxed">
                                <p>
                                    The first Okinawans who arrived in Campo Grande in the 1910s prepared sobá for their own consumption — they were <strong className="text-white/80">ashamed to eat the dish in public</strong>, fearing the puzzled reactions of their neighbors. For years, the noodles stayed confined to the community's kitchens.
                                </p>
                                <p>
                                    The turning point was <strong className="text-white/80">Hiroshi Katsuren</strong>, the pioneer who brought sobá to the Central Market. When campo-grandenses tasted it, the response was immediate. The broth was adapted with osso buco, pork was added, and sliced omelette became the garnish. Sobá became campo-grandense.
                                </p>
                                <p className="text-secondary-400 font-medium italic">
                                    In 2006, Municipal Decree No. 9,685 declared Campo Grande's sobá an Intangible Cultural Asset. IPHAN recognized it as intangible cultural heritage of Brazil — the only foreign-origin dish to receive that status in the country.
                                </p>
                            </motion.div>
                        </div>

                        {/* What it is */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-secondary-500/20 flex items-center justify-center">
                                    <Utensils className="w-5 h-5 text-secondary-400" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-white">What is Campo Grande Sobá</div>
                                    <div className="text-white/40 text-xs">Municipal Decree 9,685 / 2006 · IPHAN</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { item: "Noodles", desc: "Handmade, thick and firm — different from mainland Japanese soba (buckwheat)" },
                                    { item: "Broth", desc: "Rich, made from beef osso buco, slowly simmered until the flavor develops depth and body" },
                                    { item: "Protein", desc: "Pork and beef chunks, sometimes shredded dried beef" },
                                    { item: "Garnish", desc: "Omelette cut into thin strips, generously topped with chopped green onion" },
                                    { item: "Where to eat", desc: "Central Market — 28 specialist restaurants, Wednesday to Sunday from 4pm" },
                                ].map((r, i) => (
                                    <div key={i} className="flex gap-3 py-3 border-b border-white/5 last:border-0">
                                        <div className="w-24 flex-shrink-0 font-semibold text-secondary-400 text-xs uppercase tracking-wide mt-0.5">{r.item}</div>
                                        <div className="text-white/50 text-xs leading-relaxed">{r.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA COMPLETA ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>A table that is an atlas</SLabel>
                        <STitle>
                            Flavors from{" "}
                            <span className="text-gradient">four continents</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            No other city in the Center-West concentrates such an honest fusion of so many cuisines on a single table. The result is not confusion — it is identity.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {dishes.map((d, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i, duration: 0.5 }}
                                className="card-hover p-6 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <d.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${d.badgeColor}`}>{d.badge}</span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-base mb-2">{d.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BIOPARQUE DESTAQUE ───────────────────────────── */}
            <section className="relative overflow-hidden" style={{ background: "#031c1a" }}>
                {/* photo as soft background */}
                <div className="absolute inset-0">
                    <img src="/cities/bioparque.jpg" alt="" aria-hidden className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #031c1a 40%, #031c1a99 70%, transparent 100%)" }} />
                </div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 65%)" }} />

                <div className="container-custom relative z-10 py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">

                        {/* ── left: text + stats ── */}
                        <div>
                            <SLabel>Opened March 2022 · Free Entry</SLabel>
                            <STitle light>
                                The world's largest{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    freshwater aquarium
                                </span>
                            </STitle>

                            <div className="space-y-5 mb-10">
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    BIOPARQUE Pantanal is no ordinary aquarium. It is a living organism — the planet's largest freshwater genetic bank — housing <strong className="text-teal-300">220 neotropical species</strong> in nearly 5 million liters of water. Opened in March 2022 with free admission, it became the most visited tourist destination in the Brazilian Center-West in under three years, surpassing 1 million visitors and setting a record for international tourists.
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    Its <strong className="text-teal-300">29 world-first breeding projects</strong> are not statistics — they are yellow-throated caimans that never existed in captivity, 28-kg pintado fish reproducing under scientific supervision, Amazonian species sharing the same 6-meter water column with Pantanal fish. Of the 100 species bred in captivity, 29 had never been bred in any aquarium in the world.
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    The <strong className="text-teal-300">submerged corridor</strong> — a glass walkway surrounded by 40 tonnes of live aquatic fauna — is one of the most impactful experiences in Brazilian tourism. The free specialist guide (1.5-hour tours, included with entry) reveals what a solo visit cannot: the genetics laboratories where the future of the Pantanal is being written, one species at a time.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { num: "~5 million", sub: "liters of water" },
                                    { num: "220", sub: "neotropical species" },
                                    { num: "100", sub: "species bred in captivity" },
                                    { num: "29", sub: "world-first breedings" },
                                ].map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.07 * i }}
                                        className="rounded-2xl border border-teal-500/20 p-5 text-center" style={{ background: "rgba(20,184,166,0.07)" }}>
                                        <div className="font-display font-bold text-teal-300 text-2xl mb-1">{s.num}</div>
                                        <div className="text-white/40 text-[11px] uppercase tracking-wider">{s.sub}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* ── right: photo + card ── */}
                        <div className="flex flex-col gap-5">
                            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                                className="rounded-3xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                                <img src="/cities/bioparque.jpg" alt="BIOPARQUE Pantanal — Campo Grande, MS"
                                    className="w-full h-full object-cover" />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,28,26,0.7) 0%, transparent 60%)" }} />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="text-[10px] font-semibold text-teal-300 uppercase tracking-widest">BIOPARQUE Pantanal · Campo Grande, MS</span>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                                className="rounded-3xl border border-teal-500/20 p-7" style={{ background: "rgba(255,255,255,0.04)" }}>
                                <Fish className="w-7 h-7 text-teal-400 mb-4" />
                                <h3 className="font-display text-lg font-bold text-white mb-4">How to visit</h3>
                                <div className="space-y-3">
                                    {[
                                        { t: "Submerged corridor", d: "Glass walkway surrounded by 40 tonnes of live aquatic fauna" },
                                        { t: "151 Pantanal species", d: "Plus 55 from the Amazon and species from Africa, Oceania, and Asia" },
                                        { t: "Free guided tour (1.5h)", d: "Included with entry — access to the breeding laboratories" },
                                        { t: "Advance booking required", d: "agendamentobioparquepantanal.ms.gov.br · Tue–Sat 8:30am–5:30pm" },
                                    ].map((r, i) => (
                                        <div key={i} className="flex gap-3 py-2.5 border-b border-teal-500/10 last:border-0">
                                            <ChevronRight className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-teal-300 font-semibold text-sm">{r.t}</div>
                                                <div className="text-white/40 text-xs mt-0.5">{r.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>What to see and do</SLabel>
                        <STitle>Places that <span className="text-gradient">explain the city</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((a, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <a.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${a.badgeStyle}`}>{a.badge}</span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-sm mb-2">{a.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed mb-3">{a.desc}</p>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{a.detail}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PERSONALIDADES ───────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary-500/6 rounded-full blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>Who made Campo Grande happen</SLabel>
                        <STitle light>
                            Figures who{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                left their mark on history
                            </span>
                        </STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {personalidades.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 flex gap-5 hover:bg-white/[0.07] transition-colors">
                                <div className="text-4xl flex-shrink-0">{p.emoji}</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-display font-bold text-white text-lg">{p.nome}</h3>
                                    </div>
                                    <div className="text-secondary-400 text-xs font-semibold uppercase tracking-wide mb-3">
                                        {p.anos} · {p.papel}
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed">{p.hist}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SLabel>Suggested Itinerary</SLabel>
                        <STitle>3 <span className="text-gradient">unforgettable</span> days</STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className={`p-5 bg-gradient-to-r ${day.color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                            <day.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white/70 text-xs uppercase tracking-widest">{day.day}</div>
                                            <div className="text-white font-bold text-sm">{day.theme}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[{ time: "Morning", text: day.morning }, { time: "Afternoon", text: day.afternoon }, { time: "Evening", text: day.evening }].map((s, si) => (
                                        <div key={si} className="flex gap-3">
                                            <Clock className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-primary-500/80 text-xs font-semibold uppercase tracking-wide">{s.time}</span>
                                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{s.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SLabel>Did you know?</SLabel>
                        <STitle light>Facts that <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">surprise</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl bg-white/[0.05] border border-white/8 p-5 hover:bg-white/[0.08] transition-colors">
                                <div className="text-3xl mb-3">{c.emoji}</div>
                                <p className="text-white/60 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SLabel>Plan your visit</SLabel>
                        <STitle>Practical <span className="text-gradient">information</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Plane className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">How to Get There</h3>
                            <div className="space-y-2.5 text-slate-500 text-sm leading-relaxed">
                                <p><strong className="text-primary-700">By air:</strong> Campo Grande International Airport (CGR) — direct flights by Latam, Gol, and Azul. 8 km from the city center.</p>
                                <p><strong className="text-primary-700">From São Paulo:</strong> 1,014 km via BR-060 (±12h)</p>
                                <p><strong className="text-primary-700">Bioceanic Route:</strong> 439 km to Porto Murtinho / Paraguay border via BR-267</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Calendar className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Best Time to Visit</h3>
                            <div className="space-y-2.5">
                                {[
                                    { p: "Apr → Sep", d: "Dry and cool — best season for outdoor activities and nature", c: "bg-teal-50 border-teal-200 text-teal-700" },
                                    { p: "Jul (winter)", d: "Cultural festivals, ideal weather, Pantanal high season", c: "bg-blue-50 border-blue-200 text-blue-700" },
                                    { p: "Dec → Mar", d: "Heavy tropical rains — avoid for Pantanal and Bonito trips", c: "bg-amber-50 border-amber-200 text-amber-700" },
                                ].map((ep, i) => (
                                    <div key={i} className={`p-3 rounded-xl border text-xs ${ep.c}`}>
                                        <span className="font-bold">{ep.p}</span> — {ep.d}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Phone className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Useful Contacts</h3>
                            <div className="space-y-3">
                                {[
                                    { l: "SECTUR Campo Grande", v: "(67) 4042-1313" },
                                    { l: "BIOPARQUE (booking)", v: "agendamentobioparquepantanal.ms.gov.br" },
                                    { l: "Museu José A. Pereira", v: "(67) 4042-1313 ext. 4323" },
                                    { l: "Fundação de Turismo MS", v: "turismo.ms.gov.br" },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <ChevronRight className="w-3.5 h-3.5 text-secondary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-slate-400 text-xs">{c.l}: </span>
                                            <span className="text-primary-700 text-xs font-medium">{c.v}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-red-700 via-amber-600 to-secondary-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Bioceanic Route · Brazil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Campo Grande — where the red soil tells a 150-year story of encounters.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            The next stop on the Bioceanic Route is Porto Murtinho — 439 km away, on the banks of the Paraguay River.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/en/cidades/porto-murtinho"
                                className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group">
                                Porto Murtinho →
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/en/cidades"
                                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:border-white/70 transition-colors">
                                See all cities
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
