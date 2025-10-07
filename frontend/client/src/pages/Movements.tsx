import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import DataTable from '@/components/data/DataTable';
import { mockMovements } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { exportToExcel } from '@/utils/export';
import toast from 'react-hot-toast';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function Movements() {
  const { isLoading } = useProtectedRoute();
  const [movements] = useState(mockMovements); // TODO: remove mock functionality
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Carregando...</div>;
  }

  // Filter movements by date range
  const filteredMovements = movements.filter(movement => {
    if (!dateFilter.startDate && !dateFilter.endDate) return true;
    
    const movementDate = new Date(movement.date);
    const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
    const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null;
    
    if (start && movementDate < start) return false;
    if (end && movementDate > end) return false;
    
    return true;
  });

  const columns = [
    { key: 'clientName', label: 'Cliente' },
    {
      key: 'type',
      label: 'Tipo',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {value === 'deposito' ? (
            <ArrowUpCircle className="h-4 w-4 text-chart-2" />
          ) : (
            <ArrowDownCircle className="h-4 w-4 text-destructive" />
          )}
          <Badge variant={value === 'deposito' ? 'default' : 'secondary'}>
            {value === 'deposito' ? 'Depósito' : 'Saque'}
          </Badge>
        </div>
      )
    },
    { key: 'amount', label: 'Valor' },
    { 
      key: 'date', 
      label: 'Data',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { key: 'description', label: 'Descrição' }
  ];

  const handleExport = () => {
    const exportData = filteredMovements.map(movement => ({
      Cliente: movement.clientName,
      Tipo: movement.type === 'deposito' ? 'Depósito' : 'Saque',
      Valor: movement.amount,
      Data: new Date(movement.date).toLocaleDateString('pt-BR'),
      Descrição: movement.description
    }));
    
    exportToExcel(exportData, 'movimentacoes');
    toast.success('Movimentações exportadas com sucesso!');
  };

  // Calculate totals
  const totalDeposits = filteredMovements
    .filter(m => m.type === 'deposito')
    .reduce((acc, m) => acc + parseFloat(m.amount.replace(/[R$.\s]/g, '').replace(',', '.')), 0);
    
  const totalWithdrawals = filteredMovements
    .filter(m => m.type === 'saque')
    .reduce((acc, m) => acc + parseFloat(m.amount.replace(/[R$.\s]/g, '').replace(',', '.')), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Movimentações</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie depósitos e saques dos clientes
        </p>
      </div>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                data-testid="input-start-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                data-testid="input-end-date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ArrowUpCircle className="h-8 w-8 text-chart-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Depósitos</p>
                <p className="text-2xl font-bold text-chart-2" data-testid="text-total-deposits">
                  R$ {totalDeposits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ArrowDownCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Saques</p>
                <p className="text-2xl font-bold text-destructive" data-testid="text-total-withdrawals">
                  R$ {totalWithdrawals.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">≡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saldo Líquido</p>
                <p className="text-2xl font-bold" data-testid="text-net-balance">
                  R$ {(totalDeposits - totalWithdrawals).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        title={`Movimentações (${filteredMovements.length})`}
        columns={columns}
        data={filteredMovements}
        onExport={handleExport}
        searchPlaceholder="Buscar por cliente ou descrição..."
      />
    </div>
  );
}