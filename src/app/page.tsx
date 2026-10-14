"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCard } from "@/components/HeroCard";
import { FloatingBotDock } from "@/components/FloatingBotDock";
import { BotDrawer } from "@/components/BotDrawer";
import { KeyboardManager } from "@/components/KeyboardManager";

export default function Home() {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const handleOpenBot = () => {
    setActiveTopicId(null);
    setIsBotOpen(true);
  };

  const handleSelectTopic = (topicId: string) => {
    setActiveTopicId(topicId);
    setIsBotOpen(true);
  };

  const handleCloseBot = () => {
    setIsBotOpen(false);
    setActiveTopicId(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-grid-pattern selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-200">
      {/* Ambient background glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--ambient-glow-1)] blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[300px] bg-[var(--ambient-glow-2)] blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* Global Hotkey Manager */}
      <KeyboardManager
        onOpenBot={handleOpenBot}
        onSelectTopic={handleSelectTopic}
        isBotOpen={isBotOpen}
      />

      {/* Top CLI Header */}
      <Header onOpenBot={handleOpenBot} />

      {/* Main Single-Viewport Hero Centerpiece */}
      <main className="flex-1 flex items-center justify-center py-6">
        <HeroCard
          onOpenBot={handleOpenBot}
          onSelectTopic={handleSelectTopic}
        />
      </main>

      {/* Floating Interactive Bot Pill Dock */}
      <FloatingBotDock
        onOpenBot={handleOpenBot}
        onSelectTopic={handleSelectTopic}
        isBotOpen={isBotOpen}
      />

      {/* Slide-over Interactive Bot Drawer */}
      <BotDrawer
        isOpen={isBotOpen}
        onClose={handleCloseBot}
        initialTopicId={activeTopicId}
      />
    </div>
  );
}
