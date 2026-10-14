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
    <div className="min-h-screen bg-[#090a0f] text-neutral-200 py-8 px-4 sm:px-6">
      {/* Top Navigation Bar - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors font-mono text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors font-mono text-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Printable Resume Document */}
      <main className="max-w-4xl mx-auto bg-[#0f111a] print:bg-white print:text-black border border-white/10 print:border-none rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 font-sans">
        {/* Header */}
        <div className="border-b border-white/10 print:border-neutral-300 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white print:text-black">
                {profileData.name}
              </h1>
              <p className="text-base text-cyan-400 print:text-neutral-800 font-medium mt-0.5">
                {profileData.title}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-neutral-400 print:text-neutral-700 space-y-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {profileData.location}
              </span>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-400"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                {profileData.email}
              </a>
              <div className="flex items-center gap-3 pt-0.5">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-neutral-500" />
                  <span>LinkedIn</span>
                </a>
                <span>·</span>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-neutral-500" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Professional Profile
          </h2>
          <p className="text-sm text-neutral-300 print:text-neutral-800 leading-relaxed">
            {profileData.bio}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {profileData.skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.03] print:bg-neutral-50 border border-white/5 print:border-neutral-200"
              >
                <div className="font-semibold text-white print:text-black mb-1 font-mono">
                  {skillGroup.category}
                </div>
                <div className="text-neutral-400 print:text-neutral-700 leading-normal">
                  {skillGroup.items.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {profileData.experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-white print:text-black text-sm">
                    {exp.role} ·{" "}
                    <span className="text-cyan-300 print:text-neutral-800 font-medium">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-neutral-400 print:text-neutral-600">
                    {exp.period} | {exp.location}
                  </div>
                </div>

                <ul className="space-y-1 text-xs text-neutral-300 print:text-neutral-800 pt-1">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 print:text-black mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 print:bg-neutral-200 text-neutral-400 print:text-neutral-800"
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
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Education & Qualifications
          </h2>
          <div className="space-y-3 text-xs">
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between border-l-2 border-cyan-500/40 print:border-black pl-3"
              >
                <div>
                  <div className="font-bold text-white print:text-black">
                    {edu.degree}
                  </div>
                  <div className="text-neutral-400 print:text-neutral-700">
                    {edu.institution} {edu.location ? `· ${edu.location}` : ""}
                  </div>
                </div>
                <div className="font-mono text-neutral-400 print:text-neutral-600">
                  {edu.period} | GPA: {edu.gpa}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Engineering Projects */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Selected Engineering Projects
          </h2>
          <div className="space-y-3 text-xs">
            {profileData.projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.02] print:bg-neutral-50 border border-white/5 print:border-neutral-200 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white print:text-black font-sans">
                    {proj.title}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 print:text-neutral-600">
                    {proj.category}
                  </span>
                </div>
                <p className="text-neutral-400 print:text-neutral-700">{proj.description}</p>
                <p className="text-neutral-300 print:text-neutral-800 font-medium">
                  <span className="text-cyan-400 print:text-black">Impact:</span> {proj.impact}
                </p>
                <div className="text-[10px] font-mono text-neutral-500 print:text-neutral-600">
                  Tech: {proj.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Awards */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-neutral-900 font-bold">
            Honors & Awards
          </h2>
          <div className="text-xs space-y-1">
            {profileData.awards.map((award, idx) => (
              <div key={idx} className="flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-white print:text-black">
                    {award.title}
                  </span>{" "}
                  –{" "}
                  <span className="text-neutral-400 print:text-neutral-700">
                    {award.organization}
                  </span>
                </div>
                <span className="font-mono text-neutral-400 print:text-neutral-600">
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
