// backend/src/adapters/inbound/http/routes.ts
import { Router } from "express";

import { RouteRepoPrisma } from "../../outbound/postgres/RouteRepoPrisma";
import { ComplianceRepoPrisma } from "../../outbound/postgres/ComplianceRepoPrisma";
import { BankingRepoPrisma } from "../../outbound/postgres/BankingRepoPrisma";
import { PoolRepoPrisma } from "../../outbound/postgres/PoolRepoPrisma";

import { computeCBForRoute } from "../../../core/application/ComputeCB";
import { compareRoutes } from "../../../core/application/ComputeComparison";
import { bankSurplus } from "../../../core/application/BankSurplus";
import { applyBanked } from "../../../core/application/ApplyBanked";
import { allocatePool, validatePool } from "../../../core/application/CreatePool";

export const api = Router();

// -------- ROUTES ----------
api.get("/routes", async (req, res) => {
  const { vesselType, fuelType, year } = req.query;
  const list = await RouteRepoPrisma.list({
    vesselType: vesselType as string | undefined,
    fuelType: fuelType as string | undefined,
    year: year ? Number(year) : undefined,
  });
  res.json(list);
});

api.post("/routes/:routeId/baseline", async (req, res) => {
  await RouteRepoPrisma.setBaseline(req.params.routeId);
  res.json({ ok: true });
});

api.get("/routes/comparison", async (_req, res) => {
  const baseline = await RouteRepoPrisma.getBaseline();
  if (!baseline) return res.status(400).json({ error: "No baseline set" });

  const all = await RouteRepoPrisma.list();
  const rows = all
    .filter((r) => r.routeId !== baseline.routeId)
    .map((r) => ({
      routeId: r.routeId,
      baseline: baseline.ghgIntensity,
      comparison: r.ghgIntensity,
      ...compareRoutes(baseline, r),
    }));

  res.json({ baselineRoute: baseline.routeId, rows });
});

// -------- COMPLIANCE ----------
api.get("/compliance/cb", async (req, res) => {
  // For demo, compute CB from a route passed as routeId; default shipId = routeId
  const { shipId, year, routeId } = req.query as any;
  if (!routeId) return res.status(400).json({ error: "routeId is required" });

  const r = (await RouteRepoPrisma.list()).find((x) => x.routeId === routeId);
  if (!r) return res.status(404).json({ error: "route not found" });

  const { cb, energy } = computeCBForRoute(r);
  await ComplianceRepoPrisma.upsert({
    shipId: shipId ?? r.routeId,
    year: Number(year ?? r.year),
    cb,
  });

  res.json({
    shipId: shipId ?? r.routeId,
    year: Number(year ?? r.year),
    energy,
    cb,
  });
});

api.get("/compliance/adjusted-cb", async (req, res) => {
  const { shipId, year } = req.query as any;
  const record = await ComplianceRepoPrisma.get(shipId, Number(year));
  if (!record) return res.status(404).json({ error: "CB record not found" });

  const banked = await BankingRepoPrisma.getBanked(shipId, Number(year));
  res.json({ shipId, year: Number(year), cb: record.cb + banked });
});

// -------- BANKING ----------
api.get("/banking/records", async (req, res) => {
  const { shipId, year } = req.query as any;
  const sum = await BankingRepoPrisma.getBanked(shipId, Number(year));
  res.json({ shipId, year: Number(year), banked: sum });
});

api.post("/banking/bank", async (req, res) => {
  const { shipId, year, cb } = req.body as any;
  try {
    const out = await bankSurplus(
      BankingRepoPrisma,
      shipId,
      Number(year),
      Number(cb)
    );
    res.json(out);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

api.post("/banking/apply", async (req, res) => {
  const { shipId, year, amount } = req.body as any;
  try {
    const out = await applyBanked(
      BankingRepoPrisma,
      shipId,
      Number(year),
      Number(amount)
    );
    res.json(out);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// -------- POOLS ----------
api.post("/pools", async (req, res) => {
  const input = req.body as any; // { year, members:[{shipId, cbBefore}] }
  try {
    validatePool(input);
    const allocated = allocatePool(input);
    const saved = await PoolRepoPrisma.create({
      year: input.year,
      members: allocated,
    });
    res.json(saved);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});
