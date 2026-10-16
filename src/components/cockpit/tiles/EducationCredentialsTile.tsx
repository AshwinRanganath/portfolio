"use client";

import React from "react";
import { GraduationCap, Award, ArrowUpRight, BookOpen } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";

interface EducationCredentialsTileProps {
  onExpand: () => void;
}

export function EducationCredentialsTile({ onExpand }: EducationCredentialsTileProps) {
  const mtech = profileData.education[0];
  const be = profileData.education[1];
  const award = profileData.awards[0];

  return (
    <SpecularBorder
      layoutId="education-tile"
      onClick={onExpand}
      className="cursor-pointer h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)]">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent-fg)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-fg)] transition-colors">
                Education &bull; Honors
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Academic &amp; Research Pedigree
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-fg)] group-hover:translate-x-0.5 transition-transform font-medium">
            <span>Credentials</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* 3 High-Level Credential Cards */}
        <div className="my-2 flex flex-col gap-2 flex-1 justify-center">
          {/* M.Tech */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[var(--text-heading)] truncate">
                    M.Tech &bull; Computer Science
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)] border border-[var(--border-accent)] font-semibold">
                    GPA {mtech.gpa}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  {mtech.institution} &bull; {mtech.period}
                </p>
              </div>
            </div>
          </div>

          {/* B.E. */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/50 border border-[var(--border-subtle)] transition-colors flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shrink-0">
                <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-[var(--text-heading)] truncate">
                  B.E. &bull; Information Science
                </h3>
                <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  {be.institution} &bull; {be.period}
                </p>
              </div>
            </div>
          </div>

          {/* Award */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/50 border border-[var(--border-subtle)] transition-colors flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shrink-0">
                <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[var(--text-heading)] truncate">
                    {award.title}
                  </h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                    Winner
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  {award.organization} &bull; {award.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-faint)]">
          <span>Manipal &bull; VTU &bull; AMD Innovation EXPO</span>
          <span className="text-[var(--theme-accent-fg)] font-semibold">View Details &rarr;</span>
        </div>
      </div>
    </SpecularBorder>
  );
}
