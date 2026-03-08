"use client";

import React, { useState } from "react";
import { Shipment } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Shipment["status"],
  { labelKey: string; color: string }
> = {
  pending: {
    labelKey: "logistics.pending",
    color: "bg-gray-100 text-gray-800",
  },
  in_transit: {
    labelKey: "logistics.inTransit",
    color: "bg-blue-100 text-blue-800",
  },
  delivered: {
    labelKey: "logistics.delivered",
    color: "bg-green-100 text-green-800",
  },
  failed: { labelKey: "logistics.failed", color: "bg-red-100 text-red-800" },
};

interface ShipmentsTableProps {
  data: Shipment[];
}

export function ShipmentsTable({ data }: ShipmentsTableProps) {
  const { t } = useTranslation();
  const p = "logistics.shipmentsPage";
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );

  const columns: Column<Shipment>[] = [
    {
      key: "trackingNumber",
      header: t(`${p}.colTracking`),
      render: (s) => (
        <span className="font-medium text-foreground font-mono text-xs">
          {s.trackingNumber}
        </span>
      ),
    },
    {
      key: "origin",
      header: t(`${p}.colFrom`),
      render: (s) => (
        <span className="text-muted-foreground">{s.origin.city}</span>
      ),
    },
    {
      key: "destination",
      header: t(`${p}.colTo`),
      render: (s) => (
        <span className="text-muted-foreground">{s.destination.city}</span>
      ),
    },
    {
      key: "carrier",
      header: t(`${p}.colCarrier`),
      render: (s) => <span className="text-muted-foreground">{s.carrier}</span>,
    },
    {
      key: "weight",
      header: t(`${p}.colWeight`),
      render: (s) => (
        <span className="text-muted-foreground">{s.weight} kg</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (s) => (
        <Badge variant="outline" className={statusConfig[s.status].color}>
          {t(statusConfig[s.status].labelKey)}
        </Badge>
      ),
    },
    {
      key: "estimatedDelivery",
      header: t(`${p}.colEstDelivery`),
      render: (s) => (
        <span className="text-muted-foreground">
          {s.estimatedDelivery.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (s) => (
        <button
          onClick={() => setSelectedShipment(s)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#01A8A9]/10 text-[#01A8A9] hover:bg-[#01A8A9]/20 transition-colors text-sm"
        >
          <TrendingUp size={16} />
          <span className="hidden sm:inline">{t(`${p}.trackBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(s) => s.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {t(`${p}.shipmentDetails`)}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.trackingNumber`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedShipment.trackingNumber}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.carrier`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedShipment.carrier}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.cost`)}
                  </p>
                  <p className="text-sm font-medium">
                    ${selectedShipment.cost.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#7C4099] mt-1" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t(`${p}.origin`)}
                    </p>
                    <p className="text-sm font-medium">
                      {selectedShipment.origin.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedShipment.origin.city},{" "}
                      {selectedShipment.origin.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package className="text-[#01A8A9] mt-1" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t(`${p}.destination`)}
                    </p>
                    <p className="text-sm font-medium">
                      {selectedShipment.destination.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedShipment.destination.city},{" "}
                      {selectedShipment.destination.country}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.estimatedDelivery`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedShipment.estimatedDelivery.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.updateStatusBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedShipment(null)}
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
