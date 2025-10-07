# Plataforma de Gestão de Ativos

## Visão Geral

Esta é uma plataforma full-stack de gestão de ativos financeiros com uma interface moderna em tema escuro, voltada para consultores financeiros e gestores de ativos. O sistema fornece ferramentas completas para acompanhamento de portfólios de clientes, monitoramento de desempenho de ativos, gestão de comissões e análise de receitas. A plataforma possui um backend em FastAPI e um frontend em React, construído com componentes do shadcn/ui, implementando um tema escuro profissional e cards coloridos com gradientes.

## Alterações Recentes

**28 de setembro de 2025**  
- Implementada interface completa de dashboard financeiro em tema escuro  
- Construídas 5 páginas principais: Dashboard, Net New Money, Receitas, Custódia e Comissões  
- Configurada navegação lateral moderna com design colapsável  
- Adicionados cards métricos coloridos com gradiente e gráficos interativos  
- Integrada visualização de dados financeiros com gráficos e indicadores de progresso  
- Configuradas definições de deploy para produção  

## Preferências do Usuário

Estilo de comunicação preferido: Linguagem simples e cotidiana.

## Arquitetura do Sistema

### Arquitetura do Frontend
- **React com TypeScript**: Aplicação moderna em React usando componentes funcionais e hooks  
- **Vite**: Ferramenta de build rápida e servidor de desenvolvimento com hot reload  
- **Framework de UI**: Biblioteca de componentes shadcn/ui baseada em Radix UI, focada em acessibilidade  
- **Estilização**: Tailwind CSS com design system customizado, voltado para estética de plataforma financeira  
- **Roteamento**: Wouter para roteamento leve no cliente  
- **Gerenciamento de Estado**: React Query (TanStack Query) para estado do servidor e React Context para autenticação  
- **Formulários**: React Hook Form com validação Zod para formulários tipados  

### Arquitetura do Backend
- **FastAPI**: Framework moderno Python com documentação OpenAPI automática  
- **Banco de Dados**: SQLAlchemy 2 ORM com SQLite (configurável para PostgreSQL)  
- **Autenticação**: Autenticação stateless baseada em JWT com hash de senha bcrypt  
- **Modelos de Dados**: Cinco entidades principais – Usuários, Clientes, Ativos, Alocações e Transações  
- **Estrutura de API**: Organização baseada em routers com endpoints RESTful  

### Camada de Banco de Dados
- **Primário**: SQLite com SQLAlchemy 2 ORM usando base declarativa  
- **Gerenciamento de Migração**: Alembic para versionamento do schema do banco  
- **Suporte Opcional a PostgreSQL**: Configuração do Drizzle ORM disponível para escalabilidade  
- **Schema**: Gerenciamento de usuários, perfis de clientes, acompanhamento de ativos, registros de alocação e histórico de transações  

### Autenticação & Segurança
- **Tokens JWT**: Autenticação stateless usando PyJWT com expiração configurável  
- **Segurança de Senhas**: Hash bcrypt com passlib  
- **Rotas Protegidas**: Proteção de rotas no frontend com contexto de autenticação  
- **CORS**: Configurado para requisições cross-origin durante desenvolvimento  

### Design System
- **Tema Profissional**: Estética limpa e corporativa, inspirada em Linear e Notion  
- **Paleta de Cores**: Azul profissional como cor primária com fundos neutros  
- **Tipografia**: Fonte Inter com espaçamento e hierarquia consistentes  
- **Biblioteca de Componentes**: Conjunto abrangente de componentes reutilizáveis  
- **Design Responsivo**: Abordagem mobile-first com navegação lateral colapsável  

## Dependências Externas

### Dependências do Frontend
- **Ecossistema React**: React 18, React DOM, alternativa ao React Router (Wouter)  
- **Componentes de UI**: Primitivas Radix UI, ícones Lucide React  
- **Busca de Dados**: TanStack React Query para gerenciamento de estado do servidor  
- **Formulários**: React Hook Form, Hookform Resolvers, validação Zod  
- **Estilização**: Tailwind CSS, class-variance-authority, utilitário clsx  
- **Exportação de Dados**: Biblioteca XLSX para exportação em Excel  
- **Notificações**: React Hot Toast para feedback ao usuário  

### Dependências do Backend
- **Framework Web**: FastAPI, servidor ASGI Uvicorn  
- **Banco de Dados**: SQLAlchemy 2, migrações Alembic  
- **Autenticação**: PyJWT, python-jose, passlib com bcrypt  
- **Validação**: Pydantic v2 para validação de requisições/respostas  
- **Cache Opcional**: Cliente Redis com fallback seguro  
- **Validação de Email**: Pydantic EmailStr para validação de campos de email  

### Ferramentas de Desenvolvimento
- **Build Tools**: Vite com suporte a TypeScript, esbuild para builds de produção  
- **Segurança de Tipos**: TypeScript com configuração strict  
- **Ferramentas de Banco**: Drizzle Kit para gerenciamento de schema PostgreSQL (opcional)  
- **Testes**: Framework Pytest com cliente de teste FastAPI  
- **Qualidade de Código**: ESLint e compilador TypeScript para validação de código  

### Serviços de Terceiros
- **Fontes**: Google Fonts (família de fontes Inter)  
- **Desenvolvimento**: Plugins específicos do Replit para ambiente de desenvolvimento  
- **Gerenciamento de Sessões**: Express session com store PostgreSQL (se usar PostgreSQL)  
- **Hospedagem de Banco**: Suporte para Neon Database serverless PostgreSQL
