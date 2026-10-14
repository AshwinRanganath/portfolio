"use client";

import { useEffect } from "react";
import { profileData } from "@/data/profile";

interface KeyboardManagerProps {
  onOpenBot: () => void;
  onSelectTopic: (topicId: string) => void;
  isBotOpen: boolean;
}

export function KeyboardManager({
  onOpenBot,
  onSelectTopic,
  isBotOpen,
}: KeyboardManagerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Handle Slash (/) or Cmd+K / Ctrl+K
      if ((e.key === "/" && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        onOpenBot();
        return;
      }

      // Handle Numbers 1 through 6 when not typing
      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= profileData.botTopics.length) {
          e.preventDefault();
          const targetTopic = profileData.botTopics[num - 1];
          if (targetTopic) {
            onSelectTopic(targetTopic.id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenBot, onSelectTopic]);

  return null;
}
