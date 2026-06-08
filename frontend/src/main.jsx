import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import "./styles/global.css";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <LanguageProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "#0B2E4F",
                            color: "#fff",
                            borderRadius: "12px",
                        },
                    }}
                />
                            </LanguageProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
