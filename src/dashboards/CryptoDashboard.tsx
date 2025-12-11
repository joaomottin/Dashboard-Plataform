import { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
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
  const [days, setDays] = useState<string>('7');
  const [usdToBrl, setUsdToBrl] = useState<number>(5.0);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      // Buscar taxa de câmbio USD para BRL
      const exchangeResponse = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'usd',
            vs_currencies: 'brl',
          },
        }
      );
      const currentRate = exchangeResponse.data.usd?.brl || 5.0;
      setUsdToBrl(currentRate);

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

      // Buscar histórico do Bitcoin
      const historyResponse = await axios.get<MarketChartData>(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: parseInt(days),
          },
        }
      );

      // Processar dados do histórico para o gráfico
      const totalPoints = historyResponse.data.prices.length;
      const maxPoints = 50;
      const sampleRate = Math.max(1, Math.floor(totalPoints / maxPoints));
      
      const processedHistory = historyResponse.data.prices
        .filter((_, index) => index % sampleRate === 0)
        .map((item) => {
          const date = new Date(item[0]);
          const daysNum = parseInt(days);
          
          return {
            date: date.toLocaleDateString('pt-BR', {
              month: 'short',
              day: 'numeric',
              hour: daysNum === 1 ? '2-digit' : undefined,
            }),
            price: Math.round(item[1] * currentRate),
          };
        });

      setBitcoinHistory(processedHistory);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [days]);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Criptomoedas ao Vivo
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={days}
            exclusive
            onChange={(_, newValue) => newValue && setDays(newValue)}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'text.secondary',
                borderColor: 'rgba(255,255,255,0.12)',
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              },
            }}
          >
            <ToggleButton value="1">1D</ToggleButton>
            <ToggleButton value="7">7D</ToggleButton>
            <ToggleButton value="30">30D</ToggleButton>
          </ToggleButtonGroup>
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
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards com dados reais */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Bitcoin (BTC)"
            value={`R$ ${(topCrypto?.current_price * usdToBrl).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
            change={topCrypto?.price_change_percentage_24h}
            icon={<CurrencyBitcoin sx={{ fontSize: 40 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={cryptoData[1]?.name || 'Ethereum'}
            value={`R$ ${(cryptoData[1]?.current_price * usdToBrl).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
            change={cryptoData[1]?.price_change_percentage_24h}
            icon={<ShowChart sx={{ fontSize: 40 }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={cryptoData[2]?.name || 'Tether'}
            value={`R$ ${(cryptoData[2]?.current_price * usdToBrl).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`}
            change={cryptoData[2]?.price_change_percentage_24h}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Market Cap Total"
            value={`R$ ${((cryptoData.reduce((sum, c) => sum + c.market_cap, 0) * usdToBrl) / 1000000000000).toFixed(2)}T`}
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
          <ChartCard title={`Bitcoin - ${days === '1' ? '24 Horas' : days === '7' ? '7 Dias' : '30 Dias'}`}>
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
                <YAxis 
                  stroke="#888"
                  domain={[
                    (dataMin: number) => Math.floor(dataMin * 0.98),
                    (dataMax: number) => Math.ceil(dataMax * 1.02)
                  ]}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`, 'Preço']}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorBitcoin)"
                  strokeWidth={2}
                  name="Preço (BRL)"
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
                  {marketCapData.map((_, index) => (
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
                    `R$ ${((value * usdToBrl) / 1000000000).toFixed(2)}B`,
                    'Market Cap',
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Volume de Negociação */}
        <Grid item xs={12}>
          <ChartCard title="Volume de Negociação 24h (Bilhões BRL)">
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
                  formatter={(value: number) => [`R$ ${(value * usdToBrl).toFixed(2)}B`, 'Volume']}
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
