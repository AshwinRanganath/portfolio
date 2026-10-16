"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Sparkles, Bot } from "lucide-react";
import { profileData } from "@/data/profile";

interface EducationExpandedViewProps {
  onAskAsp: (query?: string) => void;
}

export function EducationExpandedView({ onAskAsp }: EducationExpandedViewProps) {
  const mtech = profileData.education[0];
  const be = profileData.education[1];
  const award = profileData.awards[0];

  return (
    <div className="p-4 sm:p-7 flex flex-col gap-5 overflow-y-auto max-h-[75vh] scrollbar-thin">
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-heading)]">
            Education, Academic Pedigree &amp; Honors
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
            Formal Master of Technology computer science foundation &amp; innovation awards.
          </p>
        </div>
        <button
          onClick={() => onAskAsp("Tell me about Ashwin's education and degrees")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-xs font-mono text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all shrink-0 self-start sm:self-auto font-medium"
        >
          <Bot className="w-3.5 h-3.5 text-[var(--theme-accent-fg)]" />
          <span>Ask AsP about Education</span>
        </button>
      </div>

      {/* Degrees & Awards List */}
      <div className="flex flex-col gap-4">
        {/* M.Tech Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)]">
                <BookOpen className="w-5 h-5 text-[var(--theme-accent-fg)]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[var(--text-heading)]">
                    {mtech.degree}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-fg)] border border-[var(--border-accent)] font-semibold">
                    GPA {mtech.gpa}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  <span className="font-semibold text-[var(--theme-accent-fg)]">
                    {mtech.institution}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-[var(--text-faint)]">
                    <Calendar className="w-3 h-3" />
                    {mtech.period}
                  </span>
                  {mtech.location && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[var(--text-faint)]">
                        <MapPin className="w-3 h-3" />
                        {mtech.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] font-mono leading-relaxed">
            Advanced graduate curriculum focused on Distributed Systems, Cloud Architecture, Advanced Data Structures &amp; Algorithms, and Relational Database Engineering.
          </p>
        </div>

        {/* B.E. Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[#38bdf8]">
                <GraduationCap className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--text-heading)]">
                  {be.degree}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  <span className="font-semibold text-[var(--text-heading)]">
                    {be.institution}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-[var(--text-faint)]">
                    <Calendar className="w-3 h-3" />
                    {be.period}
                  </span>
                  {be.location && (
                    <>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[var(--text-faint)]">
                        <MapPin className="w-3 h-3" />
                        {be.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] font-mono leading-relaxed">
            Four-year undergraduate degree covering software engineering lifecycle, operating systems, object-oriented design patterns, networking protocols, and web development fundamentals.
          </p>
        </div>

        {/* Award Card */}
        <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[var(--text-heading)]">
                    {award.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Innovation Honor
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  <span className="font-semibold text-amber-400">
                    {award.organization}
                  </span>
                  <span>&bull;</span>
                  <span className="text-[var(--text-faint)]">{award.year}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-body)] font-mono leading-relaxed">
            {award.note}. Honored at the AMD Innovation EXPO for building high-performance full-stack telemetry and profiling dashboards for internal engineering systems.
          </p>
        </div>
      </div>
    </div>
  );
}
