export interface Dashboard {
  id: string;
  name: string;
  icon: string;
  path: string;
  description: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface APIConnection {
  id: string;
  name: string;
  type: 'sql' | 'api' | 'rest';
  endpoint: string;
  config?: Record<string, unknown>;
}
