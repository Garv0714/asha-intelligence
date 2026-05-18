"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { districts } from "@/data/synthetic/districts";
import { getRiskColor } from "@/lib/utils";

const chartData = districts
  .sort((a, b) => b.riskScore - a.riskScore)
  .map((d) => ({
    name: d.name,
    score: d.riskScore,
    level: d.riskLevel,
  }));

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;
  return (
    <div className="warm-card p-3 shadow-elevated">
      <p className="text-xs font-semibold text-asha-ink mb-1">{data.name}</p>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-asha-ink-light">Risk Score:</span>
        <span className="font-bold" style={{ color: getRiskColor(data.level) }}>{data.score}</span>
      </div>
      <div className="flex items-center gap-2 text-xs mt-0.5">
        <span className="text-asha-ink-light">Level:</span>
        <span className="font-medium capitalize" style={{ color: getRiskColor(data.level) }}>{data.level}</span>
      </div>
    </div>
  );
};

export function RiskDistributionChart() {
  return (
    <div className="warm-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-asha-ink">District Risk Distribution</h3>
        <p className="text-xs text-asha-ink-lighter mt-0.5">Composite hunger-risk scores by district</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,62,80,0.06)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#8E99A4" }} tickLine={false} axisLine={false} angle={-30} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11, fill: "#8E99A4" }} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(42, 157, 143, 0.04)" }} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={36}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={getRiskColor(entry.level)} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
