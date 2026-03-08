"use client";

import React, { useState } from "react";
import { NotificationType } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const channelConfig: Record<
  NotificationType["channel"],
  { labelKey: string; color: string }
> = {
  push: {
    labelKey: "content.channelPush",
    color: "bg-blue-100 text-blue-800",
  },
  email: {
    labelKey: "content.channelEmail",
    color: "bg-purple-100 text-purple-800",
  },
  sms: {
    labelKey: "content.channelSms",
    color: "bg-teal-100 text-teal-800",
  },
  in_app: {
    labelKey: "content.channelInApp",
    color: "bg-orange-100 text-orange-800",
  },
};

interface NotificationTypesTableProps {
  data: NotificationType[];
  onDelete?: (nt: NotificationType) => void;
}

export function NotificationTypesTable({
  data,
  onDelete,
}: NotificationTypesTableProps) {
  const { t } = useTranslation();
  const p = "content.notificationsPage";
  const [selectedType, setSelectedType] = useState<NotificationType | null>(
    null,
  );

  const columns: Column<NotificationType>[] = [
    {
      key: "name",
      header: t(`${p}.colName`),
      render: (nt) => (
        <span className="font-medium text-foreground">{nt.name}</span>
      ),
    },
    {
      key: "channel",
      header: t(`${p}.colChannel`),
      render: (nt) => {
        const channelInfo = channelConfig[nt.channel];
        return (
          <Badge variant="outline" className={channelInfo.color}>
            {t(channelInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "category",
      header: t(`${p}.colCategory`),
      render: (nt) => (
        <span className="text-muted-foreground capitalize">{nt.category}</span>
      ),
    },
    {
      key: "isEnabled",
      header: t(`${p}.colEnabled`),
      render: (nt) => (
        <Badge
          variant="outline"
          className={
            nt.isEnabled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {nt.isEnabled ? t(`${p}.yes`) : t(`${p}.no`)}
        </Badge>
      ),
    },
    {
      key: "description",
      header: t(`${p}.colDescription`),
      render: (nt) => (
        <span className="text-muted-foreground truncate max-w-[200px] block">
          {nt.description.length > 40
            ? `${nt.description.substring(0, 40)}...`
            : nt.description}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (nt) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedType(nt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm cursor-pointer"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(nt)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm cursor-pointer"
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
        keyExtractor={(nt) => nt.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedType.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colChannel`)}
                </p>
                <Badge
                  variant="outline"
                  className={channelConfig[selectedType.channel].color}
                >
                  {t(channelConfig[selectedType.channel].labelKey)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colCategory`)}
                </p>
                <p className="text-sm font-medium capitalize">
                  {selectedType.category}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colDescription`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedType.description}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.template`)}
                </p>
                <p className="text-sm font-medium font-mono bg-muted p-2 rounded">
                  {selectedType.template}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-secondary cursor-pointer"
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
