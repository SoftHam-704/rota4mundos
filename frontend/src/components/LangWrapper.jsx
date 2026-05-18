import { useEffect } from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SUPPORTED = ["es", "en"];

export default function LangWrapper() {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (SUPPORTED.includes(lang)) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    if (!SUPPORTED.includes(lang)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
