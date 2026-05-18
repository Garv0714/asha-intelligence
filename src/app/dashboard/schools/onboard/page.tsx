"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { School, MapPin, Users, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  { title: "School Information", desc: "Basic details about the school" },
  { title: "Location & Demographics", desc: "Geographic and student data" },
  { title: "Meal Program", desc: "Existing nutrition programs" },
  { title: "Confirmation", desc: "Review and submit" },
];

const inputClass = "w-full px-3 py-2.5 rounded-xl bg-asha-cream border border-asha-glass-border text-sm text-asha-ink placeholder:text-asha-ink-lighter outline-none focus:border-asha-teal/40 focus:ring-2 focus:ring-asha-teal/10 transition-all";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "", district: "", state: "", type: "primary",
    totalStudents: "", lat: "", lng: "", address: "",
    hasMealProgram: true, mealType: "midday", mealProvider: "",
  });

  const updateField = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-asha-ink flex items-center gap-2">
          <School className="w-6 h-6 text-asha-teal" />
          School Onboarding
        </h1>
        <p className="text-sm text-asha-ink-lighter mt-1">Register a new school to the Asha Intelligence monitoring network</p>
      </motion.div>

      {/* Progress steps */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < step ? "bg-asha-teal text-white" : i === step ? "bg-asha-teal-muted text-asha-teal-dark border border-asha-teal/20" : "bg-asha-cream-dark text-asha-ink-lighter"
            }`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-asha-teal" : "bg-asha-glass-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="warm-card p-6">
        <h2 className="text-lg font-semibold text-asha-ink mb-1">{steps[step].title}</h2>
        <p className="text-xs text-asha-ink-lighter mb-6">{steps[step].desc}</p>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-asha-ink-light mb-1.5">School Name</label>
              <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g., Govt. Primary School, Rayadurg" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-asha-ink-light mb-1.5">District</label>
                <input value={formData.district} onChange={(e) => updateField("district", e.target.value)} placeholder="e.g., Anantapur" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-asha-ink-light mb-1.5">State</label>
                <input value={formData.state} onChange={(e) => updateField("state", e.target.value)} placeholder="e.g., Andhra Pradesh" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-asha-ink-light mb-1.5">School Type</label>
              <div className="grid grid-cols-4 gap-2">
                {["primary", "middle", "secondary", "integrated"].map((t) => (
                  <button key={t} onClick={() => updateField("type", t)} className={`px-3 py-2 text-xs font-medium rounded-xl border capitalize transition-all ${formData.type === t ? "bg-asha-teal-muted border-asha-teal/20 text-asha-teal-dark" : "bg-asha-cream border-asha-glass-border text-asha-ink-lighter hover:text-asha-ink"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Total Students</label>
              <input type="number" value={formData.totalStudents} onChange={(e) => updateField("totalStudents", e.target.value)} placeholder="e.g., 1200" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Address</label>
              <textarea value={formData.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Full school address..." rows={3} className={`${inputClass} resize-none`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Latitude</label>
                <input value={formData.lat} onChange={(e) => updateField("lat", e.target.value)} placeholder="e.g., 14.6819" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Longitude</label>
                <input value={formData.lng} onChange={(e) => updateField("lng", e.target.value)} placeholder="e.g., 77.6006" className={inputClass} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Has Meal Program?</label>
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map((val) => (
                  <button key={String(val)} onClick={() => updateField("hasMealProgram", val)} className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-all ${formData.hasMealProgram === val ? "bg-asha-teal-muted border-asha-teal/20 text-asha-teal-dark" : "bg-asha-cream border-asha-glass-border text-asha-ink-lighter"}`}>
                    {val ? "Yes — Active Program" : "No — Needs Setup"}
                  </button>
                ))}
              </div>
            </div>
            {formData.hasMealProgram && (
              <>
                <div>
                  <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Meal Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["breakfast", "midday", "snack"].map((t) => (
                      <button key={t} onClick={() => updateField("mealType", t)} className={`px-3 py-2 text-xs font-medium rounded-xl border capitalize transition-all ${formData.mealType === t ? "bg-asha-teal-muted border-asha-teal/20 text-asha-teal-dark" : "bg-asha-cream border-asha-glass-border text-asha-ink-lighter"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-asha-ink-light mb-1.5">Meal Provider</label>
                  <input value={formData.mealProvider} onChange={(e) => updateField("mealProvider", e.target.value)} placeholder="e.g., Akshaya Patra, State MDM Scheme" className={inputClass} />
                </div>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-asha-teal-muted border border-asha-teal/10">
              <h3 className="text-sm font-semibold text-asha-teal-dark mb-3">Review Details</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-asha-ink-lighter">School Name</span><span className="text-asha-ink font-medium">{formData.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-asha-ink-lighter">District</span><span className="text-asha-ink">{formData.district || "—"}, {formData.state || "—"}</span></div>
                <div className="flex justify-between"><span className="text-asha-ink-lighter">Type</span><span className="text-asha-ink capitalize">{formData.type}</span></div>
                <div className="flex justify-between"><span className="text-asha-ink-lighter">Students</span><span className="text-asha-ink">{formData.totalStudents || "—"}</span></div>
                <div className="flex justify-between"><span className="text-asha-ink-lighter">Meal Program</span><span className="text-asha-ink">{formData.hasMealProgram ? `Yes — ${formData.mealType}` : "No"}</span></div>
              </div>
            </div>
            <p className="text-xs text-asha-ink-lighter">
              Upon submission, Asha Intelligence AI will begin monitoring this school and generate an initial risk assessment within 24 hours.
            </p>
          </div>
        )}
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${step === 0 ? "opacity-30 cursor-not-allowed" : "border border-asha-glass-border text-asha-ink-light hover:bg-asha-cream-dark bg-white"}`}>
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-asha-teal to-asha-emerald text-white hover:opacity-90 transition-opacity shadow-glow-teal">
            <CheckCircle className="w-4 h-4" /> Submit & Begin Monitoring
          </button>
        )}
      </div>
    </div>
  );
}
