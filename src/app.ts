import express from "express";
import { appConfig } from "./configs/app.config.js";
import pagesRouter from "./routes/pages.js";
import {
    httpLogger,
    errorLogger,
    requestLogger,
} from "./middlewares/logger.middleware.js";
import logger from "./services/logger.js";

const app = express();

// Initialize logger with app config
logger.info("Application initializing", {
    environment: process.env.NODE_ENV,
    viewEngine: appConfig.viewEngine,
});

app.set("view engine", appConfig.viewEngine);
app.set("views", appConfig.viewsPath);

// Middlewares with logging
app.use(requestLogger);
app.use(httpLogger);
app.use(express.static(appConfig.staticDir));
app.use(express.json());
app.use(express.urlencoded(appConfig.urlEncoded));

// Routes
app.use("/", pagesRouter);

// Error handling (with detailed logging)
app.use(errorLogger);

logger.info("Application started successfully", {
    PORT: appConfig.PORT,
    staticDir: appConfig.staticDir,
});

export default app;
