"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SiteTheme = "light" | "dark";
export type SiteLanguage = "zh" | "en";

type SitePreferencesContextValue = {
  language: SiteLanguage;
  mounted: boolean;
  setLanguage: (language: SiteLanguage) => void;
  setTheme: (theme: SiteTheme) => void;
  theme: SiteTheme;
};

const THEME_STORAGE_KEY = "noveshop-theme";
const LANGUAGE_STORAGE_KEY = "noveshop-language";

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

function normalizeTheme(value: string | null): SiteTheme | null {
  return value === "light" || value === "dark" ? value : null;
}

function normalizeLanguage(value: string | null): SiteLanguage | null {
  return value === "zh" || value === "en" ? value : null;
}

function getSystemTheme(): SiteTheme {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>("light");
  const [language, setLanguage] = useState<SiteLanguage>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = normalizeTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
      const savedLanguage = normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));

      setTheme(savedTheme ?? getSystemTheme());
      setLanguage(savedLanguage ?? "zh");
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

    if (!mounted) {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, mounted, theme]);

  const value = useMemo(
    () => ({
      language,
      mounted,
      setLanguage,
      setTheme,
      theme,
    }),
    [language, mounted, theme],
  );

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error("useSitePreferences must be used inside SitePreferencesProvider.");
  }

  return context;
}
