"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { StatCard } from "@/components/ui/stat-card";
import { ReportsTable } from "@/features/logistics/components/reports-table";
import { LogisticsReport } from "@/features/logistics/types";
import { BarChart3, TrendingUp, DollarSign, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const reports: LogisticsReport[] = [
  {
    id: "rpt1",
    title: "March 2024 — Monthly Overview",
    type: "monthly",
    period: "Mar 2024",
    totalShipments: 8540,
    deliveredOnTime: 8105,
    avgDeliveryDays: 3.1,
    revenue: 128500,
    generatedAt: new Date("2024-04-01"),
  },
  {
    id: "rpt2",
    title: "Week 10 — Weekly Summary",
    type: "weekly",
    period: "Mar 4–10, 2024",
    totalShipments: 2120,
    deliveredOnTime: 1985,
    avgDeliveryDays: 2.8,
    revenue: 34200,
    generatedAt: new Date("2024-03-11"),
  },
  {
    id: "rpt3",
    title: "Mar 10 — Daily Report",
    type: "daily",
    period: "Mar 10, 2024",
    totalShipments: 312,
    deliveredOnTime: 298,
    avgDeliveryDays: 2.5,
    revenue: 5100,
    generatedAt: new Date("2024-03-11"),
  },
  {
    id: "rpt4",
    title: "February 2024 — Monthly Overview",
    type: "monthly",
    period: "Feb 2024",
    totalShipments: 7920,
    deliveredOnTime: 7350,
    avgDeliveryDays: 3.4,
    revenue: 115800,
    generatedAt: new Date("2024-03-01"),
  },
  {
    id: "rpt5",
    title: "Week 9 — Weekly Summary",
    type: "weekly",
    period: "Feb 26 – Mar 3, 2024",
    totalShipments: 1980,
    deliveredOnTime: 1820,
    avgDeliveryDays: 3.0,
    revenue: 29400,
    generatedAt: new Date("2024-03-04"),
  },
];

export default function ReportsPage() {
  const { t } = useTranslation();
  const p = "logistics.reportsPage";

  const stats = [
    {
      title: t(`${p}.reportsGenerated`),
      value: "156",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.avgOnTimeRate`),
      value: "94.2%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.totalRevenue`),
      value: "$284K",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t(`${p}.avgDelivery`),
      value: "3.2 days",
      icon: Clock,
      color: "from-orange-500 to-red-500",
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
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t(`${p}.daily`)}</option>
              <option>{t(`${p}.weekly`)}</option>
              <option>{t(`${p}.monthly`)}</option>
            </select>
          </div>

          <ReportsTable data={reports} />
        </div>
      </div>
    </DashboardLayout>
  );
}
