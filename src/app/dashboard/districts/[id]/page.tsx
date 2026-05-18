"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { districts } from "@/data/synthetic/districts";
import { schools } from "@/data/synthetic/schools";
import { interventions as allInterventions, aiReports } from "@/data/synthetic/analytics";
import { StatusBadge, TrendIndicator } from "@/components/shared/status-badge";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { getRiskColor } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft, MapPin, Users, School, Utensils, AlertTriangle,
  Brain, FileText, TrendingUp, Activity,
} from "lucide-react";

const HungerTrendChart = dynamic(
  () => import("@/components/charts/hunger-trend-chart").then((m) => m.HungerTrendChart),
  { ssr: false, loading: () => <div className="warm-card h-[340px] shimmer" /> }
);

export default function DistrictDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const district = districts.find((d) => d.id === id);
  const districtSchools = schools.filter((s) => s.districtId === id);
  const districtInterventions = allInterventions.filter((i) => i.districtId === id);
  const districtReports = aiReports.filter((r) => r.districtId === id);

  if (!district) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-asha-ink-lighter">District not found</p>
      </div>
    );
  }

  const riskFactors = [
    { name: "Attendance Decline", weight: 30, value: Math.round(100 - district.avgAttendance), contribution: 0 },
    { name: "Meal Participation Drop", weight: 25, value: Math.round(100 - district.mealParticipation), contribution: 0 },
    { name: "Food Price Inflation", weight: 20, value: Math.min(85, district.riskScore + 5), contribution: 0 },
    { name: "Seasonal Risk", weight: 10, value: Math.min(90, district.riskScore - 5), contribution: 0 },
    { name: "Historical Pattern", weight: 15, value: Math.min(80, district.riskScore - 10), contribution: 0 },
  ].map((f) => ({ ...f, contribution: Math.round((f.weight / 100) * f.value) }));

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/dashboard/districts" className="inline-flex items-center gap-1.5 text-xs text-asha-ink-lighter hover:text-asha-teal transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Districts
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-asha-ink">{district.name}</h1>
              <StatusBadge level={district.riskLevel} size="md" />
            </div>
            <p className="text-sm text-asha-ink-lighter mt-1">{district.state} • Population: {district.population.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendIndicator trend={district.riskTrend} />
          </div>
        </div>
      </motion.div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Risk Score", value: district.riskScore, suffix: "/100", icon: AlertTriangle, color: getRiskColor(district.riskLevel) },
          { label: "Schools", value: district.totalSchools, icon: School, color: "#2A9D8F" },
          { label: "Students", value: district.totalStudents, icon: Users, color: "#8B7EC8" },
          { label: "Attendance", value: district.avgAttendance, suffix: "%", icon: Activity, color: "#5BA4CF" },
          { label: "Meal Rate", value: district.mealParticipation, suffix: "%", icon: Utensils, color: "#E4A853" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: `${s.color}12` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div className="text-xl font-bold text-asha-ink">
              <AnimatedCounter value={s.value} suffix={s.suffix} duration={1.5} />
            </div>
            <p className="text-[11px] text-asha-ink-lighter mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Risk breakdown + schools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk factor breakdown */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="warm-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-asha-teal" />
            <h3 className="text-sm font-semibold text-asha-ink">AI Risk Factor Breakdown</h3>
          </div>
          <div className="space-y-4">
            {riskFactors.map((factor, i) => (
              <div key={factor.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-asha-ink-light">{factor.name} <span className="text-asha-ink-lighter">({factor.weight}%)</span></span>
                  <span className="font-bold text-asha-ink">{factor.value}/100</span>
                </div>
                <div className="h-2 bg-asha-cream-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: factor.value > 70 ? "#D35449" : factor.value > 50 ? "#E4A853" : "#4CAF7D" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-asha-glass-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-asha-ink">Composite Score</span>
              <span className="text-lg font-bold" style={{ color: getRiskColor(district.riskLevel) }}>
                {district.riskScore}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Schools in district */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 warm-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-asha-teal" />
              <h3 className="text-sm font-semibold text-asha-ink">Schools in {district.name}</h3>
            </div>
            <span className="text-xs text-asha-ink-lighter">{districtSchools.length} monitored</span>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
            {districtSchools.sort((a, b) => b.riskScore - a.riskScore).map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-asha-cream hover:bg-asha-cream-dark transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-asha-ink truncate">{school.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-asha-ink-lighter">
                    <span>{school.totalStudents} students</span>
                    <span>Attendance: {school.avgAttendance}%</span>
                    <span>Meals: {school.mealParticipation}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <StatusBadge level={school.riskLevel} />
                  <span className="text-sm font-bold" style={{ color: getRiskColor(school.riskLevel) }}>
                    {school.riskScore}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trend chart */}
      <HungerTrendChart />

      {/* Interventions */}
      {districtInterventions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="warm-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-asha-emerald" />
            <h3 className="text-sm font-semibold text-asha-ink">Active Interventions</h3>
          </div>
          <div className="space-y-3">
            {districtInterventions.map((intervention) => (
              <div key={intervention.id} className="flex items-start gap-3 p-3 rounded-xl bg-asha-cream">
                <div className="w-2 h-2 rounded-full mt-1.5 bg-asha-emerald flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-asha-ink">{intervention.title}</h4>
                  <p className="text-xs text-asha-ink-light mt-0.5">{intervention.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-asha-ink-lighter">
                    <span className="capitalize px-2 py-0.5 rounded-full bg-asha-emerald-muted text-asha-emerald-dark border border-asha-emerald/15">{intervention.status}</span>
                    <span>{intervention.beneficiaries.toLocaleString()} beneficiaries</span>
                    {intervention.impactScore && <span>Impact: {intervention.impactScore}%</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Reports for district */}
      {districtReports.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-asha-violet" />
            <h3 className="text-lg font-bold text-asha-ink">AI-Generated Reports</h3>
          </div>
          {districtReports.map((report) => (
            <Link key={report.id} href={`/dashboard/reports/${report.id}`}>
              <div className="warm-card p-5 hover:shadow-card-hover transition-all group cursor-pointer">
                <h4 className="text-base font-semibold text-asha-ink group-hover:text-asha-teal transition-colors">{report.title}</h4>
                <p className="text-sm text-asha-ink-light mt-1">{report.summary}</p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-asha-ink-lighter">
                  <span>Confidence: {(report.confidence * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>{new Date(report.generatedAt).toISOString().split("T")[0]}</span>
                  <span>•</span>
                  <span>{report.keyFindings.length} key findings</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
