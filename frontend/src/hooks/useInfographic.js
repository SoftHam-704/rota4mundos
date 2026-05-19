import { useTranslation } from "react-i18next";
import { useIsMobile } from "./useMediaQuery.js";

// Caminhos sem extensão — extensão resolvida em runtime (mobile=jpg, desktop=png)
// ES ainda não tem versão JPG: sempre usa PNG até as versões mobile estarem prontas
const INFOGRAPHIC_MAP = {
    "bonito":                  { pt: "/infografico-bonito",                  es: "/es/infografico_bonito_es" },
    "campo-grande":            { pt: "/infografico-campo-grande",            es: "/es/infografico_campogrande_es" },
    "jardim":                  { pt: "/infografico-jardim",                  es: "/es/infografico_jardim_es" },
    "jujuy":                   { pt: "/infografico-jujuy",                   es: "/es/infografico_jujuy_es" },
    "porto-murtinho":          { pt: "/infografico-porto-murtinho",          es: "/es/infografico_portomurtinho_es" },
    "sidrolandia":             { pt: "/infografico-sidrolandia",             es: "/es/infografico_sidrolandia_es" },
    "tartagal":                { pt: "/infografico-tartagal",                es: "/es/infografico_tartagal_es" },
    "carmelo-peralta":         { pt: "/infografico-carmelo-peralta",         es: "/es/infografico_carmelo_es" },
    "mariscal-estigarribia":   { pt: "/infografico-mariscal-estigarribia",   es: "/es/infografico_mariscal_es" },
    "filadelfia":              { pt: "/infografico-filadelfia",               es: "/es/infografico_filadelfia_es" },
    "salta":                   { pt: "/infografico-salta",                   es: "/es/infografico_salta_es" },
    "antofagasta":             { pt: "/infografico-antofagasta",             es: "/es/infografico_antofagasta_es" },
    "iquique":                 { pt: "/infografico-iquique",                 es: "/es/infografico_iquique_es" },
    "mejillones":              { pt: "/infografico-mejillones",              es: "/es/infografico_mejillones_es" },
};

export function useInfographic(slug) {
    const { i18n } = useTranslation();
    const isMobile = useIsMobile();
    const lang = i18n.language.startsWith("es") ? "es" : i18n.language.startsWith("en") ? "en" : "pt";
    const paths = INFOGRAPHIC_MAP[slug];
    if (!paths) return null;
    const base = paths[lang] || paths.pt;
    // PT: servidor tem .jpg (mobile) e .png (desktop)
    // ES: apenas .png por enquanto — quando JPGs estiverem prontos, remover a condição lang === "pt"
    const ext = (lang === "pt" && isMobile) ? "jpg" : "png";
    return `${base}.${ext}`;
}
