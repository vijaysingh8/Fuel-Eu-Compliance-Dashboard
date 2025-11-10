import type { Route } from "../domain/Route";
export interface RouteRepo {
list(filters?: Partial<Pick<Route, "vesselType" | "fuelType" | "year">>): Promise<Route[]>;
setBaseline(routeId: string): Promise<void>;
getBaseline(): Promise<Route | null>;
}