"use client";

import React, { useState } from "react";
import { Server, ShoppingBag, Database, FileSpreadsheet, PackageCheck, Activity } from "lucide-react";

interface SystemPipelineFlowProps {
  compact?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export function SystemPipelineFlow({ compact = false, onNodeClick }: SystemPipelineFlowProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId === activeNode ? null : nodeId);
    if (onNodeClick) onNodeClick(nodeId);
  };

  return (
    <div className="relative w-full h-full min-h-[140px] flex flex-col justify-between select-none">
      {/* Top Real-World Status Telemetry Strip */}
      <div className="flex items-center justify-between text-[10px] font-mono pb-1 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold">Pipeline Active</span>
          <span className="text-[var(--text-faint)] hidden sm:inline">&bull; 200 OK (14ms)</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <span className="hidden sm:inline">Multi-Tenant Gateway</span>
          <span className="text-[var(--theme-accent-text-dark)] font-semibold">250k+ syncs/mo</span>
        </div>
      </div>

      {/* SVG Pipeline Diagram with Animated Packets */}
      <div className="relative flex-1 flex items-center justify-between my-2 px-1">
        {/* SVG Bezier Flow Paths Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 400 100"
        >
          <defs>
            {/* Gradients for Paths */}
            <linearGradient id="streamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--theme-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="streamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <filter id="packetGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Path 1: Shopify (Top Left: 50, 25) -> Spring Boot Core (200, 50) */}
          <path
            id="pipe-path-1"
            d="M 60 25 C 130 25, 140 50, 200 50"
            fill="none"
            stroke="url(#streamGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Path 2: Cin7 ERP (Bottom Left: 50, 75) -> Spring Boot Core (200, 50) */}
          <path
            id="pipe-path-2"
            d="M 60 75 C 130 75, 140 50, 200 50"
            fill="none"
            stroke="url(#streamGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Path 3: Spring Boot Core (200, 50) -> Xero Invoices (Top Right: 340, 25) */}
          <path
            id="pipe-path-3"
            d="M 200 50 C 260 50, 270 25, 340 25"
            fill="none"
            stroke="url(#streamGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Path 4: Spring Boot Core (200, 50) -> ShipHero WMS (Bottom Right: 340, 75) */}
          <path
            id="pipe-path-4"
            d="M 200 50 C 260 50, 270 75, 340 75"
            fill="none"
            stroke="url(#streamGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Continuous Flowing Data Packet 1 */}
          <circle r="3.5" fill="var(--theme-accent)" filter="url(#packetGlow)">
            <animateMotion
              repeatCount="indefinite"
              dur="2.4s"
              path="M 60 25 C 130 25, 140 50, 200 50"
            />
          </circle>

          {/* Continuous Flowing Data Packet 2 */}
          <circle r="3.5" fill="var(--theme-accent)" filter="url(#packetGlow)">
            <animateMotion
              repeatCount="indefinite"
              dur="3.1s"
              begin="0.8s"
              path="M 60 75 C 130 75, 140 50, 200 50"
            />
          </circle>

          {/* Continuous Flowing Data Packet 3 */}
          <circle r="3.5" fill="#34d399" filter="url(#packetGlow)">
            <animateMotion
              repeatCount="indefinite"
              dur="2.6s"
              begin="0.4s"
              path="M 200 50 C 260 50, 270 25, 340 25"
            />
          </circle>

          {/* Continuous Flowing Data Packet 4 */}
          <circle r="3.5" fill="#34d399" filter="url(#packetGlow)">
            <animateMotion
              repeatCount="indefinite"
              dur="2.8s"
              begin="1.2s"
              path="M 200 50 C 260 50, 270 75, 340 75"
            />
          </circle>
        </svg>

        {/* Column 1: Source Nodes (Shopify, Cin7 ERP) */}
        <div className="flex flex-col gap-3 z-10">
          {/* Shopify Node */}
          <button
            type="button"
            onClick={() => handleNodeClick("shopify")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/10 hover:border-[var(--theme-accent-border)] transition-colors text-left"
          >
            <ShoppingBag className="w-3 h-3 text-[#96bf48]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-heading)]">Shopify</span>
              <span className="text-[8px] font-mono text-[var(--text-faint)]">Orders/Catalogs</span>
            </div>
          </button>

          {/* Cin7 ERP Node */}
          <button
            type="button"
            onClick={() => handleNodeClick("cin7")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/10 hover:border-[var(--theme-accent-border)] transition-colors text-left"
          >
            <Database className="w-3 h-3 text-[#38bdf8]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-heading)]">Cin7 Core</span>
              <span className="text-[8px] font-mono text-[var(--text-faint)]">Inventory/B2B</span>
            </div>
          </button>
        </div>

        {/* Column 2: Central Gateway & Agentic AI Hub */}
        <div className="flex flex-col items-center z-10 mx-2">
          <button
            type="button"
            onClick={() => handleNodeClick("gateway")}
            className="group relative flex flex-col items-center p-2.5 rounded-2xl bg-[var(--theme-accent-subtle)] border-2 border-[var(--border-accent)] hover:border-[var(--theme-accent)] shadow-[0_0_20px_var(--theme-accent-shadow)] transition-all"
          >
            <div className="relative">
              <Server className="w-5 h-5 text-[var(--theme-accent)] transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold font-mono text-[var(--theme-accent-text-dark)] mt-1 whitespace-nowrap">
              Spring Boot 3
            </span>
            <span className="text-[8px] font-mono text-[var(--text-faint)] whitespace-nowrap">
              Core Gateway &bull; AI Mesh
            </span>
          </button>
        </div>

        {/* Column 3: Destination Nodes (Xero, ShipHero WMS) */}
        <div className="flex flex-col gap-3 z-10">
          {/* Xero Accounting Node */}
          <button
            type="button"
            onClick={() => handleNodeClick("xero")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/10 hover:border-emerald-500/40 transition-colors text-left"
          >
            <FileSpreadsheet className="w-3 h-3 text-[#13b5ea]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-heading)]">Xero / MYOB</span>
              <span className="text-[8px] font-mono text-[var(--text-faint)]">COGS / Invoices</span>
            </div>
          </button>

          {/* ShipHero WMS Node */}
          <button
            type="button"
            onClick={() => handleNodeClick("shiphero")}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-white/10 hover:border-emerald-500/40 transition-colors text-left"
          >
            <PackageCheck className="w-3 h-3 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[var(--text-heading)]">ShipHero WMS</span>
              <span className="text-[8px] font-mono text-[var(--text-faint)]">3PL / SFTP Sync</span>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Micro-Tooltip when a node is clicked */}
      {activeNode && (
        <div className="p-2 rounded-xl bg-black/60 border border-[var(--border-accent)] text-[10px] font-mono text-[var(--text-body)] flex items-center justify-between gap-2 mt-1">
          {activeNode === "shopify" && (
            <span>⚡ Shopify: Multi-currency live FX engine, product catalogs, and automated webhook dispatch.</span>
          )}
          {activeNode === "cin7" && (
            <span>⚡ Cin7 ERP: Real-time stock reservation, B2B order routing, and transactional ledger sync.</span>
          )}
          {activeNode === "gateway" && (
            <span>🚀 Spring Boot 3 Gateway: Circuit breaking, retry backoffs, OAuth2 auth, and Agentic error diagnosis.</span>
          )}
          {activeNode === "xero" && (
            <span>⚡ Xero &amp; MYOB: Multi-tenant tax resolution, line-item reconciliation, and automated invoice pushing.</span>
          )}
          {activeNode === "shiphero" && (
            <span>⚡ ShipHero &amp; CartonCloud: Automated SFTP CSV feeds, fulfillment tracking, and warehouse dispatch.</span>
          )}
          <span className="text-[var(--theme-accent-text-dark)] font-semibold shrink-0">Ashwin&apos;s Architecture</span>
        </div>
      )}
    </div>
  );
}
