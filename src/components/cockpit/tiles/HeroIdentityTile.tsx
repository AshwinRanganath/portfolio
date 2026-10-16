"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Maximize2, Briefcase, Activity, Building, Globe } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";

interface HeroIdentityTileProps {
  onExpand: () => void;
}

export function HeroIdentityTile({ onExpand }: HeroIdentityTileProps) {
  const profileMetrics = [
    {
      value: "3+ Yrs",
      label: "Experience",
      detail: "Enterprise Backend & Full-Stack",
      icon: Briefcase,
      color: "var(--theme-accent)",
    },
    {
      value: "250k+",
      label: "Syncs / Month",
      detail: "CNZ Integrations Platform",
      icon: Activity,
      color: "#10b981",
    },
    {
      value: "3 Roles",
      label: "Enterprise Track",
      detail: "CNZ · Unisys · AMD",
      icon: Building,
      color: "#38bdf8",
    },
    {
      value: "Global",
      label: "Delivery",
      detail: "India & NZ Remote Operations",
      icon: Globe,
      color: "#a78bfa",
    },
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

        {/* Real-World Grounded Profile Metrics (No Arbitrary Percentages) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-2 border-t border-[var(--border-subtle)]">
          {profileMetrics.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-base font-bold font-mono text-[var(--text-heading)]">
                    {item.value}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-[var(--theme-accent)] opacity-80" />
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--theme-accent-text-dark)] truncate">
                  {item.label}
                </div>
                <div className="text-[9px] font-mono text-[var(--text-muted)] truncate hidden sm:block mt-0.5">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SpecularBorder>
  );
}
