"use client";

import React from "react";
import { Server, Cloud, Globe, Bot, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";

interface TechExpandedViewProps {
  onAskAsp: (query?: string) => void;
}

export function TechExpandedView({ onAskAsp }: TechExpandedViewProps) {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Backend")) return Server;
    if (category.includes("Enterprise") || category.includes("Cloud")) return Cloud;
    if (category.includes("Frontend")) return Globe;
    return Bot;
  };

  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto max-h-[75vh] scrollbar-thin">
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-heading)]">
            Technology Radar &amp; Systems Matrix
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
            Full-stack engineering capabilities honed across enterprise platforms and agentic tooling.
          </p>
        </div>
        <button
          onClick={() => onAskAsp("What programming languages do you code in?")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-xs font-mono text-[var(--theme-accent-text-dark)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span>Ask AsP about Tech Stack</span>
        </button>
      </div>

      {/* 4 Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileData.skills.map((skillGroup, idx) => {
          const Icon = getCategoryIcon(skillGroup.category);
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
                    <Icon className="w-4 h-4 text-[var(--theme-accent)]" />
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-heading)]">
                    {skillGroup.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/20 dark:bg-black/40 border border-white/5 text-[var(--text-body)] hover:border-[var(--theme-accent-border)] hover:text-[var(--theme-accent-text-dark)] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Programming Languages Proficiency Grid */}
      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)]">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--theme-accent-text-dark)] font-semibold mb-3">
          Programming &amp; Scripting Languages
        </h4>
        <div className="flex flex-wrap gap-2">
          {profileData.languages.programming.map((lang, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/5 font-mono text-xs text-[var(--text-heading)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
