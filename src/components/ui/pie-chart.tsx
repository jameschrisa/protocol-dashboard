import * as React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { cn } from "../../lib/utils";

const PieChart = React.forwardRef<
  React.ElementRef<typeof RechartsPieChart>,
  React.ComponentPropsWithoutRef<typeof RechartsPieChart>
>(({ className, ...props }, ref) => (
  <ResponsiveContainer width="100%" height={400}>
    <RechartsPieChart ref={ref} className={cn("", className)} {...props}>
      <Pie
        data={props.data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {props.data && props.data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </RechartsPieChart>
  </ResponsiveContainer>
));
PieChart.displayName = RechartsPieChart.displayName;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export { PieChart };
