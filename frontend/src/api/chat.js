import { apiClient } from "./client.js";

export const chatApi = {
    sendMessage: (messages) => apiClient.post("/chat/message", { messages }),
};
