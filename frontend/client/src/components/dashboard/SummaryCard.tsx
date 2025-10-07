import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function SummaryCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className 
}: SummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {trend && (
          <div className={`text-xs mt-1 ${
            trend.isPositive ? 'text-chart-2' : 'text-destructive'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}% em relação ao mês anterior
          </div>
        )}
      </CardContent>
    </Card>
  );
}