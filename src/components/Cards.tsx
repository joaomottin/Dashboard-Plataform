import { Box, Grid, Card, CardContent, Typography, useTheme, alpha } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { ChartData } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: JSX.Element;
  color?: string;
}

export const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const theme = useTheme();
  const cardColor = color || theme.palette.primary.main;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease',
          boxShadow: `0 12px 40px 0 ${alpha(cardColor, 0.3)}`,
        },
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(cardColor, 0.3)}, transparent)`,
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: cardColor, opacity: 0.8 }}>
              {icon}
            </Box>
          )}
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {change >= 0 ? (
              <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 20 }} />
            ) : (
              <TrendingDown sx={{ color: theme.palette.error.main, fontSize: 20 }} />
            )}
            <Typography
              variant="body2"
              sx={{
                color: change >= 0 ? theme.palette.success.main : theme.palette.error.main,
                fontWeight: 600,
              }}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: JSX.Element;
}

export const ChartCard = ({ title, children, action }: ChartCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          transition: 'border 0.3s ease',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {action}
        </Box>
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
