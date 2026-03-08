"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { PointsTable } from "@/features/loyalty/components/points-table";
import { PointsVoucher } from "@/features/loyalty/types";
import { Ticket, CheckCircle, ShoppingBag, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const vouchers: PointsVoucher[] = [
  {
    id: "1",
    code: "PTS-2024-001",
    type: "points",
    value: 500,
    description: "Welcome bonus points",
    userId: "user1",
    userName: "John Doe",
    status: "active",
    expiresAt: new Date("2025-06-30"),
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    code: "VCH-2024-045",
    type: "voucher",
    value: 50,
    description: "$50 discount voucher",
    userId: "user2",
    userName: "Jane Smith",
    status: "used",
    expiresAt: new Date("2024-12-31"),
    createdAt: new Date("2024-02-01"),
    usedAt: new Date("2024-03-10"),
  },
  {
    id: "3",
    code: "CPN-2024-112",
    type: "coupon",
    value: 20,
    description: "20% off next purchase",
    status: "active",
    expiresAt: new Date("2025-03-31"),
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "4",
    code: "PTS-2024-078",
    type: "points",
    value: 1000,
    description: "Referral reward points",
    userId: "user3",
    userName: "Ahmed Hassan",
    status: "expired",
    expiresAt: new Date("2024-01-31"),
    createdAt: new Date("2023-07-20"),
  },
  {
    id: "5",
    code: "VCH-2024-099",
    type: "voucher",
    value: 100,
    description: "Anniversary reward voucher",
    userId: "user4",
    userName: "Sara Ali",
    status: "revoked",
    expiresAt: new Date("2025-01-15"),
    createdAt: new Date("2024-01-01"),
  },
];

export default function PointsVouchersPage() {
  const { t } = useTranslation();
  const p = "loyalty.pointsPage";

  const stats = [
    {
      title: t(`${p}.totalIssued`),
      value: "5,672",
      icon: Ticket,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.activeCount`),
      value: "3,456",
      icon: CheckCircle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.usedCount`),
      value: "1,890",
      icon: ShoppingBag,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.expiredCount`),
      value: "326",
      icon: XCircle,
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
          <GradientButton>{t(`${p}.issueBtn`)}</GradientButton>
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
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t("loyalty.points")}</option>
              <option>{t("loyalty.voucher")}</option>
              <option>{t("loyalty.coupon")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("loyalty.active")}</option>
              <option>{t("loyalty.used")}</option>
              <option>{t("loyalty.expired")}</option>
              <option>{t("loyalty.revoked")}</option>
            </select>
          </div>

          <PointsTable data={vouchers} />
        </div>
      </div>
    </DashboardLayout>
  );
}
