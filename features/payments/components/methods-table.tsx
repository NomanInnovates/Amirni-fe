"use client";

import React, { useState } from "react";
import { PaymentMethod } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, Clock, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  PaymentMethod["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  active: {
    icon: CheckCircle,
    labelKey: "payments.active",
    color: "bg-green-100 text-green-800",
  },
  expired: {
    icon: Clock,
    labelKey: "payments.expired",
    color: "bg-yellow-100 text-yellow-800",
  },
  disabled: {
    icon: XCircle,
    labelKey: "payments.disabled",
    color: "bg-red-100 text-red-800",
  },
};

const typeConfig: Record<
  PaymentMethod["type"],
  { labelKey: string; color: string }
> = {
  credit_card: {
    labelKey: "payments.creditCard",
    color: "bg-blue-100 text-blue-800",
  },
  debit_card: {
    labelKey: "payments.debitCard",
    color: "bg-purple-100 text-purple-800",
  },
  wallet: {
    labelKey: "payments.wallet",
    color: "bg-teal-100 text-teal-800",
  },
  bank_transfer: {
    labelKey: "payments.bankTransfer",
    color: "bg-gray-100 text-gray-800",
  },
  cash: {
    labelKey: "payments.cash",
    color: "bg-orange-100 text-orange-800",
  },
};

interface PaymentMethodsTableProps {
  data: PaymentMethod[];
}

export function PaymentMethodsTable({ data }: PaymentMethodsTableProps) {
  const { t } = useTranslation();
  const p = "payments.methodsPage";
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );

  const columns: Column<PaymentMethod>[] = [
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (method) => (
        <span className="font-medium text-foreground">{method.userName}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (method) => {
        const typeInfo = typeConfig[method.type];
        return (
          <Badge variant="outline" className={typeInfo.color}>
            {t(typeInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "provider",
      header: t(`${p}.colProvider`),
      render: (method) => (
        <span className="text-muted-foreground">{method.provider}</span>
      ),
    },
    {
      key: "last4",
      header: t(`${p}.colLast4`),
      render: (method) => (
        <span className="text-muted-foreground font-mono">
          {method.last4 ? `**** ${method.last4}` : "—"}
        </span>
      ),
    },
    {
      key: "isDefault",
      header: t(`${p}.colDefault`),
      render: (method) => (
        <Badge
          variant="outline"
          className={
            method.isDefault
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {method.isDefault ? t(`${p}.yes`) : t(`${p}.no`)}
        </Badge>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (method) => {
        const statusInfo = statusConfig[method.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "addedAt",
      header: t(`${p}.colAddedDate`),
      render: (method) => (
        <span className="text-muted-foreground">
          {method.addedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (method) => (
        <button
          onClick={() => setSelectedMethod(method)}
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
        keyExtractor={(method) => method.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {selectedMethod.userName}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colType`)}
                </p>
                <p className="text-sm font-medium">
                  {t(typeConfig[selectedMethod.type].labelKey)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colProvider`)}
                </p>
                <p className="text-sm font-medium">{selectedMethod.provider}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <p className="text-sm font-medium">
                  {t(statusConfig[selectedMethod.status].labelKey)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.disableBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedMethod(null)}
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
