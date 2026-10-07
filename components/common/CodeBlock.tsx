"use client";

import React, { useEffect, useState } from "react";
import type { HighlighterCore } from "shiki/core";

interface CodeBlockProps {
  code: string;
  lang: "bash" | "tsx";
  className?: string;
}

// Fine-grained shiki: only the langs/themes we use and the JS regex engine
// (no Oniguruma WASM). Loaded on first use and shared by every CodeBlock.
let highlighterPromise: Promise<HighlighterCore> | null = null;

const getHighlighter = () => {
  highlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
  ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
    createHighlighterCore({
      themes: [
        import("@shikijs/themes/light-plus"),
        import("@shikijs/themes/dark-plus"),
      ],
      langs: [import("@shikijs/langs/bash"), import("@shikijs/langs/tsx")],
      engine: createJavaScriptRegexEngine(),
    }),
  );
  return highlighterPromise;
};

export const preloadHighlighter = () => void getHighlighter();

const CodeBlock = ({ code, lang, className }: CodeBlockProps) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      setHtml(
        highlighter.codeToHtml(code, {
          lang,
          themes: { light: "light-plus", dark: "dark-plus" },
          defaultColor: false,
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className={className}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default CodeBlock;
