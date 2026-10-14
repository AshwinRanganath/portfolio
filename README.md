# Ashwin Ranganath – Interactive Developer Portfolio

> Modern, minimal, and straight-to-the-point developer portfolio featuring a single-screen command center and an interactive conversational assistant.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

---

## 🚀 Key Features

- **Single-Viewport Focus**: No infinite scrolling; all essentials are front and center in a sleek developer CLI window.
- **Interactive Conversational Bot**:
  - Pinned floating dock with 1-click prompt chips.
  - Conversational slide-over drawer with real-time typewriter response streaming.
  - Follow-up suggestion chips to guide visitors through your background naturally.
  - Keyword search bar for instant lookup (e.g., "Spring Boot", "Unisys", "AMD", "Education").
  - 100% client-side: **Zero API keys required, zero latency, zero server cost**.
- **Keyboard Navigation**:
  - Press `/` or `⌘K` / `Ctrl+K`: Open the interactive bot drawer.
  - Press `1` to `6`: Directly trigger answers for Current Role, Education, Projects, Tech Stack, Awards, or Contact.
  - Press `Esc`: Dismiss the drawer.
- **Dedicated Web Resume**:
  - Accessible at `/resume` with full professional breakdown, print optimization (`window.print()`), and clean typography.
- **Single Source of Truth**:
  - All profile text, experiences, metrics, bot topics, and questions live cleanly in [`src/data/profile.ts`](src/data/profile.ts).

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

To test a production build locally:

```bash
npm run build
npm run start
```

---

## 🌐 Free Hosting on Vercel

You can host this portfolio **100% free forever** on Vercel:

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Leave all build settings at default (`Framework Preset: Next.js`).
5. Click **Deploy**. In under 60 seconds, your site is live with HTTPS at `https://portfolio-<your-username>.vercel.app`!

---

## 🏷️ Adding a Custom Domain Later

When you purchase a domain (such as `ashwinr.dev` or `ashwinranganath.com`):

1. In your **Vercel Project Dashboard**, go to **Settings** → **Domains**.
2. Type your domain name (e.g. `ashwinr.dev`) and click **Add**.
3. Vercel will provide the exact DNS records (usually an `A` record pointing to `76.76.21.21` or a `CNAME` for `cname.vercel-dns.com`).
4. Log into your domain registrar (Namecheap, Cloudflare, Google/Squarespace, etc.) and add the record.
5. Vercel automatically generates and renews your free SSL certificate within minutes.

---

## 📝 Customizing Your Content

To update any details, add a project, or add new bot questions, simply edit [`src/data/profile.ts`](src/data/profile.ts):

- **Personal Info**: Update `name`, `title`, `bio`, `email`, `socials`.
- **Bot Q&A Topics**: Add or modify entries in `profileData.botTopics`.
- **Experience & Projects**: Add new roles or engineering milestones in `profileData.experiences` and `profileData.projects`.
