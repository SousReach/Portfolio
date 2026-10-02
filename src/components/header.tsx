"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "./glass-card";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <GlassCard
        as="nav"
        strong
        aria-label="Main"
        className="relative mx-auto flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 sm:px-6"
      >
        <Link
          href="/"
          onClick={close}
          className="font-semibold tracking-tight"
        >
          Portfolio
        </Link>

        <ul className="hidden items-center gap-1 text-sm sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-block"
        >
          Hire me
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex size-9 items-center justify-center rounded-full hover:bg-foreground/5 sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </GlassCard>

      {open && (
        <GlassCard
          id="mobile-menu"
          strong
          className="mx-auto mt-2 max-w-5xl rounded-3xl p-2 sm:hidden"
        >
          <ul className="flex flex-col text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block rounded-2xl px-4 py-3 hover:bg-foreground/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
    </header>
  );
}
