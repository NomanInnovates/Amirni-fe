"use client";

import React, { useState } from "react";
import { Product } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  Product["status"],
  { labelKey: string; color: string }
> = {
  draft: { labelKey: "marketplace.draft", color: "bg-gray-100 text-gray-800" },
  active: {
    labelKey: "marketplace.active",
    color: "bg-green-100 text-green-800",
  },
  inactive: {
    labelKey: "marketplace.inactive",
    color: "bg-yellow-100 text-yellow-800",
  },
};

interface ProductsTableProps {
  data: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductsTable({ data, onEdit, onDelete }: ProductsTableProps) {
  const { t } = useTranslation();
  const p = "marketplace.productsPage";
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const columns: Column<Product>[] = [
    {
      key: "name",
      header: t(`${p}.colProduct`),
      render: (prod) => (
        <span className="font-medium text-foreground">{prod.name}</span>
      ),
    },
    {
      key: "category",
      header: t(`${p}.colCategory`),
      render: (prod) => (
        <span className="text-muted-foreground">{prod.category}</span>
      ),
    },
    {
      key: "price",
      header: t(`${p}.colPrice`),
      render: (prod) => (
        <span className="font-medium text-foreground">
          ${prod.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: "stock",
      header: t(`${p}.colStock`),
      render: (prod) => (
        <span
          className={
            prod.stock <= 10
              ? "text-red-600 font-medium"
              : "text-muted-foreground"
          }
        >
          {prod.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (prod) => (
        <Badge variant="outline" className={statusConfig[prod.status].color}>
          {t(statusConfig[prod.status].labelKey)}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: t(`${p}.colCreated`),
      render: (prod) => (
        <span className="text-muted-foreground">
          {prod.createdAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (prod) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedProduct(prod)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm cursor-pointer"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">{t(`${p}.viewBtn`)}</span>
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(prod)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors text-sm cursor-pointer"
            >
              <Pencil size={16} />
              <span className="hidden sm:inline">{t(`${p}.editProductBtn`)}</span>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(prod)}
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
        keyExtractor={(prod) => prod.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.description`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.price`)}
                  </p>
                  <p className="text-sm font-medium">
                    ${selectedProduct.price.toFixed(2)}{" "}
                    {selectedProduct.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.stock`)}
                  </p>
                  <p className="text-sm font-medium">{selectedProduct.stock}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.category`)}
                  </p>
                  <p className="text-sm font-medium">
                    {selectedProduct.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.status`)}
                  </p>
                  <Badge
                    variant="outline"
                    className={statusConfig[selectedProduct.status].color}
                  >
                    {t(statusConfig[selectedProduct.status].labelKey)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton
                className="flex-1"
                onClick={() => {
                  if (onEdit) {
                    onEdit(selectedProduct);
                    setSelectedProduct(null);
                  }
                }}
              >
                {t(`${p}.editProductBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedProduct(null)}
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
