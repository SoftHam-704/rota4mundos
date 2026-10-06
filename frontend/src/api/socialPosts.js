import { apiClient } from "./client.js";

export const socialPostsApi = {
    list: (params) => apiClient.get("/social-posts", { params }),
    status: () => apiClient.get("/social-posts/status"),
    gerar: () => apiClient.post("/social-posts/gerar"),
    aprovar: (id) => apiClient.post(`/social-posts/${id}/aprovar`),
    rejeitar: (id) => apiClient.post(`/social-posts/${id}/rejeitar`),
    publicadoAMao: (id) => apiClient.post(`/social-posts/${id}/publicado-a-mao`),
    editarLegenda: (id, caption) => apiClient.put(`/social-posts/${id}`, { caption }),
    publicarAgora: (id) => apiClient.post(`/social-posts/${id}/publicar-agora`),
    delete: (id) => apiClient.delete(`/social-posts/${id}`),
    conectarFacebook: () => apiClient.post("/social-posts/facebook/conectar"),
};
