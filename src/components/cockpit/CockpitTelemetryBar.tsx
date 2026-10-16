"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Moon, Sun, FileText, Bot, ArrowLeft } from "lucide-react";
import { profileData } from "@/data/profile";

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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all font-mono text-xs font-semibold shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Cockpit</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)]">
              Esc
            </kbd>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)] transition-colors duration-300" />
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

      {/* Right: Clock + AsP Assistant + Resume + Mode Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {timeStr && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] px-2.5 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span>{timeStr}</span>
          </div>
        )}

        {/* Quick AsP AI Co-Pilot trigger */}
        <button
          onClick={onOpenAsp}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all font-mono text-xs"
          title="Open AsP AI Co-pilot (Press /)"
        >
          <Bot className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
          <span className="hidden sm:inline font-medium">AsP Co-pilot</span>
          <kbd className="px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] text-[10px] border border-[var(--border-subtle)] text-[var(--text-muted)]">
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

        {/* Light / Dark Mode Toggle with tactile chrome rim */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-accent)] text-[var(--theme-accent-fg)] transition-all shadow-sm flex items-center justify-center group"
          title={isLight ? "Switch to Dark Mode (Stealth Titanium Chrome)" : "Switch to Light Mode (Deep Obsidian Gunmetal)"}
        >
          {isLight ? (
            <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12 text-slate-800" />
          ) : (
            <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 text-slate-200" />
          )}
        </button>
      </div>
    </header>
  );
}
