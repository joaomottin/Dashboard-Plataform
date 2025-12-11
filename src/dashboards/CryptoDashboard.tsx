import { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography, IconButton } from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { StatCard, ChartCard } from '../components/Cards';
import { CurrencyBitcoin, TrendingUp, ShowChart, Refresh } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import axios from 'axios';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
}

interface MarketChartData {
  prices: [number, number][];
}

export const CryptoDashboard = () => {
  const theme = useTheme();
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [bitcoinHistory, setBitcoinHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      // Buscar top 10 criptomoedas
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );

      setCryptoData(response.data);

      // Buscar histórico do Bitcoin (últimos 7 dias)
      const historyResponse = await axios.get<MarketChartData>(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        }
      );

      // Processar dados do histórico para o gráfico
      const processedHistory = historyResponse.data.prices
        .filter((_, index) => index % 6 === 0) // Pegar dados a cada 6 horas
        .map((item) => ({
          date: new Date(item[0]).toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
          }),
          price: Math.round(item[1]),
        }));

      setBitcoinHistory(processedHistory);
    } catch (error) {
      console.error('Erro ao buscar dados de criptomoedas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && cryptoData.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h6">Carregando dados de criptomoedas...</Typography>
      </Box>
    );
  }

  const topCrypto = cryptoData[0]; // Bitcoin
  const marketCapData = cryptoData.slice(0, 5).map((crypto) => ({
    name: crypto.symbol.toUpperCase(),
    value: crypto.market_cap,
  }));

  const volumeData = cryptoData.slice(0, 7).map((crypto) => ({
    name: crypto.symbol.toUpperCase(),
    volume: crypto.total_volume / 1000000000, // Em bilhões
  }));

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Criptomoedas ao Vivo
        </Typography>
        <IconButton
          onClick={fetchCryptoData}
          sx={{
            color: theme.palette.primary.main,
            '&:hover': { transform: 'rotate(180deg)', transition: 'transform 0.5s' },
          }}
        >
          <Refresh />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards com dados reais */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Bitcoin (BTC)"
            value={`$${topCrypto?.current_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            change={topCrypto?.price_change_percentage_24h}
            icon={<CurrencyBitcoin sx={{ fontSize: 40 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={cryptoData[1]?.name || 'Ethereum'}
            value={`$${cryptoData[1]?.current_price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            change={cryptoData[1]?.price_change_percentage_24h}
            icon={<ShowChart sx={{ fontSize: 40 }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={cryptoData[2]?.name || 'Tether'}
            value={`$${cryptoData[2]?.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
            change={cryptoData[2]?.price_change_percentage_24h}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Market Cap Total"
            value={`$${(cryptoData.reduce((sum, c) => sum + c.market_cap, 0) / 1000000000000).toFixed(2)}T`}
            change={
              cryptoData.reduce((sum, c) => sum + c.price_change_percentage_24h, 0) /
              cryptoData.length
            }
            icon={<ShowChart sx={{ fontSize: 40 }} />}
            color={theme.palette.success.main}
          />
        </Grid>

        {/* Gráfico de histórico do Bitcoin (dados reais) */}
        <Grid item xs={12} lg={8}>
          <ChartCard title="Bitcoin - Últimos 7 Dias (Dados Reais)">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={bitcoinHistory}>
                <defs>
                  <linearGradient id="colorBitcoin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Preço']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorBitcoin)"
                  strokeWidth={2}
                  name="Preço (USD)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Market Cap Distribution */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="Market Cap - Top 5">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={marketCapData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketCapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [
                    `$${(value / 1000000000).toFixed(2)}B`,
                    'Market Cap',
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Volume de Negociação */}
        <Grid item xs={12}>
          <ChartCard title="Volume de Negociação 24h (Bilhões USD)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}B`, 'Volume']}
                />
                <Legend />
                <Bar dataKey="volume" fill={theme.palette.info.main} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Typography
        variant="caption"
        sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'text.secondary' }}
      >
        Dados fornecidos pela CoinGecko API • Atualizado automaticamente a cada 60 segundos
      </Typography>
    </Box>
  );
};
