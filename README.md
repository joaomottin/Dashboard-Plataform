# Dashboard Platform 🚀

Uma plataforma moderna de dashboards inspirada no Power BI, construída com React, TypeScript e Material-UI.

![Dashboard Platform](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14-007fff?style=for-the-badge&logo=mui)

## ✨ Características

- 🎨 **Interface Moderna**: Design dark com paleta de cores frias (cyan, purple, blue)
- 💎 **Efeitos Glassmorphism**: Cards com efeito de vidro e blur
- 🌊 **Animações Fluídas**: Orbs gradientes animados no background
- 📊 **Múltiplos Dashboards**: Sistema de abas lateral para organizar diferentes dashboards
- 🔌 **Conexão API**: Camada de serviço para integração com backends/SQL
- 📱 **Responsivo**: Layout adaptável para diferentes tamanhos de tela
- ⚡ **Performance**: Construído com Vite para desenvolvimento rápido

## 🏗️ Estrutura do Projeto

```
Dashboard Platform/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Sidebar.tsx      # Menu lateral com abas
│   │   └── Cards.tsx        # Cards de estatísticas e gráficos
│   ├── dashboards/          # Dashboards individuais
│   │   ├── SalesDashboard.tsx
│   │   └── AnalyticsDashboard.tsx
│   ├── services/            # Serviços de API
│   │   └── api.service.ts   # Camada de conexão com backends
│   ├── types/               # Definições TypeScript
│   │   └── index.ts
│   ├── theme.ts             # Tema Material-UI customizado
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos e animações
│   └── main.tsx             # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🎨 Tema e Cores

O projeto utiliza uma paleta de cores frias:

- **Primary (Cyan)**: `#00d4ff`
- **Secondary (Purple)**: `#9d4edd`
- **Info (Blue)**: `#4cc9f0`
- **Success (Green)**: `#06ffa5`
- **Background**: `#000000` (preto)

## 📊 Adicionando Novos Dashboards

1. **Crie um novo arquivo** em `src/dashboards/`:

```typescript
// src/dashboards/MyDashboard.tsx
import { Box, Grid } from '@mui/material';
import { StatCard, ChartCard } from '../components/Cards';

export const MyDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Seus componentes aqui */}
      </Grid>
    </Box>
  );
};
```

2. **Registre o dashboard** em `src/App.tsx`:

```typescript
const dashboards: Dashboard[] = [
  // ... dashboards existentes
  {
    id: 'my-dashboard',
    name: 'Meu Dashboard',
    icon: 'dashboard',
    path: '/my-dashboard',
    description: 'Descrição do dashboard',
  },
];
```

3. **Adicione o roteamento** no `renderDashboard()`:

```typescript
const renderDashboard = () => {
  switch (selectedDashboard) {
    // ... cases existentes
    case 'my-dashboard':
      return <MyDashboard />;
    default:
      return <SalesDashboard />;
  }
};
```

## 🔌 Conectando com Backend

O projeto inclui um serviço de API em `src/services/api.service.ts`:

```typescript
import { apiService } from './services/api.service';

// Registrar uma conexão
apiService.registerConnection({
  id: 'sales-api',
  name: 'Sales API',
  type: 'rest',
  endpoint: 'https://api.example.com/sales',
});

// Buscar dados
const data = await apiService.fetchData('sales-api');

// Enviar dados
await apiService.postData('sales-api', { /* dados */ });
```

## 🎯 Bibliotecas Utilizadas

- **React 18.2**: Framework principal
- **TypeScript 5.2**: Tipagem estática
- **Material-UI 5.14**: Componentes UI
- **Recharts 2.10**: Biblioteca de gráficos
- **Axios 1.6**: Cliente HTTP
- **Vite 5.0**: Build tool
- **Emotion**: CSS-in-JS

## 🌟 Recursos CSS

O projeto inclui diversos efeitos CSS modernos:

- ✨ Glassmorphism
- 🌊 Animações de gradiente
- 💫 Efeitos de glow/neon
- 🎭 Hover effects
- 📜 Custom scrollbar
- 🔄 Loading animations

## 📝 Próximos Passos

- [ ] Implementar sistema de rotas com React Router
- [ ] Adicionar autenticação de usuários
- [ ] Criar mais dashboards de exemplo
- [ ] Implementar persistência de dados
- [ ] Adicionar testes unitários
- [ ] Deploy para produção

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!

## 📄 Licença

MIT

---

**Desenvolvido com 💙 usando React + TypeScript + Material-UI**
