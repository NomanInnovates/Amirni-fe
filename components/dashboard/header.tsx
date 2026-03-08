"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Settings, Globe, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage, selectLocale } from "@/store/slices/localeSlice";
import { logout } from "@/store/slices/authSlice";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "alert" | "success";
}

const recentNotifications: Notification[] = [
  {
    id: "1",
    title: "New KYC Application",
    description: "John Doe submitted a new KYC application",
    time: "2 min ago",
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Shipment Delivered",
    description: "TRK123456789 was delivered successfully",
    time: "15 min ago",
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "Payment Failed",
    description: "Order ORD006 payment was declined",
    time: "1 hr ago",
    read: false,
    type: "alert",
  },
  {
    id: "4",
    title: "Vendor Suspended",
    description: "QuickByte Tech has been suspended",
    time: "3 hrs ago",
    read: true,
    type: "alert",
  },
  {
    id: "5",
    title: "New Order",
    description: "ORD012 placed by Ana Martinez",
    time: "5 hrs ago",
    read: true,
    type: "info",
  },
];

const typeDot: Record<Notification["type"], string> = {
  info: "bg-blue-500",
  alert: "bg-red-500",
  success: "bg-green-500",
};

export function DashboardHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector(selectLocale);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = recentNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-secondary rounded-lg px-4 py-2" />

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={() => dispatch(toggleLanguage())}
          className="flex items-center p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
          aria-label="Toggle language"
        >
          <Globe size={20} />
          <span className="ms-1 text-xs font-medium">
            {language.toUpperCase()}
          </span>
        </button>

        {/* Notifications */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground relative"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 end-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#7C4099] rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute end-0 top-full mt-2 w-80 bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs font-medium text-[#7C4099] bg-[#7C4099]/10 px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {recentNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/40 transition-colors ${
                      !n.read ? "bg-[#7C4099]/5" : ""
                    }`}
                  >
                    <span
                      className={`mt-1.5 size-2 rounded-full shrink-0 ${typeDot[n.type]}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {n.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setOpen(false)}
                  className="block text-center py-3 text-sm font-medium text-[#7C4099] hover:bg-[#7C4099]/5 transition-colors"
                >
                  See All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => router.push("/dashboard/settings")}
          className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
          aria-label="Go to settings"
        >
          <Settings size={20} />
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            dispatch(logout());
            router.push("/login");
          }}
          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
          aria-label={t("common.logout")}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
