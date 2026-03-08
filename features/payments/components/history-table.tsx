"use client";

import React, { useState } from "react";
import { Transaction } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Transaction["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  completed: {
    icon: CheckCircle,
    labelKey: "payments.completed",
    color: "bg-green-100 text-green-800",
  },
  pending: {
    icon: Clock,
    labelKey: "payments.pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  failed: {
    icon: XCircle,
    labelKey: "payments.failed",
    color: "bg-red-100 text-red-800",
  },
  refunded: {
    icon: RotateCcw,
    labelKey: "payments.refunded",
    color: "bg-blue-100 text-blue-800",
  },
};

const typeConfig: Record<
  Transaction["type"],
  { labelKey: string; color: string }
> = {
  payment: {
    labelKey: "payments.payment",
    color: "bg-green-100 text-green-800",
  },
  refund: {
    labelKey: "payments.refund",
    color: "bg-blue-100 text-blue-800",
  },
  payout: {
    labelKey: "payments.payout",
    color: "bg-purple-100 text-purple-800",
  },
  topup: {
    labelKey: "payments.topup",
    color: "bg-teal-100 text-teal-800",
  },
};

interface TransactionHistoryTableProps {
  data: Transaction[];
}

export function TransactionHistoryTable({
  data,
}: TransactionHistoryTableProps) {
  const { t } = useTranslation();
  const p = "payments.historyPage";
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const columns: Column<Transaction>[] = [
    {
      key: "reference",
      header: t(`${p}.colReference`),
      render: (tx) => (
        <span className="font-medium font-mono text-foreground">
          {tx.reference}
        </span>
      ),
    },
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (tx) => (
        <span className="font-medium text-foreground">{tx.userName}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (tx) => {
        const typeInfo = typeConfig[tx.type];
        return (
          <Badge variant="outline" className={typeInfo.color}>
            {t(typeInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "description",
      header: t(`${p}.colDescription`),
      render: (tx) => (
        <span className="text-muted-foreground">{tx.description}</span>
      ),
    },
    {
      key: "amount",
      header: t(`${p}.colAmount`),
      render: (tx) => (
        <span className="font-medium text-foreground">
          $
          {tx.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "method",
      header: t(`${p}.colMethod`),
      render: (tx) => (
        <span className="text-muted-foreground">{tx.method}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (tx) => {
        const statusInfo = statusConfig[tx.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: t(`${p}.colDate`),
      render: (tx) => (
        <span className="text-muted-foreground">
          {tx.createdAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (tx) => (
        <button
          onClick={() => setSelectedTransaction(tx)}
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
        keyExtractor={(tx) => tx.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {selectedTransaction.reference}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colUser`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedTransaction.userName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colDescription`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedTransaction.description}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colAmount`)}
                </p>
                <p className="text-sm font-medium">
                  $
                  {selectedTransaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {selectedTransaction.currency}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <p className="text-sm font-medium">
                  {t(statusConfig[selectedTransaction.status].labelKey)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.refundBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedTransaction(null)}
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
