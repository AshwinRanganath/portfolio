"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AccentTheme =
  | "amber"
  | "emerald"
  | "violet"
  | "coral"
  | "glacier"
  | "titanium";

export interface ThemeOption {
  id: AccentTheme;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
  previewClass: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "amber",
    name: "Linear Amber",
    tagline: "Warm Bronze & Artisan Craft",
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    previewClass: "from-amber-400 to-amber-600",
  },
  {
    id: "emerald",
    name: "Cyber Emerald",
    tagline: "Matrix & High-Throughput Terminal",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    previewClass: "from-emerald-400 to-emerald-600",
  },
  {
    id: "violet",
    name: "Electric Iris",
    tagline: "Frontier AI & Deep Space",
    primaryColor: "#8b5cf6",
    secondaryColor: "#6366f1",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    previewClass: "from-violet-400 to-indigo-600",
  },
  {
    id: "coral",
    name: "Sunset Coral",
    tagline: "Silicon Valley Radiant Energy",
    primaryColor: "#f97316",
    secondaryColor: "#fb7185",
    gradient: "linear-gradient(135deg, #f97316, #fb7185)",
    previewClass: "from-orange-400 to-rose-500",
  },
  {
    id: "glacier",
    name: "Glacier Frost",
    tagline: "Nordic Minimal & Clean Steel",
    primaryColor: "#0ea5e9",
    secondaryColor: "#2563eb",
    gradient: "linear-gradient(135deg, #0ea5e9, #2563eb)",
    previewClass: "from-sky-400 to-blue-600",
  },
  {
    id: "titanium",
    name: "Stealth Titanium",
    tagline: "Monochrome Brutalist Luxury",
    primaryColor: "#f1f5f9",
    secondaryColor: "#94a3b8",
    gradient: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
    previewClass: "from-slate-200 to-slate-400",
  },
];

interface ThemeContextType {
  accent: AccentTheme;
  setAccent: (accent: AccentTheme) => void;
  options: ThemeOption[];
  currentOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>("titanium");

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-accent-theme", "titanium");
      document.documentElement.setAttribute("data-accent", "titanium");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setAccent = (newAccent: AccentTheme) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem("portfolio-accent-theme", newAccent);
      document.documentElement.setAttribute("data-accent", newAccent);
    } catch {
      // Ignore
    }
  };

  const currentOption =
    THEME_OPTIONS.find((t) => t.id === accent) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        options: THEME_OPTIONS,
        currentOption,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
