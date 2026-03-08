"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatCard } from "@/components/ui/stat-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { KYCDocumentsTable } from "@/features/kyc/components/documents-table";
import { KYCDocument } from "@/features/kyc/types";
import { FileText, Clock, CheckCircle, XCircle, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialDocuments: KYCDocument[] = [
  {
    id: "doc1",
    userId: "user1",
    userName: "John Doe",
    type: "driver_license",
    documentNumber: "DL-2024-001",
    expiryDate: new Date("2027-06-15"),
    issuingCountry: "US",
    status: "pending",
    uploadedAt: new Date("2024-03-01"),
  },
  {
    id: "doc2",
    userId: "user2",
    userName: "Jane Smith",
    type: "passport",
    documentNumber: "PP-UK-892341",
    expiryDate: new Date("2029-11-20"),
    issuingCountry: "UK",
    status: "approved",
    uploadedAt: new Date("2024-02-25"),
    verifiedAt: new Date("2024-02-27"),
  },
  {
    id: "doc3",
    userId: "user3",
    userName: "Ahmed Hassan",
    type: "vehicle_registration",
    documentNumber: "VR-AE-55432",
    expiryDate: new Date("2025-09-10"),
    issuingCountry: "AE",
    status: "rejected",
    uploadedAt: new Date("2024-02-20"),
    rejectionReason: "Document expired or illegible scan",
  },
  {
    id: "doc4",
    userId: "user4",
    userName: "Sara Ali",
    type: "id_card",
    documentNumber: "ID-AE-77281",
    expiryDate: new Date("2028-03-05"),
    issuingCountry: "AE",
    status: "pending",
    uploadedAt: new Date("2024-03-02"),
  },
];

export default function KYCDocumentsPage() {
  const { t } = useTranslation();
  const p = "kyc.documentsPage";

  const [documents, setDocuments] = useState<KYCDocument[]>(initialDocuments);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    type: "passport" as KYCDocument["type"],
    documentNumber: "",
    expiryDate: "",
    issuingCountry: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: KYCDocument = {
      id: `doc-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: form.userName,
      type: form.type,
      documentNumber: form.documentNumber,
      expiryDate: new Date(form.expiryDate),
      issuingCountry: form.issuingCountry,
      status: "pending",
      uploadedAt: new Date(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setForm({
      userName: "",
      type: "passport",
      documentNumber: "",
      expiryDate: "",
      issuingCountry: "",
    });
    setShowUpload(false);
  };

  const stats = [
    {
      title: t(`${p}.totalDocuments`),
      value: "4,312",
      icon: FileText,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.pendingReview`),
      value: "187",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t("kyc.approved"),
      value: "3,890",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("kyc.rejected"),
      value: "235",
      icon: XCircle,
      color: "from-red-500 to-pink-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowUpload(true)}>
            <Upload size={16} className="me-2" />
            {t(`${p}.uploadBtn`)}
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t(`${p}.searchPlaceholder`)}
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]"
            />
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allStatus`)}</option>
              <option>{t("kyc.pending")}</option>
              <option>{t("kyc.approved")}</option>
              <option>{t("kyc.rejected")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t(`${p}.passport`)}</option>
              <option>{t(`${p}.idCard`)}</option>
              <option>{t(`${p}.driverLicense`)}</option>
              <option>{t(`${p}.vehicleRegistration`)}</option>
            </select>
          </div>

          <KYCDocumentsTable data={documents} />
        </div>
      </div>

      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.uploadTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formUserName`)}
              </label>
              <input
                type="text"
                required
                value={form.userName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userName: e.target.value }))
                }
                placeholder={t(`${p}.formUserNamePlaceholder`)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formDocType`)}
              </label>
              <select
                required
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    type: e.target.value as KYCDocument["type"],
                  }))
                }
                className={inputClass}
              >
                <option value="passport">{t(`${p}.passport`)}</option>
                <option value="id_card">{t(`${p}.idCard`)}</option>
                <option value="driver_license">
                  {t(`${p}.driverLicense`)}
                </option>
                <option value="vehicle_registration">
                  {t(`${p}.vehicleRegistration`)}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formDocNumber`)}
              </label>
              <input
                type="text"
                required
                value={form.documentNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, documentNumber: e.target.value }))
                }
                placeholder={t(`${p}.formDocNumberPlaceholder`)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formExpiryDate`)}
              </label>
              <input
                type="date"
                required
                value={form.expiryDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, expiryDate: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formIssuingCountry`)}
              </label>
              <input
                type="text"
                required
                value={form.issuingCountry}
                onChange={(e) =>
                  setForm((f) => ({ ...f, issuingCountry: e.target.value }))
                }
                placeholder={t(`${p}.formIssuingCountryPlaceholder`)}
                className={inputClass}
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                {t(`${p}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${p}.submitBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
