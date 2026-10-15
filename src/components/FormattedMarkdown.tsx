import React from "react";

interface FormattedMarkdownProps {
  content: string;
  isStreaming?: boolean;
}

export function FormattedMarkdown({ content, isStreaming }: FormattedMarkdownProps) {
  const parseInline = (text: string): React.ReactNode[] => {
    // Regex matches: [link](url), **bold**, *italic*, `code`
    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      // Link [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const isExternal = linkMatch[2].startsWith("http") || linkMatch[2].startsWith("mailto");
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target={isExternal && !linkMatch[2].startsWith("mailto") ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2 font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }

      // Bold **text**
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={index} className="theme-heading font-semibold">
            {boldMatch[1]}
          </strong>
        );
      }

      // Italic *text*
      const italicMatch = part.match(/^\*(.*?)\*$/);
      if (italicMatch) {
        return (
          <em key={index} className="theme-muted italic">
            {italicMatch[1]}
          </em>
        );
      }

      // Inline code `code`
      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded theme-subtle-box text-amber-700 dark:text-amber-300 font-mono text-[11px]"
          >
            {codeMatch[1]}
          </code>
        );
      }

      return part;
    });
  };

  // Split lines and group by block types (paragraphs, bullet lists, numbered lists)
  const lines = content.split("\n");
  type BlockItem =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: { num: string; text: string }[] };

  const parsedBlocks: BlockItem[] = [];
  let currentUl: string[] | null = null;
  let currentOl: { num: string; text: string }[] | null = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // Blank line flushes active lists
      if (currentUl) {
        parsedBlocks.push({ type: "ul", items: currentUl });
        currentUl = null;
      }
      if (currentOl) {
        parsedBlocks.push({ type: "ol", items: currentOl });
        currentOl = null;
      }
      continue;
    }

    // Check bullet list item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (currentOl) {
        parsedBlocks.push({ type: "ol", items: currentOl });
        currentOl = null;
      }
      if (!currentUl) currentUl = [];
      currentUl.push(trimmed.slice(2));
      continue;
    }

    // Check numbered list item
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (currentUl) {
        parsedBlocks.push({ type: "ul", items: currentUl });
        currentUl = null;
      }
      if (!currentOl) currentOl = [];
      currentOl.push({ num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // Standard paragraph line
    if (currentUl) {
      parsedBlocks.push({ type: "ul", items: currentUl });
      currentUl = null;
    }
    if (currentOl) {
      parsedBlocks.push({ type: "ol", items: currentOl });
      currentOl = null;
    }

    parsedBlocks.push({ type: "p", text: trimmed });
  }

  // Flush any open lists
  if (currentUl) parsedBlocks.push({ type: "ul", items: currentUl });
  if (currentOl) parsedBlocks.push({ type: "ol", items: currentOl });

  return (
    <div className="space-y-3 font-sans text-sm theme-body leading-relaxed">
      {parsedBlocks.map((block, idx) => {
        if (block.type === "p") {
          return (
            <p key={idx} className="leading-relaxed">
              {parseInline(block.text)}
            </p>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={idx} className="space-y-2 my-2 pl-1">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5 text-xs select-none">▸</span>
                  <span className="flex-1 leading-relaxed">{parseInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ol") {
          return (
            <ol key={idx} className="space-y-2.5 my-2">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-md theme-subtle-box text-amber-700 dark:text-amber-400 font-mono text-xs flex items-center justify-center font-bold select-none">
                    {item.num}
                  </span>
                  <span className="flex-1 leading-relaxed">{parseInline(item.text)}</span>
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}

      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-cursor align-middle" />
      )}
    </div>
  );
}
