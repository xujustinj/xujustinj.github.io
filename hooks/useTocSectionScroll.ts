"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Matches `IntersectionObserver` rootMargin top inset in the TOC consumer. */
const SCROLL_SNAP_TOP_PX = 96;

const AUTO_SCROLL_MAX_MS = 2500;

/**
 * Tracks which section is active while scrolling, with optional suppression
 * during smooth in-page navigation (e.g. TOC hash clicks) so the observer
 * does not fight the highlight. Suppression ends when the target is reached,
 * the user takes over (wheel/touch/key/mouse), or a safety timeout fires.
 */
export function useTocSectionScroll(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const autoScrollingToId = useRef<string | null>(null);
  const autoScrollMaxTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const stopAutoScrollSuppression = useCallback(() => {
    autoScrollingToId.current = null;
    if (autoScrollMaxTimeout.current !== null) {
      clearTimeout(autoScrollMaxTimeout.current);
      autoScrollMaxTimeout.current = null;
    }
  }, []);

  const beginAutoScrollSuppression = useCallback(
    (id: string) => {
      autoScrollingToId.current = id;
      if (autoScrollMaxTimeout.current !== null) {
        clearTimeout(autoScrollMaxTimeout.current);
      }
      autoScrollMaxTimeout.current = setTimeout(
        stopAutoScrollSuppression,
        AUTO_SCROLL_MAX_MS,
      );
    },
    [stopAutoScrollSuppression],
  );

  const onTocNavigate = useCallback(
    (id: string) => {
      beginAutoScrollSuppression(id);
      setActiveId(id);
    },
    [beginAutoScrollSuppression],
  );

  useEffect(() => {
    if (ids.length === 0) return;

    const syncFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id.length === 0) return;
      if (ids.includes(id)) {
        beginAutoScrollSuppression(id);
        setActiveId(id);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [beginAutoScrollSuppression, ids]);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const cancelOnUserIntent = () => {
      if (autoScrollingToId.current !== null) {
        stopAutoScrollSuppression();
      }
    };

    window.addEventListener("wheel", cancelOnUserIntent, { passive: true });
    window.addEventListener("touchstart", cancelOnUserIntent, {
      passive: true,
    });
    window.addEventListener("keydown", cancelOnUserIntent);
    window.addEventListener("mousedown", cancelOnUserIntent);

    const checkArrival = () => {
      const targetId = autoScrollingToId.current;
      if (targetId === null) return;
      const target = document.getElementById(targetId);
      if (target === null) return;

      const top = target.getBoundingClientRect().top;
      // Only clear when the heading is aligned near the snap line. Do not use
      // `top < SCROLL_SNAP_TOP_PX` alone: while scrolling up, the target can sit
      // above the viewport (`top` negative), which would wrongly count as
      // "arrived" and re-enable the observer mid-scroll.
      if (Math.abs(top - SCROLL_SNAP_TOP_PX) <= 8) {
        stopAutoScrollSuppression();
      }
    };

    window.addEventListener("scroll", checkArrival, { passive: true });

    const onScrollEnd = "onscrollend" in window ? () => checkArrival() : null;
    if (onScrollEnd !== null) {
      window.addEventListener("scrollend", onScrollEnd);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (autoScrollingToId.current !== null) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        root: null,
        rootMargin: `-${SCROLL_SNAP_TOP_PX}px 0px -70% 0px`,
        threshold: [0, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", cancelOnUserIntent);
      window.removeEventListener("touchstart", cancelOnUserIntent);
      window.removeEventListener("keydown", cancelOnUserIntent);
      window.removeEventListener("mousedown", cancelOnUserIntent);
      window.removeEventListener("scroll", checkArrival);
      if (onScrollEnd !== null) {
        window.removeEventListener("scrollend", onScrollEnd);
      }
    };
  }, [ids, stopAutoScrollSuppression]);

  return { activeId, onTocNavigate };
}
