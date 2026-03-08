"use client";

import React, { useState } from "react";
import { Booking } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Calendar, Play, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Booking["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  pending: {
    icon: Clock,
    labelKey: "marketplace.bookingsPending",
    color: "bg-yellow-100 text-yellow-800",
  },
  scheduled: {
    icon: Calendar,
    labelKey: "marketplace.bookingsScheduled",
    color: "bg-blue-100 text-blue-800",
  },
  inprogress: {
    icon: Play,
    labelKey: "marketplace.bookingsInprogress",
    color: "bg-purple-100 text-purple-800",
  },
  completed: {
    icon: CheckCircle,
    labelKey: "marketplace.bookingsCompleted",
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    icon: XCircle,
    labelKey: "marketplace.bookingsCancelled",
    color: "bg-red-100 text-red-800",
  },
};

interface BookingsTableProps {
  data: Booking[];
}

export function BookingsTable({ data }: BookingsTableProps) {
  const { t } = useTranslation();
  const p = "marketplace.bookingsPage";
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const columns: Column<Booking>[] = [
    {
      key: "id",
      header: t(`${p}.colBookingId`),
      render: (booking) => (
        <span className="font-medium text-foreground">{booking.id}</span>
      ),
    },
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (booking) => (
        <span className="text-muted-foreground">{booking.userName}</span>
      ),
    },
    {
      key: "serviceOrProduct",
      header: t(`${p}.colServiceProduct`),
      render: (booking) => (
        <span className="text-muted-foreground">
          {booking.serviceOrProduct}
        </span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (booking) => (
        <Badge
          variant="outline"
          className={
            booking.type === "service"
              ? "bg-blue-100 text-blue-800"
              : "bg-orange-100 text-orange-800"
          }
        >
          {t(
            `marketplace.bookingsType${booking.type === "service" ? "Service" : "Product"}`,
          )}
        </Badge>
      ),
    },
    {
      key: "scheduledAt",
      header: t(`${p}.colScheduled`),
      render: (booking) => (
        <span className="text-muted-foreground">
          {booking.scheduledAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "amount",
      header: t(`${p}.colAmount`),
      render: (booking) => (
        <span className="font-medium text-foreground">
          ${booking.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (booking) => {
        const statusInfo = statusConfig[booking.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (booking) => (
        <button
          onClick={() => setSelectedBooking(booking)}
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
        keyExtractor={(booking) => booking.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {t(`${p}.bookingDetails`)}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colUser`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedBooking.userName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colServiceProduct`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedBooking.serviceOrProduct}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.vendor`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedBooking.vendorName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colAmount`)}
                </p>
                <p className="text-sm font-medium">
                  ${selectedBooking.amount.toFixed(2)}
                </p>
              </div>
              {selectedBooking.notes && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.notes`)}
                  </p>
                  <p className="text-sm font-medium">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.approveBtn`)}
              </GradientButton>
              <GradientButton variant="outline" className="flex-1">
                {t(`${p}.cancelBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedBooking(null)}
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
