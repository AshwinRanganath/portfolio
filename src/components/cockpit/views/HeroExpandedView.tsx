"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  GraduationCap,
  Globe,
  Mail,
  Sparkles,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { LinkedinIcon, GithubIcon } from "@/components/Icons";

interface HeroExpandedViewProps {
  onAskAsp: (query?: string) => void;
}

export function HeroExpandedView({ onAskAsp }: HeroExpandedViewProps) {
  return (
    <div className="p-4 sm:p-7 flex flex-col gap-6 overflow-y-auto max-h-[75vh] scrollbar-thin">
      {/* Top Profile Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[var(--theme-accent)] shadow-xl">
            <Image
              src={profileData.avatarUrl}
              alt={profileData.name}
              width={80}
              height={80}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[var(--bg-card)]"></span>
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-heading)]">
              {profileData.name}
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              @{profileData.handle}
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Available for roles
            </span>
          </div>

          <p className="text-sm font-semibold text-[var(--theme-accent-text-dark)] mt-1">
            {profileData.title}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--text-faint)]" />
            <span>{profileData.location}</span>
          </div>
        </div>

        {/* Quick Social & Action Links */}
        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
          <a
            href={`mailto:${profileData.email}`}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-heading)] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>Email</span>
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-heading)] transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-heading)] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[var(--text-heading)]" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Narrative Bio */}
      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)]">
        <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--theme-accent-text-dark)] font-semibold mb-2">
          Engineering Philosophy &amp; Background
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
          {profileData.bio}
        </p>
      </div>

      {/* Grid: Education & Spoken Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formal Education */}
        <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-[var(--theme-accent)]" />
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--theme-accent-text-dark)] font-semibold">
              Formal Education
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {profileData.education.map((edu, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-heading)]">{edu.institution}</span>
                  <span className="text-[10px] font-mono text-[var(--text-faint)]">{edu.period}</span>
                </div>
                <p className="text-xs text-[var(--theme-accent-text-dark)] mt-0.5">{edu.degree}</p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[var(--text-muted)] font-mono">
                  <span>GPA: {edu.gpa}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken Languages & Global Delivery */}
        <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-[var(--theme-accent)]" />
            <h3 className="text-xs uppercase font-mono tracking-wider text-[var(--theme-accent-text-dark)] font-semibold">
              Spoken Languages &amp; Global Delivery
            </h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {profileData.languages.spoken.map((lang, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-heading)]">{lang.name}</span>
                  <span className="text-[10px] font-mono text-[var(--theme-accent-text-dark)]">
                    {lang.name === "English" ? "Cross-Border Delivery" : "Fluent"}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ask AsP Call-to-action */}
      <div className="p-4 rounded-2xl bg-[var(--theme-accent-subtle)]/70 border border-[var(--border-accent)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
          <span className="text-xs text-[var(--text-heading)] font-mono">
            Want to learn more about Ashwin&apos;s past projects and architectural decisions?
          </span>
        </div>
        <button
          onClick={() => onAskAsp("Where have you worked in the past? Give me your career journey.")}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-[var(--theme-accent)] text-black font-semibold text-xs font-mono hover:opacity-90 transition-opacity"
        >
          Ask AsP 🤖
        </button>
      </div>
    </div>
  );
}
