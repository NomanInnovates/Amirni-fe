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
import { ShipmentsTable } from "@/features/logistics/components/shipments-table";
import { Shipment } from "@/features/logistics/types";
import { Truck, Package, CheckCircle, Clock, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialShipments: Shipment[] = [
  {
    id: "SHP001",
    orderId: "ORD001",
    senderId: "sender1",
    recipientId: "recipient1",
    status: "in_transit",
    origin: {
      address: "123 Warehouse St",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
    destination: {
      address: "456 Main St",
      city: "Los Angeles",
      country: "USA",
      postalCode: "90001",
    },
    weight: 2.5,
    estimatedDelivery: new Date("2024-03-10"),
    trackingNumber: "TRK123456789",
    carrier: "FedEx",
    cost: 45.99,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "SHP002",
    orderId: "ORD002",
    senderId: "sender2",
    recipientId: "recipient2",
    status: "delivered",
    origin: {
      address: "789 Hub Ave",
      city: "Chicago",
      country: "USA",
      postalCode: "60601",
    },
    destination: {
      address: "321 Park Road",
      city: "Miami",
      country: "USA",
      postalCode: "33101",
    },
    weight: 1.8,
    estimatedDelivery: new Date("2024-03-09"),
    actualDelivery: new Date("2024-03-08"),
    trackingNumber: "TRK987654321",
    carrier: "UPS",
    cost: 38.5,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "SHP003",
    orderId: "ORD003",
    senderId: "sender3",
    recipientId: "recipient3",
    status: "pending",
    origin: {
      address: "555 Storage Ln",
      city: "Houston",
      country: "USA",
      postalCode: "77001",
    },
    destination: {
      address: "777 Commerce Blvd",
      city: "Phoenix",
      country: "USA",
      postalCode: "85001",
    },
    weight: 3.2,
    estimatedDelivery: new Date("2024-03-15"),
    trackingNumber: "TRK456789123",
    carrier: "DHL",
    cost: 52.0,
    createdAt: new Date("2024-03-06"),
    updatedAt: new Date("2024-03-06"),
  },
  {
    id: "SHP004",
    orderId: "ORD004",
    senderId: "sender4",
    recipientId: "recipient4",
    status: "failed",
    origin: {
      address: "900 Dispatch Rd",
      city: "Dallas",
      country: "USA",
      postalCode: "75201",
    },
    destination: {
      address: "100 Elm St",
      city: "Denver",
      country: "USA",
      postalCode: "80201",
    },
    weight: 5.0,
    estimatedDelivery: new Date("2024-03-12"),
    trackingNumber: "TRK112233445",
    carrier: "FedEx",
    cost: 67.25,
    createdAt: new Date("2024-03-04"),
    updatedAt: new Date("2024-03-11"),
  },
];

export default function ShipmentsPage() {
  const { t } = useTranslation();
  const p = "logistics.shipmentsPage";

  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    trackingNumber: "",
    carrier: "",
    weight: "",
    cost: "",
    originAddress: "",
    originCity: "",
    originCountry: "",
    destAddress: "",
    destCity: "",
    destCountry: "",
    estimatedDelivery: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShipment: Shipment = {
      id: `SHP-${Date.now()}`,
      orderId: `ORD-${Date.now()}`,
      senderId: "sender",
      recipientId: "recipient",
      status: "pending",
      origin: {
        address: form.originAddress,
        city: form.originCity,
        country: form.originCountry,
        postalCode: "00000",
      },
      destination: {
        address: form.destAddress,
        city: form.destCity,
        country: form.destCountry,
        postalCode: "00000",
      },
      weight: parseFloat(form.weight) || 0,
      estimatedDelivery: new Date(form.estimatedDelivery),
      trackingNumber: form.trackingNumber,
      carrier: form.carrier,
      cost: parseFloat(form.cost) || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setShipments((prev) => [newShipment, ...prev]);
    setForm({
      trackingNumber: "",
      carrier: "",
      weight: "",
      cost: "",
      originAddress: "",
      originCity: "",
      originCountry: "",
      destAddress: "",
      destCity: "",
      destCountry: "",
      estimatedDelivery: "",
    });
    setShowCreate(false);
  };

  const stats = [
    {
      title: t(`${p}.activeShipments`),
      value: "2,856",
      icon: Truck,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.inTransit`),
      value: "1,234",
      icon: Package,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t(`${p}.deliveredToday`),
      value: "567",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t(`${p}.pendingPickup`),
      value: "89",
      icon: Clock,
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
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowCreate(true)}>
            <Plus size={16} className="me-2" />
            {t(`${p}.newShipmentBtn`)}
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
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#01A8A9]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#01A8A9]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("logistics.pending")}</option>
              <option>{t("logistics.inTransit")}</option>
              <option>{t("logistics.delivered")}</option>
              <option>{t("logistics.failed")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#01A8A9]">
              <option>{t(`${p}.allCarriers`)}</option>
              <option>FedEx</option>
              <option>UPS</option>
              <option>DHL</option>
            </select>
          </div>

          <ShipmentsTable data={shipments} />
        </div>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
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
                  {t(`${p}.formTrackingNumber`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.trackingNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, trackingNumber: e.target.value }))
                  }
                  placeholder={t(`${p}.formTrackingNumberPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formCarrier`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.carrier}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, carrier: e.target.value }))
                  }
                  placeholder={t(`${p}.formCarrierPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formWeight`)}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.weight}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, weight: e.target.value }))
                  }
                  placeholder={t(`${p}.formWeightPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formCost`)}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.cost}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cost: e.target.value }))
                  }
                  placeholder={t(`${p}.formCostPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formOriginAddress`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.originAddress}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, originAddress: e.target.value }))
                  }
                  placeholder={t(`${p}.formOriginAddressPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formOriginCity`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.originCity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, originCity: e.target.value }))
                  }
                  placeholder={t(`${p}.formOriginCityPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formOriginCountry`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.originCountry}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, originCountry: e.target.value }))
                  }
                  placeholder={t(`${p}.formOriginCountryPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formDestAddress`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.destAddress}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, destAddress: e.target.value }))
                  }
                  placeholder={t(`${p}.formDestAddressPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formDestCity`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.destCity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, destCity: e.target.value }))
                  }
                  placeholder={t(`${p}.formDestCityPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formDestCountry`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.destCountry}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, destCountry: e.target.value }))
                  }
                  placeholder={t(`${p}.formDestCountryPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formEstDelivery`)}
              </label>
              <input
                type="date"
                required
                value={form.estimatedDelivery}
                onChange={(e) =>
                  setForm((f) => ({ ...f, estimatedDelivery: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
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
