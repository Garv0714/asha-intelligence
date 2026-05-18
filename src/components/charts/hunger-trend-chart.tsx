"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { trendData } from "@/data/synthetic/analytics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="warm-card p-3 shadow-elevated">
      <p className="text-xs font-semibold text-asha-ink mb-2">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-asha-ink-light">{entry.name}:</span>
          <span className="font-semibold text-asha-ink">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

export function HungerTrendChart() {
  return (
    <div className="warm-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-asha-ink">Attendance vs Meal Participation</h3>
          <p className="text-xs text-asha-ink-lighter mt-0.5">12-month trend across all districts</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-teal" />Attendance</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-emerald" />Meals</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF7D" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4CAF7D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,62,80,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8E99A4" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8E99A4" }} tickLine={false} axisLine={false} domain={[50, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="attendance" stroke="#2A9D8F" strokeWidth={2} fill="url(#tealGrad)" name="Attendance" />
            <Area type="monotone" dataKey="mealParticipation" stroke="#4CAF7D" strokeWidth={2} fill="url(#emeraldGrad)" name="Meals" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
