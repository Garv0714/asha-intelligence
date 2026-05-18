"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const HungerHeatmap = dynamic(
  () => import("@/components/maps/hunger-heatmap").then((m) => m.HungerHeatmap),
  { ssr: false, loading: () => <div className="warm-card h-[600px] shimmer" /> }
);

export default function HungerMapPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <MapPin className="w-6 h-6 text-asha-coral" />
          Hunger Risk Intelligence Map
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">
          Interactive geospatial visualization of district and school-level nutritional risk zones
        </p>
      </motion.div>

      <HungerHeatmap compact={false} />
    </div>
  );
}
