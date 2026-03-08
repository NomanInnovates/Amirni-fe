"use client";

import React, { useState } from "react";
import { UserAddress } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, Home, Briefcase, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const typeConfig: Record<
  UserAddress["type"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  home: {
    icon: Home,
    labelKey: "users.home",
    color: "bg-blue-100 text-blue-800",
  },
  work: {
    icon: Briefcase,
    labelKey: "users.work",
    color: "bg-purple-100 text-purple-800",
  },
  other: {
    icon: MapPin,
    labelKey: "users.other",
    color: "bg-gray-100 text-gray-800",
  },
};

interface AddressesTableProps {
  data: UserAddress[];
}

export function AddressesTable({ data }: AddressesTableProps) {
  const { t } = useTranslation();
  const p = "users.addressesPage";
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null,
  );

  const columns: Column<UserAddress>[] = [
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (addr) => (
        <span className="font-medium text-foreground">{addr.userName}</span>
      ),
    },
    {
      key: "label",
      header: t(`${p}.colLabel`),
      render: (addr) => (
        <span className="text-muted-foreground">{addr.label}</span>
      ),
    },
    {
      key: "address",
      header: t(`${p}.colAddress`),
      render: (addr) => (
        <span className="text-muted-foreground">{addr.addressLine1}</span>
      ),
    },
    {
      key: "city",
      header: t(`${p}.colCity`),
      render: (addr) => (
        <span className="text-muted-foreground">{addr.city}</span>
      ),
    },
    {
      key: "country",
      header: t(`${p}.colCountry`),
      render: (addr) => (
        <span className="text-muted-foreground">{addr.country}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (addr) => {
        const typeInfo = typeConfig[addr.type];
        return (
          <Badge variant="outline" className={typeInfo.color}>
            {t(typeInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "isDefault",
      header: t(`${p}.colDefault`),
      render: (addr) => (
        <Badge
          variant="outline"
          className={
            addr.isDefault
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {addr.isDefault ? t(`${p}.yes`) : t(`${p}.no`)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (addr) => (
        <button
          onClick={() => setSelectedAddress(addr)}
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
        keyExtractor={(addr) => addr.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedAddress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedAddress.label}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colUser`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedAddress.userName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colAddress`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedAddress.addressLine1}
                  {selectedAddress.addressLine2 &&
                    `, ${selectedAddress.addressLine2}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colCity`)}
                </p>
                <p className="text-sm font-medium">{selectedAddress.city}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colCountry`)}
                </p>
                <p className="text-sm font-medium">{selectedAddress.country}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.postalCode`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedAddress.postalCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colType`)}
                </p>
                <Badge
                  variant="outline"
                  className={typeConfig[selectedAddress.type].color}
                >
                  {t(typeConfig[selectedAddress.type].labelKey)}
                </Badge>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.editBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedAddress(null)}
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
