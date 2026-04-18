"use client";

import { Globe2, Languages, MoonStar, SunMedium } from "lucide-react";
import { useSitePreferences } from "@/app/ui-preferences";

function cn(...values: Array<string | false>) {
  return values.filter(Boolean).join(" ");
}

const preferenceCopy = {
  zh: {
    dark: "夜间",
    language: "语言",
    light: "白天",
    theme: "主题",
  },
  en: {
    dark: "Dark",
    language: "Language",
    light: "Light",
    theme: "Theme",
  },
} as const;

export function FloatingPreferences() {
  const { language, setLanguage, setTheme, theme } = useSitePreferences();
  const copy = preferenceCopy[language];

  return (
    <div
      className="site-preferences floating-preferences"
      aria-label={`${copy.theme} / ${copy.language}`}
    >
      <div className="preference-segment">
        <button
          type="button"
          className={cn("preference-button", theme === "light" && "active")}
          onClick={() => setTheme("light")}
          aria-label={copy.light}
          title={copy.light}
        >
          <SunMedium className="preference-icon" />
        </button>
        <button
          type="button"
          className={cn("preference-button", theme === "dark" && "active")}
          onClick={() => setTheme("dark")}
          aria-label={copy.dark}
          title={copy.dark}
        >
          <MoonStar className="preference-icon" />
        </button>
      </div>

      <div className="preference-segment">
        <button
          type="button"
          className={cn("preference-button", language === "zh" && "active")}
          onClick={() => setLanguage("zh")}
          aria-label="中文"
          title="中文"
        >
          <Globe2 className="preference-icon" />
        </button>
        <button
          type="button"
          className={cn("preference-button", language === "en" && "active")}
          onClick={() => setLanguage("en")}
          aria-label="English"
          title="English"
        >
          <Languages className="preference-icon" />
        </button>
      </div>
    </div>
  );
}
