import DataTable from '../data/DataTable';
import { Badge } from '@/components/ui/badge';

export default function DataTableExample() {
  const sampleData = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'ativo' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'inativo' },
  ];

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'ativo' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-4">
      <DataTable
        title="Exemplo de Tabela"
        columns={columns}
        data={sampleData}
        onAdd={() => console.log('Adicionar clicado')}
        onEdit={(row) => console.log('Editar clicado', row)}
        onDelete={(row) => console.log('Excluir clicado', row)}
        onExport={() => console.log('Exportar clicado')}
        statusFilter={true}
      />
    </div>
  );
}