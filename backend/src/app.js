import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { standardLimiter } from "./middlewares/rateLimiter.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/errorMiddleware.js";

// Importação das rotas
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import cityRoutes from "./modules/cities/city.routes.js";
import articleRoutes from "./modules/articles/article.routes.js";
import commentRoutes from "./modules/comments/comment.routes.js";
import newsletterRoutes from "./modules/newsletter/newsletter.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

// Configuração de CORS
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Headers de segurança
app.use(helmet());

// Logging de requisições
app.use(
    morgan(":method :url :status :response-time ms - :res[content-length]", {
        skip: (req) => req.path === "/health",
    })
);

// Rate limiting geral
app.use("/api", standardLimiter);

// Parsing de JSON e URL encoded
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

// Serve arquivos estáticos de uploads em desenvolvimento
if (env.NODE_ENV === "development") {
    app.use("/uploads", express.static("uploads"));
}

// Rota não encontrada (404)
app.use(notFoundMiddleware);

// Middleware centralizado de erros (deve ser o último)
app.use(errorMiddleware);

export default app;
