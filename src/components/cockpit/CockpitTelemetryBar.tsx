"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Moon, Sun, FileText, Bot, ArrowLeft } from "lucide-react";
import { profileData } from "@/data/profile";
import { ThemePicker } from "@/components/ThemePicker";

interface CockpitTelemetryBarProps {
  activeTileId: string | null;
  onBackToCockpit: () => void;
  onOpenAsp: () => void;
}

export function CockpitTelemetryBar({
  activeTileId,
  onBackToCockpit,
  onOpenAsp,
}: CockpitTelemetryBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light");
    }

    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setTimeStr(`${formatted} IST`);
      } catch {
        setTimeStr("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextLight = !isLight;
    setIsLight(nextLight);
    if (nextLight) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm select-none z-30">
      {/* Left: CarPlay Status / Back to Cockpit trigger */}
      <div className="flex items-center gap-2 sm:gap-3">
        {activeTileId ? (
          <button
            onClick={onBackToCockpit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-[var(--theme-accent-text-dark)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all font-mono text-xs font-semibold shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Cockpit</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/30 border border-white/10 text-[10px] text-zinc-300">
              Esc
            </kbd>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)] transition-colors duration-300" />
            <span className="font-mono font-medium tracking-tight text-[var(--text-heading)]">
              {profileData.handle}@cockpit:~$
            </span>
          </div>
        )}

        {/* Live Availability Status */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs">Available for roles</span>
        </div>
      </div>

      {/* Right: Clock + AsP Assistant + Resume + Theme Picker + Mode Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {timeStr && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span>{timeStr}</span>
          </div>
        )}

        {/* Quick AsP AI Co-Pilot trigger */}
        <button
          onClick={onOpenAsp}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-[var(--theme-accent-text-dark)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all font-mono text-xs"
          title="Open AsP AI Co-pilot (Press /)"
        >
          <Bot className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span className="hidden sm:inline font-medium">AsP Co-pilot</span>
          <kbd className="px-1.5 py-0.2 rounded bg-black/20 text-[10px] border border-[var(--border-accent)]">
            /
          </kbd>
        </button>

        {/* Resume Button */}
        <a
          href="/resume"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-[var(--text-body)] hover:text-[var(--text-heading)] transition-all font-mono text-xs"
        >
          <FileText className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span>Resume</span>
        </a>

        {/* Live Theme Palette Picker */}
        <ThemePicker />

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors"
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
