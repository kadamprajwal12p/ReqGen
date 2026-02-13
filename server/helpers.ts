import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: Express) {
    // Simplified path resolution: assume index.js and public/ are siblings in dist/
    const distPath = path.join(__dirname, "public");

    console.log(`[Static] Resolving dist path: ${distPath}`);

    if (!fs.existsSync(distPath)) {
        console.error(`[Static] Error: Build directory not found at ${distPath}`);
        throw new Error(
            `Could not find the build directory: ${distPath}. Make sure to build the client first.`,
        );
    } else {
        try {
            const contents = fs.readdirSync(distPath);
            console.log(`[Static] Contents of distPath: ${contents.join(", ")}`);
            const assetsPath = path.join(distPath, "assets");
            if (fs.existsSync(assetsPath)) {
                console.log(`[Static] Assets folder found. Contents: ${fs.readdirSync(assetsPath).join(", ")}`);
            } else {
                console.warn(`[Static] WARNING: Assets folder not found in ${distPath}`);
            }
        } catch (e) {
            console.error(`[Static] Error reading dist directory: ${e}`);
        }
    }

    app.use(express.static(distPath));

    // Fallback to index.html for SPA routing
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}
