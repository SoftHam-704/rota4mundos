import { apiClient } from "./client.js";

export const citiesApi = {
    list: (params) => apiClient.get("/cities", { params }),
    getBySlug: (slug) => apiClient.get(`/cities/${slug}`),
    create: (data) => apiClient.post("/cities", data),
    update: (id, data) => apiClient.put(`/cities/${id}`, data),
    delete: (id) => apiClient.delete(`/cities/${id}`),
};
