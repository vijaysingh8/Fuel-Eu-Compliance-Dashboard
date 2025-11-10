import { compareRoutes } from "../src/core/application/ComputeComparison";
import { describe, expect, it } from "vitest";


describe("compareRoutes", () => {
const baseline: any = { ghgIntensity: 91 };
const c: any = { ghgIntensity: 88 };
it("percent diff negative and compliant true", () => {
const r = compareRoutes(baseline, c);
expect(r.percentDiff).toBeLessThan(0);
expect(r.compliant).toBe(true);
});
});