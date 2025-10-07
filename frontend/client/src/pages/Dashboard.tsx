import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

const assessorData = [
  { nome: "Jane Cooper", metaAnual: "R$ 45.0 M", captadoAtual: "R$ 135.0 M", percSemestral: "R$ 225.43 %", metaMensal: "R$ 5.0 M", captadoMensal: "R$ 18.0 M", percMensal: "R$ 155.23 %" },
  { nome: "Matt Smith", metaAnual: "R$ 40.9 M", captadoAtual: "R$ 130.0 M", percSemestral: "R$ 225.43 %", metaMensal: "R$ 5.0 M", captadoMensal: "R$ 18.2 M", percMensal: "R$ 245.00 %" },
  { nome: "Philip Wave", metaAnual: "R$ 39.0 M", captadoAtual: "R$ 90.0 M", percSemestral: "R$ 200.43 %", metaMensal: "R$ 3.8 M", captadoMensal: "R$ 10.7 M", percMensal: "R$ 398.23 %" },
  { nome: "Tim Pires", metaAnual: "R$ 35.0 M", captadoAtual: "R$ 98.0 M", percSemestral: "R$ 175.00 %", metaMensal: "R$ 5.0 M", captadoMensal: "R$ 19.2 M", percMensal: "R$ 180.00 %" },
  { nome: "Carol Stevens", metaAnual: "R$ 30.0 M", captadoAtual: "R$ 135.0 M", percSemestral: "R$ 200.43 %", metaMensal: "R$ 3.0 M", captadoMensal: "R$ 15.2 M", percMensal: "R$ 220.23 %" },
  { nome: "Amelia Parker", metaAnual: "R$ 28.0 M", captadoAtual: "R$ 120.0 M", percSemestral: "R$ 225.43 %", metaMensal: "R$ 4.0 M", captadoMensal: "R$ 20.2 M", percMensal: "R$ 178.23 %" },
  { nome: "Michael O'Valley", metaAnual: "R$ 27.5 M", captadoAtual: "R$ 100.0 M", percSemestral: "R$ 200.30 %", metaMensal: "R$ 5.0 M", captadoMensal: "R$ 17.2 M", percMensal: "R$ 245.00 %" },
  { nome: "Owen Tompson", metaAnual: "R$ 26.0 M", captadoAtual: "R$ 135.0 M", percSemestral: "R$ 190.50 %", metaMensal: "R$ 6.0 M", captadoMensal: "R$ 22.0 M", percMensal: "R$ 99.8 %" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("Janeiro");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Captado Anual Total</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-4xl font-bold text-blue-400">R$ 355.000.000</span>
            <span className="text-green-400 text-lg flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              37.8%
            </span>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Captado Anual</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 196 M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                24.3%
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Captado Semestral</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 98 M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                17.5%
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white border-0">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Captado Mensal</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 12.4 M</span>
              <span className="text-green-300 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                8.8%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Assessors Table */}
      <Card className="border border-card-border">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Metas por assessor</h2>
              <p className="text-sm text-muted-foreground">Assessores ativos</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Meta Anual</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Captado Atual</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Perc Semestral</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Meta Mensal</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Captado Mensal</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Perc Mensal</th>
                </tr>
              </thead>
              <tbody>
                {assessorData.map((assessor, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {assessor.nome.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-foreground">{assessor.nome}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{assessor.metaAnual}</td>
                    <td className="py-3 px-4 text-foreground">{assessor.captadoAtual}</td>
                    <td className="py-3 px-4 text-foreground">{assessor.percSemestral}</td>
                    <td className="py-3 px-4 text-foreground">{assessor.metaMensal}</td>
                    <td className="py-3 px-4 text-foreground">{assessor.captadoMensal}</td>
                    <td className="py-3 px-4 text-foreground">{assessor.percMensal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Mostrando assessores 1 ao 8 de 30
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}