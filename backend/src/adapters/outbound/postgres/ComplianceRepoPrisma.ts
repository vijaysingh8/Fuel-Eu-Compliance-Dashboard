import { prisma } from "./PrismaClient";
import type { ComplianceRepo } from "../../../core/ports/ComplianceRepo";


export const ComplianceRepoPrisma: ComplianceRepo = {
async upsert(r) {
await prisma.shipCompliance.upsert({
where: { shipId_year: { shipId: r.shipId, year: r.year } },
update: { cb: r.cb },
create: { shipId: r.shipId, year: r.year, cb: r.cb }
});
},
async get(shipId, year) {
const row = await prisma.shipCompliance.findUnique({ where: { shipId_year: { shipId, year } } });
return row ? { shipId, year, cb: row.cb } : null;
}
};