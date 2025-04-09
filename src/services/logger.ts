// services/logger.ts
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { LogLevel } from "../types/logger.types";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "../../logs");

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
        // Destructure with defaults to handle cases where properties might be missing
        const { timestamp, level, message } = info;
        return `${timestamp} [${level}]: ${message}`;
    })
);

const transports = [
    new DailyRotateFile({
        filename: path.join(logsDir, "application-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "30d", // Keep logs for 30 days
        format: fileFormat,
        level: "info",
    }),
    new DailyRotateFile({
        filename: path.join(logsDir, "error-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "30d",
        format: fileFormat,
        level: "error",
    }),
    new winston.transports.Console({
        format: consoleFormat,
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
    }),
];

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports,
    exitOnError: false,
});

// Add metadata to logs
export const logWithMeta = (level: LogLevel, message: string, meta?: any) => {
    logger.log(level, message, { ...meta });
};

export default logger;
