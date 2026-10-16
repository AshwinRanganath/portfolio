"use client";

import React, { useState, useEffect } from "react";
import { CockpitTelemetryBar } from "./CockpitTelemetryBar";
import { CockpitDock, CockpitSection } from "./CockpitDock";
import { HeroIdentityTile } from "./tiles/HeroIdentityTile";
import { ExperienceTile } from "./tiles/ExperienceTile";
import { TechRadarTile } from "./tiles/TechRadarTile";
import { EducationCredentialsTile } from "./tiles/EducationCredentialsTile";
import { AspCopilotTile } from "./tiles/AspCopilotTile";
import { ExpandedStageModal } from "./views/ExpandedStageModal";

export function CockpitContainer() {
  const [activeSection, setActiveSection] = useState<CockpitSection>("home");
  const [initialTopicId, setInitialTopicId] = useState<string | null>(null);

  // Global hotkeys (1-3 for sections, / for AsP bot, Esc for Cockpit home)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        setActiveSection("home");
      } else if (e.key === "1") {
        setActiveSection("experience");
      } else if (e.key === "2") {
        setActiveSection("tech");
      } else if (e.key === "3") {
        setActiveSection("projects");
      } else if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setInitialTopicId(null);
        setActiveSection("asp");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenAsp = (queryOrTopicId?: string) => {
    if (queryOrTopicId) {
      setInitialTopicId(queryOrTopicId);
    } else {
      setInitialTopicId(null);
    }
    setActiveSection("asp");
  };

  return (
    <div className="relative min-h-[100dvh] sm:max-h-[100dvh] flex flex-col justify-between overflow-x-hidden overflow-y-auto sm:overflow-hidden bg-grid-pattern selection:bg-[var(--theme-accent)]/20 selection:text-[var(--theme-accent-text-dark)]">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[var(--ambient-glow-1)] blur-[150px] pointer-events-none -z-10 rounded-full" />
      <div className="fixed bottom-12 right-12 w-[450px] h-[350px] bg-[var(--ambient-glow-2)] blur-[130px] pointer-events-none -z-10 rounded-full" />

      {/* Top CarPlay Telemetry Bar */}
      <CockpitTelemetryBar
        activeTileId={activeSection === "home" ? null : activeSection}
        onBackToCockpit={() => setActiveSection("home")}
        onOpenAsp={() => handleOpenAsp()}
      />

      {/* Central Interactive Bento Deck */}
      <main className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-2.5 sm:px-6 py-2 pb-24 sm:pb-20">
        <div className="w-full min-h-0 sm:h-full sm:max-h-[82vh] flex flex-col justify-center">
          {/* Mobile: Full-width stacked cards. Desktop: Row 1 (Hero 7 + Exp 5), Row 2 (Tech 4 + Proj 4 + Asp 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-4 flex-1 min-h-0">
            {/* Tile 1: Hero Identity */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-7 flex flex-col min-h-0">
              <HeroIdentityTile onExpand={() => setActiveSection("hero")} />
            </div>

            {/* Tile 2: Experience */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-5 flex flex-col min-h-0">
              <ExperienceTile onExpand={() => setActiveSection("experience")} />
            </div>

            {/* Tile 3: Tech Stack */}
            <div className="col-span-1 lg:col-span-4 flex flex-col min-h-0">
              <TechRadarTile onExpand={() => setActiveSection("tech")} />
            </div>

            {/* Tile 4: Education & Honors */}
            <div className="col-span-1 lg:col-span-4 flex flex-col min-h-0">
              <EducationCredentialsTile onExpand={() => setActiveSection("projects")} />
            </div>

            {/* Tile 5: AsP AI Co-pilot */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col min-h-0">
              <AspCopilotTile onExpand={(q) => handleOpenAsp(q)} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating CarPlay Bottom Dock */}
      <CockpitDock
        activeSection={activeSection}
        onSelectSection={(sec) => {
          if (sec === "asp") {
            handleOpenAsp();
          } else {
            setActiveSection(sec);
          }
        }}
      />

      {/* In-Place Expanded Stage View (when a tile is open) */}
      {activeSection !== "home" && (
        <ExpandedStageModal
          activeSection={activeSection}
          onClose={() => setActiveSection("home")}
          onAskAsp={(query) => handleOpenAsp(query)}
          initialTopicId={initialTopicId}
        />
      )}
    </div>
  );
}
