import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { TARGET } from '../../../shared/constants';


export default function CompareTab() {
const api = useApi();
const [rows, setRows] = useState<any[]>([]);
const [baselineRoute, setBaselineRoute] = useState<string>('');


useEffect(()=>{ api.getComparison().then(d=>{ setRows(d.rows); setBaselineRoute(d.baselineRoute); }); },[]);


return (
<div className="space-y-4">
<div className="text-sm">Baseline Route: <span className="font-semibold">{baselineRoute}</span> · Target: {TARGET} gCO₂e/MJ</div>
<table className="w-full text-sm">
<thead className="text-left"><tr className="border-b"><th>routeId</th><th>baseline</th><th>comparison</th><th>% diff</th><th>compliant</th></tr></thead>
<tbody>
{rows.map(r => (
<tr key={r.routeId} className="border-b">
<td>{r.routeId}</td>
<td>{r.baseline.toFixed(2)}</td>
<td>{r.comparison.toFixed(2)}</td>
<td>{r.percentDiff.toFixed(2)}%</td>
<td>{r.compliant ? '✅' : '❌'}</td>
</tr>
))}
</tbody>
</table>
{/* Simple bar chart using divs (no external libs) */}
<div className="space-y-2">
{rows.map(r => (
<div key={r.routeId}>
<div className="text-xs mb-1">{r.routeId}</div>
<div className="flex gap-2 items-end">
<div className="bg-gray-300 h-2" style={{ width: `${r.baseline}px` }} title={`baseline ${r.baseline}`}></div>
<div className={`h-2 ${r.compliant? 'bg-green-500':'bg-red-500'}`} style={{ width: `${r.comparison}px` }} title={`comparison ${r.comparison}`}></div>
</div>
</div>
))}
</div>
</div>
);
}