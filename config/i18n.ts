import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLocale from "@/locales/en.json";
import arLocale from "@/locales/ar.json";

const resources = {
  en: { translation: enLocale },
  ar: { translation: arLocale },
};

export const defaultLanguage = "en";
export const supportedLanguages = ["en", "ar"] as const;

function getInitialLanguage(): string {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = localStorage.getItem("amirni_language");
  return stored === "ar" ? "ar" : "en";
}

if (typeof window !== "undefined" && !i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
