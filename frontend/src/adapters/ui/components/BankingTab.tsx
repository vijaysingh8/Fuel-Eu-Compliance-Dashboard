import { useState } from 'react';
import { useApi } from '../hooks/useApi';


export default function BankingTab() {
const api = useApi();
const [shipId, setShipId] = useState('R001');
const [year, setYear] = useState(2025);
const [cb, setCb] = useState<number|undefined>();
const [banked, setBanked] = useState<any>();


const compute = async () => {
const res = await api.getCB({ routeId: shipId, shipId, year });
setCb(res.cb);
};
const doBank = async () => {
if (!cb || cb <= 0) return alert('CB ≤ 0');
const out = await api.bank({ shipId, year, cb });
setBanked(out);
};
const doApply = async () => {
const amount = prompt('Apply amount?');
if (!amount) return;
const out = await api.apply({ shipId, year, amount: Number(amount) });
setBanked(out);
};


return (
<div className="space-y-3">
<div className="flex gap-2">
<input className="border px-2 py-1" value={shipId} onChange={e=>setShipId(e.target.value)} />
<input className="border px-2 py-1" type="number" value={year} onChange={e=>setYear(Number(e.target.value))} />
<button className="border px-3 py-1" onClick={compute}>Compute CB</button>
</div>
{cb !== undefined && <div className="text-sm">Current CB: <b>{cb.toFixed(0)}</b> gCO₂e</div>}
<div className="flex gap-2">
<button disabled={!cb || cb<=0} className="border px-3 py-1 disabled:opacity-50" onClick={doBank}>Bank Surplus</button>
<button className="border px-3 py-1" onClick={doApply}>Apply Banked</button>
</div>
{banked && (
<div className="text-sm space-y-1">
<div>cb_before: {banked.cb_before.toFixed(0)}</div>
<div>applied: {banked.applied.toFixed(0)}</div>
<div>cb_after: {banked.cb_after.toFixed(0)}</div>
</div>
)}
</div>
);
}
