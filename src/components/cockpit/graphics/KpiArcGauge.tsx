"use client";

import React from "react";
import { motion } from "framer-motion";

interface KpiArcGaugeProps {
  value: string;
  label: string;
  sublabel?: string;
  percentage?: number; // 0 to 100
  color?: string;
}

export function KpiArcGauge({
  value,
  label,
  sublabel,
  percentage = 85,
  color = "var(--theme-accent, #f59e0b)",
}: KpiArcGaugeProps) {
  // 240 degree gauge arc
  const radius = 28;
  const strokeWidth = 4;
  const center = 36;
  const circumference = 2 * Math.PI * radius;
  // Arc covers 75% of circle (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * percentage) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)]/80 hover:border-[var(--theme-accent-border)] transition-all group select-none">
      <div className="relative w-[72px] h-[58px] flex items-center justify-center">
        <svg
          viewBox="0 0 72 72"
          className="w-[72px] h-[72px] -rotate-[135deg] transform overflow-visible"
        >
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            className="text-white/10 dark:text-white/5"
            strokeLinecap="round"
          />

          {/* Glowing Animated Progress Arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_4px_var(--theme-accent)]"
          />
        </svg>

        {/* Center Digital Value Readout */}
        <div className="absolute top-[22px] flex flex-col items-center">
          <span className="text-xs font-bold font-mono text-[var(--text-heading)] tracking-tight">
            {value}
          </span>
        </div>
      </div>

      {/* Label and Subtitle */}
      <span className="text-[10px] font-semibold text-[var(--text-heading)] mt-0.5 text-center truncate max-w-[80px]">
        {label}
      </span>
      {sublabel && (
        <span className="text-[8px] font-mono text-[var(--text-faint)] text-center truncate max-w-[80px]">
          {sublabel}
        </span>
      )}
    </div>
  );
}
