import type { ApiPort } from "../../core/ports/ApiPort";
import type { Route } from "../../core/domain/Route";


const j = (res: Response) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); };


export const ApiClient: ApiPort = {
async listRoutes(filters) {
const params = new URLSearchParams();
if (filters?.vesselType) params.set('vesselType', filters.vesselType);
if (filters?.fuelType) params.set('fuelType', filters.fuelType);
if (filters?.year) params.set('year', String(filters.year));
const res = await fetch(`/api/routes?${params.toString()}`);
return j(res) as Promise<Route[]>;
},
async setBaseline(routeId) {
const res = await fetch(`/api/routes/${routeId}/baseline`, { method: 'POST' });
await j(res);
},
async getComparison() {
const res = await fetch('/api/routes/comparison');
return j(res);
},
async getCB({ routeId, shipId, year }) {
const params = new URLSearchParams({ routeId });
if (shipId) params.set('shipId', shipId);
if (year) params.set('year', String(year));
const res = await fetch(`/api/compliance/cb?${params.toString()}`);
return j(res);
},
async getAdjustedCB({ shipId, year }) {
const res = await fetch(`/api/compliance/adjusted-cb?shipId=${shipId}&year=${year}`);
return j(res);
},
async bank({ shipId, year, cb }) {
const res = await fetch('/api/banking/bank', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shipId, year, cb }) });
return j(res);
},
async apply({ shipId, year, amount }) {
const res = await fetch('/api/banking/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shipId, year, amount }) });
return j(res);
},
async createPool(input) {
const res = await fetch('/api/pools', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
return j(res);
}
};