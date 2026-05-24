"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resourceAllocations } from "@/data/synthetic/analytics";
import { Layers, Users, Package, DollarSign, TrendingUp, Play, RotateCcw, CheckCircle, AlertTriangle, Brain } from "lucide-react";
import { getRiskColor } from "@/lib/utils";
import { districts } from "@/data/synthetic/districts";

export default function SimulatorPage() {
  const [budget, setBudget] = useState(5200000);
  const [activeInterventions, setActiveInterventions] = useState<Set<string>>(new Set());
  const [simRunning, setSimRunning] = useState(false);
  const totalBudget = resourceAllocations.reduce((s, r) => s + r.allocatedBudget, 0);
  const scale = budget / totalBudget;

  const toggleIntervention = (districtId: string) => {
    setActiveInterventions((prev) => {
      const next = new Set(prev);
      next.has(districtId) ? next.delete(districtId) : next.add(districtId);
      return next;
    });
  };

  const runSimulation = () => {
    setSimRunning(true);
    setTimeout(() => setSimRunning(false), 2000);
  };

  const resetSimulation = () => {
    setActiveInterventions(new Set());
    setBudget(5200000);
  };

  // Simulate risk reductions based on active interventions
  const simulatedResults = useMemo(() => {
    return resourceAllocations.map((alloc) => {
      const d = districts.find((dd) => dd.id === alloc.districtId);
      const isActive = activeInterventions.has(alloc.districtId);
      const baseRisk = d?.riskScore || 50;
      const budgetFactor = Math.min(scale, 1.5);
      const riskReduction = isActive ? Math.round(alloc.impactEstimate * budgetFactor * 0.2) : 0;
      const projectedRisk = Math.max(10, baseRisk - riskReduction);
      const recoveryWeeks = isActive ? Math.max(2, Math.round(12 - budgetFactor * 4)) : 0;
      return {
        ...alloc,
        district: d,
        isActive,
        baseRisk,
        projectedRisk,
        riskReduction,
        recoveryWeeks,
        status: isActive ? (simRunning ? "simulating" : "active") : "inactive",
      };
    });
  }, [activeInterventions, scale, simRunning]);

  const totalChildrenHelped = simulatedResults.filter((r) => r.isActive).reduce((sum, r) => sum + Math.round(r.district?.totalStudents || 0), 0);
  const avgRiskReduction = simulatedResults.filter((r) => r.isActive).length > 0
    ? Math.round(simulatedResults.filter((r) => r.isActive).reduce((s, r) => s + r.riskReduction, 0) / simulatedResults.filter((r) => r.isActive).length)
    : 0;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <Layers className="w-6 h-6 text-asha-sky" />
          NGO Resource Allocation Simulator
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">Simulate interventions, adjust budgets, and project impact outcomes</p>
      </motion.div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Budget slider */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="warm-card p-5 lg:col-span-2">
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

        {/* Simulation controls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="warm-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-asha-ink mb-1">Simulation Controls</h3>
            <p className="text-[11px] text-asha-ink-lighter mb-3">{activeInterventions.size} of {resourceAllocations.length} districts selected</p>
          </div>
          <div className="flex gap-2">
            <button onClick={runSimulation} disabled={activeInterventions.size === 0 || simRunning}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 disabled:opacity-40 transition-all">
              {simRunning ? <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Running...</> : <><Play className="w-3.5 h-3.5" /> Run Simulation</>}
            </button>
            <button onClick={resetSimulation}
              className="px-3 py-2.5 text-xs font-medium rounded-xl border border-asha-glass-border text-asha-ink-lighter hover:text-asha-ink hover:bg-asha-cream-dark transition-all bg-white">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Impact summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Food", value: `${Math.round(resourceAllocations.reduce((s, r) => s + r.foodKg, 0) * scale / 1000)}T`, icon: Package, color: "#2A9D8F" },
          { label: "Children Reached", value: totalChildrenHelped.toLocaleString(), icon: Users, color: "#8B7EC8" },
          { label: "Avg Risk Reduction", value: avgRiskReduction > 0 ? `-${avgRiskReduction}pts` : "—", icon: TrendingUp, color: "#4CAF7D" },
          { label: "Est. Budget Used", value: `₹${(activeInterventions.size > 0 ? simulatedResults.filter(r => r.isActive).reduce((s, r) => s + r.district!.riskScore * 12000 * scale, 0) / 100000 : 0).toFixed(1)}L`, icon: DollarSign, color: "#E4A853" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="stat-card">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${s.color}12` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold text-asha-ink">{s.value}</p>
            <p className="text-[11px] text-asha-ink-lighter">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Intervention cards with toggle */}
      <div className="warm-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-asha-teal" />
            <h3 className="text-sm font-semibold text-asha-ink">District Intervention Simulator</h3>
          </div>
          <span className="text-[11px] text-asha-ink-lighter">Click districts to toggle interventions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {simulatedResults.map((result, i) => (
            <motion.div
              key={result.districtId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={() => toggleIntervention(result.districtId)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                result.isActive
                  ? "bg-asha-teal-muted/50 border-asha-teal/20 shadow-card"
                  : "bg-asha-cream border-asha-glass-border hover:border-asha-teal/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: `${getRiskColor(result.district?.riskLevel || 'moderate')}12`, color: getRiskColor(result.district?.riskLevel || 'moderate') }}>
                    #{result.priority}
                  </span>
                  <span className="text-sm font-semibold text-asha-ink">{result.districtName}</span>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  result.isActive ? "bg-asha-teal text-white" : "border border-asha-glass-border bg-white"
                }`}>
                  {result.isActive && <CheckCircle className="w-3 h-3" />}
                </div>
              </div>

              {/* Risk projection */}
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-asha-ink-lighter">Current: <span className="font-bold" style={{ color: getRiskColor(result.district?.riskLevel || 'moderate') }}>{result.baseRisk}</span></span>
                {result.isActive && (
                  <>
                    <span className="text-asha-ink-faint">→</span>
                    <span className="text-asha-emerald font-bold">{result.projectedRisk}</span>
                    <span className="text-asha-emerald text-[10px]">(-{result.riskReduction}pts in ~{result.recoveryWeeks}wks)</span>
                  </>
                )}
              </div>

              {/* Progress bars */}
              <div className="mt-2 flex gap-2">
                <div className="flex-1">
                  <div className="h-1.5 bg-asha-cream-dark rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: getRiskColor(result.district?.riskLevel || 'moderate') }}
                      animate={{ width: `${result.isActive ? result.projectedRisk : result.baseRisk}%` }}
                      transition={{ duration: 0.6 }} />
                  </div>
                </div>
                <span className="text-[10px] text-asha-ink-lighter w-12 text-right">
                  {result.isActive ? `${Math.round(result.district?.totalStudents || 0)} stu.` : "—"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulation Result Panel */}
      <AnimatePresence>
        {activeInterventions.size > 0 && !simRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="warm-card p-6 border border-asha-teal/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-asha-teal" />
              <h3 className="text-sm font-semibold text-asha-ink">AI Simulation Analysis</h3>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/15 rounded-full">
                {activeInterventions.size} districts active
              </span>
            </div>
            <p className="text-sm text-asha-ink-light leading-relaxed mb-4">
              Based on the current budget of ₹{(budget / 100000).toFixed(1)}L and {activeInterventions.size} active intervention zones,
              the AI model projects an average risk reduction of <span className="font-bold text-asha-emerald">{avgRiskReduction} points</span> across
              selected districts, reaching <span className="font-bold text-asha-ink">{totalChildrenHelped.toLocaleString()} children</span>.
              Recovery timelines range from {Math.min(...simulatedResults.filter(r => r.isActive).map(r => r.recoveryWeeks))} to {Math.max(...simulatedResults.filter(r => r.isActive).map(r => r.recoveryWeeks))} weeks
              depending on district severity and resource density.
            </p>
            <div className="flex flex-wrap gap-2">
              {simulatedResults.filter(r => r.isActive).map((r) => (
                <span key={r.districtId} className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-asha-cream border border-asha-glass-border text-asha-ink">
                  {r.districtName}: {r.baseRisk}→{r.projectedRisk} <span className="text-asha-emerald">↓{r.riskReduction}</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

