"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { StatCard } from "@/components/ui/stat-card";
import { TrackingTable } from "@/features/logistics/components/tracking-table";
import { TrackingEvent } from "@/features/logistics/types";
import { MapPin, Navigation, PackageCheck, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

const trackingEvents: TrackingEvent[] = [
  {
    id: "evt1",
    shipmentId: "SHP001",
    trackingNumber: "TRK123456789",
    status: "in_transit",
    location: "Memphis, TN — FedEx Hub",
    timestamp: new Date("2024-03-07T14:30:00"),
    notes: "Package scanned at sorting facility",
  },
  {
    id: "evt2",
    shipmentId: "SHP001",
    trackingNumber: "TRK123456789",
    status: "picked_up",
    location: "New York, NY",
    timestamp: new Date("2024-03-05T09:15:00"),
    notes: "Package picked up from sender",
  },
  {
    id: "evt3",
    shipmentId: "SHP002",
    trackingNumber: "TRK987654321",
    status: "delivered",
    location: "Miami, FL",
    timestamp: new Date("2024-03-08T11:45:00"),
    notes: "Delivered — signed by recipient",
  },
  {
    id: "evt4",
    shipmentId: "SHP002",
    trackingNumber: "TRK987654321",
    status: "out_for_delivery",
    location: "Miami, FL — Local Depot",
    timestamp: new Date("2024-03-08T07:00:00"),
  },
  {
    id: "evt5",
    shipmentId: "SHP004",
    trackingNumber: "TRK112233445",
    status: "exception",
    location: "Denver, CO",
    timestamp: new Date("2024-03-11T16:20:00"),
    notes: "Delivery attempted — recipient not available",
  },
  {
    id: "evt6",
    shipmentId: "SHP003",
    trackingNumber: "TRK456789123",
    status: "picked_up",
    location: "Houston, TX",
    timestamp: new Date("2024-03-06T10:00:00"),
    notes: "Package picked up by DHL courier",
  },
];

export default function TrackingPage() {
  const { t } = useTranslation();
  const p = "logistics.trackingPage";

  const stats = [
    {
      title: t(`${p}.totalEvents`),
      value: "12,450",
      icon: MapPin,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.inTransit`),
      value: "3,210",
      icon: Navigation,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t(`${p}.delivered`),
      value: "8,920",
      icon: PackageCheck,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.exceptions`),
      value: "320",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <GradientText>{t(`${p}.heading`)}</GradientText>
          </h1>
          <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t(`${p}.searchPlaceholder`)}
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#01A8A9]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#01A8A9]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("logistics.pickedUp")}</option>
              <option>{t("logistics.inTransit")}</option>
              <option>{t("logistics.outForDelivery")}</option>
              <option>{t("logistics.delivered")}</option>
              <option>{t("logistics.exception")}</option>
            </select>
          </div>

          <TrackingTable data={trackingEvents} />
        </div>
      </div>
    </DashboardLayout>
  );
}
