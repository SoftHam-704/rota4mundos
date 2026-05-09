import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../api/client.js";

// Detecta país pelo Accept-Language do browser (aproximação simples)
function guessCountry() {
    try {
        const lang = navigator.language || navigator.languages?.[0] || "";
        const tag = lang.split("-")[1]?.toUpperCase();
        return tag || null;
    } catch {
        return null;
    }
}

export function usePageView() {
    const location = useLocation();

    useEffect(() => {
        // pequeno delay para não competir com o render inicial
        const timer = setTimeout(() => {
            apiClient.post("/pageviews", {
                path: location.pathname,
                referrer: document.referrer || null,
                country: guessCountry(),
            }).catch(() => {}); // falha silenciosa — nunca deve quebrar o site
        }, 500);

        return () => clearTimeout(timer);
    }, [location.pathname]);
}
