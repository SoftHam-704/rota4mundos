import { apiClient } from "./client.js";

export const articlesApi = {
    list: (params) => apiClient.get("/articles", { params }),
    getBySlug: (slug) => apiClient.get(`/articles/${slug}`),
    create: (data) => apiClient.post("/articles", data),
    update: (id, data) => apiClient.put(`/articles/${id}`, data),
    delete: (id) => apiClient.delete(`/articles/${id}`),
};
