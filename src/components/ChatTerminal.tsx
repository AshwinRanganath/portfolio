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
  Search,
  ExternalLink,
  MessageCircleQuestion,
  Bot,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  MapPin,
} from "lucide-react";
import { BotLogo } from "@/components/BotLogo";
import { profileData, BotTopic, Experience } from "@/data/profile";
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

interface ChatTerminalProps {
  initialTopicId?: string | null;
  onReturnToProfile: () => void;
  isActive: boolean;
  resetTrigger?: number;
  isDualPane?: boolean;
}

export function ChatTerminal({
  initialTopicId,
  onReturnToProfile,
  isActive,
  resetTrigger,
  isDualPane = false,
}: ChatTerminalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMsgIdRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeStreamRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll experience detail view to top whenever opened
  useEffect(() => {
    if (selectedExperience && detailContainerRef.current) {
      detailContainerRef.current.scrollTop = 0;
    }
  }, [selectedExperience]);

  // Handle external reset trigger (e.g. from window traffic light red button)
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      clearChat();
    }
  }, [resetTrigger]);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: `Hi there! 👋 I am **AsP**, Ashwin's interactive portfolio assistant.

I can walk you through his 3+ years architecting scalable Java microservices, distributed enterprise integration pipelines at CNZ, static analysis at Unisys, and telemetry profilers at AMD.

Pick a quick question below or ask anything to get started!`,
          followUps: [
            "programming-languages",
            "experience-unisys",
            "current-role",
            "experience-amd",
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [messages.length]);

  // Handle initialTopicId trigger
  useEffect(() => {
    if (isActive && initialTopicId) {
      handleSelectTopic(initialTopicId);
    }
  }, [isActive, initialTopicId]);

  // Smart scrolling on messages update
  useEffect(() => {
    if (!isActive || selectedExperience) return;

    if (messages.length <= 1) {
      // Welcome message only: ensure viewport is at the top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      return;
    }

    if (lastUserMsgIdRef.current) {
      const userEl = document.getElementById(lastUserMsgIdRef.current);
      if (userEl && scrollContainerRef.current) {
        // Scroll so user's message is positioned cleanly near the top of the chat area
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const userRect = userEl.getBoundingClientRect();
        const offset = userRect.top - containerRect.top + scrollContainerRef.current.scrollTop - 16;
        scrollContainerRef.current.scrollTo({
          top: Math.max(0, offset),
          behavior: "smooth",
        });
        lastUserMsgIdRef.current = null;
      }
    }
  }, [messages.length, isActive, selectedExperience]);

  // Focus input when opened
  useEffect(() => {
    if (isActive && !selectedExperience) {
      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [isActive, selectedExperience]);

  // Escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        if (selectedExperience) {
          setSelectedExperience(null);
        } else {
          onReturnToProfile();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, selectedExperience, onReturnToProfile]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (activeStreamRef.current) {
        clearInterval(activeStreamRef.current);
      }
    };
  }, []);

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
    const chunkSize = 4; // characters per tick for smooth streaming

    activeStreamRef.current = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= fullText.length) {
        if (activeStreamRef.current) clearInterval(activeStreamRef.current);
        activeStreamRef.current = null;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: fullText, isStreaming: false }
              : msg
          )
        );
      } else {
        const partial = fullText.slice(0, currentIndex);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: partial } : msg
          )
        );
      }

      // Smoothly follow down only if user is already reading near the bottom
      if (scrollContainerRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = scrollContainerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 120) {
          scrollContainerRef.current.scrollTop = scrollHeight;
        }
      }
    }, 12);
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedExperience(null);
    const topic = profileData.botTopics.find((t) => t.id === topicId);
    if (!topic) return;

    // Add user question with realistic phrasing
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: topic.realisticQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    lastUserMsgIdRef.current = userMsg.id;
    setMessages((prev) => [...prev, userMsg]);

    // Stream bot response
    streamBotResponse(topic.answerMarkdown, topic.id, topic.followUps);
  };

  // Helper to resolve related experiences for action cards
  const getRelatedExperiences = (topicId?: string, text?: string): Experience[] => {
    if (!topicId && !text) return [];
    const matches: Experience[] = [];

    if (topicId === "current-role" || topicId === "exp-cnz") {
      const cnz = profileData.experiences.find((e) => e.company.includes("CNZ"));
      if (cnz) matches.push(cnz);
    } else if (topicId === "experience-unisys") {
      const unisys = profileData.experiences.find((e) => e.company.includes("Unisys"));
      if (unisys) matches.push(unisys);
    } else if (topicId === "experience-amd") {
      const amd = profileData.experiences.find((e) => e.company.includes("AMD"));
      if (amd) matches.push(amd);
    } else if (topicId === "career-journey" || topicId === "exp-overview") {
      return profileData.experiences;
    } else if (text) {
      const t = text.toLowerCase();
      for (const exp of profileData.experiences) {
        const compLower = exp.company.toLowerCase();
        if (
          (compLower.includes("cnz") && t.includes("cnz")) ||
          (compLower.includes("unisys") && t.includes("unisys")) ||
          (compLower.includes("amd") && t.includes("amd"))
        ) {
          if (!matches.some((m) => m.company === exp.company)) {
            matches.push(exp);
          }
        }
      }
    }
    return matches;
  };

  // Curated prompts tailored for each experience
  const getExperiencePrompts = (company: string): string[] => {
    if (company.includes("CNZ")) {
      return [
        "How did you design the dynamic multi-tenant auth architecture?",
        "Tell me about the accounting & e-commerce integration pipelines",
        "How do the agentic middleware diagnostic workflows work?",
      ];
    }
    if (company.includes("Unisys")) {
      return [
        "How did the Java AST code parsing engine work?",
        "How did you integrate OpenAI and Azure OpenAI APIs for refactoring?",
        "How did you accelerate enterprise codebase evaluations by 40%?",
      ];
    }
    if (company.includes("AMD")) {
      return [
        "Tell me about the REST APIs and Angular dashboard at AMD",
        "What did you win the AMD Innovation EXPO Best Poster Award for?",
        "How did Python automation scripts reduce server latency?",
      ];
    }
    return [];
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

I'm **AsP**, Ashwin's interactive assistant. You can ask me natural questions like:
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

    // 1b. AsP Identity queries
    if (
      q === "who are you" ||
      q === "who are you?" ||
      q === "what is your name" ||
      q === "what is your name?" ||
      q === "what are you" ||
      q.includes("who is asp") ||
      q.includes("what is asp")
    ) {
      const aspBio = `I am **AsP** — Ashwin's automated portfolio assistant! 🤖

I'm programmed to answer questions about his 3+ years of software engineering experience, including:
- **Current Position**: Senior Platform Lead at **CNZ Consultants** (Java 21, Spring Boot 3, Multi-domain enterprise integrations).
- **Past Work**: Software Engineer at **Unisys** (Java AST analysis & developer tooling), Intern at **AMD India** (Best Technical Poster Award).
- **Tech Stack**: Java (17/21), TypeScript, React, Python 3, C# (.NET), PostgreSQL / SQL.
- **Academics**: M.Tech in Computer Science Engineering from **Manipal University** (GPA 7.9).

Feel free to ask me anything about his technical background or projects!`;
      streamBotResponse(aspBio, "asp-identity", [
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

    // 3b. Role specific direct prompts
    if (q.includes("tenant") || q.includes("auth strategy") || q.includes("multi-tenant")) {
      const cnzTopic = profileData.botTopics.find((t) => t.id === "current-role" || t.id === "enterprise-integrations");
      if (cnzTopic) {
        streamBotResponse(cnzTopic.answerMarkdown, cnzTopic.id, cnzTopic.followUps);
        return;
      }
    }

    if (q.includes("ast") || q.includes("static analysis") || q.includes("code parser")) {
      const unisysTopic = profileData.botTopics.find((t) => t.id === "experience-unisys");
      if (unisysTopic) {
        streamBotResponse(unisysTopic.answerMarkdown, unisysTopic.id, unisysTopic.followUps);
        return;
      }
    }

    if (q.includes("best poster") || q.includes("innovation expo") || q.includes("poster award")) {
      const amdTopic = profileData.botTopics.find((t) => t.id === "experience-amd" || t.id === "awards");
      if (amdTopic) {
        streamBotResponse(amdTopic.answerMarkdown, amdTopic.id, amdTopic.followUps);
        return;
      }
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
- **Past Work Experience**: Software Engineer at **Unisys** (Java AST static analysis & OpenAI tools), Full Stack Intern at **AMD India** (Best Poster Award).
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

    lastUserMsgIdRef.current = userMsg.id;
    setMessages((prev) => [...prev, userMsg]);

    // Resolve and stream answer
    resolveUserQuery(query);
  };

  // Follow-up prompt directly from experience detail view
  const handleSendPrompt = (promptText: string) => {
    setSelectedExperience(null);
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    lastUserMsgIdRef.current = userMsg.id;
    setMessages((prev) => [...prev, userMsg]);
    resolveUserQuery(promptText);
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
    setSelectedExperience(null);
    setMessages([
      {
        id: "cleared-" + Date.now(),
        sender: "bot",
        text: `Chat cleared! Ask me anything about Ashwin's past experience (Unisys, AMD), languages, or current work.`,
        followUps: [
          "programming-languages",
          "experience-unisys",
          "career-journey",
          "current-role",
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[var(--bg-card)]">
      {/* Conditional View: Experience Detail Sub-View VS Chat Stream */}
      {selectedExperience ? (
        /* Experience Detail View */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Detail Sub-Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-titlebar)]">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <button
                onClick={() => setSelectedExperience(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg theme-subtle-box text-[var(--theme-accent-fg)] border border-[var(--border-accent)] font-mono text-xs transition-all active:scale-95 shrink-0 cursor-pointer"
                title="Back to conversation"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="font-medium">Back to Chat</span>
              </button>
              <span className="theme-faint text-xs shrink-0">/</span>
              <span className="text-xs font-mono font-semibold theme-heading truncate">
                {selectedExperience.company}
              </span>
            </div>

            <button
              onClick={() => setSelectedExperience(null)}
              className="p-1.5 rounded-lg theme-muted hover:theme-heading hover:bg-[var(--bg-subtle)] transition-colors shrink-0 cursor-pointer"
              title="Close Detail View"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Detail Scrollable Body */}
          <div ref={detailContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header Hero Card */}
              <div className="p-4 sm:p-5 rounded-2xl theme-subtle-box border border-[var(--border-accent)] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl accent-subtle-bg text-[var(--theme-accent-fg)] border border-[var(--border-accent)] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold theme-heading font-sans">
                        {selectedExperience.company}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium accent-text">
                        {selectedExperience.role}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                    Verified Role
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono theme-muted pt-2 border-t border-[var(--border-subtle)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 theme-faint" />
                    {selectedExperience.period}
                  </span>
                  <span className="theme-faint hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 theme-faint" />
                    {selectedExperience.location}
                  </span>
                </div>

                {/* Summary Box */}
                <div className="p-3.5 rounded-xl accent-subtle-bg border border-[var(--border-accent)] text-xs sm:text-sm leading-relaxed theme-body">
                  <span className="font-semibold accent-text font-mono">
                    Role Overview:{" "}
                  </span>
                  {selectedExperience.summary}
                </div>
              </div>

              {/* Core Architectural & Technical Contributions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider accent-text font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>Core Architectural Impact & Responsibilities</span>
                </div>
                <div className="space-y-2.5">
                  {selectedExperience.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl theme-subtle-box border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors text-xs sm:text-sm leading-relaxed theme-body"
                    >
                      <span className="shrink-0 w-5 h-5 rounded-md accent-subtle-bg border border-[var(--border-accent)] text-[var(--theme-accent-fg)] font-mono text-xs flex items-center justify-center font-bold mt-0.5 select-none">
                        {idx + 1}
                      </span>
                      <span className="flex-1">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider accent-text font-bold">
                  Technologies & Infrastructure
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono theme-subtle-box theme-heading border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:text-[var(--theme-accent-fg)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 1-Click Interactive Follow-up Prompts */}
              {getExperiencePrompts(selectedExperience.company).length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl theme-subtle-box border border-[var(--border-accent)] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold accent-text">
                    <MessageCircleQuestion className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Ask AsP about this role:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {getExperiencePrompts(selectedExperience.company).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendPrompt(prompt)}
                        className="w-full flex items-center justify-between p-3 rounded-xl theme-subtle-box border border-[var(--border-subtle)] hover:border-[var(--border-accent)] text-xs sm:text-sm font-sans theme-heading hover:text-[var(--theme-accent-fg)] transition-all text-left active:scale-[0.99] group cursor-pointer"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Return Button */}
              <div className="pt-2 pb-4">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl accent-btn font-semibold text-xs sm:text-sm active:scale-98 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Conversation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Conversation View */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Suggested Questions Strip */}
          <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--bg-titlebar)] overflow-x-auto scrollbar-none">
            <div className="max-w-3xl mx-auto w-full flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono theme-faint shrink-0 flex items-center gap-1">
                <MessageCircleQuestion className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
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
                  className="shrink-0 px-2.5 py-1 rounded-md text-xs font-sans theme-subtle-box theme-heading hover:text-[var(--theme-accent-fg)] hover:border-[var(--border-accent)] transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6"
          >
            <div className="max-w-3xl mx-auto w-full space-y-4">
              {messages.map((msg) => {
                const isWelcome = msg.id === "welcome-1" || msg.id.startsWith("cleared-");
                const relatedExps =
                  msg.sender === "bot" && !msg.isStreaming && !isWelcome
                    ? getRelatedExperiences(msg.topicId, msg.text)
                    : [];

                return (
                  <div
                    key={msg.id}
                    id={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono theme-faint mb-1 px-1">
                      {msg.sender === "bot" && (
                        <Bot className="w-3 h-3 text-[var(--theme-accent)] shrink-0" />
                      )}
                      <span>{msg.sender === "user" ? "You" : "AsP"}</span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "accent-btn font-medium rounded-tr-sm shadow-md max-w-[85%] sm:max-w-[75%]"
                          : "theme-bubble-bot rounded-tl-sm shadow-sm w-full max-w-[95%] sm:max-w-[92%]"
                      }`}
                    >
                      {/* Render content: plain text for user, rich markdown for bot */}
                      {msg.sender === "user" ? (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <FormattedMarkdown
                          content={msg.text}
                          isStreaming={msg.isStreaming}
                        />
                      )}

                      {/* Prominent Action Cards for Work Experience */}
                      {relatedExps.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)] space-y-2">
                          {relatedExps.length === 1 ? (
                            <div className="p-3 rounded-xl theme-subtle-box border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg accent-subtle-bg border border-[var(--border-accent)] flex items-center justify-center shrink-0 text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)]">
                                  <Briefcase className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-xs theme-heading flex items-center gap-1.5">
                                    <span className="truncate">{relatedExps[0].company}</span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded theme-subtle-box text-[var(--theme-accent-text)] dark:text-[var(--theme-accent-text-dark)] border border-[var(--border-subtle)] shrink-0">
                                      {relatedExps[0].period}
                                    </span>
                                  </div>
                                  <div className="text-[11px] theme-muted font-sans truncate">
                                    {relatedExps[0].role}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedExperience(relatedExps[0])}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg accent-btn text-xs font-semibold shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
                              >
                                <span>View Full Role Details</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-[11px] font-mono theme-heading font-semibold flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
                                <span>Detailed role breakdown & architecture:</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {relatedExps.map((exp) => (
                                  <button
                                    key={exp.company}
                                    onClick={() => setSelectedExperience(exp)}
                                    className="flex items-center justify-between p-2.5 rounded-xl theme-subtle-box border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all text-left group active:scale-98 cursor-pointer"
                                  >
                                    <div className="min-w-0 pr-2">
                                      <div className="font-semibold text-xs theme-heading truncate group-hover:text-[var(--theme-accent-fg)]">
                                        {exp.company}
                                      </div>
                                      <div className="text-[10px] font-mono theme-muted truncate">
                                        {exp.period}
                                      </div>
                                    </div>
                                    <div className="shrink-0 w-6 h-6 rounded-md accent-subtle-bg flex items-center justify-center text-[var(--theme-accent-fg)] group-hover:accent-btn transition-colors">
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message Utilities (Copy) for Bot */}
                      {msg.sender === "bot" && !msg.isStreaming && msg.text && (
                        <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono theme-muted">
                          <button
                            onClick={() => copyMessage(msg.id, msg.text)}
                            className="flex items-center gap-1 hover:text-[var(--theme-accent-fg)] transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                <span className="text-emerald-500 dark:text-emerald-400 font-medium">
                                  Copied
                                </span>
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
                              className="accent-text hover:underline flex items-center gap-1 font-medium"
                            >
                              Email Ashwin <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Follow-up Suggestion Chips with Realistic Wording */}
                    {msg.followUps && msg.followUps.length > 0 && !msg.isStreaming && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2.5 max-w-[95%]">
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
                              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-sans theme-subtle-box theme-body border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:text-[var(--theme-accent-fg)] transition-all hover:scale-105 active:scale-95 text-left cursor-pointer"
                            >
                              <span>{followTopic.realisticQuestion}</span>
                              <ChevronRight className="w-3 h-3 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Terminal Input Bar */}
          <div className="p-3 sm:p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-titlebar)]">
            <form
              onSubmit={handleSendMessage}
              className="max-w-3xl mx-auto flex items-center gap-2 rounded-xl theme-subtle-box px-3.5 py-2.5 focus-within:border-[var(--border-accent)] transition-colors"
            >
              <Search className="w-4 h-4 theme-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AsP anything (e.g. 'Unisys experience', 'What languages do you code in?')..."
                className="flex-1 bg-transparent text-sm theme-heading placeholder:text-[var(--text-faint)] focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-1.5 rounded-lg accent-btn font-semibold disabled:opacity-30 transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
                title="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="max-w-3xl mx-auto mt-2 flex items-center justify-between text-[11px] font-mono theme-faint px-1">
              <span>Type any question & press Enter</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="hover:theme-heading hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Chat</span>
                </button>
                {!isDualPane && (
                  <>
                    <span>·</span>
                    <span>Esc to return to Profile</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
