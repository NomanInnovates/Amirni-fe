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
import { KYCApplicationsTable } from "@/features/kyc/components/applications-table";
import { KYCApplication } from "@/features/kyc/types";
import {
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const initialApplications: KYCApplication[] = [
  {
    id: "1",
    userId: "user1",
    status: "pending",
    documents: [],
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-15"),
      nationality: "US",
      address: "123 Main St, New York, NY 10001",
    },
    verificationLevel: "level1",
    submittedAt: new Date("2024-03-01"),
  },
  {
    id: "2",
    userId: "user2",
    status: "approved",
    documents: [],
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: new Date("1985-05-20"),
      nationality: "UK",
      address: "456 Oak Ave, London, UK",
    },
    verificationLevel: "level2",
    completedAt: new Date("2024-02-28"),
  },
  {
    id: "3",
    userId: "user3",
    status: "incomplete",
    documents: [],
    personalInfo: {
      firstName: "Ahmed",
      lastName: "Hassan",
      dateOfBirth: new Date("1992-08-10"),
      nationality: "AE",
      address: "789 Palm Road, Dubai, AE",
    },
    verificationLevel: "level0",
  },
];

export default function KYCPage() {
  const { t } = useTranslation();
  const p = "kyc.applicationsPage";

  const [applications, setApplications] =
    useState<KYCApplication[]>(initialApplications);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    verificationLevel: "level1" as KYCApplication["verificationLevel"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: KYCApplication = {
      id: `app-${Date.now()}`,
      userId: `user-${Date.now()}`,
      status: "pending",
      documents: [],
      personalInfo: {
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: new Date(form.dateOfBirth),
        nationality: form.nationality,
        address: form.address,
      },
      verificationLevel: form.verificationLevel,
      submittedAt: new Date(),
    };
    setApplications((prev) => [newApp, ...prev]);
    setForm({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      verificationLevel: "level1",
    });
    setShowUpload(false);
  };

  const kycStats = [
    {
      title: t(`${p}.totalApplications`),
      value: "2,453",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.pendingReview`),
      value: "348",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t("kyc.approved"),
      value: "1,985",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("kyc.rejected"),
      value: "120",
      icon: AlertCircle,
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
          {kycStats.map((stat, index) => (
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
              <option>{t("kyc.incomplete")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allLevels`)}</option>
              <option>Level 1</option>
              <option>Level 2</option>
              <option>Level 3</option>
            </select>
          </div>

          <KYCApplicationsTable data={applications} />
        </div>
      </div>

      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.uploadTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formFirstName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  placeholder={t(`${p}.formFirstNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formLastName`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  placeholder={t(`${p}.formLastNamePlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.dateOfBirth`)}
              </label>
              <input
                type="date"
                required
                value={form.dateOfBirth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dateOfBirth: e.target.value }))
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formNationality`)}
              </label>
              <input
                type="text"
                required
                value={form.nationality}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nationality: e.target.value }))
                }
                placeholder={t(`${p}.formNationalityPlaceholder`)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.address`)}
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                placeholder={t(`${p}.formAddressPlaceholder`)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.verificationLevel`)}
              </label>
              <select
                required
                value={form.verificationLevel}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    verificationLevel: e.target
                      .value as KYCApplication["verificationLevel"],
                  }))
                }
                className={inputClass}
              >
                <option value="level0">Level 0</option>
                <option value="level1">Level 1</option>
                <option value="level2">Level 2</option>
                <option value="level3">Level 3</option>
              </select>
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
