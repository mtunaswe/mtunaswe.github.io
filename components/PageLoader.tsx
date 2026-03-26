"use client";

import { useEffect, useState } from "react";

const MODEL_PATHS = ["/assets/models/Penguins.glb"];
const MIN_DISPLAY_MS = 1200;
const EXIT_ANIMATION_MS = 560;
const COMPLETE_HOLD_MS = 2200;

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-loading");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      document.body.classList.remove("page-loading");
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    let pageReady = document.readyState === "complete";
    let modelsReady = false;
    let minReady = false;
    let hasClosed = false;

    const maybeClose = () => {
      if (!isMounted || !pageReady || !modelsReady || !minReady || hasClosed) return;
      hasClosed = true;

      setProgress(100);

      window.setTimeout(() => {
        if (!isMounted) return;

        setIsExiting(true);
        window.setTimeout(() => {
          if (isMounted) {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            setIsVisible(false);
            document.body.classList.remove("page-loading");
            document.body.classList.add("page-loaded");
          }
        }, EXIT_ANIMATION_MS);
      }, COMPLETE_HOLD_MS);
    };

    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 94) return current;
        const step = Math.max(1, Math.round((100 - current) / 18));
        return Math.min(94, current + step);
      });
    }, 90);

    const onWindowLoaded = () => {
      pageReady = true;
      maybeClose();
    };

    const minTimer = window.setTimeout(() => {
      minReady = true;
      maybeClose();
    }, MIN_DISPLAY_MS);

    if (!pageReady) {
      window.addEventListener("load", onWindowLoaded, { once: true });
    }

    Promise.all(
      MODEL_PATHS.map(async (path) => {
        try {
          await fetch(path, { cache: "force-cache" });
        } catch {
          // Keep loader resilient if prefetch fails; model still loads in the scene.
        }
      })
    ).finally(() => {
      modelsReady = true;
      maybeClose();
    });

    return () => {
      isMounted = false;
      window.clearInterval(progressTimer);
      window.clearTimeout(minTimer);
      window.removeEventListener("load", onWindowLoaded);
    };
  }, []);

  if (!isVisible) return null;

  const isComplete = progress >= 100;

  return (
    <div className={`page-loader ${isExiting ? "page-loader--exit" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="page-loader__veil" />
      <div className="page-loader__panel">
        <div className="page-loader__status" aria-label={`${isComplete ? "Welcome" : "Loading"} ${isComplete ? 100 : progress}%`}>
          <div className={`page-loader__swap ${isComplete ? "is-complete" : ""}`}>
            <div className="page-loader__line page-loader__line--loading">
              <span className="page-loader__label">Loading</span>
              <span className="page-loader__percent">{isComplete ? 100 : progress}%</span>
            </div>
            <div className={`page-loader__line page-loader__line--welcome ${isComplete ? "" : "page-loader__line--hidden"}`}>
              <span className="page-loader__label page-loader__label--welcome">Welcome!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
