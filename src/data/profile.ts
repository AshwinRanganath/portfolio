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
  keyNumber: number;
  label: string;
  icon: string;
  question: string;
  summary: string;
  answerMarkdown: string;
  followUps: string[];
  tags: string[];
}

export interface ProfileData {
  name: string;
  handle: string;
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
        "Spring Boot 3",
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
        "Component Architecture",
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
    {
      company: "EMMVEE Photovoltaic Private Limited",
      role: "Web Developer Intern",
      location: "Bengaluru, India",
      period: "Jul 2018 – Aug 2018",
      summary: "Implemented production tracking modules for the internal PRISM enterprise system.",
      bullets: [
        "Implemented a production tracking module for the internal PRISM enterprise system, enabling operations personnel to classify material throughput and track operational metrics intuitively.",
      ],
      technologies: ["JavaScript", "HTML5", "CSS3", "PHP", "MySQL"],
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
      id: "current-role",
      keyNumber: 1,
      label: "Current Focus & Role",
      icon: "Briefcase",
      question: "What is Ashwin currently working on?",
      summary: "Senior Software Engineer & Full-Stack Platform Lead @ CNZ Consultants",
      answerMarkdown: `Ashwin is currently a **Senior Software Engineer & Full-Stack Platform Lead** at **CNZ Consultants** (Remote, NZ).

Key highlights of his current work:
- **Architecting Multi-Domain Integration Pipelines**: Connecting Accounting (Xero, MYOB), E-Commerce (Shopify), and WMS/3PL systems (ShipHero, ControlPort, GRL).
- **Modern Spring Boot 3 & Java 21**: Leading the refactor from legacy monolithic scripts into a clean, layered microservices architecture.
- **Dynamic Multi-Tenant Security**: Designed extensible strategy-based authorization supporting OAuth2, API key headers, MD5 query signatures, and Azure AD for dozens of client orgs.
- **Agentic Engineering**: Pioneering multi-agent AI workflows in middleware to automate service diagnostics, payload telemetry inspections, and exception remediation.
- **Full-Stack Telemetry**: Built React & TypeScript dashboards with 1-click operational bottleneck remediation drawers.`,
      followUps: ["skills", "projects", "education"],
      tags: ["work", "current", "role", "cnz", "spring boot", "java", "lead"],
    },
    {
      id: "education",
      keyNumber: 2,
      label: "Education & Academics",
      icon: "GraduationCap",
      question: "Where was Ashwin's education and what are his qualifications?",
      summary: "M.Tech CSE from Manipal University (GPA 7.9) & B.E. ISE from VTU",
      answerMarkdown: `Ashwin holds advanced formal degrees in Computer Science:

1. **Master of Technology (M.Tech) in Computer Science Engineering**
   - **Manipal University** (Aug 2021 – Jul 2023)
   - **GPA: 7.9 / 10.0**
   - Specialization in scalable distributed systems, algorithms, and data engineering.

2. **Bachelor of Engineering (B.E.) in Information Science and Engineering**
   - **Visvesvaraya Technological University (VTU)** (Jul 2015 – May 2019)
   - Foundational computer science, data structures, operating systems, networking, and software engineering.

**Honors**:
- **Best Poster Award** at AMD Innovation EXPO 2023.`,
      followUps: ["current-role", "projects", "awards"],
      tags: ["education", "degree", "mtech", "manipal", "vtu", "university", "college", "gpa"],
    },
    {
      id: "projects",
      keyNumber: 3,
      label: "Featured Projects",
      icon: "Rocket",
      question: "What major platforms and projects has Ashwin built?",
      summary: "Enterprise Middleware & Telemetry, Java AST Code Analyzer, Sentiment Research",
      answerMarkdown: `Here are three standout engineering systems Ashwin has architected:

1. **Multi-Domain Integration & Telemetry Platform**
   - *Tech: Java 21, Spring Boot 3, TypeScript, React, PostgreSQL, Docker*
   - Enterprise middleware connecting ERPs, Accounting (Xero/MYOB), E-Commerce (Shopify), and WMS/3PL systems.
   - Features real-time payload telemetry, circuit breaking, dynamic credential resolution, and 1-click exception remediation drawers.

2. **Automated Code Complexity & AST Dependency Analyzer**
   - *Tech: Java, AST Parsing, Azure OpenAI, Prompt Engineering*
   - Maps module hierarchies, computes cyclomatic metrics, and uses LLM agents to provide automated refactoring suggestions, accelerating codebase evaluations by **40%**.

3. **Echo Chamber & Social Corpus Sentiment Analyzer**
   - *Tech: Python, Pandas, NetworkX, NLP*
   - Large-scale data pipeline analyzing sentiment polarization and community interaction clustering.`,
      followUps: ["skills", "current-role", "contact"],
      tags: ["projects", "portfolio", "telemetry", "ast", "middleware", "code"],
    },
    {
      id: "skills",
      keyNumber: 4,
      label: "Tech Stack & Toolkit",
      icon: "Cpu",
      question: "What is Ashwin's tech stack and core engineering toolkit?",
      summary: "Java 21, Spring Boot 3, TypeScript, React, Agentic AI, Docker, Multi-tenant Architecture",
      answerMarkdown: `Ashwin's core technical toolkit spans backend, enterprise integrations, frontend, and AI:

- **Backend & Architecture**: Java (17 / 21), Spring Boot 3 (Spring 6), Microservices, RESTful APIs, OOP Refactoring, Reactive Patterns, Maven, JUnit, Python 3, PostgreSQL, SQL.
- **Enterprise Integrations**: Accounting (Xero, MYOB), E-Commerce (Shopify), WMS & 3PL (ShipHero, ControlPort, GRL, Consignly), ERPs (Cin7), SFTP, EDI.
- **Frontend & Web**: TypeScript, React (18/19), Next.js, Vite, Tailwind CSS, Component Architecture, Accessibility (a11y).
- **Security & Cloud**: Multi-Tenant Credential Resolution, OAuth2, API Keys, MD5 Signatures, Docker, Git, CI/CD, Linux, Azure AD / Microsoft Graph.
- **AI & Agentic Tools**: Multi-agent Orchestration, Automated Error Diagnosis & Remediation, OpenAI & Azure OpenAI APIs, Prompt Engineering.`,
      followUps: ["projects", "current-role", "contact"],
      tags: ["skills", "tech stack", "languages", "tools", "java", "react", "typescript", "spring"],
    },
    {
      id: "awards",
      keyNumber: 5,
      label: "Awards & Milestones",
      icon: "Award",
      question: "What awards and notable milestones has Ashwin achieved?",
      summary: "AMD Innovation EXPO 2023 Best Poster Award & 40% speedup on enterprise code audits",
      answerMarkdown: `Key career accolades and impact highlights:

- **Best Poster Award (AMD Innovation EXPO 2023)**: Awarded at AMD India for outstanding architectural design and visualization of full-stack internal enterprise tools.
- **40% Velocity Boost at Unisys**: Built Java AST parsers and OpenAI-driven modernization tooling that cut codebase technical evaluation times by over 40%.
- **Zero-Downtime Multi-Domain Pipelines**: Successfully refactored and deployed mission-critical middleware syncing hundreds of thousands of retail transactions across NZ, Australia, and US operations.`,
      followUps: ["current-role", "education", "contact"],
      tags: ["awards", "achievements", "amd", "unisys", "milestones"],
    },
    {
      id: "contact",
      keyNumber: 6,
      label: "How to Reach Ashwin",
      icon: "Mail",
      question: "How can I contact or hire Ashwin?",
      summary: "Email: ashwinr619@live.com · LinkedIn · GitHub",
      answerMarkdown: `Ashwin is open to conversations regarding high-impact software engineering roles, platform lead opportunities, and technical consulting.

You can reach him directly through:
- **Email**: [ashwinr619@live.com](mailto:ashwinr619@live.com)
- **LinkedIn**: [linkedin.com/in/ashwinranganath1997](https://www.linkedin.com/in/ashwinranganath1997)
- **GitHub**: [github.com/AshwinRanganath](https://github.com/AshwinRanganath)
- **Resume**: Available for direct download from the landing page.`,
      followUps: ["current-role", "projects", "skills"],
      tags: ["contact", "email", "hire", "socials", "reach", "linkedin", "github"],
    },
  ],
};
