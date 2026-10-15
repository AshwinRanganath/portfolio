import React from "react";
import { Bot } from "lucide-react";

interface BotLogoProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  withBeacon?: boolean;
}

export function BotLogo({
  size = "md",
  className = "",
  withBeacon = false,
}: BotLogoProps) {
  const sizeMap = {
    xs: {
      container: "w-5 h-5 rounded-md",
      icon: "w-3 h-3",
      beacon: "w-1.5 h-1.5 -top-0.5 -right-0.5",
    },
    sm: {
      container: "w-6 h-6 rounded-md",
      icon: "w-3.5 h-3.5",
      beacon: "w-1.5 h-1.5 -top-0.5 -right-0.5",
    },
    md: {
      container: "w-8 h-8 rounded-lg",
      icon: "w-4 h-4",
      beacon: "w-2 h-2 -top-0.5 -right-0.5",
    },
    lg: {
      container: "w-10 h-10 rounded-xl",
      icon: "w-5 h-5",
      beacon: "w-2.5 h-2.5 -top-1 -right-1",
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.container} bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/50 ${className}`}
      aria-label="AsP Bot Logo"
    >
      <Bot className={`${currentSize.icon} text-white drop-shadow-sm`} />
      {withBeacon && (
        <span
          className={`absolute ${currentSize.beacon} rounded-full bg-emerald-400 border border-[var(--bg-primary)] shadow-sm animate-pulse`}
          title="AsP Active"
        />
      )}
    </div>
  );
}
