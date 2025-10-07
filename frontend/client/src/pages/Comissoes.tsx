import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Search, Filter } from 'lucide-react';

const comissoesData = [
  { 
    assessor: "Fabio Garcia", 
    vendas: "R$ 2.8 M", 
    comissao: "R$ 84.0 K", 
    taxa: "3.0%", 
    clientes: 45, 
    status: "Pago",
    avatar: "FG"
  },
  { 
    assessor: "Regina Melo", 
    vendas: "R$ 2.2 M", 
    comissao: "R$ 66.0 K", 
    taxa: "3.0%", 
    clientes: 38, 
    status: "Pago",
    avatar: "RM"
  },
  { 
    assessor: "Felipe Silva", 
    vendas: "R$ 1.9 M", 
    comissao: "R$ 57.0 K", 
    taxa: "3.0%", 
    clientes: 32, 
    status: "Pendente",
    avatar: "FS"
  },
  { 
    assessor: "Fernanda Borges", 
    vendas: "R$ 1.7 M", 
    comissao: "R$ 51.0 K", 
    taxa: "3.0%", 
    clientes: 29, 
    status: "Pago",
    avatar: "FB"
  },
  { 
    assessor: "Gustavo Santos", 
    vendas: "R$ 1.5 M", 
    comissao: "R$ 45.0 K", 
    taxa: "3.0%", 
    clientes: 25, 
    status: "Pago",
    avatar: "GS"
  },
  { 
    assessor: "Ana Pereira", 
    vendas: "R$ 1.3 M", 
    comissao: "R$ 39.0 K", 
    taxa: "3.0%", 
    clientes: 22, 
    status: "Pendente",
    avatar: "AP"
  },
  { 
    assessor: "Pedro Alves", 
    vendas: "R$ 1.2 M", 
    comissao: "R$ 36.0 K", 
    taxa: "3.0%", 
    clientes: 20, 
    status: "Pago",
    avatar: "PA"
  },
  { 
    assessor: "Julia Souza", 
    vendas: "R$ 1.0 M", 
    comissao: "R$ 30.0 K", 
    taxa: "3.0%", 
    clientes: 18, 
    status: "Processando",
    avatar: "JS"
  },
];

export default function Comissoes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState("Janeiro");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredData = comissoesData.filter(item =>
    item.assessor.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === "Todos" || item.status === selectedStatus)
  );

  const totalComissoes = filteredData.reduce((sum, item) => 
    sum + parseFloat(item.comissao.replace(/[^\d.]/g, '')), 0
  );

  const totalVendas = filteredData.reduce((sum, item) => 
    sum + parseFloat(item.vendas.replace(/[^\d.]/g, '')), 0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago': return 'text-green-400 bg-green-400/10';
      case 'Pendente': return 'text-yellow-400 bg-yellow-400/10';
      case 'Processando': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comissões</h1>
          <p className="text-muted-foreground mt-2">Gestão de comissões e pagamentos aos assessores</p>
        </div>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Janeiro">Janeiro</SelectItem>
            <SelectItem value="Fevereiro">Fevereiro</SelectItem>
            <SelectItem value="Março">Março</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Total Comissões</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ {(totalComissoes / 1000).toFixed(0)} K</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                18.5%
              </span>
            </div>
            <p className="text-sm opacity-80">Este mês</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Vendas Totais</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ {(totalVendas / 1000000).toFixed(1)} M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                22.3%
              </span>
            </div>
            <p className="text-sm opacity-80">Este mês</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Taxa Média</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">3.0%</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                0.2%
              </span>
            </div>
            <p className="text-sm opacity-80">Comissão padrão</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Assessores Ativos</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{filteredData.length}</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                12%
              </span>
            </div>
            <p className="text-sm opacity-80">Com comissões</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-card-border">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar assessor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pago">Pago</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Processando">Processando</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-auto">
              Exportar Relatório
            </Button>
          </div>
        </div>
      </Card>

      {/* Comissões Table */}
      <Card className="border border-card-border">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">
            Detalhamento de Comissões - {selectedPeriod} 2024
          </h2>
          
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-4 mb-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
              <div>Assessor</div>
              <div>Vendas</div>
              <div>Comissão</div>
              <div>Taxa</div>
              <div>Clientes</div>
              <div>Status</div>
              <div>Ações</div>
            </div>
            
            <div className="space-y-3">
              {filteredData.map((item, index) => (
                <div key={index} className="grid grid-cols-7 gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {item.avatar}
                    </div>
                    <span className="font-medium text-foreground">{item.assessor}</span>
                  </div>
                  
                  <div className="font-semibold text-foreground">{item.vendas}</div>
                  
                  <div className="font-semibold text-green-400">{item.comissao}</div>
                  
                  <div className="text-muted-foreground">{item.taxa}</div>
                  
                  <div className="text-muted-foreground">{item.clientes}</div>
                  
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    {item.status === "Pendente" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Pagar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum assessor encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}