// File: src/configs/app.config.ts
import path from "path";
import { fileURLToPath } from "url";

// For ES module __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set("views", [
//     path.join(__dirname, "../views/pages"),
//     path.join(__dirname, "../views/protected"),
//     path.join(__dirname, "../views"),
// ]);

export const appConfig = {
    viewEngine: "ejs",
    viewsPath: path.join(__dirname, "../../views"),
    staticDir: path.join(__dirname, "../../public"),
    jsonLimit: "1mb", // example future config
    urlEncoded: { extended: true }, // extracted from express.urlencoded
    PORT: process.env.PORT || 5001,
};
