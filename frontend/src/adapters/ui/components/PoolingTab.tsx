import { useState } from 'react';
import { useApi } from '../hooks/useApi';


export default function PoolingTab() {
const api = useApi();
const [year, setYear] = useState(2025);
const [members, setMembers] = useState<{ shipId: string; cbBefore: number }[]>([
{ shipId: 'S1', cbBefore: 1000 }, { shipId: 'S2', cbBefore: -600 }, { shipId: 'S3', cbBefore: -300 }
]);
const sum = members.reduce((s,m)=>s+m.cbBefore,0);


const create = async () => {
try {
const res = await api.createPool({ year, members });
alert(`Pool ${res.poolId} created`);
} catch (e: any) {
alert(e.message || 'Failed');
}
};


return (
<div className="space-y-3">
<div className={`text-sm ${sum>=0? 'text-green-600':'text-red-600'}`}>Pool Sum: {sum}</div>
<table className="text-sm w-full">
<thead className="text-left"><tr className="border-b"><th>shipId</th><th>cbBefore</th></tr></thead>
<tbody>
{members.map((m,i)=> (
<tr key={i} className="border-b">
<td>
<input className="border px-1 py-0.5" value={m.shipId} onChange={e=> setMembers(arr => arr.map((x,xi)=> xi===i? {...x, shipId:e.target.value}: x))} />
</td>
<td>
<input type="number" className="border px-1 py-0.5" value={m.cbBefore} onChange={e=> setMembers(arr => arr.map((x,xi)=> xi===i? {...x, cbBefore:Number(e.target.value)}: x))} />
</td>
</tr>
))}
</tbody>
</table>
<button disabled={sum<0} className="border px-3 py-1 disabled:opacity-50" onClick={create}>Create Pool</button>
</div>
);
}