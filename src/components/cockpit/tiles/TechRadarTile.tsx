"use client";

import React from "react";
import { Cpu, ArrowUpRight, Server, Layout, Sparkles } from "lucide-react";
import { SpecularBorder } from "../SpecularBorder";

interface TechRadarTileProps {
  onExpand: () => void;
}

export function TechRadarTile({ onExpand }: TechRadarTileProps) {
  const domains = [
    {
      name: "Backend & Systems",
      icon: Server,
      color: "var(--theme-accent)",
      skills: ["Java 21", "Spring Boot 3", "Microservices", "PostgreSQL", "REST / SFTP", "Resilience4j"],
    },
    {
      name: "Frontend & Web",
      icon: Layout,
      color: "#38bdf8",
      skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Zustand"],
    },
    {
      name: "AI & Integrations",
      icon: Sparkles,
      color: "#34d399",
      skills: ["Azure OpenAI", "Shopify API", "Cin7 Core", "Xero", "Java AST"],
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
      <div className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative group">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)]">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--theme-accent)]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--theme-accent-text-dark)] transition-colors">
                Tech Stack &bull; Capabilities
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-faint)]">
                Production-Tested Enterprise Stack
              </span>
            </div>
          </div>
          <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono text-[var(--theme-accent-text-dark)] group-hover:translate-x-0.5 transition-transform">
            <span className="hidden sm:inline">Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Categorized Production Stack Domains (No Arbitrary Percentages) */}
        <div className="my-2 flex flex-col gap-2.5 flex-1 justify-center">
          {domains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[var(--text-heading)]">
                  <Icon className="w-3 h-3 text-[var(--theme-accent)]" />
                  <span>{domain.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {domain.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-heading)] group-hover:border-[var(--theme-accent-border)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-faint)]">
          <span>Enterprise architecture &bull; CI/CD &bull; Cloud</span>
          <span className="text-[var(--theme-accent-text-dark)] font-semibold">View Matrix &rarr;</span>
        </div>
      </div>
    </SpecularBorder>
  );
}
