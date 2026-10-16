"use client";

import React from "react";
import { Rocket, Bot, Sparkles, CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";

interface ProjectsExpandedViewProps {
  onAskAsp: (query?: string) => void;
}

export function ProjectsExpandedView({ onAskAsp }: ProjectsExpandedViewProps) {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto max-h-[75vh] scrollbar-thin">
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-heading)]">
            Systems &amp; Platform Architecture Showcase
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
            Key platforms delivering high-throughput middleware, code static analysis, and agentic workflows.
          </p>
        </div>
        <button
          onClick={() => onAskAsp("What major platforms and projects have you built?")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-xs font-mono text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all shrink-0 self-start sm:self-auto font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
          <span>Ask AsP about Projects</span>
        </button>
      </div>

      {/* Projects Cards List */}
      <div className="flex flex-col gap-4">
        {profileData.projects.map((proj, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col gap-3"
          >
            {/* Title & Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)]">
                  <Rocket className="w-4 h-4 text-[var(--theme-accent-fg)]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">
                    {proj.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[var(--theme-accent-fg)] font-medium">
                    {proj.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onAskAsp(`Tell me about your ${proj.title} project`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-body)] hover:text-[var(--text-heading)] transition-all self-start sm:self-auto"
              >
                <Bot className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
                <span>Ask AsP</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
              {proj.description}
            </p>

            {/* Impact Highlight */}
            <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-[var(--text-heading)]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Measurable Impact: </span>
                <span>{proj.impact}</span>
              </div>
            </div>

            {/* Technology Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.technologies.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs font-mono px-2 py-0.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
