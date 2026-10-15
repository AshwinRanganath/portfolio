"use client";

import React from "react";
import { LayoutGrid, Briefcase, Cpu, Rocket, Bot, FileText } from "lucide-react";
import { motion } from "framer-motion";

export type CockpitSection = "home" | "hero" | "experience" | "tech" | "projects" | "asp";

interface CockpitDockProps {
  activeSection: CockpitSection;
  onSelectSection: (section: CockpitSection) => void;
}

interface DockItem {
  id: CockpitSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hotkey: string;
  isExternal?: boolean;
  href?: string;
}

export function CockpitDock({ activeSection, onSelectSection }: CockpitDockProps) {
  const dockItems: DockItem[] = [
    { id: "home", label: "Cockpit", icon: LayoutGrid, hotkey: "Esc" },
    { id: "experience", label: "Experience", icon: Briefcase, hotkey: "1" },
    { id: "tech", label: "Tech Radar", icon: Cpu, hotkey: "2" },
    { id: "projects", label: "Systems", icon: Rocket, hotkey: "3" },
    { id: "asp", label: "AsP Co-pilot", icon: Bot, hotkey: "/" },
    {
      id: "home",
      label: "Resume",
      icon: FileText,
      hotkey: "R",
      isExternal: true,
      href: "/resume",
    },
  ];

  return (
    <nav
      aria-label="CarPlay Dock"
      className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[var(--bg-dock)]/90 backdrop-blur-2xl border border-[var(--border-subtle)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive =
            !item.isExternal &&
            (activeSection === item.id || (item.id === "home" && activeSection === "home"));

          if (item.isExternal && item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                className="group relative flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-subtle)] transition-all font-mono text-xs select-none"
                title={`${item.label} (Press ${item.hotkey})`}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="hidden md:inline font-medium">{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectSection(item.id)}
              className={`group relative flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-all font-mono text-xs select-none ${
                isActive
                  ? "text-[var(--theme-accent-text-dark)] bg-[var(--theme-accent-subtle)] font-semibold shadow-inner"
                  : "text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-subtle)]"
              }`}
              title={`${item.label} (Press ${item.hotkey})`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  className="absolute inset-0 rounded-xl border border-[var(--border-accent)] bg-[var(--theme-accent-subtle)] -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? "text-[var(--theme-accent)]" : ""
                }`}
              />
              <span className="hidden md:inline">{item.label}</span>

              {/* Hotkey tag */}
              <kbd
                className={`hidden lg:inline-block px-1 py-0.2 rounded text-[10px] ${
                  isActive
                    ? "bg-black/30 text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)]"
                    : "bg-white/5 text-[var(--text-faint)] border border-white/5"
                }`}
              >
                {item.hotkey}
              </kbd>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
