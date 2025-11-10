import { computeEnergyMJ, computeCB } from "../src/core/application/ComputeCB";
import { describe, expect, it } from "vitest";


describe("ComputeCB", () => {
it("computes energy and CB", () => {
const energy = computeEnergyMJ(1); // 1 tonne
expect(energy).toBe(41000);
const cb = computeCB(90, energy, 89.3368); // delta = -0.6632 → negative CB
expect(cb).toBeLessThan(0);
});
});