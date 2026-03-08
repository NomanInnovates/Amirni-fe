"use client";

import React, { useState } from "react";
import { LogisticsReport } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const typeConfig: Record<
  LogisticsReport["type"],
  { labelKey: string; color: string }
> = {
  daily: {
    labelKey: "logistics.reportsPage.daily",
    color: "bg-blue-100 text-blue-800",
  },
  weekly: {
    labelKey: "logistics.reportsPage.weekly",
    color: "bg-purple-100 text-purple-800",
  },
  monthly: {
    labelKey: "logistics.reportsPage.monthly",
    color: "bg-teal-100 text-teal-800",
  },
};

interface ReportsTableProps {
  data: LogisticsReport[];
}

export function ReportsTable({ data }: ReportsTableProps) {
  const { t } = useTranslation();
  const p = "logistics.reportsPage";
  const [selectedReport, setSelectedReport] = useState<LogisticsReport | null>(
    null,
  );

  const columns: Column<LogisticsReport>[] = [
    {
      key: "title",
      header: t(`${p}.colReport`),
      render: (r) => (
        <span className="font-medium text-foreground">{r.title}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (r) => (
        <Badge variant="outline" className={typeConfig[r.type].color}>
          {t(typeConfig[r.type].labelKey)}
        </Badge>
      ),
    },
    {
      key: "period",
      header: t(`${p}.colPeriod`),
      render: (r) => <span className="text-muted-foreground">{r.period}</span>,
    },
    {
      key: "totalShipments",
      header: t(`${p}.colShipments`),
      render: (r) => (
        <span className="text-muted-foreground">
          {r.totalShipments.toLocaleString()}
        </span>
      ),
    },
    {
      key: "deliveredOnTime",
      header: t(`${p}.colOnTime`),
      render: (r) => {
        const rate =
          r.totalShipments > 0
            ? Math.round((r.deliveredOnTime / r.totalShipments) * 100)
            : 0;
        return (
          <span className={rate >= 90 ? "text-green-600" : "text-yellow-600"}>
            {rate}%
          </span>
        );
      },
    },
    {
      key: "revenue",
      header: t(`${p}.colRevenue`),
      render: (r) => (
        <span className="text-muted-foreground font-medium">
          ${r.revenue.toLocaleString()}
        </span>
      ),
    },
    {
      key: "generatedAt",
      header: t(`${p}.colGenerated`),
      render: (r) => (
        <span className="text-muted-foreground">
          {r.generatedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (r) => (
        <button
          onClick={() => setSelectedReport(r)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#01A8A9]/10 text-[#01A8A9] hover:bg-[#01A8A9]/20 transition-colors text-sm"
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
        keyExtractor={(r) => r.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedReport.title}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.type`)}
                  </p>
                  <Badge
                    variant="outline"
                    className={typeConfig[selectedReport.type].color}
                  >
                    {t(typeConfig[selectedReport.type].labelKey)}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.period`)}
                  </p>
                  <p className="text-sm font-medium">{selectedReport.period}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.totalShipments`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedReport.totalShipments.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.deliveredOnTime`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedReport.deliveredOnTime.toLocaleString()} (
                    {Math.round(
                      (selectedReport.deliveredOnTime /
                        selectedReport.totalShipments) *
                        100,
                    )}
                    %)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.avgDeliveryDays`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedReport.avgDeliveryDays} days
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.revenue`)}
                  </p>
                  <p className="text-sm font-medium">
                    ${selectedReport.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="w-full px-4 py-2 rounded-md border border-border text-foreground hover:bg-secondary"
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
