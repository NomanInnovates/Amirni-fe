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
import { ProfilesTable } from "@/features/users/components/profiles-table";
import { UserProfile } from "@/features/users/types";
import { Users, UserCheck, UserMinus, UserX, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialUsers: UserProfile[] = [
  {
    id: "1",
    name: "Ahmed Al-Rashid",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    status: "active",
    role: "user",
    joinedAt: new Date("2024-01-15"),
    lastActive: new Date("2024-03-10"),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+44 20 7946 0958",
    status: "active",
    role: "vendor",
    joinedAt: new Date("2023-11-20"),
    lastActive: new Date("2024-03-09"),
  },
  {
    id: "3",
    name: "Mohammed Hassan",
    email: "mohammed@example.com",
    phone: "+966 55 678 9012",
    status: "suspended",
    role: "driver",
    joinedAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Fatima Al-Zahra",
    email: "fatima@example.com",
    phone: "+971 55 234 5678",
    status: "inactive",
    role: "user",
    joinedAt: new Date("2023-09-10"),
    lastActive: new Date("2024-01-15"),
  },
  {
    id: "5",
    name: "Omar Khalid",
    email: "omar@example.com",
    phone: "+962 79 345 6789",
    status: "active",
    role: "vendor",
    joinedAt: new Date("2024-01-28"),
    lastActive: new Date("2024-03-11"),
  },
];

export default function UserProfilesPage() {
  const { t } = useTranslation();
  const p = "users.profilesPage";

  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteUser, setDeleteUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user" as UserProfile["role"],
    status: "active" as UserProfile["status"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      status: form.status,
      joinedAt: new Date(),
    };
    setUsers((prev) => [newUser, ...prev]);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "user",
      status: "active",
    });
    setShowCreate(false);
  };

  const handleDelete = () => {
    if (deleteUser) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
      setDeleteUser(null);
    }
  };

  const userStats = [
    {
      title: t(`${p}.totalUsers`),
      value: "2,453",
      icon: Users,
      color: "from-[#7C4099] to-[#01A8A9]",
    },
    {
      title: t(`${p}.activeUsers`),
      value: "1,985",
      icon: UserCheck,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: t(`${p}.inactiveUsers`),
      value: "348",
      icon: UserMinus,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: t(`${p}.suspendedUsers`),
      value: "120",
      icon: UserX,
      color: "to-red-600 from-pink-600",
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
            {t(`${p}.addUserBtn`)}
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
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
              <option>{t("users.active")}</option>
              <option>{t("users.inactive")}</option>
              <option>{t("users.suspended")}</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099]">
              <option>{t(`${p}.allRoles`)}</option>
              <option>{t("users.user")}</option>
              <option>{t("users.vendor")}</option>
              <option>{t("users.driver")}</option>
            </select>
          </div>

          <ProfilesTable
            data={users}
            onDelete={(user: UserProfile) => setDeleteUser(user)}
          />
        </div>
      </div>

      {/* Add User Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>
              <GradientText>{t(`${p}.createTitle`)}</GradientText>
            </DialogTitle>
            <DialogDescription>{t(`${p}.subtitle`)}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t(`${p}.formName`)}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder={t(`${p}.formNamePlaceholder`)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formEmail`)}
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder={t(`${p}.formEmailPlaceholder`)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formPhone`)}
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder={t(`${p}.formPhonePlaceholder`)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {t(`${p}.formRole`)}
                </label>
                <select
                  required
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      role: e.target.value as UserProfile["role"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="user">{t("users.user")}</option>
                  <option value="vendor">{t("users.vendor")}</option>
                  <option value="driver">{t("users.driver")}</option>
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
                      status: e.target.value as UserProfile["status"],
                    }))
                  }
                  className={inputClass}
                >
                  <option value="active">{t("users.active")}</option>
                  <option value="inactive">{t("users.inactive")}</option>
                  <option value="suspended">{t("users.suspended")}</option>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t(`${p}.deleteTitle`)}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(`${p}.deleteDescription`, { name: deleteUser?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer hover:bg-blue-100">
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
