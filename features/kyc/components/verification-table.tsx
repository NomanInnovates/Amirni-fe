"use client";

import React, { useState } from "react";
import { DriverVerification } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, User, Building } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  DriverVerification["overallStatus"],
  { labelKey: string; color: string }
> = {
  pending: { labelKey: "kyc.pending", color: "bg-yellow-100 text-yellow-800" },
  approved: { labelKey: "kyc.approved", color: "bg-green-100 text-green-800" },
  rejected: { labelKey: "kyc.rejected", color: "bg-red-100 text-red-800" },
  incomplete: {
    labelKey: "kyc.incomplete",
    color: "bg-gray-100 text-gray-800",
  },
};

const driverTypeConfig: Record<
  DriverVerification["driverType"],
  { labelKey: string; icon: React.ElementType }
> = {
  solo: { labelKey: "kyc.verificationPage.solo", icon: User },
  company: { labelKey: "kyc.verificationPage.company", icon: Building },
};

interface VerificationTableProps {
  data: DriverVerification[];
}

export function KYCVerificationTable({ data }: VerificationTableProps) {
  const { t } = useTranslation();
  const p = "kyc.verificationPage";
  const [selectedDriver, setSelectedDriver] =
    useState<DriverVerification | null>(null);

  const columns: Column<DriverVerification>[] = [
    {
      key: "driverName",
      header: t(`${p}.colDriverName`),
      render: (v) => (
        <span className="font-medium text-foreground">{v.driverName}</span>
      ),
    },
    {
      key: "driverType",
      header: t(`${p}.colType`),
      render: (v) => {
        const typeInfo = driverTypeConfig[v.driverType];
        const Icon = typeInfo.icon;
        return (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Icon size={16} />
            {t(typeInfo.labelKey)}
          </span>
        );
      },
    },
    {
      key: "documents",
      header: t(`${p}.colDocuments`),
      render: (v) => (
        <span className="text-muted-foreground">
          <span className="text-green-600">{v.documentsApproved}</span>
          {" / "}
          <span className="text-foreground">{v.documentsSubmitted}</span>
          {v.documentsRejected > 0 && (
            <span className="text-red-600 ms-1">
              ({v.documentsRejected} {t("kyc.rejected").toLowerCase()})
            </span>
          )}
        </span>
      ),
    },
    {
      key: "overallStatus",
      header: t(`${p}.colStatus`),
      render: (v) => {
        const statusInfo = statusConfig[v.overallStatus];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "submittedAt",
      header: t(`${p}.colSubmitted`),
      render: (v) => (
        <span className="text-muted-foreground">
          {v.submittedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (v) => (
        <button
          onClick={() => setSelectedDriver(v)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">{t(`${p}.reviewBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(v) => v.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedDriver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {t(`${p}.verificationDetails`)}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.driver`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedDriver.driverName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.driverType`)}
                </p>
                <p className="text-sm font-medium">
                  {t(driverTypeConfig[selectedDriver.driverType].labelKey)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.documentsProgress`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedDriver.documentsApproved}{" "}
                  {t("kyc.approved").toLowerCase()} /{" "}
                  {selectedDriver.documentsSubmitted}
                  {selectedDriver.documentsRejected > 0 &&
                    ` (${selectedDriver.documentsRejected} ${t("kyc.rejected").toLowerCase()})`}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.overallStatus`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedDriver.overallStatus].color}
                >
                  {t(statusConfig[selectedDriver.overallStatus].labelKey)}
                </Badge>
              </div>
              {selectedDriver.rejectionReason && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.rejectionReason`)}
                  </p>
                  <p className="text-sm font-medium text-red-600">
                    {selectedDriver.rejectionReason}
                  </p>
                </div>
              )}
              {selectedDriver.reviewedAt && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.reviewedAt`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedDriver.reviewedAt.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.approveBtn`)}
              </GradientButton>
              <GradientButton variant="outline" className="flex-1">
                {t(`${p}.rejectBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-secondary"
              >
                {t(`${p}.closeBtn`)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
