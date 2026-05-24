"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, TrendingUp, TrendingDown, Minus, Activity, Shield, School, Sparkles, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import { cn, getRiskColor } from "@/lib/utils";
import { districts } from "@/data/synthetic/districts";
import { interventions, aiRecommendations } from "@/data/synthetic/analytics";
import { schools } from "@/data/synthetic/schools";
import { StatusBadge, TrendIndicator } from "@/components/shared/status-badge";
import type { District } from "@/types";

/* ─────────────── Props ─────────────── */
interface DistrictDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  districtId: string | null;
}

/* ─────── helpers ─────── */
function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function generateSummary(d: District): string {
  const analysis =
    d.avgAttendance < 65
      ? "significant engagement challenges requiring immediate attention"
      : d.avgAttendance < 75
        ? "moderate engagement gaps that need monitoring"
        : "relatively stable engagement patterns";

  return `${d.name} is currently at ${d.riskLevel} risk (score: ${d.riskScore}/100) with ${d.riskTrend} trajectory. Attendance at ${d.avgAttendance}% and meal participation at ${d.mealParticipation}% indicate ${analysis}. 7-day projected risk: ${d.projectedRisk7d}/100.`;
}

function getTrendExplanation(d: District): string {
  switch (d.riskTrend) {
    case "worsening":
      return `Risk in ${d.name} is worsening. Multiple compounding factors — including a ${d.migrationImpact}% migration impact and ${d.seasonalInstability}% seasonal instability — are driving risk upward. Without intervention, the 30-day projection reaches ${d.projectedRisk30d}/100.`;
    case "improving":
      return `${d.name} shows an improving trend. Active interventions and community engagement are reducing risk. The 90-day projection of ${d.projectedRisk90d}/100 suggests sustained improvement if current efforts continue.`;
    case "stable":
      return `${d.name} is currently stable, but the risk score of ${d.riskScore}/100 remains elevated. Seasonal factors (${d.seasonalInstability}%) and migration pressure (${d.migrationImpact}%) require ongoing monitoring to prevent deterioration.`;
    default:
      return "Trend data is unavailable for this district.";
  }
}

const urgencyConfig: Record<string, { bg: string; text: string; label: string }> = {
  immediate: { bg: "bg-risk-critical/10 border-risk-critical/20", text: "text-risk-critical", label: "Immediate" },
  urgent:    { bg: "bg-risk-high/10 border-risk-high/20",         text: "text-risk-high",     label: "Urgent" },
  moderate:  { bg: "bg-risk-moderate/10 border-risk-moderate/20", text: "text-risk-moderate", label: "Moderate" },
  low:       { bg: "bg-risk-low/10 border-risk-low/20",           text: "text-risk-low",      label: "Low" },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "bg-risk-low/10 border-risk-low/20",           text: "text-risk-low",      label: "Active" },
  planned:   { bg: "bg-risk-moderate/10 border-risk-moderate/20", text: "text-risk-moderate", label: "Planned" },
  completed: { bg: "bg-asha-teal/10 border-asha-teal/20",         text: "text-asha-teal",     label: "Completed" },
  suspended: { bg: "bg-risk-critical/10 border-risk-critical/20", text: "text-risk-critical", label: "Suspended" },
};

/* ─────── Sub-components ─────── */

function ProgressBar({ value, color, className }: { value: number; color: string; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-asha-cream-dark overflow-hidden", className)}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${clamp(value, 0, 100)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg bg-asha-teal/10 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-asha-teal" />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-asha-ink-light">{title}</h3>
    </div>
  );
}

/* ═══════════════ Main Component ═══════════════ */

export function DistrictDetailDrawer({ isOpen, onClose, districtId }: DistrictDetailDrawerProps) {
  /* Escape key handler */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  /* Data look-ups */
  const district = districtId ? districts.find((d) => d.id === districtId) ?? null : null;
  const districtInterventions = districtId ? interventions.filter((i) => i.districtId === districtId) : [];
  const districtRecommendations = districtId ? aiRecommendations.filter((r) => r.districtId === districtId) : [];
  const districtSchools = districtId
    ? schools
        .filter((s) => s.districtId === districtId)
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 3)
    : [];

  /* Contributing factors */
  const factors = district
    ? [
        { label: "Attendance Impact", value: +(100 - district.avgAttendance).toFixed(1) },
        { label: "Meal Gap", value: +(100 - district.mealParticipation).toFixed(1) },
        { label: "Food Price Pressure", value: clamp(district.riskScore + 5, 0, 95) },
        { label: "Seasonal Instability", value: district.seasonalInstability },
        { label: "Migration Impact", value: district.migrationImpact },
      ]
    : [];

  const riskColor = district ? getRiskColor(district.riskLevel) : "#8E99A4";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-asha-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer Panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] bg-asha-cream shadow-2xl flex flex-col"
            role="dialog"
            aria-label={district ? `${district.name} district details` : "District details"}
          >
            {/* ── No district fallback ── */}
            {!district ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-sm text-asha-ink-light">District not found.</p>
              </div>
            ) : (
              <>
                {/* ══════ 1. Header ══════ */}
                <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-asha-cream-dark">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-asha-ink truncate">{district.name}</h2>
                      <p className="text-xs text-asha-ink-light mt-0.5">{district.state}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <StatusBadge level={district.riskLevel} size="md" />
                        <TrendIndicator trend={district.riskTrend} />
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-lg bg-asha-cream-dark/60 hover:bg-asha-cream-dark flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label="Close drawer"
                    >
                      <X className="w-4 h-4 text-asha-ink-light" />
                    </button>
                  </div>
                </div>

                {/* ── Scrollable content ── */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-thin">

                  {/* ══════ 2. AI Operational Summary ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={Brain} title="AI Operational Summary" />
                    <p className="text-[13px] leading-relaxed text-asha-ink">
                      {generateSummary(district)}
                    </p>
                  </div>

                  {/* ══════ 3. Contributing Factors ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={Activity} title="Contributing Factors" />
                    <div className="space-y-3">
                      {factors.map((f) => (
                        <div key={f.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-asha-ink-light">{f.label}</span>
                            <span className="text-xs font-semibold text-asha-ink">{f.value}%</span>
                          </div>
                          <ProgressBar
                            value={f.value}
                            color={f.value >= 60 ? getRiskColor("critical") : f.value >= 40 ? getRiskColor("high") : f.value >= 20 ? getRiskColor("moderate") : getRiskColor("low")}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ══════ 4. Trend Explanation ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading
                      icon={district.riskTrend === "worsening" ? TrendingDown : district.riskTrend === "improving" ? TrendingUp : Minus}
                      title="Trend Explanation"
                    />
                    <p className="text-[13px] leading-relaxed text-asha-ink">
                      {getTrendExplanation(district)}
                    </p>
                  </div>

                  {/* ══════ 5. Active Interventions ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={Shield} title="Active Interventions" />
                    {districtInterventions.length === 0 ? (
                      <p className="text-xs text-asha-ink-lighter italic">No active interventions for this district.</p>
                    ) : (
                      <div className="space-y-3">
                        {districtInterventions.map((intv) => {
                          const sc = statusConfig[intv.status] ?? statusConfig.active;
                          return (
                            <div key={intv.id} className="p-3 rounded-xl bg-asha-cream/60 border border-asha-cream-dark">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-semibold text-asha-ink leading-snug line-clamp-2">{intv.title}</h4>
                                <span className={cn("flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border", sc.bg, sc.text)}>
                                  {sc.label}
                                </span>
                              </div>
                              <p className="text-[11px] text-asha-ink-light mt-1 line-clamp-2">{intv.description}</p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-asha-ink-lighter">
                                <span>Beneficiaries: <strong className="text-asha-ink">{intv.beneficiaries.toLocaleString()}</strong></span>
                                {intv.impactScore != null && (
                                  <span>Impact: <strong className="text-asha-ink">{intv.impactScore}%</strong></span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* ══════ 6. AI Recommendations ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={Sparkles} title="AI Recommendations" />
                    {districtRecommendations.length === 0 ? (
                      <p className="text-xs text-asha-ink-lighter italic">No AI recommendations pending for this district.</p>
                    ) : (
                      <div className="space-y-3">
                        {districtRecommendations.map((rec) => {
                          const uc = urgencyConfig[rec.urgency] ?? urgencyConfig.moderate;
                          return (
                            <div key={rec.id} className="p-3 rounded-xl bg-asha-cream/60 border border-asha-cream-dark">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-semibold text-asha-ink leading-snug line-clamp-2">{rec.title}</h4>
                                <span className={cn("flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border", uc.bg, uc.text)}>
                                  {uc.label}
                                </span>
                              </div>
                              <p className="text-[11px] text-asha-ink-light mt-1 line-clamp-3">{rec.description}</p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-asha-ink-lighter">
                                <span>
                                  Confidence: <strong className="text-asha-ink">{(rec.confidence * 100).toFixed(0)}%</strong>
                                </span>
                                <span>
                                  Impact: <strong className="text-asha-ink">{rec.impactPrediction.childrenHelped.toLocaleString()} children</strong>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* ══════ 7. Schools At Risk ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={School} title="Schools At Risk" />
                    {districtSchools.length === 0 ? (
                      <p className="text-xs text-asha-ink-lighter italic">No schools found in this district.</p>
                    ) : (
                      <div className="space-y-2.5">
                        {districtSchools.map((s) => (
                          <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-asha-cream/60 border border-asha-cream-dark">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${getRiskColor(s.riskLevel)}14`, border: `1px solid ${getRiskColor(s.riskLevel)}25` }}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" style={{ color: getRiskColor(s.riskLevel) }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-asha-ink truncate">{s.name}</p>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-asha-ink-lighter">
                                <span>Risk: <strong style={{ color: getRiskColor(s.riskLevel) }}>{s.riskScore}</strong></span>
                                <span>Att: <strong className="text-asha-ink">{s.avgAttendance}%</strong></span>
                                <TrendIndicator trend={s.riskTrend} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ══════ 8. Confidence Score ══════ */}
                  <div className="warm-card p-4">
                    <SectionHeading icon={CheckCircle2} title="AI Confidence Score" />
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar value={89} color="#0d9488" />
                      </div>
                      <span className="text-sm font-bold text-asha-teal tabular-nums">0.89</span>
                    </div>
                    <p className="text-[11px] text-asha-ink-lighter mt-2">
                      Overall model confidence across all predictions and risk assessments for this district.
                    </p>
                  </div>

                  {/* Bottom spacer for mobile safe area */}
                  <div className="h-4" />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
