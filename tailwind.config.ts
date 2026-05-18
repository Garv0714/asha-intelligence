import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Asha Intelligence — humanitarian warmth palette
        asha: {
          // Core surfaces
          cream: "#FAFAF7",
          "cream-dark": "#F5F5F0",
          warm: "#F0EDE8",
          "warm-dark": "#E8E4DD",
          // Primary — muted teal (trust, calm, healthcare)
          teal: "#2A9D8F",
          "teal-light": "#52B5A8",
          "teal-dark": "#1E7A6E",
          "teal-muted": "#E8F5F2",
          // Secondary — sky blue (openness, intelligence)
          sky: "#5BA4CF",
          "sky-light": "#87BFDD",
          "sky-dark": "#3D7FAB",
          "sky-muted": "#EBF4FA",
          // Emerald — growth, progress
          emerald: "#4CAF7D",
          "emerald-light": "#6EC498",
          "emerald-dark": "#3A8C63",
          "emerald-muted": "#EDF7F1",
          // Coral — warmth, urgency (gentle)
          coral: "#E8846B",
          "coral-light": "#F0A08A",
          "coral-dark": "#D06A52",
          "coral-muted": "#FDF0EC",
          // Amber — attention, caution
          amber: "#E4A853",
          "amber-light": "#ECBE78",
          "amber-dark": "#C89038",
          "amber-muted": "#FBF4E6",
          // Violet — AI, intelligence
          violet: "#8B7EC8",
          "violet-light": "#A99FDA",
          "violet-dark": "#6F62B0",
          "violet-muted": "#F1EFF8",
          // Neutral text
          ink: "#2C3E50",
          "ink-light": "#5D6D7E",
          "ink-lighter": "#8E99A4",
          "ink-faint": "#B8C1C8",
          // Borders & glass
          "glass-border": "rgba(44, 62, 80, 0.08)",
          "glass-bg": "rgba(255, 255, 255, 0.7)",
        },
        risk: {
          low: "#4CAF7D",
          moderate: "#E4A853",
          high: "#E8846B",
          critical: "#D35449",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(42, 157, 143, 0.2)" },
          "50%": { boxShadow: "0 0 0 8px rgba(42, 157, 143, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "counter": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "counter": "counter 0.4s ease-out forwards",
        "gradient-x": "gradient-x 3s ease infinite",
        "float": "float 4s ease-in-out infinite",
        "breathe": "breathe 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "warm-gradient": "linear-gradient(135deg, #FAFAF7 0%, #F0EDE8 100%)",
      },
      boxShadow: {
        "soft": "0 1px 3px rgba(44, 62, 80, 0.06), 0 1px 2px rgba(44, 62, 80, 0.04)",
        "card": "0 2px 8px rgba(44, 62, 80, 0.06), 0 1px 3px rgba(44, 62, 80, 0.04)",
        "card-hover": "0 8px 25px rgba(44, 62, 80, 0.1), 0 4px 10px rgba(44, 62, 80, 0.06)",
        "elevated": "0 12px 40px rgba(44, 62, 80, 0.12), 0 4px 12px rgba(44, 62, 80, 0.06)",
        "glow-teal": "0 0 20px rgba(42, 157, 143, 0.15)",
        "glow-coral": "0 0 20px rgba(232, 132, 107, 0.15)",
        "inner-soft": "inset 0 1px 2px rgba(44, 62, 80, 0.04)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
