"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiReports } from "@/data/synthetic/analytics";
import { useToast } from "@/components/shared/toast-provider";
import Link from "next/link";
import { FileText, Brain, Clock, ChevronRight, Heart, Loader2, CheckCircle2, Sparkles } from "lucide-react";

const typeColors: Record<string, string> = {
  district_summary: "#2A9D8F",
  trend_analysis: "#8B7EC8",
  school_assessment: "#E4A853",
  intervention_impact: "#4CAF7D",
  monthly_digest: "#5BA4CF",
};

const typeLabels: Record<string, string> = {
  district_summary: "District Summary",
  trend_analysis: "Trend Analysis",
  school_assessment: "School Assessment",
  intervention_impact: "Intervention Impact",
  monthly_digest: "Monthly Digest",
};

/* ─── Generated report templates ─── */
const GENERATED_TEMPLATES = [
  {
    title: "Automated Cross-District Risk Correlation Report",
    type: "trend_analysis" as const,
    summary: "AI-generated analysis of risk correlation patterns across all 8 monitored districts, identifying synchronized risk factors and intervention opportunities.",
    keyFindings: [
      "Eastern districts show 73% risk factor correlation with food price indices",
      "Seasonal attendance drops precede meal participation declines by 2.3 weeks on average",
      "Districts with active interventions show 31% faster risk stabilization",
    ],
    recommendations: [
      "Implement synchronized intervention timing across correlated district clusters",
      "Pre-position food reserves 3 weeks before predicted seasonal risk peaks",
    ],
    content: "Automated cross-district risk correlation analysis...",
  },
  {
    title: "Weekly School Nutrition Assessment — Priority Districts",
    type: "school_assessment" as const,
    summary: "Automated assessment of school-level nutrition indicators across priority districts, focusing on attendance-meal gap analysis and intervention readiness.",
    keyFindings: [
      "14 schools in critical districts show attendance below 55% this week",
      "Meal quality scores have improved 8% in schools with active Akshaya Patra partnerships",
      "3 schools in Shravasti flagged for immediate nutritional intervention",
    ],
    recommendations: [
      "Prioritize mobile kitchen deployment to flagged schools within 48 hours",
      "Scale Akshaya Patra partnership model to 6 additional underperforming schools",
    ],
    content: "Weekly school nutrition assessment for priority districts...",
  },
  {
    title: "Intervention Impact Evaluation — May 2026",
    type: "intervention_impact" as const,
    summary: "Impact analysis of all active interventions across monitored districts, measuring effectiveness against predicted outcomes and resource efficiency.",
    keyFindings: [
      "Active interventions have reached 28,400 children across 5 districts",
      "Average risk reduction of 12.3 points in districts with sustained intervention presence",
      "Community kitchen programs show highest cost-effectiveness ratio (₹8.50/child/day)",
    ],
    recommendations: [
      "Increase community kitchen program allocation by 40% in Q3 budget planning",
      "Phase out underperforming mobile monitoring units in Jaisalmer (low utilization)",
    ],
    content: "Intervention impact evaluation for May 2026...",
  },
];

/* ─── Processing stages ─── */
const GEN_STAGES = [
  "Collecting latest district data…",
  "Running predictive models…",
  "Analyzing intervention outcomes…",
  "Generating intelligence summary…",
  "Formatting report…",
] as const;

/* ─── Report type for dynamic reports ─── */
interface DynamicReport {
  id: string;
  title: string;
  type: string;
  summary: string;
  confidence: number;
  generatedAt: string;
  keyFindings: string[];
  recommendations: string[];
  content: string;
  districtId?: string;
  districtName?: string;
  isNew?: boolean;
}

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [genStage, setGenStage] = useState(0);
  const [genProgress, setGenProgress] = useState(0);
  const [dynamicReports, setDynamicReports] = useState<DynamicReport[]>([]);
  const { showToast } = useToast();

  const handleGenerate = useCallback(() => {
    if (generating) return;
    setGenerating(true);
    setGenStage(0);
    setGenProgress(0);

    const totalDuration = 3500;
    const stageInterval = totalDuration / GEN_STAGES.length;
    const progressInterval = 40;
    const progressIncrement = 100 / (totalDuration / progressInterval);

    const pTimer = setInterval(() => {
      setGenProgress((p) => Math.min(100, p + progressIncrement));
    }, progressInterval);

    const sTimer = setInterval(() => {
      setGenStage((s) => Math.min(GEN_STAGES.length - 1, s + 1));
    }, stageInterval);

    setTimeout(() => {
      clearInterval(pTimer);
      clearInterval(sTimer);
      setGenProgress(100);

      setTimeout(() => {
        // Pick a random template
        const tpl = GENERATED_TEMPLATES[Math.floor(Math.random() * GENERATED_TEMPLATES.length)];
        const newReport: DynamicReport = {
          id: `gen-${Date.now()}`,
          ...tpl,
          confidence: 0.85 + Math.random() * 0.1,
          generatedAt: new Date().toISOString(),
          isNew: true,
        };

        setDynamicReports((prev) => [newReport, ...prev]);
        setGenerating(false);
        showToast("New intelligence report generated successfully", "success");
      }, 400);
    }, totalDuration);
  }, [generating, showToast]);

  // Merge dynamic + static reports
  const allReports = [...dynamicReports, ...aiReports];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <FileText className="w-6 h-6 text-asha-violet" />
          AI-Generated Reports
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          Automated nutrition intelligence reports powered by Asha AI
        </p>
      </motion.div>

      {/* Generate new report card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="warm-card p-6 border border-asha-teal/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-asha-teal to-asha-emerald flex items-center justify-center">
              {generating ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <Heart className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold text-asha-ink">
                {generating ? "Generating Report…" : "Generate New Report"}
              </h3>
              <p className="text-xs text-asha-ink-lighter">
                {generating ? GEN_STAGES[genStage] : "AI will analyze the latest data and generate actionable insights"}
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {Math.round(genProgress)}%
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Generate Report
              </>
            )}
          </button>
        </div>

        {/* Progress bar — visible during generation */}
        <AnimatePresence>
          {generating && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
            >
              <div className="h-1.5 bg-asha-cream-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-asha-teal to-asha-emerald"
                  animate={{ width: `${genProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {GEN_STAGES.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1">
                    {i < genStage ? (
                      <CheckCircle2 className="w-2.5 h-2.5 text-asha-emerald" />
                    ) : i === genStage ? (
                      <Loader2 className="w-2.5 h-2.5 text-asha-teal animate-spin" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-asha-cream-dark" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Report list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {allReports.map((report, i) => (
            <motion.div
              key={report.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: "isNew" in report && report.isNew ? 0 : 0.2 + i * 0.05 }}
            >
              <Link href={`/dashboard/reports/${report.id}`}>
                <div className={`warm-card p-5 hover:shadow-card-hover transition-all duration-300 group cursor-pointer ${
                  "isNew" in report && report.isNew ? "ring-2 ring-asha-teal/20" : ""
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                          style={{ backgroundColor: `${typeColors[report.type]}12`, color: typeColors[report.type], border: `1px solid ${typeColors[report.type]}20` }}
                        >
                          {typeLabels[report.type]}
                        </span>
                        <span className="text-[11px] text-asha-ink-lighter flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(report.generatedAt).toISOString().split("T")[0]}
                        </span>
                        {"isNew" in report && report.isNew && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/15 rounded-full">
                            <Sparkles className="w-2.5 h-2.5" /> New
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-asha-ink group-hover:text-asha-teal transition-colors mb-1">
                        {report.title}
                      </h3>
                      <p className="text-sm text-asha-ink-light line-clamp-2">{report.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {report.keyFindings.slice(0, 3).map((finding: string, fi: number) => (
                          <span key={fi} className="px-2 py-0.5 text-[10px] text-asha-ink-lighter bg-asha-cream rounded-full border border-asha-glass-border">
                            {finding.length > 60 ? finding.substring(0, 60) + "..." : finding}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-xs text-asha-ink-lighter">Confidence</p>
                        <p className="text-lg font-bold text-asha-teal">{(report.confidence * 100).toFixed(0)}%</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-asha-ink-lighter group-hover:text-asha-teal group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
