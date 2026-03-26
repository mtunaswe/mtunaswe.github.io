"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const syncCursorMode = () => {
      const hovered = document.elementFromPoint(mousePos.x, mousePos.y) as HTMLElement | null;
      const cursorHost = hovered?.closest<HTMLElement>("[data-cursor]") ?? null;

      if (!cursorHost) {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
        return;
      }

      if (cursorHost.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
        cursor.classList.remove("cursor-icons");
        hover = false;
        return;
      }

      if (cursorHost.dataset.cursor === "icons") {
        const rect = cursorHost.getBoundingClientRect();
        cursor.classList.remove("cursor-disable");
        cursor.classList.add("cursor-icons");
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
        hover = true;
        return;
      }

      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      syncCursorMode();
    };

    const animate = () => {
      syncCursorMode();

      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);

    let rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} />;
}
