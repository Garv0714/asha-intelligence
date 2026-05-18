"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <Settings className="w-6 h-6 text-asha-teal" />
          Settings
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">Configure your Asha Intelligence experience</p>
      </motion.div>

      {[
        { icon: Bell, title: "Notifications", desc: "Configure alert thresholds and notification channels" },
        { icon: Shield, title: "Security", desc: "Manage authentication and access controls" },
        { icon: Database, title: "Data Sources", desc: "Connect school management systems and data feeds" },
        { icon: Palette, title: "Display", desc: "Customize dashboard layout and visualization preferences" },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="warm-card p-5 hover:shadow-card-hover transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-asha-teal-muted flex items-center justify-center">
              <item.icon className="w-5 h-5 text-asha-teal" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-asha-ink">{item.title}</h3>
              <p className="text-xs text-asha-ink-lighter">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
