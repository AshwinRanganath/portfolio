# Ashwin Ranganath — Developer Command Center & Conversational Portfolio

[![Live Production](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-06b6d4?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-git-main-ashwinranganaths-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An interactive, single-viewport developer command center and conversational portfolio for **Ashwin Ranganath**, Senior Software Engineer & Full-Stack Platform Lead.

🔗 **Production URL:** [https://portfolio-git-main-ashwinranganaths-projects.vercel.app/](https://portfolio-git-main-ashwinranganaths-projects.vercel.app/)

---

## ⚡ Design Philosophy & Engineering Thesis

Traditional engineering portfolios frequently suffer from common anti-patterns: multi-thousand-pixel scrolling marathons, heavy canvas animations that stall browser threads, and buried technical credentials.

This portfolio is built on five core architectural principles:

1. **Single-Viewport Command Center**: Core professional identity, current role at CNZ Consultants, past tenure at Unisys and AMD India, M.Tech CSE credentials, key stats, and contact triggers are surfaced immediately above the fold in a CLI-inspired card.
2. **Zero-Latency Client-Side Conversational Assistant**: Visitors can ask direct questions about past work, tech stack, systems architecture, or education. Rather than relying on fragile external LLM APIs with cold starts, token fees, and rate limits, queries are parsed and streamed entirely in the browser with deterministic intent resolution.
3. **Keyboard-First Developer Experience**: Power users can navigate without touching the mouse via global shortcut bindings (`/` or `⌘K` to summon the assistant, `1`–`6` for direct topic jumping, `Esc` to dismiss).
4. **Zero-Flash Dual Theme System**: Engineered with CSS design variables and an inline pre-hydration script in `<head>`, ensuring immediate, flicker-free rendering of Dark CLI and Light Desktop themes.
5. **Print-Optimized Resume Route (`/resume`)**: A dedicated route that functions as a clean online CV and transforms via `@media print` rules into an unbranded, high-contrast PDF document.

---

## 🏗️ Architecture & Component Hierarchy

```
src/
├── app/
│   ├── layout.tsx             # Root layout with pre-hydration theme script & metadata
│   ├── globals.css            # Semantic CSS design tokens (:root dark & html.light variables)
│   ├── page.tsx               # Single-viewport root orchestrator
│   └── resume/page.tsx        # Print-optimized, standalone professional resume
├── components/
│   ├── HeroCard.tsx           # Primary CLI window card (avatar, headline, stats, CTAs)
│   ├── FloatingBotDock.tsx    # Bottom floating dock with prompt discovery chips
│   ├── BotDrawer.tsx          # Conversational slide-over drawer with NLP query engine
│   ├── FormattedMarkdown.tsx  # Zero-dependency Markdown parser (bold, code, lists, links)
│   ├── Header.tsx             # Terminal prompt indicator, live IST clock, theme switcher
│   ├── KeyboardManager.tsx    # Global hotkey listener (/, 1-6, Esc)
│   └── Icons.tsx              # Clean SVG brand icons (GitHub, LinkedIn)
└── data/
    └── profile.ts             # Strongly typed single source of truth for profile & bot knowledge
```

---

## 🤖 Client-Side Assistant Engine (`BotDrawer.tsx`)

The portfolio features an embedded interactive assistant (`ashwin-assistant`) designed to guide recruiters and engineers through Ashwin's background:

```
[User Input] 
      │
      ▼
┌──────────────────────────────────────────────┐
│  resolveUserQuery()                          │
│  ├─ 1. Exact phrase / greeting detection     │
│  ├─ 2. Weighted intent scoring               │
│  │     • Query sample match:      +20 / +10  │
│  │     • Realistic prompt match:  +15        │
│  │     • Keyword & topic tags:    +4         │
│  │     • Entity anchor overrides: +25        │
│  └─ 3. Threshold check (score >= 8)          │
└──────────────────────┬───────────────────────┘
                       │
       ┌───────────────┴───────────────┐
       ▼                               ▼
[Matched Topic]                [Intelligent Fallback]
       │                               │
       └───────────────┬───────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  streamBotResponse()                         │
│  Deterministic 4-char tick streaming (12ms)  │
│  + Rich formatted markdown rendering         │
│  + Dynamic follow-up suggestion chips        │
└──────────────────────────────────────────────┘
```

### Real Queries Handled
- *"What programming languages do you know?"* → Detailed breakdown of Java 17/21 (Spring Boot 3), TypeScript/React, Python, C# (.NET), SQL.
- *"Tell me about your time at Unisys"* → Work on Java AST static analysis pipelines, secure coding rules, and OpenAI developer diagnostics.
- *"What did you do at AMD India?"* → Full-stack platform work and Best Technical Poster Award at AMD India Technical Expo.
- *"What are you building at CNZ Consultants?"* → High-throughput enterprise integrations across Shopify, ShipHero WMS, Cin7 ERP, and Xero.
- *"Where did you study?"* → Master of Technology in Computer Science Engineering at Manipal University (GPA 7.9).

---

## ⌨️ Global Keyboard Navigation

| Key Binding | Action |
| :--- | :--- |
| `/` or `⌘K` / `Ctrl+K` | Open the interactive assistant drawer |
| `1` | Jump to **Current Role** (CNZ Consultants) |
| `2` | Jump to **Education & Academics** (Manipal University M.Tech) |
| `3` | Jump to **Selected Engineering Projects** |
| `4` | Jump to **Programming Languages & Tech Stack** |
| `5` | Jump to **Honors & Awards** (AMD Technical Poster Award) |
| `6` | Jump to **Contact Information** |
| `Esc` | Dismiss drawer and return to viewport |

---

## 🛠️ Tech Stack & Implementation Details

| Layer | Technology | Engineering Highlights |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4 (App Router) | Turbopack compilation, React Server Components where beneficial, static prerendering |
| **Library** | React 19.3 | Concurrent rendering primitives, deterministic state management |
| **Styling** | Tailwind CSS v4 | High-performance styling engine with CSS custom property integration |
| **Design Tokens** | Pure CSS Variables | High-contrast Dark CLI and Light Desktop themes with zero FOUT |
| **Icons** | Lucide React | Tree-shaken SVG icon primitives |
| **Type Safety** | TypeScript 5 | Strict typing across all components, profile models, and bot topics |
| **Hosting** | Vercel | Global edge CDN, automatic HTTPS, continuous deployment from `main` |

---

## 💻 Local Development

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher

```bash
# Clone the repository
git clone https://github.com/AshwinRanganath/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start Turbopack dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Local Emulation

```bash
# Generate optimized production build
npm run build

# Start production server locally
npm run start
```

---

## 📄 Printable Resume (`/resume`)

The repository includes a dedicated resume route accessible at [`/resume`](https://portfolio-git-main-ashwinranganaths-projects.vercel.app/resume):
- Formatted as an executive summary for technical leadership, recruiters, and engineering managers.
- Click **"Print / Save PDF"** or trigger `⌘P` to export. The `@media print` stylesheet automatically hides navigation chrome, removes shadows, and adjusts typography to clean monochrome.

---

## 👤 Author

**Ashwin Ranganath**  
*Senior Software Engineer & Full-Stack Platform Lead*  
Bengaluru, India · Global Remote

- **Live Portfolio**: [portfolio-git-main-ashwinranganaths-projects.vercel.app](https://portfolio-git-main-ashwinranganaths-projects.vercel.app/)
- **Email**: [ashwinr619@live.com](mailto:ashwinr619@live.com)
- **LinkedIn**: [linkedin.com/in/ashwinranganath1997](https://www.linkedin.com/in/ashwinranganath1997)
- **GitHub**: [github.com/AshwinRanganath](https://github.com/AshwinRanganath)

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
