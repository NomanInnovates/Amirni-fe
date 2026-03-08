"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { PaymentMethodsTable } from "@/features/payments/components/methods-table";
import { PaymentMethod } from "@/features/payments/types";
import { CreditCard, Wallet, BarChart3, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    type: "credit_card",
    provider: "Visa",
    last4: "4242",
    isDefault: true,
    status: "active",
    addedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    type: "wallet",
    provider: "Apple Pay",
    isDefault: false,
    status: "active",
    addedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    userId: "user3",
    userName: "Ahmed Hassan",
    type: "debit_card",
    provider: "Mastercard",
    last4: "8910",
    isDefault: true,
    status: "expired",
    addedAt: new Date("2023-11-05"),
  },
  {
    id: "4",
    userId: "user4",
    userName: "Maria Garcia",
    type: "bank_transfer",
    provider: "Emirates NBD",
    isDefault: false,
    status: "active",
    addedAt: new Date("2024-03-10"),
  },
  {
    id: "5",
    userId: "user5",
    userName: "Li Wei",
    type: "cash",
    provider: "Cash on Delivery",
    isDefault: false,
    status: "disabled",
    addedAt: new Date("2024-01-28"),
  },
];

export default function PaymentMethodsPage() {
  const { t } = useTranslation();
  const p = "payments.methodsPage";

  const stats = [
    {
      title: t(`${p}.totalMethods`),
      value: "4,562",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.creditCards`),
      value: "2,100",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: t(`${p}.wallets`),
      value: "1,800",
      icon: Wallet,
      color: "from-teal-400 to-cyan-500",
    },
    {
      title: t(`${p}.expired`),
      value: "320",
      icon: AlertCircle,
      color: "from-yellow-500 to-orange-500",
    },
  ];

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
          <GradientButton>{t(`${p}.addMethodBtn`)}</GradientButton>
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
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t("payments.creditCard")}</option>
              <option>{t("payments.debitCard")}</option>
              <option>{t("payments.wallet")}</option>
              <option>{t("payments.bankTransfer")}</option>
              <option>{t("payments.cash")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("payments.active")}</option>
              <option>{t("payments.expired")}</option>
              <option>{t("payments.disabled")}</option>
            </select>
          </div>

          <PaymentMethodsTable data={paymentMethods} />
        </div>
      </div>
    </DashboardLayout>
  );
}
