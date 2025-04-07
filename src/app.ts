import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ES module compatible __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../views"));
// app.set("views", [
//     path.join(__dirname, "../views/pages"),
//     path.join(__dirname, "../views/protected"),
//     path.join(__dirname, "../views"),
// ]);

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import pagesRouter from "./routes/pages.js";

app.use("/", pagesRouter);

export default app;
