import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
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
    const src = useInfographic("bonito");
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
                            src={src}
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
    const isMobile = useIsMobile();
    const heroRef = useRef(null);
    useInView(heroRef, { once: true });

    return (
        <main className="bg-primary-950 text-white">

                        {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Bonito", second: "" }}
                tagline="Rios cristalinos de 40 metros de visibilidade — onde a lei de 1997 protege o que o turismo poderia ter destruido."
                scene="rio-cristalino"
                image="/cities/bonito.png"
                accentColor="#22d3ee"
                stats={[
                    { label: "Metros de visibilidade", value: 40, suffix: " m" },
                    { label: "Km de Campo Grande", value: 297, suffix: " km" },
                    { label: "Km de Porto Murtinho", value: 140, suffix: " km" },
                    { label: "Anos de lei preservada", value: 27 },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────────────────── */}
            <InfograficoSection />

            {/* ── ABISMO ANHUMAS ───────────────────────────────────────────── */}
            <section style={{ background: "linear-gradient(135deg, #020d14 0%, #031824 50%, #020d14 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/abismo_anhumas.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 0.1 }} />
                <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    {/* ── LEFT ── */}
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🕳️</span>
                            <span style={{ color: "#67e8f9", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Destaque Natural</span>
                        </div>
                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            Abismo Anhumas
                        </h2>
                        <p style={{ color: "#67e8f9", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            72 metros de rapel no escuro — e um lago subterrâneo que não existe em mais nenhum lugar do mundo
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                O Abismo Anhumas é uma dolina cárstica de 72 metros de profundidade, formada pelo colapso de uma caverna subterrânea há milhares de anos. A descida é feita em rapel, na escuridão quase total, até que os pés tocam uma <strong style={{ color: "#67e8f9" }}>balsa flutuante</strong> no meio de um lago dentro da terra — cenário que mais parece um planeta alienígena do que o interior do Mato Grosso do Sul.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                O lago subterrâneo tem temperatura constante de <strong style={{ color: "#67e8f9" }}>17°C</strong> e visibilidade de até 40 metros — a mesma transparência das águas superficiais de Bonito, mas aqui no subsolo, iluminada apenas por lanternas e pelo feixe de luz natural que penetra pelo buraco lá em cima. Estalactites com até 10 metros emergem da água. Piraputangas e dourados nadam mansamente ao redor da balsa, indiferentes à presença humana.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                A experiência é considerada uma das mais exclusivas do ecoturismo brasileiro: <strong style={{ color: "#67e8f9" }}>apenas 8 a 10 pessoas por dia</strong> têm acesso, com reserva antecipada obrigatória — às vezes com meses de espera. O limite existe para proteger o ecossistema frágil da caverna e garantir que o visitante viva, de fato, um momento único no planeta.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "⬇️", label: "Profundidade do rapel", value: "72 m" },
                                { icon: "🌡️", label: "Temperatura do lago", value: "17°C" },
                                { icon: "👁️", label: "Visibilidade subaquática", value: "40 m" },
                                { icon: "🎟️", label: "Vagas por dia", value: "8–10 pessoas" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#67e8f9", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT ── */}
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(34,211,238,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", position: "relative" }}>
                            <img src="/cities/abismo_anhumas.jpg" alt="Interior do Abismo Anhumas — lago subterrâneo com estalactites" style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,13,20,0.75) 0%, transparent 55%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                                <p style={{ color: "#cffafe", fontSize: "0.8rem", opacity: 0.8 }}>Bonito · Mato Grosso do Sul · Brasil</p>
                            </div>
                        </div>
                        <div style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#67e8f9", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Como visitar</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "📅", text: "Reserva obrigatória com antecedência — vagas esgotam rápido" },
                                    { icon: "💪", text: "Exige boa condição física — rapel técnico com guias especializados" },
                                    { icon: "🤿", text: "Flutuação no lago subterrâneo incluída após o rapel" },
                                    { icon: "📷", text: "Câmera à prova d'água recomendada; flash prejudica o ecossistema" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#a5f3fc", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

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
