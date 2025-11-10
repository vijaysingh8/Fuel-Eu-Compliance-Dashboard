import type { Route } from "../domain/Route";
export interface ApiPort {
listRoutes(filters?: Partial<Pick<Route, 'vesselType'|'fuelType'|'year'>>): Promise<Route[]>;
setBaseline(routeId: string): Promise<void>;
getComparison(): Promise<{ baselineRoute: string; rows: { routeId: string; baseline: number; comparison: number; percentDiff: number; compliant: boolean }[] }>;
getCB(params: { routeId: string; shipId?: string; year?: number }): Promise<{ shipId: string; year: number; energy: number; cb: number }>;
getAdjustedCB(params: { shipId: string; year: number }): Promise<{ shipId: string; year: number; cb: number }>;
bank(params: { shipId: string; year: number; cb: number }): Promise<{ cb_before: number; applied: number; cb_after: number }>;
apply(params: { shipId: string; year: number; amount: number }): Promise<{ cb_before: number; applied: number; cb_after: number }>;
createPool(input: { year: number; members: { shipId: string; cbBefore: number }[] }): Promise<{ poolId: number; members: { shipId: string; cbBefore: number; cbAfter: number }[] }>;
}