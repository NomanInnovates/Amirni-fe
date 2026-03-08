"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { BookingsTable } from "@/features/marketplace/components/bookings-table";
import { Booking } from "@/features/marketplace/types";
import { BarChart3, Clock, Play, CheckCircle, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialBookings: Booking[] = [
  {
    id: "BK-001",
    userId: "user1",
    userName: "John Doe",
    serviceOrProduct: "Airport Transfer",
    type: "service",
    status: "pending",
    scheduledAt: new Date("2024-03-15T10:00:00"),
    amount: 85.0,
    vendorName: "Quick Rides LLC",
    notes: "Terminal 3 pickup",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "BK-002",
    userId: "user2",
    userName: "Jane Smith",
    serviceOrProduct: "Office Furniture Set",
    type: "product",
    status: "scheduled",
    scheduledAt: new Date("2024-03-16T14:00:00"),
    amount: 1250.0,
    vendorName: "Home & Office Co.",
    createdAt: new Date("2024-03-09"),
  },
  {
    id: "BK-003",
    userId: "user3",
    userName: "Ahmed Hassan",
    serviceOrProduct: "Home Cleaning",
    type: "service",
    status: "inprogress",
    scheduledAt: new Date("2024-03-14T09:00:00"),
    amount: 120.0,
    vendorName: "CleanPro Services",
    createdAt: new Date("2024-03-08"),
  },
  {
    id: "BK-004",
    userId: "user4",
    userName: "Sara Ali",
    serviceOrProduct: "Electronics Bundle",
    type: "product",
    status: "completed",
    scheduledAt: new Date("2024-03-12T11:00:00"),
    amount: 599.99,
    vendorName: "Tech World",
    createdAt: new Date("2024-03-07"),
  },
  {
    id: "BK-005",
    userId: "user5",
    userName: "Michael Brown",
    serviceOrProduct: "Car Wash Premium",
    type: "service",
    status: "cancelled",
    scheduledAt: new Date("2024-03-13T16:00:00"),
    amount: 45.0,
    vendorName: "Sparkle Auto Care",
    notes: "Customer cancelled",
    createdAt: new Date("2024-03-06"),
  },
];

export default function MarketplaceBookingsPage() {
  const { t } = useTranslation();
  const p = "marketplace.bookingsPage";

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    serviceOrProduct: "",
    type: "service" as Booking["type"],
    scheduledAt: "",
    amount: "",
    vendorName: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `BK-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: form.userName,
      serviceOrProduct: form.serviceOrProduct,
      type: form.type,
      status: "pending",
      scheduledAt: new Date(form.scheduledAt),
      amount: parseFloat(form.amount) || 0,
      vendorName: form.vendorName,
      notes: form.notes || undefined,
      createdAt: new Date(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    setForm({
      userName: "",
      serviceOrProduct: "",
      type: "service",
      scheduledAt: "",
      amount: "",
      vendorName: "",
      notes: "",
    });
    setShowCreate(false);
  };

  const stats = [
    {
      title: t(`${p}.totalBookings`),
      value: "1,892",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.pending`),
      value: "245",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.inProgress`),
      value: "128",
      icon: Play,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: t(`${p}.completed`),
      value: "1,320",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowCreate(true)}>
            <Plus size={16} className="me-2" />
            {t(`${p}.addBooking`)}
          </GradientButton>
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
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("marketplace.bookingsPending")}</option>
              <option>{t("marketplace.bookingsScheduled")}</option>
              <option>{t("marketplace.bookingsInprogress")}</option>
              <option>{t("marketplace.bookingsCompleted")}</option>
              <option>{t("marketplace.bookingsCancelled")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t("marketplace.bookingsTypeService")}</option>
              <option>{t("marketplace.bookingsTypeProduct")}</option>
            </select>
          </div>

          <BookingsTable data={bookings} />
        </div>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formUserName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.userName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, userName: e.target.value }))
                  }
                  placeholder={t(`${p}.formUserNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formVendorName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.vendorName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, vendorName: e.target.value }))
                  }
                  placeholder={t(`${p}.formVendorNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formServiceOrProduct`)}
              </label>
              <input
                type="text"
                required
                value={form.serviceOrProduct}
                onChange={(e) =>
                  setForm((f) => ({ ...f, serviceOrProduct: e.target.value }))
                }
                placeholder={t(`${p}.formServiceOrProductPlaceholder`)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formType`)}
                </label>
                <select
                  required
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: e.target.value as Booking["type"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="service">
                    {t("marketplace.bookingsTypeService")}
                  </option>
                  <option value="product">
                    {t("marketplace.bookingsTypeProduct")}
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formScheduledAt`)}
                </label>
                <input
                  type="datetime-local"
                  required
                  value={form.scheduledAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, scheduledAt: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formAmount`)}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder={t(`${p}.formAmountPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formNotes`)}
              </label>
              <textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder={t(`${p}.formNotesPlaceholder`)}
                rows={3}
                className={inputClass}
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(`${p}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${p}.submitBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
