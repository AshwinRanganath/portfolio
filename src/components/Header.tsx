"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Moon, Sun, FileText, Sparkles } from "lucide-react";
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
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 dark:border-white/10 border-neutral-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono font-medium tracking-tight text-white dark:text-white text-neutral-900">
            {profileData.handle}@platform:~$
          </span>
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs">Available for roles</span>
        </div>
      </div>

      {/* Right: Clock + Hotkey Trigger + Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {timeStr && (
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-neutral-400 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
            <span>{timeStr}</span>
          </div>
        )}

        {/* Quick Assistant Launcher */}
        <button
          onClick={onOpenBot}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all font-mono text-xs"
          title="Open Interactive Assistant (Press /)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI Bot</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-cyan-300 border border-cyan-500/40">
            /
          </kbd>
        </button>

        {/* Resume Link */}
        <a
          href="/resume"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 transition-all font-mono text-xs"
        >
          <FileText className="w-3.5 h-3.5 text-neutral-400" />
          <span>Resume</span>
        </a>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors"
        >
          {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
