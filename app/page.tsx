"use client";

import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";
import { Users, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Users size={32} />,
      title: "KYC Management",
      description:
        "Advanced identity verification and document management system",
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      icon: <Zap size={32} />,
      title: "Logistics Tracking",
      description: "Real-time shipment tracking and management platform",
      color: "from-[#01A8A9] to-[#7C4099]",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Marketplace",
      description: "Comprehensive order and vendor management system",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield size={32} />,
      title: "Security",
      description: "Enterprise-grade security with role-based access control",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="h-20 flex items-center justify-between px-6 border-b border-border">
        <h1 className="text-2xl font-bold">
          <GradientText>Amirni Admin</GradientText>
        </h1>
        <div className="flex gap-4">
          <Link href="/login">
            <GradientButton variant="ghost">Sign In</GradientButton>
          </Link>
          <Link href="/register">
            <GradientButton>Get Started</GradientButton>
          </Link>
        </div>
      </nav>

      {/* Features Section */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">
              Powerful <GradientText>Features</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your enterprise operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow space-y-4"
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} p-3 rounded-lg text-white w-fit`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear() || "2026"} Amirni Admin. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
