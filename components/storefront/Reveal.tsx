"use client";

import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    if (innerWidth < 641) {
      document.querySelectorAll("details.f").forEach((d) => {
        (d as HTMLDetailsElement).open = false;
      });
    }
    const o = new IntersectionObserver(
      (entries) => entries.forEach((x) => x.isIntersecting && x.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".sec .w, .goal, .tst .card").forEach((el) => {
      el.classList.add("rv");
      o.observe(el);
    });
    return () => o.disconnect();
  }, []);
  return null;
}
