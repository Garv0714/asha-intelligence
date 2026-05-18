"use client";

import { motion } from "framer-motion";
import { aiReports } from "@/data/synthetic/analytics";
import Link from "next/link";
import { FileText, Brain, Clock, ChevronRight, Heart } from "lucide-react";

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

export default function ReportsPage() {
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
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-asha-ink">Generate New Report</h3>
              <p className="text-xs text-asha-ink-lighter">AI will analyze the latest data and generate actionable insights</p>
            </div>
          </div>
          <button className="px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </motion.div>

      {/* Report list */}
      <div className="space-y-4">
        {aiReports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Link href={`/dashboard/reports/${report.id}`}>
              <div className="warm-card p-5 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
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
                    </div>
                    <h3 className="text-base font-semibold text-asha-ink group-hover:text-asha-teal transition-colors mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-asha-ink-light line-clamp-2">{report.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {report.keyFindings.slice(0, 3).map((finding, fi) => (
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
      </div>
    </div>
  );
}
