"use client";

import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number;
  size?: number;
}

export function RiskGauge({ score, size = 160 }: RiskGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 30) return "#4CAF7D";
    if (s < 50) return "#E4A853";
    if (s < 70) return "#E8846B";
    return "#D35449";
  };

  const getLabel = (s: number) => {
    if (s < 30) return "Low";
    if (s < 50) return "Moderate";
    if (s < 70) return "High";
    return "Critical";
  };

  const color = getColor(score);

  return (
    <div className="warm-card p-5 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-asha-ink mb-4">National Risk Index</h3>
      <div className="relative" style={{ width: size, height: size / 2 + 30 }}>
        <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
          {/* Background arc */}
          <path
            d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
            fill="none"
            stroke="rgba(44, 62, 80, 0.06)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.path
            d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            style={{ filter: `drop-shadow(0 0 6px ${color}30)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <motion.span
            className="text-3xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-asha-ink-lighter font-medium">{getLabel(score)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3 text-[11px] text-asha-ink-lighter">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-risk-low" />Low
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-risk-moderate" />Moderate
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-risk-high" />High
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-risk-critical" />Critical
        </div>
      </div>
    </div>
  );
}
