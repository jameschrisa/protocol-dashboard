export interface VendorData {
  name: string;
  value: number;
  children?: VendorData[];
  itemStyle?: {
    color: string;
  };
}

export interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  category: string;
  itemStyle: {
    color: string;
  };
  value?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  lineStyle?: {
    width: number;
  };
}
