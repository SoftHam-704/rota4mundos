import { apiClient } from "./client.js";

export const contributionsApi = {
    submit: (data) => apiClient.post("/contributions", data),
    list:   (params) => apiClient.get("/contributions", { params }),
    update: (id, data) => apiClient.put(`/contributions/${id}`, data),
};
