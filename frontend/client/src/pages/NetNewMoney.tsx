import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search } from 'lucide-react';

const topAssessores = [
  { nome: "Fabio Garcia", contribuicao: "R$ 12.8 M", percentual: 11 },
  { nome: "Regina Melo", contribuicao: "R$ 10.1 M", percentual: 7 },
  { nome: "Felipe Silva", contribuicao: "R$ 9.6 M", percentual: 6 },
  { nome: "Fernanda Borges", contribuicao: "R$ 9.5 M", percentual: 6 },
  { nome: "Gustavo Santos", contribuicao: "R$ 7 M", percentual: 5 },
];

const nnmMonthlyData = [
  { mes: "Jan", valor: 2.5 },
  { mes: "Fev", valor: 3.8 },
  { mes: "Mar", valor: 4.2 },
  { mes: "Abr", valor: 3.1 },
  { mes: "Mai", valor: 5.8 },
  { mes: "Jun", valor: 13.0 },
  { mes: "Jul", valor: 6.2 },
  { mes: "Ago", valor: 4.8 },
  { mes: "Set", valor: 7.5 },
  { mes: "Out", valor: 3.9 },
  { mes: "Nov", valor: 8.1 },
  { mes: "Dez", valor: 5.2 },
];

export default function NetNewMoney() {
  const [searchTerm, setSearchTerm] = useState('');
  const maxNNM = Math.max(...nnmMonthlyData.map(d => d.valor));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Net New Money</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-muted-foreground">2024</span>
            <span className="text-sm text-muted-foreground">Semestral</span>
            <span className="text-sm text-muted-foreground">Mensal</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">NNM 2024</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 5 M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                17.5%
              </span>
            </div>
            <p className="text-sm opacity-80">Desde ontem</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gray-800 to-red-900 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">NNM Semestral</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 2.6 M</span>
              <span className="text-red-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                17.5%
              </span>
            </div>
            <p className="text-sm opacity-80">Desde o mês passado</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">NNM Mensal</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 800 K</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                9.3%
              </span>
            </div>
            <p className="text-sm opacity-80">Desde o ano passado</p>
          </div>
        </Card>
      </div>

      {/* Top 5 Assessores */}
      <Card className="border border-card-border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Top 5 Assessores</h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-muted-foreground">2024</span>
                <span className="text-sm text-muted-foreground">Semestral</span>
                <span className="text-sm text-muted-foreground">Mensal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6 text-sm font-medium text-muted-foreground">
            <div></div>
            <div>Nome</div>
            <div>Contribuição total</div>
            <div>% do total</div>
          </div>

          <div className="space-y-3">
            {topAssessores.map((assessor, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center py-2">
                <div className="text-xl font-bold text-muted-foreground">{index + 1}</div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {assessor.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-medium text-foreground">{assessor.nome}</span>
                </div>
                <div className="text-foreground font-medium">{assessor.contribuicao}</div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-medium">{assessor.percentual}%</span>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(assessor.percentual / 11) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Search Section */}
      <Card className="border border-card-border">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Mostrando dados de</h3>
              <p className="text-2xl font-bold text-foreground">Henrique Lima Santos</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar assessor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net New Money Chart */}
        <Card className="border border-card-border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Net New Money</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Anual</span>
                <span>Semestral</span>
                <span className="font-semibold text-foreground">Mensal</span>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between px-4">
              {nnmMonthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="relative h-40 flex items-end">
                    <div
                      className="grid grid-cols-3 gap-1"
                      style={{ height: `${(data.valor / maxNNM) * 100}%` }}
                    >
                      {Array.from({ length: Math.ceil(data.valor) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.mes}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground mt-4">
              <span>R$ 2.5 M</span>
              <span className="font-semibold">R$ 13 M</span>
            </div>
          </div>
        </Card>

        {/* Total Acumulado Chart */}
        <Card className="border border-card-border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Total Acumulado</h3>
              <div className="text-2xl font-bold text-blue-400">R$ 1.4 B</div>
            </div>
            
            <div className="h-64 relative bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M 0 150 Q 100 100 200 120 T 400 80"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground mt-4">
              <span>R$ 10 M</span>
              <span>R$ 20 M</span>
              <span>R$ 30 M</span>
              <span>R$ 40 M</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}