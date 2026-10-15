"use client";

import React from "react";
import { BotLogo } from "@/components/BotLogo";
import { profileData } from "@/data/profile";

interface FloatingBotDockProps {
  onOpenBot: () => void;
  onSelectTopic: (topicId: string) => void;
  isBotOpen: boolean;
}

export function FloatingBotDock({
  onOpenBot,
  onSelectTopic,
  isBotOpen,
}: FloatingBotDockProps) {
  // Selected realistic questions to showcase on the dock
  const featuredQuestions = [
    { id: "programming-languages", text: "What programming languages do you know?" },
    { id: "experience-unisys", text: "Tell me about your time at Unisys" },
    { id: "career-journey", text: "Where have you worked in the past?" },
    { id: "current-role", text: "What are you building at CNZ?" },
    { id: "experience-amd", text: "What did you do at AMD India?" },
    { id: "agentic-ai", text: "How do you practice Agentic AI?" },
    { id: "education", text: "Where was your education?" },
  ];

  return (
    <div
      className={`fixed bottom-4 inset-x-0 z-30 px-4 pointer-events-none transition-all duration-300 ease-out xl:opacity-0 xl:pointer-events-none xl:translate-y-6 ${
        isBotOpen
          ? "opacity-0 translate-y-6 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      aria-hidden={isBotOpen}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
        {/* Floating Interactive Dock Pill */}
        <div className="pointer-events-auto theme-dock px-3 py-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 max-w-full overflow-hidden">
          {/* Main Bot Button */}
          <button
            onClick={onOpenBot}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl accent-subtle-bg text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)] transition-all font-mono text-xs shrink-0 group active:scale-95"
            title="Open AsP interactive assistant (Press /)"
          >
            <BotLogo size="xs" withBeacon={true} />
            <span className="font-semibold theme-heading">Ask AsP</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/50 text-[10px] text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)] font-mono">
              /
            </kbd>
          </button>

          {/* Realistic Question Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5 scrollbar-none text-xs font-sans">
            {featuredQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => onSelectTopic(q.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg theme-subtle-box text-neutral-700 dark:text-neutral-300 hover:text-[var(--theme-accent-text)] dark:hover:text-[var(--theme-accent-text-dark)] hover:border-[var(--border-accent)] transition-all active:scale-95 group text-left"
                title={`Ask: "${q.text}"`}
              >
                <span className="text-[var(--theme-accent)] transition-colors duration-300">💬</span>
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
