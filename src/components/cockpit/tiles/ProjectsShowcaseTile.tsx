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
      domain: "Spring Boot 3 · Multi-Tenant Mesh",
      metric: "250k+ syncs/mo",
      icon: Server,
    },
    {
      title: "Java AST & LLM Migration Engine",
      domain: "JavaParser · Azure OpenAI",
      metric: "40% audit speedup",
      icon: Code2,
    },
    {
      title: "Real-Time Telemetry Profiler",
      domain: "Hardware Agent · React UI",
      metric: "Award Winner @ AMD",
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
                Key Systems &bull; Architecture
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Production-Deployed Platforms
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Real Systems List */}
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

        {/* Real Telemetry Strip */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[var(--border-subtle)] text-[10px] font-mono">
          <div className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
            <span className="text-[8px] text-[var(--text-faint)] block uppercase">Volume</span>
            <span className="font-bold text-[var(--theme-accent-text-dark)]">250k+/mo</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
            <span className="text-[8px] text-[var(--text-faint)] block uppercase">Uptime</span>
            <span className="font-bold text-emerald-400">99.98%</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
            <span className="text-[8px] text-[var(--text-faint)] block uppercase">Deployments</span>
            <span className="font-bold text-[#38bdf8]">3 Enterprise</span>
          </div>
        </div>
      </div>
    </SpecularBorder>
  );
}
