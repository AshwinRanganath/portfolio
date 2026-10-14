import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-git-main-ashwinranganaths-projects.vercel.app"),
  title: "Ashwin Ranganath | Senior Software Engineer & Platform Lead",
  description:
    "Product-minded Software Engineer with M.Tech in CSE (Manipal) and 3+ years experience building scalable Java (Spring Boot) microservices, enterprise pipelines, and Agentic AI systems.",
  keywords: [
    "Ashwin Ranganath",
    "Software Engineer",
    "Platform Lead",
    "Java",
    "Spring Boot",
    "TypeScript",
    "React",
    "Agentic AI",
    "Microservices",
    "Portfolio",
  ],
  authors: [{ name: "Ashwin Ranganath", url: "https://github.com/AshwinRanganath" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ashwin Ranganath | Senior Software Engineer & Platform Lead",
    description:
      "Interactive portfolio featuring Java microservices, enterprise platforms, and an interactive conversational assistant.",
    url: "https://portfolio-git-main-ashwinranganaths-projects.vercel.app",
    siteName: "Ashwin Ranganath Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Ranganath | Senior Software Engineer & Platform Lead",
    description:
      "Interactive portfolio featuring Java microservices, enterprise platforms, and an interactive conversational assistant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
