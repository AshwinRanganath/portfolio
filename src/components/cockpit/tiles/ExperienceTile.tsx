"use client";

import React from "react";
import { Briefcase, ArrowUpRight, Building2, Award } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";

interface ExperienceTileProps {
  onExpand: () => void;
}

export function ExperienceTile({ onExpand }: ExperienceTileProps) {
  const currentExp = profileData.experiences[0];
  const unisysExp = profileData.experiences[1];
  const amdExp = profileData.experiences[2];

  return (
    <SpecularBorder
      layoutId="experience-tile"
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
      <div className="p-3 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Experience
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Enterprise &amp; Platform Architecture
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Current Active Role Preview */}
        <div className="my-1.5 sm:my-2.5 p-2 sm:p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--text-heading)] flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs truncate">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--theme-accent)] shrink-0" />
              <span className="truncate">{currentExp.company}</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              Active
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[var(--theme-accent-text-dark)] font-medium mt-0.5 sm:mt-1 truncate">
            {currentExp.role}
          </p>
          <p className="hidden sm:block text-[11px] text-[var(--text-body)] line-clamp-2 mt-1 opacity-80 leading-relaxed">
            {currentExp.summary}
          </p>
        </div>

        {/* Previous Track Record Quick Chips (Shown on tablets and desktops) */}
        <div className="hidden sm:flex flex-col gap-1.5 pt-1 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-muted)] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
              {unisysExp.company}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-faint)]">
              AST Parsing &bull; 40% Speedup
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-muted)] font-mono flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              {amdExp.company}
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              Best Poster Award &bull; C# &amp; Angular
            </span>
          </div>
        </div>

        {/* Mobile quick status */}
        <div className="sm:hidden flex items-center justify-between text-[10px] font-mono text-[var(--text-faint)] pt-1 border-t border-[var(--border-subtle)]">
          <span>+ Unisys &bull; AMD</span>
          <span className="text-[var(--theme-accent-text-dark)]">3+ Yrs</span>
        </div>
      </div>
    </SpecularBorder>
  );
}
