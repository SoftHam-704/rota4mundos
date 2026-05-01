import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
        },
    },
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: "http://localhost:3333",
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: "dist",
        sourcemap: true,
    },
});
