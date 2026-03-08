"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { TransactionHistoryTable } from "@/features/payments/components/history-table";
import { Transaction } from "@/features/payments/types";
import { BarChart3, DollarSign, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const transactions: Transaction[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    type: "payment",
    amount: 250.0,
    currency: "USD",
    method: "Visa **** 4242",
    status: "completed",
    reference: "TXN-2024-001",
    description: "Order #1234 - Electronics",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    type: "refund",
    amount: 75.5,
    currency: "USD",
    method: "Apple Pay",
    status: "refunded",
    reference: "TXN-2024-002",
    description: "Refund for Order #1180",
    createdAt: new Date("2024-03-14"),
  },
  {
    id: "3",
    userId: "user3",
    userName: "Ahmed Hassan",
    type: "payout",
    amount: 1200.0,
    currency: "USD",
    method: "Bank Transfer",
    status: "pending",
    reference: "TXN-2024-003",
    description: "Vendor payout - March 2024",
    createdAt: new Date("2024-03-13"),
  },
  {
    id: "4",
    userId: "user4",
    userName: "Maria Garcia",
    type: "topup",
    amount: 500.0,
    currency: "USD",
    method: "Mastercard **** 8910",
    status: "completed",
    reference: "TXN-2024-004",
    description: "Wallet top-up",
    createdAt: new Date("2024-03-12"),
  },
  {
    id: "5",
    userId: "user5",
    userName: "Li Wei",
    type: "payment",
    amount: 89.99,
    currency: "USD",
    method: "Cash on Delivery",
    status: "failed",
    reference: "TXN-2024-005",
    description: "Order #1290 - Groceries",
    createdAt: new Date("2024-03-11"),
  },
];

export default function TransactionHistoryPage() {
  const { t } = useTranslation();
  const p = "payments.historyPage";

  const stats = [
    {
      title: t(`${p}.totalTransactions`),
      value: "12,456",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.totalVolume`),
      value: "$2.4M",
      icon: DollarSign,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.pending`),
      value: "89",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.failed`),
      value: "34",
      icon: AlertCircle,
      color: "from-red-500 to-pink-500",
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
          <GradientButton>{t(`${p}.exportBtn`)}</GradientButton>
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
              <option>{t("payments.payment")}</option>
              <option>{t("payments.refund")}</option>
              <option>{t("payments.payout")}</option>
              <option>{t("payments.topup")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("payments.completed")}</option>
              <option>{t("payments.pending")}</option>
              <option>{t("payments.failed")}</option>
              <option>{t("payments.refunded")}</option>
            </select>
          </div>

          <TransactionHistoryTable data={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
