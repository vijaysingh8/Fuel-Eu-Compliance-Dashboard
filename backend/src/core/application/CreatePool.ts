import type { PoolInput } from "../domain/Pool";


export function validatePool(input: PoolInput) {
const sum = input.members.reduce((s, m) => s + m.cbBefore, 0);
if (sum < 0) throw new Error("Pool sum must be ≥ 0");
return true;
}


export function allocatePool(input: PoolInput) {
// Greedy: sort by cb desc, move surplus to deficits
const sorted = [...input.members].sort((a,b) => b.cbBefore - a.cbBefore);
let deficits = sorted.filter(m => m.cbBefore < 0);
let surplusers = sorted.filter(m => m.cbBefore > 0);


const result = sorted.map(m => ({ ...m, cbAfter: m.cbBefore }));


for (const s of surplusers) {
for (const d of deficits) {
if (s.cbBefore <= 0) break;
if (d.cbBefore >= 0) continue;
const give = Math.min(s.cbBefore, -d.cbBefore);
s.cbBefore -= give;
d.cbBefore += give;
const sr = result.find(r => r.shipId === s.shipId)!;
const dr = result.find(r => r.shipId === d.shipId)!;
sr.cbAfter! -= give;
dr.cbAfter! += give;
}
}


// Constraints: deficit not worse; surplus not negative
for (const r of result) {
if (r.cbBefore < 0 && (r.cbAfter ?? 0) < r.cbBefore) throw new Error("Deficit ship exits worse");
if (r.cbBefore > 0 && (r.cbAfter ?? 0) < 0) throw new Error("Surplus ship exits negative");
}


return result.map(({ shipId, cbBefore, cbAfter }) => ({ shipId, cbBefore, cbAfter: cbAfter! }));
}