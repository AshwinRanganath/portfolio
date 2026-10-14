"use client";

import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Mail,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { profileData } from "@/data/profile";

interface HeroCardProps {
  onOpenBot: () => void;
  onSelectTopic: (topicId: string) => void;
}

export function HeroCard({ onOpenBot, onSelectTopic }: HeroCardProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-auto py-4">
      {/* CLI Window Container */}
      <div className="theme-card rounded-2xl overflow-hidden relative">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 theme-titlebar select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-xs font-mono theme-muted ml-2">
              ashwin_profile.json
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] theme-muted">
            <span className="px-2 py-0.5 rounded theme-subtle-box">
              UTF-8
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded theme-subtle-box">
              Java 21 · TypeScript
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Top Row: Avatar + Headline Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pb-6 border-b border-[var(--border-subtle)]">
            {/* Avatar with Glow and Status Beacon */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/15 bg-neutral-100 dark:bg-neutral-800 relative">
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  {profileData.handle}
                </span>
              </div>

              <p className="text-base sm:text-lg font-medium text-cyan-700 dark:text-cyan-300 flex flex-wrap items-center gap-x-2">
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
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{">"}</span> Product-minded Software Engineer with a Master of Technology in Computer Science Engineering (Manipal University) and 3+ years building high-throughput Java (Spring Boot) microservices, multi-tenant enterprise integration pipelines, and modern TypeScript/React applications. Pioneer of agentic workflows and automated developer tooling.
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
              onClick={onOpenBot}
              className="group flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Ask Interactive Bot</span>
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
                className="flex items-center gap-1 theme-muted hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
                className="flex items-center gap-1 theme-muted hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 theme-faint" />
              </a>
              <span className="theme-faint">·</span>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1 theme-muted hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
              <span>to ask any question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
