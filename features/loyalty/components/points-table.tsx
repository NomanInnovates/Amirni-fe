"use client";

import React, { useState } from "react";
import { PointsVoucher } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, Clock, Ban } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  PointsVoucher["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  active: {
    icon: CheckCircle,
    labelKey: "loyalty.active",
    color: "bg-green-100 text-green-800",
  },
  used: {
    icon: Clock,
    labelKey: "loyalty.used",
    color: "bg-gray-100 text-gray-800",
  },
  expired: {
    icon: XCircle,
    labelKey: "loyalty.expired",
    color: "bg-red-100 text-red-800",
  },
  revoked: {
    icon: Ban,
    labelKey: "loyalty.revoked",
    color: "bg-red-100 text-red-800",
  },
};

const typeConfig: Record<
  PointsVoucher["type"],
  { labelKey: string; color: string }
> = {
  points: {
    labelKey: "loyalty.points",
    color: "bg-purple-100 text-purple-800",
  },
  voucher: {
    labelKey: "loyalty.voucher",
    color: "bg-teal-100 text-teal-800",
  },
  coupon: {
    labelKey: "loyalty.coupon",
    color: "bg-orange-100 text-orange-800",
  },
};

interface PointsTableProps {
  data: PointsVoucher[];
}

export function PointsTable({ data }: PointsTableProps) {
  const { t } = useTranslation();
  const p = "loyalty.pointsPage";
  const [selectedVoucher, setSelectedVoucher] = useState<PointsVoucher | null>(
    null,
  );

  const columns: Column<PointsVoucher>[] = [
    {
      key: "code",
      header: t(`${p}.colCode`),
      render: (voucher) => (
        <span className="font-medium text-foreground font-mono">
          {voucher.code}
        </span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (voucher) => {
        const typeInfo = typeConfig[voucher.type];
        return (
          <Badge variant="outline" className={typeInfo.color}>
            {t(typeInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "value",
      header: t(`${p}.colValue`),
      render: (voucher) => (
        <span className="text-muted-foreground">
          {voucher.value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (voucher) => (
        <span className="text-muted-foreground">{voucher.userName ?? "—"}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (voucher) => {
        const statusInfo = statusConfig[voucher.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "expiresAt",
      header: t(`${p}.colExpires`),
      render: (voucher) => (
        <span className="text-muted-foreground">
          {voucher.expiresAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (voucher) => (
        <button
          onClick={() => setSelectedVoucher(voucher)}
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
        keyExtractor={(voucher) => voucher.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedVoucher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedVoucher.code}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.description`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedVoucher.description}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colValue`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedVoucher.value.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colExpires`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedVoucher.expiresAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.revokeBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedVoucher(null)}
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
