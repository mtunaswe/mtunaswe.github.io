"use client";

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { FaGithub } from 'react-icons/fa6';
import type { WorkItem } from './workData';

type WorkCardProps = {
  item: WorkItem;
  index: number;
};

export default function WorkCard({ item, index }: WorkCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: false,
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
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: {
          duration: 0.3,
          type: 'spring',
          stiffness: 400,
          damping: 25,
        },
      }}
      className="group relative flex h-[68vh] max-h-[660px] w-[min(78vw,390px)] min-w-[330px] flex-col overflow-hidden rounded-2xl border border-brand-primary/25 bg-slate-950/40 p-4 shadow-soft-deeper backdrop-blur-xl"
    >
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30"
        style={{ background: 'var(--shimmer)' }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(129, 140, 248, 0.2), rgba(59, 130, 246, 0.16))',
          filter: 'blur(1px)',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <motion.div
          className="mb-4 h-48 w-full overflow-hidden rounded-xl border border-dashed border-brand-primary/40 bg-slate-900/60"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: index * 0.1 + 0.15 }}
        >
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(129,140,248,0.14),transparent_50%)] px-4 text-center">
            <span className="font-body text-xs uppercase tracking-[0.12em] text-slate-300/85">Project Image Placeholder</span>
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
          className="mt-4 flex-grow font-body text-sm leading-relaxed text-slate-200"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {item.summary}
        </motion.p>

        <motion.div
          className="mb-6 mt-5 flex flex-wrap gap-2"
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
              whileHover={{ scale: 1.05 }}
            >
              {techItem}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-auto self-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
        >
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-auto items-center justify-center gap-2 rounded-full border border-brand-primary/45 bg-brand-primary/10 px-3 py-1.5 font-body text-xs text-slate-100 transition hover:bg-brand-primary/20"
            whileHover={{ scale: 1.02 }}
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
