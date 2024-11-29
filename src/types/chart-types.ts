export interface ChartRange {
  min: number;
  max: number;
  color: string;
}

export interface ChartSeries {
  key: string;
  name: string;
  color: string;
  ranges?: ChartRange[];
}

export interface ChartConfig {
  data: any[];
  series: ChartSeries[];
  title: string;
  description?: string;
  yAxisLabel?: string;
  domain?: [number, number];
}
