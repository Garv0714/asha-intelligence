"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { School, Users, AlertTriangle, Brain, Utensils, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  color: string;
}

const stats: StatItem[] = [
  {
    label: "Schools Monitored", value: 50, icon: School,
    trend: { value: 12, isPositive: true },
    color: "#2A9D8F",
  },
  {
    label: "Children at Risk", value: 24180, icon: AlertTriangle,
    trend: { value: 8.3, isPositive: false },
    color: "#D35449",
  },
  {
    label: "Meals Served Today", value: 41200, icon: Utensils,
    trend: { value: 5.2, isPositive: true },
    color: "#4CAF7D",
  },
  {
    label: "AI Predictions", value: 342, icon: Brain,
    trend: { value: 23, isPositive: true },
    color: "#8B7EC8",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="stat-card group"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${stat.color}12`, border: `1px solid ${stat.color}20` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            {stat.trend && (
              <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend.isPositive ? "text-risk-low" : "text-risk-critical"}`}>
                <TrendingUp className={`w-3 h-3 ${!stat.trend.isPositive ? "rotate-180" : ""}`} />
                {stat.trend.value}%
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-asha-ink mb-1">
            <AnimatedCounter value={stat.value} duration={1.5 + i * 0.3} />
          </div>
          <p className="text-xs text-asha-ink-lighter">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
