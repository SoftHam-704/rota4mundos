import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    MapPin, ArrowRight, ArrowLeft, Clock, Users, Droplets,
    Mountain, Fish, Leaf, Star, Camera, Compass, Waves, ZoomIn, X,
} from "lucide-react";

// ─── dados ────────────────────────────────────────────────────────────────────

const pillars = [
    {
        icon: Droplets,
        title: "Águas Mais Claras do Planeta",
        desc: "O calcário da Serra da Bodoquena filtra e precipita partículas em suspensão, criando visibilidade de até 40 metros. Fenômeno científico único no mundo.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
        icon: Leaf,
        title: "Modelo Global de Ecoturismo",
        desc: "Lei municipal de 1997 implantou capacidade de carga e vouchers obrigatórios. Citado pela ONU, WWF e National Geographic como referência mundial.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        icon: Fish,
        title: "Fauna Aquática Desmistificada",
        desc: "Décadas de proteção total tornaram dourados e pacus completamente alheios à presença humana. Um dourado de 1 metro nada a 20 cm do seu rosto.",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
];

const historyCycles = [
    {
        period: "Séc. XVIII–XIX",
        title: "Povos Originários",
        content:
            "Kadiwéu, Guarani e Terena habitavam a Serra da Bodoquena muito antes dos colonizadores. Os Kadiwéu — os 'índios cavaleiros' do Pantanal — foram estudados por Claude Lévi-Strauss em Tristes Trópicos (1955), fascinado pela sua cerâmica e pintura corporal geométrica de extrema complexidade.",
        color: "border-amber-500/40 bg-amber-500/5",
        accent: "text-amber-400",
    },
    {
        period: "1880–1948",
        title: "Pecuária e Colonização",
        content:
            "O Córrego Bonito deu nome à região: colonizadores paulistas e mineiros batizaram o lugar pela clareza incomum de suas águas. O Distrito foi criado em 1932, subordinado a Jardim. A emancipação como município independente veio em 11 de dezembro de 1948.",
        color: "border-teal-500/40 bg-teal-500/5",
        accent: "text-teal-400",
    },
    {
        period: "1986–1991",
        title: "A Redescoberta",
        content:
            "Mergulhadores paulistas redescobrem a Gruta do Lago Azul em 1986. Reportagens na revista Mergulho e Quatro Rodas colocam Bonito no mapa nacional. O crescimento rápido e desordenado ameaça os mesmos recursos que atraem os visitantes.",
        color: "border-blue-500/40 bg-blue-500/5",
        accent: "text-blue-400",
    },
    {
        period: "1997–hoje",
        title: "A Lei que Salvou Bonito",
        content:
            "Lei Municipal nº 1.143/1997: capacidade de carga, guia credenciado obrigatório e sistema de vouchers centralizados (Bonito Tour). Em 27 anos, nunca revogada. Biomassa de peixes cresceu mais de 300% entre 1990 e 2010. Modelo copiado por Fernando de Noronha, Chapada dos Veadeiros e Jalapão.",
        color: "border-emerald-500/40 bg-emerald-500/5",
        accent: "text-emerald-400",
    },
];

const attractions = [
    {
        name: "Rio da Prata",
        badge: "⭐ O Melhor",
        badgeColor: "bg-cyan-500/20 text-cyan-300",
        desc: "Nascente subterrânea emerge a 22°C com visibilidade de 40 metros. Flutuação de 2,5 km entre dourados, pacus e piraputangas que nadam ao seu redor sem medo. O aquário de água doce mais impressionante do mundo.",
        highlight: "Visibilidade 40m · Temperatura constante 22°C",
        emoji: "🏊",
    },
    {
        name: "Gruta do Lago Azul",
        badge: "🦴 Fósseis",
        badgeColor: "bg-indigo-500/20 text-indigo-300",
        desc: "Caverna de 250m de profundidade com lago de cor safira. Em janeiro-fevereiro, raios de sol entram pelo teto criando coluna de luz azul-cobalto. No fundo, fósseis de mastodontes e preguiças-gigantes extintos há 12.000 anos.",
        highlight: "Patrimônio Natural · Megafauna Pleistocênica",
        emoji: "💎",
    },
    {
        name: "Abismo Anhumas",
        badge: "🎽 Aventura Extrema",
        badgeColor: "bg-rose-500/20 text-rose-300",
        desc: "Rapel de 72 metros para dentro de uma caverna submersa. Estalagmites de 10m formadas no ar durante as glaciações, agora visíveis embaixo d'água. Visibilidade de 50-60m — entre as maiores do mundo em ambiente subterrâneo.",
        highlight: "8-10 pessoas/dia · Reserva antecipada obrigatória",
        emoji: "🕳️",
    },
    {
        name: "Buraco das Araras",
        badge: "🦜 Birdwatching",
        badgeColor: "bg-red-500/20 text-red-300",
        desc: "Dolina de 500m de diâmetro e 100m de profundidade — uma das maiores da América do Sul. No interior vive colônia de 100-150 araras-vermelhas. Araras-azuis, falcões e corujões completam o espetáculo. Top 5 de observação de araras do MS.",
        highlight: "500m diâmetro · 100-150 araras-vermelhas",
        emoji: "🌋",
    },
    {
        name: "Rio Sucuri",
        badge: "🌿 Mais Cristalino",
        badgeColor: "bg-emerald-500/20 text-emerald-300",
        desc: "Considerado o rio de água mais cristalina do mundo por publicações científicas. Nasce de ressurgência calcária a 22°C constantes. Jardins subaquáticos de macrófitas e corrente suavíssima — flutuação passiva numa cena de aquário.",
        highlight: "Ressurgência calcária · Jardins subaquáticos",
        emoji: "💚",
    },
    {
        name: "Boca da Onça",
        badge: "💧 Maior do MS",
        badgeColor: "bg-blue-500/20 text-blue-300",
        desc: "A maior cachoeira do Mato Grosso do Sul, com 156 metros de queda total em múltiplos saltos. Trekking de 9km pela Serra da Bodoquena passando por 7 cachoeiras menores. A pedra na base tem perfil de cabeça de onça-pintada.",
        highlight: "156m de queda · 9km de trilha",
        emoji: "⛰️",
    },
    {
        name: "Lagoa Misteriosa",
        badge: "🔵 220m Profundidade",
        badgeColor: "bg-violet-500/20 text-violet-300",
        desc: "Uma das dolinas aquáticas mais profundas do mundo: 220m estimados. A parte mergulhável chega a 90m. Cor turquesa a esmeralda conforme a hora do dia. Mergulhos na zona profunda exigem trimix e certificação técnica avançada.",
        highlight: "220m profundidade · Cor turquesa-esmeralda",
        emoji: "🌊",
    },
    {
        name: "Aquário Natural",
        badge: "👨‍👩‍👧 Para Todos",
        badgeColor: "bg-sky-500/20 text-sky-300",
        desc: "Nascente dentro de estrutura de visitação. Peixes completamente domesticados após décadas de proteção — nadam ao redor dos visitantes sem qualquer medo. Ideal para crianças, idosos e primeiro contato com as águas de Bonito.",
        highlight: "Ideal para famílias · Peixes mansíssimos",
        emoji: "🐟",
    },
];

const foodItems = [
    { name: "Pacu Assado no Sal", badge: "Símbolo", badgeColor: "bg-amber-500/20 text-amber-300", desc: "Peixe inteiro recoberto com sal grosso, assado em brasa lenta por 2-3h. A crosta sela a umidade. Acompanha arroz bruto, farofa de banana e vinagrete de pimenta biquinho.", emoji: "🔥" },
    { name: "Pintado ao Molho de Maracujá", badge: "Clássico", badgeColor: "bg-yellow-500/20 text-yellow-300", desc: "Bagre gigante de carne branca sem espinhos. O molho de maracujá é marca registrada dos restaurantes de Bonito. Pode chegar a 1 metro e 30kg na natureza.", emoji: "🍋" },
    { name: "Dourado Grelhado", badge: "Esportivo", badgeColor: "bg-orange-500/20 text-orange-300", desc: "O tigre dos rios. Carne firme e levemente rosada. Mais apreciado na pesca esportiva do que na mesa, mas é iguaria nos menus bonitenses.", emoji: "🐠" },
    { name: "Piraputanga Frita", badge: "Regional", badgeColor: "bg-pink-500/20 text-pink-300", desc: "Peixe de escamas douradas e rosa, comum no Rio da Prata. Frito inteiro na hora, crocante por fora e suculento por dentro.", emoji: "🍳" },
    { name: "Sorvete de Bocaiúva", badge: "Cerrado", badgeColor: "bg-emerald-500/20 text-emerald-300", desc: "A bocaiúva é a palmeira símbolo do Cerrado. Seu fruto tem sabor entre coco verde e figo maduro — exótico e único. Sorvete, licor, rapadura e farinha.", emoji: "🌴" },
    { name: "Tererê com Chipa", badge: "Fronteira", badgeColor: "bg-teal-500/20 text-teal-300", desc: "Erva-mate gelada (o café do MS) acompanha a chipa paraguaia, pão de queijo feito com farinha de mandioca e queijo assado em forno de barro.", emoji: "🧉" },
];

const curiosities = [
    { emoji: "🦷", fact: "O pacu tem dentes molares idênticos aos humanos, usados para quebrar sementes. Já causou confusão em análises forenses." },
    { emoji: "🦁", fact: "Um dourado de 1 metro nada a 20cm do seu rosto sem fugir — resultado de décadas sem ser perturbado. Em rios não protegidos, são predadores agressivos." },
    { emoji: "🦕", fact: "No Abismo Anhumas, estalagmites de 10m formadas no ar seco das glaciações estão agora completamente submersas — escultura pré-histórica embaixo d'água." },
    { emoji: "💀", fact: "Mastodontes e preguiças-gigantes extintos há 12.000 anos jazem no fundo da Gruta do Lago Azul. O nível da água era 80m mais baixo na última glaciação." },
    { emoji: "📊", fact: "Bonito tem ~23.000 habitantes e recebe ~250.000 turistas/ano. Proporção de 10 turistas por habitante — rara no interior brasileiro." },
    { emoji: "🌡️", fact: "Os rios de nascente calcária mantêm 22°C exatos o ano todo — temperatura da Terra a profundidade constante. Nadar neles é nadar no tempo geológico." },
    { emoji: "🔒", fact: "A Lei de Capacidade de Carga tem 27 anos e nunca foi revogada — atravessou governos de partidos opostos. Há consenso total da sociedade bonitense." },
    { emoji: "🌍", fact: "O PNUMA (ONU), o WWF e a National Geographic citam Bonito entre os 10 melhores exemplos mundiais de ecoturismo gerenciado." },
];

const practicalInfo = [
    {
        icon: MapPin,
        title: "Como Chegar",
        items: [
            "Voo para Campo Grande (CGR) + 297km de rodovia",
            "Transfer aeroporto–Bonito: R$ 150–200/pessoa",
            "Ônibus Campo Grande–Bonito: R$ 80–110 (5h)",
            "Sem voos diretos regulares",
        ],
    },
    {
        icon: Clock,
        title: "Melhor Época",
        items: [
            "Maio a outubro: seco e mais frio (ideal)",
            "Julho: inverno seco, águas mais cristalinas",
            "Dez-mar: chuvas, rios levemente turvos",
            "Alta temporada: reserve com antecedência",
        ],
    },
    {
        icon: Users,
        title: "Hospedagem",
        items: [
            "Zagaia Eco-Resort: R$ 700–1.500/noite",
            "Pousadas médias: R$ 400–700/noite",
            "Pousadas simples: R$ 150–300/noite",
            "Fazendas-hotel all-inclusive: R$ 600–1.200",
        ],
    },
];

// ─── infográfico lightbox ─────────────────────────────────────────────────────
function InfograficoSection() {
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
                            src="/infografico-bonito.png"
                            alt="Infográfico editorial Bonito"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Clique para ampliar</p>
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
                            src="/infografico-bonito.png"
                            alt="Infográfico editorial Bonito"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── componente ───────────────────────────────────────────────────────────────

export default function BonitoPage() {
    const heroRef = useRef(null);
    useInView(heroRef, { once: true });

    return (
        <main className="bg-primary-950 text-white">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
                {/* Fundo gradiente — tons de mar profundo */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-950 via-teal-950 to-primary-950" />

                {/* Brilho solar na superfície */}
                <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-400/20 via-teal-500/10 to-transparent blur-3xl" />
                    <div className="absolute inset-16 rounded-full bg-gradient-radial from-cyan-200/30 via-teal-300/15 to-transparent blur-2xl" />
                </div>

                {/* Raios de luz subaquática */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 w-[3px] bg-gradient-to-b from-cyan-300/60 via-teal-400/20 to-transparent"
                            style={{
                                left: `${10 + i * 11}%`,
                                height: "70%",
                                transform: `rotate(${-15 + i * 5}deg)`,
                                transformOrigin: "top center",
                            }}
                        />
                    ))}
                </div>

                {/* SVG: silhueta subaquática */}
                <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none">
                    <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
                        {/* Leito rochoso */}
                        <path
                            d="M0,320 L0,240 Q120,200 240,230 Q360,160 480,210 Q600,180 720,200 Q840,160 960,195 Q1080,175 1200,205 Q1320,185 1440,215 L1440,320 Z"
                            fill="rgba(6,27,51,0.98)"
                        />
                        {/* Camada de pedras/calcário */}
                        <path
                            d="M0,320 L0,270 Q180,250 360,265 Q540,240 720,258 Q900,245 1080,260 Q1260,248 1440,262 L1440,320 Z"
                            fill="rgba(11,46,79,0.9)"
                        />
                        {/* Plantas aquáticas */}
                        {[80, 200, 340, 500, 660, 820, 980, 1120, 1280, 1400].map((x, i) => (
                            <g key={i}>
                                <path
                                    d={`M${x},320 Q${x - 15},${280 - i * 4} ${x - 5},${240 - i * 3}`}
                                    fill="none"
                                    stroke="rgba(34,197,94,0.4)"
                                    strokeWidth="2"
                                />
                                <path
                                    d={`M${x + 8},320 Q${x + 20},${275 - i * 3} ${x + 12},${235 - i * 4}`}
                                    fill="none"
                                    stroke="rgba(20,184,166,0.35)"
                                    strokeWidth="2"
                                />
                            </g>
                        ))}
                        {/* Peixes silhueta */}
                        <ellipse cx="300" cy="210" rx="20" ry="8" fill="rgba(99,199,255,0.15)" />
                        <ellipse cx="720" cy="195" rx="28" ry="10" fill="rgba(99,199,255,0.12)" />
                        <ellipse cx="1100" cy="220" rx="22" ry="9" fill="rgba(99,199,255,0.15)" />
                        {/* Bolhas */}
                        {[150, 420, 690, 950, 1200].map((x, i) => (
                            <circle key={i} cx={x} cy={180 + i * 8} r="3" fill="rgba(186,230,253,0.25)" />
                        ))}
                    </svg>
                </div>

                {/* Conteúdo hero */}
                <div className="relative z-10 container-custom pb-32 pt-40">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-wrap items-center gap-3 mb-6"
                        >
                            <Link
                                to="/cidades"
                                className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Cidades
                            </Link>
                            <span className="text-white/20">/</span>
                            <span className="text-sm text-cyan-400/80">Mato Grosso do Sul · Brasil</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/25 mb-6"
                        >
                            <Waves className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">Capital do Ecoturismo</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
                        >
                            <span className="text-white">Bonito</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                                Onde o Mundo Vê
                                <br />
                                Dentro da Água
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
                        >
                            600 milhões de anos de calcário criaram rios com visibilidade de 40 metros e grutas
                            com lagos azul-safira. Uma lei municipal de 1997 garantiu que continuassem assim.
                            Bonito é a prova de que a natureza e o turismo podem coexistir — se houver coragem
                            para dizer não quando a cota acabou.
                        </motion.p>

                        {/* Stats hero */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-6"
                        >
                            {[
                                { v: "297 km", l: "de Campo Grande" },
                                { v: "140 km", l: "de Porto Murtinho" },
                                { v: "40 m", l: "de visibilidade" },
                                { v: "27 anos", l: "de lei preservada" },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="font-display text-2xl font-bold text-cyan-300">{s.v}</span>
                                    <span className="text-xs text-white/40">{s.l}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── INFOGRÁFICO ──────────────────────────────────────────────── */}
            <InfograficoSection />

            {/* ── IDENTIDADE ───────────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-14"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            O que torna Bonito única
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Três razões para acreditar
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border p-7 ${p.bg}`}
                            >
                                <p.icon className={`w-8 h-8 ${p.color} mb-4`} />
                                <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GEOLOGIA: POR QUE AS ÁGUAS SÃO CRISTALINAS ──────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                                A ciência do azul
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                                600 Milhões de Anos de Filtro
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-12 mb-8"
                        >
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                A <strong className="text-white">Serra da Bodoquena</strong> é uma formação de rochas calcárias do Pré-Cambriano —
                                600 a 900 milhões de anos de sedimentação de corais, algas e conchas de um mar pré-histórico.
                                Quando a chuva, levemente ácida, infiltra-se por essas rochas, dissolve o carbonato de cálcio e
                                o carrega em solução.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                Ao emergir nas nascentes, o excesso de CO₂ é liberado para o ar. Sem o gás, o cálcio precipita
                                novamente como <strong className="text-cyan-300">calcita sólida</strong> — que remove toda partícula em suspensão
                                da água. O resultado: <strong className="text-white">visibilidade de até 40 metros</strong>.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                A cor azul é física: água pura absorve vermelho e amarelo, refletindo o azul — efeito
                                amplificado pelo <strong className="text-cyan-300">leito branco de calcita</strong> que atua como espelho.
                                Nas grutas, onde não há turbidez alguma, o azul chega ao cobalto e ao safira.
                            </p>
                        </motion.div>

                        {/* Aquífero Guarani */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 flex gap-4 items-start"
                        >
                            <Droplets className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-white mb-1">Aquífero Guarani — A Reserva Sob os Pés</h3>
                                <p className="text-white/55 text-sm leading-relaxed">
                                    Bonito está sobre uma zona de recarga do <strong className="text-white">Sistema Aquífero Guarani</strong>,
                                    o maior aquífero transfronteiriço do mundo: 37.000 km³ de água doce, estendendo-se pelo
                                    Brasil, Argentina, Paraguai e Uruguai. A Serra da Bodoquena é uma das esponjas que alimentam
                                    esta reserva. Preservar a mata nativa de Bonito é preservar água para 45 milhões de pessoas.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── HISTÓRIA ─────────────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">
                            Raízes e memória
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                            Do Calcário à Lei
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {historyCycles.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border ${c.color} p-6`}
                            >
                                <span className={`text-xs font-bold uppercase tracking-widest ${c.accent} block mb-2`}>
                                    {c.period}
                                </span>
                                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{c.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATRATIVOS ────────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/15">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            O que fazer
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Atrativos que Justificam a Viagem
                        </h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            Cada atrativo tem cota diária controlada por lei. Quando acaba, acaba. Reserve com antecedência.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {attractions.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{a.emoji}</span>
                                        <h3 className="font-display text-lg font-bold text-white">{a.name}</h3>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${a.badgeColor} border-current/20 whitespace-nowrap flex-shrink-0`}>
                                        {a.badge}
                                    </span>
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed mb-3">{a.desc}</p>
                                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/70 font-medium">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span>{a.highlight}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SISTEMA BONITO TOUR ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-8 md:p-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Star className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Sistema Único no Brasil</span>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Bonito Tour — A Lei que Ninguém Fura</h2>
                            </div>
                        </div>
                        <div className="space-y-4 text-white/65 text-sm md:text-base leading-relaxed">
                            <p>
                                Desde 1997, <strong className="text-white">nenhum turista entra em nenhum atrativo pago sem voucher de agência credenciada</strong>.
                                Não há ingresso na porteira. Não há negociação. Se a cota diária esgotou, não entra — ponto.
                            </p>
                            <p>
                                Cada atrativo tem uma <strong className="text-emerald-300">capacidade de carga</strong> definida por estudos técnicos
                                (bioacústica para cavernas, hidrodinâmica para rios, comportamento animal para o Buraco das Araras).
                                O Abismo Anhumas tem cota de apenas <strong className="text-white">8 a 10 pessoas por dia</strong>.
                            </p>
                            <p>
                                O resultado é mensurável: a <strong className="text-white">biomassa de peixes cresceu mais de 300%</strong> entre
                                1990 e 2010. Fernando de Noronha, Chapada dos Veadeiros e Jalapão copiaram partes do modelo —
                                mas nenhum implementou o nível de integração de Bonito.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-amber-950/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">
                            À mesa
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            O Pacu e os Sabores do Rio
                        </h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            O pacu não pode ser pescado nos rios turísticos — todos os peixes são protegidos.
                            Os que chegam à mesa vêm de piscicultura licenciada.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {foodItems.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{f.emoji}</span>
                                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${f.badgeColor}`}>
                                        {f.badge}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{f.name}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO 4 DIAS ───────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                            Roteiro sugerido
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">4 Dias em Bonito</h2>
                    </motion.div>
                    <div className="space-y-5">
                        {[
                            {
                                day: "Dia 1",
                                title: "Chegada e Águas Cristalinas",
                                items: ["Manhã: Rio da Prata (flutuação 2,5km — reserve com antecedência)", "Tarde: Aquário Natural para adaptar ao ambiente", "Noite: Pacu assado no sal no Cantinho do Peixe"],
                                color: "border-cyan-500/30 bg-cyan-500/5",
                                num: "text-cyan-400",
                            },
                            {
                                day: "Dia 2",
                                title: "Grutas e Abismos",
                                items: ["Manhã: Gruta do Lago Azul (janeiro-fevereiro: luz única)", "Tarde: Lagoa Misteriosa (opcional: mergulho com certificação)", "Noite: Tererê e chipa no centro histórico"],
                                color: "border-indigo-500/30 bg-indigo-500/5",
                                num: "text-indigo-400",
                            },
                            {
                                day: "Dia 3",
                                title: "Aventura na Serra",
                                items: ["Manhã: Boca da Onça (trekking 9km, 7 cachoeiras)", "Tarde: Buraco das Araras (observação de araras-vermelhas)", "Noite: Pintado ao molho de maracujá"],
                                color: "border-emerald-500/30 bg-emerald-500/5",
                                num: "text-emerald-400",
                            },
                            {
                                day: "Dia 4",
                                title: "Rio Sucuri e Partida",
                                items: ["Manhã: Rio Sucuri (o mais cristalino do mundo)", "Almoço: Sorvete de bocaiúva + artesanato Kadiwéu", "Tarde: Seguir para Porto Murtinho (140km) ou Campo Grande"],
                                color: "border-teal-500/30 bg-teal-500/5",
                                num: "text-teal-400",
                            },
                        ].map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border ${d.color} p-6 flex gap-5`}
                            >
                                <div className="flex-shrink-0">
                                    <span className={`font-display text-3xl font-bold ${d.num}`}>{i + 1}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold text-white/30 uppercase">{d.day}</span>
                                        <span className="font-semibold text-white text-base">{d.title}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {d.items.map((item, j) => (
                                            <li key={j} className="text-white/55 text-sm flex gap-2">
                                                <span className="text-white/20 mt-1">›</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            Fatos que impressionam
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">Curiosidades de Bonito</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 hover:bg-white/[0.07] transition-colors"
                            >
                                <span className="text-2xl block mb-3">{c.emoji}</span>
                                <p className="text-white/60 text-xs leading-relaxed">{c.fact}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-white/40 uppercase tracking-widest block mb-4">
                            Planejamento
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">Informações Práticas</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {practicalInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <info.icon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold text-white">{info.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {info.items.map((item, j) => (
                                        <li key={j} className="text-white/50 text-xs leading-relaxed flex gap-2">
                                            <span className="text-cyan-500/50 mt-0.5">›</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ────────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Camera className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Bonito está a 140 km de Porto Murtinho
                        </h2>
                        <p className="text-white/55 leading-relaxed mb-8">
                            A Rota Bioceânica passa quase pela porta de Bonito. Uma visita de dois a quatro dias
                            nesta cidade transforma qualquer travessia continental numa experiência completa —
                            natureza, cultura, gastronomia e uma das leis ambientais mais respeitadas do planeta.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/cidades/porto-murtinho"
                                className="btn-secondary inline-flex items-center gap-2 group"
                            >
                                Próxima parada: Porto Murtinho
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/cidades"
                                className="btn-outline border-white/20 text-white/70 hover:bg-white/5 inline-flex items-center gap-2"
                            >
                                <Compass className="w-4 h-4" />
                                Ver todas as cidades
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
