"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getStoredCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("amirni_sidebar_collapsed") === "true";
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(getStoredCollapsed);

  const handleCollapsedChange = (value: boolean) => {
    setCollapsed(value);
    localStorage.setItem("amirni_sidebar_collapsed", String(value));
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={handleCollapsedChange}
      />
      <div
        className={cn(
          "flex-1 min-w-0 flex flex-col transition-all duration-300",
          collapsed ? "lg:ms-24" : "lg:ms-72",
        )}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
