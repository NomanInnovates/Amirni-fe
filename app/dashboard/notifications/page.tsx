"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: "info" | "alert" | "success";
  read: boolean;
  createdAt: Date;
}

const typeConfig: Record<
  NotificationItem["type"],
  { label: string; color: string; dot: string; icon: React.ElementType }
> = {
  info: {
    label: "Info",
    color: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
    icon: Info,
  },
  alert: {
    label: "Alert",
    color: "bg-red-100 text-red-800",
    dot: "bg-red-500",
    icon: AlertTriangle,
  },
  success: {
    label: "Success",
    color: "bg-green-100 text-green-800",
    dot: "bg-green-500",
    icon: CheckCircle,
  },
};

const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "New KYC Application",
    description: "John Doe submitted a new KYC application for review",
    type: "info",
    read: false,
    createdAt: new Date("2024-03-10T09:30:00"),
  },
  {
    id: "n2",
    title: "Shipment Delivered",
    description: "TRK123456789 was delivered successfully to Los Angeles",
    type: "success",
    read: false,
    createdAt: new Date("2024-03-10T09:15:00"),
  },
  {
    id: "n3",
    title: "Payment Failed",
    description: "Order ORD006 payment was declined by payment gateway",
    type: "alert",
    read: false,
    createdAt: new Date("2024-03-10T08:45:00"),
  },
  {
    id: "n4",
    title: "Vendor Suspended",
    description: "QuickByte Tech has been suspended due to policy violations",
    type: "alert",
    read: true,
    createdAt: new Date("2024-03-10T06:00:00"),
  },
  {
    id: "n5",
    title: "New Order Placed",
    description: "ORD012 placed by Ana Martinez — $27.99",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-10T05:30:00"),
  },
  {
    id: "n6",
    title: "KYC Approved",
    description: "Jane Smith's KYC application has been approved",
    type: "success",
    read: true,
    createdAt: new Date("2024-03-09T18:00:00"),
  },
  {
    id: "n7",
    title: "Low Stock Alert",
    description: "Scented Soy Candle Set has only 5 units remaining",
    type: "alert",
    read: true,
    createdAt: new Date("2024-03-09T16:20:00"),
  },
  {
    id: "n8",
    title: "Driver Verification Rejected",
    description: "Ahmed Hassan's vehicle registration was rejected",
    type: "alert",
    read: true,
    createdAt: new Date("2024-03-09T14:00:00"),
  },
  {
    id: "n9",
    title: "New Vendor Registered",
    description: "Luxury Leather Co. has joined the marketplace",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-09T11:30:00"),
  },
  {
    id: "n10",
    title: "Shipment Failed",
    description: "TRK112233445 delivery failed — recipient not available",
    type: "alert",
    read: true,
    createdAt: new Date("2024-03-09T10:00:00"),
  },
  {
    id: "n11",
    title: "Monthly Report Ready",
    description: "March 2024 logistics report has been generated",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-09T08:00:00"),
  },
  {
    id: "n12",
    title: "Order Delivered",
    description: "ORD007 has been delivered to Fatima Al-Rashid",
    type: "success",
    read: true,
    createdAt: new Date("2024-03-08T17:30:00"),
  },
  {
    id: "n13",
    title: "New KYC Document",
    description: "Sara Ali uploaded a new ID card for verification",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-08T15:00:00"),
  },
  {
    id: "n14",
    title: "Refund Processed",
    description: "Refund of $59.99 issued for order ORD006",
    type: "success",
    read: true,
    createdAt: new Date("2024-03-08T13:00:00"),
  },
  {
    id: "n15",
    title: "System Maintenance",
    description: "Scheduled maintenance completed successfully",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-08T06:00:00"),
  },
  {
    id: "n16",
    title: "Payment Received",
    description: "ORD011 payment of $289.98 received from Omar Khalil",
    type: "success",
    read: true,
    createdAt: new Date("2024-03-07T19:00:00"),
  },
  {
    id: "n17",
    title: "Low Stock Alert",
    description: "Smart Watch Pro has only 8 units remaining",
    type: "alert",
    read: true,
    createdAt: new Date("2024-03-07T14:00:00"),
  },
  {
    id: "n18",
    title: "New User Registration",
    description: "Maria Garcia registered a new account",
    type: "info",
    read: true,
    createdAt: new Date("2024-03-07T10:00:00"),
  },
];

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(notifications.length / PAGE_SIZE);
  const paged = notifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <GradientText>Notifications</GradientText>
          </h1>
          <p className="text-muted-foreground">
            View all system notifications and alerts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search notifications..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
          />
          <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
            <option>All Types</option>
            <option>Info</option>
            <option>Alert</option>
            <option>Success</option>
          </select>
          <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
            <option>All Status</option>
            <option>Unread</option>
            <option>Read</option>
          </select>
        </div>

        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {paged.map((n) => {
            const config = typeConfig[n.type];
            const Icon = config.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/40 ${!n.read ? "bg-[#7C4099]/5" : ""}`}
              >
                <div className={`mt-1 p-2 rounded-lg ${config.color}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-sm truncate ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}
                    >
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="size-2 rounded-full bg-[#7C4099] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {n.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-1">
                  {n.createdAt.toLocaleDateString()}
                </span>
              </div>
            );
          })}
          {paged.length === 0 && (
            <div className="px-5 py-12 text-center text-muted-foreground text-sm">
              No notifications
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-md border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`size-8 rounded-md text-sm font-medium ${p === page ? "bg-[#7C4099] text-white" : "border border-border hover:bg-secondary text-foreground"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-md border border-border hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
