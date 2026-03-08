"use client";

import React, { useState } from "react";
import { Membership } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, XCircle, Ban } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Membership["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  active: {
    icon: CheckCircle,
    labelKey: "loyalty.active",
    color: "bg-green-100 text-green-800",
  },
  expired: {
    icon: XCircle,
    labelKey: "loyalty.expired",
    color: "bg-red-100 text-red-800",
  },
  suspended: {
    icon: Ban,
    labelKey: "loyalty.suspended",
    color: "bg-red-100 text-red-800",
  },
};

const tierConfig: Record<
  Membership["tier"],
  { labelKey: string; color: string }
> = {
  bronze: {
    labelKey: "loyalty.bronze",
    color: "bg-amber-100 text-amber-800",
  },
  silver: {
    labelKey: "loyalty.silver",
    color: "bg-gray-100 text-gray-800",
  },
  gold: {
    labelKey: "loyalty.gold",
    color: "bg-yellow-100 text-yellow-800",
  },
  platinum: {
    labelKey: "loyalty.platinum",
    color: "bg-purple-100 text-purple-800",
  },
};

interface MembershipTableProps {
  data: Membership[];
}

export function MembershipTable({ data }: MembershipTableProps) {
  const { t } = useTranslation();
  const p = "loyalty.membershipPage";
  const [selectedMember, setSelectedMember] = useState<Membership | null>(null);

  const columns: Column<Membership>[] = [
    {
      key: "userName",
      header: t(`${p}.colUser`),
      render: (member) => (
        <span className="font-medium text-foreground">{member.userName}</span>
      ),
    },
    {
      key: "tier",
      header: t(`${p}.colTier`),
      render: (member) => {
        const tierInfo = tierConfig[member.tier];
        return (
          <Badge variant="outline" className={tierInfo.color}>
            {t(tierInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "points",
      header: t(`${p}.colPoints`),
      render: (member) => (
        <span className="text-muted-foreground">
          {member.points.toLocaleString()}
        </span>
      ),
    },
    {
      key: "totalSpent",
      header: t(`${p}.colTotalSpent`),
      render: (member) => (
        <span className="text-muted-foreground">
          ${member.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (member) => {
        const statusInfo = statusConfig[member.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "joinedAt",
      header: t(`${p}.colJoined`),
      render: (member) => (
        <span className="text-muted-foreground">
          {member.joinedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "expiresAt",
      header: t(`${p}.colExpires`),
      render: (member) => (
        <span className="text-muted-foreground">
          {member.expiresAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (member) => (
        <button
          onClick={() => setSelectedMember(member)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(member) => member.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">
              {selectedMember.userName}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colTier`)}
                </p>
                <p className="text-sm font-medium capitalize">
                  {selectedMember.tier}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colPoints`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedMember.points.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.benefits`)}
                </p>
                <ul className="text-sm font-medium list-disc list-inside">
                  {selectedMember.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.editBtn`)}
              </GradientButton>
              <GradientButton variant="outline" className="flex-1">
                {t(`${p}.suspendBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-secondary"
              >
                {t(`${p}.closeBtn`)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
