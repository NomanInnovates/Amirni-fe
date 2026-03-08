"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { MembershipTable } from "@/features/loyalty/components/membership-table";
import { Membership } from "@/features/loyalty/types";
import { Users, Award, Medal, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";

const members: Membership[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    tier: "gold",
    points: 12500,
    totalSpent: 8500,
    status: "active",
    joinedAt: new Date("2023-03-15"),
    expiresAt: new Date("2025-03-15"),
    benefits: ["Free shipping", "10% discount", "Priority support"],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    tier: "platinum",
    points: 45000,
    totalSpent: 32000,
    status: "active",
    joinedAt: new Date("2022-11-01"),
    expiresAt: new Date("2025-11-01"),
    benefits: [
      "Free shipping",
      "20% discount",
      "Priority support",
      "Exclusive events",
    ],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Ahmed Hassan",
    tier: "silver",
    points: 3200,
    totalSpent: 2100,
    status: "active",
    joinedAt: new Date("2024-01-10"),
    expiresAt: new Date("2026-01-10"),
    benefits: ["Free shipping", "5% discount"],
  },
  {
    id: "4",
    userId: "user4",
    userName: "Sara Ali",
    tier: "bronze",
    points: 800,
    totalSpent: 450,
    status: "expired",
    joinedAt: new Date("2023-06-20"),
    expiresAt: new Date("2024-06-20"),
    benefits: ["Free shipping on orders over $50"],
  },
  {
    id: "5",
    userId: "user5",
    userName: "Omar Khalid",
    tier: "silver",
    points: 5600,
    totalSpent: 3800,
    status: "active",
    joinedAt: new Date("2023-09-05"),
    expiresAt: new Date("2025-09-05"),
    benefits: ["Free shipping", "5% discount"],
  },
];

export default function MembershipPage() {
  const { t } = useTranslation();
  const p = "loyalty.membershipPage";

  const stats = [
    {
      title: t(`${p}.totalMembers`),
      value: "8,456",
      icon: Users,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.goldMembers`),
      value: "1,200",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.silverMembers`),
      value: "2,800",
      icon: Award,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.bronzeMembers`),
      value: "4,456",
      icon: Medal,
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
          <GradientButton>{t(`${p}.addMemberBtn`)}</GradientButton>
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
              <option>{t(`${p}.allTiers`)}</option>
              <option>{t("loyalty.bronze")}</option>
              <option>{t("loyalty.silver")}</option>
              <option>{t("loyalty.gold")}</option>
              <option>{t("loyalty.platinum")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("loyalty.active")}</option>
              <option>{t("loyalty.expired")}</option>
              <option>{t("loyalty.suspended")}</option>
            </select>
          </div>

          <MembershipTable data={members} />
        </div>
      </div>
    </DashboardLayout>
  );
}
