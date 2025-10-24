import express from "express";

const app = express();
app.use(express.json());

// Example endpoint
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from Vercel Express!" });
});

export default (req, res) => {
  app(req, res);
};
