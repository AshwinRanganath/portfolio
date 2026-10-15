"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  FileText,
  Copy,
  Check,
  Mail,
  ExternalLink,
  MapPin,
  Sparkles,
  X,
  Minus,
  Maximize2,
  Minimize2,
  GripVertical,
  RotateCcw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { BotLogo } from "@/components/BotLogo";
import { profileData } from "@/data/profile";
import { ChatTerminal } from "@/components/ChatTerminal";

interface HeroCardProps {
  activeTab: "profile" | "chat";
  onTabChange: (tab: "profile" | "chat") => void;
  activeTopicId?: string | null;
  onSelectTopic: (topicId: string) => void;
}

export function HeroCard({
  activeTab,
  onTabChange,
  activeTopicId,
  onSelectTopic,
}: HeroCardProps) {
  const [copied, setCopied] = useState(false);
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [terminalResetTrigger, setTerminalResetTrigger] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  // Dragging logic for Dual-Pane divider
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - rect.left;
      const newRatio = (offsetX / rect.width) * 100;
      // Clamp between 30% and 70%
      if (newRatio >= 30 && newRatio <= 70) {
        setSplitRatio(newRatio);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging]);

  // Profile Body JSX
  const renderProfileContent = (isDualPane = false) => (
    <div
      className={`p-6 sm:p-8 md:p-10 space-y-6 ${
        isDualPane ? "overflow-y-auto h-full" : "block overflow-y-auto"
      }`}
    >
      {/* Top Row: Avatar + Headline Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pb-6 border-b border-[var(--border-subtle)]">
        {/* Avatar with Glow and Status Beacon */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 accent-border accent-shadow bg-neutral-100 dark:bg-neutral-800 relative transition-all duration-300">
            <img
              src={profileData.avatarUrl}
              alt={profileData.name}
              width={96}
              height={96}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)] flex items-center justify-center shadow-md"
            title="Active & Available"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight theme-heading font-sans">
              {profileData.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium accent-subtle-bg text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)]">
              {profileData.handle}
            </span>
          </div>

          <p className="text-base sm:text-lg font-medium accent-text flex flex-wrap items-center gap-x-2">
            <span>{profileData.title}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs theme-muted font-mono pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 theme-muted" />
              {profileData.location}
            </span>
            <span className="theme-faint hidden sm:inline">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <span>●</span> {profileData.company}
            </span>
          </div>
        </div>
      </div>

      {/* Bio Snippet */}
      <div className="py-2 font-mono text-xs sm:text-sm theme-body leading-relaxed">
        <p className="max-w-3xl">
          <span className="accent-text font-semibold">{">"}</span> Product-minded
          Software Engineer with a Master of Technology in Computer Science
          Engineering (Manipal University) and 3+ years building high-throughput
          Java (Spring Boot) microservices, multi-tenant enterprise integration
          pipelines, and modern TypeScript/React applications. Pioneer of
          agentic workflows and automated developer tooling.
        </p>
      </div>

      {/* Quick Metrics Badges */}
      <div className="grid grid-cols-2 gap-3 py-2 border-y border-[var(--border-subtle)]">
        {profileData.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl theme-subtle-box hover:border-[var(--border-accent)] transition-colors"
          >
            <div className="text-xs font-mono theme-muted">{stat.label}</div>
            <div className="text-base sm:text-lg font-bold theme-heading font-mono mt-0.5">
              {stat.value}
            </div>
            <div className="text-[11px] theme-faint truncate mt-0.5">
              {stat.hint}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        {/* Assistant Trigger */}
        <button
          onClick={() => onTabChange("chat")}
          className="group flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl accent-btn font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
        >
          <Bot className="w-4 h-4 text-inherit group-hover:scale-110 transition-transform" />
          <span>Ask AsP</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-xs text-inherit font-mono border border-black/20">
            /
          </kbd>
        </button>

        {/* Resume Button */}
        <a
          href="/resume"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl theme-subtle-box theme-heading border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all text-sm font-medium active:scale-[0.98]"
        >
          <FileText className="w-4 h-4 theme-muted" />
          <span>Full Resume</span>
        </a>

        {/* Email Copy Button */}
        <button
          onClick={copyEmail}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl theme-subtle-box theme-body hover:theme-heading border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all text-sm font-mono active:scale-[0.98]"
          title="Click to copy email address"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-emerald-500 dark:text-emerald-400 font-sans font-medium">
                Copied!
              </span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 theme-muted" />
              <span>{profileData.email}</span>
            </>
          )}
        </button>
      </div>

      {/* Social Links & Quick Prompt Starters */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)] text-xs font-mono">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <span className="theme-faint">Links:</span>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 theme-muted hover:text-[var(--theme-accent-text)] dark:hover:text-[var(--theme-accent-text-dark)] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 theme-faint" />
          </a>
          <span className="theme-faint">·</span>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 theme-muted hover:text-[var(--theme-accent-text)] dark:hover:text-[var(--theme-accent-text-dark)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 theme-faint" />
          </a>
          <span className="theme-faint">·</span>
          <a
            href={`mailto:${profileData.email}`}
            className="flex items-center gap-1 theme-muted hover:text-[var(--theme-accent-text)] dark:hover:text-[var(--theme-accent-text-dark)] transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Hotkey Hint (on mobile/single pane) */}
        {!isDualPane && (
          <div className="theme-faint flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded theme-subtle-box text-[11px] theme-body font-mono">
              /
            </kbd>
            <span>to open interactive chat</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`w-full mx-auto my-auto py-2 transition-all duration-300 ${
        isMaximized
          ? "max-w-none w-[98vw] px-2"
          : "max-w-4xl xl:max-w-7xl px-4 sm:px-6"
      }`}
    >
      {/* CLI Centerpiece Window Container */}
      <div
        ref={containerRef}
        className={`theme-card rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 ${
          isDragging ? "select-none" : ""
        } ${
          isMaximized
            ? "h-[92vh] max-h-none"
            : activeTab === "chat"
            ? "h-[calc(100dvh-130px)] min-h-[520px] sm:h-[78vh] sm:min-h-[580px] sm:max-h-[750px] xl:h-[82vh] xl:min-h-[640px] xl:max-h-[880px]"
            : "h-auto xl:h-[82vh] xl:min-h-[640px] xl:max-h-[880px]"
        }`}
      >
        {/* =========================================================================
            1. Title Bar: Mobile/Tablet Mode (< 1280px)
            ========================================================================= */}
        <div className="flex xl:hidden items-center justify-between px-3 sm:px-4 py-2 theme-titlebar select-none overflow-x-auto scrollbar-none border-b border-[var(--border-subtle)] shrink-0">
          {/* Left: Window controls + IDE Tabs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Traffic Light Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0 group/traffic">
              <button
                onClick={() => setTerminalResetTrigger((prev) => prev + 1)}
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center transition-colors relative"
                title="Reset Terminal Conversation"
                aria-label="Reset conversation"
              >
                <X className="w-2 h-2 text-rose-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
              </button>
              <button
                onClick={() => setSplitRatio(50)}
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center transition-colors relative"
                title="Reset Split Ratio"
                aria-label="Reset split"
              >
                <Minus className="w-2 h-2 text-amber-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center transition-colors relative"
                title={isMaximized ? "Restore Window Size" : "Maximize Window"}
                aria-label={isMaximized ? "Restore Window Size" : "Maximize Window"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-2 h-2 text-emerald-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                ) : (
                  <Maximize2 className="w-2 h-2 text-emerald-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                )}
              </button>
            </div>

            {/* IDE Tabs */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => onTabChange("profile")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeTab === "profile"
                    ? "bg-[var(--bg-subtle-hover)] accent-text font-semibold border border-[var(--border-accent)]"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
                title="View Profile Overview"
              >
                <span className="accent-text">📄</span>
                <span>ashwin_profile.json</span>
              </button>

              <button
                onClick={() => onTabChange("chat")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeTab === "chat"
                    ? "bg-[var(--bg-subtle-hover)] accent-text font-semibold border border-[var(--border-accent)] shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
                title="Open AsP Interactive Terminal"
              >
                <BotLogo size="xs" withBeacon={activeTab === "chat"} />
                <span>asp_chat.terminal</span>
                {activeTab === "chat" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Right: Actions / Hotkey Indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px] theme-muted shrink-0">
            {activeTab === "chat" ? (
              <button
                onClick={() => onTabChange("profile")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg theme-subtle-box hover:text-[var(--theme-accent-text)] dark:hover:text-[var(--theme-accent-text-dark)] hover:border-[var(--border-accent)] transition-all text-xs active:scale-95"
                title="Return to Profile Overview (Esc)"
              >
                <span>← Profile</span>
                <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/20 text-[10px]">
                  Esc
                </kbd>
              </button>
            ) : (
              <>
                <span className="hidden sm:inline px-2 py-0.5 rounded theme-subtle-box">
                  UTF-8
                </span>
                <button
                  onClick={() => onTabChange("chat")}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg accent-subtle-bg border border-[var(--border-accent)] text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] transition-all text-xs"
                  title="Open interactive assistant (Press /)"
                >
                  <Bot className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span className="font-medium hidden sm:inline">Ask AsP</span>
                  <kbd className="px-1.5 py-0.2 rounded bg-black/10 dark:bg-black/40 text-[10px] text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-accent)]">
                    /
                  </kbd>
                </button>
              </>
            )}
          </div>
        </div>

        {/* =========================================================================
            2. Title Bar: Desktop Dual-Pane Mode (≥ 1280px)
            ========================================================================= */}
        <div className="hidden xl:flex items-center justify-between theme-titlebar select-none border-b border-[var(--border-subtle)] shrink-0 overflow-hidden">
          {/* Left Titlebar Section: Profile Pane */}
          <div
            style={{ width: `${splitRatio}%` }}
            className="flex items-center justify-between px-4 py-2 border-r border-[var(--border-subtle)] shrink-0"
          >
            <div className="flex items-center gap-3">
              {/* Functional Window Traffic Light Controls */}
              <div className="flex items-center gap-1.5 shrink-0 group/traffic">
                <button
                  onClick={() => setTerminalResetTrigger((prev) => prev + 1)}
                  className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center transition-colors relative cursor-pointer"
                  title="Reset Terminal Conversation"
                  aria-label="Reset conversation"
                >
                  <X className="w-2 h-2 text-rose-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                </button>
                <button
                  onClick={() => setSplitRatio(50)}
                  className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center transition-colors relative cursor-pointer"
                  title="Reset Split to 50/50"
                  aria-label="Reset split to 50/50"
                >
                  <Minus className="w-2 h-2 text-amber-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                </button>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center transition-colors relative cursor-pointer"
                  title={isMaximized ? "Restore Window Size" : "Maximize to Fullscreen"}
                  aria-label={isMaximized ? "Restore Window Size" : "Maximize to Fullscreen"}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-2 h-2 text-emerald-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                  ) : (
                    <Maximize2 className="w-2 h-2 text-emerald-950 opacity-0 group-hover/traffic:opacity-100 transition-opacity stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Profile Tab Header */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-subtle-hover)] accent-text font-semibold border border-[var(--border-accent)] font-mono text-xs">
                <span className="accent-text">📄</span>
                <span>ashwin_profile.json</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] theme-muted">
              <span className="px-2 py-0.5 rounded theme-subtle-box">UTF-8</span>
            </div>
          </div>

          {/* Right Titlebar Section: Chat Terminal Pane */}
          <div
            style={{ width: `${100 - splitRatio}%` }}
            className="flex items-center justify-between px-4 py-2 shrink-0"
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-subtle-hover)] accent-text font-semibold border border-[var(--border-accent)] shadow-sm">
                <BotLogo size="xs" withBeacon={true} />
                <span>asp_chat.terminal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </div>
              <span className="hidden 2xl:inline text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                Agent Online
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] theme-muted">
              <button
                onClick={() => setTerminalResetTrigger((prev) => prev + 1)}
                className="hover:theme-heading hover:underline flex items-center gap-1 px-2 py-0.5 rounded theme-subtle-box text-xs active:scale-95 transition-all"
                title="Reset Chat Session"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Chat</span>
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded theme-subtle-box hover:theme-heading transition-colors"
                title={isMaximized ? "Restore Window" : "Maximize"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. Content View: Mobile/Tablet Mode (< 1280px)
            ========================================================================= */}
        <div className="xl:hidden flex-1 flex flex-col min-h-0">
          {activeTab === "profile" ? (
            renderProfileContent(false)
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <ChatTerminal
                isActive={activeTab === "chat"}
                initialTopicId={activeTopicId}
                onReturnToProfile={() => onTabChange("profile")}
                resetTrigger={terminalResetTrigger}
                isDualPane={false}
              />
            </div>
          )}
        </div>

        {/* =========================================================================
            4. Content View: Desktop Dual-Pane Mode (≥ 1280px)
            ========================================================================= */}
        <div className="hidden xl:flex flex-row flex-1 min-h-0 relative overflow-hidden">
          {/* Left Pane: Profile Overview */}
          <div
            style={{ width: `${splitRatio}%` }}
            className="h-full overflow-hidden flex flex-col min-w-[30%] max-w-[70%]"
          >
            {renderProfileContent(true)}
          </div>

          {/* Interactive Draggable Resizer Bar */}
          <div
            onMouseDown={startDragging}
            onTouchStart={startDragging}
            onDoubleClick={() => setSplitRatio(50)}
            role="separator"
            aria-orientation="vertical"
            aria-valuenow={Math.round(splitRatio)}
            aria-valuemin={30}
            aria-valuemax={70}
            aria-label="Resize workspace panes. Double click to reset to 50/50."
            title="Drag to resize panes. Double-click to reset."
            className="w-2.5 relative flex items-center justify-center shrink-0 cursor-col-resize select-none group/resizer z-20 hover:bg-[var(--theme-accent-subtle)] transition-colors"
          >
            {/* Visual separator line */}
            <div className="w-px h-full bg-[var(--border-subtle)] group-hover/resizer:bg-[var(--theme-accent)] transition-colors duration-200" />

            {/* Floating Grip Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover/resizer:border-[var(--border-accent)] group-hover/resizer:shadow-md shadow-sm flex items-center justify-center transition-all duration-200 pointer-events-none">
              <GripVertical className="w-2.5 h-2.5 text-neutral-400 group-hover/resizer:text-[var(--theme-accent)] transition-colors" />
            </div>
          </div>

          {/* Right Pane: AsP Chat Terminal */}
          <div
            style={{ width: `${100 - splitRatio}%` }}
            className="h-full overflow-hidden flex flex-col min-h-0 min-w-[30%] max-w-[70%]"
          >
            <ChatTerminal
              isActive={true}
              initialTopicId={activeTopicId}
              onReturnToProfile={() => onTabChange("profile")}
              resetTrigger={terminalResetTrigger}
              isDualPane={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
