import * as React from "react"
import { Tooltip, TooltipProps } from "recharts"
import { cn } from "../../lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("relative", className)}
      style={
        {
          "--chart-1": "215 25% 27%",
          "--chart-2": "221 83% 53%",
          "--color-desktop": "var(--chart-1)",
          "--color-mobile": "var(--chart-2)",
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string
  nameKey?: string
  labelFormatter?: (value: string) => string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  nameKey = "name",
  labelFormatter = (value) => value,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-950",
        className
      )}
      {...props}
    >
      <p className="mb-2 text-sm font-medium">{labelFormatter(label!)}</p>
      {payload.map((item: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: item.color }}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item[nameKey]}: {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export function ChartTooltip({
  content,
  ...props
}: Partial<TooltipProps<any, any>>) {
  return (
    <Tooltip
      content={content}
      {...props}
      cursor={{ fill: "hsl(var(--muted))" }}
      wrapperStyle={{ outline: "none" }}
    />
  )
}
