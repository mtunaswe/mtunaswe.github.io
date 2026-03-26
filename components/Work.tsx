"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import WorkCard from './WorkCard';
import { workData } from './workData';

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  useEffect(() => {
    const updateShift = () => {
      if (!viewportRef.current || !trackRef.current) return;

      const items = trackRef.current.querySelectorAll<HTMLElement>('[data-work-item]');
      if (items.length === 0) return;

      const lastItem = items[items.length - 1];
      const viewportWidth = viewportRef.current.clientWidth;

      const trackStyles = window.getComputedStyle(trackRef.current);
      const rightPadding = Number.parseFloat(trackStyles.paddingRight) || 0;
      const lastItemRight = lastItem.offsetLeft + lastItem.offsetWidth;

      // Shift only until the last card reaches the viewport end, avoiding long empty tail scroll.
      const nextShift = Math.max(1, lastItemRight - (viewportWidth - rightPadding));
      setMaxShift(nextShift);
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

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ height: `calc(100vh + ${maxShift}px)` }}
      className="relative"
    >
      <div ref={viewportRef} className="sticky top-0 h-screen overflow-hidden border-y border-slate-800/60 bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-background via-background/90 to-transparent px-6 pb-6 pt-8 text-center sm:px-10 lg:px-14">
          <h2 className="font-heading text-5xl font-bold text-brand-primary sm:text-6xl">My Work</h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex h-full items-center gap-5 px-6 pb-8 pt-32 sm:gap-6 sm:px-10 lg:px-14">
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
