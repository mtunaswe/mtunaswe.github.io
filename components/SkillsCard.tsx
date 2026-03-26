"use client";

import { motion } from 'framer-motion';
import type { SkillItem } from './skillsData';

type SkillsCardProps = {
  skill: SkillItem;
  index?: number;
};

export default function SkillsCard({ skill, index = 0 }: SkillsCardProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group flex h-12 w-auto flex-none items-center justify-start gap-3 transition-all duration-300"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.01, 0.18) }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="flex h-6 w-6 shrink-0 items-center justify-center"
        style={{ color: skill.color, opacity: 0.92 }}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-5 w-5" />
      </motion.span>
      <span className="whitespace-nowrap font-body text-base text-slate-200/95 sm:text-lg">{skill.title}</span>
    </motion.div>
  );
}
