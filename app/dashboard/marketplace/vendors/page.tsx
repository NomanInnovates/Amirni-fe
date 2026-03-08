"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { VendorsTable } from "@/features/marketplace/components/vendors-table";
import { Vendor } from "@/features/marketplace/types";
import { Users, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

const vendors: Vendor[] = [
  {
    id: "v1",
    name: "TechZone Electronics",
    email: "contact@techzone.com",
    phone: "+1-555-0101",
    businessType: "company",
    category: "Electronics",
    totalProducts: 48,
    totalOrders: 2340,
    revenue: 189500,
    status: "active",
    joinedAt: new Date("2023-06-15"),
  },
  {
    id: "v2",
    name: "GreenWear Co.",
    email: "hello@greenwear.com",
    phone: "+1-555-0202",
    businessType: "company",
    category: "Clothing",
    totalProducts: 120,
    totalOrders: 4560,
    revenue: 245000,
    status: "active",
    joinedAt: new Date("2023-04-10"),
  },
  {
    id: "v3",
    name: "Artisan Crafts by Noor",
    email: "noor@artisancrafts.com",
    phone: "+971-55-1234567",
    businessType: "individual",
    category: "Home & Kitchen",
    totalProducts: 35,
    totalOrders: 890,
    revenue: 42000,
    status: "active",
    joinedAt: new Date("2023-09-20"),
  },
  {
    id: "v4",
    name: "FitLife Sports",
    email: "info@fitlifesports.com",
    phone: "+1-555-0404",
    businessType: "company",
    category: "Sports",
    totalProducts: 67,
    totalOrders: 3210,
    revenue: 178000,
    status: "active",
    joinedAt: new Date("2023-07-01"),
  },
  {
    id: "v5",
    name: "Ahmed's Accessories",
    email: "ahmed@accessories.ae",
    phone: "+971-50-9876543",
    businessType: "individual",
    category: "Accessories",
    totalProducts: 22,
    totalOrders: 560,
    revenue: 28500,
    status: "active",
    joinedAt: new Date("2023-11-05"),
  },
  {
    id: "v6",
    name: "QuickByte Tech",
    email: "support@quickbyte.com",
    phone: "+1-555-0606",
    businessType: "company",
    category: "Electronics",
    totalProducts: 15,
    totalOrders: 120,
    revenue: 8900,
    status: "suspended",
    joinedAt: new Date("2024-01-10"),
  },
  {
    id: "v7",
    name: "Sara's Kitchen Essentials",
    email: "sara@kitchenessentials.com",
    phone: "+971-55-4567890",
    businessType: "individual",
    category: "Home & Kitchen",
    totalProducts: 41,
    totalOrders: 1450,
    revenue: 67000,
    status: "active",
    joinedAt: new Date("2023-08-22"),
  },
  {
    id: "v8",
    name: "Urban Style Hub",
    email: "info@urbanstylehub.com",
    phone: "+1-555-0808",
    businessType: "company",
    category: "Clothing",
    totalProducts: 89,
    totalOrders: 2890,
    revenue: 156000,
    status: "active",
    joinedAt: new Date("2023-05-18"),
  },
  {
    id: "v9",
    name: "EcoHome Living",
    email: "hello@ecohome.com",
    phone: "+1-555-0909",
    businessType: "company",
    category: "Home & Kitchen",
    totalProducts: 56,
    totalOrders: 1780,
    revenue: 92000,
    status: "inactive",
    joinedAt: new Date("2023-10-12"),
  },
  {
    id: "v10",
    name: "Peak Performance Gear",
    email: "contact@peakgear.com",
    phone: "+1-555-1010",
    businessType: "company",
    category: "Sports",
    totalProducts: 34,
    totalOrders: 980,
    revenue: 54000,
    status: "active",
    joinedAt: new Date("2024-01-25"),
  },
  {
    id: "v11",
    name: "Luxury Leather Co.",
    email: "sales@luxuryleather.com",
    phone: "+971-50-1112233",
    businessType: "company",
    category: "Accessories",
    totalProducts: 28,
    totalOrders: 670,
    revenue: 89000,
    status: "active",
    joinedAt: new Date("2023-12-01"),
  },
];

export default function VendorsPage() {
  const { t } = useTranslation();
  const p = "marketplace.vendorsPage";

  const stats = [
    {
      title: t(`${p}.totalVendors`),
      value: "856",
      icon: Users,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.active`),
      value: "742",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.suspended`),
      value: "18",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
    },
    {
      title: t(`${p}.totalRevenue`),
      value: "$1.2M",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton>{t(`${p}.addVendorBtn`)}</GradientButton>
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
              <option>{t("marketplace.active")}</option>
              <option>{t("marketplace.inactive")}</option>
              <option>{t("marketplace.suspended")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t("marketplace.individual")}</option>
              <option>{t("marketplace.company")}</option>
            </select>
          </div>
          <VendorsTable data={vendors} />
        </div>
      </div>
    </DashboardLayout>
  );
}
