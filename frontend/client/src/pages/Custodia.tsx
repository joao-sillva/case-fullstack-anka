import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown } from 'lucide-react';

const patrimonioData = [
  { tipo: "Ações", valor: "R$ 45.2 M", percentual: 32, variacao: "+12.3%", positive: true },
  { tipo: "Renda Fixa", valor: "R$ 38.7 M", percentual: 28, variacao: "+8.7%", positive: true },
  { tipo: "Fundos", valor: "R$ 35.1 M", percentual: 25, variacao: "+15.2%", positive: true },
  { tipo: "Internacional", valor: "R$ 20.8 M", percentual: 15, variacao: "-3.1%", positive: false },
];

const topInvestimentos = [
  { nome: "ITUB4", valor: "R$ 12.5 M", variacao: "+5.2%", positive: true },
  { nome: "PETR4", valor: "R$ 8.9 M", variacao: "+3.8%", positive: true },
  { nome: "VALE3", valor: "R$ 7.2 M", variacao: "-2.1%", positive: false },
  { nome: "BBDC4", valor: "R$ 6.8 M", variacao: "+1.9%", positive: true },
  { nome: "ABEV3", valor: "R$ 5.4 M", variacao: "+4.7%", positive: true },
];

const custodiaClientes = [
  { nome: "João Silva", patrimonio: "R$ 25.5 M", assets: 45, variacao: "+18.3%" },
  { nome: "Maria Santos", patrimonio: "R$ 18.2 M", assets: 32, variacao: "+12.7%" },
  { nome: "Carlos Lima", patrimonio: "R$ 15.8 M", assets: 28, variacao: "+9.4%" },
  { nome: "Ana Costa", patrimonio: "R$ 12.3 M", assets: 21, variacao: "+14.1%" },
  { nome: "Pedro Oliveira", patrimonio: "R$ 9.7 M", assets: 18, variacao: "+7.8%" },
];

export default function Custodia() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Custódia</h1>
        <p className="text-muted-foreground mt-2">Gestão de patrimônio e ativos sob custódia</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Patrimônio Total</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 139.8 M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                11.2%
              </span>
            </div>
            <p className="text-sm opacity-80">Crescimento anual</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Clientes Ativos</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">247</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                8.5%
              </span>
            </div>
            <p className="text-sm opacity-80">Novos este mês</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Ticket Médio</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 566 K</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                15.7%
              </span>
            </div>
            <p className="text-sm opacity-80">Por cliente</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Taxa Administração</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">1.85%</span>
              <span className="text-red-300 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                0.15%
              </span>
            </div>
            <p className="text-sm opacity-80">Taxa média anual</p>
          </div>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card className="border border-card-border">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="assets">Ativos</TabsTrigger>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Distribuição de Patrimônio */}
                <Card className="border border-card-border">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">
                      Distribuição de Patrimônio
                    </h3>
                    
                    <div className="space-y-4">
                      {patrimonioData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                            }`} />
                            <span className="font-medium text-foreground">{item.tipo}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">{item.valor}</div>
                            <div className={`text-sm flex items-center gap-1 ${
                              item.positive ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {item.variacao}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Evolução Patrimonial Chart */}
                <Card className="border border-card-border">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">
                      Evolução Patrimonial
                    </h3>
                    
                    <div className="h-64 relative bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center">
                        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                          <path
                            d="M 0 180 Q 50 160 100 140 T 200 100 T 300 80 T 400 60"
                            stroke="url(#gradient2)"
                            strokeWidth="3"
                            fill="none"
                          />
                          <defs>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mt-4">
                      <span>Jan</span>
                      <span>Jun</span>
                      <span>Dez</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6 mt-6">
              <Card className="border border-card-border">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Top Investimentos
                  </h3>
                  
                  <div className="space-y-4">
                    {topInvestimentos.map((invest, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {invest.nome[0]}
                          </div>
                          <span className="font-medium text-foreground">{invest.nome}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{invest.valor}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            invest.positive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {invest.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {invest.variacao}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-6 mt-6">
              <Card className="border border-card-border">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Top Clientes por Patrimônio
                  </h3>
                  
                  <div className="space-y-4">
                    {custodiaClientes.map((cliente, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {cliente.nome.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{cliente.nome}</div>
                            <div className="text-sm text-muted-foreground">{cliente.assets} ativos</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{cliente.patrimonio}</div>
                          <div className="text-green-400 text-sm flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {cliente.variacao}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}