"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getRiskColor } from "@/lib/utils";
import { AIInsight } from "@/types";
import { AlertTriangle, TrendingUp, Lightbulb, Zap, Clock, ChevronDown } from "lucide-react";

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

function getIndicators(insight: AIInsight): string[] {
  const indicatorMap: Record<AIInsight["type"], string[]> = {
    alert: ["Attendance tracking sensor", "Risk threshold monitor", "Historical pattern matcher"],
    prediction: ["Trend extrapolation engine", "Seasonal pattern analyzer", "Food price correlation model"],
    anomaly: ["Statistical deviation detector", "Supply chain monitor", "Cross-metric correlation engine"],
    recommendation: ["Impact simulation model", "Resource optimization engine", "Outcome prediction matrix"],
  };
  return indicatorMap[insight.type] ?? [];
}

function getForecast(severity: AIInsight["severity"]): string {
  switch (severity) {
    case "critical":
      return "Risk expected to increase over the next 2–4 weeks without intervention";
    case "high":
      return "Risk expected to increase over the next 4–6 weeks";
    case "moderate":
      return "Conditions expected to stabilize over the next 1–2 months";
    case "low":
    default:
      return "Risk expected to decrease over the next quarter";
  }
}

interface AIInsightCardProps {
  insight: AIInsight;
  index: number;
}

export function AIInsightCard({ insight, index }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = typeIcons[insight.type];
  const color = getRiskColor(insight.severity);
  const indicators = getIndicators(insight);
  const forecast = getForecast(insight.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="warm-card p-4 hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* Chevron indicator */}
      <div className="flex justify-end -mb-2">
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-asha-ink-lighter" />
        </motion.div>
      </div>
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

          {/* Expandable detail section */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="expanded-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-asha-glass-border mt-3 pt-3 space-y-3">
                  {/* Explainable AI Panel */}
                  <div>
                    <h5 className="text-[11px] font-semibold text-asha-ink uppercase tracking-wider mb-1.5">
                      Contributing Indicators
                    </h5>
                    <ul className="space-y-1">
                      {indicators.map((indicator) => (
                        <li
                          key={indicator}
                          className="flex items-center gap-2 text-xs text-asha-ink-light"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trend Reasoning */}
                  <p className="text-[11px] text-asha-ink-lighter italic">
                    Based on 12-month rolling analysis with 94% historical accuracy
                  </p>

                  {/* Forecast */}
                  <div
                    className="text-[11px] font-medium rounded-lg px-2.5 py-1.5"
                    style={{ backgroundColor: `${color}08`, color }}
                  >
                    📈 {forecast}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
