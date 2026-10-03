import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// A abertura (abertura.html) vai DENTRO do index.html, logo após <body>: em CSS puro ela pinta no
// primeiro instante, antes de o bundle (~600 KB) chegar. Fica num arquivo próprio para editar.
const abertura = () => ({
    name: "r4m-abertura",
    transformIndexHtml(html) {
        const bloco = fs.readFileSync(path.resolve(__dirname, "abertura.html"), "utf8");
        return html.replace("<body>", "<body>\n" + bloco);
    },
});

export default defineConfig({
    plugins: [react(), abertura()],
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
        sourcemap: false,
        rollupOptions: {
            output: {
                entryFileNames: "assets/index.js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
    },
});
