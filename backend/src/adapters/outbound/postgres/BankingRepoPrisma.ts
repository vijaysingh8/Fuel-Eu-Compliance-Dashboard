import { prisma } from "./PrismaClient";
import type { BankingRepo } from "../../../core/ports/BankingRepo";


export const BankingRepoPrisma: BankingRepo = {
async getBanked(shipId, year) {
const agg = await prisma.bankEntry.aggregate({ _sum: { amount: true }, where: { shipId, year } });
return agg._sum.amount ?? 0;
},
async add(shipId, year, amount) {
await prisma.bankEntry.create({ data: { shipId, year, amount } });
},
async apply(shipId, year, amount) {
await prisma.bankEntry.create({ data: { shipId, year, amount: -amount } });
}
};