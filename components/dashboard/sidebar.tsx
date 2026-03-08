"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldCheck,
  ClipboardList,
  FileText,
  UserCheck,
  Truck,
  PackageSearch,
  MapPin,
  BarChart3,
  Store,
  ShoppingBag,
  Receipt,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  UserCog,
  MapPinHouse,
  UserPlus,
  CalendarCheck,
  CreditCard,
  Wallet,
  History,
  Megaphone,
  Clapperboard,
  HelpCircle,
  BellRing,
  Award,
  Ticket,
  Crown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "@/store/slices/authSlice";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslation } from "react-i18next";

interface NavItem {
  labelKey: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    labelKey: "dashboard.title",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    labelKey: "kyc.title",
    icon: <ShieldCheck size={20} />,
    children: [
      {
        labelKey: "kyc.applications",
        href: "/dashboard/kyc/applications",
        icon: <ClipboardList size={20} />,
      },
      {
        labelKey: "kyc.documents",
        href: "/dashboard/kyc/documents",
        icon: <FileText size={20} />,
      },
      {
        labelKey: "kyc.verification",
        href: "/dashboard/kyc/verification",
        icon: <UserCheck size={20} />,
      },
    ],
  },
  {
    labelKey: "logistics.title",
    icon: <Truck size={20} />,
    children: [
      {
        labelKey: "logistics.shipments",
        href: "/dashboard/logistics/shipments",
        icon: <PackageSearch size={20} />,
      },
      {
        labelKey: "logistics.tracking",
        href: "/dashboard/logistics/tracking",
        icon: <MapPin size={20} />,
      },
      {
        labelKey: "logistics.reports",
        href: "/dashboard/logistics/reports",
        icon: <BarChart3 size={20} />,
      },
    ],
  },
  {
    labelKey: "marketplace.title",
    icon: <Store size={20} />,
    children: [
      {
        labelKey: "marketplace.products",
        href: "/dashboard/marketplace/products",
        icon: <ShoppingBag size={20} />,
      },
      {
        labelKey: "marketplace.orders",
        href: "/dashboard/marketplace/orders",
        icon: <Receipt size={20} />,
      },
      {
        labelKey: "marketplace.vendors",
        href: "/dashboard/marketplace/vendors",
        icon: <Users size={20} />,
      },
      {
        labelKey: "marketplace.bookings",
        href: "/dashboard/marketplace/bookings",
        icon: <CalendarCheck size={20} />,
      },
    ],
  },
  {
    labelKey: "users.title",
    icon: <UserCog size={20} />,
    children: [
      {
        labelKey: "users.profiles",
        href: "/dashboard/users/profiles",
        icon: <Users size={20} />,
      },
      {
        labelKey: "users.addresses",
        href: "/dashboard/users/addresses",
        icon: <MapPinHouse size={20} />,
      },
      {
        labelKey: "users.referrals",
        href: "/dashboard/users/referrals",
        icon: <UserPlus size={20} />,
      },
    ],
  },
  {
    labelKey: "payments.title",
    icon: <CreditCard size={20} />,
    children: [
      {
        labelKey: "payments.methods",
        href: "/dashboard/payments/methods",
        icon: <Wallet size={20} />,
      },
      {
        labelKey: "payments.history",
        href: "/dashboard/payments/history",
        icon: <History size={20} />,
      },
    ],
  },
  {
    labelKey: "content.title",
    icon: <Megaphone size={20} />,
    children: [
      {
        labelKey: "content.ads",
        href: "/dashboard/content/ads",
        icon: <Clapperboard size={20} />,
      },
      {
        labelKey: "content.faqs",
        href: "/dashboard/content/faqs",
        icon: <HelpCircle size={20} />,
      },
      {
        labelKey: "content.notificationTypes",
        href: "/dashboard/content/notifications",
        icon: <BellRing size={20} />,
      },
    ],
  },
  {
    labelKey: "loyalty.title",
    icon: <Award size={20} />,
    children: [
      {
        labelKey: "loyalty.programs",
        href: "/dashboard/loyalty/programs",
        icon: <Award size={20} />,
      },
      {
        labelKey: "loyalty.points",
        href: "/dashboard/loyalty/points",
        icon: <Ticket size={20} />,
      },
      {
        labelKey: "loyalty.membership",
        href: "/dashboard/loyalty/membership",
        icon: <Crown size={20} />,
      },
    ],
  },
  {
    labelKey: "common.settings",
    href: "/dashboard/settings",
    icon: <Settings size={20} />,
  },
];

function NavItemComponent({
  item,
  collapsed,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  collapsed: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isActive = item.href && pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive =
    hasChildren &&
    item.children!.some((child) => child.href && pathname === child.href);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-all",
            isChildActive
              ? "text-[#7C4099] bg-[#7C4099]/10"
              : "text-foreground hover:bg-secondary",
          )}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            {!collapsed && <span>{t(item.labelKey)}</span>}
          </div>
          {!collapsed && (
            <ChevronDown
              size={16}
              className={cn("transition-transform", isOpen && "rotate-180")}
            />
          )}
        </button>
        {!collapsed && (
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-in-out",
              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="mt-1 space-y-1 ps-4">
                {item.children?.map((child, index) => (
                  <Link
                    key={index}
                    href={child.href || "#"}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all",
                      pathname === child.href
                        ? "text-[#7C4099] bg-[#7C4099]/10 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    {child.icon}
                    <span>{t(child.labelKey)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all",
        isActive
          ? "text-[#7C4099] bg-[#7C4099]/10"
          : "text-foreground hover:bg-secondary",
      )}
    >
      {item.icon}
      {!collapsed && <span>{t(item.labelKey)}</span>}
    </Link>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const router = useRouter();
  const { t } = useTranslation();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Find which nav group is initially active based on current path
  const initialOpen = navigationItems.findIndex((item) =>
    item.children?.some((child) => child.href && pathname === child.href),
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    initialOpen >= 0 ? initialOpen : null,
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 start-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md bg-background border border-border text-foreground hover:bg-secondary"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 start-0 h-screen bg-white border-e border-sidebar-border transition-all duration-300 z-10",
          collapsed ? "w-24" : "w-72",
          mobileOpen ? "block" : "hidden lg:block",
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div
            className={`h-20 flex items-center ${collapsed ? "justify-around" : "justify-between"} px-4 border-b border-sidebar-border`}
          >
            <h1 className="text-xl font-bold">
              <GradientText>{collapsed ? "A" : "Amirni"}</GradientText>
            </h1>
            <button
              onClick={() => onCollapsedChange(!collapsed)}
              className="hidden lg:block p-1 rounded-md hover:bg-secondary"
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
            {navigationItems.map((item, index) => (
              <NavItemComponent
                key={index}
                item={item}
                collapsed={collapsed}
                isOpen={expandedIndex === index}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              />
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-sidebar-border p-4 space-y-2">
            {!collapsed && user && (
              <div className="px-2 py-2 rounded-md bg-sidebar-accent/10">
                <p className="text-xs font-medium text-sidebar-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-all",
                collapsed && "justify-center",
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span>{t("common.logout")}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
