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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { FAQsTable } from "@/features/content/components/faqs-table";
import { FAQ } from "@/features/content/types";
import { BarChart3, CheckCircle, FileEdit, Eye, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialFaqs: FAQ[] = [
  {
    id: "1",
    question: "How do I track my order after placing it on the marketplace?",
    answer:
      "You can track your order by navigating to the Orders section in your dashboard. Each order has a tracking number that you can use to see real-time updates on your shipment status.",
    category: "Orders",
    order: 1,
    status: "published",
    views: 3450,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-06-10"),
  },
  {
    id: "2",
    question: "What documents are required for KYC verification?",
    answer:
      "For KYC verification, you need to submit a valid government-issued ID (passport or national ID), proof of address (utility bill or bank statement), and a recent selfie for identity confirmation.",
    category: "Verification",
    order: 2,
    status: "published",
    views: 2890,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    id: "3",
    question: "How can I become a vendor on the platform?",
    answer:
      "To become a vendor, register through the vendor portal, complete the KYC process, submit your business documents, and wait for admin approval. The process typically takes 3-5 business days.",
    category: "Vendors",
    order: 3,
    status: "published",
    views: 1560,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-07-15"),
  },
  {
    id: "4",
    question:
      "What are the shipping options available for international orders?",
    answer:
      "We offer standard shipping (7-14 days), express shipping (3-5 days), and priority shipping (1-2 days) for international orders. Rates vary based on destination and package weight.",
    category: "Shipping",
    order: 4,
    status: "draft",
    views: 780,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-08-01"),
  },
];

export default function FAQsPage() {
  const { t } = useTranslation();
  const p = "content.faqsPage";

  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [showCreate, setShowCreate] = useState(false);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);
  const [deleteFaq, setDeleteFaq] = useState<FAQ | null>(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Orders",
    status: "draft" as FAQ["status"],
  });

  const resetForm = () => {
    setForm({
      question: "",
      answer: "",
      category: "Orders",
      status: "draft",
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: form.question,
      answer: form.answer,
      category: form.category,
      order: faqs.length + 1,
      status: form.status,
      views: 0,
      createdAt: now,
      updatedAt: now,
    };
    setFaqs((prev) => [newFaq, ...prev]);
    resetForm();
    setShowCreate(false);
  };

  const handleEdit = (faq: FAQ) => {
    setEditFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      status: faq.status,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFaq) return;
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === editFaq.id
          ? {
              ...faq,
              question: form.question,
              answer: form.answer,
              category: form.category,
              status: form.status,
              updatedAt: new Date(),
            }
          : faq,
      ),
    );
    resetForm();
    setEditFaq(null);
  };

  const handleDelete = () => {
    if (deleteFaq) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== deleteFaq.id));
      setDeleteFaq(null);
    }
  };

  const stats = [
    {
      title: t(`${p}.totalFaqs`),
      value: "56",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.published`),
      value: "48",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.draft`),
      value: "8",
      icon: FileEdit,
      color: "from-gray-400 to-gray-500",
    },
    {
      title: t(`${p}.totalViews`),
      value: "12.3K",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

  const formFields = (
    <>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t(`${p}.formQuestion`)}
        </label>
        <input
          type="text"
          required
          value={form.question}
          onChange={(e) =>
            setForm((f) => ({ ...f, question: e.target.value }))
          }
          placeholder={t(`${p}.formQuestionPlaceholder`)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {t(`${p}.formAnswer`)}
        </label>
        <textarea
          required
          value={form.answer}
          onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
          placeholder={t(`${p}.formAnswerPlaceholder`)}
          rows={4}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formCategory`)}
          </label>
          <select
            required
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className={inputClass}
          >
            <option value="Orders">{t(`${p}.catOrders`)}</option>
            <option value="Verification">{t(`${p}.catVerification`)}</option>
            <option value="Vendors">{t(`${p}.catVendors`)}</option>
            <option value="Shipping">{t(`${p}.catShipping`)}</option>
            <option value="General">{t(`${p}.catGeneral`)}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t(`${p}.formStatus`)}
          </label>
          <select
            required
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as FAQ["status"],
              }))
            }
            className={inputClass}
          >
            <option value="draft">{t("content.statusDraft")}</option>
            <option value="published">{t("content.statusPublished")}</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <GradientText>{t(`${p}.heading`)}</GradientText>
            </h1>
            <p className="text-muted-foreground">{t(`${p}.subtitle`)}</p>
          </div>
          <GradientButton onClick={() => setShowCreate(true)}>
            <Plus size={16} className="me-2" />
            {t(`${p}.createBtn`)}
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
              <option>{t("content.statusPublished")}</option>
              <option>{t("content.statusDraft")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allCategories`)}</option>
              <option>{t(`${p}.catOrders`)}</option>
              <option>{t(`${p}.catVerification`)}</option>
              <option>{t(`${p}.catVendors`)}</option>
              <option>{t(`${p}.catShipping`)}</option>
            </select>
          </div>

          <FAQsTable
            data={faqs}
            onEdit={handleEdit}
            onDelete={(faq: FAQ) => setDeleteFaq(faq)}
          />
        </div>
      </div>

      {/* Create FAQ Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            {formFields}
            <DialogFooter>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
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

      {/* Edit FAQ Modal */}
      <Dialog
        open={!!editFaq}
        onOpenChange={(open) => {
          if (!open) {
            setEditFaq(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.editTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            {formFields}
            <DialogFooter>
              <button
                type="button"
                onClick={() => {
                  setEditFaq(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(`${p}.cancelBtn`)}
              </button>
              <GradientButton type="submit">
                {t(`${p}.saveBtn`)}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteFaq}
        onOpenChange={(open) => !open && setDeleteFaq(null)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t(`${p}.deleteConfirmTitle`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(`${p}.deleteConfirmDesc`)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              {t(`${p}.cancelBtn`)}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-800 cursor-pointer"
            >
              {t(`${p}.deleteBtn`)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
