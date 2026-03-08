import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type Locale = "en" | "ar";

interface LocaleState {
  language: Locale;
  dir: "ltr" | "rtl";
}

function getStoredLanguage(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("amirni_language");
  return stored === "ar" ? "ar" : "en";
}

const storedLang = getStoredLanguage();

const initialState: LocaleState = {
  language: storedLang,
  dir: storedLang === "ar" ? "rtl" : "ltr",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.language = action.payload;
      state.dir = action.payload === "ar" ? "rtl" : "ltr";
      if (typeof window !== "undefined") {
        localStorage.setItem("amirni_language", action.payload);
      }
    },
    toggleLanguage: (state) => {
      state.language = state.language === "ar" ? "en" : "ar";
      state.dir = state.language === "ar" ? "rtl" : "ltr";
      if (typeof window !== "undefined") {
        localStorage.setItem("amirni_language", state.language);
      }
    },
  },
});

export const { setLanguage, toggleLanguage } = localeSlice.actions;

export const selectLocale = (state: RootState) => state.locale;

export default localeSlice.reducer;
