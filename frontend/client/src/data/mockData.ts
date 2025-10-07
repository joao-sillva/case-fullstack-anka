// Mock data for demonstration purposes
// TODO: remove mock functionality when integrating with real API

export const mockClients = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-1111',
    cpf: '123.456.789-00',
    status: 'ativo' as const,
    totalInvestido: 'R$ 150.000,00',
    rendimento: 'R$ 12.500,00'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 99999-2222',
    cpf: '987.654.321-00',
    status: 'ativo' as const,
    totalInvestido: 'R$ 80.000,00',
    rendimento: 'R$ 6.400,00'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    phone: '(11) 99999-3333',
    cpf: '456.789.123-00',
    status: 'inativo' as const,
    totalInvestido: 'R$ 25.000,00',
    rendimento: 'R$ 1.250,00'
  }
];

export const mockAssets = [
  {
    id: '1',
    symbol: 'PETR4',
    name: 'Petrobras PN',
    currentPrice: 'R$ 32,45',
    change: '+2,35%',
    changePositive: true,
    sector: 'Petróleo e Gás'
  },
  {
    id: '2',
    symbol: 'VALE3',
    name: 'Vale ON',
    currentPrice: 'R$ 78,90',
    change: '-1,20%',
    changePositive: false,
    sector: 'Mineração'
  },
  {
    id: '3',
    symbol: 'BBDC4',
    name: 'Bradesco PN',
    currentPrice: 'R$ 15,67',
    change: '+0,85%',
    changePositive: true,
    sector: 'Bancos'
  },
  {
    id: '4',
    symbol: 'MGLU3',
    name: 'Magazine Luiza ON',
    currentPrice: 'R$ 4,32',
    change: '+3,45%',
    changePositive: true,
    sector: 'Varejo'
  }
];

export const mockMovements = [
  {
    id: '1',
    clientId: '1',
    clientName: 'João Silva',
    type: 'deposito' as const,
    amount: 'R$ 10.000,00',
    date: '2024-01-15',
    description: 'Depósito inicial'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Maria Santos',
    type: 'saque' as const,
    amount: 'R$ 5.000,00',
    date: '2024-01-14',
    description: 'Saque parcial'
  },
  {
    id: '3',
    clientId: '1',
    clientName: 'João Silva',
    type: 'deposito' as const,
    amount: 'R$ 15.000,00',
    date: '2024-01-13',
    description: 'Aporte mensal'
  },
  {
    id: '4',
    clientId: '3',
    clientName: 'Pedro Costa',
    type: 'saque' as const,
    amount: 'R$ 2.500,00',
    date: '2024-01-12',
    description: 'Resgate de emergência'
  }
];

export const mockAllocations = [
  {
    id: '1',
    clientId: '1',
    clientName: 'João Silva',
    assetSymbol: 'PETR4',
    assetName: 'Petrobras PN',
    quantity: 500,
    avgPrice: 'R$ 30,00',
    currentValue: 'R$ 16.225,00',
    profit: 'R$ 1.225,00',
    profitPercentage: '+8,17%',
    profitable: true
  },
  {
    id: '2',
    clientId: '1',
    clientName: 'João Silva',
    assetSymbol: 'VALE3',
    assetName: 'Vale ON',
    quantity: 200,
    avgPrice: 'R$ 80,00',
    currentValue: 'R$ 15.780,00',
    profit: '-R$ 220,00',
    profitPercentage: '-1,38%',
    profitable: false
  },
  {
    id: '3',
    clientId: '2',
    clientName: 'Maria Santos',
    assetSymbol: 'BBDC4',
    assetName: 'Bradesco PN',
    quantity: 1000,
    avgPrice: 'R$ 15,00',
    currentValue: 'R$ 15.670,00',
    profit: 'R$ 670,00',
    profitPercentage: '+4,47%',
    profitable: true
  }
];