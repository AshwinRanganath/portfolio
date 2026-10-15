"use client";

import React from "react";
import { Rocket, ArrowUpRight, Network, Server, Database } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface ProjectsShowcaseTileProps {
  onExpand: () => void;
}

export function ProjectsShowcaseTile({ onExpand }: ProjectsShowcaseTileProps) {
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
        <div className="flex items-center justify-between pb-1 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Systems &bull; Topology
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Middleware Mesh &bull; AST Engine
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Visual Event-Mesh Topology Flow Graphic */}
        <div className="my-1.5 sm:my-2 p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
          {/* Microservice Topology Flow */}
          <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
            {/* Step 1: Ingestion */}
            <div className="flex-1 p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-white/5 text-center">
              <Network className="w-3.5 h-3.5 text-[#38bdf8] mx-auto mb-0.5" />
              <span className="font-bold text-[var(--text-heading)] block truncate">Webhooks</span>
              <span className="text-[8px] text-[var(--text-faint)] block">REST / SFTP</span>
            </div>

            <span className="text-[var(--theme-accent)] font-bold text-xs">&rarr;</span>

            {/* Step 2: Gateway Mesh */}
            <div className="flex-1 p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-center shadow-[0_0_12px_var(--theme-accent-shadow)]">
              <Server className="w-3.5 h-3.5 text-[var(--theme-accent)] mx-auto mb-0.5" />
              <span className="font-bold text-[var(--theme-accent-text-dark)] block truncate">Spring Gateway</span>
              <span className="text-[8px] text-[var(--text-body)] block">Circuit Breaker</span>
            </div>

            <span className="text-emerald-400 font-bold text-xs">&rarr;</span>

            {/* Step 3: Transaction Store */}
            <div className="flex-1 p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-white/5 text-center">
              <Database className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-0.5" />
              <span className="font-bold text-[var(--text-heading)] block truncate">PostgreSQL</span>
              <span className="text-[8px] text-[var(--text-faint)] block">Multi-Tenant</span>
            </div>
          </div>
        </div>

        {/* Live Throughput Telemetry Badges */}
        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-[var(--border-subtle)] text-[10px] font-mono">
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-white/5 text-center">
            <span className="text-[8px] text-[var(--text-faint)] block">THROUGHPUT</span>
            <span className="font-bold text-[var(--theme-accent-text-dark)] text-[10px]">250k+/mo</span>
          </div>
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-white/5 text-center">
            <span className="text-[8px] text-[var(--text-faint)] block">UPTIME</span>
            <span className="font-bold text-emerald-400 text-[10px]">99.98%</span>
          </div>
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-white/5 text-center">
            <span className="text-[8px] text-[var(--text-faint)] block">AST AUDIT</span>
            <span className="font-bold text-[#38bdf8] text-[10px]">+40% Fast</span>
          </div>
        </div>
      </div>
    </SpecularBorder>
  );
}
