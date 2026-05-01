import { apiClient } from "./client.js";

export const sponsorApi = {
    submitInterest: (data) => apiClient.post("/sponsors/interesse", data),
};
