"use client";

import React, { useState } from "react";
import { Vendor } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, User, Building } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Vendor["status"],
  { labelKey: string; color: string }
> = {
  active: {
    labelKey: "marketplace.active",
    color: "bg-green-100 text-green-800",
  },
  inactive: {
    labelKey: "marketplace.inactive",
    color: "bg-gray-100 text-gray-800",
  },
  suspended: {
    labelKey: "marketplace.suspended",
    color: "bg-red-100 text-red-800",
  },
};

const businessTypeConfig: Record<
  Vendor["businessType"],
  { labelKey: string; icon: React.ElementType }
> = {
  individual: { labelKey: "marketplace.individual", icon: User },
  company: { labelKey: "marketplace.company", icon: Building },
};

interface VendorsTableProps {
  data: Vendor[];
}

export function VendorsTable({ data }: VendorsTableProps) {
  const { t } = useTranslation();
  const p = "marketplace.vendorsPage";
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const columns: Column<Vendor>[] = [
    {
      key: "name",
      header: t(`${p}.colVendor`),
      render: (v) => (
        <span className="font-medium text-foreground">{v.name}</span>
      ),
    },
    {
      key: "businessType",
      header: t(`${p}.colType`),
      render: (v) => {
        const config = businessTypeConfig[v.businessType];
        const Icon = config.icon;
        return (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Icon size={16} />
            {t(config.labelKey)}
          </span>
        );
      },
    },
    {
      key: "category",
      header: t(`${p}.colCategory`),
      render: (v) => (
        <span className="text-muted-foreground">{v.category}</span>
      ),
    },
    {
      key: "totalProducts",
      header: t(`${p}.colProducts`),
      render: (v) => (
        <span className="text-muted-foreground">{v.totalProducts}</span>
      ),
    },
    {
      key: "totalOrders",
      header: t(`${p}.colOrders`),
      render: (v) => (
        <span className="text-muted-foreground">{v.totalOrders}</span>
      ),
    },
    {
      key: "revenue",
      header: t(`${p}.colRevenue`),
      render: (v) => (
        <span className="font-medium text-foreground">
          ${v.revenue.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (v) => (
        <Badge variant="outline" className={statusConfig[v.status].color}>
          {t(statusConfig[v.status].labelKey)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (v) => (
        <button
          onClick={() => setSelectedVendor(v)}
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
        keyExtractor={(v) => v.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedVendor.name}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.email`)}
                  </p>
                  <p className="text-sm font-medium">{selectedVendor.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.phone`)}
                  </p>
                  <p className="text-sm font-medium">{selectedVendor.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.businessType`)}
                  </p>
                  <p className="text-sm font-medium">
                    {t(
                      businessTypeConfig[selectedVendor.businessType].labelKey,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.category`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedVendor.category}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.products`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedVendor.totalProducts}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.orders`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedVendor.totalOrders}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.revenue`)}
                  </p>
                  <p className="text-sm font-medium">
                    ${selectedVendor.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.status`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedVendor.status].color}
                >
                  {t(statusConfig[selectedVendor.status].labelKey)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.joined`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedVendor.joinedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.editVendorBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedVendor(null)}
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
