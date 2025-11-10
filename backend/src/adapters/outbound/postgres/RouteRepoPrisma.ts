import { prisma } from "./PrismaClient";
import type { RouteRepo } from "../../../core/ports/RouteRepo";
import type { Route } from "../../../core/domain/Route";


export const RouteRepoPrisma: RouteRepo = {
async list(filters) {
const where: any = {};
if (filters?.vesselType) where.vesselType = filters.vesselType;
if (filters?.fuelType) where.fuelType = filters.fuelType;
if (filters?.year) where.year = filters.year;
const rows = await prisma.route.findMany({ where, orderBy: { id: "asc" } });
return rows as unknown as Route[];
},
async setBaseline(routeId: string) {
await prisma.$transaction([
prisma.route.updateMany({ data: { isBaseline: false }, where: { isBaseline: true } }),
prisma.route.update({ where: { routeId }, data: { isBaseline: true } })
]);
},
async getBaseline() {
const row = await prisma.route.findFirst({ where: { isBaseline: true } });
return row as unknown as Route | null;
}
};