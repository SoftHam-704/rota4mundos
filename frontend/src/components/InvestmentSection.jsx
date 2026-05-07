import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const countries = [
    {
        name: "Brasil",
        flag: "🇧🇷",
        theme: "Porta Pantaneira",
        headerGradient: "from-amber-700 via-orange-700 to-amber-800",
        accentColor: "text-amber-300",
        borderColor: "border-amber-500/30",
        tagColor: "bg-amber-500/20 text-amber-300",
        description:
            "Da Capital Morena às águas cristalinas de Bonito, o Brasil apresenta à rota sua face mais exuberante — Pantanal, fronteira viva com o Paraguai e ecoturismo reconhecido mundialmente.",
        cities: [
            {
                name: "Campo Grande",
                essence:
                    "Hub logístico e cultural. Italianos, japoneses e libaneses moldaram uma capital mestiça onde sopa paraguaia, soba e chipa convivem numa só mesa.",
                highlight: "Solo avermelhado que deu origem ao apelido 'Capital Morena'",
                featuredLink: "/cidades/campo-grande",
                featuredTeaser: "O BIOPARQUE recorde mundial, o sobá patrimônio do Brasil e o solo que deu nome a uma identidade",
            },
            {
                name: "Porto Murtinho",
                essence:
                    "Cidade de travessia sobre o Rio Paraguai. Erva-mate, tanino e a Festa do Touro Candil — patrimônio imaterial — revelam uma identidade de fronteira insubstituível.",
                highlight: "Patrimônio Imaterial: Festa do Touro Candil",
                featuredLink: "/cidades/porto-murtinho",
                featuredTeaser: "A lenda do Castelinho, o fogo do Toro Candil e o rio que guarda tudo",
            },
            {
                name: "Bonito",
                essence:
                    "O calcário da região filtra rios e cria visibilidade subaquática extraordinária. Referência nacional em controle de capacidade e turismo responsável.",
                highlight: "Ecoturismo sustentável de classe mundial",
                featuredLink: "/cidades/bonito",
                featuredTeaser: "Visibilidade de 40m, dourados mansos e uma lei de 1997 que a ONU chama de referência mundial",
            },
            {
                name: "Jardim",
                essence:
                    "Porta da Serra da Bodoquena e vizinha histórica de Bonito. Lagoa Misteriosa, Buraco das Araras e rios cristalinos formam um ecoturismo ainda mais íntimo e autêntico.",
                highlight: "Serra da Bodoquena — aquífero calcário único no mundo",
                featuredLink: "/cidades/jardim",
                featuredTeaser: "A Lagoa Misteriosa, o Buraco das Araras e as águas que a geologia calcária tornou mágicas",
            },
        ],
        signature: ["Pantanal", "Fronteira", "Ecoturismo"],
    },
    {
        name: "Paraguai",
        flag: "🇵🇾",
        theme: "Chaco Profundo",
        headerGradient: "from-teal-700 via-emerald-700 to-teal-800",
        accentColor: "text-teal-300",
        borderColor: "border-teal-500/30",
        tagColor: "bg-teal-500/20 text-teal-300",
        description:
            "O Chaco paraguaio revela mundos que poucos conhecem — comunidades Ayoreo e Guarani Nandeva, herança mennonita do centro-europeu e uma biodiversidade de singular aridez.",
        cities: [
            {
                name: "Carmelo Peralta",
                essence:
                    "Portal de entrada para o Chaco. A travessia começa aqui, com presença marcante das comunidades Ayoreo e paisagens abertas que anunciam mundos distintos.",
                highlight: "Biodiversidade única do bioma Chaco",
                featuredLink: "/cidades/carmelo-peralta",
                featuredTeaser: "A Ponte Bioceânica, o Rio Paraguai e o Chaco que conecta oceanos e culturas",
            },
            {
                name: "Mariscal Estigarribia",
                essence:
                    "65% da população é indígena. O Arete Guasu — o Carnaval Guarani — é celebração de força simbólica rara, ligando cosmogonia ancestral a pertencimento coletivo.",
                highlight: "Arete Guasu — Carnaval Guarani ancestral",
                featuredLink: "/cidades/mariscal-estigarribia",
                featuredTeaser: "O cruzamento PY-15 + PY-09, o Parque Enciso e os horizontes infinitos do Chaco Profundo",
            },
            {
                name: "Filadelfia",
                essence:
                    "Colônia mennonita que transformou o Chaco árido por meio de cooperativismo e memória centro-europeia. A culinária une receitas alemãs a ingredientes paraguaios.",
                highlight: "Cooperativismo + Culinária alemã-paraguaia",
            },
        ],
        signature: ["Indígenas", "Mennonitas", "Chaco Selvagem"],
    },
    {
        name: "Argentina",
        flag: "🇦🇷",
        theme: "Andes Vivos",
        headerGradient: "from-blue-700 via-indigo-700 to-blue-800",
        accentColor: "text-blue-300",
        borderColor: "border-blue-500/30",
        tagColor: "bg-blue-500/20 text-blue-300",
        description:
            "O noroeste argentino vibra com zamba, chacarera e o culto milenar à Pachamama. Salta e Jujuy guardam algumas das paisagens mais cinematográficas da América do Sul.",
        cities: [
            {
                name: "Salta",
                essence:
                    "Capital do folclore nortenho. Nas peñas folclóricas, zamba e chacarera soam ao vivo enquanto empanadas salteñas e locro chegam à mesa — tradição viva, não produto turístico.",
                highlight: "Peñas folclóricas — zamba e chacarera ao vivo",
            },
            {
                name: "Jujuy",
                essence:
                    "Quebrada de Humahuaca, Patrimônio da Humanidade. O culto à Pachamama e a cosmovisão andina marcam profundamente o calendário, a gastronomia e o modo de vida local.",
                highlight: "UNESCO — Quebrada de Humahuaca",
            },
            {
                name: "Tartagal",
                essence:
                    "Fronteira interna argentina. Presença indígena estruturante, culinária do NOA autêntica e paisagens de transição para além dos roteiros convencionais.",
                highlight: "Povos originários e cozinha nortenha autêntica",
            },
        ],
        signature: ["Folclore", "Pachamama", "Patrimônio UNESCO"],
    },
    {
        name: "Chile",
        flag: "🇨🇱",
        theme: "Portas do Pacífico",
        headerGradient: "from-red-700 via-rose-700 to-red-800",
        accentColor: "text-red-300",
        borderColor: "border-red-500/30",
        tagColor: "bg-red-500/20 text-red-300",
        description:
            "O Atacama encontra o Pacífico. Porto, salitre, ceviche e memória operária se fundem numa identidade costeira única que marca o desfecho — ou o começo — da maior travessia continental da América do Sul.",
        cities: [
            {
                name: "Antofagasta",
                essence:
                    "Onde o deserto de Atacama beija o Pacífico. Forjada pelo salitre e pela mineração, hoje combina vida universitária e gastronomia marinha de alto nível.",
                highlight: "Dualidade única: Atacama + Oceano Pacífico",
            },
            {
                name: "Iquique",
                essence:
                    "Da memória salitreira à zona franca. Cidade de contrastes que se reinventou sem perder sua herança de trabalho, resistência e vida costeira.",
                highlight: "Patrimônio salitreiro + Zona Franca + Mar",
            },
            {
                name: "Mejillones",
                essence:
                    "Porto histórico em escala humana. Mariscos frescos, cais e embarcações encerram a narrativa da travessia com autenticidade e sabor.",
                highlight: "Frutos do mar + Identidade marítima autêntica",
            },
        ],
        signature: ["Pacífico", "Salitre", "Gastronomia Marinha"],
    },
];

const routePoints = [
    { label: "Campo Grande", pos: "8%" },
    { label: "Chaco Paraguaio", pos: "30%" },
    { label: "Noroeste Argentino", pos: "57%" },
    { label: "Antofagasta", pos: "85%" },
];

export default function InvestmentSection() {
    const ref = useRef(null);
    useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="section-padding bg-primary-950 relative overflow-hidden">
            {/* Atmospheric glows */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-sm font-semibold text-secondary-400 uppercase tracking-widest mb-4"
                    >
                        Quatro países · Uma travessia
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                    >
                        Um Corredor,{" "}
                        <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-orange-400 bg-clip-text text-transparent">
                            Quatro Mundos
                        </span>
                    </motion.h2>

                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-secondary-500/30 font-display text-7xl leading-none select-none">
                            "
                        </div>
                        <p className="text-base md:text-lg text-white/55 italic leading-relaxed px-6">
                            A Rota Bioceânica conecta capitais regionais, cidades de fronteira, comunidades indígenas,
                            colônias históricas, destinos de natureza e portos do Pacífico — é a América do Sul contada
                            pelos seus povos, sabores e paisagens.
                        </p>
                    </motion.blockquote>
                </div>

                {/* Route visual line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="hidden lg:block mb-16 relative h-16"
                >
                    {/* Gradient line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
                        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-amber-500 via-teal-500 via-blue-500 to-red-500 origin-left opacity-60"
                    />
                    {/* Waypoints */}
                    {routePoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.15 }}
                            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                            style={{ left: point.pos }}
                        >
                            <div className="w-3 h-3 rounded-full bg-white/20 border border-white/50 ring-4 ring-white/10" />
                            <span className="text-xs text-white/40 whitespace-nowrap mt-3">{point.label}</span>
                        </motion.div>
                    ))}
                    {/* Ocean labels */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-0">
                        <span className="text-xs text-secondary-400/60 font-medium">← Atlântico · · · Pacífico →</span>
                    </div>
                </motion.div>

                {/* Country cards — 2×2 grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {countries.map((country, index) => (
                        <motion.article
                            key={country.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: 0.08 * index }}
                            className={`rounded-3xl border ${country.borderColor} bg-white/[0.04] backdrop-blur-sm overflow-hidden hover:bg-white/[0.07] transition-all duration-500 group`}
                        >
                            {/* Card header */}
                            <div className={`p-6 bg-gradient-to-br ${country.headerGradient} relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
                                <div className="absolute bottom-0 right-0 text-8xl opacity-10 leading-none select-none translate-y-3 translate-x-3">
                                    {country.flag}
                                </div>
                                <div className="relative flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-3xl">{country.flag}</span>
                                            <div>
                                                <h3 className="font-display text-2xl font-bold text-white leading-none">
                                                    {country.name}
                                                </h3>
                                                <p className="text-white/60 text-xs font-medium tracking-widest uppercase mt-0.5">
                                                    {country.theme}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-1 max-w-[180px]">
                                        {country.signature.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/70 font-medium whitespace-nowrap"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="px-6 pt-5">
                                <p className="text-white/60 text-sm leading-relaxed">{country.description}</p>
                            </div>

                            {/* Cities */}
                            <div className="px-6 py-5 space-y-5">
                                {country.cities.map((city, ci) => (
                                    <div key={ci} className="flex gap-3.5 group/city">
                                        <div className="flex-shrink-0 mt-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400/60 group-hover/city:bg-secondary-400 transition-colors" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white/90 text-sm mb-0.5">{city.name}</div>
                                            <div className="text-white/45 text-xs leading-relaxed">{city.essence}</div>
                                            <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-secondary-400/70">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                <span>{city.highlight}</span>
                                            </div>
                                            {city.featuredLink && (
                                                <Link
                                                    to={city.featuredLink}
                                                    className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-secondary-300 hover:text-secondary-200 group/link transition-colors"
                                                >
                                                    <BookOpen className="w-3 h-3 flex-shrink-0" />
                                                    <span className="italic">{city.featuredTeaser}</span>
                                                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform flex-shrink-0" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Editorial closing */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 flex flex-col items-center text-center gap-6"
                >
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary-400/40 to-transparent" />
                    <p className="text-white/30 text-sm italic max-w-lg">
                        Cada cidade, uma página. Cada cultura, um convite. A rota começa no Pantanal e termina no Pacífico
                        — mas as histórias não têm fim.
                    </p>
                    <Link
                        to="/cidades"
                        className="btn-secondary inline-flex items-center gap-2 group"
                    >
                        Explorar todas as cidades
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
