"use client";

import React, { useState } from "react";
import { KYCDocument } from "../types";
import { DataTable, type Column } from "@/components/ui/data-table";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, CreditCard, Car } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusConfig: Record<
  KYCDocument["status"],
  { labelKey: string; color: string }
> = {
  pending: { labelKey: "kyc.pending", color: "bg-yellow-100 text-yellow-800" },
  approved: { labelKey: "kyc.approved", color: "bg-green-100 text-green-800" },
  rejected: { labelKey: "kyc.rejected", color: "bg-red-100 text-red-800" },
};

const typeConfig: Record<
  KYCDocument["type"],
  { labelKey: string; icon: React.ElementType }
> = {
  passport: { labelKey: "kyc.documentsPage.passport", icon: FileText },
  id_card: { labelKey: "kyc.documentsPage.idCard", icon: CreditCard },
  driver_license: {
    labelKey: "kyc.documentsPage.driverLicense",
    icon: CreditCard,
  },
  vehicle_registration: {
    labelKey: "kyc.documentsPage.vehicleRegistration",
    icon: Car,
  },
};

interface DocumentsTableProps {
  data: KYCDocument[];
}

export function KYCDocumentsTable({ data }: DocumentsTableProps) {
  const { t } = useTranslation();
  const p = "kyc.documentsPage";
  const [selectedDoc, setSelectedDoc] = useState<KYCDocument | null>(null);

  const columns: Column<KYCDocument>[] = [
    {
      key: "userName",
      header: t(`${p}.colUploadedBy`),
      render: (doc) => (
        <span className="font-medium text-foreground">{doc.userName}</span>
      ),
    },
    {
      key: "type",
      header: t(`${p}.colDocType`),
      render: (doc) => {
        const typeInfo = typeConfig[doc.type];
        const Icon = typeInfo.icon;
        return (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Icon size={16} />
            {t(typeInfo.labelKey)}
          </span>
        );
      },
    },
    {
      key: "documentNumber",
      header: t(`${p}.colDocNumber`),
      render: (doc) => (
        <span className="text-muted-foreground font-mono text-xs">
          {doc.documentNumber}
        </span>
      ),
    },
    {
      key: "issuingCountry",
      header: t(`${p}.colCountry`),
      render: (doc) => (
        <span className="text-muted-foreground">{doc.issuingCountry}</span>
      ),
    },
    {
      key: "status",
      header: t(`${p}.colStatus`),
      render: (doc) => {
        const statusInfo = statusConfig[doc.status];
        return (
          <Badge variant="outline" className={statusInfo.color}>
            {t(statusInfo.labelKey)}
          </Badge>
        );
      },
    },
    {
      key: "uploadedAt",
      header: t(`${p}.colUploaded`),
      render: (doc) => (
        <span className="text-muted-foreground">
          {doc.uploadedAt.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: t(`${p}.colActions`),
      align: "center",
      render: (doc) => (
        <button
          onClick={() => setSelectedDoc(doc)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#7C4099]/10 text-[#7C4099] hover:bg-[#7C4099]/20 transition-colors text-sm"
        >
          <Eye size={16} />
          <span className="hidden sm:inline">{t(`${p}.reviewBtn`)}</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(doc) => doc.id}
        emptyMessage={t(`${p}.emptyMessage`)}
      />

      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-border">
            <h2 className="text-xl font-bold mb-4">{t(`${p}.docReview`)}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colUploadedBy`)}
                </p>
                <p className="text-sm font-medium">{selectedDoc.userName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.type`)}
                </p>
                <p className="text-sm font-medium">
                  {t(typeConfig[selectedDoc.type].labelKey)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.docNumber`)}
                </p>
                <p className="text-sm font-medium font-mono">
                  {selectedDoc.documentNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.expiryDate`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedDoc.expiryDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.issuingCountry`)}
                </p>
                <p className="text-sm font-medium">
                  {selectedDoc.issuingCountry}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t(`${p}.colStatus`)}
                </p>
                <Badge
                  variant="outline"
                  className={statusConfig[selectedDoc.status].color}
                >
                  {t(statusConfig[selectedDoc.status].labelKey)}
                </Badge>
              </div>
              {selectedDoc.rejectionReason && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t(`${p}.rejectionReason`)}
                  </p>
                  <p className="text-sm font-medium text-red-600">
                    {selectedDoc.rejectionReason}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <GradientButton className="flex-1">
                {t(`${p}.approveBtn`)}
              </GradientButton>
              <GradientButton variant="outline" className="flex-1">
                {t(`${p}.rejectBtn`)}
              </GradientButton>
              <button
                onClick={() => setSelectedDoc(null)}
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
