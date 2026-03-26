"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";

const links = [
  { label: "ABOUT", target: "#about" },
  { label: "EXPERIENCE", target: "#experience" },
  { label: "SKILLS", target: "#skills" },
  { label: "WORK", target: "#work" },
  { label: "let's connect!", target: "#connect" },
];

export default function Navbar() {
  const [activeTarget, setActiveTarget] = useState<string>("");

  useEffect(() => {
    let updateActiveSection = () => {};

    const anchors = document.querySelectorAll<HTMLAnchorElement>(".header a[data-href]");

    const onClick = (e: Event) => {
      e.preventDefault();
      const anchor = e.currentTarget as HTMLAnchorElement;
      const section = anchor.getAttribute("data-href");
      if (!section) return;
      setActiveTarget(section);

      const target = document.querySelector(section) as HTMLElement | null;
      if (!target) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    const sections = links
      .map((link) => document.querySelector(link.target) as HTMLElement | null)
      .filter((section): section is HTMLElement => Boolean(section));

    updateActiveSection = () => {
      if (sections.length === 0) return;

      const marker = window.scrollY + window.innerHeight * 0.42;
      let nextActive = "";

      for (const section of sections) {
        if (marker >= section.offsetTop) {
          nextActive = `#${section.id}`;
        } else {
          break;
        }
      }

      setActiveTarget((prev) => (prev === nextActive ? prev : nextActive));
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", onClick));
    const onResize = () => {
      updateActiveSection();
    };
    window.addEventListener("resize", onResize);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", onClick));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <>
      <div className="header-shell">
        <div className="header">
          <a href="#home-top" className="navbar-title navbar-icon-link" data-cursor="disable" data-href="#home-top" aria-label="Home">
            <Image src="/myicon.ico" alt="Mert Tuna" width={28} height={28} className="navbar-icon" />
          </a>

          <ul>
            {links.map((link) => (
              <li key={link.target}>
                <a
                  data-href={link.target}
                  href={link.target}
                  className={activeTarget === link.target ? "nav-link-active" : ""}
                >
                  <HoverLinks text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
}
