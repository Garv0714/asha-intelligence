"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { schools } from "@/data/synthetic/schools";
import { StatusBadge, TrendIndicator } from "@/components/shared/status-badge";
import { getRiskColor } from "@/lib/utils";
import { School, Search, Users } from "lucide-react";

export default function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const filtered = schools
    .filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.districtName.toLowerCase().includes(search.toLowerCase())) return false;
      if (riskFilter !== "all" && s.riskLevel !== riskFilter) return false;
      return true;
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <School className="w-6 h-6 text-asha-teal" />
          School Intelligence
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          {schools.length} schools monitored across {new Set(schools.map((s) => s.districtId)).size} districts
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-asha-glass-border bg-white flex-1 max-w-md">
          <Search className="w-4 h-4 text-asha-ink-lighter" />
          <input
            placeholder="Search schools or districts..."
            className="bg-transparent text-sm text-asha-ink placeholder:text-asha-ink-lighter outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "critical", "high", "moderate", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all capitalize ${
                riskFilter === level
                  ? "bg-asha-teal-muted border-asha-teal/15 text-asha-teal-dark"
                  : "bg-white border-asha-glass-border text-asha-ink-lighter hover:text-asha-ink"
              }`}
            >
              {level === "all" ? "All" : level}
            </button>
          ))}
        </div>
      </div>

      {/* School table */}
      <div className="warm-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-asha-glass-border">
                <th className="text-left text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3">School</th>
                <th className="text-left text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3 hidden md:table-cell">District</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3">Students</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3">Attendance</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Meals</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3">Risk</th>
                <th className="text-center text-[11px] font-semibold text-asha-ink-lighter uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((school, i) => (
                <motion.tr
                  key={school.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-asha-glass-border/50 hover:bg-asha-cream/60 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-asha-ink truncate max-w-[250px]">{school.name}</p>
                      <p className="text-[11px] text-asha-ink-lighter capitalize md:hidden">{school.districtName} • {school.type}</p>
                      <p className="text-[11px] text-asha-ink-lighter capitalize hidden md:block">{school.type}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-xs text-asha-ink-light">{school.districtName}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-medium text-asha-ink">{school.totalStudents}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-sm font-medium ${school.avgAttendance < 65 ? "text-risk-critical" : school.avgAttendance < 75 ? "text-risk-moderate" : "text-risk-low"}`}>
                      {school.avgAttendance}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center hidden sm:table-cell">
                    <span className={`text-sm font-medium ${school.mealParticipation < 55 ? "text-risk-critical" : school.mealParticipation < 70 ? "text-risk-moderate" : "text-risk-low"}`}>
                      {school.mealParticipation}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <StatusBadge level={school.riskLevel} />
                      <span className="text-xs font-bold" style={{ color: getRiskColor(school.riskLevel) }}>
                        {school.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center hidden lg:table-cell">
                    <TrendIndicator trend={school.riskTrend} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-asha-ink-lighter text-sm">No schools match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
