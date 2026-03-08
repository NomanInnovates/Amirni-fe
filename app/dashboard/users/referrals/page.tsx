"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { ReferralsTable } from "@/features/users/components/referrals-table";
import { UserReferral } from "@/features/users/types";
import { Users, CheckCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const referrals: UserReferral[] = [
  {
    id: "1",
    referrerId: "user1",
    referrerName: "Ahmed Al-Rashid",
    referredName: "Khalid Ibrahim",
    referredEmail: "khalid@example.com",
    status: "completed",
    reward: "$25 Credit",
    referredAt: new Date("2024-02-10"),
    completedAt: new Date("2024-02-25"),
  },
  {
    id: "2",
    referrerId: "user2",
    referrerName: "Sarah Johnson",
    referredName: "Emily Davis",
    referredEmail: "emily@example.com",
    status: "registered",
    reward: "$25 Credit",
    referredAt: new Date("2024-03-01"),
  },
  {
    id: "3",
    referrerId: "user3",
    referrerName: "Mohammed Hassan",
    referredName: "Ali Nasser",
    referredEmail: "ali@example.com",
    status: "pending",
    reward: "$25 Credit",
    referredAt: new Date("2024-03-05"),
  },
  {
    id: "4",
    referrerId: "user5",
    referrerName: "Omar Khalid",
    referredName: "Layla Mahmoud",
    referredEmail: "layla@example.com",
    status: "completed",
    reward: "$50 Credit",
    referredAt: new Date("2024-01-20"),
    completedAt: new Date("2024-02-05"),
  },
];

export default function UserReferralsPage() {
  const { t } = useTranslation();
  const p = "users.referralsPage";

  const referralStats = [
    {
      title: t(`${p}.totalReferrals`),
      value: "892",
      icon: Users,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.completedReferrals`),
      value: "654",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.pendingReferrals`),
      value: "238",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
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
          <GradientButton>{t(`${p}.exportBtn`)}</GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referralStats.map((stat, index) => (
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
              <option>{t("users.pending")}</option>
              <option>{t("users.registered")}</option>
              <option>{t("users.completed")}</option>
            </select>
          </div>

          <ReferralsTable data={referrals} />
        </div>
      </div>
    </DashboardLayout>
  );
}
