import { apiClient } from "./client.js";

export const siteApi = {
    getLikes:    () => apiClient.get("/site/likes"),
    toggleLike:  () => apiClient.post("/site/like"),
};
