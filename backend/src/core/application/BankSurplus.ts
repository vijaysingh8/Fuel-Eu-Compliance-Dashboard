import type { BankingRepo } from "../ports/BankingRepo";


export async function bankSurplus(repo: BankingRepo, shipId: string, year: number, cb: number) {
if (cb <= 0) throw new Error("CB not positive; nothing to bank");
await repo.add(shipId, year, cb);
const after = await repo.getBanked(shipId, year);
return { cb_before: cb, applied: cb, cb_after: after };
}