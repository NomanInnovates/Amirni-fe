"use client";

import React, { useState } from "react";
import { TrackingEvent } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  TrackingEvent["status"],
  { labelKey: string; color: string }
> = {
  picked_up: {
    labelKey: "logistics.pickedUp",
    color: "bg-purple-100 text-purple-800",
  },
  in_transit: {
    labelKey: "logistics.inTransit",
    color: "bg-blue-100 text-blue-800",
  },
  out_for_delivery: {
    labelKey: "logistics.outForDelivery",
    color: "bg-yellow-100 text-yellow-800",
  },
  delivered: {
    labelKey: "logistics.delivered",
    color: "bg-green-100 text-green-800",
  },
  exception: {
    labelKey: "logistics.exception",
    color: "bg-red-100 text-red-800",
  },
};

interface TrackingTableProps {
  data: TrackingEvent[];
}

export function TrackingTable({ data }: TrackingTableProps) {
  const { t } = useTranslation();
  const p = "logistics.trackingPage";
  const [selectedEvent, setSelectedEvent] = useState<TrackingEvent | null>(
    null,
  );

  const columns: Column<TrackingEvent>[] = [
    {
      key: "trackingNumber",
      header: t(`${p}.colTracking`),
      render: (e) => (
        <span className="font-medium text-foreground font-mono text-xs">
          {e.trackingNumber}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (e) => (
        <Badge variant="outline" className={statusConfig[e.status].color}>
          {t(statusConfig[e.status].labelKey)}
        </Badge>
      ),
    },
    {
      key: "location",
      header: t(`${p}.colLocation`),
      render: (e) => (
        <span className="text-muted-foreground">{e.location}</span>
      ),
    },
    {
      key: "timestamp",
      header: t(`${p}.colDateTime`),
      render: (e) => (
        <span className="text-muted-foreground">
          {e.timestamp.toLocaleString()}
        </span>
      ),
    },
    {
      key: "notes",
      header: t(`${p}.colNotes`),
      render: (e) => (
        <span className="text-muted-foreground truncate max-w-[200px] inline-block">
          {e.notes ?? "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (e) => (
        <button
          onClick={() => setSelectedEvent(e)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#01A8A9]/10 text-[#01A8A9] hover:bg-[#01A8A9]/20 transition-colors text-sm"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">{t(`${p}.detailsBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(e) => e.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{t(`${p}.eventDetails`)}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.trackingNumber`)}
                </p>
                <p className="text-sm font-medium font-mono">
                  {selectedEvent.trackingNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.status`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedEvent.status].color}
                >
                  {t(statusConfig[selectedEvent.status].labelKey)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.location`)}
                </p>
                <p className="text-sm font-medium">{selectedEvent.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.dateTime`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedEvent.timestamp.toLocaleString()}
                </p>
              </div>
              {selectedEvent.notes && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.notes`)}
                  </p>
                  <p className="text-sm font-medium">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
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
