import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();
app.use(express.json());

// Example API route
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Vercel Express!" });
});

// Export as default function for Vercel serverless
export default (req: VercelRequest, res: VercelResponse) => app(req, res);
