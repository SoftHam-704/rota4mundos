import { useTranslation } from "react-i18next";

const INFOGRAPHIC_MAP = {
    "bonito":         { pt: "/infografico-bonito.png",         es: "/es/infografico_bonito_es.png" },
    "campo-grande":   { pt: "/infografico-campo-grande.png",   es: "/es/infografico_campogrande_es.png" },
    "jardim":         { pt: "/infografico-jardim.png",         es: "/es/infografico_jardim_es.png" },
    "jujuy":          { pt: "/infografico-jujuy.png",          es: "/es/infografico_jujuy_es.png" },
    "porto-murtinho": { pt: "/infografico-porto-murtinho.png", es: "/es/infografico_portomurtinho_es.png" },
    "sidrolandia":    { pt: "/infografico-sidrolandia.png",    es: "/es/infografico_sidrolandia_es.png" },
    "tartagal":       { pt: "/infografico-tartagal.png",       es: "/es/infografico_tartagal_es.png" },
};

export function useInfographic(slug) {
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith("es") ? "es" : i18n.language.startsWith("en") ? "en" : "pt";
    const paths = INFOGRAPHIC_MAP[slug];
    if (!paths) return null;
    return paths[lang] || paths.pt;
}
