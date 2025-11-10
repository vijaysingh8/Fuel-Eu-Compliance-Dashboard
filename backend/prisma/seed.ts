import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
// Routes
await prisma.route.createMany({
data: [
{ routeId: "R001", vesselType: "Container", fuelType: "HFO", year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000, distance: 12000, totalEmissions: 4500, isBaseline: true },
{ routeId: "R002", vesselType: "BulkCarrier", fuelType: "LNG", year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800, distance: 11500, totalEmissions: 4200 },
{ routeId: "R003", vesselType: "Tanker", fuelType: "MGO", year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100, distance: 12500, totalEmissions: 4700 },
{ routeId: "R004", vesselType: "RoRo", fuelType: "HFO", year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900, distance: 11800, totalEmissions: 4300 },
{ routeId: "R005", vesselType: "Container", fuelType: "LNG", year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950, distance: 11900, totalEmissions: 4400 },
],
skipDuplicates: true,
});


// Ship compliance snapshots (CB) — computed values or illustrative
// Using simplistic numbers for demo (units: gCO2e)
await prisma.shipCompliance.createMany({
data: [
{ shipId: "R001", year: 2024, cb: -10000000 },
{ shipId: "R002", year: 2024, cb: 5000000 },
{ shipId: "R003", year: 2024, cb: -15000000 },
{ shipId: "R004", year: 2025, cb: 2000000 },
{ shipId: "R005", year: 2025, cb: -500000 },
],
skipDuplicates: true,
});


// Bank entries (positive = banked surplus; negative = applied)
await prisma.bankEntry.createMany({
data: [
{ shipId: "R002", year: 2024, amount: 5000000 },
{ shipId: "R004", year: 2025, amount: 2000000 },
// example of an applied entry (negative)
{ shipId: "R001", year: 2024, amount: -2000000 },
],
skipDuplicates: true,
});


// Create an example pool with allocations
const pool = await prisma.pool.createMany({
data: [ { year: 2025 } ],
skipDuplicates: true,
});


// If a Pool row was created (or exists), we need its id to create members. We'll read one.
const existingPool = (await prisma.pool.findFirst({ where: { year: 2025 }, orderBy: { id: 'desc' } })) as any;
if (existingPool) {
const poolId = existingPool.id;
await prisma.poolMember.createMany({
data: [
{ poolId, shipId: "R004", cbBefore: 2000000, cbAfter: 1500000 },
{ poolId, shipId: "R005", cbBefore: -500000, cbAfter: 0 },
{ poolId, shipId: "S_EXTRA", cbBefore: 0, cbAfter: 500000 },
],
skipDuplicates: true,
});
}


console.log("✅ Seed complete");
}


main()
.catch((e) => {
console.error(e);
process.exit(1);
})
.finally(() => prisma.$disconnect());