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
import { AdsTable } from "@/features/content/components/ads-table";
import { Ad } from "@/features/content/types";
import { BarChart3, Play, Film, Eye, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialAds: Ad[] = [
  {
    id: "1",
    title: "Summer Sale Reel",
    type: "reel",
    vendorName: "Fashion Hub",
    mediaUrl: "/media/ad1.mp4",
    likes: 1250,
    views: 8900,
    status: "active",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    createdAt: new Date("2024-05-28"),
  },
  {
    id: "2",
    title: "Product Launch Video",
    type: "video",
    vendorName: "Tech World",
    mediaUrl: "/media/ad2.mp4",
    likes: 890,
    views: 12500,
    status: "active",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-09-30"),
    createdAt: new Date("2024-06-25"),
  },
  {
    id: "3",
    title: "Weekend Deals Banner",
    type: "banner",
    vendorName: "MegaMart",
    mediaUrl: "/media/ad3.png",
    likes: 340,
    views: 5600,
    status: "paused",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-07-15"),
    createdAt: new Date("2024-05-10"),
  },
  {
    id: "4",
    title: "Flash Story Ad",
    type: "story",
    vendorName: "Quick Bites",
    mediaUrl: "/media/ad4.mp4",
    likes: 2100,
    views: 15000,
    status: "expired",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    createdAt: new Date("2024-02-25"),
  },
  {
    id: "5",
    title: "New Collection Reel",
    type: "reel",
    vendorName: "Style Studio",
    mediaUrl: "/media/ad5.mp4",
    likes: 0,
    views: 0,
    status: "draft",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-11-30"),
    createdAt: new Date("2024-08-20"),
  },
];

export default function AdsPage() {
  const { t } = useTranslation();
  const p = "content.adsPage";

  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteAd, setDeleteAd] = useState<Ad | null>(null);
  const [form, setForm] = useState({
    title: "",
    type: "reel" as Ad["type"],
    vendorName: "",
    status: "draft" as Ad["status"],
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: Ad = {
      id: `ad-${Date.now()}`,
      title: form.title,
      type: form.type,
      vendorName: form.vendorName,
      mediaUrl: "",
      likes: 0,
      views: 0,
      status: form.status,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      createdAt: new Date(),
    };
    setAds((prev) => [newAd, ...prev]);
    setForm({
      title: "",
      type: "reel",
      vendorName: "",
      status: "draft",
      startDate: "",
      endDate: "",
    });
    setShowCreate(false);
  };

  const handleDelete = () => {
    if (deleteAd) {
      setAds((prev) => prev.filter((ad) => ad.id !== deleteAd.id));
      setDeleteAd(null);
    }
  };

  const stats = [
    {
      title: t(`${p}.totalAds`),
      value: "234",
      icon: BarChart3,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.activeAds`),
      value: "156",
      icon: Play,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.reels`),
      value: "89",
      icon: Film,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: t(`${p}.totalViews`),
      value: "45.2K",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]";

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
              <option>{t("content.statusActive")}</option>
              <option>{t("content.statusPaused")}</option>
              <option>{t("content.statusExpired")}</option>
              <option>{t("content.statusDraft")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allTypes`)}</option>
              <option>{t("content.typeReel")}</option>
              <option>{t("content.typeVideo")}</option>
              <option>{t("content.typeBanner")}</option>
              <option>{t("content.typeStory")}</option>
            </select>
          </div>

          <AdsTable data={ads} onDelete={(ad: Ad) => setDeleteAd(ad)} />
        </div>
      </div>

      {/* Create Ad Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formTitle`)}
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder={t(`${p}.formTitlePlaceholder`)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formType`)}
                </label>
                <select
                  required
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      type: e.target.value as Ad["type"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="reel">{t("content.typeReel")}</option>
                  <option value="video">{t("content.typeVideo")}</option>
                  <option value="banner">{t("content.typeBanner")}</option>
                  <option value="story">{t("content.typeStory")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formVendor`)}
                </label>
                <input
                  type="text"
                  required
                  value={form.vendorName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, vendorName: e.target.value }))
                  }
                  placeholder={t(`${p}.formVendorPlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formStartDate`)}
                </label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formEndDate`)}
                </label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, endDate: e.target.value }))
                  }
                  className={inputClass}
                />
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
                      status: e.target.value as Ad["status"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="draft">{t("content.statusDraft")}</option>
                  <option value="active">{t("content.statusActive")}</option>
                  <option value="paused">{t("content.statusPaused")}</option>
                </select>
              </div>
            </div>

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

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteAd}
        onOpenChange={(open) => !open && setDeleteAd(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t(`${p}.deleteTitle`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(`${p}.deleteDescription`, { name: deleteAd?.title })}
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
