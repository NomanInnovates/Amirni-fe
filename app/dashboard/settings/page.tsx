"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { useDispatch, useSelector } from "react-redux";
import { selectLocale, setLanguage } from "@/store/slices/localeSlice";
import { selectAuth } from "@/store/slices/authSlice";
import { useTranslation } from "react-i18next";
import {
  User,
  Globe,
  Bell,
  Shield,
  Palette,
  KeyRound,
  Save,
} from "lucide-react";

type Tab = "profile" | "language" | "notifications" | "security" | "appearance";

const tabConfig: { key: Tab; icon: React.ElementType; labelKey: string }[] = [
  { key: "profile", icon: User, labelKey: "settings.tabs.profile" },
  { key: "language", icon: Globe, labelKey: "settings.tabs.language" },
  { key: "notifications", icon: Bell, labelKey: "settings.tabs.notifications" },
  { key: "security", icon: Shield, labelKey: "settings.tabs.security" },
  { key: "appearance", icon: Palette, labelKey: "settings.tabs.appearance" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const dispatch = useDispatch();
  const { language } = useSelector(selectLocale);
  const { user } = useSelector(selectAuth);
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <GradientText>{t("settings.heading")}</GradientText>
          </h1>
          <p className="text-muted-foreground">{t("settings.subtitle")}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs sidebar */}
          <div className="lg:w-64 shrink-0">
            <nav className="bg-card rounded-xl border border-border p-2 space-y-1">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-[#7C4099]/10 text-[#7C4099]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon size={18} />
                    {t(tab.labelKey)}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card rounded-xl border border-border p-6">
            {activeTab === "profile" && (
              <ProfileSection userName={user?.name} userEmail={user?.email} />
            )}
            {activeTab === "language" && (
              <LanguageSection
                language={language}
                onLanguageChange={(lang) => dispatch(setLanguage(lang))}
              />
            )}
            {activeTab === "notifications" && <NotificationsSection />}
            {activeTab === "security" && <SecuritySection />}
            {activeTab === "appearance" && <AppearanceSection />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-border last:border-0">
      <label className="text-sm font-medium text-foreground sm:w-48 shrink-0">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function inputClass() {
  return "w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7C4099] text-sm";
}

// --- Profile ---
function ProfileSection({
  userName,
  userEmail,
}: {
  userName?: string;
  userEmail?: string;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        title={t("settings.profile.title")}
        description={t("settings.profile.description")}
      />
      <div>
        <FieldRow label={t("settings.profile.fullName")}>
          <input
            type="text"
            defaultValue={userName ?? ""}
            placeholder={t("settings.profile.namePlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
        <FieldRow label={t("settings.profile.email")}>
          <input
            type="email"
            defaultValue={userEmail ?? ""}
            placeholder={t("settings.profile.emailPlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
        <FieldRow label={t("settings.profile.phone")}>
          <input
            type="tel"
            placeholder={t("settings.profile.phonePlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
        <FieldRow label={t("settings.profile.role")}>
          <input
            type="text"
            value={t("settings.profile.admin")}
            disabled
            className={`${inputClass()} opacity-60 cursor-not-allowed`}
          />
        </FieldRow>
      </div>
      <div className="mt-6 flex justify-end">
        <GradientButton>
          <Save size={16} className="me-2" />
          {t("settings.profile.saveChanges")}
        </GradientButton>
      </div>
    </div>
  );
}

// --- Language ---
function LanguageSection({
  language,
  onLanguageChange,
}: {
  language: string;
  onLanguageChange: (lang: "en" | "ar") => void;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        title={t("settings.languageSection.title")}
        description={t("settings.languageSection.description")}
      />
      <div>
        <FieldRow label={t("settings.languageSection.language")}>
          <div className="flex gap-3">
            <button
              onClick={() => onLanguageChange("en")}
              className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                language === "en"
                  ? "border-[#7C4099] bg-[#7C4099]/10 text-[#7C4099]"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t("settings.languageSection.english")}
            </button>
            <button
              onClick={() => onLanguageChange("ar")}
              className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                language === "ar"
                  ? "border-[#7C4099] bg-[#7C4099]/10 text-[#7C4099]"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {t("settings.languageSection.arabic")}
            </button>
          </div>
        </FieldRow>
        <FieldRow label={t("settings.languageSection.timezone")}>
          <select className={inputClass()}>
            <option>UTC (GMT+0)</option>
            <option>Gulf Standard Time (GMT+4)</option>
            <option>Eastern Time (GMT-5)</option>
            <option>Pacific Time (GMT-8)</option>
            <option>Central European Time (GMT+1)</option>
          </select>
        </FieldRow>
        <FieldRow label={t("settings.languageSection.dateFormat")}>
          <select className={inputClass()}>
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </FieldRow>
      </div>
    </div>
  );
}

// --- Notifications ---
function NotificationsSection() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    kycUpdates: true,
    orderAlerts: true,
    shipmentAlerts: false,
    marketingEmails: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const notificationItems: {
    key: keyof typeof settings;
    labelKey: string;
    descKey: string;
  }[] = [
    {
      key: "emailAlerts",
      labelKey: "settings.notifications.emailAlerts",
      descKey: "settings.notifications.emailAlertsDesc",
    },
    {
      key: "pushNotifications",
      labelKey: "settings.notifications.pushNotifications",
      descKey: "settings.notifications.pushNotificationsDesc",
    },
    {
      key: "kycUpdates",
      labelKey: "settings.notifications.kycUpdates",
      descKey: "settings.notifications.kycUpdatesDesc",
    },
    {
      key: "orderAlerts",
      labelKey: "settings.notifications.orderAlerts",
      descKey: "settings.notifications.orderAlertsDesc",
    },
    {
      key: "shipmentAlerts",
      labelKey: "settings.notifications.shipmentAlerts",
      descKey: "settings.notifications.shipmentAlertsDesc",
    },
    {
      key: "marketingEmails",
      labelKey: "settings.notifications.marketingEmails",
      descKey: "settings.notifications.marketingEmailsDesc",
    },
  ];

  return (
    <div>
      <SectionHeader
        title={t("settings.notifications.title")}
        description={t("settings.notifications.description")}
      />
      <div>
        {notificationItems.map(({ key, labelKey, descKey }) => (
          <div
            key={key}
            className="flex items-center justify-between py-4 border-b border-border last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                {t(labelKey)}
              </p>
              <p className="text-xs text-muted-foreground">{t(descKey)}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings[key] ? "bg-[#7C4099]" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 start-0.5 size-5 rounded-full bg-white transition-transform ${
                  settings[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Security ---
function SecuritySection() {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        title={t("settings.security.title")}
        description={t("settings.security.description")}
      />
      <div>
        <FieldRow label={t("settings.security.currentPassword")}>
          <input
            type="password"
            placeholder={t("settings.security.currentPasswordPlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
        <FieldRow label={t("settings.security.newPassword")}>
          <input
            type="password"
            placeholder={t("settings.security.newPasswordPlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
        <FieldRow label={t("settings.security.confirmPassword")}>
          <input
            type="password"
            placeholder={t("settings.security.confirmPasswordPlaceholder")}
            className={inputClass()}
          />
        </FieldRow>
      </div>
      <div className="mt-6 flex justify-end">
        <GradientButton>
          <KeyRound size={16} className="me-2" />
          {t("settings.security.updatePassword")}
        </GradientButton>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {t("settings.security.twoFactorAuth")}
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
          <div>
            <p className="text-sm font-medium text-foreground">
              {t("settings.security.twoFactorDisabled")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("settings.security.twoFactorDescription")}
            </p>
          </div>
          <GradientButton variant="outline" size="sm">
            {t("settings.security.enable2FA")}
          </GradientButton>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          {t("settings.security.activeSessions")}
        </h3>
        <div className="space-y-3">
          {[
            {
              device: "Chrome on macOS",
              location: "Dubai, AE",
              time: "Current session",
              current: true,
            },
            {
              device: "Safari on iPhone",
              location: "Abu Dhabi, AE",
              time: "2 hours ago",
              current: false,
            },
          ].map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {session.device}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.location} &middot; {session.time}
                </p>
              </div>
              {session.current ? (
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  {t("settings.security.currentSession")}
                </span>
              ) : (
                <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                  {t("settings.security.revoke")}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Appearance ---
function AppearanceSection() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  const themeOptions: { key: "light" | "dark" | "system"; labelKey: string }[] =
    [
      { key: "light", labelKey: "settings.appearance.light" },
      { key: "dark", labelKey: "settings.appearance.dark" },
      { key: "system", labelKey: "settings.appearance.system" },
    ];

  return (
    <div>
      <SectionHeader
        title={t("settings.appearance.title")}
        description={t("settings.appearance.description")}
      />
      <div>
        <FieldRow label={t("settings.appearance.theme")}>
          <div className="flex gap-3">
            {themeOptions.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  theme === key
                    ? "border-[#7C4099] bg-[#7C4099]/10 text-[#7C4099]"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </FieldRow>
        <FieldRow label={t("settings.appearance.sidebarStyle")}>
          <select className={inputClass()}>
            <option>{t("settings.appearance.default")}</option>
            <option>{t("settings.appearance.compact")}</option>
          </select>
        </FieldRow>
        <FieldRow label={t("settings.appearance.tableRowsPerPage")}>
          <select className={inputClass()}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </FieldRow>
      </div>
    </div>
  );
}
