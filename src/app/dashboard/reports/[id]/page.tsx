"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { aiReports } from "@/data/synthetic/analytics";
import Link from "next/link";
import { ArrowLeft, FileText, Brain, Clock, CheckCircle, AlertTriangle, Download } from "lucide-react";

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const report = aiReports.find((r) => r.id === id);

  if (!report) {
    return (<div className="flex items-center justify-center h-[60vh]"><p className="text-asha-ink-lighter">Report not found</p></div>);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/dashboard/reports" className="inline-flex items-center gap-1.5 text-xs text-asha-ink-lighter hover:text-asha-teal transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />Back to Reports
        </Link>
        <h1 className="text-2xl font-bold text-asha-ink">{report.title}</h1>
        <div className="flex items-center gap-3 mt-2 text-xs text-asha-ink-lighter">
          <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5 text-asha-teal" />AI Generated</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(report.generatedAt).toISOString().split("T")[0]}</span>
          <span>Confidence: <span className="font-bold text-asha-teal">{(report.confidence * 100).toFixed(0)}%</span></span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="warm-card p-6 border border-asha-teal/10">
        <h3 className="text-sm font-semibold text-asha-teal mb-2">Executive Summary</h3>
        <p className="text-sm text-asha-ink leading-relaxed">{report.summary}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="warm-card p-6">
        <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5 text-asha-amber" /><h3 className="text-sm font-semibold text-asha-ink">Key Findings</h3></div>
        <div className="space-y-3">
          {report.keyFindings.map((finding, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-asha-cream">
              <div className="w-6 h-6 rounded-full bg-asha-amber-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-asha-amber-dark">{i + 1}</span>
              </div>
              <p className="text-sm text-asha-ink leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="warm-card p-6">
        <div className="flex items-center gap-2 mb-4"><CheckCircle className="w-5 h-5 text-asha-emerald" /><h3 className="text-sm font-semibold text-asha-ink">Recommended Actions</h3></div>
        <div className="space-y-3">
          {report.recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-asha-cream">
              <CheckCircle className="w-4 h-4 text-asha-emerald flex-shrink-0 mt-0.5" />
              <p className="text-sm text-asha-ink leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {report.content && report.content.length > 100 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="warm-card p-6">
          <div className="flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-asha-violet" /><h3 className="text-sm font-semibold text-asha-ink">Full Analysis</h3></div>
          <div className="prose prose-sm max-w-none text-asha-ink">
            {report.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-asha-ink mt-6 mb-3">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold text-asha-ink mt-4 mb-2">{line.replace("### ", "")}</h3>;
              if (line.startsWith("| ")) return <p key={i} className="text-xs text-asha-ink-light font-mono">{line}</p>;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-sm text-asha-ink leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
