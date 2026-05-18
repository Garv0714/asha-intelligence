"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import {
  Heart, Brain, MapPin, BarChart3, School, Shield,
  ArrowRight, Activity, Users, TrendingUp, ChevronRight,
  Sparkles, HandHeart,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI Risk Prediction", desc: "ML-powered hunger risk scoring for every school and district in real-time", color: "#8B7EC8" },
  { icon: MapPin, title: "Hunger Risk Maps", desc: "Geospatial visualization of nutritional vulnerability across India", color: "#D35449" },
  { icon: BarChart3, title: "Predictive Analytics", desc: "7 to 90-day forecasting with 89% accuracy on risk escalation", color: "#2A9D8F" },
  { icon: School, title: "School Intelligence", desc: "Attendance, meal participation, and dropout correlation tracking", color: "#E4A853" },
  { icon: Shield, title: "Intervention Engine", desc: "AI-recommended actions with NGO coordination and impact tracking", color: "#4CAF7D" },
  { icon: Activity, title: "Anomaly Detection", desc: "Automated detection of supply chain disruptions and risk spikes", color: "#5BA4CF" },
];

const impactStats = [
  { value: 24180, label: "Children Identified At-Risk", suffix: "+" },
  { value: 50, label: "Schools Monitored", suffix: "" },
  { value: 89, label: "AI Prediction Accuracy", suffix: "%" },
  { value: 17, label: "Active Interventions", suffix: "" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-asha-cream overflow-hidden">
      {/* Subtle warm background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-asha-teal/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-asha-sky/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-asha-coral/3 rounded-full blur-[150px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 h-16 border-b border-asha-glass-border bg-white/60 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-asha-teal to-asha-emerald flex items-center justify-center shadow-glow-teal">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">Asha</span>
          <span className="text-[10px] font-medium text-asha-ink-lighter tracking-wider uppercase hidden sm:inline">Intelligence</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden md:inline-flex px-4 py-2 text-sm text-asha-ink-light hover:text-asha-ink transition-colors">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity shadow-glow-teal"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-12 pt-24 md:pt-36 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-asha-teal-muted/70 border border-asha-teal/12 text-xs font-medium text-asha-teal-dark mb-8"
          >
            <Heart className="w-3.5 h-3.5" />
            National Humanitarian Intelligence Infrastructure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] font-extrabold text-asha-ink leading-[1.08] tracking-tight mb-7"
          >
            Protecting children{" "}
            <span className="gradient-text">before crisis</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            becomes{" "}
            <span className="gradient-text-warm">irreversible</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-asha-ink-light max-w-xl mx-auto mb-12 leading-[1.7] tracking-[-0.01em]"
          >
            An AI platform that identifies nutritional vulnerability using school
            attendance, meal data, and food-price signals — so districts can act
            before a child goes hungry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold rounded-2xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-glow-teal"
            >
              Launch Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/dashboard/analytics/hunger-map"
              className="flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold rounded-2xl border border-asha-glass-border text-asha-ink-light hover:border-asha-teal/20 hover:text-asha-teal-dark hover:bg-white transition-all duration-200 bg-white/80"
            >
              <MapPin className="w-4 h-4" />
              View Risk Map
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-asha-ink-faint tracking-wide"
          >
            <span className="flex items-center gap-1.5"><Brain className="w-3 h-3" />89% prediction accuracy</span>
            <span className="hidden sm:inline text-asha-ink-faint/40">·</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />8 districts monitored</span>
            <span className="hidden sm:inline text-asha-ink-faint/40">·</span>
            <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />68,600 students covered</span>
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="warm-card p-6 text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-asha-ink mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <p className="text-xs text-asha-ink-lighter">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-asha-ink mb-4">
              Intelligence that <span className="gradient-text">saves lives</span>
            </h2>
            <p className="text-asha-ink-light max-w-xl mx-auto">
              A comprehensive AI toolkit for predicting, monitoring, and responding
              to child nutrition crises at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="warm-card p-6 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feat.color}12`, border: `1px solid ${feat.color}20` }}
                >
                  <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-base font-semibold text-asha-ink mb-2">{feat.title}</h3>
                <p className="text-sm text-asha-ink-light leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="warm-card p-8 md:p-12 text-center border border-asha-teal/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-asha-teal to-asha-emerald flex items-center justify-center mx-auto mb-6 shadow-glow-teal">
              <HandHeart className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-asha-ink mb-4">
              Every child deserves to learn on a full stomach
            </h2>
            <p className="text-asha-ink-light mb-8 max-w-lg mx-auto">
              Join the districts using Asha Intelligence to identify and respond to hunger
              before it disrupts education and development.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-all shadow-glow-teal"
            >
              Explore the Dashboard
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-asha-glass-border px-6 md:px-12 py-8 bg-white/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-asha-teal" />
            <span className="text-sm font-semibold gradient-text">Asha Intelligence</span>
            <span className="text-xs text-asha-ink-lighter">• Humanitarian Nutrition Platform</span>
          </div>
          <p className="text-xs text-asha-ink-lighter">
            Built for social impact • Powered by AI • India 🇮🇳
          </p>
        </div>
      </footer>
    </div>
  );
}
