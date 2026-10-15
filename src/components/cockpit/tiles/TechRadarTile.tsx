"use client";

import React from "react";
import { Cpu, ArrowUpRight } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";
import { TechRadarGraphic } from "../graphics/TechRadarGraphic";

interface TechRadarTileProps {
  onExpand: () => void;
}

export function TechRadarTile({ onExpand }: TechRadarTileProps) {
  return (
    <SpecularBorder
      layoutId="tech-tile"
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
        <div className="flex items-center justify-between pb-1 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Tech Radar &bull; Capabilities
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Polygon Vector &bull; Signal Strength
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Visual Radar & Progress Bars Graphic */}
        <div className="my-1.5 sm:my-2 flex-1 flex flex-col justify-center">
          <TechRadarGraphic />
        </div>
      </div>
    </SpecularBorder>
  );
}
