"use client";

import React from "react";
import { Sparkles, ArrowRight, MessageSquareCode } from "lucide-react";
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

  return (
    <div className="fixed bottom-4 inset-x-0 z-30 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
        {/* Floating Interactive Dock Pill */}
        <div className="pointer-events-auto cli-card px-3 py-2 rounded-2xl shadow-2xl bg-neutral-900/90 backdrop-blur-xl border border-cyan-500/30 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 max-w-full overflow-hidden">
          {/* Main Bot Button */}
          <button
            onClick={onOpenBot}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all font-mono text-xs shrink-0 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <MessageSquareCode className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">Ask Ashwin Bot</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-cyan-300 border border-cyan-500/40">
              /
            </kbd>
          </button>

          {/* Quick Question Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5 scrollbar-none text-xs font-mono">
            {profileData.botTopics.slice(0, 5).map((topic) => (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/15 text-neutral-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all active:scale-95"
                title={`Press ${topic.keyNumber} to ask "${topic.question}"`}
              >
                <span className="text-[10px] text-neutral-500 font-mono">
                  {topic.keyNumber}:
                </span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
