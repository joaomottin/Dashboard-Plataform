import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { Sidebar } from './components/Sidebar';
import { SalesDashboard } from './dashboards/SalesDashboard';
import { AnalyticsDashboard } from './dashboards/AnalyticsDashboard';
import { CryptoDashboard } from './dashboards/CryptoDashboard';
import { Dashboard } from './types';
import './App.css';

const dashboards: Dashboard[] = [
  {
    id: 'crypto',
    name: 'Crypto ao Vivo',
    icon: 'dashboard',
    path: '/crypto',
    description: 'Dados reais de criptomoedas',
  },
  {
    id: 'sales',
    name: 'Vendas',
    icon: 'bar',
    path: '/sales',
    description: 'Dashboard de vendas',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: 'timeline',
    path: '/analytics',
    description: 'Análise de performance',
  },
  {
    id: 'metrics',
    name: 'Métricas',
    icon: 'pie',
    path: '/metrics',
    description: 'Métricas gerais',
  },
];

function App() {
  const [selectedDashboard, setSelectedDashboard] = useState('crypto');

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case 'crypto':
        return <CryptoDashboard />;
      case 'sales':
        return <SalesDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <CryptoDashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#000000' }}>
        <Sidebar
          dashboards={dashboards}
          selectedDashboard={selectedDashboard}
          onSelectDashboard={setSelectedDashboard}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            position: 'relative',
            overflow: 'auto',
          }}
        >
          {/* Animated Background */}
          <div className="background-animation">
            <div className="gradient-orb gradient-orb-1"></div>
            <div className="gradient-orb gradient-orb-2"></div>
            <div className="gradient-orb gradient-orb-3"></div>
          </div>
          
          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {renderDashboard()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
