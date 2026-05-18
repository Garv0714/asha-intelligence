"use client";

import { cn } from "@/lib/utils";
import { RiskLevel } from "@/types";

const riskConfig: Record<RiskLevel, { label: string; dotClass: string; bgClass: string; textClass: string }> = {
  low: { label: "Low Risk", dotClass: "bg-risk-low", bgClass: "bg-risk-low/10 border-risk-low/20", textClass: "text-risk-low" },
  moderate: { label: "Moderate", dotClass: "bg-risk-moderate", bgClass: "bg-risk-moderate/10 border-risk-moderate/20", textClass: "text-risk-moderate" },
  high: { label: "High Risk", dotClass: "bg-risk-high", bgClass: "bg-risk-high/10 border-risk-high/20", textClass: "text-risk-high" },
  critical: { label: "Critical", dotClass: "bg-risk-critical", bgClass: "bg-risk-critical/10 border-risk-critical/20", textClass: "text-risk-critical" },
};

interface StatusBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md";
  showDot?: boolean;
}

export function StatusBadge({ level, size = "sm", showDot = true }: StatusBadgeProps) {
  const config = riskConfig[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        config.bgClass,
        config.textClass,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
      )}
    >
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} />}
      {config.label}
    </span>
  );
}

interface TrendIndicatorProps {
  trend: "improving" | "stable" | "worsening";
}

export function TrendIndicator({ trend }: TrendIndicatorProps) {
  const config = {
    improving: { icon: "↑", text: "Improving", className: "text-risk-low" },
    stable: { icon: "→", text: "Stable", className: "text-risk-moderate" },
    worsening: { icon: "↓", text: "Worsening", className: "text-risk-critical" },
  };
  const c = config[trend];
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", c.className)}>
      <span>{c.icon}</span> {c.text}
    </span>
  );
}
