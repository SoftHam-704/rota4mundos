import { useLanguage } from "../contexts/LanguageContext.jsx";

const INFOGRAPHIC_MAP = {
    "bonito":                  { pt: "/infograficos/ptg/infografico-bonito",                  es: "/infograficos/esp/infografico_bonito_es",               en: "/infograficos/eng/infografico_bonito_en" },
    "campo-grande":            { pt: "/infograficos/ptg/infografico-campo-grande",            es: "/infograficos/esp/infografico_campogrande_es",          en: "/infograficos/eng/infografico_campogrande_en" },
    "jardim":                  { pt: "/infograficos/ptg/infografico-jardim",                  es: "/infograficos/esp/infografico_jardim_es",               en: "/infograficos/eng/infografico_jardim_en" },
    "jujuy":                   { pt: "/infograficos/ptg/infografico-jujuy",                   es: "/infograficos/esp/infografico_jujuy_es",                en: "/infograficos/eng/infografico_jujuy_en" },
    "porto-murtinho":          { pt: "/infograficos/ptg/infografico-porto-murtinho",          es: "/infograficos/esp/infografico_portomurtinho_es",        en: "/infograficos/eng/infografico_portomurtinho_en" },
    "sidrolandia":             { pt: "/infograficos/ptg/infografico-sidrolandia",             es: "/infograficos/esp/infografico_sidrolandia_es",          en: "/infograficos/eng/infografico_sidrolandia_en" },
    "tartagal":                { pt: "/infograficos/ptg/infografico-tartagal",                es: "/infograficos/esp/infografico_tartagal_es",             en: "/infograficos/eng/infografico_tartagal_en" },
    "carmelo-peralta":         { pt: "/infograficos/ptg/infografico-carmelo-peralta",         es: "/infograficos/esp/infografico_carmelo_es",              en: "/infograficos/eng/infografico_carmelo_en" },
    "mariscal-estigarribia":   { pt: "/infograficos/ptg/infografico-mariscal-estigarribia",   es: "/infograficos/esp/infografico_mariscal_es",             en: "/infograficos/eng/infografico_mariscal_en" },
    "filadelfia":              { pt: "/infograficos/ptg/infografico-filadelfia",               es: "/infograficos/esp/infografico_filadelfia_es",           en: "/infograficos/eng/infografico_filadelfia_en" },
    "salta":                   { pt: "/infograficos/ptg/infografico-salta",                   es: "/infograficos/esp/infografico_salta_es",                en: "/infograficos/eng/infografico_salta_en" },
    "antofagasta":             { pt: "/infograficos/ptg/infografico-antofagasta",             es: "/infograficos/esp/infografico_antofagasta_es",          en: "/infograficos/eng/infografico_antofagasta_en" },
    "iquique":                 { pt: "/infograficos/ptg/infografico-iquique",                 es: "/infograficos/esp/infografico_iquique_es",              en: "/infograficos/eng/infografico_iquique_en" },
    "mejillones":              { pt: "/infograficos/ptg/infografico-mejillones",              es: "/infograficos/esp/infografico_mejillones_es",           en: "/infograficos/eng/infografico_mejillones_en" },
};

export function useInfographic(slug) {
    const { language } = useLanguage();
    const lang = language.startsWith("es") ? "es" : language.startsWith("en") ? "en" : "pt";
    const paths = INFOGRAPHIC_MAP[slug];
    if (!paths) return null;
    const base = paths[lang] || paths.pt;
    return `${base}.jpg`;
}
