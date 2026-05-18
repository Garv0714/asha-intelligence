"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, MapPin, Shield, TrendingUp, Users, ChevronRight, ChevronLeft, Presentation, Zap } from "lucide-react";
import { dashboardStats, districtRankings, aiRecommendations } from "@/data/synthetic/analytics";
import { districts } from "@/data/synthetic/districts";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import Link from "next/link";

const slides = [
  { id: "intro", title: "Asha Intelligence", subtitle: "AI-Powered Humanitarian Nutrition Platform" },
  { id: "problem", title: "The Challenge", subtitle: "24,180 children identified at-risk across 8 districts" },
  { id: "solution", title: "Our AI Solution", subtitle: "Predictive intelligence that acts before crisis" },
  { id: "impact", title: "Real Impact", subtitle: "89% prediction accuracy • 17 active interventions" },
  { id: "recommendations", title: "AI Recommendations", subtitle: "Intelligent action plans generated in real-time" },
  { id: "districts", title: "District Intelligence", subtitle: "Severity rankings across monitored regions" },
  { id: "vision", title: "The Vision", subtitle: "Every child protected before crisis becomes irreversible" },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setCurrent((c) => (c < slides.length - 1 ? c + 1 : 0)), 6000);
    return () => clearInterval(timer);
  }, [auto]);

  const slide = slides[current];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-asha-glass-border bg-white">
        <div className="flex items-center gap-3">
          <Presentation className="w-5 h-5 text-asha-violet" />
          <span className="text-sm font-semibold text-asha-ink">Presentation Mode</span>
          <span className="text-xs text-asha-ink-lighter">{current + 1} / {slides.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAuto(!auto)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${auto ? "bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/15" : "bg-white border border-asha-glass-border text-asha-ink-lighter"}`}>
            {auto ? "⏸ Pause" : "▶ Auto"}
          </button>
          <Link href="/dashboard" className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-asha-glass-border text-asha-ink-lighter hover:text-asha-ink transition-colors">
            Exit
          </Link>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="max-w-4xl w-full text-center">

            {slide.id === "intro" && (
              <div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-asha-teal to-asha-emerald flex items-center justify-center mx-auto mb-8 shadow-glow-teal">
                  <Heart className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold text-asha-ink mb-4 gradient-text-hope">{slide.title}</h1>
                <p className="text-xl text-asha-ink-light mb-8">{slide.subtitle}</p>
                <p className="text-sm text-asha-ink-lighter max-w-lg mx-auto">Warm, intelligent, AI-powered humanitarian platform designed to help vulnerable children before crisis becomes irreversible.</p>
              </div>
            )}

            {slide.id === "problem" && (
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-asha-ink mb-8">{slide.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { value: 24180, label: "Children At-Risk", color: "#D35449" },
                    { value: 8, label: "Districts Monitored", color: "#2A9D8F" },
                    { value: 68600, label: "Total Students", color: "#8B7EC8" },
                    { value: 65.8, label: "Avg Risk Score", suffix: "/100", color: "#E8846B" },
                  ].map((s) => (
                    <div key={s.label} className="warm-card p-6">
                      <p className="text-3xl font-bold mb-1" style={{ color: s.color }}><AnimatedCounter value={s.value} suffix={s.suffix} duration={2} /></p>
                      <p className="text-xs text-asha-ink-lighter">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.id === "solution" && (
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-asha-ink mb-8">{slide.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Brain, title: "Predictive AI", desc: "ML models predict risk 7-90 days ahead", color: "#8B7EC8" },
                    { icon: MapPin, title: "Geospatial Intel", desc: "Real-time risk mapping across India", color: "#D35449" },
                    { icon: Shield, title: "Intervention Engine", desc: "AI-recommended action plans", color: "#4CAF7D" },
                  ].map((f) => (
                    <div key={f.title} className="warm-card p-8">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${f.color}12` }}>
                        <f.icon className="w-7 h-7" style={{ color: f.color }} />
                      </div>
                      <h3 className="text-lg font-semibold text-asha-ink mb-2">{f.title}</h3>
                      <p className="text-sm text-asha-ink-light">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.id === "impact" && (
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-asha-ink mb-8">{slide.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: 89, label: "Prediction Accuracy", suffix: "%", color: "#2A9D8F" },
                    { value: 17, label: "Active Interventions", color: "#4CAF7D" },
                    { value: 342, label: "AI Predictions Made", color: "#8B7EC8" },
                    { value: 41200, label: "Meals Served Today", color: "#E4A853" },
                  ].map((s) => (
                    <div key={s.label} className="warm-card p-6">
                      <p className="text-3xl font-bold mb-1" style={{ color: s.color }}><AnimatedCounter value={s.value} suffix={s.suffix} duration={2} /></p>
                      <p className="text-xs text-asha-ink-lighter">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.id === "recommendations" && (
              <div className="text-left">
                <h2 className="text-3xl font-bold text-asha-ink mb-6 text-center">{slide.title}</h2>
                <div className="space-y-4">
                  {aiRecommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="warm-card p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-asha-amber" />
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${rec.urgency === "immediate" ? "bg-risk-critical/10 text-risk-critical" : "bg-risk-high/10 text-risk-high"}`}>{rec.urgency}</span>
                        <span className="text-xs text-asha-ink-lighter">{rec.districtName}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-asha-ink mb-1">{rec.title}</h4>
                      <div className="flex items-center gap-4 text-[11px] text-asha-ink-lighter">
                        <span><Users className="w-3 h-3 inline" /> {rec.impactPrediction.childrenHelped.toLocaleString()} children</span>
                        <span><TrendingUp className="w-3 h-3 inline" /> -{rec.impactPrediction.riskReduction}% risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.id === "districts" && (
              <div className="text-left">
                <h2 className="text-3xl font-bold text-asha-ink mb-6 text-center">{slide.title}</h2>
                <div className="space-y-3">
                  {districtRankings.slice(0, 5).map((r) => (
                    <div key={r.districtId} className="warm-card p-4 flex items-center gap-4">
                      <span className="text-lg font-bold text-asha-coral w-8">#{r.compositeRank}</span>
                      <span className="text-sm font-semibold text-asha-ink flex-1">{r.districtName}</span>
                      <div className="flex items-center gap-6 text-xs">
                        <span className="text-asha-ink-lighter">Hunger: <span className="font-bold text-asha-coral">{r.hungerSeverity}</span></span>
                        <span className="text-asha-ink-lighter">Urgency: <span className="font-bold text-asha-amber">{r.interventionUrgency}</span></span>
                        <span className="text-asha-ink-lighter">Education: <span className="font-bold text-asha-violet">{r.educationalImpact}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.id === "vision" && (
              <div>
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-asha-teal to-asha-sky flex items-center justify-center mx-auto mb-8 shadow-glow-teal">
                  <Heart className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-hope mb-6">{slide.title}</h2>
                <p className="text-xl text-asha-ink-light max-w-2xl mx-auto mb-4">{slide.subtitle}</p>
                <p className="text-sm text-asha-ink-lighter max-w-lg mx-auto">Asha — because hope is the most powerful intelligence.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-asha-glass-border bg-white">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="p-2 rounded-lg hover:bg-asha-cream disabled:opacity-30 transition-all">
          <ChevronLeft className="w-5 h-5 text-asha-ink" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-asha-teal w-6" : "bg-asha-cream-dark hover:bg-asha-ink-faint"}`} />
          ))}
        </div>
        <button onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))} disabled={current === slides.length - 1} className="p-2 rounded-lg hover:bg-asha-cream disabled:opacity-30 transition-all">
          <ChevronRight className="w-5 h-5 text-asha-ink" />
        </button>
      </div>
    </div>
  );
}
