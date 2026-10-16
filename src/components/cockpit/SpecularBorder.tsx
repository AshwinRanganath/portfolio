"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpecularBorderProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  onClick?: () => void;
  layoutId?: string;
  id?: string;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function SpecularBorder({
  children,
  className = "",
  enableTilt = true,
  onClick,
  layoutId,
  id,
  role,
  tabIndex,
  onKeyDown,
}: SpecularBorderProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse position for 3D tilt (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Spring physics for smooth card tilting
  const springConfig = { damping: 24, stiffness: 220, mass: 0.8 };
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  // 3D rotation transforms (max ±3.5 degrees for subtle luxury cockpit feel)
  const rotateX = useTransform(smoothNormY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothNormX, [-0.5, 0.5], [-3, 3]);

  const updateMouseCoords = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Update CSS variables directly on DOM for 120fps lag-free cursor tracing
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    if (enableTilt) {
      normX.set(x / rect.width - 0.5);
      normY.set(y / rect.height - 0.5);
    }
  }, [enableTilt, normX, normY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateMouseCoords(e.clientX, e.clientY);
    },
    [updateMouseCoords]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    updateMouseCoords(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      layoutId={layoutId}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-2xl p-[1px] transition-all duration-300 shadow-[var(--shadow-card)] ${className}`}
    >
      {/* 1. Outer cursor-tracing atmospheric halo (dark halo in light mode, chrome halo in dark mode) */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm -z-10"
        style={{
          background:
            "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-halo) 0%, transparent 65%)",
        }}
      />

      {/* 2. Specular reactive border glow layer (tracing exact cursor along the 1px hairline perimeter) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-0"
        style={{
          background:
            "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-trace-1) 0%, var(--glow-trace-2) 30%, transparent 65%)",
        }}
      />

      {/* 3. Subtle default hairline border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--border-subtle)] group-hover:border-transparent transition-colors duration-200 z-0" />

      {/* 4. Card Body Container with frosted glass */}
      <div className="relative z-[1] h-full w-full rounded-[15px] bg-[var(--bg-card)] backdrop-blur-xl overflow-hidden flex flex-col">
        {/* Specular glass sheen highlight inside card */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10"
          style={{
            background:
              "radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-sheen-1) 0%, var(--glow-sheen-2) 40%, transparent 70%)",
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}
