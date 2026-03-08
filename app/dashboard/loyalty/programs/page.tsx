"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { ProgramsTable } from "@/features/loyalty/components/programs-table";
import { LoyaltyProgram } from "@/features/loyalty/types";
import { Trophy, Users, Star, Percent } from "lucide-react";
import { useTranslation } from "react-i18next";

const programs: LoyaltyProgram[] = [
  {
    id: "1",
    name: "Amirni Rewards",
    description: "Main loyalty program for all platform users",
    pointsPerDollar: 10,
    minRedemption: 500,
    status: "active",
    membersCount: 5200,
    totalPointsIssued: 1500000,
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "2",
    name: "VIP Elite Program",
    description: "Premium loyalty program for high-value customers",
    pointsPerDollar: 25,
    minRedemption: 1000,
    status: "active",
    membersCount: 2800,
    totalPointsIssued: 750000,
    createdAt: new Date("2023-09-15"),
  },
  {
    id: "3",
    name: "Seasonal Bonus",
    description: "Limited-time seasonal rewards program",
    pointsPerDollar: 15,
    minRedemption: 200,
    status: "draft",
    membersCount: 456,
    totalPointsIssued: 150000,
    createdAt: new Date("2024-01-10"),
  },
];

export default function LoyaltyProgramsPage() {
  const { t } = useTranslation();
  const p = "loyalty.programsPage";

  const stats = [
    {
      title: t(`${p}.totalPrograms`),
      value: "3",
      icon: Trophy,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.activeMembers`),
      value: "8,456",
      icon: Users,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.totalPointsIssued`),
      value: "2.4M",
      icon: Star,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.redemptionRate`),
      value: "68%",
      icon: Percent,
      color: "to-red-600 from-pink-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton>{t(`${p}.createBtn`)}</GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t(`${p}.searchPlaceholder`)}
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("loyalty.active")}</option>
              <option>{t("loyalty.inactive")}</option>
              <option>{t("loyalty.draft")}</option>
            </select>
          </div>

          <ProgramsTable data={programs} />
        </div>
      </div>
    </DashboardLayout>
  );
}
