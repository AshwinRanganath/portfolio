"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#0b0d13] text-neutral-900 py-6 sm:py-10 px-3 sm:px-6 transition-colors print:bg-white print:p-0 print:m-0">
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 10mm 13mm;
        }

        @media print {
          html, body {
            background: #ffffff !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .resume-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            background: #ffffff !important;
          }

          .resume-page-1 {
            break-after: page !important;
            page-break-after: always !important;
          }

          .resume-avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Navigation Bar - Hidden during print */}
      <div className="max-w-[820px] mx-auto mb-6 flex items-center justify-between no-print">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-neutral-700 shadow-sm transition-all font-mono text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            Document Mode · 2 Pages A4
          </span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white shadow-sm transition-all font-mono text-xs font-semibold cursor-pointer active:scale-95"
            title="Print or export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Document Container */}
      <div className="max-w-[820px] mx-auto space-y-8 print:space-y-0">
        {/* ========================================================= */}
        {/* PAGE 1                                                    */}
        {/* ========================================================= */}
        <article className="resume-sheet resume-page-1 bg-white text-neutral-900 p-8 sm:p-12 rounded-xl shadow-xl border border-neutral-200/80 font-sans">
          {/* Header */}
          <header className="mb-4">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-neutral-950 font-sans leading-tight">
              Ashwin Ranganath
            </h1>
            <p className="text-[13px] font-semibold text-neutral-800 mt-0.5">
              Software Engineer (Java) — Warehouse &amp; Fulfillment Systems | Agentic Engineering
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-600 mt-1.5">
              <a
                href="mailto:ashwinr619@live.com"
                className="hover:text-neutral-900 transition-colors"
              >
                ashwinr619@live.com
              </a>
              <span className="text-neutral-400">|</span>
              <a href="tel:+918892930188" className="hover:text-neutral-900 transition-colors">
                +91 8892930188
              </a>
              <span className="text-neutral-400">|</span>
              <span>Open to Relocation to Amsterdam, Netherlands</span>
              <span className="text-neutral-400 hidden sm:inline">|</span>
              <a
                href="https://www.linkedin.com/in/ashwinranganath1997"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1e40af] text-neutral-600 font-medium transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-neutral-400">·</span>
              <a
                href="https://github.com/AshwinRanganath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1e40af] text-neutral-600 font-medium transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="w-full h-[1.5px] bg-[#1e40af] mt-2.5 mb-4" />
          </header>

          {/* Section: Professional Profile */}
          <section className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2">
              Professional Profile
            </h2>
            <p className="text-[11px] text-neutral-800 leading-[1.45] text-justify">
              Backend Software Engineer with a Master of Technology in Computer Science Engineering and
              over 3 years of hands-on experience developing high-performance Java and Spring Boot
              backend platforms powering warehouse management systems (WMS), automated fulfillment
              pipelines, and distributed enterprise integrations. Product-minded engineer focused on
              solving physical and digital operational challenges across inbound stock receipts,
              inventory allocation, tote-level order lifecycles, and dispatch logistics. Experienced in
              agentic engineering and AI tooling, leveraging multi-agent workflows, automated root-cause
              diagnostics, and event-driven automation to eliminate warehouse bottlenecks and scale
              throughput.
            </p>
          </section>

          {/* Section: Technical Skills */}
          <section className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-[11px] leading-[1.4]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="w-40 sm:w-44 shrink-0 font-bold text-neutral-900">
                  Backend &amp; Core
                </span>
                <span className="flex-1 text-neutral-800">
                  Java (17 / 21), Spring Boot, Spring Framework, Microservices Architecture, RESTful
                  APIs, Python 3.x, C#, SQL, Maven, JUnit
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="w-40 sm:w-44 shrink-0 font-bold text-neutral-900">
                  Warehouse &amp; Logistics
                </span>
                <span className="flex-1 text-neutral-800">
                  Warehouse Management Systems (WMS: ShipHero, ControlPort, Consignly, GRL), Inbound
                  ASN, Stock Allocation, Fulfillment Write-backs, Order Lifecycles, Bottleneck
                  Remediation, EDI
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="w-40 sm:w-44 shrink-0 font-bold text-neutral-900">
                  AI &amp; Agentic Tools
                </span>
                <span className="flex-1 text-neutral-800">
                  Agentic Engineering, Multi-agent Orchestration, Automated Error Diagnosis &amp;
                  Remediation, OpenAI &amp; Azure OpenAI APIs, Prompt Engineering, Workflow Automation
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="w-40 sm:w-44 shrink-0 font-bold text-neutral-900">
                  Data &amp; Infrastructure
                </span>
                <span className="flex-1 text-neutral-800">
                  PostgreSQL, Event Queuing &amp; Asynchronous Messaging (RabbitMQ concepts), Docker,
                  Git, CI/CD, Linux, Azure AD / Microsoft Graph, GCP
                </span>
              </div>
            </div>
          </section>

          {/* Section: Professional Experience */}
          <section className="space-y-3.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2.5">
              Professional Experience
            </h2>

            {/* CNZ Consultants */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[12.5px] text-neutral-950 font-sans">
                  CNZ Consultants
                </span>
                <span className="font-semibold text-[11px] text-neutral-700 font-mono">
                  Jan 2026 – Present
                </span>
              </div>
              <div className="text-[11px] font-semibold text-neutral-800 italic mb-1">
                Senior Software Engineer (Java &amp; Integration Platform Lead)
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] leading-[1.42] text-neutral-800 marker:text-neutral-500">
                <li>
                  Architect and maintain high-throughput Java 17 and Spring Boot microservices
                  orchestrating resilient multi-tenant data pipelines between enterprise ERPs (Cin7
                  Core, Cin7 Omni) and Warehouse Management Systems (ShipHero, ControlPort, Consignly,
                  GRL).
                </li>
                <li>
                  Engineer automated order lifecycle pipelines managing inbound stock processing (ASN),
                  wave/batch order allocation, fulfillment write-backs, and dispatch status tracking,
                  ensuring zero data loss and strict transactional consistency.
                </li>
                <li>
                  Implement automated bottleneck detection and inline remediation mechanisms for
                  inventory allocation holds, SKU mapping mismatches, and delivery address exceptions,
                  dramatically reducing manual intervention for warehouse operations teams.
                </li>
                <li>
                  Pioneer agentic engineering and multi-agent workflows to automate service
                  diagnostics, payload telemetry inspections, and exception alerts across high-volume
                  scheduled and webhook-driven jobs.
                </li>
                <li>
                  Design resilient REST API clients with backoff/retry strategies, PostgreSQL
                  transactional data stores, and event telemetry reporting via Microsoft Graph API to
                  ensure operational transparency under high third-party rate limits.
                </li>
                <li>
                  Take full end-to-end ownership of features from architectural design to containerized
                  Docker deployment, collaborating closely with distributed cross-functional teams and
                  warehouse operations managers.
                </li>
              </ul>
            </div>

            {/* Unisys */}
            <div className="space-y-1 pt-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[12.5px] text-neutral-950 font-sans">
                  Unisys
                </span>
                <span className="font-semibold text-[11px] text-neutral-700 font-mono">
                  Aug 2023 – Dec 2025
                </span>
              </div>
              <div className="text-[11px] font-semibold text-neutral-800 italic mb-1">
                Associate Cloud Engineer / Software Engineer
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] leading-[1.42] text-neutral-800 marker:text-neutral-500">
                <li>
                  Developed Java-based code analysis and AST parsing tools to evaluate enterprise system
                  complexity, dependency graphs, and modernization paths for migration into microservices
                  architectures.
                </li>
                <li>
                  Integrated OpenAI and Azure OpenAI APIs into automated developer tooling, utilizing
                  agentic reasoning to analyze code complexity and generate tailored architectural
                  migration recommendations.
                </li>
                <li>
                  Automated technical assessment workflows using prompt engineering and AI-driven static
                  analysis, cutting manual codebase evaluation effort by over 40%.
                </li>
                <li>
                  Collaborated on building modular, testable backend components, enforcing test-driven
                  development (TDD) and clean object-oriented architecture across distributed team
                  deliverables.
                </li>
              </ul>
            </div>
          </section>
        </article>

        {/* Page Break Separator (Screen Only) */}
        <div className="no-print flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono px-2">
          <span>End of Page 1</span>
          <span className="text-[11px]">2-Page Print Layout</span>
          <span>Beginning of Page 2</span>
        </div>

        {/* ========================================================= */}
        {/* PAGE 2                                                    */}
        {/* ========================================================= */}
        <article className="resume-sheet bg-white text-neutral-900 p-8 sm:p-12 rounded-xl shadow-xl border border-neutral-200/80 font-sans space-y-4">
          {/* Section: Professional Experience Continued */}
          <section className="resume-avoid-break">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2.5">
              Professional Experience (Continued)
            </h2>

            {/* AMD India */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-[12.5px] text-neutral-950 font-sans">
                  AMD India Private Limited
                </span>
                <span className="font-semibold text-[11px] text-neutral-700 font-mono">
                  Aug 2022 – Jul 2023
                </span>
              </div>
              <div className="text-[11px] font-semibold text-neutral-800 italic mb-1">
                Full Stack Developer Intern
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] leading-[1.42] text-neutral-800 marker:text-neutral-500">
                <li>
                  Engineered enterprise web applications and high-performance RESTful APIs using C#
                  Entity Framework, LINQ, and SQL databases, taking features from concept to production.
                </li>
                <li>
                  Automated background task scheduling and operational data batching using Python
                  scripts, optimizing server loads and significantly improving system responsiveness.
                </li>
                <li>
                  Constructed user interfaces using Angular Material, PrimeNG, and ApexCharts, focusing
                  on high data density, operational clarity, and real-time visualization.
                </li>
                <li>
                  Collaborated within an Agile/Scrum team, utilizing GitHub for CI/CD source control and
                  actively contributing to sprint planning and backlog grooming.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Key Architectural & Domain Competencies */}
          <section className="resume-avoid-break">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2.5">
              Key Architectural &amp; Domain Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              <div className="border-l-2 border-[#1e40af] pl-2.5">
                <div className="font-bold text-[11px] text-neutral-900">
                  Warehouse &amp; Fulfillment Mechanics
                </div>
                <p className="text-[10.5px] leading-[1.38] text-neutral-700 mt-0.5">
                  Deep knowledge of physical-to-digital workflows: inbound ASN receipts, stock
                  allocations, tote/conveyor tracking, order holds, and carrier dispatch integrations.
                </p>
              </div>

              <div className="border-l-2 border-[#1e40af] pl-2.5">
                <div className="font-bold text-[11px] text-neutral-900">
                  Resilient Distributed Backend
                </div>
                <p className="text-[10.5px] leading-[1.38] text-neutral-700 mt-0.5">
                  Experience designing idempotent Spring Boot APIs, transactional data integrity,
                  circuit-breakers, dead-letter retries, and asynchronous queue processing.
                </p>
              </div>

              <div className="border-l-2 border-[#1e40af] pl-2.5">
                <div className="font-bold text-[11px] text-neutral-900">
                  Agentic Engineering &amp; Automation
                </div>
                <p className="text-[10.5px] leading-[1.38] text-neutral-700 mt-0.5">
                  Hands-on application of multi-agent LLM workflows, automated error root-cause triage,
                  and intelligent pipeline monitoring to minimize operational overhead.
                </p>
              </div>

              <div className="border-l-2 border-[#1e40af] pl-2.5">
                <div className="font-bold text-[11px] text-neutral-900">
                  Product Mindset &amp; Ownership
                </div>
                <p className="text-[10.5px] leading-[1.38] text-neutral-700 mt-0.5">
                  Driven by business impact: solving real-world warehouse bottlenecks, aligning
                  technical design with warehouse operator needs, and delivering reliable software.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Education & Qualifications */}
          <section className="resume-avoid-break">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2">
              Education &amp; Qualifications
            </h2>
            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900">Manipal University</span>
                  <span className="font-semibold text-neutral-700 font-mono text-[10.5px]">
                    Aug 2021 – Jul 2023
                  </span>
                </div>
                <div className="text-neutral-700">
                  Master of Technology (M.Tech), Computer Science Engineering | GPA: 7.9
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-neutral-900">
                    Visvesvaraya Technological University
                  </span>
                  <span className="font-semibold text-neutral-700 font-mono text-[10.5px]">
                    Jul 2015 – May 2019
                  </span>
                </div>
                <div className="text-neutral-700">
                  Bachelor of Engineering (B.E.), Information Science and Engineering | GPA: 6.2
                </div>
              </div>
            </div>
          </section>

          {/* Section: Selected Engineering Projects */}
          <section className="resume-avoid-break">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2">
              Selected Engineering Projects
            </h2>
            <div className="space-y-2 text-[11px] leading-[1.4] text-neutral-800">
              <p>
                <strong className="font-bold text-neutral-900">
                  Enterprise Resource &amp; Warehouse Tracking System:
                </strong>{" "}
                Architected a full-stack system to manage supplier parts ordering, stock movements, and
                manufacturing lifecycle stages, providing end-to-end inventory visibility for plant
                operations.
              </p>
              <p>
                <strong className="font-bold text-neutral-900">
                  Automated Code Complexity &amp; Dependency Analyzer (Java):
                </strong>{" "}
                Built a Java AST parsing engine that maps module hierarchies, computes software metrics,
                and integrates LLM reasoning agents to suggest automated refactoring and migration paths.
              </p>
              <p>
                <strong className="font-bold text-neutral-900">
                  Echo Chamber Effects &amp; Social Corpus Sentiment Analyzer:
                </strong>{" "}
                Conducted academic research and built a data pipeline evaluating sentiment distribution
                and interaction clustering across large-scale social platform corpora.
              </p>
            </div>
          </section>

          {/* Section: Honors & Awards */}
          <section className="resume-avoid-break pt-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#1e40af] border-b border-neutral-200 pb-0.5 mb-2">
              Honors &amp; Awards
            </h2>
            <div className="text-[11px] text-neutral-800">
              <strong className="font-bold text-neutral-900">
                Best Poster Award, AMD Innovation EXPO 2023
              </strong>{" "}
              | AMD India Private Limited
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
