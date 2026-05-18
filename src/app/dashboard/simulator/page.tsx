"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { resourceAllocations } from "@/data/synthetic/analytics";
import { Layers, Users, Package, DollarSign, TrendingUp } from "lucide-react";
import { getRiskColor } from "@/lib/utils";
import { districts } from "@/data/synthetic/districts";

export default function SimulatorPage() {
  const [budget, setBudget] = useState(5200000);
  const totalBudget = resourceAllocations.reduce((s, r) => s + r.allocatedBudget, 0);
  const scale = budget / totalBudget;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <Layers className="w-6 h-6 text-asha-sky" />
          NGO Resource Allocation Simulator
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">Simulate optimal resource distribution across districts</p>
      </motion.div>

      {/* Budget slider */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="warm-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-asha-ink">Total Budget Allocation</h3>
          <span className="text-xl font-bold text-asha-teal">₹{(budget / 100000).toFixed(1)}L</span>
        </div>
        <input type="range" min={1000000} max={10000000} step={100000} value={budget} onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-asha-cream-dark rounded-full appearance-none cursor-pointer accent-asha-teal" />
        <div className="flex justify-between text-[11px] text-asha-ink-lighter mt-1">
          <span>₹10L</span><span>₹100L</span>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Food", value: `${Math.round(resourceAllocations.reduce((s, r) => s + r.foodKg, 0) * scale / 1000)}T`, icon: Package, color: "#2A9D8F" },
          { label: "Volunteers", value: Math.round(resourceAllocations.reduce((s, r) => s + r.volunteers, 0) * scale), icon: Users, color: "#8B7EC8" },
          { label: "Avg Coverage", value: `${Math.round(resourceAllocations.reduce((s, r) => s + r.coveragePercent, 0) / resourceAllocations.length * Math.min(scale, 1))}%`, icon: TrendingUp, color: "#4CAF7D" },
          { label: "Est. Impact", value: `${Math.round(resourceAllocations.reduce((s, r) => s + r.impactEstimate, 0) / resourceAllocations.length * Math.min(scale, 1))}%`, icon: DollarSign, color: "#E4A853" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="stat-card">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${s.color}12` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold text-asha-ink">{s.value}</p>
            <p className="text-[11px] text-asha-ink-lighter">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Allocation table */}
      <div className="warm-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-asha-glass-border">
                <th className="text-left text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">Priority</th>
                <th className="text-left text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">District</th>
                <th className="text-right text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">Budget</th>
                <th className="text-right text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">Food (kg)</th>
                <th className="text-right text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3 hidden md:table-cell">Volunteers</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">Coverage</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase px-5 py-3">Impact</th>
              </tr>
            </thead>
            <tbody>
              {resourceAllocations.map((alloc, i) => {
                const d = districts.find(dd => dd.id === alloc.districtId);
                return (
                  <motion.tr key={alloc.districtId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
                    className="border-b border-asha-glass-border/50 hover:bg-asha-cream/60 transition-colors">
                    <td className="px-5 py-3"><span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${getRiskColor(d?.riskLevel || 'moderate')}12`, color: getRiskColor(d?.riskLevel || 'moderate') }}>#{alloc.priority}</span></td>
                    <td className="px-5 py-3"><span className="text-sm font-medium text-asha-ink">{alloc.districtName}</span></td>
                    <td className="px-5 py-3 text-right text-sm text-asha-ink">₹{(alloc.allocatedBudget * scale / 100000).toFixed(1)}L</td>
                    <td className="px-5 py-3 text-right text-sm text-asha-ink">{Math.round(alloc.foodKg * scale).toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-sm text-asha-ink hidden md:table-cell">{Math.round(alloc.volunteers * scale)}</td>
                    <td className="px-5 py-3 text-center"><div className="flex items-center justify-center gap-2"><div className="w-16 h-1.5 bg-asha-cream-dark rounded-full overflow-hidden"><div className="h-full rounded-full bg-asha-teal" style={{ width: `${alloc.coveragePercent * Math.min(scale, 1)}%` }} /></div><span className="text-xs font-medium text-asha-ink">{Math.round(alloc.coveragePercent * Math.min(scale, 1))}%</span></div></td>
                    <td className="px-5 py-3 text-center"><span className="text-xs font-bold text-asha-emerald">{Math.round(alloc.impactEstimate * Math.min(scale, 1))}%</span></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
