import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TooltipProps } from "recharts";

interface CustomPayload {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  values: number[]; // [Rejalashtirilgan, Jarayonda, Tugallangan]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const LABELS = ["Rejalashtirilgan", "Jarayonda", "Tugallangan"];

const DonutChart: React.FC<DonutChartProps> = ({ values }) => {
  const data = values.map((value, index) => ({
    name: LABELS[index],
    value,
    color: COLORS[index % COLORS.length],
  }));

  const total = values.reduce((sum, val) => sum + val, 0);

  return (
    <div
      className="relative size-[120px] rounded-lg bg-white p-3 shadow-lg"
      style={{ zIndex: 99999 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={50}
            paddingAngle={4}
            dataKey="value"
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }: TooltipProps<number, string>) =>
              active && payload && payload.length ? (
                <div className="max-w-xs rounded border border-gray-200 bg-white p-3 text-sm shadow-lg">
                  {(payload as CustomPayload[]).map((entry, index) => (
                    <div
                      key={index}
                      className="mb-2 flex items-center gap-3 last:mb-0"
                    >
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {entry.name}:{" "}
                        <span className="font-bold">{entry.value}</span>
                        ertyjukg,hgh
                      </span>
                    </div>
                  ))}
                </div>
              ) : null
            }
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Markazdagi umumiy soni */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-800"
        style={{ fontSize: 16, fontWeight: "700" }}
      >
        {total}
      </div>
    </div>
  );
};

export default DonutChart;
