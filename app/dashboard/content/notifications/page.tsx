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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { NotificationTypesTable } from "@/features/content/components/notification-types-table";
import { NotificationType } from "@/features/content/types";
import { BarChart3, CheckCircle, Bell, Mail, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialNotificationTypes: NotificationType[] = [
  {
    id: "1",
    name: "Order Confirmation",
    key: "order_confirmation",
    description:
      "Sent to customers when their order is successfully placed and confirmed",
    channel: "push",
    category: "order",
    isEnabled: true,
    template:
      "Your order #{{orderId}} has been confirmed. Estimated delivery: {{deliveryDate}}.",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "Payment Receipt",
    key: "payment_receipt",
    description:
      "Email receipt sent after successful payment processing for orders",
    channel: "email",
    category: "payment",
    isEnabled: true,
    template:
      "Payment of {{amount}} received for order #{{orderId}}. Thank you!",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "Booking Reminder",
    key: "booking_reminder",
    description:
      "SMS reminder sent 24 hours before a scheduled booking appointment",
    channel: "sms",
    category: "booking",
    isEnabled: true,
    template:
      "Reminder: Your booking #{{bookingId}} is scheduled for {{dateTime}}.",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "4",
    name: "Promotional Offer",
    key: "promo_offer",
    description:
      "In-app notification for promotional offers, discounts, and special deals",
    channel: "in_app",
    category: "promotion",
    isEnabled: false,
    template:
      "Special offer! Get {{discount}}% off on {{category}}. Valid until {{expiryDate}}.",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "5",
    name: "System Maintenance",
    key: "system_maintenance",
    description:
      "Push notification alerting users about scheduled system maintenance windows",
    channel: "push",
    category: "system",
    isEnabled: true,
    template:
      "Scheduled maintenance on {{date}} from {{startTime}} to {{endTime}}. Some features may be unavailable.",
    createdAt: new Date("2024-04-01"),
  },
];

export default function NotificationTypesPage() {
  const { t } = useTranslation();
  const p = "content.notificationsPage";

  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>(
    initialNotificationTypes,
  );
  const [showCreate, setShowCreate] = useState(false);
  const [deleteNt, setDeleteNt] = useState<NotificationType | null>(null);
  const [form, setForm] = useState({
    name: "",
    key: "",
    description: "",
    channel: "push" as NotificationType["channel"],
    category: "order" as NotificationType["category"],
    isEnabled: true,
    template: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNt: NotificationType = {
      id: `nt-${Date.now()}`,
      name: form.name,
      key: form.key,
      description: form.description,
      channel: form.channel,
      category: form.category,
      isEnabled: form.isEnabled,
      template: form.template,
      createdAt: new Date(),
    };
    setNotificationTypes((prev) => [newNt, ...prev]);
    setForm({
      name: "",
      key: "",
      description: "",
      channel: "push",
      category: "order",
      isEnabled: true,
      template: "",
    });
    setShowCreate(false);
  };

  const handleDelete = () => {
    if (deleteNt) {
      setNotificationTypes((prev) => prev.filter((nt) => nt.id !== deleteNt.id));
      setDeleteNt(null);
    }
  };

  const stats = [
    {
      title: t(`${p}.totalTypes`),
      value: "24",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.enabled`),
      value: "20",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.pushNotifications`),
      value: "8",
      icon: Bell,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t(`${p}.emailNotifications`),
      value: "6",
      icon: Mail,
      color: "from-purple-500 to-pink-500",
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
            {t(`${p}.createBtn`)}
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
              <option>{t(`${p}.allChannels`)}</option>
              <option>{t("content.channelPush")}</option>
              <option>{t("content.channelEmail")}</option>
              <option>{t("content.channelSms")}</option>
              <option>{t("content.channelInApp")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allCategories`)}</option>
              <option>{t(`${p}.order`)}</option>
              <option>{t(`${p}.booking`)}</option>
              <option>{t(`${p}.payment`)}</option>
              <option>{t(`${p}.promotion`)}</option>
              <option>{t(`${p}.system`)}</option>
            </select>
          </div>

          <NotificationTypesTable
            data={notificationTypes}
            onDelete={(nt: NotificationType) => setDeleteNt(nt)}
          />
        </div>
      </div>

      {/* Create Notification Type Modal */}
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
                  {t(`${p}.formName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder={t(`${p}.formNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formKey`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.key}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, key: e.target.value }))
                  }
                  placeholder={t(`${p}.formKeyPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formDescription`)}
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder={t(`${p}.formDescriptionPlaceholder`)}
                rows={2}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formChannel`)}
                </label>
                <select
                  required
                  value={form.channel}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      channel: e.target.value as NotificationType["channel"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="push">{t("content.channelPush")}</option>
                  <option value="email">{t("content.channelEmail")}</option>
                  <option value="sms">{t("content.channelSms")}</option>
                  <option value="in_app">{t("content.channelInApp")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formCategory`)}
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value as NotificationType["category"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="order">{t(`${p}.order`)}</option>
                  <option value="booking">{t(`${p}.booking`)}</option>
                  <option value="payment">{t(`${p}.payment`)}</option>
                  <option value="promotion">{t(`${p}.promotion`)}</option>
                  <option value="system">{t(`${p}.system`)}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formEnabled`)}
                </label>
                <select
                  value={form.isEnabled ? "true" : "false"}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isEnabled: e.target.value === "true",
                    }))
                  }
                  className={inputClass}
                >
                  <option value="true">{t(`${p}.yes`)}</option>
                  <option value="false">{t(`${p}.no`)}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formTemplate`)}
              </label>
              <textarea
                required
                value={form.template}
                onChange={(e) =>
                  setForm((f) => ({ ...f, template: e.target.value }))
                }
                placeholder={t(`${p}.formTemplatePlaceholder`)}
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

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteNt}
        onOpenChange={(open) => !open && setDeleteNt(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t(`${p}.deleteTitle`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(`${p}.deleteDescription`, { name: deleteNt?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              {t(`${p}.cancelBtn`)}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-800 cursor-pointer"
            >
              {t(`${p}.deleteBtn`)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
