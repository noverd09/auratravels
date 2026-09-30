import type { ReactNode } from "react";

/** Renders the lightweight markdown used by journal posts: "## heading", "> quote", and paragraphs. */
export function ArticleBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  const nodes: ReactNode[] = blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="mt-14 text-3xl leading-9 tracking-[-0.02em] md:text-4xl md:leading-10"
        >
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-10 border-l-2 border-accent pl-6 font-serif text-2xl leading-9 md:text-3xl md:leading-10"
        >
          {block.slice(2)}
        </blockquote>
      );
    }
    return (
      <p key={i} className="mt-6 text-lg leading-8">
        {block}
      </p>
    );
  });
  return <div className="max-w-[680px]">{nodes}</div>;
}
