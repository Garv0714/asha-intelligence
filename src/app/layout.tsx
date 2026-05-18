import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asha Intelligence — AI-Powered Humanitarian Nutrition Platform",
  description: "Predictive social intelligence platform protecting children from hunger. AI-driven analytics empowering schools, NGOs, and governments with actionable nutrition insights across every district.",
  keywords: ["humanitarian intelligence", "child hunger prediction", "nutrition analytics", "AI social impact", "food security platform", "predictive intelligence"],
  openGraph: {
    title: "Asha Intelligence — Protecting Children Before Crisis",
    description: "AI-powered humanitarian platform predicting and preventing child hunger through predictive analytics, intervention intelligence, and district-level risk monitoring.",
    type: "website",
    locale: "en_IN",
    siteName: "Asha Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asha Intelligence — AI-Powered Humanitarian Platform",
    description: "Predictive intelligence protecting children from hunger before crisis becomes irreversible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-asha-cream">
        {children}
      </body>
    </html>
  );
}
