import { Request, Response, NextFunction } from "express";
import logger from "../services/logger.js";
import morgan from "morgan";

// HTTP request logging middleware
export const httpLogger = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        stream: {
            write: (message: string) => logger.info(message.trim()),
        },
    }
);

// Error logging middleware
export const errorLogger = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(`${err.name}: ${err.message}`, {
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    next(err);
};

// Request logging middleware
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.info(`Incoming request: ${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get("User-Agent"),
    });
    next();
};
