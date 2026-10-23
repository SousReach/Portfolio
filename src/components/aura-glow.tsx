"use client";

import { useEffect } from "react";

// Elements that carry the aura layers (see globals.css).
const SELECTOR = ".glass, .glass-strong, .aura";

// Mounts once in the root layout. Feeds pointer coordinates to the CSS aura:
// --mx/--my follow the cursor, --cx/--cy mark the last click, and
// data-aura-click restarts the click pulse animation.
export function AuraGlow() {
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let pending: PointerEvent | null = null;

    function setPoint(el: HTMLElement, e: PointerEvent, x: string, y: string) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty(x, `${e.clientX - rect.left}px`);
      el.style.setProperty(y, `${e.clientY - rect.top}px`);
    }

    function flush() {
      frame = 0;
      if (!pending) return;
      // Update every aura ancestor so a card keeps tracking while the
      // cursor is over a button inside it.
      let el = (pending.target as Element).closest<HTMLElement>(SELECTOR);
      while (el) {
        setPoint(el, pending, "--mx", "--my");
        el = el.parentElement?.closest<HTMLElement>(SELECTOR) ?? null;
      }
      pending = null;
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      pending = e;
      if (!frame) frame = requestAnimationFrame(flush);
    }

    function onDown(e: PointerEvent) {
      if (reduceMotion.matches) return;
      const el = (e.target as Element).closest<HTMLElement>(SELECTOR);
      if (!el) return;
      setPoint(el, e, "--cx", "--cy");
      // Remove, force a reflow, then re-add so rapid clicks restart the pulse.
      el.removeAttribute("data-aura-click");
      void el.offsetWidth;
      el.setAttribute("data-aura-click", "");
    }

    function onAnimationEnd(e: AnimationEvent) {
      if (e.animationName === "aura-burst") {
        (e.target as Element).removeAttribute("data-aura-click");
      }
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("animationend", onAnimationEnd);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("animationend", onAnimationEnd);
    };
  }, []);

  return null;
}
