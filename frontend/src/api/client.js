import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api";

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

function getFingerprint() {
    let fp = localStorage.getItem("rota_fp");
    if (!fp) {
        fp = (typeof crypto !== "undefined" && crypto.randomUUID)
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem("rota_fp", fp);
    }
    return fp;
}

// Interceptor de request: adiciona token JWT e fingerprint
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["X-Fingerprint"] = getFingerprint();
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de response: trata erros globais
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem("auth_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
