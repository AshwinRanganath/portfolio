"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Maximize2, Mail, FileText } from "lucide-react";
import { profileData } from "@/data/profile";
import { SpecularBorder } from "../SpecularBorder";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

interface HeroIdentityTileProps {
  onExpand: () => void;
}

export function HeroIdentityTile({ onExpand }: HeroIdentityTileProps) {
  return (
    <SpecularBorder
      layoutId="hero-tile"
      onClick={onExpand}
      className="cursor-pointer h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      <div className="p-4 sm:p-6 flex flex-col justify-between h-full relative group">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* Avatar with live pulse badge */}
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ring-[var(--border-subtle)] group-hover:ring-[var(--theme-accent)] transition-all duration-300 shadow-md">
                <Image
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[var(--bg-card)]"></span>
              </span>
            </div>

            {/* Name, Handle, Title & Location */}
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-[var(--text-heading)] group-hover:text-[var(--theme-accent-fg)] transition-colors">
                  {profileData.name}
                </h1>
                <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  @{profileData.handle}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm font-medium text-[var(--theme-accent-fg)] mt-0.5">
                {profileData.title}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                <MapPin className="w-3 h-3 text-[var(--text-faint)]" />
                <span>{profileData.location}</span>
                <span className="text-[var(--text-faint)] hidden sm:inline">&bull;</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">Available for Roles</span>
              </div>
            </div>
          </div>

          {/* Expand badge icon */}
          <div className="p-1.5 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)] group-hover:text-[var(--theme-accent-fg)] group-hover:bg-[var(--theme-accent-subtle)] transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Full Untruncated Bio Text Filling Space */}
        <div className="my-3 sm:my-4 font-mono text-xs sm:text-[13px] text-[var(--text-body)] leading-relaxed space-y-2 flex-1 flex flex-col justify-center">
          <p className="text-[var(--text-heading)] font-medium">
            &gt; {profileData.shortBio}
          </p>
          <p className="text-[var(--text-muted)] text-[11px] sm:text-xs leading-relaxed">
            M.Tech in CSE with 3+ years engineering scalable Java (Spring Boot 3) distributed gateways, resilient multi-tenant integration pipelines, and agentic AI diagnostic tooling.
          </p>
        </div>

        {/* Direct Action & Connect Links (High Recruiter Utility) */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)] hover:text-[var(--theme-accent-fg)] transition-colors flex items-center gap-1.5 text-[11px]"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3 h-3" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)] hover:text-[var(--theme-accent-fg)] transition-colors flex items-center gap-1.5 text-[11px]"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3 h-3" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)] hover:text-[var(--theme-accent-fg)] transition-colors flex items-center gap-1.5 text-[11px]"
              title="Send Email"
            >
              <Mail className="w-3 h-3 text-[var(--theme-accent-fg)]" />
              <span className="hidden sm:inline">{profileData.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>

          <a
            href="/resume"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 rounded-lg bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-[var(--theme-accent-fg)] hover:bg-[var(--theme-accent-subtle-hover)] transition-all font-semibold flex items-center gap-1.5 text-[11px]"
          >
            <FileText className="w-3 h-3 text-[var(--theme-accent-fg)]" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </SpecularBorder>
  );
}
