"use client";

import React from "react";
import { Briefcase, ArrowUpRight, Award, Building2 } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface ExperienceTileProps {
  onExpand: () => void;
}

export function ExperienceTile({ onExpand }: ExperienceTileProps) {
  const tenures = [
    {
      company: "CNZ Consultants",
      tag: "Active Lead",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      role: "Platform Lead & Sr. Engineer",
      period: "Present",
      scope: "CNZ Integrations Platform · Shopify, Cin7, Xero, ShipHero",
      isCurrent: true,
    },
    {
      company: "Unisys",
      role: "Associate Cloud / Software Engineer",
      period: "2023–2025",
      scope: "Java AST Static Analysis · Azure OpenAI Modernization",
      icon: Building2,
      iconColor: "text-[#38bdf8]",
    },
    {
      company: "AMD India",
      role: "Full-Stack Software Engineer Intern",
      period: "2022–2023",
      scope: "Hardware Telemetry Profiler · Best Poster Award",
      icon: Award,
      iconColor: "text-amber-400",
    },
  ];

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
                Enterprise Trajectory &bull; 3 Tenures
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span>Explore Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* High-Level Clean 3-Tenure List (Zero Paragraph Fluff) */}
        <div className="my-2 flex flex-col gap-2 flex-1 justify-center">
          {tenures.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  t.isCurrent
                    ? "bg-[var(--bg-subtle)]/90 border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)]"
                    : "bg-[var(--bg-subtle)]/50 border-[var(--border-subtle)]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {t.isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  ) : Icon ? (
                    <Icon className={`w-3.5 h-3.5 ${t.iconColor} shrink-0`} />
                  ) : null}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] truncate">
                        {t.company}
                      </span>
                      {t.tag && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${t.tagColor}`}
                        >
                          {t.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] truncate mt-0.5">
                      {t.scope}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono shrink-0 ${
                    t.isCurrent
                      ? "text-[var(--theme-accent-text-dark)] font-semibold"
                      : "text-[var(--text-faint)]"
                  }`}
                >
                  {t.period}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--text-faint)]">Click to drill down into architecture &amp; metrics</span>
          <span className="text-[var(--theme-accent-text-dark)] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            <span>View Architecture</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>
    </SpecularBorder>
  );
}
