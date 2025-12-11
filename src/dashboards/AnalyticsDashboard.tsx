import { Grid, Box } from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StatCard, ChartCard } from '../components/Cards';
import { Speed, AccessTime, CheckCircle, Error } from '@mui/icons-material';
import { useTheme } from '@mui/material';

const performanceData = [
  { time: '00:00', cpu: 45, memoria: 62, latencia: 120 },
  { time: '04:00', cpu: 52, memoria: 58, latencia: 150 },
  { time: '08:00', cpu: 78, memoria: 75, latencia: 180 },
  { time: '12:00', cpu: 85, memoria: 82, latencia: 220 },
  { time: '16:00', cpu: 72, memoria: 70, latencia: 165 },
  { time: '20:00', cpu: 55, memoria: 65, latencia: 140 },
];

export const AnalyticsDashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Uptime"
            value="99.9%"
            change={0.2}
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Latência Média"
            value="165ms"
            change={-5.3}
            icon={<Speed sx={{ fontSize: 40 }} />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tempo de Resposta"
            value="1.2s"
            change={-8.1}
            icon={<AccessTime sx={{ fontSize: 40 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Erros"
            value="12"
            change={-15.5}
            icon={<Error sx={{ fontSize: 40 }} />}
            color={theme.palette.error.main}
          />
        </Grid>

        {/* CPU & Memory Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Uso de CPU e Memória">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={{ fill: theme.palette.primary.main, r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="memoria"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={3}
                  dot={{ fill: theme.palette.secondary.main, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Latency Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard title="Latência do Sistema">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorLatencia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.info.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.info.main} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="latencia"
                  stroke={theme.palette.info.main}
                  fillOpacity={1}
                  fill="url(#colorLatencia)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};
