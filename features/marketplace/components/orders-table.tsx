"use client";

import React, { useState } from "react";
import { Order } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Order["status"],
  { labelKey: string; color: string }
> = {
  pending: {
    labelKey: "marketplace.pending",
    color: "bg-gray-100 text-gray-800",
  },
  confirmed: {
    labelKey: "marketplace.confirmed",
    color: "bg-blue-100 text-blue-800",
  },
  shipped: {
    labelKey: "marketplace.shipped",
    color: "bg-cyan-100 text-cyan-800",
  },
  delivered: {
    labelKey: "marketplace.delivered",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    labelKey: "marketplace.cancelled",
    color: "bg-red-100 text-red-800",
  },
};

const paymentConfig: Record<
  Order["paymentStatus"],
  { labelKey: string; color: string }
> = {
  pending: {
    labelKey: "marketplace.pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  paid: { labelKey: "marketplace.paid", color: "bg-green-100 text-green-800" },
  failed: { labelKey: "marketplace.failed", color: "bg-red-100 text-red-800" },
};

interface OrdersTableProps {
  data: Order[];
}

export function OrdersTable({ data }: OrdersTableProps) {
  const { t } = useTranslation();
  const p = "marketplace.ordersPage";
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: Column<Order>[] = [
    {
      key: "id",
      header: t(`${p}.colOrderId`),
      render: (o) => (
        <span className="font-medium text-foreground font-mono text-xs">
          {o.id}
        </span>
      ),
    },
    {
      key: "buyerName",
      header: t(`${p}.colBuyer`),
      render: (o) => (
        <span className="text-muted-foreground">{o.buyerName}</span>
      ),
    },
    {
      key: "items",
      header: t(`${p}.colItems`),
      render: (o) => (
        <span className="text-muted-foreground">
          {o.products.length} item{o.products.length > 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: t(`${p}.colAmount`),
      render: (o) => (
        <span className="font-medium text-foreground">
          ${o.totalAmount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (o) => (
        <Badge variant="outline" className={statusConfig[o.status].color}>
          {t(statusConfig[o.status].labelKey)}
        </Badge>
      ),
    },
    {
      key: "paymentStatus",
      header: t(`${p}.colPayment`),
      render: (o) => (
        <Badge
          variant="outline"
          className={paymentConfig[o.paymentStatus].color}
        >
          {t(paymentConfig[o.paymentStatus].labelKey)}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: t(`${p}.colDate`),
      render: (o) => (
        <span className="text-muted-foreground">
          {o.createdAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (o) => (
        <button
          onClick={() => setSelectedOrder(o)}
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
        keyExtractor={(o) => o.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{t(`${p}.orderDetails`)}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.orderId`)}
                  </p>
                  <p className="text-sm font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.buyer`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedOrder.buyerName}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.orderStatus`)}
                  </p>
                  <Badge
                    variant="outline"
                    className={statusConfig[selectedOrder.status].color}
                  >
                    {t(statusConfig[selectedOrder.status].labelKey)}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.payment`)}
                  </p>
                  <Badge
                    variant="outline"
                    className={paymentConfig[selectedOrder.paymentStatus].color}
                  >
                    {t(paymentConfig[selectedOrder.paymentStatus].labelKey)}
                  </Badge>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium mb-3">{t(`${p}.items`)}</p>
                <div className="space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-secondary/50 rounded"
                    >
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t(`${p}.qty`)}: {product.quantity} x $
                          {product.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <p className="text-sm font-medium">{t(`${p}.total`)}</p>
                <p className="text-sm font-bold">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.updateStatusBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedOrder(null)}
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
