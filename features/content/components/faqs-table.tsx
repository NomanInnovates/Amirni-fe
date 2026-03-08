"use client";

import React, { useState } from "react";
import { FAQ } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<FAQ["status"], { labelKey: string; color: string }> =
  {
    published: {
      labelKey: "content.statusPublished",
      color: "bg-green-100 text-green-800",
    },
    draft: {
      labelKey: "content.statusDraft",
      color: "bg-gray-100 text-gray-800",
    },
  };

interface FAQsTableProps {
  data: FAQ[];
  onEdit?: (faq: FAQ) => void;
  onDelete?: (faq: FAQ) => void;
}

export function FAQsTable({ data, onEdit, onDelete }: FAQsTableProps) {
  const { t } = useTranslation();
  const p = "content.faqsPage";
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  const columns: Column<FAQ>[] = [
    {
      key: "question",
      header: t(`${p}.colQuestion`),
      render: (faq) => (
        <span className="font-medium text-foreground truncate max-w-[200px] block">
          {faq.question.length > 50
            ? `${faq.question.substring(0, 50)}...`
            : faq.question}
        </span>
      ),
    },
    {
      key: "category",
      header: t(`${p}.colCategory`),
      render: (faq) => (
        <span className="text-muted-foreground">{faq.category}</span>
      ),
    },
    {
      key: "order",
      header: t(`${p}.colOrder`),
      render: (faq) => (
        <span className="text-muted-foreground">{faq.order}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (faq) => {
        const statusInfo = statusConfig[faq.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "views",
      header: t(`${p}.colViews`),
      render: (faq) => (
        <span className="text-muted-foreground">
          {faq.views.toLocaleString()}
        </span>
      ),
    },
    {
      key: "updatedAt",
      header: t(`${p}.colUpdated`),
      render: (faq) => (
        <span className="text-muted-foreground">
          {faq.updatedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (faq) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFAQ(faq)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm cursor-pointer"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(faq)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-sm cursor-pointer"
            >
              <Pencil size={16} />
              <span className="hidden sm:inline">{t(`${p}.editBtn`)}</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(faq)}
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
        keyExtractor={(faq) => faq.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedFAQ && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedFAQ.question}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colCategory`)}
                </p>
                <p className="text-sm font-medium">{selectedFAQ.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.answer`)}
                </p>
                <p className="text-sm font-medium">{selectedFAQ.answer}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedFAQ.status].color}
                >
                  {t(statusConfig[selectedFAQ.status].labelKey)}
                </Badge>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(selectedFAQ);
                    setSelectedFAQ(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  <Pencil size={16} />
                  {t(`${p}.editBtn`)}
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(selectedFAQ);
                    setSelectedFAQ(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                  {t(`${p}.deleteBtn`)}
                </button>
              )}
              <button
                onClick={() => setSelectedFAQ(null)}
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
