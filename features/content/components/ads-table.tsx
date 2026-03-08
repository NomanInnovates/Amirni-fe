"use client";

import React, { useState } from "react";
import { Ad } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const typeConfig: Record<Ad["type"], { labelKey: string; color: string }> = {
  reel: {
    labelKey: "content.typeReel",
    color: "bg-purple-100 text-purple-800",
  },
  video: {
    labelKey: "content.typeVideo",
    color: "bg-blue-100 text-blue-800",
  },
  banner: {
    labelKey: "content.typeBanner",
    color: "bg-teal-100 text-teal-800",
  },
  story: {
    labelKey: "content.typeStory",
    color: "bg-pink-100 text-pink-800",
  },
};

const statusConfig: Record<Ad["status"], { labelKey: string; color: string }> =
  {
    active: {
      labelKey: "content.statusActive",
      color: "bg-green-100 text-green-800",
    },
    paused: {
      labelKey: "content.statusPaused",
      color: "bg-yellow-100 text-yellow-800",
    },
    expired: {
      labelKey: "content.statusExpired",
      color: "bg-gray-100 text-gray-800",
    },
    draft: {
      labelKey: "content.statusDraft",
      color: "bg-blue-100 text-blue-800",
    },
  };

interface AdsTableProps {
  data: Ad[];
  onDelete?: (ad: Ad) => void;
}

export function AdsTable({ data, onDelete }: AdsTableProps) {
  const { t } = useTranslation();
  const p = "content.adsPage";
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  const columns: Column<Ad>[] = [
    {
      key: "title",
      header: t(`${p}.colTitle`),
      render: (ad) => (
        <span className="font-medium text-foreground">{ad.title}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colType`),
      render: (ad) => {
        const typeInfo = typeConfig[ad.type];
        return (
          <Badge variant="outline" className={typeInfo.color}>
            {t(typeInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "vendorName",
      header: t(`${p}.colVendor`),
      render: (ad) => (
        <span className="text-muted-foreground">{ad.vendorName}</span>
      ),
    },
    {
      key: "likes",
      header: t(`${p}.colLikes`),
      render: (ad) => (
        <span className="text-muted-foreground">
          {ad.likes.toLocaleString()}
        </span>
      ),
    },
    {
      key: "views",
      header: t(`${p}.colViews`),
      render: (ad) => (
        <span className="text-muted-foreground">
          {ad.views.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (ad) => {
        const statusInfo = statusConfig[ad.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "endDate",
      header: t(`${p}.colEndDate`),
      render: (ad) => (
        <span className="text-muted-foreground">
          {ad.endDate.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (ad) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedAd(ad)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm cursor-pointer"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(ad)}
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
        keyExtractor={(ad) => ad.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedAd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedAd.title}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colVendor`)}
                </p>
                <p className="text-sm font-medium">{selectedAd.vendorName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colType`)}
                </p>
                <Badge
                  variant="outline"
                  className={typeConfig[selectedAd.type].color}
                >
                  {t(typeConfig[selectedAd.type].labelKey)}
                </Badge>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.colLikes`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedAd.likes.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.colViews`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedAd.views.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colEndDate`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedAd.endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAd(null)}
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
