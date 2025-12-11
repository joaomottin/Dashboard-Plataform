import { Grid, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatCard, ChartCard } from '../components/Cards';
import { ShowChart, People, AttachMoney, TrendingUp } from '@mui/icons-material';
import { useTheme } from '@mui/material';

const data = [
  { name: 'Jan', vendas: 4000, lucro: 2400, clientes: 240 },
  { name: 'Fev', vendas: 3000, lucro: 1398, clientes: 221 },
  { name: 'Mar', vendas: 2000, lucro: 9800, clientes: 229 },
  { name: 'Abr', vendas: 2780, lucro: 3908, clientes: 200 },
  { name: 'Mai', vendas: 1890, lucro: 4800, clientes: 218 },
  { name: 'Jun', vendas: 2390, lucro: 3800, clientes: 250 },
  { name: 'Jul', vendas: 3490, lucro: 4300, clientes: 210 },
];

const pieData = [
  { name: 'Produto A', value: 400 },
  { name: 'Produto B', value: 300 },
  { name: 'Produto C', value: 200 },
  { name: 'Produto D', value: 100 },
];

export const SalesDashboard = () => {
  const theme = useTheme();

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Vendas Totais"
            value="R$ 145K"
            change={12.5}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Clientes"
            value="1,234"
            change={8.2}
            icon={<People sx={{ fontSize: 40 }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Lucro"
            value="R$ 89K"
            change={15.3}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Taxa de Conversão"
            value="3.2%"
            change={-2.1}
            icon={<ShowChart sx={{ fontSize: 40 }} />}
            color={theme.palette.info.main}
          />
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} lg={8}>
          <ChartCard title="Desempenho de Vendas">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill="url(#colorVendas)"
                />
                <Area
                  type="monotone"
                  dataKey="lucro"
                  stroke={theme.palette.secondary.main}
                  fillOpacity={1}
                  fill="url(#colorLucro)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <ChartCard title="Distribuição de Produtos">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <ChartCard title="Análise Mensal de Clientes">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="clientes" fill={theme.palette.info.main} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};
