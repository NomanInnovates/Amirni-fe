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
import { OrdersTable } from "@/features/marketplace/components/orders-table";
import { Order } from "@/features/marketplace/types";
import { ShoppingCart, TrendingUp, Users, Zap, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    buyerId: "buyer1",
    buyerName: "Sarah Johnson",
    vendorId: "v1",
    products: [
      {
        productId: "p1",
        name: "Wireless Headphones",
        quantity: 1,
        price: 79.99,
      },
    ],
    totalAmount: 79.99,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "ORD-002",
    buyerId: "buyer2",
    buyerName: "Mike Chen",
    vendorId: "v2",
    products: [
      { productId: "p2", name: "Phone Case", quantity: 2, price: 19.99 },
      { productId: "p3", name: "Screen Protector", quantity: 1, price: 9.99 },
    ],
    totalAmount: 49.97,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-12"),
  },
  {
    id: "ORD-003",
    buyerId: "buyer3",
    buyerName: "Fatima Al-Rashid",
    vendorId: "v1",
    products: [
      { productId: "p4", name: "Laptop Stand", quantity: 1, price: 45.0 },
    ],
    totalAmount: 45.0,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
];

export default function MarketplacePage() {
  const { t } = useTranslation();
  const op = "marketplace.ordersPage";

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    buyerName: "",
    productName: "",
    quantity: "",
    price: "",
    status: "pending" as Order["status"],
    paymentStatus: "pending" as Order["paymentStatus"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(form.quantity) || 1;
    const price = parseFloat(form.price) || 0;
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      buyerId: `buyer-${Date.now()}`,
      buyerName: form.buyerName,
      vendorId: `v-${Date.now()}`,
      products: [
        {
          productId: `p-${Date.now()}`,
          name: form.productName,
          quantity: qty,
          price: price,
        },
      ],
      totalAmount: qty * price,
      status: form.status,
      paymentStatus: form.paymentStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setForm({
      buyerName: "",
      productName: "",
      quantity: "",
      price: "",
      status: "pending",
      paymentStatus: "pending",
    });
    setShowCreate(false);
  };

  const marketplaceStats = [
    {
      title: t(`${op}.totalOrders`),
      value: "12,543",
      icon: ShoppingCart,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${op}.revenue`),
      value: "$245,678",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("marketplace.vendorsPage.active"),
      value: "856",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("marketplace.sales"),
      value: "$89,234",
      icon: Zap,
      color: "from-orange-500 to-red-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t("marketplace.title")}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${op}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowCreate(true)}>
            <Plus size={16} className="me-2" />
            {t(`${op}.createOrderBtn`)}
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 border-b border-border">
            <button className="px-4 py-2 font-medium text-[#7C4099] border-b-2 border-[#7C4099] cursor-pointer">
              {t("marketplace.orders")}
            </button>
            <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              {t("marketplace.products")}
            </button>
            <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              {t("marketplace.vendors")}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder={t(`${op}.searchPlaceholder`)}
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
              />
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
                <option>{t(`${op}.allStatus`)}</option>
                <option>{t("marketplace.pending")}</option>
                <option>{t("marketplace.confirmed")}</option>
                <option>{t("marketplace.shipped")}</option>
                <option>{t("marketplace.delivered")}</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
                <option>{t(`${op}.allPayment`)}</option>
                <option>{t("marketplace.paid")}</option>
                <option>{t("marketplace.pending")}</option>
                <option>{t("marketplace.failed")}</option>
              </select>
            </div>

            <OrdersTable data={orders} />
          </div>
        </div>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${op}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${op}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${op}.formBuyerName`)}
              </label>
              <input
                type="text"
                required
                value={form.buyerName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, buyerName: e.target.value }))
                }
                placeholder={t(`${op}.formBuyerNamePlaceholder`)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${op}.formProductName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.productName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, productName: e.target.value }))
                  }
                  placeholder={t(`${op}.formProductNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${op}.formQuantity`)}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quantity: e.target.value }))
                  }
                  placeholder={t(`${op}.formQuantityPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${op}.formPrice`)}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder={t(`${op}.formPricePlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${op}.formOrderStatus`)}
                </label>
                <select
                  required
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      status: e.target.value as Order["status"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="pending">{t("marketplace.pending")}</option>
                  <option value="confirmed">{t("marketplace.confirmed")}</option>
                  <option value="shipped">{t("marketplace.shipped")}</option>
                  <option value="delivered">{t("marketplace.delivered")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${op}.formPaymentStatus`)}
                </label>
                <select
                  required
                  value={form.paymentStatus}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      paymentStatus: e.target.value as Order["paymentStatus"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="pending">{t("marketplace.pending")}</option>
                  <option value="paid">{t("marketplace.paid")}</option>
                  <option value="failed">{t("marketplace.failed")}</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(`${op}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${op}.submitBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
