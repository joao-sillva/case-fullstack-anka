import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp } from 'lucide-react';

const topAssessores = [
  { nome: "Reinaldo Silva", valor: "R$ 1.2 M", cor: "from-yellow-400 to-yellow-600" },
  { nome: "Joseph Santos", valor: "R$ 1.0 M", cor: "from-gray-400 to-gray-600" },
  { nome: "Marina Costa", valor: "R$ 900 K", cor: "from-orange-400 to-orange-600" },
  { nome: "Renata Lima", valor: "R$ 850 K", cor: "from-green-400 to-green-600" },
  { nome: "Carlos Oliveira", valor: "R$ 850 K", cor: "from-green-400 to-green-600" },
  { nome: "Ana Pereira", valor: "R$ 840 K", cor: "from-green-400 to-green-600" },
  { nome: "Pedro Alves", valor: "R$ 810 K", cor: "from-green-400 to-green-600" },
  { nome: "Julia Souza", valor: "R$ 790 K", cor: "from-green-400 to-green-600" },
  { nome: "Roberto Ferreira", valor: "R$ 500 K", cor: "from-green-400 to-green-600" },
  { nome: "Fernanda Rocha", valor: "R$ 100 K", cor: "from-green-400 to-green-600" },
];

const pieChartData = [
  { nome: "Reinaldo", valor: "R$ 890 K", percentual: 34, cor: "text-blue-400" },
  { nome: "Joseph", valor: "R$ 990 K", percentual: 24, cor: "text-purple-400" },
  { nome: "Marina", valor: "R$ 850 K", percentual: 20, cor: "text-cyan-400" },
  { nome: "Renata", valor: "R$ 900 K", percentual: 22, cor: "text-orange-400" },
];

export default function Receitas() {
  const [selectedPeriod, setSelectedPeriod] = useState("Janeiro");

  // Calculate max value for bar scaling
  const maxValor = Math.max(...topAssessores.map(a => parseFloat(a.valor.replace(/[^\d.]/g, ''))));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
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

      {/* Revenue Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receita Total em Janeiro</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-4xl font-bold text-blue-400">R$ 7.160.000</span>
            <span className="text-green-400 text-lg flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              37.8%
            </span>
          </div>
        </div>
        
        <Card className="p-4 border border-card-border">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-card-foreground">Total de Assessores</h3>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-3xl font-bold text-foreground">30</span>
              <span className="text-green-400">
                <TrendingUp className="h-5 w-5" />
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Assessores */}
        <Card className="border border-card-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">
              Top 10 Assessores Geradores de Receita
            </h2>
            
            <div className="space-y-4">
              {topAssessores.map((assessor, index) => {
                const percentage = (parseFloat(assessor.valor.replace(/[^\d.]/g, '')) / maxValor) * 100;
                
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-6 text-center">
                      <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {assessor.nome.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-foreground truncate">{assessor.nome}</span>
                    </div>

                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${assessor.cor} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground min-w-fit">{assessor.valor}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Receita por Assessor Pie Chart */}
        <Card className="border border-card-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">
              Receita por Assessor (%)
            </h2>
            
            <div className="flex items-center justify-center">
              {/* Pie Chart SVG */}
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  
                  {/* Pie segments */}
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#60a5fa" strokeWidth="8"
                    strokeDasharray="85.3 251.2"
                    strokeDashoffset="0"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#a855f7" strokeWidth="8"
                    strokeDasharray="60.3 251.2"
                    strokeDashoffset="-85.3"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#06b6d4" strokeWidth="8"
                    strokeDasharray="50.3 251.2"
                    strokeDashoffset="-145.6"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="#f97316" strokeWidth="8"
                    strokeDasharray="55.3 251.2"
                    strokeDashoffset="-195.9"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-3">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-400' :
                      index === 1 ? 'bg-purple-400' :
                      index === 2 ? 'bg-cyan-400' : 'bg-orange-400'
                    }`} />
                    <span className="font-medium text-foreground">{item.nome}</span>
                    <span className="text-muted-foreground">{item.valor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{item.percentual}%</span>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}