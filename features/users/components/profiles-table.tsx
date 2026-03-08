"use client";

import React, { useState } from "react";
import { UserProfile } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  UserProfile["status"],
  { icon: React.ElementType; labelKey: string; color: string }
> = {
  active: {
    icon: CheckCircle,
    labelKey: "users.active",
    color: "bg-green-100 text-green-800",
  },
  inactive: {
    icon: MinusCircle,
    labelKey: "users.inactive",
    color: "bg-gray-100 text-gray-800",
  },
  suspended: {
    icon: XCircle,
    labelKey: "users.suspended",
    color: "bg-red-100 text-red-800",
  },
};

interface ProfilesTableProps {
  data: UserProfile[];
  onDelete?: (user: UserProfile) => void;
}

export function ProfilesTable({ data, onDelete }: ProfilesTableProps) {
  const { t } = useTranslation();
  const p = "users.profilesPage";
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const columns: Column<UserProfile>[] = [
    {
      key: "name",
      header: t(`${p}.colName`),
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7C4099] to-[#01A8A9] flex items-center justify-center text-white text-sm font-medium">
            {user.name.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{user.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: t(`${p}.colEmail`),
      render: (user) => (
        <span className="text-muted-foreground">{user.email}</span>
      ),
    },
    {
      key: "phone",
      header: t(`${p}.colPhone`),
      render: (user) => (
        <span className="text-muted-foreground">{user.phone}</span>
      ),
    },
    {
      key: "role",
      header: t(`${p}.colRole`),
      render: (user) => (
        <span className="text-muted-foreground capitalize">{user.role}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (user) => {
        const statusInfo = statusConfig[user.status];
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
      render: (user) => (
        <span className="text-muted-foreground">
          {user.joinedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (user) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedUser(user)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm cursor-pointer"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(user)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-sm cursor-pointer"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">{t(`${p}.deleteBtn`)}</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(user) => user.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colEmail`)}
                </p>
                <p className="text-sm font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colPhone`)}
                </p>
                <p className="text-sm font-medium">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colRole`)}
                </p>
                <p className="text-sm font-medium capitalize">
                  {selectedUser.role}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedUser.status].color}
                >
                  {t(statusConfig[selectedUser.status].labelKey)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colJoined`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedUser.joinedAt.toLocaleDateString()}
                </p>
              </div>
              {selectedUser.lastActive && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.lastActive`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedUser.lastActive.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.editBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedUser(null)}
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
