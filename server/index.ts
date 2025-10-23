import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";

const app = express();
app.use(express.json());

// Example API
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Vercel Express!" });
});

// Serve static frontend if needed
app.use(express.static(path.join(__dirname, "../public")));

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
