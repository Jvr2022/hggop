import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import * as path from "path";

const app = express();
app.use(express.json());

// Example endpoint
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Vercel Express!" });
});

// Serve frontend (optional if using dist/public as static)
app.use(express.static(path.join(__dirname, "../dist/public")));

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
