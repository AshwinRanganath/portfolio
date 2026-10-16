"use client";

import React, { useState } from "react";
import {
  Server,
  ShoppingBag,
  Database,
  FileSpreadsheet,
  PackageCheck,
  Cpu,
  Bot,
  Layers,
  Award,
  BarChart3,
  Code2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface CompanySystemSandboxProps {
  companyIndex: number;
}

export function CompanySystemSandbox({ companyIndex }: CompanySystemSandboxProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // 1. CNZ Consultants Architecture Sandbox
  if (companyIndex === 0) {
    return (
      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)] flex flex-col gap-3 select-none">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono font-bold text-[var(--text-heading)]">
              Real-World System Architecture: Enterprise Multi-Domain Mesh
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--theme-accent-fg)] font-medium">
            Click any node for architecture spec
          </span>
        </div>

        {/* Interactive Diagram Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Column 1: Sources */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedNode("shopify")}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedNode === "shopify"
                  ? "bg-[var(--theme-accent-subtle)] border-[var(--border-accent)]"
                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#96bf48]" />
                <span className="text-xs font-bold text-[var(--text-heading)]">Shopify Storefronts</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
                Order Webhooks &bull; Multi-Currency FX
              </p>
            </button>

            <button
              onClick={() => setSelectedNode("cin7")}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedNode === "cin7"
                  ? "bg-[var(--theme-accent-subtle)] border-[var(--border-accent)]"
                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-xs font-bold text-[var(--text-heading)]">Cin7 Core / Omni</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
                ERP Stock Allocation &bull; B2B Catalogs
              </p>
            </button>
          </div>

          {/* Column 2: Core Processing Gateway (Ashwin's Platform) */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedNode("gateway")}
              className={`w-full p-4 rounded-2xl border-2 text-center transition-all ${
                selectedNode === "gateway" || !selectedNode
                  ? "bg-[var(--theme-accent-subtle)] border-[var(--border-accent)] shadow-[0_0_25px_var(--theme-accent-shadow)]"
                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)]"
              }`}
            >
              <div className="relative inline-block">
                <Server className="w-7 h-7 text-[var(--theme-accent-fg)] mx-auto" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <h4 className="text-xs font-bold font-mono text-[var(--theme-accent-fg)] mt-1.5">
                CNZ Integrations Platform
              </h4>
              <p className="text-[10px] text-[var(--text-body)] font-mono mt-0.5">
                Spring Boot 3 Core &bull; Multi-Tenant Auth
              </p>
              <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1.5 text-[9px] font-mono text-emerald-500 dark:text-emerald-400 font-semibold">
                <Bot className="w-3 h-3" />
                <span>Agentic AI Diagnostic Mesh</span>
              </div>
            </button>
          </div>

          {/* Column 3: Destination Systems */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedNode("xero")}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedNode === "xero"
                  ? "bg-[var(--theme-accent-subtle)] border-[var(--border-accent)]"
                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#13b5ea]" />
                <span className="text-xs font-bold text-[var(--text-heading)]">Xero &amp; MYOB</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
                Automated Ledger &bull; Invoices &bull; Tax
              </p>
            </button>

            <button
              onClick={() => setSelectedNode("shiphero")}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedNode === "shiphero"
                  ? "bg-[var(--theme-accent-subtle)] border-[var(--border-accent)]"
                  : "bg-[var(--bg-subtle)] border-[var(--border-subtle)] hover:border-[var(--theme-accent-border)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span className="text-xs font-bold text-[var(--text-heading)]">ShipHero &amp; 3PL</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
                CartonCloud &bull; Automated SFTP CSV
              </p>
            </button>
          </div>
        </div>

        {/* Dynamic Architectural Detail Card based on selection */}
        <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-accent)] text-xs font-mono text-[var(--text-body)] flex items-start gap-2.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-[var(--theme-accent-fg)] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[var(--theme-accent-fg)]">
              {selectedNode === "shopify" && "Shopify Ingestion Layer: "}
              {selectedNode === "cin7" && "Cin7 ERP Integration Layer: "}
              {(!selectedNode || selectedNode === "gateway") && "CNZ Integrations Platform Architecture: "}
              {selectedNode === "xero" && "Accounting & Reconciliation Engine: "}
              {selectedNode === "shiphero" && "WMS / 3PL Warehouse Fulfillment Mesh: "}
            </span>
            <span>
              {selectedNode === "shopify" &&
                "Built resilient webhook ingestion handling burst volume, multi-currency live FX rate conversion, and catalog synchronization."}
              {selectedNode === "cin7" &&
                "Engineered transactional synchronization with Cin7 Core, reconciling inventory adjustments, purchase orders, and multi-location warehouse allocations."}
              {(!selectedNode || selectedNode === "gateway") &&
                "Refactored legacy monolith into the high-throughput CNZ Integrations Platform: modular Spring Boot 3 microservices with dynamic strategy authorization (OAuth2, API keys, MD5 signatures), circuit breaking, and autonomous multi-agent error remediation."}
              {selectedNode === "xero" &&
                "Engineered automated posting of invoices, debit notes, and COGS line items into Xero and MYOB with automatic tax-code resolution and idempotency keys."}
              {selectedNode === "shiphero" &&
                "Architected automated SFTP/CSV pipelines syncing packing slips and real-time tracking numbers with ShipHero, ControlPort, and CartonCloud."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unisys Architecture Sandbox (AST + LLM Modernization)
  if (companyIndex === 1) {
    return (
      <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)] flex flex-col gap-3 select-none">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono font-bold text-[var(--text-heading)]">
              Real-World System Flow: Java AST &amp; LLM Code Modernization
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
            ⚡ 40% Audit Velocity Boost
          </span>
        </div>

        {/* 3-Stage Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Stage 1: Legacy Codebase */}
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
            <Code2 className="w-6 h-6 text-cyan-500 dark:text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-[var(--text-heading)] mt-1.5 font-mono">
              Enterprise Java Repos
            </h4>
            <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
              Legacy Monoliths &bull; Multi-tier
            </p>
          </div>

          {/* Stage 2: Java AST & Static Analysis */}
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
            <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mx-auto" />
            <h4 className="text-xs font-bold text-[var(--text-heading)] mt-1.5 font-mono">
              Java AST Parser
            </h4>
            <p className="text-[10px] text-cyan-700 dark:text-cyan-300 font-mono mt-0.5">
              Dependency Graphs &bull; Complexity
            </p>
          </div>

          {/* Stage 3: Azure OpenAI Reasoning */}
          <div className="p-3 rounded-xl bg-[var(--theme-accent-subtle)] border border-[var(--border-accent)] text-center">
            <Bot className="w-6 h-6 text-[var(--theme-accent-fg)] mx-auto" />
            <h4 className="text-xs font-bold text-[var(--theme-accent-fg)] mt-1.5 font-mono">
              LLM Modernizer
            </h4>
            <p className="text-[10px] text-[var(--text-body)] font-mono mt-0.5">
              Automated Refactoring &bull; Clean OOP
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] font-mono leading-relaxed bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-subtle)]">
          &gt; Automated technical assessment workflows through tailored prompt engineering and AST dependency mapping, accelerating codebase evaluations by <strong className="text-[var(--text-heading)]">over 40%</strong>.
        </p>
      </div>
    );
  }

  // 3. AMD India Architecture Sandbox (High-Density Dashboards)
  return (
    <div className="p-4 rounded-2xl bg-[var(--bg-subtle)]/60 border border-[var(--border-subtle)] flex flex-col gap-3 select-none">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span className="font-mono font-bold text-[var(--text-heading)]">
            Real-World System Flow: High-Density Business Visualization
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
          🏆 Best Poster Award EXPO 2023
        </span>
      </div>

      {/* 3-Stage AMD Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
          <Database className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto" />
          <h4 className="text-xs font-bold text-[var(--text-heading)] mt-1.5 font-mono">
            C# &bull; .NET &bull; SQL
          </h4>
          <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
            Entity Framework &bull; LINQ APIs
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-center">
          <Cpu className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto" />
          <h4 className="text-xs font-bold text-[var(--text-heading)] mt-1.5 font-mono">
            Python Schedulers
          </h4>
          <p className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
            Automated ETL &bull; Server Latency Opt
          </p>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
          <BarChart3 className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto" />
          <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1.5 font-mono">
            Angular &bull; ApexCharts
          </h4>
          <p className="text-[10px] text-[var(--text-body)] font-mono mt-0.5">
            High Data Density &bull; Real-time UI
          </p>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] font-mono leading-relaxed bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-subtle)]">
        &gt; Engineered full-stack business applications, reducing latency via Python batching and delivering high-density interactive dashboards honored with the <strong className="text-amber-600 dark:text-amber-400">Best Poster Award at the AMD Innovation EXPO 2023</strong>.
      </p>
    </div>
  );
}
