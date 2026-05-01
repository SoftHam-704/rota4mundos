import { apiClient } from "./client.js";

export const authApi = {
    login: (credentials) => apiClient.post("/auth/login", credentials),
    register: (data) => apiClient.post("/auth/register", data),
    getMe: () => apiClient.get("/auth/me"),
    forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
};
