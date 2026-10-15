"use client";

import React from "react";
import { Cpu, ArrowUpRight, Server, Globe, Bot } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface TechRadarTileProps {
  onExpand: () => void;
}

export function TechRadarTile({ onExpand }: TechRadarTileProps) {
  const radars = [
    {
      category: "Backend & Systems",
      icon: Server,
      skills: ["Java 21", "Spring Boot 3", "Microservices", "PostgreSQL"],
      level: 95,
      tag: "Core Focus",
    },
    {
      category: "Frontend & Web",
      icon: Globe,
      skills: ["TypeScript", "React 19", "Next.js", "Tailwind CSS"],
      level: 90,
      tag: "Modern Stack",
    },
    {
      category: "Agentic AI & Tooling",
      icon: Bot,
      skills: ["Multi-Agent Loops", "Azure OpenAI", "AST Parsers", "Diagnostics"],
      level: 88,
      tag: "Production",
    },
  ];

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Tech Radar
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Stack &amp; Systems Capabilities
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Mobile Compact View */}
        <div className="sm:hidden my-1.5 flex flex-col gap-1.5">
          <div className="p-2 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)]">
            <div className="flex flex-wrap gap-1">
              {["Java 21", "Spring Boot", "React 19", "Agentic AI"].map((s, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Radar Pillars */}
        <div className="hidden sm:flex flex-col gap-2.5 my-2">
          {radars.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] group-hover:border-[var(--theme-accent-border)] transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-[var(--text-heading)]">
                    <Icon className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    <span>{r.category}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--theme-accent-text-dark)]">
                    {r.tag}
                  </span>
                </div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {r.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Cockpit status hint */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)] text-[10px] sm:text-[11px] font-mono text-[var(--text-faint)]">
          <span className="truncate">Architecture Matrix</span>
          <span className="text-[var(--theme-accent-text-dark)] shrink-0">Tap to expand</span>
        </div>
      </div>
    </SpecularBorder>
  );
}
