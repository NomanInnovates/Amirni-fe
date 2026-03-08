"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import { AddressesTable } from "@/features/users/components/addresses-table";
import { UserAddress } from "@/features/users/types";
import { MapPin, Home, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

const addresses: UserAddress[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Ahmed Al-Rashid",
    label: "My Home",
    addressLine1: "123 Al Wasl Road",
    addressLine2: "Apartment 4B",
    city: "Dubai",
    country: "UAE",
    postalCode: "12345",
    isDefault: true,
    type: "home",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Johnson",
    label: "Office",
    addressLine1: "456 King Street",
    city: "London",
    country: "UK",
    postalCode: "SW1A 1AA",
    isDefault: true,
    type: "work",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mohammed Hassan",
    label: "Riyadh Home",
    addressLine1: "789 Olaya Street",
    city: "Riyadh",
    country: "Saudi Arabia",
    postalCode: "11564",
    isDefault: false,
    type: "home",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Fatima Al-Zahra",
    label: "Warehouse",
    addressLine1: "321 Industrial Area",
    addressLine2: "Unit 7",
    city: "Abu Dhabi",
    country: "UAE",
    postalCode: "54321",
    isDefault: false,
    type: "other",
  },
];

export default function UserAddressesPage() {
  const { t } = useTranslation();
  const p = "users.addressesPage";

  const addressStats = [
    {
      title: t(`${p}.totalAddresses`),
      value: "5,621",
      icon: MapPin,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.homeAddresses`),
      value: "3,200",
      icon: Home,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: t(`${p}.workAddresses`),
      value: "1,800",
      icon: Briefcase,
      color: "from-purple-400 to-purple-600",
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
          <GradientButton>{t(`${p}.addAddressBtn`)}</GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addressStats.map((stat, index) => (
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
              <option>{t("users.home")}</option>
              <option>{t("users.work")}</option>
              <option>{t("users.other")}</option>
            </select>
          </div>

          <AddressesTable data={addresses} />
        </div>
      </div>
    </DashboardLayout>
  );
}
