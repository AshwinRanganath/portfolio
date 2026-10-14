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
  MessageCircleQuestion,
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

You can ask me real questions about his background, such as:
- **"What programming languages do you code in?"**
- **"Tell me about your time at Unisys"**
- **"What did you do at AMD India?"**
- **"Where have you worked in the past?"**
- **"What are you building at CNZ Consultants?"**
- **"Where did you study?"**

Type any question below or click any suggestion to get started!`,
          followUps: [
            "programming-languages",
            "experience-unisys",
            "career-journey",
            "current-role",
          ],
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

    // Add user question with realistic phrasing
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: topic.realisticQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Stream bot response
    streamBotResponse(topic.answerMarkdown, topic.id, topic.followUps);
  };

  // Comprehensive NLP & Semantic query resolution for natural user questions
  const resolveUserQuery = (query: string) => {
    const q = query.toLowerCase().trim();

    // 1. Greetings
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q === "hey there" ||
      q.startsWith("hello") ||
      q.startsWith("hi ") ||
      q.includes("good morning") ||
      q.includes("good evening")
    ) {
      const greeting = `Hello! 👋 Great to connect with you.

I'm Ashwin's interactive assistant. You can ask me natural questions like:
- **"What programming languages do you know?"**
- **"Tell me about your time at Unisys"**
- **"What did you build at AMD India?"**
- **"What are you building at CNZ Consultants?"**
- **"Where did you study?"**

What would you like to explore first?`;
      streamBotResponse(greeting, "greeting", [
        "programming-languages",
        "experience-unisys",
        "career-journey",
        "current-role",
      ]);
      return;
    }

    // 2. Gratitude & compliment checks
    if (
      q.includes("thank") ||
      q.includes("thanks") ||
      q === "cool" ||
      q === "awesome" ||
      q === "great" ||
      q === "nice"
    ) {
      const gratitude = `You're very welcome! Let me know if there's anything else you'd like to discover about Ashwin's engineering background, past projects, or how to get in touch.`;
      streamBotResponse(gratitude, "gratitude", ["contact", "projects", "programming-languages"]);
      return;
    }

    // 3. Resume / CV requests
    if (
      q.includes("resume") ||
      q.includes("cv") ||
      q.includes("pdf") ||
      q.includes("download resume") ||
      q.includes("view resume")
    ) {
      const resumeAnswer = `You can view and save Ashwin's full resume at [/resume](/resume).

It includes full breakdowns of his 3+ years of experience across CNZ Consultants, Unisys, and AMD, plus his M.Tech from Manipal University and technical accomplishments.`;
      streamBotResponse(resumeAnswer, "resume", ["current-role", "contact", "programming-languages"]);
      return;
    }

    // 4. Match against sampleUserQueries in all botTopics
    let bestTopic: BotTopic | null = null;
    let highestScore = 0;

    for (const topic of profileData.botTopics) {
      let score = 0;

      // Check sample user queries
      for (const sample of topic.sampleUserQueries) {
        if (q === sample) score += 20;
        else if (q.includes(sample) || sample.includes(q)) score += 10;
      }

      // Check realistic question match
      if (q.includes(topic.realisticQuestion.toLowerCase())) score += 15;

      // Check tags
      for (const tag of topic.tags) {
        if (q.includes(tag.toLowerCase())) score += 4;
      }

      // Specific intent overrides
      if (topic.id === "experience-unisys" && q.includes("unisys")) score += 25;
      if (topic.id === "experience-amd" && (q.includes("amd") || q.includes("expo") || q.includes("poster"))) score += 25;
      if (topic.id === "experience-emmvee" && (q.includes("emmvee") || q.includes("solar") || q.includes("prism"))) score += 25;
      if (topic.id === "career-journey" && (q.includes("past work") || q.includes("past job") || q.includes("where have you worked") || q.includes("career history") || q.includes("previous companies") || q.includes("timeline"))) score += 25;
      if (topic.id === "programming-languages" && (q.includes("programming language") || q.includes("coding language") || q.includes("code in") || q.includes("what languages") || q.includes("java") || q.includes("python") || q.includes("typescript") || q.includes("c#") || q.includes("tech stack"))) score += 25;
      if (topic.id === "spoken-languages" && (q.includes("speak") || q.includes("spoken") || q.includes("english") || q.includes("kannada") || q.includes("hindi"))) score += 25;
      if (topic.id === "agentic-ai" && (q.includes("ai") || q.includes("agentic") || q.includes("agent") || q.includes("llm") || q.includes("openai"))) score += 25;
      if (topic.id === "current-role" && (q.includes("cnz") || q.includes("currently") || q.includes("current job") || q.includes("what do you do"))) score += 25;
      if (topic.id === "education" && (q.includes("education") || q.includes("manipal") || q.includes("vtu") || q.includes("gpa") || q.includes("degree") || q.includes("mtech") || q.includes("study") || q.includes("college") || q.includes("university"))) score += 25;
      if (topic.id === "strengths" && (q.includes("why should we hire") || q.includes("why hire") || q.includes("strength") || q.includes("unique") || q.includes("stand out"))) score += 25;
      if (topic.id === "contact" && (q.includes("email") || q.includes("contact") || q.includes("phone") || q.includes("linkedin") || q.includes("reach") || q.includes("hire you"))) score += 25;
      if (topic.id === "remote-work" && (q.includes("remote") || q.includes("location") || q.includes("timezone") || q.includes("where are you") || q.includes("bangalore") || q.includes("bengaluru") || q.includes("india"))) score += 25;
      if (topic.id === "enterprise-integrations" && (q.includes("shopify") || q.includes("xero") || q.includes("myob") || q.includes("wms") || q.includes("shiphero") || q.includes("cin7") || q.includes("sftp"))) score += 25;

      if (score > highestScore) {
        highestScore = score;
        bestTopic = topic;
      }
    }

    // If strong match found, stream it
    if (bestTopic && highestScore >= 8) {
      streamBotResponse(bestTopic.answerMarkdown, bestTopic.id, bestTopic.followUps);
      return;
    }

    // 5. Intelligent Fallback
    const fallbackAnswer = `I looked through Ashwin's profile for **"${query}"**.

Here are the key areas of his background:
- **Past Work Experience**: Software Engineer at **Unisys** (Java AST static analysis & OpenAI tools), Full Stack Intern at **AMD India** (Best Poster Award), and **EMMVEE**.
- **Current Position**: Senior Platform Lead at **CNZ Consultants** (Java 21, Spring Boot 3, Multi-domain integrations).
- **Programming Languages**: Java (17/21), TypeScript, JavaScript, Python 3, C#, SQL.
- **Education**: M.Tech in Computer Science from **Manipal University** (GPA 7.9).
- **Agentic AI**: Multi-agent orchestration, automated exception remediation, and LLM developer tooling.

You can click any of the suggested questions below to dive into details!`;

    streamBotResponse(fallbackAnswer, undefined, [
      "programming-languages",
      "experience-unisys",
      "career-journey",
      "education",
    ]);
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

    // Resolve and stream answer
    resolveUserQuery(query);
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
        text: `Chat cleared! Ask me anything about Ashwin's past experience (Unisys, AMD), languages, or current work.`,
        followUps: [
          "programming-languages",
          "experience-unisys",
          "career-journey",
          "education",
        ],
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
        className="relative w-full max-w-xl h-full theme-drawer shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-3.5 theme-titlebar">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0">
              <img
                src={profileData.avatarUrl}
                alt={profileData.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold theme-heading">
                  ashwin-assistant
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  online
                </span>
              </div>
              <p className="text-[11px] theme-muted font-sans">
                Ask about past experience, languages, or current roles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg theme-muted hover:theme-heading hover:bg-[var(--bg-subtle)] transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg theme-muted hover:theme-heading hover:bg-[var(--bg-subtle)] transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic Suggested Questions Strip */}
        <div className="px-4 py-2.5 theme-titlebar flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono theme-faint shrink-0 flex items-center gap-1">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Try:
          </span>
          {[
            { id: "programming-languages", text: "Languages you know" },
            { id: "experience-unisys", text: "Unisys experience" },
            { id: "experience-amd", text: "AMD role & award" },
            { id: "career-journey", text: "Past career journey" },
            { id: "current-role", text: "Current role at CNZ" },
            { id: "education", text: "Education & GPA" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectTopic(item.id)}
              className="shrink-0 px-2.5 py-1 rounded-md text-xs font-sans theme-subtle-box text-neutral-700 dark:text-neutral-300 hover:text-cyan-700 dark:hover:text-cyan-200 hover:border-cyan-500/30 transition-all active:scale-95 flex items-center gap-1"
            >
              <span>{item.text}</span>
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
              <div className="flex items-center gap-1.5 text-[10px] font-mono theme-faint mb-1 px-1">
                <span>{msg.sender === "user" ? "You" : "Ashwin Assistant"}</span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-cyan-600 text-white font-medium rounded-tr-sm"
                    : "theme-bubble-bot rounded-tl-sm shadow-sm"
                }`}
              >
                {/* Render Rich Markdown content */}
                <FormattedMarkdown
                  content={msg.text}
                  isStreaming={msg.isStreaming}
                />

                {/* Message Utilities (Copy) for Bot */}
                {msg.sender === "bot" && !msg.isStreaming && msg.text && (
                  <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono theme-muted">
                    <button
                      onClick={() => copyMessage(msg.id, msg.text)}
                      className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                          <span className="text-emerald-500 dark:text-emerald-400 font-medium">Copied</span>
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
                        className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        Email Ashwin <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Follow-up Suggestion Chips with Realistic Wording */}
              {msg.followUps && msg.followUps.length > 0 && !msg.isStreaming && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5 max-w-[85%]">
                  <span className="text-[10px] font-mono theme-faint mr-1">
                    Related questions:
                  </span>
                  {msg.followUps.map((fId) => {
                    const followTopic = profileData.botTopics.find((t) => t.id === fId);
                    if (!followTopic) return null;
                    return (
                      <button
                        key={fId}
                        onClick={() => handleSelectTopic(fId)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-sans bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 transition-all hover:scale-105 active:scale-95 text-left"
                      >
                        <span>{followTopic.realisticQuestion}</span>
                        <ChevronRight className="w-3 h-3 shrink-0" />
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
        <div className="p-4 theme-titlebar border-t">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 rounded-xl theme-subtle-box px-3 py-2.5 focus-within:border-cyan-500/50 transition-colors"
          >
            <Search className="w-4 h-4 theme-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything (e.g. 'Unisys experience', 'What languages do you code in?')..."
              className="flex-1 bg-transparent text-sm theme-heading placeholder:text-[var(--text-faint)] focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 transition-all shrink-0"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono theme-faint px-1">
            <span>Type any question & press Enter</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
