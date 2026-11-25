
import { formatCompactValue } from "@/src/util/numbers/format-compact-money";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

const COLORS = [
  "#17213a",
  "#3c6ae4",
  "#57c2ab",
  "#f3bd5c",
  "#8b7cf6",
  "#cbd5e1",
];

interface DonutChartProps {
  data: Record<string, any>[];
  labelKey: string;
  valueKey: string;
  centerLabel?: string;
  centerValue?: number;
}

export default function DonutChart({data, labelKey, valueKey, centerLabel, centerValue}: DonutChartProps) {

  const chartData = data.map((item) => ({
    name: item[labelKey],
    value: Number(item[valueKey]) || 0,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const formatValue = (value: number) => value?.toLocaleString("en-us", {maximumFractionDigits: 2});


  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;
    const percentage = total > 0 ? (item.value / total) * 100 : 0;

    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
        <p className="text-sm font-medium text-gray-900">
          {item.name}
        </p>

        <p className="text-xs text-gray-700">
          {formatValue(item.value)} 
        </p>
        <span className="text-gray-600 text-xs">{percentage.toLocaleString("en-us", {maximumFractionDigits: 2})}%</span>
      </div>
    );
  };


  return (
    <div className="flex flex-col w-full gap-y-1">
      {/* Donut */}
      <div className="h-[280px] w-full max-w-[280px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={0}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell
                   key={`${item.name}-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              <tspan
                x="50%"
                dy="-8"
                className="fill-gray-500 text-sm"
              >
                {centerLabel ?? "Total"}
              </tspan>

              <tspan
                x="50%"
                dy="26"
                className="fill-gray-900 font-bold text-xl"
              >
                {centerValue ? formatCompactValue(centerValue) : formatCompactValue(total)}
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 justify-between text-sm px-2">
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;

          return (
          <div
            key={item.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex gap-1">
              
              <div className="flex flex-col text-xs ">
                <div className="flex items-center gap-x-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>
                      {item.name}
                    </span>
                </div>
                
                <span className="pl-4 text-xs font-medium text-gray-900">
                  {formatValue(item.value)}
                </span>
                <span className="pl-4 text-xs text-gray-600">{formatValue(percentage)}%</span>
              </div>
            </div>

            
          </div>
        )})}
      </div>
    </div>
  );
}