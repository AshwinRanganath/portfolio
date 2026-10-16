"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Bot, Briefcase, Cpu, GraduationCap, User } from "lucide-react";
import { CockpitSection } from "../CockpitDock";
import { HeroExpandedView } from "./HeroExpandedView";
import { ExperienceExpandedView } from "./ExperienceExpandedView";
import { TechExpandedView } from "./TechExpandedView";
import { EducationExpandedView } from "./EducationExpandedView";
import { ChatTerminal } from "@/components/ChatTerminal";

interface ExpandedStageModalProps {
  activeSection: CockpitSection;
  onClose: () => void;
  onAskAsp: (query?: string) => void;
  initialTopicId?: string | null;
}

export function ExpandedStageModal({
  activeSection,
  onClose,
  onAskAsp,
  initialTopicId,
}: ExpandedStageModalProps) {
  // Listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (activeSection === "home") return null;

  const getSectionMetadata = () => {
    switch (activeSection) {
      case "hero":
        return {
          title: "Ashwin Ranganath — Profile & Bio",
          tab: "ashwin_profile.json",
          icon: User,
        };
      case "experience":
        return {
          title: "Enterprise Work History & Milestones",
          tab: "experience_timeline.ts",
          icon: Briefcase,
        };
      case "tech":
        return {
          title: "Technology Radar & Architecture Matrix",
          tab: "tech_radar.config",
          icon: Cpu,
        };
      case "projects":
        return {
          title: "Education, Academic Credentials & Honors",
          tab: "education_credentials.ts",
          icon: GraduationCap,
        };
      case "asp":
        return {
          title: "Ask AsP — Interactive Portfolio Assistant",
          tab: "asp_chat.terminal",
          icon: Bot,
        };
      default:
        return {
          title: "Cockpit Stage",
          tab: "overview.sys",
          icon: User,
        };
    }
  };

  const meta = getSectionMetadata();
  const Icon = meta.icon;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cockpit-stage-title"
      >
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.4 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 140) {
              onClose();
            }
          }}
          className="relative w-full max-w-4xl h-[84vh] max-h-[88vh] rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"
        >
          {/* Mobile Drag Pill Handle */}
          <div className="sm:hidden flex justify-center pt-2 pb-1 bg-[var(--bg-titlebar)]">
            <div className="w-12 h-1 rounded-full bg-white/20" />
          </div>

          {/* CarPlay Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-titlebar)] border-b border-[var(--border-subtle)] select-none shrink-0">
            {/* Left: Window Traffic Lights + Tab Name */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center group"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X className="w-2 h-2 text-rose-950 opacity-0 group-hover:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              {/* Tab Chip */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--theme-accent-fg)]">
                <Icon className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
                <span id="cockpit-stage-title" className="font-semibold">
                  {meta.tab}
                </span>
              </div>
            </div>

            {/* Right: Tactile Back/Close Pill */}
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
              <kbd className="px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] font-mono">
                Esc
              </kbd>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            {activeSection === "hero" && (
              <HeroExpandedView onAskAsp={onAskAsp} />
            )}
            {activeSection === "experience" && (
              <ExperienceExpandedView onAskAsp={onAskAsp} />
            )}
            {activeSection === "tech" && (
              <TechExpandedView onAskAsp={onAskAsp} />
            )}
            {activeSection === "projects" && (
              <EducationExpandedView onAskAsp={onAskAsp} />
            )}
            {activeSection === "asp" && (
              <div className="flex-1 min-h-0 flex flex-col">
                <ChatTerminal
                  initialTopicId={initialTopicId}
                  onReturnToProfile={onClose}
                  isActive={true}
                  isDualPane={false}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
