"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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

export default function TrendsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-asha-teal" />
          Predictive Analytics
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          12-month trend analysis and AI-driven forecasts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HungerTrendChart />
        <FoodInflationChart />
      </div>

      <RiskDistributionChart />
    </div>
  );
}
