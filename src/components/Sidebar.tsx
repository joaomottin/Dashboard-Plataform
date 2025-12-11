import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  BarChart,
  PieChart,
  Timeline,
  MenuOpen,
  Menu,
} from '@mui/icons-material';
import { Dashboard } from '../types';

const DRAWER_WIDTH = 280;

interface SidebarProps {
  dashboards: Dashboard[];
  selectedDashboard: string;
  onSelectDashboard: (id: string) => void;
}

export const Sidebar = ({ dashboards, selectedDashboard, onSelectDashboard }: SidebarProps) => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const iconMap: Record<string, JSX.Element> = {
    dashboard: <DashboardIcon />,
    bar: <BarChart />,
    pie: <PieChart />,
    timeline: <Timeline />,
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 70 : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 70 : DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: 'hidden',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            Dashboard Platform
          </Typography>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: theme.palette.primary.main }}>
          {collapsed ? <Menu /> : <MenuOpen />}
        </IconButton>
      </Toolbar>

      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {dashboards.map((dashboard) => (
            <ListItem key={dashboard.id} disablePadding sx={{ mb: 1, px: 1 }}>
              <ListItemButton
                selected={selectedDashboard === dashboard.id}
                onClick={() => onSelectDashboard(dashboard.id)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
                    },
                  },
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 40 }}>
                  {iconMap[dashboard.icon] || <DashboardIcon />}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={dashboard.name} secondary={dashboard.description} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(180deg, transparent, ${alpha(theme.palette.primary.main, 0.1)})`,
          pointerEvents: 'none',
        }}
      />
    </Drawer>
  );
};
