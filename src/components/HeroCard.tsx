"use client";

import React, { useState } from "react";
import {
  Bot,
  FileText,
  Copy,
  Check,
  Mail,
  ExternalLink,
  MapPin,
  Sparkles,
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-auto py-2 transition-all duration-300">
      {/* CLI Centerpiece Window Container */}
      <div
        className={`theme-card rounded-2xl overflow-hidden relative flex flex-col transition-all duration-300 ${
          activeTab === "chat"
            ? "h-[calc(100dvh-130px)] min-h-[520px] sm:h-[78vh] sm:min-h-[580px] sm:max-h-[750px]"
            : "h-auto"
        }`}
      >
        {/* Window Title Bar with IDE Tabs */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 theme-titlebar select-none overflow-x-auto scrollbar-none border-b border-[var(--border-subtle)] shrink-0">
          {/* Left: Window controls + IDE Tabs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>

            {/* IDE Tabs */}
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => onTabChange("profile")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeTab === "profile"
                    ? "bg-[var(--bg-subtle-hover)] text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
                title="View Profile Overview"
              >
                <span className="text-amber-600 dark:text-amber-400">📄</span>
                <span>ashwin_profile.json</span>
              </button>

              <button
                onClick={() => onTabChange("chat")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  activeTab === "chat"
                    ? "bg-[var(--bg-subtle-hover)] text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30 shadow-sm"
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg theme-subtle-box hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-500/30 transition-all text-xs active:scale-95"
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
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-all text-xs"
                  title="Open interactive assistant (Press /)"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span className="font-medium hidden sm:inline">Ask AsP</span>
                  <kbd className="px-1.5 py-0.2 rounded bg-amber-950/20 dark:bg-black/40 text-[10px]">
                    /
                  </kbd>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab 1: Profile View */}
        <div
          className={
            activeTab === "profile"
              ? "p-6 sm:p-8 md:p-10 block overflow-y-auto"
              : "hidden"
          }
        >
          {/* Top Row: Avatar + Headline Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pb-6 border-b border-[var(--border-subtle)]">
            {/* Avatar with Glow and Status Beacon */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl shadow-amber-500/15 bg-neutral-100 dark:bg-neutral-800 relative">
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
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight theme-heading font-sans">
                  {profileData.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  {profileData.handle}
                </span>
              </div>

              <p className="text-base sm:text-lg font-medium text-amber-700 dark:text-amber-300 flex flex-wrap items-center gap-x-2">
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
          <div className="py-5 font-mono text-xs sm:text-sm theme-body leading-relaxed">
            <p className="max-w-3xl">
              <span className="text-amber-600 dark:text-amber-400 font-semibold">{">"}</span> Product-minded Software Engineer with a Master of Technology in Computer Science Engineering (Manipal University) and 3+ years building high-throughput Java (Spring Boot) microservices, multi-tenant enterprise integration pipelines, and modern TypeScript/React applications. Pioneer of agentic workflows and automated developer tooling.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[var(--border-subtle)]">
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
          <div className="pt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            {/* Primary Assistant Trigger */}
            <button
              onClick={() => onTabChange("chat")}
              className="group flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-amber-500/25 active:scale-[0.98]"
            >
              <Bot className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Ask AsP</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/20 text-xs text-black/80 font-mono border border-black/20">
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
                  <span className="text-emerald-500 dark:text-emerald-400 font-sans font-medium">Copied!</span>
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
          <div className="pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)] text-xs font-mono">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="theme-faint">Links:</span>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 theme-muted hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
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
                className="flex items-center gap-1 theme-muted hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 theme-faint" />
              </a>
              <span className="theme-faint">·</span>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1 theme-muted hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>

            {/* Hotkey Hint */}
            <div className="theme-faint flex items-center gap-2">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded theme-subtle-box text-[11px] theme-body font-mono">
                /
              </kbd>
              <span>to open interactive chat</span>
            </div>
          </div>
        </div>

        {/* Tab 2: Interactive AsP Chat Terminal */}
        <div
          className={
            activeTab === "chat" ? "flex-1 flex flex-col min-h-0" : "hidden"
          }
        >
          <ChatTerminal
            isActive={activeTab === "chat"}
            initialTopicId={activeTopicId}
            onReturnToProfile={() => onTabChange("profile")}
          />
        </div>
      </div>
    </div>
  );
}
