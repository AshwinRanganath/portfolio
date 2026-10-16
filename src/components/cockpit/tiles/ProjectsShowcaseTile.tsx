"use client";

import React from "react";
import { Rocket, ArrowUpRight, Server, Code2, Cpu } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface ProjectsShowcaseTileProps {
  onExpand: () => void;
}

export function ProjectsShowcaseTile({ onExpand }: ProjectsShowcaseTileProps) {
  const systems = [
    {
      title: "CNZ Integrations Platform",
      domain: "Shopify · Cin7 · Xero · ShipHero",
      metric: "250k+/mo",
      icon: Server,
    },
    {
      title: "Java AST & LLM Migration",
      domain: "JavaParser · Azure OpenAI",
      metric: "40% Fast",
      icon: Code2,
    },
    {
      title: "Hardware Telemetry Profiler",
      domain: "Real-time profiler agent @ AMD",
      metric: "Award Winner",
      icon: Cpu,
    },
  ];

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
      <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Key Systems
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Production Platforms
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span>Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* High-Level Systems List */}
        <div className="my-2 flex flex-col gap-2 flex-1 justify-center">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div
                key={idx}
                className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[var(--text-heading)] truncate">
                      {sys.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                      {sys.domain}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)] shrink-0">
                  {sys.metric}
                </span>
              </div>
            );
          })}
        </div>

        {/* Clean Telemetry Strip */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[var(--border-subtle)] text-[10px] font-mono text-center">
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[var(--theme-accent-text-dark)]">250k+/mo</span>
            <span className="text-[8px] text-[var(--text-faint)] block">Volume</span>
          </div>
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="font-bold text-emerald-400">99.98%</span>
            <span className="text-[8px] text-[var(--text-faint)] block">Uptime</span>
          </div>
          <div className="p-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <span className="font-bold text-[#38bdf8]">3 Systems</span>
            <span className="text-[8px] text-[var(--text-faint)] block">Deployed</span>
          </div>
        </div>
      </div>
    </SpecularBorder>
  );
}
