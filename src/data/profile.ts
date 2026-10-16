export interface Project {
  title: string;
  category: string;
  technologies: string[];
  description: string;
  impact: string;
  link?: string;
  repo?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  location?: string;
}

export interface BotTopic {
  id: string;
  realisticQuestion: string;
  shortLabel: string;
  icon: string;
  summary: string;
  answerMarkdown: string;
  followUps: string[];
  tags: string[];
  sampleUserQueries: string[];
}

export interface ProfileData {
  name: string;
  handle: string;
  avatarUrl: string;
  title: string;
  company: string;
  companyRole: string;
  location: string;
  status: string;
  statusDescription: string;
  timezone: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string;
  shortBio: string;
  languages: {
    programming: string[];
    spoken: { name: string; level: string }[];
  };
  stats: { label: string; value: string; hint: string }[];
  skills: {
    category: string;
    items: string[];
  }[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  awards: { title: string; organization: string; year: string; note: string }[];
  botTopics: BotTopic[];
}

export const profileData: ProfileData = {
  name: "Ashwin Ranganath",
  handle: "ashwinr",
  avatarUrl: "/ashwin.png",
  title: "Senior Software Engineer & Full-Stack Platform Lead",
  company: "CNZ Consultants",
  companyRole: "Senior Software Engineer (Java & Full-Stack Platform Lead)",
  location: "Bengaluru, India · Global Remote",
  status: "Available for select roles & high-impact projects",
  statusDescription: "Senior Software Engineer / Platform Architect",
  timezone: "Asia/Kolkata",
  email: "ashwinr619@live.com",
  linkedin: "https://www.linkedin.com/in/ashwinranganath1997",
  github: "https://github.com/AshwinRanganath",
  bio: "Product-minded Software Engineer with a Master of Technology in Computer Science Engineering and 3+ years of hands-on experience architecting scalable Java (Spring Boot) backend microservices, resilient multi-tenant enterprise pipelines, and modern TypeScript/React web systems. Active practitioner of agentic engineering, utilizing multi-agent AI systems for automated diagnostics and high developer velocity.",
  shortBio: "Architecting resilient Java microservices, modern TypeScript/React applications, and multi-agent AI workflows.",
  languages: {
    programming: [
      "Java (17 / 21)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Python 3.x",
      "C# (.NET)",
      "SQL (PostgreSQL)",
      "PHP",
      "HTML5 / CSS3",
    ],
    spoken: [
      { name: "English", level: "Full Professional Proficiency (cross-border delivery across NZ, APAC & US)" },
      { name: "Kannada", level: "Native / Bilingual" },
      { name: "Hindi", level: "Professional Working Proficiency" },
    ],
  },
  stats: [
    { label: "Experience", value: "3+ Yrs", hint: "Enterprise & Global Delivery" },
    { label: "Academics", value: "M.Tech CSE", hint: "Manipal University (GPA 7.9)" },
    { label: "Focus", value: "Backend & AI", hint: "Java 21 · Spring Boot · Agentic" },
    { label: "Delivery", value: "Global Remote", hint: "NZ, APAC & US cross-border" },
  ],
  skills: [
    {
      category: "Backend & Architecture",
      items: [
        "Java 17 / 21",
        "Spring Boot 3 (Spring 6)",
        "Microservices Architecture",
        "RESTful APIs",
        "Reactive Patterns",
        "OOP Refactoring",
        "Maven",
        "JUnit / TDD",
        "Python 3.x",
        "PostgreSQL / SQL",
      ],
    },
    {
      category: "Enterprise Integrations & Cloud",
      items: [
        "Accounting (Xero, MYOB)",
        "E-Commerce (Shopify)",
        "WMS & 3PL (ShipHero, ControlPort, GRL, Consignly)",
        "ERPs (Cin7 Core/Omni)",
        "SFTP / Automated File Syncs",
        "Docker & Containerization",
        "Linux",
        "Azure AD & Microsoft Graph",
        "CI/CD & Git",
      ],
    },
    {
      category: "Frontend & Web",
      items: [
        "TypeScript",
        "React (18 / 19)",
        "Next.js",
        "Tailwind CSS",
        "Vite",
        "Angular Material",
        "ApexCharts",
        "State Management",
        "Accessibility (a11y)",
        "REST Integrations",
      ],
    },
    {
      category: "AI & Agentic Engineering",
      items: [
        "Agentic Engineering",
        "Multi-Agent Orchestration",
        "Automated Error Diagnosis & Remediation",
        "OpenAI & Azure OpenAI APIs",
        "Prompt Engineering",
        "Java AST Code Parsing",
      ],
    },
  ],
  experiences: [
    {
      company: "CNZ Consultants",
      role: "Senior Software Engineer (Java & Full-Stack Platform Lead)",
      location: "Remote (New Zealand)",
      period: "Jan 2026 – Present",
      summary:
        "Leading the modular architecture overhaul, enterprise integration pipelines, multi-tenant auth layer, and agentic diagnostic workflows.",
      bullets: [
        "Refactored legacy monolithic integrations into a modular, layered Spring Boot architecture, decoupling reusable Core HTTP clients from client-specific business handlers.",
        "Architected multi-domain integration pipelines spanning Accounting (Xero, MYOB invoices & COGS ledgers), E-Commerce (Shopify catalogs & orders), WMS (ShipHero, ControlPort, GRL), and automated SFTP syncs (CartonCloud).",
        "Implemented dynamic multi-tenant credential resolution and extensible strategy-based authorization (OAuth2, API key headers, MD5 query signatures, Azure AD) supporting dozens of client organizations.",
        "Engineered live FX currency engines, catalog sync services, and full-stack telemetry dashboards (React / TypeScript) with 1-click bottleneck remediation drawers.",
        "Pioneered agentic engineering and multi-agent AI workflows within middleware pipelines to automate service diagnostics, payload telemetry inspections, and exception remediation.",
        "Designed resilient REST APIs with circuit breaking, exponential backoff, and PostgreSQL transactional stores with containerized Docker deployments.",
      ],
      technologies: ["Java 21", "Spring Boot", "TypeScript", "React", "PostgreSQL", "Docker", "OAuth2", "Xero", "Shopify"],
    },
    {
      company: "Unisys",
      role: "Associate Cloud Engineer / Software Engineer",
      location: "Bengaluru, India (Hybrid)",
      period: "Aug 2023 – Dec 2025",
      summary:
        "Engineered Java AST parsing engines, code static analysis tools, and LLM-assisted codebase modernization pipelines.",
      bullets: [
        "Engineered Java-based static analysis and AST parsing tools to inspect system complexity, module hierarchies, and dependency graphs across large enterprise software codebases.",
        "Integrated OpenAI and Azure OpenAI APIs to build intelligent developer tooling, applying agentic reasoning to explain code architecture and generate automated refactoring recommendations.",
        "Automated technical assessment workflows through tailored prompt engineering, accelerating codebase evaluations by over 40% while enhancing developer productivity.",
        "Applied clean object-oriented architecture and Test-Driven Development (TDD) using JUnit, building modular microservices-ready components across distributed engineering teams.",
      ],
      technologies: ["Java", "Spring", "AST Parsing", "OpenAI / Azure OpenAI", "JUnit", "TDD", "Static Analysis", "Git"],
    },
    {
      company: "AMD India Private Limited",
      role: "Full Stack Developer Intern",
      location: "Hyderabad, India (On-site)",
      period: "Aug 2022 – Jul 2023",
      summary:
        "Engineered full-stack business applications, high-performance REST APIs, and automated scheduling pipelines.",
      bullets: [
        "Engineered full-stack business applications and high-performance RESTful APIs from concept to production using C# Entity Framework, LINQ, and SQL databases.",
        "Built dynamic, responsive web interfaces using Angular Material, PrimeNG, and ApexCharts, focusing on high data density, smooth interactions, and real-time visualization.",
        "Automated task scheduling and operational data batching using Python scripts, reducing server latency and optimizing system compute efficiency.",
        "Honored with the Best Poster Award at the AMD Innovation EXPO 2023.",
      ],
      technologies: ["C#", ".NET Entity Framework", "SQL", "Angular Material", "Python", "ApexCharts"],
    },
  ],
  education: [
    {
      institution: "Manipal University",
      degree: "Master of Technology (M.Tech) in Computer Science Engineering",
      period: "Aug 2021 – Jul 2023",
      gpa: "7.9 / 10.0",
      location: "Manipal, India",
    },
    {
      institution: "Visvesvaraya Technological University (VTU)",
      degree: "Bachelor of Engineering (B.E.) in Information Science and Engineering",
      period: "Jul 2015 – May 2019",
      gpa: "6.2 / 10.0",
      location: "Karnataka, India",
    },
  ],
  projects: [
    {
      title: "Multi-Domain Integration & Telemetry Platform",
      category: "Enterprise Middleware & Full-Stack",
      technologies: ["Java 21", "Spring Boot", "TypeScript", "React", "PostgreSQL", "Docker", "OAuth2"],
      description:
        "Refactored and architected a multi-tenant enterprise middleware platform connecting ERPs (Cin7), Accounting (Xero/MYOB), E-Commerce (Shopify), and WMS/3PL systems via REST and SFTP pipelines.",
      impact:
        "Equipped with real-time payload telemetry, circuit breaking, dynamic credential resolution, and 1-click exception remediation drawers for warehouse and operations personnel.",
    },
    {
      title: "Automated Code Complexity & AST Dependency Analyzer",
      category: "Developer Tooling & Agentic AI",
      technologies: ["Java", "JavaParser / AST", "Azure OpenAI", "Prompt Engineering"],
      description:
        "Engineered an AST parsing engine mapping module hierarchies, computing code cyclomatic metrics, and integrating LLM reasoning agents to generate automated modernization and refactoring recommendations.",
      impact:
        "Accelerated codebase evaluations by over 40% across large legacy enterprise repositories.",
    },
    {
      title: "Echo Chamber Effects & Social Corpus Sentiment Analyzer",
      category: "NLP & Data Pipeline Research",
      technologies: ["Python", "NLP", "Pandas", "NetworkX", "Sentiment Analysis"],
      description:
        "Conducted academic research and built a data pipeline evaluating sentiment distribution and interaction clustering across large-scale social platform corpora.",
      impact:
        "Quantified echo-chamber clustering patterns and sentiment divergence across online communities.",
    },
  ],
  awards: [
    {
      title: "Best Poster Award",
      organization: "AMD India Private Limited (AMD Innovation EXPO 2023)",
      year: "2023",
      note: "Recognized for innovative full-stack visualization and internal business tool architecture.",
    },
  ],
  botTopics: [
    {
      id: "programming-languages",
      realisticQuestion: "What programming languages do you code in?",
      shortLabel: "Programming Languages",
      icon: "Code",
      summary: "Java 21/17, TypeScript, JavaScript, Python 3, C#, SQL, PHP",
      answerMarkdown: `Ashwin works across several programming languages across the stack:

1. **Java (17 / 21)**
   - *Primary Backend Language*: Advanced OOP, Spring Boot 3, modular microservices, REST APIs, reactive patterns, AST parsing, and multithreading.
2. **TypeScript & JavaScript (ES6+)**
   - *Modern Web & Full-Stack*: React (18/19), Next.js, component architecture, state management, and type-safe API consumption.
3. **Python (3.x)**
   - *Automation, Data Pipelines & AI*: Task scheduling, automated batching, NLP data pipelines, and LLM scripting.
4. **C# (.NET)**
   - *Enterprise Systems*: Entity Framework, LINQ, RESTful APIs, and database migrations built during his time at AMD.
5. **SQL (PostgreSQL / Relational)**
   - *Data Stores*: Transactional schema design, query optimization, indexing, and multi-tenant isolation.
6. **HTML5/CSS3 & Modern Web**
   - *Web Foundations*: Accessible, responsive component styling, design systems, and frontend ergonomics.`,
      followUps: ["spoken-languages", "backend-stack", "current-role"],
      tags: ["languages", "programming", "java", "typescript", "python", "c#", "sql", "coding", "tech", "code"],
      sampleUserQueries: [
        "what programming languages do you know",
        "what languages do you code in",
        "which coding languages do you use",
        "what languages are you comfortable with",
        "do you know java",
        "do you know python",
        "do you know typescript",
      ],
    },
    {
      id: "spoken-languages",
      realisticQuestion: "What languages do you speak and communicate in?",
      shortLabel: "Spoken Languages",
      icon: "Globe",
      summary: "English (Professional Fluent), Kannada (Native), Hindi (Professional)",
      answerMarkdown: `Ashwin is multilingual and experienced in communicating across distributed international teams:

- **English**: Full Professional Working Proficiency. Daily communication with cross-border engineering teams across New Zealand, APAC, and the US.
- **Kannada**: Native / Bilingual.
- **Hindi**: Professional Working Proficiency.

He has extensive experience conducting sprint reviews, technical architecture presentations, and asynchronous remote collaboration across different time zones.`,
      followUps: ["programming-languages", "remote-work", "current-role"],
      tags: ["spoken", "languages", "english", "kannada", "hindi", "communication", "speak", "talk"],
      sampleUserQueries: [
        "what languages do you speak",
        "what spoken languages do you know",
        "do you speak english",
        "can you communicate in english",
        "what are your languages",
      ],
    },
    {
      id: "experience-unisys",
      realisticQuestion: "Tell me about your work experience at Unisys.",
      shortLabel: "Experience at Unisys",
      icon: "Briefcase",
      summary: "Associate Cloud Engineer / Software Engineer (Aug 2023 – Dec 2025)",
      answerMarkdown: `At **Unisys** (Aug 2023 – Dec 2025) in Bengaluru, Ashwin served as an **Associate Cloud Engineer / Software Engineer**:

- **Java AST & Static Analysis**: Engineered Java-based static analysis and Abstract Syntax Tree (AST) parsing tools to inspect system complexity, module hierarchies, and dependency graphs across large enterprise software codebases.
- **Generative AI & LLM Tooling**: Integrated OpenAI and Azure OpenAI APIs to build intelligent developer tooling, applying agentic reasoning to explain code architecture and generate automated refactoring and modernization recommendations.
- **40% Velocity Boost**: Automated technical assessment workflows through tailored prompt engineering, accelerating codebase evaluations by **over 40%** while enhancing developer productivity.
- **Clean Architecture & TDD**: Applied clean object-oriented architecture and Test-Driven Development (TDD) using JUnit, building modular microservices-ready components across distributed teams.`,
      followUps: ["experience-amd", "current-role", "agentic-ai"],
      tags: ["unisys", "ast", "static analysis", "openai", "azure openai", "past work", "cloud engineer", "java"],
      sampleUserQueries: [
        "what did you do at unisys",
        "tell me about your time at unisys",
        "tell me about your work at unisys",
        "unisys experience",
        "what was your role at unisys",
        "how did you use ai at unisys",
      ],
    },
    {
      id: "experience-amd",
      realisticQuestion: "What did you do during your time at AMD India?",
      shortLabel: "Experience at AMD India",
      icon: "Award",
      summary: "Full Stack Developer Intern (Aug 2022 – Jul 2023) & Best Poster Award Winner",
      answerMarkdown: `At **AMD India Private Limited** (Aug 2022 – Jul 2023) in Hyderabad, Ashwin worked as a **Full Stack Developer Intern**:

- **Enterprise Web Apps & APIs**: Engineered full-stack business applications and high-performance RESTful APIs from concept to production using C# Entity Framework, LINQ, and SQL databases.
- **High-Density Data Visualizations**: Built dynamic, responsive web interfaces using Angular Material, PrimeNG, and ApexCharts, focusing on high data density, smooth interactions, and real-time visualization.
- **Operational Automation**: Automated task scheduling and operational data batching using Python scripts, reducing server latency and optimizing system compute efficiency.
- **🏆 Best Poster Award**: Honored with the **Best Poster Award at the AMD Innovation EXPO 2023** for innovative full-stack tool architecture and visualization.`,
      followUps: ["experience-unisys", "awards", "current-role"],
      tags: ["amd", "amd india", "c#", "angular", "apexcharts", "intern", "innovation expo", "award", "past work"],
      sampleUserQueries: [
        "what did you do at amd",
        "tell me about amd",
        "tell me about your time at amd",
        "amd internship",
        "amd experience",
        "best poster award",
      ],
    },
    {
      id: "career-journey",
      realisticQuestion: "Where have you worked in the past? Give me your career journey.",
      shortLabel: "Career Journey & History",
      icon: "TrendingUp",
      summary: "CNZ Consultants → Unisys → AMD India",
      answerMarkdown: `Here is Ashwin's career trajectory over the past 3+ years across enterprise systems and platform engineering:

1. **CNZ Consultants** (Jan 2026 – Present) | *Senior Software Engineer & Platform Lead*
   - Architected the **CNZ Integrations Platform**: leading the modular Spring Boot 3 & Java 21 architecture overhaul, multi-domain integration pipelines (Xero, MYOB, Shopify, ShipHero, Cin7), dynamic multi-tenant security, and agentic middleware diagnostics.
2. **Unisys** (Aug 2023 – Dec 2025) | *Associate Cloud Engineer / Software Engineer*
   - Built Java AST static analysis tools, integrated OpenAI/Azure OpenAI for automated code explanation and refactoring, accelerating codebase audits by **40%**.
3. **AMD India** (Aug 2022 – Jul 2023) | *Full Stack Developer Intern*
   - Built high-performance C# / .NET RESTful APIs, Angular Material + ApexCharts visualization dashboards, and won the **Best Poster Award at AMD Innovation EXPO 2023**.`,
      followUps: ["current-role", "experience-unisys", "education"],
      tags: ["career", "past work", "history", "experience", "journey", "companies", "timeline", "jobs"],
      sampleUserQueries: [
        "where have you worked in the past",
        "tell me about your past work experience",
        "what is your career history",
        "what companies have you worked for",
        "tell me about your background",
        "past work experience",
      ],
    },
    {
      id: "current-role",
      realisticQuestion: "What are you currently working on at CNZ Consultants?",
      shortLabel: "Current Focus at CNZ",
      icon: "Briefcase",
      summary: "Senior Software Engineer & Full-Stack Platform Lead @ CNZ Consultants (Remote, NZ)",
      answerMarkdown: `Ashwin is currently a **Senior Software Engineer & Full-Stack Platform Lead** at **CNZ Consultants** (Remote, NZ):

- **Modular Spring Boot 3 Architecture**: Leading the overhaul of legacy monolithic integration files into decoupled, layered services separating Core HTTP clients from client-specific business handlers.
- **Multi-Domain Pipelines**: Connecting Accounting (Xero, MYOB invoices & COGS), E-Commerce (Shopify catalogs & orders), and WMS/3PL systems (ShipHero, ControlPort, GRL) via REST and automated SFTP syncs.
- **Multi-Tenant Security**: Designed extensible authorization supporting OAuth2, API key headers, MD5 query signatures, and Azure AD across dozens of organizations.
- **Agentic Engineering**: Pioneering multi-agent AI workflows in middleware to automate service diagnostics, payload telemetry inspections, and exception remediation.
- **Operations Telemetry**: Built React & TypeScript dashboards featuring 1-click bottleneck remediation drawers for warehouse and operations personnel.`,
      followUps: ["programming-languages", "backend-stack", "projects"],
      tags: ["current", "role", "cnz", "work", "job", "spring boot", "java", "lead"],
      sampleUserQueries: [
        "what are you currently working on",
        "what is your current role",
        "what do you do now",
        "tell me about your current work",
        "cnz consultants",
      ],
    },
    {
      id: "backend-stack",
      realisticQuestion: "What is your backend engineering & microservices experience?",
      shortLabel: "Backend & Microservices",
      icon: "Server",
      summary: "Java 21, Spring Boot 3, RESTful APIs, OOP, JUnit/TDD, PostgreSQL, Docker",
      answerMarkdown: `Ashwin specializes in high-throughput, mission-critical backend systems:

- **Java (17 / 21) & Spring Boot 3 (Spring 6)**: Modular microservices, dependency injection, reactive patterns, and resilient RESTful API design.
- **Resilience & Reliability**: Circuit breaking, exponential backoff, retry mechanisms, and rate limiting for high-volume third-party API consumers.
- **Database Architecture**: PostgreSQL, relational schema design, transactional integrity, multi-tenant data isolation, and indexing.
- **Testing & Quality**: Test-Driven Development (TDD) using JUnit 5 and Mockito, ensuring regression-free deployments.
- **Containerization**: Docker containerization and CI/CD automation for zero-downtime releases.`,
      followUps: ["enterprise-integrations", "programming-languages", "projects"],
      tags: ["backend", "java", "spring boot", "microservices", "api", "rest", "postgresql", "docker", "server"],
      sampleUserQueries: [
        "what is your backend experience",
        "tell me about your spring boot experience",
        "how do you build microservices",
        "what is your backend stack",
        "do you know java backend",
      ],
    },
    {
      id: "agentic-ai",
      realisticQuestion: "What is your experience with Agentic AI and LLM tools?",
      shortLabel: "Agentic AI & LLMs",
      icon: "Cpu",
      summary: "Multi-Agent Orchestration, Automated Diagnostics, OpenAI & Azure OpenAI APIs",
      answerMarkdown: `Ashwin is an active practitioner of **Agentic Engineering**:

- **Middleware Diagnostics & Remediation**: Built multi-agent AI workflows inside integration pipelines that inspect payload telemetry, automatically diagnose failed transactions, and suggest or execute 1-click remedies.
- **Codebase Modernization Tooling**: At Unisys, integrated OpenAI and Azure OpenAI APIs with Java AST parsers, using agentic reasoning to explain legacy architectures and generate automated refactoring suggestions (cutting evaluation times by **40%**).
- **Prompt Engineering & Tool Orchestration**: Proficient with model function calling, structured outputs, multi-agent collaboration, and developer velocity workflows.`,
      followUps: ["experience-unisys", "projects", "current-role"],
      tags: ["ai", "agentic", "agents", "llm", "openai", "azure openai", "prompt engineering", "ast", "automation"],
      sampleUserQueries: [
        "what is your experience with ai",
        "what is agentic engineering",
        "how do you use llms",
        "do you know openai",
        "tell me about your ai projects",
      ],
    },
    {
      id: "enterprise-integrations",
      realisticQuestion: "What enterprise tools and platforms have you integrated?",
      shortLabel: "Enterprise Integrations",
      icon: "Layers",
      summary: "Shopify, Xero, MYOB, ShipHero, ControlPort, Cin7 Core/Omni, SFTP, EDI",
      answerMarkdown: `Ashwin has architected enterprise integration pipelines across multiple critical business domains:

- **Accounting & ERP**: Xero, MYOB (invoices, COGS ledgers, purchase orders), Cin7 Core & Cin7 Omni.
- **E-Commerce Platforms**: Shopify catalog synchronization, multi-currency live FX engines, and automated order processing.
- **WMS & 3PL (Warehousing)**: ShipHero, ControlPort, GRL, Consignly, and automated SFTP/CSV syncs (CartonCloud).
- **Security & Authorization**: Strategy-based multi-tenant authorization supporting OAuth2, API Key headers, MD5 query signatures, and Azure AD / Microsoft Graph.`,
      followUps: ["current-role", "backend-stack", "projects"],
      tags: ["integrations", "enterprise", "xero", "myob", "shopify", "shiphero", "wms", "erp", "cin7", "sftp"],
      sampleUserQueries: [
        "what enterprise tools have you integrated",
        "have you worked with shopify",
        "have you worked with xero",
        "tell me about your integration experience",
        "wms 3pl erp integrations",
      ],
    },
    {
      id: "education",
      realisticQuestion: "Where was your education and what degrees do you hold?",
      shortLabel: "Education & Academics",
      icon: "GraduationCap",
      summary: "M.Tech CSE from Manipal University (GPA 7.9) & B.E. ISE from VTU",
      answerMarkdown: `Ashwin holds advanced formal degrees in Computer Science:

1. **Master of Technology (M.Tech) in Computer Science Engineering**
   - **Manipal University** (Aug 2021 – Jul 2023) | **GPA: 7.9 / 10.0**
   - Specialized in distributed systems, scalable data engineering, and software architecture.

2. **Bachelor of Engineering (B.E.) in Information Science and Engineering**
   - **Visvesvaraya Technological University (VTU)** (Jul 2015 – May 2019)
   - Core foundations in data structures, algorithms, operating systems, and computer networks.

**Academic & Industry Recognition**:
- **Best Poster Award** at AMD Innovation EXPO 2023.`,
      followUps: ["career-journey", "awards", "current-role"],
      tags: ["education", "degree", "mtech", "manipal", "vtu", "university", "college", "gpa", "academics"],
      sampleUserQueries: [
        "where was your education",
        "where did you study",
        "what degrees do you have",
        "tell me about your master degree",
        "what is your gpa",
        "manipal university",
      ],
    },
    {
      id: "projects",
      realisticQuestion: "What major platforms and projects have you built?",
      shortLabel: "Featured Projects",
      icon: "Rocket",
      summary: "Enterprise Middleware & Telemetry, Java AST Analyzer, Sentiment Corpus Research",
      answerMarkdown: `Here are three standout engineering platforms Ashwin has built:

1. **Multi-Domain Integration & Telemetry Platform**
   - *Tech: Java 21, Spring Boot 3, TypeScript, React, PostgreSQL, Docker*
   - Multi-tenant enterprise middleware connecting ERPs, Accounting (Xero/MYOB), E-Commerce (Shopify), and WMS/3PL systems with live telemetry and 1-click remediation drawers.

2. **Automated Code Complexity & AST Dependency Analyzer**
   - *Tech: Java, AST Parsing, Azure OpenAI, Prompt Engineering*
   - Computes code metrics, maps module dependencies, and leverages LLM agents to deliver automated modernization insights—slashing audit time by **40%**.

3. **Echo Chamber & Social Corpus Sentiment Analyzer**
   - *Tech: Python, Pandas, NetworkX, NLP*
   - Data pipeline analyzing sentiment polarization and interaction clustering across large social platform corpora.`,
      followUps: ["programming-languages", "backend-stack", "contact"],
      tags: ["projects", "portfolio", "built", "telemetry", "ast", "code"],
      sampleUserQueries: [
        "what projects have you worked on",
        "what have you built",
        "show me your projects",
        "tell me about your major projects",
        "featured projects",
      ],
    },
    {
      id: "awards",
      realisticQuestion: "What awards and notable milestones have you achieved?",
      shortLabel: "Awards & Milestones",
      icon: "Award",
      summary: "AMD Innovation EXPO Best Poster Award & 40% speedup on enterprise code audits",
      answerMarkdown: `Notable achievements and recognitions:

- **🏆 Best Poster Award (AMD Innovation EXPO 2023)**: Awarded at AMD India for outstanding architectural design and visualization of full-stack business applications.
- **⚡ 40% Velocity Boost at Unisys**: Built Java AST parsers and OpenAI-driven modernization tooling that cut codebase evaluation times by over 40%.
- **🚀 Zero-Downtime Multi-Domain Pipelines**: Successfully refactored and deployed mission-critical middleware syncing hundreds of thousands of retail transactions across NZ, Australia, and US operations.`,
      followUps: ["experience-amd", "current-role", "contact"],
      tags: ["awards", "achievements", "amd", "unisys", "milestones", "recognition"],
      sampleUserQueries: [
        "what awards have you won",
        "tell me about your awards",
        "what are your biggest achievements",
        "amd innovation expo award",
      ],
    },
    {
      id: "strengths",
      realisticQuestion: "Why should we hire you? What are your key strengths?",
      shortLabel: "Why Hire Ashwin?",
      icon: "Sparkles",
      summary: "Platform mindset, deep Java/Spring expertise, agentic engineering, global delivery",
      answerMarkdown: `Here is what sets Ashwin apart:

1. **Platform Thinking & Modular Architecture**: Proven ability to take messy, monolithic integration scripts and refactor them into clean, layered, testable microservices.
2. **Deep Enterprise Domain Knowledge**: Hands-on mastery of real-world retail, WMS, ERP, and accounting pipelines (Shopify, Xero, MYOB, ShipHero, Cin7).
3. **Agentic Velocity**: Active practitioner who uses multi-agent systems and AI tooling to automate diagnostics and accelerate developer throughput.
4. **Reliability & TDD**: Writes resilient systems with circuit breakers, retry backoffs, and comprehensive JUnit/TDD test coverage.
5. **Global Remote Adaptability**: Experience delivering across New Zealand, APAC, and US time zones with seamless asynchronous communication.`,
      followUps: ["current-role", "programming-languages", "contact"],
      tags: ["why hire", "strengths", "value", "hire", "skills", "standout", "unique"],
      sampleUserQueries: [
        "why should we hire you",
        "what are your strengths",
        "what makes you unique",
        "what value do you bring",
        "why ashwin",
      ],
    },
    {
      id: "remote-work",
      realisticQuestion: "Can you work remotely and what is your time zone availability?",
      shortLabel: "Remote & Time Zone",
      icon: "MapPin",
      summary: "Based in Bengaluru (IST / UTC+05:30) · Global Remote Delivery (NZ, APAC, US)",
      answerMarkdown: `Ashwin is based in **Bengaluru, India** (IST / UTC+05:30) and is a seasoned global remote engineer:

- **Proven Cross-Border Delivery**: Currently delivering as Senior Platform Lead for New Zealand-based clients (CNZ Consultants) with significant time zone overlaps.
- **Flexible Overlap**: Comfortable aligning with APAC, European, and US working hours for sprint ceremonies and cross-functional meetings.
- **Asynchronous Communication**: Excels at detailed PR documentation, architectural decision records (ADRs), and autonomous problem solving.`,
      followUps: ["current-role", "strengths", "contact"],
      tags: ["remote", "location", "timezone", "india", "bengaluru", "new zealand", "work from home", "availability"],
      sampleUserQueries: [
        "can you work remotely",
        "where are you located",
        "what is your timezone",
        "are you open to remote work",
        "can you work with us or europe time zones",
      ],
    },
    {
      id: "contact",
      realisticQuestion: "How can I contact or hire Ashwin?",
      shortLabel: "Contact & Connect",
      icon: "Mail",
      summary: "Email: ashwinr619@live.com · LinkedIn · GitHub",
      answerMarkdown: `Ashwin is open to conversations regarding high-impact software engineering roles, platform lead opportunities, and technical consulting.

Direct channels:
- **Email**: [ashwinr619@live.com](mailto:ashwinr619@live.com)
- **LinkedIn**: [linkedin.com/in/ashwinranganath1997](https://www.linkedin.com/in/ashwinranganath1997)
- **GitHub**: [github.com/AshwinRanganath](https://github.com/AshwinRanganath)
- **Resume**: Available to view and print at [/resume](/resume).`,
      followUps: ["current-role", "projects", "strengths"],
      tags: ["contact", "email", "hire", "reach", "socials", "linkedin", "github", "phone", "talk"],
      sampleUserQueries: [
        "how can i contact you",
        "what is your email",
        "how do i hire you",
        "can i get your linkedin",
        "contact details",
        "get in touch",
      ],
    },
  ],
};
