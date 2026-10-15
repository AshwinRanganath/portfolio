"use client";

import React from "react";
import { Briefcase, ArrowUpRight, Award, Building2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";
import { SystemPipelineFlow } from "../graphics/SystemPipelineFlow";

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
                Experience &bull; System Pipeline
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Live Dataflow Architecture &bull; Click to drill down
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Live Graphical System Pipeline Flow */}
        <div className="my-1.5 sm:my-2 p-2 sm:p-2.5 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors flex-1 flex flex-col justify-center">
          <SystemPipelineFlow />
        </div>

        {/* Bottom Quick Company Status Track */}
        <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-[var(--border-subtle)]">
          <span className="text-[var(--text-heading)] font-semibold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>{currentExp.company}</span>
            <span className="text-emerald-400 text-[9px]">(Active Lead)</span>
          </span>
          <span className="text-[var(--text-faint)] flex items-center gap-1.5">
            <span>Unisys (AST)</span>
            <span>&bull;</span>
            <span className="flex items-center gap-0.5 text-amber-400">
              <Award className="w-2.5 h-2.5" />
              <span>AMD</span>
            </span>
          </span>
        </div>
      </div>
    </SpecularBorder>
  );
}
