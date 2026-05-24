"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { RiskGauge } from "@/components/dashboard/risk-gauge";
import { AIInsightCard } from "@/components/dashboard/ai-insight-card";
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed";
import { DistrictDetailDrawer } from "@/components/dashboard/district-detail-drawer";
import { aiInsights, aiRecommendations, predictiveTimeline } from "@/data/synthetic/analytics";
import { Brain, Heart, AlertTriangle, Zap, TrendingUp, Clock, Shield } from "lucide-react";
import Link from "next/link";

const HungerTrendChart = dynamic(
  () => import("@/components/charts/hunger-trend-chart").then((m) => m.HungerTrendChart),
  { ssr: false, loading: () => <div className="warm-card h-[340px] shimmer" /> }
);

const FoodInflationChart = dynamic(
  () => import("@/components/charts/food-inflation-chart").then((m) => m.FoodInflationChart),
  { ssr: false, loading: () => <div className="warm-card h-[340px] shimmer" /> }
);

const RiskDistributionChart = dynamic(
  () => import("@/components/charts/risk-distribution-chart").then((m) => m.RiskDistributionChart),
  { ssr: false, loading: () => <div className="warm-card h-[340px] shimmer" /> }
);

const HungerHeatmap = dynamic(
  () => import("@/components/maps/hunger-heatmap").then((m) => m.HungerHeatmap),
  { ssr: false, loading: () => <div className="warm-card h-[350px] shimmer" /> }
);

export default function DashboardPage() {
  const [drawerDistrictId, setDrawerDistrictId] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* District Detail Drawer */}
      <DistrictDetailDrawer
        isOpen={drawerDistrictId !== null}
        onClose={() => setDrawerDistrictId(null)}
        districtId={drawerDistrictId}
      />
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
            National Intelligence Dashboard
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/15 rounded-full">
              <Heart className="w-3 h-3" /> LIVE
            </span>
          </h1>
          <p className="text-sm text-asha-ink-lighter mt-1">
            Real-time humanitarian intelligence across 8 districts • Last updated 5 min ago
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-medium rounded-xl bg-white border border-asha-glass-border text-asha-ink-light hover:bg-asha-cream-dark transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 text-xs font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" />
            Run AI Analysis
          </button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <StatsGrid />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap - spans 2 cols */}
        <div className="lg:col-span-2">
          <HungerHeatmap compact />
        </div>

        {/* Risk gauge + critical districts + activity feed */}
        <div className="space-y-4">
          <RiskGauge score={65.8} />
          {/* Critical districts */}
          <div className="warm-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-asha-coral" />
              <h3 className="text-sm font-semibold text-asha-ink">Critical Districts</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: "Shravasti", score: 82, trend: "↑", projected: 89 },
                { name: "Anantapur", score: 78, trend: "↑", projected: 84 },
                { name: "Koraput", score: 74, trend: "→", projected: 79 },
                { name: "Kalahandi", score: 72, trend: "→", projected: 81 },
              ].map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-asha-cream hover:bg-asha-cream-dark transition-colors cursor-pointer"
                >
                  <span className="text-xs font-medium text-asha-ink">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-risk-critical">{d.score}</span>
                    <span className="text-[10px] text-asha-ink-lighter">→{d.projected}</span>
                    <span className="text-[10px] text-risk-critical">{d.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations (V2) */}
      <div className="warm-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-asha-amber" />
            <h2 className="text-lg font-bold text-asha-ink">AI Intervention Recommendations</h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-asha-amber-muted text-asha-amber-dark border border-asha-amber/15 rounded-full">
              {aiRecommendations.length} active
            </span>
          </div>
          <Link href="/dashboard/interventions" className="text-xs font-medium text-asha-teal hover:text-asha-teal-dark transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendations.slice(0, 2).map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="p-4 rounded-xl bg-asha-cream border border-asha-glass-border hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  rec.urgency === "immediate" ? "bg-risk-critical/10 text-risk-critical border border-risk-critical/20" :
                  rec.urgency === "urgent" ? "bg-risk-high/10 text-risk-high border border-risk-high/20" :
                  "bg-risk-moderate/10 text-risk-moderate border border-risk-moderate/20"
                }`}>
                  {rec.urgency}
                </span>
                <span className="text-[11px] text-asha-ink-lighter">{rec.districtName}</span>
              </div>
              <h4 className="text-sm font-semibold text-asha-ink mb-1">{rec.title}</h4>
              <p className="text-xs text-asha-ink-light line-clamp-2 mb-3">{rec.description}</p>
              <div className="flex items-center gap-4 text-[11px] text-asha-ink-lighter">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {rec.impactPrediction.childrenHelped.toLocaleString()} children
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -{rec.impactPrediction.riskReduction}% risk
                </span>
                <span className="font-medium text-asha-teal">{(rec.confidence * 100).toFixed(0)}% conf.</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HungerTrendChart />
        <FoodInflationChart />
      </div>

      {/* Activity Feed + AI Insights + Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed (V2) */}
        <LiveActivityFeed />

        {/* AI Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-asha-violet" />
            <h2 className="text-sm font-bold text-asha-ink">AI Insights</h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-asha-violet-muted text-asha-violet border border-asha-violet/15 rounded-full">
              {aiInsights.length} active
            </span>
          </div>
          <div className="space-y-3">
            {aiInsights.slice(0, 4).map((insight, i) => (
              <AIInsightCard key={insight.id} insight={insight} index={i} />
            ))}
          </div>
        </div>

        {/* Risk distribution */}
        <div>
          <RiskDistributionChart />
        </div>
      </div>
    </div>
  );
}
