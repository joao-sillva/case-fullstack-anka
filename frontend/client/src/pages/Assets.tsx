import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import DataTable from '@/components/data/DataTable';
import { mockAssets, mockAllocations } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { exportToExcel } from '@/utils/export';
import toast from 'react-hot-toast';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Assets() {
  const { isLoading } = useProtectedRoute();
  const [assets] = useState(mockAssets); // TODO: remove mock functionality
  const [allocations] = useState(mockAllocations); // TODO: remove mock functionality

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Carregando...</div>;
  }

  const assetColumns = [
    { key: 'symbol', label: 'Símbolo' },
    { key: 'name', label: 'Nome' },
    { key: 'currentPrice', label: 'Preço Atual' },
    {
      key: 'change',
      label: 'Variação',
      render: (value: string, row: any) => (
        <div className={`flex items-center space-x-1 ${
          row.changePositive ? 'text-chart-2' : 'text-destructive'
        }`}>
          {row.changePositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{value}</span>
        </div>
      )
    },
    { key: 'sector', label: 'Setor' }
  ];

  const allocationColumns = [
    { key: 'clientName', label: 'Cliente' },
    { key: 'assetSymbol', label: 'Ativo' },
    { key: 'quantity', label: 'Quantidade' },
    { key: 'avgPrice', label: 'Preço Médio' },
    { key: 'currentValue', label: 'Valor Atual' },
    {
      key: 'profit',
      label: 'Lucro/Prejuízo',
      render: (value: string, row: any) => (
        <div className={`flex items-center space-x-1 ${
          row.profitable ? 'text-chart-2' : 'text-destructive'
        }`}>
          {row.profitable ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <div>
            <div>{value}</div>
            <div className="text-xs">{row.profitPercentage}</div>
          </div>
        </div>
      )
    }
  ];

  const handleExportAssets = () => {
    const exportData = assets.map(asset => ({
      Símbolo: asset.symbol,
      Nome: asset.name,
      'Preço Atual': asset.currentPrice,
      Variação: asset.change,
      Setor: asset.sector
    }));
    
    exportToExcel(exportData, 'ativos');
    toast.success('Ativos exportados com sucesso!');
  };

  const handleExportAllocations = () => {
    const exportData = allocations.map(allocation => ({
      Cliente: allocation.clientName,
      Ativo: allocation.assetSymbol,
      Quantidade: allocation.quantity,
      'Preço Médio': allocation.avgPrice,
      'Valor Atual': allocation.currentValue,
      'Lucro/Prejuízo': allocation.profit,
      'Percentual': allocation.profitPercentage
    }));
    
    exportToExcel(exportData, 'alocacoes');
    toast.success('Alocações exportadas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ativos</h1>
        <p className="text-muted-foreground">
          Gerencie ativos e alocações dos clientes
        </p>
      </div>

      <DataTable
        title="Lista de Ativos"
        columns={assetColumns}
        data={assets}
        onExport={handleExportAssets}
        searchPlaceholder="Buscar por símbolo ou nome..."
      />

      <DataTable
        title="Alocações por Cliente"
        columns={allocationColumns}
        data={allocations}
        onExport={handleExportAllocations}
        searchPlaceholder="Buscar por cliente ou ativo..."
      />
    </div>
  );
}