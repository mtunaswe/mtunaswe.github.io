"use client";

import Image from "next/image";

export default function AboutMeSection() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-6 py-20 sm:px-10 lg:px-14"
    >
      <div className="pointer-events-none absolute -left-12 top-10 h-48 w-48 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-brand-secondary/20 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="absolute -inset-2 rounded-container bg-gradient-to-br from-brand-primary/45 via-brand-secondary/35 to-transparent blur-xl" />
          <div className="relative overflow-hidden rounded-container border border-slate-700/70 bg-slate-900/60 p-2 shadow-soft-deeper">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src="/assets/aboutme.jpg"
                alt="Mert Tuna"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-[0.16em] text-slate-300">About Me</p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-brand-primary sm:text-5xl">
            Engineer, Builder, Dreamer.
          </h2>

          <a
            href="https://www.google.com/maps/place/Ko%C3%A7+University,+Istanbul/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-2 text-sm text-slate-100 transition hover:bg-brand-primary/20"
            data-cursor="disable"
          >
            Koç University, Istanbul
          </a>

          <p className="mt-6 font-body text-sm leading-relaxed text-slate-300">
            A senior double-major student in Computer Engineering and Electrical & Electronics
            Engineering, with a minor in Business Administration.
          </p>

          <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">
            An AI enthusiast into deep learning/machine learning, and currently exploring how to
            work efficiently with LLM systems through Agentic AI, RAG, MCP, LangChain, and
            LangGraph.
          </p>

          <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">
            A daydreamer who loves discussing startup ideas anytime with friends.
          </p>

          <p className="mt-4 font-body text-sm leading-relaxed text-slate-300">
            Outside of work, I love video games, game development, guitar, vibe coding, fitness.
          </p>
        </div>
      </div>
    </section>
  );
}
