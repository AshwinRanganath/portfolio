"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export function NeuralWaveform() {
  const bars = [12, 28, 45, 20, 60, 35, 75, 50, 85, 40, 65, 30, 55, 22, 40, 15];

  return (
    <div className="w-full flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5 select-none overflow-hidden">
      {/* Left: AI Pulsing Orb */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] flex items-center justify-center">
            <Bot className="w-4 h-4 text-[var(--theme-accent)]" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold font-mono text-[var(--text-heading)]">
            Neural Signal
          </span>
          <span className="text-[8px] font-mono text-emerald-400">Listening &bull; Ready</span>
        </div>
      </div>

      {/* Center: Animated Equalizer Waveform Bars */}
      <div className="flex items-center gap-1 h-8 px-2">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-[var(--theme-accent)]"
            animate={{
              height: [
                `${Math.max(6, height * 0.3)}px`,
                `${height * 0.38}px`,
                `${Math.max(8, height * 0.2)}px`,
              ],
              opacity: [0.6, 1, 0.7],
            }}
            transition={{
              duration: 1.2 + (i % 5) * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: (i * 0.08) % 0.6,
            }}
          />
        ))}
      </div>

      {/* Right: Telemetry Tag */}
      <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-[var(--theme-accent-text-dark)] shrink-0">
        <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
        <span>v2.4 Engine</span>
      </div>
    </div>
  );
}
