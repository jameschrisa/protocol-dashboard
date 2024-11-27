import React from "react";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Sector,
  Label,
  ResponsiveContainer,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ChartDataItem } from "./health-wallet-charts";

interface PieChartCardProps {
  title: string;
  data: ChartDataItem[];
  activeIndex: number;
  onSelect: (value: string) => void;
  onHover: (index: number) => void;
}

interface CenterLabelProps {
  viewBox?: {
    cx?: number;
    cy?: number;
  };
  value: number;
  name: string;
}

const renderActiveShape = (props: PieSectorDataItem) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius || 0) + 20}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius || 0) + 22}
        outerRadius={(outerRadius || 0) + 40}
        fill={fill}
        opacity={0.15}
      />
    </g>
  );
};

const renderCenterLabel = ({ viewBox, value, name }: CenterLabelProps) => {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;

  return (
    <g>
      <text x={cx} y={cy - 12} textAnchor="middle" className="fill-foreground text-2xl font-bold">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(value)}
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="fill-muted-foreground text-sm">
        {name}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  data,
  activeIndex,
  onSelect,
  onHover,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const isInsuranceCoverage = title.includes("Insurance Coverage");

  return (
    <Card className="p-6 bg-card border-2 min-h-[360px]">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h3 className="text-base font-semibold text-center">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Total: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(total)}
        </p>
        <Select
          value={data[activeIndex]?.name}
          onValueChange={onSelect}
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  {item.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => onHover(index)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
              ))}
              <Label
                content={(props: any) => renderCenterLabel({
                  viewBox: props.viewBox,
                  value: data[activeIndex]?.value || 0,
                  name: isInsuranceCoverage 
                    ? `${((data[activeIndex]?.value || 0) / total * 100).toFixed(0)}%`
                    : data[activeIndex]?.name || '',
                })}
              />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
