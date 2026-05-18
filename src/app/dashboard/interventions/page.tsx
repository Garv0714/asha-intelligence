"use client";

import { motion } from "framer-motion";
import { interventions } from "@/data/synthetic/analytics";
import { aiRecommendations } from "@/data/synthetic/analytics";
import { HandHeart, Clock, Users, TrendingUp, Zap, Shield, ArrowRight } from "lucide-react";

const typeColors: Record<string, string> = {
  meal_program: "#2A9D8F",
  food_bank: "#E4A853",
  nutrition_education: "#8B7EC8",
  family_support: "#5BA4CF",
  emergency_aid: "#D35449",
};

const typeLabels: Record<string, string> = {
  meal_program: "Meal Program",
  food_bank: "Food Bank",
  nutrition_education: "Nutrition Education",
  family_support: "Family Support",
  emergency_aid: "Emergency Aid",
};

const statusColors: Record<string, string> = {
  active: "#4CAF7D",
  planned: "#E4A853",
  completed: "#2A9D8F",
  suspended: "#D35449",
};

export default function InterventionsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <HandHeart className="w-6 h-6 text-asha-emerald" />
          Intervention Tracking
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          {interventions.length} interventions across {new Set(interventions.map((i) => i.districtId)).size} districts
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active", value: interventions.filter((i) => i.status === "active").length, color: "#4CAF7D" },
          { label: "Planned", value: interventions.filter((i) => i.status === "planned").length, color: "#E4A853" },
          { label: "Total Beneficiaries", value: interventions.reduce((sum, i) => sum + i.beneficiaries, 0).toLocaleString(), color: "#2A9D8F" },
          { label: "Avg Impact", value: Math.round(interventions.filter((i) => i.impactScore).reduce((sum, i) => sum + (i.impactScore || 0), 0) / interventions.filter((i) => i.impactScore).length) + "%", color: "#8B7EC8" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <p className="text-2xl font-bold text-asha-ink">{s.value}</p>
            <p className="text-[11px] text-asha-ink-lighter mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations Section */}
      <div className="warm-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-asha-amber" />
          <h2 className="text-base font-bold text-asha-ink">AI-Powered Recommendations</h2>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-asha-amber-muted text-asha-amber-dark border border-asha-amber/15 rounded-full">
            {aiRecommendations.length} recommendations
          </span>
        </div>
        <div className="space-y-4">
          {aiRecommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-5 rounded-xl bg-asha-cream border border-asha-glass-border hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                      rec.urgency === "immediate" ? "bg-risk-critical/10 text-risk-critical border border-risk-critical/20" :
                      rec.urgency === "urgent" ? "bg-risk-high/10 text-risk-high border border-risk-high/20" :
                      "bg-risk-moderate/10 text-risk-moderate border border-risk-moderate/20"
                    }`}>
                      {rec.urgency}
                    </span>
                    <span className="text-xs text-asha-ink-lighter">{rec.districtName}</span>
                    <span className="text-[11px] font-medium text-asha-teal">{(rec.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                  <h4 className="text-sm font-semibold text-asha-ink mb-1">{rec.title}</h4>
                  <p className="text-xs text-asha-ink-light mb-3">{rec.description}</p>

                  {/* Trigger Factors */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {rec.triggerFactors.map((factor, fi) => (
                      <span key={fi} className="px-2 py-0.5 text-[10px] text-asha-coral-dark bg-asha-coral-muted rounded-full border border-asha-coral/15">
                        {factor}
                      </span>
                    ))}
                  </div>

                  {/* Action Plan */}
                  <div className="space-y-1.5 mb-3">
                    {rec.actionPlan.slice(0, 3).map((action, ai) => (
                      <div key={ai} className="flex items-start gap-2 text-xs text-asha-ink-light">
                        <ArrowRight className="w-3 h-3 text-asha-teal mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Prediction */}
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1 text-asha-ink-lighter">
                      <Shield className="w-3 h-3" />
                      {rec.impactPrediction.childrenHelped.toLocaleString()} children helped
                    </span>
                    <span className="flex items-center gap-1 text-asha-emerald">
                      <TrendingUp className="w-3 h-3" />
                      -{rec.impactPrediction.riskReduction}% risk in {rec.impactPrediction.timeframe}
                    </span>
                    <span className="text-asha-ink-lighter">
                      ₹{(rec.estimatedBudget / 100000).toFixed(1)}L budget
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Interventions Timeline */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-asha-ink flex items-center gap-2">
          <HandHeart className="w-5 h-5 text-asha-emerald" />
          Active Interventions
        </h2>
        {interventions.map((intervention, i) => (
          <motion.div
            key={intervention.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="warm-card p-5 hover:shadow-card-hover transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[intervention.status] }} />
                {i < interventions.length - 1 && <div className="w-px h-12 bg-asha-glass-border" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                    style={{ backgroundColor: `${typeColors[intervention.type]}12`, color: typeColors[intervention.type], border: `1px solid ${typeColors[intervention.type]}20` }}
                  >
                    {typeLabels[intervention.type]}
                  </span>
                  <span
                    className="px-2 py-0.5 text-[10px] font-semibold capitalize rounded-full"
                    style={{ backgroundColor: `${statusColors[intervention.status]}12`, color: statusColors[intervention.status], border: `1px solid ${statusColors[intervention.status]}20` }}
                  >
                    {intervention.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-asha-ink mb-1">{intervention.title}</h3>
                <p className="text-sm text-asha-ink-light">{intervention.description}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-asha-ink-lighter">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{intervention.startDate}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{intervention.beneficiaries.toLocaleString()} beneficiaries</span>
                  <span>{intervention.districtName}</span>
                  {intervention.impactScore && (
                    <span className="flex items-center gap-1 text-asha-emerald">
                      <TrendingUp className="w-3 h-3" />Impact: {intervention.impactScore}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
