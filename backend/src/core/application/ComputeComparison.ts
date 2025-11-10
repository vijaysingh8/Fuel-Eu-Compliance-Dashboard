import type { Route } from "../domain/Route";


export function compareRoutes(baseline: Route, comparison: Route) {
const percentDiff = ((comparison.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
const compliant = comparison.ghgIntensity <= baseline.ghgIntensity && comparison.ghgIntensity <= 89.3368;
return { percentDiff, compliant };
}