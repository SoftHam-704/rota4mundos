import { apiClient } from "./client.js";

export const socialPostsApi = {
    list: (params) => apiClient.get("/social-posts", { params }),
    create: (data) => apiClient.post("/social-posts", data),
    update: (id, data) => apiClient.put(`/social-posts/${id}`, data),
    delete: (id) => apiClient.delete(`/social-posts/${id}`),
};
