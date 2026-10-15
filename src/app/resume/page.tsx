"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { profileData } from "@/data/profile";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] theme-body py-8 px-4 sm:px-6 transition-colors">
      {/* Top Navigation Bar - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg theme-subtle-box theme-body hover:theme-heading transition-colors font-mono text-xs"
        >
          <ArrowLeft className="w-4 h-4 theme-muted" />
          <span>Back to Portfolio</span>
        </Link>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-colors font-mono text-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Printable Resume Document */}
      <main className="max-w-4xl mx-auto theme-card print:bg-white print:text-black border border-[var(--border-subtle)] print:border-none rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 font-sans">
        {/* Header */}
        <div className="border-b border-[var(--border-subtle)] print:border-neutral-300 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight theme-heading print:text-black">
                {profileData.name}
              </h1>
              <p className="text-base text-amber-600 dark:text-amber-400 print:text-neutral-800 font-medium mt-0.5">
                {profileData.title}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono theme-muted print:text-neutral-700 space-y-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 theme-muted" />
                {profileData.location}
              </span>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Mail className="w-3.5 h-3.5 theme-muted" />
                {profileData.email}
              </a>
              <div className="flex items-center gap-3 pt-0.5">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 theme-muted" />
                  <span>LinkedIn</span>
                </a>
                <span className="theme-faint">·</span>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <GithubIcon className="w-3.5 h-3.5 theme-muted" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Professional Profile
          </h2>
          <p className="text-sm theme-body print:text-neutral-800 leading-relaxed">
            {profileData.bio}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {profileData.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg theme-subtle-box print:bg-neutral-50 print:border-neutral-200"
              >
                <div className="font-semibold theme-heading print:text-black mb-1 font-mono">
                  {skillGroup.category}
                </div>
                <div className="theme-muted print:text-neutral-700 leading-normal">
                  {skillGroup.items.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {profileData.experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold theme-heading print:text-black text-sm">
                    {exp.role} ·{" "}
                    <span className="text-amber-600 dark:text-amber-300 print:text-neutral-800 font-medium">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-xs font-mono theme-muted print:text-neutral-600">
                    {exp.period} | {exp.location}
                  </div>
                </div>

                <ul className="space-y-1 text-xs theme-body print:text-neutral-800 pt-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-400 print:text-black mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono theme-subtle-box print:bg-neutral-200 theme-muted print:text-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Qualifications */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Education & Qualifications
          </h2>
          <div className="space-y-3 text-xs">
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between border-l-2 border-amber-500/40 print:border-black pl-3"
              >
                <div>
                  <div className="font-bold theme-heading print:text-black">
                    {edu.degree}
                  </div>
                  <div className="theme-muted print:text-neutral-700">
                    {edu.institution} {edu.location ? `· ${edu.location}` : ""}
                  </div>
                </div>
                <div className="font-mono theme-muted print:text-neutral-600">
                  {edu.period} | GPA: {edu.gpa}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Engineering Projects */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Selected Engineering Projects
          </h2>
          <div className="space-y-3 text-xs">
            {profileData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg theme-subtle-box print:bg-neutral-50 print:border-neutral-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold theme-heading print:text-black font-sans">
                    {proj.title}
                  </div>
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 print:text-neutral-600">
                    {proj.category}
                  </span>
                </div>
                <p className="theme-muted print:text-neutral-700">{proj.description}</p>
                <p className="theme-body print:text-neutral-800 font-medium">
                  <span className="text-amber-600 dark:text-amber-400 print:text-black">Impact:</span> {proj.impact}
                </p>
                <div className="text-[10px] font-mono theme-faint print:text-neutral-600">
                  Tech: {proj.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Awards */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 print:text-neutral-900 font-bold">
            Honors & Awards
          </h2>
          <div className="text-xs space-y-1">
            {profileData.awards.map((award, idx) => (
              <div key={idx} className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold theme-heading print:text-black">
                    {award.title}
                  </span>{" "}
                  –{" "}
                  <span className="theme-muted print:text-neutral-700">
                    {award.organization}
                  </span>
                </div>
                <span className="font-mono theme-muted print:text-neutral-600">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
