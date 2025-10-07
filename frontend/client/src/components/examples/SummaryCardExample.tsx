import SummaryCard from '../dashboard/SummaryCard';
import { TrendingUp } from 'lucide-react';

export default function SummaryCardExample() {
  return (
    <div className="p-4 space-y-4">
      <SummaryCard
        title="Alocação Total"
        value="R$ 2.450.000,00"
        icon={TrendingUp}
        trend={{ value: 12.5, isPositive: true }}
      />
    </div>
  );
}