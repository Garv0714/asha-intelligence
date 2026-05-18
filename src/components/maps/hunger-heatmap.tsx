"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { districts } from "@/data/synthetic/districts";
import { schools } from "@/data/synthetic/schools";
import { getRiskColor } from "@/lib/utils";
import { StatusBadge, TrendIndicator } from "@/components/shared/status-badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Utensils, AlertTriangle } from "lucide-react";
import type { District } from "@/types";

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface HungerHeatmapProps {
  compact?: boolean;
  onDistrictSelect?: (district: District) => void;
}

export function HungerHeatmap({ compact = false, onDistrictSelect }: HungerHeatmapProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  useEffect(() => {
    setMounted(true);
    // Import leaflet CSS
    import("leaflet/dist/leaflet.css");
  }, []);

  if (!mounted) {
    return (
      <div className={`warm-card ${compact ? "h-[350px]" : "h-[600px]"} flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-asha-teal/30 border-t-asha-teal animate-spin" />
          <p className="text-xs text-asha-ink-lighter">Loading intelligence map...</p>
        </div>
      </div>
    );
  }

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district);
    onDistrictSelect?.(district);
  };

  return (
    <div className={`warm-card overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-asha-glass-border">
        <div>
          <h3 className="text-sm font-semibold text-asha-ink">Hunger Risk Intelligence Map</h3>
          <p className="text-xs text-asha-ink-lighter mt-0.5">District-level risk visualization — real-time</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-risk-low" />Low</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-risk-moderate" />Moderate</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-risk-high" />High</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-risk-critical" />Critical</span>
        </div>
      </div>

      <div className="relative">
        <div className={compact ? "h-[320px]" : "h-[560px]"}>
          <MapContainer
            center={[22.5, 79.0]}
            zoom={compact ? 4 : 5}
            className="w-full h-full"
            zoomControl={!compact}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            {districts.map((district) => (
              <CircleMarker
                key={district.id}
                center={[district.lat, district.lng]}
                radius={compact ? district.riskScore / 5 : district.riskScore / 4}
                pathOptions={{
                  color: getRiskColor(district.riskLevel),
                  fillColor: getRiskColor(district.riskLevel),
                  fillOpacity: 0.3,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => handleDistrictClick(district),
                }}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-bold text-sm mb-1">{district.name}</p>
                    <p className="text-xs opacity-80">{district.state}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Risk Score:</span>
                        <span className="font-bold">{district.riskScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attendance:</span>
                        <span>{district.avgAttendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meal Participation:</span>
                        <span>{district.mealParticipation}%</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
            {/* School markers (smaller) */}
            {!compact && schools.map((school) => (
              <CircleMarker
                key={school.id}
                center={[school.lat, school.lng]}
                radius={4}
                pathOptions={{
                  color: getRiskColor(school.riskLevel),
                  fillColor: getRiskColor(school.riskLevel),
                  fillOpacity: 0.5,
                  weight: 1,
                }}
              >
                <Popup>
                  <div className="min-w-[160px]">
                    <p className="font-bold text-xs">{school.name}</p>
                    <p className="text-[11px] opacity-80">{school.districtName}</p>
                    <div className="mt-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span>Risk:</span>
                        <span className="font-bold">{school.riskScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Students:</span>
                        <span>{school.totalStudents}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Selected district panel */}
        <AnimatePresence>
          {selectedDistrict && !compact && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-72 warm-card p-4 shadow-elevated z-[1000]"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-asha-ink">{selectedDistrict.name}</h4>
                  <p className="text-xs text-asha-ink-lighter">{selectedDistrict.state}</p>
                </div>
                <button onClick={() => setSelectedDistrict(null)} className="text-asha-ink-lighter hover:text-asha-ink">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <StatusBadge level={selectedDistrict.riskLevel} size="md" />
                <TrendIndicator trend={selectedDistrict.riskTrend} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-asha-ink-light"><AlertTriangle className="w-3 h-3" />Risk Score</span>
                  <span className="font-bold text-asha-ink">{selectedDistrict.riskScore}/100</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-asha-ink-light"><Users className="w-3 h-3" />Students</span>
                  <span className="font-semibold text-asha-ink">{selectedDistrict.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-asha-ink-light"><MapPin className="w-3 h-3" />Schools</span>
                  <span className="font-semibold text-asha-ink">{selectedDistrict.totalSchools}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-asha-ink-light"><Utensils className="w-3 h-3" />Meal Rate</span>
                  <span className="font-semibold text-asha-ink">{selectedDistrict.mealParticipation}%</span>
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-asha-cream-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${selectedDistrict.riskScore}%`,
                    backgroundColor: getRiskColor(selectedDistrict.riskLevel),
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
