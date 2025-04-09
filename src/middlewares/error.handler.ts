// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import logger from "../services/logger.js";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof Error) {
        logger.error(err.message, { stack: err.stack });
        return res.status(400).json({ error: err.message });
    }
    logger.error("Unknown error", { error: String(err) });
    res.status(500).json({ error: "Internal server error" });
}
