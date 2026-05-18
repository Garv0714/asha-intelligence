"use client";

import { motion } from "framer-motion";
import { cn, getRiskColor } from "@/lib/utils";
import { AIInsight } from "@/types";
import { AlertTriangle, TrendingUp, Lightbulb, Zap, Clock } from "lucide-react";

const typeIcons = {
  alert: AlertTriangle,
  prediction: TrendingUp,
  recommendation: Lightbulb,
  anomaly: Zap,
};

const typeLabels = {
  alert: "Alert",
  prediction: "Prediction",
  recommendation: "Recommendation",
  anomaly: "Anomaly",
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface AIInsightCardProps {
  insight: AIInsight;
  index: number;
}

export function AIInsightCard({ insight, index }: AIInsightCardProps) {
  const Icon = typeIcons[insight.type];
  const color = getRiskColor(insight.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="warm-card p-4 hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}12`, border: `1px solid ${color}20` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color }}
            >
              {typeLabels[insight.type]}
            </span>
            <span className="text-[10px] text-asha-ink-lighter flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(insight.timestamp)}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-asha-ink mb-1 line-clamp-1">
            {insight.title}
          </h4>
          <p className="text-xs text-asha-ink-light line-clamp-2 leading-relaxed">
            {insight.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-[10px] text-asha-ink-lighter">
              <span>Confidence:</span>
              <span className="font-semibold text-asha-ink">{(insight.confidence * 100).toFixed(0)}%</span>
            </div>
            <div className="flex-1 h-1 bg-asha-cream-dark rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${insight.confidence * 100}%`, backgroundColor: color }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
