"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import WorkCard from './WorkCard';
import { workData } from './workData';

const WORK_ENTRY_LOCK_PX = 180;
const WORK_SCROLL_RATIO = 1.35;
const WORK_MAX_DOWN_DELTA_PER_EVENT = 90;
const WORK_MAX_UP_DELTA_PER_EVENT = 220;
const WORK_END_PADDING_PX = 20;

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressInputPxRef = useRef(0);
  const lastScrollYRef = useRef<number | null>(null);
  const wasInsideRef = useRef(false);
  const [maxShift, setMaxShift] = useState(0);
  const [currentShift, setCurrentShift] = useState(0);
  const [leadingInset, setLeadingInset] = useState(0);
  const [hasMoreProjects, setHasMoreProjects] = useState(false);

  useEffect(() => {
    const updateShift = () => {
      if (!viewportRef.current || !trackRef.current) return;

      const items = trackRef.current.querySelectorAll<HTMLElement>('[data-work-item]');
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const viewportWidth = viewportRef.current.clientWidth;

      const trackStyles = window.getComputedStyle(trackRef.current);
      const leftPadding = Number.parseFloat(trackStyles.paddingLeft) || 0;
      const rightPadding = Number.parseFloat(trackStyles.paddingRight) || 0;
      const leadingSpacer = trackRef.current.querySelector<HTMLElement>('[data-leading-spacer]');
      const currentLeadingInset = leadingSpacer?.offsetWidth || 0;

      // Center the first card at section entry regardless of zoom/viewport width.
      const nextLeadingInset = Math.max(0, viewportWidth / 2 - firstItem.offsetWidth / 2 - leftPadding);
      setLeadingInset(nextLeadingInset);

      const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;
      const adjustedLastItemRight = lastItemRight + (nextLeadingInset - currentLeadingInset);

      // Shift only until the last card reaches the viewport end, avoiding long empty tail scroll.
      const nextShift = Math.max(0, adjustedLastItemRight - (viewportWidth - rightPadding) + WORK_END_PADDING_PX);
      setMaxShift(nextShift);
      setHasMoreProjects(nextShift > 4);

      setCurrentShift((previousShift) => Math.min(previousShift, nextShift));
    };

    updateShift();

    const resizeObserver = new ResizeObserver(() => updateShift());
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    window.addEventListener('resize', updateShift);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateShift);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInsidePinnedZone = rect.top <= 0 && rect.bottom > window.innerHeight;
      const maxProgressInput = WORK_ENTRY_LOCK_PX + maxShift * WORK_SCROLL_RATIO;

      // Before entering Work from above: keep the rail at the beginning.
      if (rect.top > 0) {
        progressInputPxRef.current = 0;
        setCurrentShift((previousShift) => (previousShift === 0 ? previousShift : 0));
        lastScrollYRef.current = window.scrollY;
        wasInsideRef.current = false;
        return;
      }

      // After passing Work at the bottom: keep the rail at the end so upward re-entry does not jump to start.
      if (rect.bottom <= window.innerHeight) {
        progressInputPxRef.current = maxProgressInput;
        setCurrentShift((previousShift) => (previousShift === maxShift ? previousShift : maxShift));
        lastScrollYRef.current = window.scrollY;
        wasInsideRef.current = false;
        return;
      }

      if (isInsidePinnedZone && !wasInsideRef.current) {
        // Keep existing progress to preserve direction continuity on re-entry.
        lastScrollYRef.current = window.scrollY;
      }

      if (!isInsidePinnedZone) {
        lastScrollYRef.current = null;
      }

      if (isInsidePinnedZone) {
        const previousY = lastScrollYRef.current ?? window.scrollY;
        const deltaY = window.scrollY - previousY;
        lastScrollYRef.current = window.scrollY;

        // Clamp scroll contribution to avoid fling/momentum jumping to later cards.
        const clampedDelta =
          deltaY >= 0
            ? Math.min(WORK_MAX_DOWN_DELTA_PER_EVENT, deltaY)
            : Math.max(-WORK_MAX_UP_DELTA_PER_EVENT, deltaY);
        progressInputPxRef.current = Math.max(0, Math.min(maxProgressInput, progressInputPxRef.current + clampedDelta));

        const shiftedDistance = Math.max(0, progressInputPxRef.current - WORK_ENTRY_LOCK_PX);
        const nextShift = Math.max(0, Math.min(maxShift, shiftedDistance / WORK_SCROLL_RATIO));
        setCurrentShift(nextShift);
      }

      wasInsideRef.current = isInsidePinnedZone;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [maxShift]);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ height: `calc(100vh + ${Math.round(maxShift * WORK_SCROLL_RATIO + WORK_ENTRY_LOCK_PX)}px)` }}
      className="relative"
    >
      <div ref={viewportRef} className="sticky top-0 h-screen overflow-hidden border-y border-slate-800/60 bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-background via-background/90 to-transparent px-6 pb-6 pt-8 text-center sm:px-10 lg:px-14">
          <h2 className="font-heading text-5xl font-bold text-brand-primary sm:text-6xl">Projects</h2>
          {hasMoreProjects && (
            <p className="mt-3 font-body text-sm tracking-[0.06em] text-slate-300/90">
              Scroll down to explore more projects
            </p>
          )}
        </div>

        <motion.div ref={trackRef} style={{ x: -currentShift }} className="flex h-full items-center gap-5 px-6 pb-8 pt-32 sm:gap-6 sm:px-10 lg:px-14">
          <div aria-hidden="true" data-leading-spacer className="h-px shrink-0" style={{ width: `${leadingInset}px` }} />
          {workData.map((item, index) => (
            <div key={`${item.title}-${index}`} className="shrink-0" data-work-item>
              <WorkCard item={item} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
