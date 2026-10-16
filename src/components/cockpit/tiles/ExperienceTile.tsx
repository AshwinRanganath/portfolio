"use client";

import React from "react";
import { Briefcase, ArrowUpRight, Award, Building2, Calendar, MapPin, Layers } from "lucide-react";
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
      <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Work Experience
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Enterprise Platform Engineering &bull; 3 Tenures
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span>Explore Timeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Current Active Role Highlight */}
        <div className="my-2 p-3 sm:p-3.5 rounded-2xl bg-[var(--bg-subtle)]/80 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-all">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  Active Tenure
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] mt-0.5">
                {currentExp.role}
              </h3>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] mt-0.5">
                <span className="font-semibold">{currentExp.company}</span>
                <span>&bull;</span>
                <span className="text-[var(--text-faint)]">{currentExp.period}</span>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              Present
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[var(--text-body)] font-mono leading-relaxed mt-2 opacity-90 line-clamp-2">
            Architecting the high-throughput CNZ Integrations Platform (Spring Boot 3 Core) syncing Shopify, Cin7 Core, Xero, and ShipHero WMS for multi-country B2B/B2C retail.
          </p>
        </div>

        {/* Prior Trajectory at a Glance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1">
          {/* Unisys */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/50 border border-[var(--border-subtle)] flex items-start gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-[var(--text-heading)] truncate">Unisys</span>
                <span className="text-[9px] text-[var(--text-faint)] shrink-0">2023–2025</span>
              </div>
              <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                Java AST Parser &bull; LLM Migration
              </p>
            </div>
          </div>

          {/* AMD India */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/50 border border-[var(--border-subtle)] flex items-start gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-[var(--text-heading)] truncate">AMD India</span>
                <span className="text-[9px] text-[var(--text-faint)] shrink-0">2022–2023</span>
              </div>
              <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                Hardware Profiler &bull; Spotlight Award
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Cue for System Flow */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--text-faint)] flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[var(--theme-accent)]" />
            <span>Interactive system architecture flow</span>
          </span>
          <span className="text-[var(--theme-accent-text-dark)] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            <span>View Architecture Flow</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>
    </SpecularBorder>
  );
}
