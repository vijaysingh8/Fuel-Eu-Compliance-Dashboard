import express from "express";
import cors from "cors";
import { api } from "./routes";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", api);
  app.get("/health", (_req, res) => res.json({ ok: true }));
  return app;
}