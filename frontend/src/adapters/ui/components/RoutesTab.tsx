import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../hooks/useApi';
import type { Route } from '../../../core/domain/Route';


export default function RoutesTab() {
const api = useApi();
const [rows, setRows] = useState<Route[]>([]);
const [filters, setFilters] = useState<{ vesselType?: string; fuelType?: string; year?: number }>({});


useEffect(() => { api.listRoutes(filters).then(setRows); }, [filters]);


const vesselTypes = useMemo(() => Array.from(new Set(rows.map(r=>r.vesselType))), [rows]);
const fuelTypes = useMemo(() => Array.from(new Set(rows.map(r=>r.fuelType))), [rows]);
const years = useMemo(() => Array.from(new Set(rows.map(r=>r.year))), [rows]);


return (
<div className="space-y-4">
<div className="flex flex-wrap gap-2">
<select className="border px-2 py-1" onChange={e=>setFilters(f=>({ ...f, vesselType: e.target.value||undefined }))}>
<option value="">All Vessel Types</option>
{vesselTypes.map(v=> <option key={v}>{v}</option>)}
</select>
<select className="border px-2 py-1" onChange={e=>setFilters(f=>({ ...f, fuelType: e.target.value||undefined }))}>
<option value="">All Fuel Types</option>
{fuelTypes.map(v=> <option key={v}>{v}</option>)}
</select>
<select className="border px-2 py-1" onChange={e=>setFilters(f=>({ ...f, year: e.target.value? Number(e.target.value): undefined }))}>
<option value="">All Years</option>
{years.map(v=> <option key={v}>{v}</option>)}
</select>
</div>
<table className="w-full text-sm">
<thead className="text-left">
<tr className="border-b">
<th>routeId</th><th>vesselType</th><th>fuelType</th><th>year</th><th>ghgIntensity</th><th>fuelConsumption (t)</th><th>distance (km)</th><th>totalEmissions (t)</th><th></th>
</tr>
</thead>
<tbody>
{rows.map(r => (
<tr key={r.routeId} className="border-b hover:bg-gray-50">
<td>{r.routeId}</td>
<td>{r.vesselType}</td>
<td>{r.fuelType}</td>
<td>{r.year}</td>
<td>{r.ghgIntensity.toFixed(2)}</td>
<td>{r.fuelConsumption}</td>
<td>{r.distance}</td>
<td>{r.totalEmissions}</td>
<td><button className="px-2 py-1 border rounded" onClick={()=> api.setBaseline(r.routeId).then(()=> alert('Baseline set'))}>Set Baseline</button></td>
</tr>
))}
</tbody>
</table>
</div>
);
}
