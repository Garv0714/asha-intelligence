"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { foodPriceData } from "@/data/synthetic/analytics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="warm-card p-3 shadow-elevated">
      <p className="text-xs font-semibold text-asha-ink mb-2">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-asha-ink-light">{entry.name}:</span>
          <span className="font-semibold text-asha-ink">₹{entry.value}/kg</span>
        </div>
      ))}
    </div>
  );
};

export function FoodInflationChart() {
  return (
    <div className="warm-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-asha-ink">Food Price Trends</h3>
          <p className="text-xs text-asha-ink-lighter mt-0.5">Staple food prices (₹/kg) — 12 months</p>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={foodPriceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,62,80,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8E99A4" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8E99A4" }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="rice" stroke="#2A9D8F" strokeWidth={2} dot={false} name="Rice" />
            <Line type="monotone" dataKey="wheat" stroke="#5BA4CF" strokeWidth={2} dot={false} name="Wheat" />
            <Line type="monotone" dataKey="dal" stroke="#E4A853" strokeWidth={2} dot={false} name="Dal" />
            <Line type="monotone" dataKey="vegetables" stroke="#4CAF7D" strokeWidth={2} dot={false} name="Vegetables" />
            <Line type="monotone" dataKey="milk" stroke="#8B7EC8" strokeWidth={2} dot={false} name="Milk" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-asha-ink-lighter">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-teal" />Rice</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-sky" />Wheat</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-amber" />Dal</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-emerald" />Vegetables</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-asha-violet" />Milk</span>
      </div>
    </div>
  );
}
