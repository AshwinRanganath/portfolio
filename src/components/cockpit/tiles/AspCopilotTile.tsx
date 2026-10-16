"use client";

import React, { useState } from "react";
import { Bot, Sparkles, Send, ArrowUpRight, Terminal } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface AspCopilotTileProps {
  onExpand: (initialQuery?: string) => void;
}

export function AspCopilotTile({ onExpand }: AspCopilotTileProps) {
  const [inputValue, setInputValue] = useState("");

  const quickPrompts = [
    { label: "CNZ Gateway Architecture", query: "What did Ashwin build at CNZ Consultants?" },
    { label: "Unisys AST Parser", query: "Tell me about the AST parser and LLM migration at Unisys" },
    { label: "Backend & Tech Stack", query: "What is Ashwin's backend tech stack and microservices experience?" },
    { label: "AMD Spotlight Award", query: "Tell me about Ashwin's award and work at AMD India" },
  ];

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
    <SpecularBorder layoutId="asp-tile" className="h-full">
      <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
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
                AsP &bull; AI Co-pilot
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Ask anything about Ashwin&apos;s experience
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

        {/* Quick Question Chips */}
        <div className="my-2 flex flex-col gap-1.5 flex-1 justify-center">
          <span className="text-[10px] font-mono text-[var(--text-faint)] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Suggested Inquiries:</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onExpand(item.query)}
                className="p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)]/70 hover:bg-[var(--theme-accent-subtle)] border border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)] text-left transition-all"
              >
                <span className="text-[10px] font-mono font-medium text-[var(--text-heading)] line-clamp-1">
                  &gt; {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Query Input Bar */}
        <form onSubmit={handleSubmit} className="pt-2 border-t border-[var(--border-subtle)]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AsP anything about Ashwin's experience..."
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-[var(--theme-accent)] text-xs font-mono text-[var(--text-heading)] placeholder:text-[var(--text-faint)] outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-1 rounded-lg bg-[var(--theme-accent)] text-white hover:opacity-90 transition-opacity shadow-sm"
              title="Submit question"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </SpecularBorder>
  );
}
