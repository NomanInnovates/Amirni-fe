"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { StatCard } from "@/components/ui/stat-card";
import { KYCVerificationTable } from "@/features/kyc/components/verification-table";
import { DriverVerification } from "@/features/kyc/types";
import { ShieldCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const verifications: DriverVerification[] = [
  {
    id: "v1",
    driverId: "drv1",
    driverName: "John Doe",
    driverType: "solo",
    documentsSubmitted: 3,
    documentsApproved: 3,
    documentsRejected: 0,
    overallStatus: "approved",
    submittedAt: new Date("2024-02-15"),
    reviewedAt: new Date("2024-02-18"),
  },
  {
    id: "v2",
    driverId: "drv2",
    driverName: "Ahmed Hassan",
    driverType: "company",
    documentsSubmitted: 4,
    documentsApproved: 2,
    documentsRejected: 1,
    overallStatus: "rejected",
    rejectionReason: "Vehicle registration document is expired",
    submittedAt: new Date("2024-02-28"),
    reviewedAt: new Date("2024-03-02"),
  },
  {
    id: "v3",
    driverId: "drv3",
    driverName: "Sara Ali",
    driverType: "solo",
    documentsSubmitted: 2,
    documentsApproved: 1,
    documentsRejected: 0,
    overallStatus: "pending",
    submittedAt: new Date("2024-03-01"),
  },
  {
    id: "v4",
    driverId: "drv4",
    driverName: "Omar Khalid",
    driverType: "company",
    documentsSubmitted: 1,
    documentsApproved: 0,
    documentsRejected: 0,
    overallStatus: "incomplete",
    submittedAt: new Date("2024-03-03"),
  },
];

export default function KYCVerificationPage() {
  const { t } = useTranslation();
  const p = "kyc.verificationPage";

  const stats = [
    {
      title: t(`${p}.totalDrivers`),
      value: "1,204",
      icon: ShieldCheck,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.pendingVerification`),
      value: "96",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.verified`),
      value: "1,043",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("kyc.rejected"),
      value: "65",
      icon: XCircle,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <GradientText>{t(`${p}.heading`)}</GradientText>
          </h1>
          <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
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
              <option>{t("kyc.pending")}</option>
              <option>{t("kyc.approved")}</option>
              <option>{t("kyc.rejected")}</option>
              <option>{t("kyc.incomplete")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t(`${p}.solo`)}</option>
              <option>{t(`${p}.company`)}</option>
            </select>
          </div>

          <KYCVerificationTable data={verifications} />
        </div>
      </div>
    </DashboardLayout>
  );
}
