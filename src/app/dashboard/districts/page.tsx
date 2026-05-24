"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { districts } from "@/data/synthetic/districts";
import { StatusBadge, TrendIndicator } from "@/components/shared/status-badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { DistrictDetailDrawer } from "@/components/dashboard/district-detail-drawer";
import { getRiskColor } from "@/lib/utils";
import Link from "next/link";
import { BarChart3, Users, School, Utensils, ArrowRight, Eye } from "lucide-react";

export default function DistrictsPage() {
  const [drawerDistrictId, setDrawerDistrictId] = useState<string | null>(null);
  const sorted = [...districts].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <DistrictDetailDrawer
        isOpen={drawerDistrictId !== null}
        onClose={() => setDrawerDistrictId(null)}
        districtId={drawerDistrictId}
      />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-asha-teal" />
          District Intelligence
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          Comparative analytics across {districts.length} monitored districts
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Districts", value: 8, icon: BarChart3, color: "#2A9D8F" },
          { label: "Total Students", value: 68600, icon: Users, color: "#8B7EC8" },
          { label: "Critical Districts", value: 2, icon: School, color: "#D35449" },
          { label: "Avg Meal Rate", value: 63.5, icon: Utensils, color: "#E4A853", suffix: "%" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${s.color}12` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div className="text-xl font-bold text-asha-ink">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <p className="text-[11px] text-asha-ink-lighter mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* District cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((district, i) => (
          <motion.div
            key={district.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <Link href={`/dashboard/districts/${district.id}`}>
              <div className="warm-card p-5 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-asha-ink group-hover:text-asha-teal transition-colors">
                      {district.name}
                    </h3>
                    <p className="text-xs text-asha-ink-lighter">{district.state}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge level={district.riskLevel} />
                    <ArrowRight className="w-4 h-4 text-asha-ink-lighter group-hover:text-asha-teal transition-colors group-hover:translate-x-1 transform duration-200" />
                  </div>
                </div>

                {/* Risk score bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-asha-ink-lighter">Risk Score</span>
                    <span className="font-bold" style={{ color: getRiskColor(district.riskLevel) }}>
                      {district.riskScore}/100
                    </span>
                  </div>
                  <div className="h-2 bg-asha-cream-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getRiskColor(district.riskLevel) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${district.riskScore}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Projected Risk (V2) */}
                <div className="flex items-center gap-2 mb-3 text-[11px]">
                  <span className="text-asha-ink-lighter">Projected:</span>
                  <span className="text-asha-ink-light">7d: <span className="font-semibold">{district.projectedRisk7d}</span></span>
                  <span className="text-asha-ink-light">30d: <span className="font-semibold">{district.projectedRisk30d}</span></span>
                  <span className="text-asha-ink-light">90d: <span className="font-semibold">{district.projectedRisk90d}</span></span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-sm font-bold text-asha-ink">{district.totalSchools}</p>
                    <p className="text-[10px] text-asha-ink-lighter">Schools</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-asha-ink">{(district.totalStudents / 1000).toFixed(1)}K</p>
                    <p className="text-[10px] text-asha-ink-lighter">Students</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-asha-ink">{district.avgAttendance}%</p>
                    <p className="text-[10px] text-asha-ink-lighter">Attendance</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-asha-ink">{district.mealParticipation}%</p>
                    <p className="text-[10px] text-asha-ink-lighter">Meals</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-asha-glass-border">
                  <TrendIndicator trend={district.riskTrend} />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDrawerDistrictId(district.id); }}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-lg bg-asha-teal-muted/60 text-asha-teal-dark hover:bg-asha-teal-muted transition-colors"
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                    <span className="text-[11px] text-asha-ink-lighter">{district.activeInterventions} interventions</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
