import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/auth.js";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (credentials) => {
                set({ isLoading: true });
                try {
                    const { data } = await authApi.login(credentials);
                    localStorage.setItem("auth_token", data.data.token);
                    set({
                        user: data.data.user,
                        token: data.data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.message || "Erro ao fazer login",
                    };
                }
            },

            register: async (data) => {
                set({ isLoading: true });
                try {
                    const response = await authApi.register(data);
                    localStorage.setItem("auth_token", response.data.data.token);
                    set({
                        user: response.data.data.user,
                        token: response.data.data.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.message || "Erro ao registrar",
                    };
                }
            },

            logout: () => {
                localStorage.removeItem("auth_token");
                set({ user: null, token: null, isAuthenticated: false });
            },

            checkAuth: async () => {
                const token = localStorage.getItem("auth_token");
                if (!token) return;

                set({ isLoading: true });
                try {
                    const { data } = await authApi.getMe();
                    set({
                        user: data.data,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch {
                    localStorage.removeItem("auth_token");
                    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
                }
            },

            hasRole: (roles) => {
                const { user } = get();
                if (!user) return false;
                return roles.includes(user.role);
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
        }
    )
);
