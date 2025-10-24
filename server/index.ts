import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { registerRoutes } from "./routes";
import { serveStatic } from "./vite";

const app = express();
app.use(express.json());

// Example API route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Vercel Express!" });
});

// Register application routes
registerRoutes(app);

// If not running on Vercel, start a local server and serve built static assets
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
if (!isVercel) {
  try {
    // Serve dist/public if present
    serveStatic(app);
  } catch (_) {
    // ignore if dist/public is missing; app will still serve API
  }
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  app.listen(port, () => {
    console.log(`HTTP Listening on http://localhost:${port}`);
  });
}

// Export as default function for Vercel serverless
export default (req: VercelRequest, res: VercelResponse) => app(req, res);
