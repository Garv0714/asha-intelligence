"use client";

import { motion } from "framer-motion";
import { districtRankings } from "@/data/synthetic/analytics";
import { districts } from "@/data/synthetic/districts";
import { Shield, TrendingUp, GraduationCap, AlertTriangle } from "lucide-react";
import { getRiskColor } from "@/lib/utils";

export default function SeverityPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <Shield className="w-6 h-6 text-asha-coral" />
          District Severity Rankings
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">Ranked by hunger severity, intervention urgency, and projected educational impact</p>
      </motion.div>

      <div className="space-y-4">
        {districtRankings.map((ranking, i) => {
          const district = districts.find(d => d.id === ranking.districtId);
          const riskLevel = district?.riskLevel || "moderate";
          return (
            <motion.div key={ranking.districtId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="warm-card p-5 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-lg" style={{ backgroundColor: `${getRiskColor(riskLevel)}12`, color: getRiskColor(riskLevel) }}>
                  #{ranking.compositeRank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-base font-semibold text-asha-ink">{ranking.districtName}</h3>
                    <span className="text-xs text-asha-ink-lighter">{district?.state}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-asha-ink-lighter mb-1">
                        <AlertTriangle className="w-3 h-3" />Hunger Severity
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-asha-cream-dark rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-asha-coral" initial={{ width: 0 }} animate={{ width: `${ranking.hungerSeverity}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }} />
                        </div>
                        <span className="text-sm font-bold text-asha-ink">{ranking.hungerSeverity}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-asha-ink-lighter mb-1">
                        <TrendingUp className="w-3 h-3" />Intervention Urgency
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-asha-cream-dark rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-asha-amber" initial={{ width: 0 }} animate={{ width: `${ranking.interventionUrgency}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }} />
                        </div>
                        <span className="text-sm font-bold text-asha-ink">{ranking.interventionUrgency}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-asha-ink-lighter mb-1">
                        <GraduationCap className="w-3 h-3" />Educational Impact
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-asha-cream-dark rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-asha-violet" initial={{ width: 0 }} animate={{ width: `${ranking.educationalImpact}%` }} transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }} />
                        </div>
                        <span className="text-sm font-bold text-asha-ink">{ranking.educationalImpact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
