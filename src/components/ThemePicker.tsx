"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, Sparkles, X } from "lucide-react";
import { useThemeContext, AccentTheme, ThemeOption } from "@/context/ThemeContext";

export function ThemePicker() {
  const { accent, setAccent, options, currentOption } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current theme: ${currentOption.name}. Click to change theme palette.`}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg theme-subtle-box transition-all duration-200 select-none ${
          isOpen
            ? "border-[var(--border-accent)] ring-2 ring-[var(--theme-accent-subtle)]"
            : "hover:border-[var(--border-accent)]"
        }`}
        title={`Theme Palette: ${currentOption.name}`}
      >
        <Palette className="w-4 h-4 theme-muted hover:theme-heading transition-colors" />
        {/* Dual-color indicator orb */}
        <span
          className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform duration-300 hover:scale-110"
          style={{
            background: currentOption.gradient,
            boxShadow: `0 0 8px ${currentOption.primaryColor}55`,
          }}
        />
        <span className="hidden md:inline font-mono text-xs theme-heading font-medium tracking-tight">
          {currentOption.name.split(" ")[1] || currentOption.name}
        </span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu-button"
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl theme-card border border-[var(--border-accent)] p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right focus:outline-none backdrop-blur-xl"
        >
          {/* Header */}
          <div className="px-2.5 py-2 border-b border-[var(--border-subtle)] flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider theme-heading">
                Palette System
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--theme-accent-subtle)] text-[var(--theme-accent-text-dark)] dark:text-[var(--theme-accent-text-dark)] font-medium">
                6 Themes
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md theme-muted hover:theme-heading hover:bg-[var(--bg-subtle)] transition-colors"
                title="Close palette picker"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Palette List */}
          <div className="space-y-1 max-h-[360px] overflow-y-auto scrollbar-none py-1">
            {options.map((option: ThemeOption) => {
              const isSelected = option.id === accent;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setAccent(option.id);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all duration-200 group active:scale-[0.98] ${
                    isSelected
                      ? "bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)]"
                      : "hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border-subtle)]"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Swatch Orb */}
                    <div className="relative shrink-0">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: option.gradient,
                          boxShadow: isSelected
                            ? `0 0 12px ${option.primaryColor}80`
                            : `0 2px 6px ${option.primaryColor}40`,
                        }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white drop-shadow-md stroke-[2.5]" />
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-mono font-semibold truncate ${
                            isSelected
                              ? "theme-heading"
                              : "text-neutral-800 dark:text-neutral-200 group-hover:theme-heading"
                          }`}
                        >
                          {option.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 truncate font-sans">
                        {option.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: Color Hex Preview Pill */}
                  <div className="hidden sm:flex items-center gap-1 shrink-0 ml-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: option.primaryColor }}
                      title={`Primary: ${option.primaryColor}`}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: option.secondaryColor }}
                      title={`Secondary: ${option.secondaryColor}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-2.5 pt-2 pb-1 mt-1 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] theme-faint font-mono">
            <span>Instant live morphing</span>
            <kbd className="px-1.5 py-0.5 rounded theme-subtle-box">Esc to close</kbd>
          </div>
        </div>
      )}
    </div>
  );
}
