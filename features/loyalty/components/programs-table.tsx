"use client";

import React, { useState } from "react";
import { LoyaltyProgram } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  LoyaltyProgram["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  active: {
    icon: CheckCircle,
    labelKey: "loyalty.active",
    color: "bg-green-100 text-green-800",
  },
  inactive: {
    icon: XCircle,
    labelKey: "loyalty.inactive",
    color: "bg-gray-100 text-gray-800",
  },
  draft: {
    icon: Clock,
    labelKey: "loyalty.draft",
    color: "bg-blue-100 text-blue-800",
  },
};

interface ProgramsTableProps {
  data: LoyaltyProgram[];
}

export function ProgramsTable({ data }: ProgramsTableProps) {
  const { t } = useTranslation();
  const p = "loyalty.programsPage";
  const [selectedProgram, setSelectedProgram] = useState<LoyaltyProgram | null>(
    null,
  );

  const columns: Column<LoyaltyProgram>[] = [
    {
      key: "name",
      header: t(`${p}.colName`),
      render: (program) => (
        <span className="font-medium text-foreground">{program.name}</span>
      ),
    },
    {
      key: "pointsPerDollar",
      header: t(`${p}.colPointsPerDollar`),
      render: (program) => (
        <span className="text-muted-foreground">{program.pointsPerDollar}</span>
      ),
    },
    {
      key: "minRedemption",
      header: t(`${p}.colMinRedemption`),
      render: (program) => (
        <span className="text-muted-foreground">
          {program.minRedemption.toLocaleString()}
        </span>
      ),
    },
    {
      key: "membersCount",
      header: t(`${p}.colMembers`),
      render: (program) => (
        <span className="text-muted-foreground">
          {program.membersCount.toLocaleString()}
        </span>
      ),
    },
    {
      key: "totalPointsIssued",
      header: t(`${p}.colTotalPoints`),
      render: (program) => (
        <span className="text-muted-foreground">
          {program.totalPointsIssued.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (program) => {
        const statusInfo = statusConfig[program.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: t(`${p}.colCreated`),
      render: (program) => (
        <span className="text-muted-foreground">
          {program.createdAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (program) => (
        <button
          onClick={() => setSelectedProgram(program)}
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
        keyExtractor={(program) => program.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedProgram.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.description`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedProgram.description}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colPointsPerDollar`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedProgram.pointsPerDollar}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colMembers`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedProgram.membersCount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.editBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedProgram(null)}
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
