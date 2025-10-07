import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import DataTable from '@/components/data/DataTable';
import ClientForm from '@/components/forms/ClientForm';
import { mockClients } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { exportToExcel } from '@/utils/export';
import toast from 'react-hot-toast';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  status: 'ativo' | 'inativo';
  totalInvestido: string;
  rendimento: string;
}

export default function Clients() {
  const { isLoading } = useProtectedRoute();
  const [clients, setClients] = useState<Client[]>(mockClients); // TODO: remove mock functionality
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Carregando...</div>;
  }

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefone' },
    { key: 'cpf', label: 'CPF' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'ativo' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'totalInvestido', label: 'Total Investido' },
    { key: 'rendimento', label: 'Rendimento' }
  ];

  const handleAdd = () => {
    setEditingClient(null);
    setShowForm(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (client: Client) => {
    if (confirm(`Tem certeza que deseja excluir o cliente ${client.name}?`)) {
      // TODO: remove mock functionality - integrate with real API
      setClients(prev => prev.filter(c => c.id !== client.id));
      toast.success('Cliente excluído com sucesso!');
    }
  };

  const handleSubmit = async (data: any) => {
    // TODO: remove mock functionality - integrate with real API
    if (editingClient) {
      setClients(prev => prev.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...data }
          : c
      ));
      toast.success('Cliente atualizado com sucesso!');
    } else {
      const newClient = {
        id: String(Date.now()),
        ...data,
        totalInvestido: 'R$ 0,00',
        rendimento: 'R$ 0,00'
      };
      setClients(prev => [...prev, newClient]);
      toast.success('Cliente criado com sucesso!');
    }
    setShowForm(false);
  };

  const handleExport = () => {
    const exportData = clients.map(client => ({
      Nome: client.name,
      Email: client.email,
      Telefone: client.phone,
      CPF: client.cpf,
      Status: client.status,
      'Total Investido': client.totalInvestido,
      Rendimento: client.rendimento
    }));
    
    exportToExcel(exportData, 'clientes');
    toast.success('Dados exportados com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
        <p className="text-muted-foreground">
          Gerencie os clientes e suas informações
        </p>
      </div>

      <DataTable
        title="Lista de Clientes"
        columns={columns}
        data={clients}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
        searchPlaceholder="Buscar por nome ou email..."
        statusFilter={true}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            initialData={editingClient || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isEditing={!!editingClient}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}