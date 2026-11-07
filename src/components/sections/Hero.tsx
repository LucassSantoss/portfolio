"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION } from "@/lib/gsap";
import { profile } from "@/data/profile";

const NetworkScene = dynamic(() => import("@/components/NetworkScene"), { ssr: false });

const REQUEST = "GET /api/lucas";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const latency = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const method = useRef<HTMLSpanElement>(null);
  const path = useRef<HTMLSpanElement>(null);
  const version = useRef<HTMLSpanElement>(null);

  // Type the request line once on load (written to the DOM directly, no re-renders).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const draw = (n: number) => {
      if (method.current) method.current.textContent = REQUEST.slice(0, Math.min(n, 3));
      if (path.current) path.current.textContent = REQUEST.slice(3, n);
      if (version.current) version.current.style.visibility = n >= REQUEST.length ? "visible" : "hidden";
    };
    let i = 0;
    draw(0);
    const id = window.setInterval(() => {
      i += 1;
      draw(i);
      if (i >= REQUEST.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      // Latency counter follows the whole page's scroll progress.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (latency.current) {
            latency.current.textContent = String(Math.round(self.progress * 42)).padStart(3, "0");
          }
        },
      });

      // Hero scroll progress drives the 3D network (sphere → grid).
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(title.current, { type: "chars,lines", mask: "lines" });
        title.current?.setAttribute("aria-label", "Lucas Santos");
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
          delay: 0.15,
        });
        gsap.from("[data-hero-fade]", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.6,
        });
        // As you scroll away, the name drifts up and fades: the request "leaves".
        gsap.to("[data-hero-content]", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="inicio"
      aria-label="Apresentação"
      className="bg-grid relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-28 sm:px-8 lg:px-16 lg:pb-10"
    >
      <div className="pointer-events-none absolute inset-y-0 right-[-35%] top-16 w-[120%] opacity-70 sm:right-[-20%] sm:w-[85%] lg:right-[-6%] lg:w-[62%] lg:opacity-100">
        <NetworkScene progress={progress} />
      </div>

      <div data-hero-content className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end gap-6 pb-10 sm:gap-7 lg:justify-center lg:pb-0">
        <p className="font-mono text-sm text-muted sm:text-lg lg:text-xl" aria-label={`${REQUEST} HTTP/1.1`}>
          <span aria-hidden="true">
            <span ref={method} className="font-semibold text-signal">
              {REQUEST.slice(0, 3)}
            </span>
            <span ref={path}>{REQUEST.slice(3)}</span>
            <span ref={version} className="hidden text-dim sm:inline">
              {" "}
              HTTP/1.1
            </span>
            <span className="caret ml-1.5 inline-block h-[1.1em] w-2 translate-y-[3px] bg-signal" />
          </span>
        </p>

        <h1
          ref={title}
          className="font-display text-[clamp(4.6rem,17vw,13.5rem)] font-extrabold leading-[0.86] tracking-[-0.035em]"
        >
          <span className="block">Lucas</span>
          <span className="block">
            <span className="text-outline">Santos</span>
            <span className="text-signal">.</span>
          </span>
        </h1>

        <p data-hero-fade className="max-w-xl text-lg leading-relaxed text-soft sm:text-xl lg:text-[22px]">
          Desenvolvedor backend. Construo APIs em <strong className="font-medium text-fg">C# e Java</strong> que
          aguentam o tranco, e coloco IA para trabalhar dentro de produtos reais.
        </p>
      </div>

      <div
        data-hero-fade
        className="relative z-10 mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 font-mono text-xs text-muted sm:text-[13px]"
      >
        <span className="flex flex-col gap-1.5">
          {profile.city}
          <span className="hidden text-dim sm:inline">{profile.company}</span>
        </span>
        <a href="#sobre" className="flex items-center gap-3 text-fg transition-colors hover:text-signal">
          <span className="hidden sm:inline">Role para enviar o request</span>
          <span className="sm:hidden">Role</span>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff8a3d" strokeWidth="2" strokeLinecap="round">
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
        </a>
        <span className="flex flex-col gap-1.5 text-right">
          latência
          <span className="text-lg text-fg tabular-nums sm:text-[22px]">
            <span ref={latency}>000</span> ms
          </span>
        </span>
      </div>
    </section>
  );
}
