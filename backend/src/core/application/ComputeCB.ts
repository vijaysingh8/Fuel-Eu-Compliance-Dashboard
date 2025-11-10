import { ENERGY_PER_TONNE_MJ, TARGET_INTENSITY_2025 } from "../../shared/types";
import type { Route } from "../domain/Route";


export function computeEnergyMJ(fuelTonnes: number): number {
return fuelTonnes * ENERGY_PER_TONNE_MJ;
}


export function computeCB(actualIntensity: number, energyMJ: number, targetIntensity = TARGET_INTENSITY_2025) {
const delta = targetIntensity - actualIntensity; // gCO2e/MJ
return delta * energyMJ; // gCO2e
}


export function computeCBForRoute(route: Route) {
const energy = computeEnergyMJ(route.fuelConsumption);
const cb = computeCB(route.ghgIntensity, energy);
return { energy, cb };
}