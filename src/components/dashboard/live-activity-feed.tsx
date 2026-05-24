"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { activityFeed } from "@/data/synthetic/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FeedItem {
  id: string;
  time: string;
  type: string;
  message: string;
  icon: string;
  /** Epoch ms when the item was created (only for simulated items) */
  createdAt?: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_FEED_ITEMS = 15;
const INTERVAL_MS = 15_000;

const DISTRICTS = [
  "Shravasti",
  "Anantapur",
  "Kalahandi",
  "Nandurbar",
  "Koraput",
  "Dakshin Dinajpur",
  "Jaisalmer",
  "Ernakulam",
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick a random element from an array. */
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Random integer between min (inclusive) and max (inclusive). */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Build a random simulated feed item. */
function createSimulatedItem(): FeedItem {
  const district = pick(DISTRICTS);
  const templates: { message: string; icon: string; type: string }[] = [
    {
      message: "🔔 AI model recalibrated — prediction accuracy updated to 89.2%",
      icon: "🔔",
      type: "alert",
    },
    {
      message: `📡 Real-time data sync completed for ${district}`,
      icon: "📡",
      type: "success",
    },
    {
      message: `⚠️ Attendance anomaly detected in ${district} — investigating`,
      icon: "⚠️",
      type: "anomaly",
    },
    {
      message: `✅ Intervention milestone reached: ${randInt(8_000, 45_000).toLocaleString()} meals served today`,
      icon: "✅",
      type: "success",
    },
    {
      message: `🧠 Risk model updated — ${district} score adjusted to ${randInt(40, 92)}`,
      icon: "🧠",
      type: "prediction",
    },
    {
      message: `📋 Weekly compliance report auto-generated for ${district}`,
      icon: "📋",
      type: "report",
    },
  ];

  const tpl = pick(templates);

  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    time: "Just now",
    type: tpl.type,
    message: tpl.message,
    icon: tpl.icon,
    createdAt: Date.now(),
  };
}

/** Turn createdAt epoch into a human-friendly relative string. */
function relativeTime(createdAt: number): string {
  const diffSec = Math.floor((Date.now() - createdAt) / 1000);
  if (diffSec < 10) return "Just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function LiveActivityFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(() =>
    (activityFeed ?? []).map((item) => ({ ...item, createdAt: undefined })),
  );

  // Keep a ref so the interval callback always sees the latest state.
  const feedRef = useRef(feedItems);
  feedRef.current = feedItems;

  // --- Generate new simulated items every 15 s ---
  useEffect(() => {
    const id = setInterval(() => {
      const newItem = createSimulatedItem();
      setFeedItems((prev) => [newItem, ...prev].slice(0, MAX_FEED_ITEMS));
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  // --- Tick relative timestamps every 5 s ---
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5_000);
    return () => clearInterval(id);
  }, []);

  // Resolve display time for a feed item.
  const getDisplayTime = useCallback((item: FeedItem): string => {
    if (item.createdAt != null) return relativeTime(item.createdAt);
    return item.time ?? "";
  }, []);

  // -------------------------------------------------------------------
  return (
    <div className="warm-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-asha-cream-dark/60">
        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-asha-teal" />
          <h3 className="text-sm font-semibold text-asha-ink tracking-tight">
            Activity Feed
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium text-emerald-600 tracking-wide uppercase">
            Live
          </span>
        </div>
      </div>

      {/* Scrollable feed */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {feedItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="flex items-start gap-3 px-5 py-3 border-b border-asha-cream-dark/40 last:border-b-0 hover:bg-asha-cream/40 transition-colors"
            >
              {/* Emoji icon */}
              <span className="text-base leading-none mt-0.5 flex-shrink-0 select-none">
                {item.icon ?? "📌"}
              </span>

              {/* Text body */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-asha-ink leading-relaxed">
                  {item.message}
                </p>
                <span className="text-[10px] text-asha-ink/40 mt-0.5 block">
                  {getDisplayTime(item)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {feedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-asha-ink/30">
            <Activity className="w-6 h-6 mb-2" />
            <span className="text-xs">No activity yet</span>
          </div>
        )}
      </div>
    </div>
  );
}
