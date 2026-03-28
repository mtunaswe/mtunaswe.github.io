"use client";

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import type { WorkItem } from './workData';

type WorkCardProps = {
  item: WorkItem;
  index: number;
};

export default function WorkCard({ item, index }: WorkCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCanHover = () => setCanHover(mediaQuery.matches);

    updateCanHover();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateCanHover);
      return () => mediaQuery.removeEventListener('change', updateCanHover);
    }

    mediaQuery.addListener(updateCanHover);
    return () => mediaQuery.removeListener(updateCanHover);
  }, []);

  const enableHoverEffects = canHover && !shouldReduceMotion;

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
    amount: 0.2,
  });

  const isGithub = useMemo(() => item.link.includes('github.com'), [item.link]);
  const linkLabel = useMemo(() => (isGithub ? 'Code' : 'View'), [isGithub]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={
        enableHoverEffects
          ? {
              y: -10,
              scale: 1.02,
              transition: {
                duration: 0.3,
                type: 'spring',
                stiffness: 400,
                damping: 25,
              },
            }
          : undefined
      }
      className="group relative flex h-[68vh] max-h-[660px] w-[min(78vw,390px)] min-w-[330px] flex-col overflow-hidden rounded-2xl border border-brand-primary/25 bg-slate-950/40 p-4 shadow-soft-deeper backdrop-blur-xl"
    >
      {enableHoverEffects && (
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{ background: 'var(--shimmer)' }}
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      )}

      {enableHoverEffects && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(129, 140, 248, 0.2), rgba(59, 130, 246, 0.16))',
            filter: 'blur(1px)',
          }}
        />
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <motion.div
          className="mb-4 h-44 w-full overflow-hidden rounded-xl border border-brand-primary/35 bg-slate-900/60 sm:h-48"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: index * 0.1 + 0.15 }}
        >
          <div className="relative h-full w-full">
            <Image
              src={item.imageUrl}
              alt={`${item.title} preview image`}
              fill
              sizes="(max-width: 640px) 78vw, 390px"
              className="object-cover"
              priority={index < 2}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
          </div>
        </motion.div>

        <span className="mb-1 inline-flex w-fit rounded-full border border-brand-secondary/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-secondary">
          Project {String(index + 1).padStart(2, '0')}
        </span>

        <motion.h3
          className="mt-2 font-heading text-2xl font-bold text-brand-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="mt-3 flex-grow overflow-hidden font-body text-sm leading-relaxed text-slate-200 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] lg:[-webkit-line-clamp:5]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {item.summary}
        </motion.p>

        <motion.div
          className="mb-4 mt-4 flex max-h-[4.25rem] flex-wrap gap-2 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
        >
          {item.technologies.map((techItem, techIndex) => (
            <motion.span
              key={`${item.title}-tech-${techIndex}`}
              className="rounded-lg border border-brand-primary/35 bg-brand-primary/10 px-3 py-1 text-xs text-slate-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + techIndex * 0.05, type: 'spring', stiffness: 300 }}
              whileHover={enableHoverEffects ? { scale: 1.05 } : undefined}
            >
              {techItem}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-auto pb-1 self-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
        >
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-auto items-center justify-center gap-2 rounded-full border border-brand-primary/45 bg-brand-primary/10 px-3 py-1.5 font-body text-xs text-slate-100 transition hover:bg-brand-primary/20"
            whileHover={enableHoverEffects ? { scale: 1.02 } : undefined}
            whileTap={{ scale: 0.98 }}
          >
            {isGithub && <FaGithub className="h-4 w-4" />}
            {linkLabel}
          </motion.a>
        </motion.div>
      </div>
    </motion.article>
  );
}
