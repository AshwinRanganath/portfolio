"use client";

import React from "react";
import { MessageSquareCode } from "lucide-react";
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
  if (isBotOpen) return null;

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
    <div className="fixed bottom-4 inset-x-0 z-30 px-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
        {/* Floating Interactive Dock Pill */}
        <div className="pointer-events-auto theme-dock px-3 py-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 max-w-full overflow-hidden">
          {/* Main Bot Button */}
          <button
            onClick={onOpenBot}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 transition-all font-mono text-xs shrink-0 group active:scale-95"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <MessageSquareCode className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold theme-heading">Ask Ashwin Bot</span>
            <kbd className="px-1.5 py-0.5 rounded bg-cyan-950/20 dark:bg-black/50 text-[10px] text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-mono">
              /
            </kbd>
          </button>

          {/* Realistic Question Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5 scrollbar-none text-xs font-sans">
            {featuredQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => onSelectTopic(q.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg theme-subtle-box text-neutral-700 dark:text-neutral-300 hover:text-cyan-700 dark:hover:text-cyan-200 hover:border-cyan-500/40 transition-all active:scale-95 group text-left"
                title={`Ask: "${q.text}"`}
              >
                <span className="text-cyan-600 dark:text-cyan-400/80 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">💬</span>
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
