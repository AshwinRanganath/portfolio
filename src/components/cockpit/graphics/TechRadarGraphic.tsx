"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Globe, Bot } from "lucide-react";

export function TechRadarGraphic() {
  // 3 radar vertices centered around (60, 55)
  // Vertex 1: Top (Backend) - (60, 15)
  // Vertex 2: Bottom Right (Frontend) - (100, 85)
  // Vertex 3: Bottom Left (AI) - (20, 85)
  const center = { x: 60, y: 55 };

  // Polygon points based on values:
  // Backend: 95% -> (60, 15 + 40 * (1 - 0.95)) = (60, 17)
  // Frontend: 90% -> lerp from center to (100, 85) at 0.90 -> (60 + 40*0.9, 55 + 30*0.9) = (96, 82)
  // AI: 88% -> lerp from center to (20, 85) at 0.88 -> (60 - 40*0.88, 55 + 30*0.88) = (24.8, 81.4)
  const polygonPoints = "60,17 96,82 25,81";

  const pillars = [
    {
      name: "Backend & Systems",
      score: "95%",
      icon: Server,
      skills: "Java 21 · Spring Boot 3 · Microservices · PostgreSQL",
      level: 95,
      color: "var(--theme-accent)",
    },
    {
      name: "Frontend & Web",
      score: "90%",
      icon: Globe,
      skills: "TypeScript · React 19 · Next.js · Tailwind",
      level: 90,
      color: "#38bdf8",
    },
    {
      name: "Agentic AI & LLMs",
      score: "88%",
      icon: Bot,
      skills: "Multi-Agent Loops · Azure OpenAI · AST Code Parsers",
      level: 88,
      color: "#a78bfa",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      <div className="flex items-center gap-3">
        {/* SVG Radar Polygon Visualizer */}
        <div className="relative w-[120px] h-[100px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Concentric Guide Triangles */}
            <polygon
              points="60,35 80,70 40,70"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-slate-900/15 dark:text-white/10"
            />
            <polygon
              points="60,20 95,82 25,82"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-slate-900/20 dark:text-white/15"
            />

            {/* Axis Lines from Center */}
            <line x1={center.x} y1={center.y} x2="60" y2="12" stroke="currentColor" strokeWidth="0.8" className="text-slate-900/15 dark:text-white/10" />
            <line x1={center.x} y1={center.y} x2="102" y2="87" stroke="currentColor" strokeWidth="0.8" className="text-slate-900/15 dark:text-white/10" />
            <line x1={center.x} y1={center.y} x2="18" y2="87" stroke="currentColor" strokeWidth="0.8" className="text-slate-900/15 dark:text-white/10" />

            {/* Filled Animated Radar Area */}
            <motion.polygon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              points={polygonPoints}
              fill="url(#radarFill)"
              stroke="var(--theme-accent)"
              strokeWidth="1.5"
              className="filter drop-shadow-[0_0_8px_var(--theme-accent-shadow)]"
            />

            {/* Vertex Glowing Points */}
            <circle cx="60" cy="17" r="3" fill="var(--theme-accent)" className="animate-pulse" />
            <circle cx="96" cy="82" r="3" fill="#38bdf8" />
            <circle cx="25" cy="81" r="3" fill="#a78bfa" />
          </svg>
        </div>

        {/* 3 Telemetry Signal Bars */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1 font-semibold text-[var(--text-heading)] truncate">
                    <Icon className="w-3 h-3 text-[var(--theme-accent-fg)] shrink-0" />
                    <span className="truncate">{p.name}</span>
                  </span>
                  <span className="text-[10px] font-bold text-[var(--theme-accent-fg)] shrink-0">
                    {p.score}
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden border border-[var(--border-subtle)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p.level}%` }}
                    transition={{ duration: 0.9, delay: idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        idx === 0
                          ? "var(--theme-accent-fg)"
                          : idx === 1
                          ? "#38bdf8"
                          : "#a78bfa",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Capabilities Pills */}
      <div className="flex flex-wrap gap-1 mt-2 pt-1 border-t border-[var(--border-subtle)]">
        {["Java 21", "Spring Boot", "React 19", "Azure OpenAI", "Microservices"].map((tag, i) => (
          <span
            key={i}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
