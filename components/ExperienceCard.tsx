"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ExperienceItem } from './experienceData';

type ExperienceCardProps = ExperienceItem & {
  index: number;
};

export default function ExperienceCard({
  role,
  year,
  company,
  description,
  technologies,
  index,
}: ExperienceCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-50px',
    amount: 0.2,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={
        isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, type: 'spring', stiffness: 400, damping: 24 },
      }}
      className="group relative flex items-start gap-6"
    >
      <motion.div
        className="mt-6 flex w-6 shrink-0 flex-col items-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      >
        <span className="h-4 w-4 rounded-full border-2 border-slate-900 bg-brand-primary shadow-soft-deep" />
        <span className="mt-2 h-24 w-px bg-gradient-to-b from-brand-primary/70 to-transparent" />
      </motion.div>

      <div className="relative w-full overflow-hidden rounded-container border border-slate-700/70 bg-slate-900/55 p-6 shadow-soft-deep backdrop-blur transition-all duration-300 group-hover:shadow-soft-deeper">
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25"
          style={{
            background:
              'linear-gradient(110deg, transparent 25%, rgba(59, 130, 246, 0.2) 50%, transparent 75%)',
          }}
          initial={{ x: '-120%' }}
          whileHover={{ x: '180%' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <motion.header
            className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-brand-primary">{role}</h3>
              <p className="font-body font-medium text-brand-secondary">{company}</p>
            </div>
            <span className="text-sm text-slate-300">{year}</span>
          </motion.header>

          <motion.ul
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          >
            {description.map((point, pointIndex) => (
              <motion.li
                key={`${index}-point-${pointIndex}`}
                className="flex items-start text-sm leading-relaxed text-slate-200"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.35, delay: index * 0.1 + 0.5 + pointIndex * 0.08 }}
              >
                <span className="mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
          >
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={`${index}-tech-${techIndex}`}
                className="rounded-full border border-brand-primary/35 bg-brand-primary/10 px-3 py-1 text-xs text-slate-200"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, delay: index * 0.1 + 0.65 + techIndex * 0.05 }}
                whileHover={{ scale: 1.06 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
