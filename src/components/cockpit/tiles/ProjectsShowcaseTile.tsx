"use client";

import React from "react";
import { Rocket, ArrowUpRight, Network, Code2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";

interface ProjectsShowcaseTileProps {
  onExpand: () => void;
}

export function ProjectsShowcaseTile({ onExpand }: ProjectsShowcaseTileProps) {
  const p1 = profileData.projects[0];
  const p2 = profileData.projects[1];

  return (
    <SpecularBorder
      layoutId="projects-tile"
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
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Systems &amp; Architecture
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Enterprise Platforms &amp; Modernization
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden my-1.5 flex flex-col gap-1.5">
          <div className="p-2 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-[11px] font-medium text-[var(--text-heading)]">
              <span className="truncate">Integration Platform</span>
              <span className="text-[9px] font-mono text-emerald-400">Middleware</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
              Java 21 &bull; Spring Boot &bull; SFTP &bull; REST
            </p>
          </div>
        </div>

        {/* Desktop Featured Platform 1 */}
        <div className="hidden sm:block my-2 p-3 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--text-heading)] flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              {p1.title}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--theme-accent-text-dark)]">
              Middleware
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-body)] line-clamp-2 mt-1 opacity-80 leading-relaxed">
            {p1.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {p1.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-[var(--text-muted)] border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary System Chip */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-[var(--bg-subtle)]/40 border border-[var(--border-subtle)] text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--theme-accent)]" />
            <span className="text-[10px] sm:text-[11px] font-medium text-[var(--text-heading)] truncate max-w-[150px] sm:max-w-xs">
              {p2.title}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 shrink-0">40% Speedup</span>
        </div>
      </div>
    </SpecularBorder>
  );
}
