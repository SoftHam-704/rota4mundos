import { useEffect } from "react";
import { useParams, useLocation, Navigate, Outlet } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const LANG_MAP = { es: "es-ES", en: "en-US" };

export default function LangWrapper() {
    const { lang: paramLang } = useParams();
    const { pathname } = useLocation();
    // Route "/es" is static — useParams won't carry 'lang'. Fall back to pathname.
    const lang = paramLang ?? pathname.split("/").filter(Boolean)[0];
    const { setLanguage } = useLanguage();

    useEffect(() => {
        if (LANG_MAP[lang]) setLanguage(LANG_MAP[lang]);
    }, [lang, setLanguage]);

    if (!LANG_MAP[lang]) return <Navigate to="/" replace />;

    return <Outlet />;
}
