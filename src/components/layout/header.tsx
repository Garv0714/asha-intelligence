"use client";

import { Bell, Search, Heart, Menu, X, Presentation } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const mobileNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/analytics/hunger-map", label: "Risk Map", icon: "🗺️" },
  { href: "/dashboard/schools", label: "Schools", icon: "🏫" },
  { href: "/dashboard/districts", label: "Districts", icon: "📍" },
  { href: "/dashboard/reports", label: "Reports", icon: "📄" },
  { href: "/dashboard/interventions", label: "Actions", icon: "🤝" },
  { href: "/dashboard/severity", label: "Severity", icon: "🛡️" },
  { href: "/dashboard/simulator", label: "Simulator", icon: "⚡" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-asha-glass-border bg-white/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-asha-ink-light hover:text-asha-ink transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile logo */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-asha-teal to-asha-emerald flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm gradient-text">Asha</span>
          </div>

          {/* Search bar */}
          <div className={cn(
            "hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 w-80",
            searchFocused
              ? "border-asha-teal/30 bg-asha-teal-muted"
              : "border-asha-glass-border bg-asha-cream"
          )}>
            <Search className="w-4 h-4 text-asha-ink-lighter" />
            <input
              placeholder="Search schools, districts, reports..."
              className="bg-transparent text-sm text-asha-ink placeholder:text-asha-ink-lighter outline-none w-full"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] text-asha-ink-lighter bg-white rounded border border-asha-glass-border">
              ⌘K
            </kbd>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* AI Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-asha-teal-muted border border-asha-teal/15">
              <span className="w-2 h-2 rounded-full bg-asha-teal animate-pulse" />
              <span className="text-xs font-medium text-asha-teal-dark">AI Active</span>
            </div>

            {/* Presentation mode link */}
            <Link
              href="/dashboard/presentation"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-asha-violet-muted border border-asha-violet/15 text-xs font-medium text-asha-violet-dark hover:bg-asha-violet/10 transition-colors"
            >
              <Presentation className="w-3.5 h-3.5" />
              Present
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-asha-ink-lighter hover:text-asha-ink transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-asha-coral" />
            </button>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-asha-teal to-asha-sky flex items-center justify-center">
              <span className="text-xs font-bold text-white">DA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-16 z-50 bg-white/95 backdrop-blur-xl border-b border-asha-glass-border p-4"
          >
            <div className="grid grid-cols-4 gap-3">
              {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all",
                      isActive
                        ? "bg-asha-teal-muted border border-asha-teal/15"
                        : "bg-asha-cream border border-asha-glass-border hover:bg-asha-cream-dark"
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className={cn(
                      "text-[11px] font-medium",
                      isActive ? "text-asha-teal-dark" : "text-asha-ink-light"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
