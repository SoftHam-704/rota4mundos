import { useTranslation } from "react-i18next";
import { useIsMobile } from "./useMediaQuery.js";

// PT: /infograficos/  (png=desktop, jpg=mobile)
// ES: /infograficos/esp/
// EN: /infograficos/eng/  (futuro)
const INFOGRAPHIC_MAP = {
    "bonito":                  { pt: "/infograficos/infografico-bonito",                  es: "/infograficos/esp/infografico_bonito_es" },
    "campo-grande":            { pt: "/infograficos/infografico-campo-grande",            es: "/infograficos/esp/infografico_campogrande_es" },
    "jardim":                  { pt: "/infograficos/infografico-jardim",                  es: "/infograficos/esp/infografico_jardim_es" },
    "jujuy":                   { pt: "/infograficos/infografico-jujuy",                   es: "/infograficos/esp/infografico_jujuy_es" },
    "porto-murtinho":          { pt: "/infograficos/infografico-porto-murtinho",          es: "/infograficos/esp/infografico_portomurtinho_es" },
    "sidrolandia":             { pt: "/infograficos/infografico-sidrolandia",             es: "/infograficos/esp/infografico_sidrolandia_es" },
    "tartagal":                { pt: "/infograficos/infografico-tartagal",                es: "/infograficos/esp/infografico_tartagal_es" },
    "carmelo-peralta":         { pt: "/infograficos/infografico-carmelo-peralta",         es: "/infograficos/esp/infografico_carmelo_es" },
    "mariscal-estigarribia":   { pt: "/infograficos/infografico-mariscal-estigarribia",   es: "/infograficos/esp/infografico_mariscal_es" },
    "filadelfia":              { pt: "/infograficos/infografico-filadelfia",               es: "/infograficos/esp/infografico_filadelfia_es" },
    "salta":                   { pt: "/infograficos/infografico-salta",                   es: "/infograficos/esp/infografico_salta_es" },
    "antofagasta":             { pt: "/infograficos/infografico-antofagasta",             es: "/infograficos/esp/infografico_antofagasta_es" },
    "iquique":                 { pt: "/infograficos/infografico-iquique",                 es: "/infograficos/esp/infografico_iquique_es" },
    "mejillones":              { pt: "/infograficos/infografico-mejillones",              es: "/infograficos/esp/infografico_mejillones_es" },
};

export function useInfographic(slug) {
    const { i18n } = useTranslation();
    const isMobile = useIsMobile();
    const lang = i18n.language.startsWith("es") ? "es" : i18n.language.startsWith("en") ? "en" : "pt";
    const paths = INFOGRAPHIC_MAP[slug];
    if (!paths) return null;
    const base = paths[lang] || paths.pt;
    // PT: servidor tem .jpg (mobile) e .png (desktop)
    // ES/EN: apenas .png por enquanto
    const ext = (lang === "pt" && isMobile) ? "jpg" : "png";
    return `${base}.${ext}`;
}
