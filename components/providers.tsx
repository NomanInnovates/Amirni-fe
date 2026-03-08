"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store/store";
import { selectLocale } from "@/store/slices/localeSlice";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/config/i18n";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function LocaleSync() {
  const { language, dir } = useSelector(selectLocale);
  const { i18n } = useTranslation();

  useIsomorphicLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, dir, i18n]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LocaleSync />
        {children}
        <Toaster position="top-right" />
      </Provider>
    </QueryClientProvider>
  );
}
