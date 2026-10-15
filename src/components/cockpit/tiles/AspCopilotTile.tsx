"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles, Send, ArrowUpRight } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface AspCopilotTileProps {
  onExpand: (initialQuery?: string) => void;
}

export function AspCopilotTile({ onExpand }: AspCopilotTileProps) {
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "What programming languages do you code in?",
    "Tell me about your work at Unisys",
    "What are you building at CNZ Consultants?",
    "Tell me about your AMD India experience & award",
    "What is your backend & microservices stack?",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSuggestionIdx((prev) => (prev + 1) % suggestions.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [suggestions.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onExpand(inputValue.trim());
      setInputValue("");
    } else {
      onExpand();
    }
  };

  return (
    <SpecularBorder
      layoutId="asp-tile"
      className="h-full"
    >
      <div className="p-3 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Ask AsP
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                AI Co-pilot &bull; Interactive Terminal
              </span>
            </div>
          </div>
          <button
            onClick={() => onExpand()}
            className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] hover:opacity-80 transition-opacity"
            title="Launch Full Terminal"
          >
            <span>Launch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Rotating Suggestion Ticker */}
        <div
          onClick={() => onExpand(suggestions[activeSuggestionIdx])}
          className="my-1.5 sm:my-2.5 p-2 sm:p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)] cursor-pointer transition-all"
        >
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-[var(--theme-accent-text-dark)] mb-0.5 sm:mb-1">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Interactive Prompt:</span>
          </div>
          <p className="text-[11px] sm:text-xs font-mono text-[var(--text-heading)] line-clamp-1 italic">
            &ldquo;{suggestions[activeSuggestionIdx]}&rdquo;
          </p>
        </div>

        {/* Mobile Tap-to-Chat Action */}
        <div
          onClick={() => onExpand()}
          className="sm:hidden flex items-center justify-between p-2 rounded-xl bg-[var(--theme-accent-subtle)]/50 border border-[var(--border-accent)] cursor-pointer"
        >
          <span className="text-[10px] font-mono text-[var(--theme-accent-text-dark)]">
            Open Chat Terminal &bull; Ask anything
          </span>
          <Send className="w-3 h-3 text-[var(--theme-accent)]" />
        </div>

        {/* Desktop Quick Question Input Form */}
        <form onSubmit={handleSubmit} className="hidden sm:block relative mt-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AsP anything..."
            className="w-full pl-3 pr-9 py-2 text-xs font-mono rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-[var(--theme-accent-border)] text-[var(--text-heading)] placeholder-[var(--text-faint)] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[var(--theme-accent-text-dark)] hover:bg-[var(--theme-accent-subtle)] transition-colors"
            title="Submit question"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </SpecularBorder>
  );
}
