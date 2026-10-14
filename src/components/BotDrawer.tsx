"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  Search,
  ExternalLink,
} from "lucide-react";
import { profileData, BotTopic } from "@/data/profile";
import { FormattedMarkdown } from "@/components/FormattedMarkdown";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  topicId?: string;
  followUps?: string[];
  timestamp: string;
  isStreaming?: boolean;
}

interface BotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicId?: string | null;
}

export function BotDrawer({ isOpen, onClose, initialTopicId }: BotDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeStreamRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: `Hi there! 👋 I am Ashwin's interactive portfolio assistant.

Feel free to ask me about his **current role at CNZ Consultants**, his **M.Tech from Manipal University**, his **featured projects**, or his **Java & AI tech stack**.

Pick any topic below or type a question!`,
          followUps: ["current-role", "education", "projects", "skills"],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [messages.length]);

  // Handle initialTopicId trigger
  useEffect(() => {
    if (isOpen && initialTopicId) {
      handleSelectTopic(initialTopicId);
    }
  }, [isOpen, initialTopicId]);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const streamBotResponse = (
    fullText: string,
    topicId?: string,
    followUps?: string[]
  ) => {
    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
    }

    const botMsgId = "msg-" + Date.now();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Insert empty message
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: "bot",
        text: "",
        topicId,
        followUps,
        timestamp,
        isStreaming: true,
      },
    ]);

    let currentIndex = 0;
    const chunkSize = 4; // characters per tick for fast smooth typing

    activeStreamRef.current = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= fullText.length) {
        if (activeStreamRef.current) clearInterval(activeStreamRef.current);
        activeStreamRef.current = null;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: fullText, isStreaming: false } : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: fullText.slice(0, currentIndex) }
              : msg
          )
        );
      }
    }, 12);
  };

  const handleSelectTopic = (topicId: string) => {
    const topic = profileData.botTopics.find((t) => t.id === topicId);
    if (!topic) return;

    // Add user question
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: topic.question,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Stream bot response
    streamBotResponse(topic.answerMarkdown, topic.id, topic.followUps);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    setInputValue("");

    // Add user message
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Search for answer
    const q = query.toLowerCase();

    // Check direct topic match
    const matchedTopic = profileData.botTopics.find(
      (t) =>
        t.question.toLowerCase().includes(q) ||
        t.label.toLowerCase().includes(q) ||
        t.tags.some((tag) => q.includes(tag.toLowerCase()))
    );

    if (matchedTopic) {
      streamBotResponse(matchedTopic.answerMarkdown, matchedTopic.id, matchedTopic.followUps);
      return;
    }

    // Check experience matches (e.g. Unisys, AMD, CNZ)
    if (q.includes("unisys")) {
      const unisys = profileData.experiences.find((e) => e.company.toLowerCase().includes("unisys"));
      const text = `At **Unisys** (Aug 2023 – Dec 2025), Ashwin worked as an **Associate Cloud Engineer / Software Engineer**:
- Built Java-based static analysis and AST parsing tools to analyze system complexity and module hierarchies.
- Integrated OpenAI & Azure OpenAI APIs to build intelligent developer tooling and automated refactoring suggestions.
- Accelerated codebase technical assessments by over **40%** through tailored prompt engineering.
- Developed microservices with JUnit and Test-Driven Development (TDD).`;
      streamBotResponse(text, "experience", ["current-role", "education", "skills"]);
      return;
    }

    if (q.includes("amd")) {
      const text = `At **AMD India** (Aug 2022 – Jul 2023), Ashwin was a **Full Stack Developer Intern**:
- Engineered full-stack business apps and RESTful APIs using C# Entity Framework and SQL.
- Built responsive interfaces using Angular Material and ApexCharts.
- Automated scheduling tasks using Python.
- Won the prestigious **Best Poster Award at AMD Innovation EXPO 2023**!`;
      streamBotResponse(text, "awards", ["current-role", "projects", "education"]);
      return;
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
      const text = `You can view and save Ashwin's full resume at [/resume](/resume).

It includes full breakdowns of his 3+ years of enterprise experience, M.Tech degree from Manipal, technical publications, and integration accomplishments.`;
      streamBotResponse(text, "resume", ["current-role", "contact", "skills"]);
      return;
    }

    // Fallback response with helpful topic suggestions
    const fallback = `I searched Ashwin's profile for "${query}", but couldn't find an exact match.

Here are the key topics I can tell you all about:
1. **Current Role**: Senior Software Engineer & Platform Lead at CNZ Consultants
2. **Education**: M.Tech CSE from Manipal University (GPA 7.9) & B.E. from VTU
3. **Projects**: Multi-Domain Integration Platform, Java AST Analyzer, Sentiment Research
4. **Tech Stack**: Java 21, Spring Boot 3, TypeScript, React, Docker, Agentic AI
5. **Contact**: Email ashwinr619@live.com or LinkedIn`;

    streamBotResponse(fallback, undefined, ["current-role", "education", "projects", "contact"]);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
      activeStreamRef.current = null;
    }
    setMessages([
      {
        id: "cleared-" + Date.now(),
        sender: "bot",
        text: "Chat cleared! Ask me anything about Ashwin or choose a topic below.",
        followUps: ["current-role", "education", "projects", "skills"],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Interactive Assistant Drawer"
        className="relative w-full max-w-xl h-full bg-[#0d1017] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-white">
                  ashwin-assistant
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  online
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                Interactive Profile Q&A
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Topic Chips Strip */}
        <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-neutral-500 shrink-0">
            Topics:
          </span>
          {profileData.botTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic.id)}
              className="shrink-0 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 hover:bg-cyan-500/15 text-neutral-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all active:scale-95"
            >
              <span className="text-[10px] text-cyan-400/80 mr-1">{topic.keyNumber}:</span>
              {topic.label}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 mb-1 px-1">
                <span>{msg.sender === "user" ? "You" : "Ashwin Assistant"}</span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-cyan-600 text-white font-medium rounded-tr-sm"
                    : "bg-white/[0.05] border border-white/10 text-neutral-200 rounded-tl-sm shadow-md"
                }`}
              >
                {/* Render Rich Markdown content */}
                <FormattedMarkdown
                  content={msg.text}
                  isStreaming={msg.isStreaming}
                />

                {/* Message Utilities (Copy) for Bot */}
                {msg.sender === "bot" && !msg.isStreaming && msg.text && (
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <button
                      onClick={() => copyMessage(msg.id, msg.text)}
                      className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {msg.topicId === "contact" && (
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Email Ashwin <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Follow-up Suggestion Chips */}
              {msg.followUps && msg.followUps.length > 0 && !msg.isStreaming && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5 max-w-[85%]">
                  <span className="text-[10px] font-mono text-neutral-500 mr-1">
                    Next:
                  </span>
                  {msg.followUps.map((fId) => {
                    const followTopic = profileData.botTopics.find((t) => t.id === fId);
                    if (!followTopic) return null;
                    return (
                      <button
                        key={fId}
                        onClick={() => handleSelectTopic(fId)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{followTopic.label}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/15 px-3 py-2 focus-within:border-cyan-500/50 transition-colors"
          >
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question (e.g., 'Spring Boot experience', 'Education', 'Unisys')..."
              className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 transition-all shrink-0"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
            <span>Press Enter to send</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
