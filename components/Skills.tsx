"use client";

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SkillsCard from './SkillsCard';
import { skillsData } from './skillsData';

type MarqueeRowProps = {
  direction: 'left' | 'right';
  speed: number;
  items: typeof skillsData[number]['data'];
};

function getRowSpeed(skillCount: number) {
  // Fewer skills => slower row, more skills => faster row.
  return 48 + skillCount * 5;
}

function MarqueeRow({ direction, speed, items }: MarqueeRowProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [singleRowWidth, setSingleRowWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(3);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !measureRef.current) return;

      const nextSingleRowWidth = measureRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;

      if (!nextSingleRowWidth || !viewportWidth) return;

      // Ensure enough repeated content so the track always covers the viewport.
      const nextRepeatCount = Math.max(3, Math.ceil((viewportWidth * 2) / nextSingleRowWidth) + 1);

      setSingleRowWidth(nextSingleRowWidth);
      setRepeatCount(nextRepeatCount);
    };

    measure();

    const resizeObserver = new ResizeObserver(() => measure());
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (measureRef.current) resizeObserver.observe(measureRef.current);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items]);

  const animationDuration = singleRowWidth > 0 ? singleRowWidth / speed : 0;
  const animateX = direction === 'right' ? [0, -singleRowWidth] : [-singleRowWidth, 0];

  return (
    <div ref={viewportRef} className="relative overflow-hidden">
      <div ref={measureRef} className="invisible absolute left-0 top-0 flex w-max gap-6 whitespace-nowrap">
        {items.map((skill, index) => (
          <SkillsCard key={`measure-${skill.title}-${index}`} skill={skill} index={index} />
        ))}
      </div>

      <motion.div
        className="flex w-max gap-6 whitespace-nowrap"
        animate={singleRowWidth > 0 ? { x: animateX } : undefined}
        transition={
          animationDuration > 0
            ? { duration: animationDuration, ease: 'linear', repeat: Infinity }
            : undefined
        }
      >
        {Array.from({ length: repeatCount }).map((_, copyIndex) =>
          items.map((skill, index) => (
            <SkillsCard key={`${direction}-${skill.title}-${copyIndex}-${index}`} skill={skill} index={index} />
          ))
        )}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="skills"
      className="relative mx-auto w-full max-w-[96rem] overflow-hidden px-6 py-20 sm:px-10 lg:px-14"
    >
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h2
          className="font-heading text-5xl font-bold text-slate-100 sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-3xl font-body text-sm text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Tech stack and tools I use to build fast, polished, and maintainable products.
        </motion.p>
      </motion.div>

      <motion.div
        className="space-y-7"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {skillsData.map((category, index) => (
          <MarqueeRow
            key={`skills-row-${category.title}-${index}`}
            items={category.data}
            direction={index % 2 === 0 ? 'left' : 'right'}
            speed={getRowSpeed(category.data.length)}
          />
        ))}
      </motion.div>
    </section>
  );
}
