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
      <div className="cli-card rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-xs font-mono text-neutral-400 ml-2">
              ashwin_profile.json
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
              UTF-8
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Java 21 · TypeScript
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Top Row: Avatar + Headline Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pb-6 border-b border-white/10">
            {/* Avatar with Glow and Status Beacon */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white shadow-lg shadow-cyan-500/10">
                <span>AR</span>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center"
                title="Active & Available"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
                  {profileData.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {profileData.handle}
                </span>
              </div>

              <p className="text-base sm:text-lg font-medium text-cyan-200/90 flex flex-wrap items-center gap-x-2">
                <span>{profileData.title}</span>
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {profileData.location}
                </span>
                <span className="text-neutral-500 hidden sm:inline">|</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span>●</span> {profileData.company}
                </span>
              </div>
            </div>
          </div>

          {/* Bio Snippet */}
          <div className="py-5 font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p className="max-w-3xl">
              <span className="text-cyan-400 font-semibold">{">"}</span> Product-minded Software Engineer with a Master of Technology in Computer Science Engineering (Manipal University) and 3+ years building high-throughput Java (Spring Boot) microservices, multi-tenant enterprise integration pipelines, and modern TypeScript/React applications. Pioneer of agentic workflows and automated developer tooling.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10">
            {profileData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors"
              >
                <div className="text-xs font-mono text-neutral-400">{stat.label}</div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-0.5">
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
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all text-sm font-medium hover:border-white/30 active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-neutral-300" />
              <span>Full Resume</span>
            </a>

            {/* Email Copy Button */}
            <button
              onClick={copyEmail}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/15 transition-all text-sm font-mono active:scale-[0.98]"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-sans">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>{profileData.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links & Quick Prompt Starters */}
          <div className="pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">Links:</span>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neutral-400 hover:text-cyan-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-neutral-600" />
              </a>
              <span className="text-neutral-700">·</span>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neutral-400 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-neutral-600" />
              </a>
              <span className="text-neutral-700">·</span>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1 text-neutral-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>

            {/* Hotkey Hint */}
            <div className="text-neutral-500 flex items-center gap-2">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[11px] text-neutral-300 border border-white/10 font-mono">
                1-6
              </kbd>
              <span>for quick answers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
