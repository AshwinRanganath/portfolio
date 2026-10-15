"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Maximize2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";
import { KpiArcGauge } from "../graphics/KpiArcGauge";

interface HeroIdentityTileProps {
  onExpand: () => void;
}

export function HeroIdentityTile({ onExpand }: HeroIdentityTileProps) {
  const kpiGauges = [
    { value: "3+ Yrs", label: "Experience", sublabel: "Enterprise", percentage: 92, color: "var(--theme-accent)" },
    { value: "40%", label: "Velocity", sublabel: "AST & AI", percentage: 80, color: "#38bdf8" },
    { value: "100%", label: "Coverage", sublabel: "Microservices", percentage: 100, color: "#34d399" },
    { value: "Global", label: "Delivery", sublabel: "NZ · US · APAC", percentage: 95, color: "#a78bfa" },
  ];

  return (
    <SpecularBorder
      layoutId="hero-tile"
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
        {/* Top Header Row with Expand Hint */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Avatar with status badge */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ring-[var(--border-subtle)] group-hover:ring-[var(--theme-accent)] transition-all duration-300 shadow-md">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[var(--bg-card)]"></span>
              </span>
            </div>

            {/* Name, Handle, and Title */}
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                  {profileData.name}
                </h1>
                <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  @{profileData.handle}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-[var(--theme-accent-text-dark)] line-clamp-1 mt-0.5">
                {profileData.title}
              </p>
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[var(--text-muted)] mt-0.5 sm:mt-1">
                <MapPin className="w-3 h-3 text-[var(--text-faint)]" />
                <span className="truncate">{profileData.location}</span>
              </div>
            </div>
          </div>

          {/* Expand badge icon */}
          <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)] group-hover:text-[var(--theme-accent-text-dark)] group-hover:bg-[var(--theme-accent-subtle)] transition-colors">
            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="text-[11px] sm:text-xs text-[var(--text-body)] line-clamp-1 sm:line-clamp-2 my-1.5 sm:my-2 font-mono leading-relaxed opacity-90">
          &gt; {profileData.shortBio}
        </p>

        {/* Visual KPI Arc Gauges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1.5 border-t border-[var(--border-subtle)]">
          {kpiGauges.map((gauge, i) => (
            <div key={i} className={i >= 2 ? "hidden sm:block" : ""}>
              <KpiArcGauge
                value={gauge.value}
                label={gauge.label}
                sublabel={gauge.sublabel}
                percentage={gauge.percentage}
                color={gauge.color}
              />
            </div>
          ))}
        </div>
      </div>
    </SpecularBorder>
  );
}
