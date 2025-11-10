import { Tabs } from './components/Tabs';
import RoutesTab from './components/RoutesTab';
import CompareTab from './components/CompareTab';
import BankingTab from './components/BankingTab';
import PoolingTab from './components/PoolingTab';


export default function App() {
return (
<div className="max-w-6xl mx-auto p-4">
<h1 className="text-2xl font-bold mb-4">Fuel EU Compliance Dashboard</h1>
<Tabs tabs={[
{ key: 'routes', label: 'Routes', content: <RoutesTab/> },
{ key: 'compare', label: 'Compare', content: <CompareTab/> },
{ key: 'banking', label: 'Banking', content: <BankingTab/> },
{ key: 'pooling', label: 'Pooling', content: <PoolingTab/> },
]} />
</div>
);
}
