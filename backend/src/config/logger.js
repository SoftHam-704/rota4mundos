import winston from "winston";

const { combine, timestamp, json, printf, colorize, errors } = winston.format;

// Formato customizado para desenvolvimento
const devFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    if (stack) {
        msg += `\n${stack}`;
    }
    return msg;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    defaultMeta: { service: "portal-rota-bioceanica" },
    transports: [
        new winston.transports.Console({
            format:
                process.env.NODE_ENV === "development"
                    ? combine(colorize(), timestamp(), devFormat)
                    : combine(timestamp(), json()),
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: combine(timestamp(), json()),
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            format: combine(timestamp(), json()),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: "logs/rejections.log" }),
    ],
});

export default logger;
