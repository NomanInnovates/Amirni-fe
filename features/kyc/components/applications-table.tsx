"use client";

import React, { useState } from "react";
import { KYCApplication } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  KYCApplication["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  pending: {
    icon: Clock,
    labelKey: "kyc.pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  approved: {
    icon: CheckCircle,
    labelKey: "kyc.approved",
    color: "bg-green-100 text-green-800",
  },
  rejected: {
    icon: XCircle,
    labelKey: "kyc.rejected",
    color: "bg-red-100 text-red-800",
  },
  incomplete: {
    icon: Clock,
    labelKey: "kyc.incomplete",
    color: "bg-gray-100 text-gray-800",
  },
};

interface KYCApplicationsTableProps {
  data: KYCApplication[];
}

export function KYCApplicationsTable({ data }: KYCApplicationsTableProps) {
  const { t } = useTranslation();
  const p = "kyc.applicationsPage";
  const [selectedApp, setSelectedApp] = useState<KYCApplication | null>(null);

  const columns: Column<KYCApplication>[] = [
    {
      key: "name",
      header: t(`${p}.colName`),
      render: (app) => (
        <span className="font-medium text-foreground">
          {app.personalInfo.firstName} {app.personalInfo.lastName}
        </span>
      ),
    },
    {
      key: "nationality",
      header: t(`${p}.colNationality`),
      render: (app) => (
        <span className="text-muted-foreground">
          {app.personalInfo.nationality}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (app) => {
        const statusInfo = statusConfig[app.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "verificationLevel",
      header: t(`${p}.colLevel`),
      render: (app) => (
        <span className="text-muted-foreground">{app.verificationLevel}</span>
      ),
    },
    {
      key: "submittedAt",
      header: t(`${p}.colSubmitted`),
      render: (app) => (
        <span className="text-muted-foreground">
          {app.submittedAt?.toLocaleDateString() ?? "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (app) => (
        <button
          onClick={() => setSelectedApp(app)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(app) => app.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {selectedApp.personalInfo.firstName}{" "}
              {selectedApp.personalInfo.lastName}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.dateOfBirth`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedApp.personalInfo.dateOfBirth.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.address`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedApp.personalInfo.address}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.verificationLevel`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedApp.verificationLevel}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.approveBtn`)}
              </GradientButton>
              <GradientButton variant="outline" className="flex-1">
                {t(`${p}.rejectBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedApp(null)}
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
