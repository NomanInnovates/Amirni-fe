"use client";

import React, { useState } from "react";
import { UserReferral } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, UserPlus, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  UserReferral["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  pending: {
    icon: Clock,
    labelKey: "users.pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  registered: {
    icon: UserPlus,
    labelKey: "users.registered",
    color: "bg-blue-100 text-blue-800",
  },
  completed: {
    icon: CheckCircle,
    labelKey: "users.completed",
    color: "bg-green-100 text-green-800",
  },
};

interface ReferralsTableProps {
  data: UserReferral[];
}

export function ReferralsTable({ data }: ReferralsTableProps) {
  const { t } = useTranslation();
  const p = "users.referralsPage";
  const [selectedReferral, setSelectedReferral] = useState<UserReferral | null>(
    null,
  );

  const columns: Column<UserReferral>[] = [
    {
      key: "referrerName",
      header: t(`${p}.colReferrer`),
      render: (ref) => (
        <span className="font-medium text-foreground">{ref.referrerName}</span>
      ),
    },
    {
      key: "referredName",
      header: t(`${p}.colReferred`),
      render: (ref) => (
        <span className="text-muted-foreground">{ref.referredName}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (ref) => {
        const statusInfo = statusConfig[ref.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "reward",
      header: t(`${p}.colReward`),
      render: (ref) => (
        <span className="text-muted-foreground">{ref.reward}</span>
      ),
    },
    {
      key: "referredAt",
      header: t(`${p}.colDate`),
      render: (ref) => (
        <span className="text-muted-foreground">
          {ref.referredAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (ref) => (
        <button
          onClick={() => setSelectedReferral(ref)}
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
        keyExtractor={(ref) => ref.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedReferral && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {t(`${p}.referralDetails`)}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colReferrer`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedReferral.referrerName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colReferred`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedReferral.referredName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.referredEmail`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedReferral.referredEmail}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedReferral.status].color}
                >
                  {t(statusConfig[selectedReferral.status].labelKey)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colReward`)}
                </p>
                <p className="text-sm font-medium">{selectedReferral.reward}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colDate`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedReferral.referredAt.toLocaleDateString()}
                </p>
              </div>
              {selectedReferral.completedAt && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.completedAt`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedReferral.completedAt.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.viewReferrer`)}
              </GradientButton>
              <button
                onClick={() => setSelectedReferral(null)}
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
