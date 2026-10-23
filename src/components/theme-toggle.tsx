"use client";

import { useLayoutEffect } from "react";

const root = () => document.documentElement;

export function ThemeToggle() {
  // React resets <html> attributes on the dev Strict Mode remount; re-apply.
  // No-op in production.
  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      root().setAttribute("data-theme", stored);
    }
  }, []);

  function toggle() {
    const next = root().getAttribute("data-theme") === "dark" ? "light" : "dark";
    root().setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      className="aura flex size-9 items-center justify-center rounded-full hover:bg-foreground/5"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="hidden size-5 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
