"use client";

import { useRef, ViewTransition } from "react";
import Link from "next/link";
import { gsap, useGSAP, DESKTOP_MOTION, MOBILE_MOTION } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");

      // Desktop: pinned horizontal gallery; the card nearest the centre comes forward.
      mm.add(DESKTOP_MOTION, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const focus = () => {
          const mid = window.innerWidth / 2;
          let best = 0;
          let bestD = Infinity;
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - mid);
            const t = Math.min(d / (window.innerWidth * 0.6), 1);
            gsap.set(card, { scale: 1 - t * 0.08, opacity: 1 - t * 0.5 });
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          if (counter.current) counter.current.textContent = String(best + 1).padStart(2, "0");
          dots.forEach((dot, i) => (dot.dataset.active = String(i === best)));
        };
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: focus,
            onRefresh: focus,
          },
        });
        return () => tween.revert();
      });

      // Phones and tablets: cards stack and rise into view.
      mm.add(MOBILE_MOTION, () => {
        cards.forEach((card) =>
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }),
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projetos"
      aria-labelledby="projetos-titulo"
      className="relative flex flex-col gap-10 overflow-hidden bg-ink py-24 lg:h-[100svh] lg:justify-center lg:gap-[clamp(1rem,3.5vh,2.5rem)] lg:pb-8 lg:pt-[clamp(5.5rem,13vh,7rem)]"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm text-signal">/projetos</p>
          <h2
            id="projetos-titulo"
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em]"
          >
            Projetos que já entreguei
          </h2>
          <p className="max-w-xl text-base text-muted sm:text-lg">
            O problema que cada um resolve e como eu resolvi.
          </p>
        </div>
        <p className="hidden font-mono text-lg text-muted lg:block" aria-hidden="true">
          <span ref={counter} className="text-fg">
            01
          </span>{" "}
          / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <ul
        ref={track}
        className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-5 sm:px-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:gap-8 lg:px-[calc(50vw-min(23rem,24vw))]"
      >
        {projects.map((p, i) => (
          <li key={p.slug} data-card className="flex-none lg:w-[min(46rem,48vw)]">
            <Link
              href={`/projetos/${p.slug}`}
              data-cursor="Abrir"
              className="group flex h-full flex-col gap-5 rounded-3xl border border-line bg-panel p-5 transition-colors hover:border-signal sm:p-7 lg:h-[min(36rem,calc(100svh-15rem))] lg:gap-[clamp(0.75rem,2vh,1.5rem)]"
            >
              <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted sm:text-[13px]">
                <span>
                  {p.org} · {p.period}
                </span>
                <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ViewTransition name={`project-visual-${p.slug}`}>
                <div className="h-44 sm:h-52 lg:h-auto lg:min-h-0 lg:flex-1">
                  <ProjectVisual kind={p.visual} />
                </div>
              </ViewTransition>
              <ViewTransition name={`project-title-${p.slug}`}>
                <h3 className="w-fit font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em]">
                  {p.title}
                </h3>
              </ViewTransition>
              <div className="grid gap-4 text-[15px] leading-relaxed sm:grid-cols-2 sm:gap-6">
                <p className="text-muted">
                  <b className="block font-medium text-fg">O problema</b>
                  {p.problem}
                </p>
                <p className="text-muted">
                  <b className="block font-medium text-fg">A solução</b>
                  {p.solution}
                </p>
              </div>
              <span className="mt-auto flex items-center gap-2 font-mono text-sm text-signal">
                Ver projeto
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mx-auto hidden w-full max-w-[1600px] gap-2 px-16 lg:flex" aria-hidden="true">
        {projects.map((p) => (
          <span
            key={p.slug}
            data-dot
            data-active="false"
            className="h-1 w-8 rounded-full bg-[#2a3a55] transition-all duration-300 data-[active=true]:w-16 data-[active=true]:bg-signal"
          />
        ))}
      </div>
    </section>
  );
}
