//  backend/src/core/domain/Route.ts
export type Route = {
id: number;
routeId: string;
vesselType: string;
fuelType: string;
year: number;
ghgIntensity: number; // gCO2e/MJ
fuelConsumption: number; // t
distance: number; // km
totalEmissions: number; // t CO2e
isBaseline: boolean;
};