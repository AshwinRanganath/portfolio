"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Moon, Sun, FileText, Bot } from "lucide-react";
import { profileData } from "@/data/profile";

interface HeaderProps {
  onOpenBot: () => void;
}

export function Header({ onOpenBot }: HeaderProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isLight, setIsLight] = useState<boolean>(false);

  useEffect(() => {
    // Initial theme check
    const isSavedLight = localStorage.getItem("theme") === "light";
    if (isSavedLight) {
      setIsLight(true);
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
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between text-xs sm:text-sm select-none">
      {/* Left: Terminal brand identifier */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md theme-subtle-box">
          <Terminal className="w-3.5 h-3.5 text-[var(--theme-accent)] transition-colors duration-300" />
          <span className="font-mono font-medium tracking-tight theme-heading">
            {profileData.handle}@platform:~$
          </span>
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs">Available for roles</span>
        </div>
      </div>

      {/* Right: Clock + Hotkey Trigger + Theme Palette Picker + Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {timeStr && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs theme-muted px-2.5 py-1 rounded-md theme-subtle-box">
            <span>{timeStr}</span>
          </div>
        )}

        {/* Quick Assistant Launcher */}
        <button
          onClick={onOpenBot}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md accent-subtle-bg border border-[var(--border-accent)] text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] transition-all font-mono text-xs"
          title="Open AsP Assistant (Press /)"
        >
          <Bot className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span className="hidden sm:inline font-medium">Ask AsP</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/40 text-[10px] text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)]">
            /
          </kbd>
        </button>

        {/* Resume Link */}
        <a
          href="/resume"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md theme-subtle-box theme-body hover:theme-heading transition-all font-mono text-xs"
        >
          <FileText className="w-3.5 h-3.5 theme-muted" />
          <span>Resume</span>
        </a>

        {/* Dark/Light Switcher */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-1.5 rounded-md theme-subtle-box text-[var(--theme-accent-fg)] hover:theme-heading transition-colors"
          title={isLight ? "Switch to Dark Mode (Stealth Titanium Chrome)" : "Switch to Light Mode (Deep Obsidian Gunmetal)"}
        >
          {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
