"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  School,
  MapPin,
  BarChart3,
  Brain,
  FileText,
  HandHeart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  TrendingUp,
  Shield,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics/hunger-map", label: "Risk Map", icon: MapPin },
  { href: "/dashboard/schools", label: "Schools", icon: School },
  { href: "/dashboard/districts", label: "Districts", icon: BarChart3 },
  { href: "/dashboard/analytics/trends", label: "Trends", icon: TrendingUp },
  { href: "/dashboard/reports", label: "AI Reports", icon: FileText },
  { href: "/dashboard/interventions", label: "Interventions", icon: HandHeart },
  { href: "/dashboard/severity", label: "Severity", icon: Shield },
  { href: "/dashboard/simulator", label: "Simulator", icon: Layers },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 border-r border-asha-glass-border bg-white transition-all duration-300 z-40",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-asha-glass-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-asha-teal to-asha-emerald shadow-glow-teal flex-shrink-0">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-lg font-bold tracking-tight gradient-text">
                Asha
              </span>
              <span className="text-[10px] font-medium text-asha-ink-lighter ml-1.5 tracking-wider uppercase">
                Intelligence
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/15"
                  : "text-asha-ink-light hover:text-asha-ink hover:bg-asha-cream-dark"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-asha-teal" : "text-asha-ink-lighter group-hover:text-asha-ink-light"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !collapsed && (
                <motion.div
                  layoutId="active-nav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-asha-teal"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Status */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-r from-asha-teal-muted to-asha-emerald-muted border border-asha-teal/10">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-asha-teal" />
            <span className="text-xs font-semibold text-asha-teal-dark">AI Engine Active</span>
          </div>
          <p className="text-[11px] text-asha-ink-lighter">342 predictions • 89% accuracy</p>
          <div className="mt-2 h-1.5 bg-asha-teal/10 rounded-full overflow-hidden">
            <div className="h-full w-[89%] bg-gradient-to-r from-asha-teal to-asha-emerald rounded-full" />
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-asha-glass-border text-asha-ink-lighter hover:text-asha-ink transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
