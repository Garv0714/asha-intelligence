import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatPercent(num: number): string {
  return num.toFixed(1) + "%";
}

export function getRiskColor(level: string): string {
  switch (level.toLowerCase()) {
    case "low": return "#4CAF7D";
    case "moderate": return "#E4A853";
    case "high": return "#E8846B";
    case "critical": return "#D35449";
    default: return "#8E99A4";
  }
}

export function getRiskBgClass(level: string): string {
  switch (level.toLowerCase()) {
    case "low": return "risk-low";
    case "moderate": return "risk-moderate";
    case "high": return "risk-high";
    case "critical": return "risk-critical";
    default: return "";
  }
}

export function getUrgencyLabel(score: number): string {
  if (score >= 80) return "Immediate";
  if (score >= 60) return "Urgent";
  if (score >= 40) return "Moderate";
  return "Low";
}

export function getUrgencyColor(score: number): string {
  if (score >= 80) return "#D35449";
  if (score >= 60) return "#E8846B";
  if (score >= 40) return "#E4A853";
  return "#4CAF7D";
}
