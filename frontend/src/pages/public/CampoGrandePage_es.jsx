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
    antes: "1.800 hab.",
    depois: "50.000 hab.",
    prazo: "< 10 años",
    ano: "1914",
    detalhe: "El Ferrocarril Noroeste de Brasil (EFNOB) llegó a Campo Grande el 14 de octubre de 1914, conectando Bauru (SP) con Corumbá. El impacto fue fulminante: el pueblo se convirtió en la ciudad más grande del Centro-Oeste en menos de una generación. El complejo ferroviario — 135 edificios en 22,3 hectáreas — fue declarado patrimonio cultural nacional por el IPHAN en 2009.",
};

const imigrantes = [
    {
        povo: "Okinawenses",
        flag: "🇯🇵",
        quando: "A partir de 1908",
        legado: "La 3ª colonia japonesa más grande de Brasil — y la más okinawense. Trajeron el sobá, el tereré japonés, los matsuri y una gastronomía que hoy es el ADN culinario de la ciudad.",
        simbolo: "Sobá · Bon Odori · Festival del Japón MS",
        color: "from-red-700 to-rose-800",
        border: "border-red-500/30",
        accent: "text-red-300",
    },
    {
        povo: "Sirios y Libaneses",
        flag: "🇱🇧",
        quando: "A partir de 1894",
        legado: "Llegaron como buhoneros, se convirtieron en comerciantes e industriales. Su legado está en las calles del centro histórico y en la mesa campo-grandense: esfira, kibe, kafta y el belewa.",
        simbolo: "Esfira · Kibe · Comercio del Centro",
        color: "from-green-700 to-emerald-800",
        border: "border-green-500/30",
        accent: "text-green-300",
    },
    {
        povo: "Paraguayos",
        flag: "🇵🇾",
        quando: "Continuo",
        legado: "80 mil paraguayos viven en Campo Grande — la mayor concentración fuera de Paraguay. Trajeron el idioma, el guaraní en el cotidiano, la chipa, la sopa paraguaya y el tereré como hábito diario.",
        simbolo: "Chipa · Sopa Paraguaya · Tereré UNESCO",
        color: "from-blue-700 to-indigo-800",
        border: "border-blue-500/30",
        accent: "text-blue-300",
    },
    {
        povo: "Gaúchos y Nordesteños",
        flag: "🇧🇷",
        quando: "Siglo XX",
        legado: "Los gaúchos trajeron el chimarrão y la cultura campera. Los nordesteños trajeron la religiosidad, las fiestas juninas y la cocina sertaneja. Todos se fusionaron en la identidad morena de la ciudad.",
        simbolo: "Churrasco · Arreos · Fiestas Juninas",
        color: "from-amber-700 to-orange-800",
        border: "border-amber-500/30",
        accent: "text-amber-300",
    },
];

const dishes = [
    {
        name: "Sobá",
        icon: Utensils,
        badge: "Patrimonio IPHAN",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "Fideos artesanales cocidos en caldo de osobuco, con carne de cerdo, tortilla en tiras y cebolleta verde. Creado por los okinawenses en los años 1910 y declarado patrimonio cultural inmaterial de Brasil por el IPHAN. Se come en la Feria Central, de miércoles a domingos.",
    },
    {
        name: "Chipa",
        icon: Flame,
        badge: "Frontera",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Pan paraguayo de almidón y queso, más firme y sabroso que el pan de queso mineiro. Se encuentra en toda la ciudad desde el amanecer — panaderías, esquinas, ferias y snack bars.",
    },
    {
        name: "Sopa Paraguaya",
        icon: Utensils,
        badge: "Frontera",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "El nombre engaña: no es líquida. Es un pastel salado denso y húmedo hecho con harina de maíz, queso semicurado, cebolla y huevos — acompañamiento obligatorio en el asado sul-mato-grossense.",
    },
    {
        name: "Pacú Asado",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "El pez símbolo del Pantanal, asado entero a las brasas con relleno de farofa de repollo. Junto con el pintado y el dourado, es presencia obligatoria en los almuerzos del domingo.",
    },
    {
        name: "Mojica de Pintado",
        icon: Fish,
        badge: "Pantanal",
        badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "Guiso pantanero con pintado cocido en mandioca, tomate y cebolla. El almidón de la mandioca espesa el caldo naturalmente, creando una crema aterciopelada de sabor profundo.",
    },
    {
        name: "Tereré",
        icon: Leaf,
        badge: "UNESCO 2020",
        badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Hierba mate en agua helada, servida en el cuerno de buey con bombilla de metal. Reconocido por la UNESCO en 2020 como Patrimonio Cultural Inmaterial de la Humanidad. Se bebe a diario en rodas en plazas, oficinas y veredas.",
    },
    {
        name: "Arroz Carreteiro",
        icon: Flame,
        badge: "Pantanero",
        badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        desc: "Herencia de las tropillas pantaneras: arroz con carne seca en trozos, a veces con plátano macho frito. Sabor ahumado y sencillez que cuentan la historia de los peones que cruzaron el Pantanal.",
    },
    {
        name: "Furrundu",
        icon: Star,
        badge: "Rareza",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "Dulce único — tallo de papaya cocido con panela y especias hasta convertirse en compota oscura y aromática. Rareza que se encuentra en ferias artesanales. Quien lo prueba, nunca lo olvida.",
    },
];

const attractions = [
    {
        name: "BIOPARQUE Pantanal",
        icon: Fish,
        badge: "Récord Mundial",
        badgeStyle: "bg-secondary-500/20 text-secondary-300 border-secondary-500/30",
        desc: "El acuario de agua dulce más grande del mundo, inaugurado en 2022. Casi 5 millones de litros, 220 especies neotropicales, 100 reproducidas en cautiverio — 29 inéditas en el mundo. Entrada gratuita con reserva.",
        detail: "Parque das Nações Indígenas · Mar–Sáb 8h30–17h30",
    },
    {
        name: "Parque das Nações Indígenas",
        icon: Trees,
        badge: "1,16 km²",
        badgeStyle: "bg-teal-500/20 text-teal-300 border-teal-500/30",
        desc: "Uno de los parques urbanos más grandes de Brasil. 4 km de pista, lago, BIOPARQUE, Concha Acústica Helena Meirelles, Museu Dom Bosco y Museo de Arte Contemporáneo.",
        detail: "Lunes a domingo · 6h–21h · Entrada gratuita",
    },
    {
        name: "Feira Central",
        icon: Utensils,
        badge: "Fundada 1925",
        badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Corazón gastronómico y cultural de la ciudad. 28 restaurantes de sobá, chipa, sopa paraguaya, artesanía y cerveza artesanal en la Antigua Estación Ferroviaria. La estatua gigante del bol es el punto fotográfico más amado.",
        detail: "Miércoles–Domingo · a partir de las 16h",
    },
    {
        name: "Complejo Ferroviario EFNOB",
        icon: Train,
        badge: "Patrimonio IPHAN",
        badgeStyle: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        desc: "135 edificios históricos en 22,3 hectáreas — declarados por el IPHAN en 2009. El Memorial del Ferrocarril narra el salto de 1.800 a 50.000 habitantes que el ferrocarril provocó en menos de una generación.",
        detail: "Centro histórico · Visita libre",
    },
    {
        name: "Parque dos Poderes",
        icon: Trees,
        badge: "140 ha de Cerrado",
        badgeStyle: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Sede del gobierno estatal dentro de una reserva ecológica de 140 hectáreas. Capibaras, coatíes, guacamayos, tucanes y osos hormigueros circulan libremente entre los palacios. Una de las experiencias más surrealistas del turismo urbano brasileño.",
        detail: "Horario administrativo · Fauna más activa al amanecer",
    },
    {
        name: "Museo das Culturas Dom Bosco",
        icon: Camera,
        badge: "Desde 1951",
        badgeStyle: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        desc: "Acervo salesiano fundado en 1950 con piezas raras de etnología indígena: cerámica Kadiwéu, adornos Bororo, artefactos Terena. Uno de los museos indígenas más importantes de Brasil.",
        detail: "Mar–Vie 8h–17h · Sáb y feriados 14h–18h",
    },
    {
        name: "Museu José Antônio Pereira",
        icon: Building2,
        badge: "1877",
        badgeStyle: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        desc: "La Fazenda Bálsamo restaurada — único ejemplar de arquitectura colonial de 1877 preservado en la ciudad. Los utensilios de la familia fundadora, el monjolo y el carro de bueyes llevan al visitante al Campo Grande de 1875.",
        detail: "Mar–Dom 9h–17h · Av. Guaicurus",
    },
    {
        name: "Monumento al Inmigrante",
        icon: Globe,
        badge: "1979",
        badgeStyle: "bg-red-500/20 text-red-300 border-red-500/30",
        desc: "Réplica a tamaño real de una casa típica japonesa, en la Plaza de la República. Inaugurada en 1979 para marcar los 70 años de la inmigración okinawense — declaración pública de gratitud a quienes hicieron la ciudad.",
        detail: "Praça da República · Centro",
    },
];

const personalidades = [
    {
        nome: "José Antônio Pereira",
        anos: "1821–1899",
        papel: "Fundador",
        hist: "Tropero mineiro que llegó a la confluencia de los arroyos Prosa y Segredo el 21 de junio de 1872 con 62 personas. Mandó construir la primera iglesia en 1877 y no llegó a ver la ciudad convertirse en capital — murió el mismo año de la emancipación.",
        emoji: "🏗️",
    },
    {
        nome: "Jânio Quadros",
        anos: "1917–1992",
        papel: "Presidente de Brasil",
        hist: "Nacido en Campo Grande el 25 de enero de 1917. Abogado, profesor, alcalde de SP, gobernador y Presidente de la República en 1961 — el que renunció tras 7 meses en un gesto que aún divide a los historiadores.",
        emoji: "🏛️",
    },
    {
        nome: "Almir Sater",
        anos: "Nac. 1956",
        papel: "Músico · Viola Caipira",
        hist: "Nacido en Campo Grande el 14 de noviembre de 1956. Autor de \"Tocando en Frente\" (con Renato Teixeira), una de las canciones más grabadas de la MPB. También actor en la telenovela Pantanal (Globo, 1990).",
        emoji: "🎵",
    },
    {
        nome: "Tetê Espíndola",
        anos: "Nac. Campo Grande",
        papel: "Cantante · MPB",
        hist: "Con el grupo Lírio Selvagem, revolucionó la MPB en los años 1970 y 1980, mezclando Cerrado, Pantanal y vanguardia en una voz inconfundible reconocida en todo Brasil.",
        emoji: "🎤",
    },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Memoria y Mesa",
        morning: "Llegada. Visita al Museu José Antônio Pereira (1877) y al Complejo Ferroviario EFNOB. Café con chipa en una panadería local.",
        afternoon: "Avenida Afonso Pena y Museo das Culturas Dom Bosco. Paso por el Monumento al Inmigrante en la Praça da República.",
        evening: "Feira Central a partir de las 16h: sobá clásico, sopa paraguaya, chipa de horno y tereré. El ritual gastronómico más campo-grandense que existe.",
        color: "from-amber-600 to-orange-700",
        icon: Utensils,
    },
    {
        day: "Día 2",
        theme: "Naturaleza y Récords",
        morning: "BIOPARQUE Pantanal (reserva obligatoria). Reserve 2h con el guía especializado — los corredores sumergidos son una de las experiencias más impactantes del turismo brasileño.",
        afternoon: "Caminata en el Parque das Nações Indígenas (4 km alrededor del lago). Garzas, capibaras, guacamayos y coatíes en libertad a metros del centro de la capital.",
        evening: "Cena en restaurante de cocina nipo-brasileña con ingredientes pantaneros: sashimi de pintado, temaki de pacú ahumado.",
        color: "from-teal-600 to-emerald-700",
        icon: Fish,
    },
    {
        day: "Día 3",
        theme: "Fauna y Partida",
        morning: "Parque dos Poderes al amanecer (6h): osos hormigueros, guacamayos y capibaras entre los palacios del gobierno. Una de las experiencias más surrealistas del Brasil urbano.",
        afternoon: "Mercadão Municipal: hierba mate, chipa empaquetada, dulces de furrundu, artesanía indígena. Almuerzo con pacú asado o mojica de pintado.",
        evening: "Partida hacia la próxima parada de la Ruta Bioceánica: Bonito (297 km) o Porto Murtinho (439 km).",
        color: "from-blue-600 to-indigo-700",
        icon: Trees,
    },
];

const curiosities = [
    { emoji: "🌳", text: "Capital más arborizada de Brasil — 91% de las calles con sombra. Tecnología de monitoreo de árboles usada en tiempo real." },
    { emoji: "🐟", text: "El BIOPARQUE tiene el acuario de agua dulce más grande del mundo — entrada gratuita. 29 reproducciones de especies fueron inéditas en el mundo." },
    { emoji: "🍜", text: "El sobá es el único plato de origen extranjero adaptado tan completamente que se convirtió en patrimonio cultural inmaterial de Brasil (IPHAN)." },
    { emoji: "🚂", text: "El ferrocarril de 1914 multiplicó la población por 28 en menos de 10 años: de 1.800 a 50.000 habitantes." },
    { emoji: "🇯🇵", text: "La comunidad japonesa de Campo Grande es okinawense — culturalmente distinta del Japón continental, con lengua y gastronomía propias." },
    { emoji: "🧉", text: "El tereré campo-grandense fue reconocido por la UNESCO en 2020 como Patrimonio Cultural Inmaterial de la Humanidad." },
    { emoji: "🏛️", text: "Jânio Quadros — el presidente que renunció tras 7 meses — nació en Campo Grande el 25 de enero de 1917." },
    { emoji: "🇵🇾", text: "80 mil paraguayos viven en Campo Grande — la mayor concentración de paraguayos fuera del propio Paraguay." },
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
                        <img src={src} alt="Infografía editorial Campo Grande" className="w-full h-auto" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Haga clic para ampliar</p>
                </div>
            </section>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src} alt="Infografía editorial Campo Grande"
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
export default function CampoGrandePageEs() {
    const ferroviaRef = useRef(null);
    const ferroviaInView = useInView(ferroviaRef, { once: true, margin: "-80px" });

    return (
        <div className="min-h-screen">

            {/* ── HERO ─────────────────────────────────────────── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul · Capital del Estado"
                name={{ first: "Campo", second: "Grande" }}
                tagline="La Capital Morena — puerta del Pantanal y hub de la Ruta Bioceánica."
                scene="pantanal"
                image="/cities/campo_grande.jpg"
                accentColor="#F4A261"
                stats={[
                    { label: "Habitantes (Censo 2022)", value: 898, suffix: " mil" },
                    { label: "Año de fundación", value: 1872 },
                    { label: "Territorio (km²)", value: 8082 },
                    { label: "Km hasta Porto Murtinho", value: 439 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── CAPITAL MORENA ───────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SLabel>Quién es Campo Grande</SLabel>
                        <STitle>
                            El suelo que dio nombre{" "}
                            <span className="text-gradient">a una identidad</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-lg text-slate-500 leading-relaxed">
                            El latosol enrojecido por el óxido de hierro que cubre el territorio de Campo Grande no es solo geología — es identidad. Cuando llueve, las calles se tiñen de ocre. Cuando el calor reseca la tierra, el polvo rojizo flota en el aire.{" "}
                            <strong className="text-primary-700">El pueblo lo llamó tierra morena. La ciudad se convirtió en la Capital Morena.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Train, title: "Hub de la Ruta Bioceánica", text: "A 439 km del puente binacional sobre el Río Paraguay (75% concluido en 2026), Campo Grande es el mayor centro urbano del corredor bioceánico en el lado brasileño — con las carreteras BR-060, BR-163 y BR-262 convergiendo en la ciudad.", color: "from-blue-50 to-indigo-50", acc: "text-blue-700", ib: "bg-blue-100" },
                            { icon: Globe, title: "Puerta del Pantanal", text: "Miranda está a 207 km, Bonito a 297 km, el corazón del Pantanal Sur a menos de 3h en coche. Campo Grande es el punto de partida de todos los grandes itinerarios ecológicos de la mayor llanura inundable del mundo, Patrimonio Mundial de la UNESCO.", color: "from-teal-50 to-emerald-50", acc: "text-teal-700", ib: "bg-teal-100" },
                            { icon: Users, title: "La Ciudad de los Encuentros", text: "Japoneses okinawenses, sirio-libaneses, paraguayos, gaúchos, nordesteños y pantaneros formaron, a lo largo de 150 años, la identidad más plural del Centro-Oeste. El resultado está en la mesa, en las fiestas y en el acento.", color: "from-amber-50 to-orange-50", acc: "text-amber-700", ib: "bg-amber-100" },
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
                            <SLabel>14 de octubre de 1914</SLabel>
                            <STitle light>
                                El ferrocarril que{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    multiplicó la ciudad
                                </span>
                            </STitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8">
                                {ferrovia.detalhe}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="flex items-center gap-3 text-sm text-secondary-400/70">
                                <Train className="w-4 h-4" />
                                <span>Complejo declarado por el IPHAN en 2009 como Patrimonio Cultural Nacional</span>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Antes del ferrocarril", val: "1.800", sub: "habitantes", color: "from-slate-700 to-slate-800", icon: Users },
                                { label: "Menos de 10 años", val: "→", sub: ferrovia.ano, color: "from-secondary-600 to-orange-700", icon: Train },
                                { label: "Después del ferrocarril", val: "50.000", sub: "habitantes", color: "from-teal-700 to-emerald-800", icon: Users },
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
                        <SLabel>150 años de encuentros</SLabel>
                        <STitle>
                            Los pueblos que{" "}
                            <span className="text-gradient">hicieron la ciudad</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            Campo Grande es, por definición, una ciudad de encuentros. Su identidad cultural es una síntesis improbable — y riquísima — de pueblos, lenguas, religiones y gastronomías que llegaron en oleadas sucesivas a lo largo de 150 años.
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
                            <SLabel>Patrimonio Cultural Inmaterial de Brasil · IPHAN</SLabel>
                            <STitle light>
                                El Sobá:{" "}
                                <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                    alma de la ciudad en un bol
                                </span>
                            </STitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="space-y-4 text-white/60 text-sm leading-relaxed">
                                <p>
                                    Los primeros okinawenses que llegaron a Campo Grande en los años 1910 preparaban el sobá para consumo propio — tenían <strong className="text-white/80">vergüenza de comer el plato en público</strong>, temiendo el extrañamiento de los vecinos. Durante años, los fideos quedaron restringidos a las cocinas de la comunidad.
                                </p>
                                <p>
                                    El punto de inflexión fue <strong className="text-white/80">Hiroshi Katsuren</strong>, el pionero que llevó el sobá a la Feira Central. Cuando los campo-grandenses lo probaron, el resultado fue inmediato. El caldo se adaptó con osobuco, la carne de cerdo llegó, la tortilla en tiras entró como guarnición. El sobá se hizo campo-grandense.
                                </p>
                                <p className="text-secondary-400 font-medium italic">
                                    En 2006, el Decreto Municipal nº 9.685 declaró el sobá de Campo Grande Bien Cultural de Naturaleza Inmaterial. El IPHAN lo reconoció como patrimonio cultural inmaterial de Brasil — el único plato de origen extranjero en recibir ese estatus en el país.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-secondary-500/20 flex items-center justify-center">
                                    <Utensils className="w-5 h-5 text-secondary-400" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-white">Qué es el Sobá Campo-Grandense</div>
                                    <div className="text-white/40 text-xs">Decreto Municipal 9.685 / 2006 · IPHAN</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { item: "Fideos", desc: "Artesanales, espesos y firmes — distintos del soba japonés continental (de trigo sarraceno)" },
                                    { item: "Caldo", desc: "Rico, hecho a base de osobuco bovino, cocido lentamente hasta concentrar sabor y cuerpo" },
                                    { item: "Proteína", desc: "Carne de cerdo y res en trozos, a veces carne seca deshilachada" },
                                    { item: "Guarnición", desc: "Tortilla cortada en tiras finas, cebolleta verde picada generosamente" },
                                    { item: "Dónde comer", desc: "Feira Central — 28 restaurantes especializados, de miércoles a domingos a partir de las 16h" },
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
                        <SLabel>Una mesa que es un atlas</SLabel>
                        <STitle>
                            Sabores de{" "}
                            <span className="text-gradient">cuatro continentes</span>
                        </STitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed">
                            Ninguna otra ciudad del Centro-Oeste concentra en su mesa una fusión tan honesta de tantas cocinas. El resultado no es confusión — es identidad.
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
                <div className="absolute inset-0">
                    <img src="/cities/bioparque.jpg" alt="" aria-hidden className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #031c1a 40%, #031c1a99 70%, transparent 100%)" }} />
                </div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 65%)" }} />

                <div className="container-custom relative z-10 py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">
                        <div>
                            <SLabel>Inaugurado en marzo de 2022 · Entrada Gratuita</SLabel>
                            <STitle light>
                                El mayor acuario de{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    agua dulce del mundo
                                </span>
                            </STitle>

                            <div className="space-y-5 mb-10">
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    El BIOPARQUE Pantanal no es un acuario común. Es un organismo vivo — el mayor banco genético de agua dulce del planeta — que alberga <strong className="text-teal-300">220 especies neotropicales</strong> en casi 5 millones de litros de agua. Inaugurado en marzo de 2022, con entrada gratuita, se convirtió en menos de tres años en el punto turístico más visitado del Centro-Oeste brasileño, superando 1 millón de visitantes y registrando récord de turistas internacionales.
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    Sus <strong className="text-teal-300">29 proyectos de reproducción inédita en el mundo</strong> no son estadística — son caimanes de babilla que nunca existieron en cautiverio, pintados de 28 kg reproduciéndose bajo supervisión científica, especies del Amazonas compartiendo la misma columna de agua de 6 metros con peces del Pantanal.
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                                    className="text-white/60 leading-relaxed text-[15px]">
                                    El <strong className="text-teal-300">corredor sumergido</strong> — recorrido de vidrio rodeado de 40 toneladas de fauna acuática viva — es una de las experiencias más impactantes del turismo brasileño. El guía especializado gratuito (tours de 1h30, incluidos en la entrada) revela lo que la visita libre no alcanza: los laboratorios de genética donde el futuro del Pantanal se está escribiendo especie por especie.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { num: "~5 millones", sub: "litros de agua" },
                                    { num: "220", sub: "especies neotropicales" },
                                    { num: "100", sub: "especies reproducidas" },
                                    { num: "29", sub: "reproducciones inéditas en el mundo" },
                                ].map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.07 * i }}
                                        className="rounded-2xl border border-teal-500/20 p-5 text-center" style={{ background: "rgba(20,184,166,0.07)" }}>
                                        <div className="font-display font-bold text-teal-300 text-2xl mb-1">{s.num}</div>
                                        <div className="text-white/40 text-[11px] uppercase tracking-wider">{s.sub}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                                className="rounded-3xl overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                                <img src="/cities/bioparque.jpg" alt="BIOPARQUE Pantanal — Campo Grande, MS" className="w-full h-full object-cover" />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,28,26,0.7) 0%, transparent 60%)" }} />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="text-[10px] font-semibold text-teal-300 uppercase tracking-widest">BIOPARQUE Pantanal · Campo Grande, MS</span>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                                className="rounded-3xl border border-teal-500/20 p-7" style={{ background: "rgba(255,255,255,0.04)" }}>
                                <Fish className="w-7 h-7 text-teal-400 mb-4" />
                                <h3 className="font-display text-lg font-bold text-white mb-4">Cómo visitar</h3>
                                <div className="space-y-3">
                                    {[
                                        { t: "Corredor sumergido", d: "Recorrido de vidrio rodeado de 40 toneladas de fauna acuática viva" },
                                        { t: "151 especies del Pantanal", d: "Más 55 del Amazonas y especies de África, Oceanía y Asia" },
                                        { t: "Tour guiado gratuito (1h30)", d: "Incluido en la entrada — acceso a los laboratorios de reproducción" },
                                        { t: "Reserva obligatoria", d: "agendamentobioparquepantanal.ms.gov.br · Mar–Sáb 8h30–17h30" },
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
                        <SLabel>Qué ver y hacer</SLabel>
                        <STitle>Puntos que <span className="text-gradient">explican la ciudad</span></STitle>
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
                        <SLabel>Quienes hicieron Campo Grande</SLabel>
                        <STitle light>
                            Personajes que{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                quedaron en la historia
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
                        <SLabel>Itinerario Sugerido</SLabel>
                        <STitle>3 días <span className="text-gradient">inolvidables</span></STitle>
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
                                    {[{ time: "Mañana", text: day.morning }, { time: "Tarde", text: day.afternoon }, { time: "Noche", text: day.evening }].map((s, si) => (
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
                        <SLabel>¿Sabías que?</SLabel>
                        <STitle light>Datos que <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">sorprenden</span></STitle>
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
                        <SLabel>Planifique su visita</SLabel>
                        <STitle>Información <span className="text-gradient">práctica</span></STitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Plane className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Cómo Llegar</h3>
                            <div className="space-y-2.5 text-slate-500 text-sm leading-relaxed">
                                <p><strong className="text-primary-700">Aéreo:</strong> Aeropuerto Internacional de Campo Grande (CGR) — vuelos directos por Latam, Gol y Azul. 8 km del centro.</p>
                                <p><strong className="text-primary-700">Desde São Paulo:</strong> 1.014 km por BR-060 (±12h)</p>
                                <p><strong className="text-primary-700">Ruta Bioceánica:</strong> 439 km hasta Porto Murtinho / frontera con Paraguay por BR-267</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-slate-50 border border-slate-200 p-7">
                            <Calendar className="w-6 h-6 text-secondary-500 mb-4" />
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Mejor Época</h3>
                            <div className="space-y-2.5">
                                {[
                                    { p: "Abr → Sep", d: "Seco y fresco — mejor época para paseos y naturaleza", c: "bg-teal-50 border-teal-200 text-teal-700" },
                                    { p: "Jul (invierno)", d: "Fiestas culturales, clima ideal, alta temporada del Pantanal", c: "bg-blue-50 border-blue-200 text-blue-700" },
                                    { p: "Dic → Mar", d: "Lluvias tropicales intensas — evitar para Pantanal y Bonito", c: "bg-amber-50 border-amber-200 text-amber-700" },
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
                            <h3 className="font-display text-lg font-bold text-primary-950 mb-3">Contactos Útiles</h3>
                            <div className="space-y-3">
                                {[
                                    { l: "SECTUR Campo Grande", v: "(67) 4042-1313" },
                                    { l: "BIOPARQUE (reserva)", v: "agendamentobioparquepantanal.ms.gov.br" },
                                    { l: "Museu José A. Pereira", v: "(67) 4042-1313 r.4323" },
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
                            Ruta Bioceánica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Campo Grande — donde el suelo rojo cuenta una historia de 150 años de encuentros.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            La próxima parada de la Ruta Bioceánica es Porto Murtinho — a 439 km, a orillas del Río Paraguay.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/es/cidades/porto-murtinho"
                                className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group">
                                Porto Murtinho →
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/es/cidades"
                                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:border-white/70 transition-colors">
                                Ver todas las ciudades
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
