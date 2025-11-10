import type { BankingRepo } from "../ports/BankingRepo";


export async function applyBanked(repo: BankingRepo, shipId: string, year: number, amount: number) {
const available = await repo.getBanked(shipId, year);
if (amount > available) throw new Error("Amount exceeds banked balance");
await repo.apply(shipId, year, amount);
const after = await repo.getBanked(shipId, year);
return { cb_before: available, applied: amount, cb_after: after };
}