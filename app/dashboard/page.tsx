"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const p = "dashboard";

  const stats = [
    {
      title: t(`${p}.totalUsers`),
      value: "12,543",
      icon: Users,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.kycPending`),
      value: "348",
      icon: BarChart3,
      color: "from-[#01A8A9] to-[#7C4099]",
    },
    {
      title: t(`${p}.activeShipments`),
      value: "2,856",
      icon: TrendingUp,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.revenueToday`),
      value: "$45,230",
      icon: Zap,
      color: "from-[#01A8A9] to-[#7C4099]",
    },
  ];

  const activities = [
    { action: t(`${p}.kycSubmitted`), user: "John Doe", time: "2 hours ago" },
    {
      action: t(`${p}.shipmentDelivered`),
      user: "Jane Smith",
      time: "4 hours ago",
    },
    { action: t(`${p}.newOrder`), user: "Ahmed Hassan", time: "6 hours ago" },
    {
      action: t(`${p}.userRegistration`),
      user: "Maria Garcia",
      time: "1 day ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {t(`${p}.welcomeTo`)}{" "}
            <GradientText>{t(`${p}.appName`)}</GradientText>
          </h1>
          <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-card rounded-xl p-6 border border-border">
            <h2 className="text-lg font-bold mb-4">
              <GradientText>{t(`${p}.quickActions`)}</GradientText>
            </h2>
            <div className="space-y-3">
              <GradientButton className="w-full justify-start">
                {t(`${p}.reviewKyc`)}
              </GradientButton>
              <GradientButton
                variant="outline"
                className="w-full justify-start"
              >
                {t(`${p}.trackShipments`)}
              </GradientButton>
              <GradientButton variant="ghost" className="w-full justify-start">
                {t(`${p}.viewReports`)}
              </GradientButton>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
            <h2 className="text-lg font-bold mb-4">
              <GradientText>{t(`${p}.recentActivity`)}</GradientText>
            </h2>
            <div className="space-y-4">
              {activities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
