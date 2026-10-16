"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { CompanySystemSandbox } from "../graphics/CompanySystemSandbox";

interface ExperienceExpandedViewProps {
  onAskAsp: (query?: string) => void;
}

export function ExperienceExpandedView({ onAskAsp }: ExperienceExpandedViewProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentExp = profileData.experiences[selectedIdx];

  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto max-h-[75vh] scrollbar-thin">
      {/* Top Company Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-2.5 shrink-0 scrollbar-none border-b border-[var(--border-subtle)]">
        {profileData.experiences.map((exp, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs transition-all shrink-0 select-none ${
              selectedIdx === idx
                ? "bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)] border border-[var(--border-accent)] font-semibold shadow-sm"
                : "bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-heading)] border border-[var(--border-subtle)]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{exp.company}</span>
            {idx === 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Experience Detail Card */}
      <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col gap-4">
        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[var(--text-heading)]">
                {currentExp.role}
              </h3>
              {selectedIdx === 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mt-1 font-mono">
              <span className="text-[var(--theme-accent-fg)] font-semibold">
                {currentExp.company}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[var(--text-faint)]" />
                {currentExp.period}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[var(--text-faint)]" />
                {currentExp.location}
              </span>
            </div>
          </div>

          {/* Ask AsP About Role Button */}
          <button
            onClick={() => onAskAsp(`Tell me about your work at ${currentExp.company}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-xs font-mono text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all shrink-0 self-start sm:self-auto font-medium"
          >
            <Bot className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
            <span>Ask AsP about this</span>
          </button>
        </div>

        {/* Real-World Systems Connection Sandbox Diagram */}
        <CompanySystemSandbox companyIndex={selectedIdx} />

        {/* Summary Narrative */}
        <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed italic bg-[var(--bg-subtle)] p-3 rounded-xl border border-[var(--border-subtle)]">
          &ldquo;{currentExp.summary}&rdquo;
        </p>

        {/* Bullet Points */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--theme-accent-fg)] font-semibold">
            Key Contributions &amp; Architectural Impact:
          </h4>
          <ul className="flex flex-col gap-2">
            {currentExp.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-[var(--text-body)] leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="pt-3 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] block mb-2">
            Technologies &amp; Domain Tools:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentExp.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
