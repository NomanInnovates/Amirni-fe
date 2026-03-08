"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { StatCard } from "@/components/ui/stat-card";
import { OrdersTable } from "@/features/marketplace/components/orders-table";
import { Order } from "@/features/marketplace/types";
import { Receipt, TrendingUp, Clock, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const orders: Order[] = [
  {
    id: "ORD001",
    buyerId: "buyer1",
    buyerName: "Sarah Johnson",
    vendorId: "v1",
    products: [
      {
        productId: "PROD001",
        name: "Wireless Bluetooth Headphones",
        quantity: 2,
        price: 89.99,
      },
    ],
    totalAmount: 179.98,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "ORD002",
    buyerId: "buyer2",
    buyerName: "Michael Chen",
    vendorId: "v2",
    products: [
      {
        productId: "PROD003",
        name: "Smart Watch Pro",
        quantity: 1,
        price: 199.99,
      },
    ],
    totalAmount: 199.99,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-03"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "ORD003",
    buyerId: "buyer3",
    buyerName: "Emma Wilson",
    vendorId: "v3",
    products: [
      {
        productId: "PROD002",
        name: "Organic Cotton T-Shirt",
        quantity: 3,
        price: 29.99,
      },
      {
        productId: "PROD005",
        name: "Stainless Steel Water Bottle",
        quantity: 1,
        price: 24.99,
      },
    ],
    totalAmount: 114.96,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-07"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "ORD004",
    buyerId: "buyer4",
    buyerName: "Ahmed Al-Farsi",
    vendorId: "v1",
    products: [
      {
        productId: "PROD007",
        name: "USB-C Charging Cable 3-Pack",
        quantity: 2,
        price: 14.99,
      },
    ],
    totalAmount: 29.98,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "ORD005",
    buyerId: "buyer5",
    buyerName: "Lisa Park",
    vendorId: "v4",
    products: [
      {
        productId: "PROD009",
        name: "Running Shoes Ultralight",
        quantity: 1,
        price: 119.99,
      },
      {
        productId: "PROD006",
        name: "Yoga Mat Premium",
        quantity: 1,
        price: 39.99,
      },
    ],
    totalAmount: 159.98,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "ORD006",
    buyerId: "buyer6",
    buyerName: "David Brown",
    vendorId: "v2",
    products: [
      {
        productId: "PROD010",
        name: "Laptop Backpack",
        quantity: 1,
        price: 59.99,
      },
    ],
    totalAmount: 59.99,
    status: "cancelled",
    paymentStatus: "failed",
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "ORD007",
    buyerId: "buyer7",
    buyerName: "Fatima Al-Rashid",
    vendorId: "v3",
    products: [
      {
        productId: "PROD008",
        name: "Scented Soy Candle Set",
        quantity: 2,
        price: 34.99,
      },
      {
        productId: "PROD004",
        name: "Handmade Leather Wallet",
        quantity: 1,
        price: 49.99,
      },
    ],
    totalAmount: 119.97,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-03-04"),
  },
  {
    id: "ORD008",
    buyerId: "buyer8",
    buyerName: "Tom Richards",
    vendorId: "v1",
    products: [
      {
        productId: "PROD011",
        name: "Portable Bluetooth Speaker",
        quantity: 1,
        price: 44.99,
      },
    ],
    totalAmount: 44.99,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "ORD009",
    buyerId: "buyer9",
    buyerName: "Noor Hamdan",
    vendorId: "v2",
    products: [
      {
        productId: "PROD002",
        name: "Organic Cotton T-Shirt",
        quantity: 5,
        price: 29.99,
      },
    ],
    totalAmount: 149.95,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2024-03-09"),
    updatedAt: new Date("2024-03-09"),
  },
  {
    id: "ORD010",
    buyerId: "buyer10",
    buyerName: "Julia Santos",
    vendorId: "v4",
    products: [
      {
        productId: "PROD009",
        name: "Running Shoes Ultralight",
        quantity: 1,
        price: 119.99,
      },
    ],
    totalAmount: 119.99,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: new Date("2024-02-25"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "ORD011",
    buyerId: "buyer11",
    buyerName: "Omar Khalil",
    vendorId: "v1",
    products: [
      {
        productId: "PROD001",
        name: "Wireless Bluetooth Headphones",
        quantity: 1,
        price: 89.99,
      },
      {
        productId: "PROD003",
        name: "Smart Watch Pro",
        quantity: 1,
        price: 199.99,
      },
    ],
    totalAmount: 289.98,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-06"),
    updatedAt: new Date("2024-03-09"),
  },
  {
    id: "ORD012",
    buyerId: "buyer12",
    buyerName: "Ana Martinez",
    vendorId: "v3",
    products: [
      {
        productId: "PROD012",
        name: "Ceramic Coffee Mug Set",
        quantity: 1,
        price: 27.99,
      },
    ],
    totalAmount: 27.99,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
];

export default function OrdersPage() {
  const { t } = useTranslation();
  const p = "marketplace.ordersPage";

  const stats = [
    {
      title: t(`${p}.totalOrders`),
      value: "12,543",
      icon: Receipt,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.revenue`),
      value: "$245,678",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.pending`),
      value: "234",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.cancelled`),
      value: "89",
      icon: XCircle,
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
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("marketplace.pending")}</option>
              <option>{t("marketplace.confirmed")}</option>
              <option>{t("marketplace.shipped")}</option>
              <option>{t("marketplace.delivered")}</option>
              <option>{t("marketplace.cancelled")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allPayment`)}</option>
              <option>{t("marketplace.paid")}</option>
              <option>{t("marketplace.pending")}</option>
              <option>{t("marketplace.failed")}</option>
            </select>
          </div>
          <OrdersTable data={orders} />
        </div>
      </div>
    </DashboardLayout>
  );
}
