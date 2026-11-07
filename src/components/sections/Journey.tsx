"use client";

import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, MOBILE_MOTION } from "@/lib/gsap";
import { timeline } from "@/data/profile";

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const items = gsap.utils.toArray<HTMLElement>("[data-year-item]");

      const setActive = (p: number) => {
        items.forEach((el, i) => {
          const threshold = items.length > 1 ? i / (items.length - 1) - 0.08 : 0;
          el.dataset.active = p >= threshold ? "true" : "false";
        });
      };

      // Desktop: the section pins and vertical scroll moves the timeline sideways.
      mm.add(DESKTOP_MOTION, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        setActive(0);
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(self.progress);
              gsap.set("[data-progress]", { scaleX: self.progress });
              gsap.set("[data-packet]", { left: `${self.progress * 100}%` });
            },
          },
        });
        return () => tween.revert();
      });

      // Phones and tablets: a vertical line that fills as you scroll.
      mm.add(MOBILE_MOTION, () => {
        setActive(0);
        gsap.fromTo(
          "[data-progress-v]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
              onUpdate: (self) => setActive(self.progress),
            },
          },
        );
        items.forEach((item) =>
          gsap.from(item, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }),
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => setActive(1));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="jornada"
      aria-labelledby="jornada-titulo"
      className="relative flex flex-col gap-10 overflow-hidden bg-ink py-24 lg:h-[100svh] lg:justify-center lg:gap-[clamp(2rem,5vh,3.5rem)] lg:py-12"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm text-signal">/jornada</p>
          <h2
            id="jornada-titulo"
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em]"
          >
            Do primeiro commit à produção
          </h2>
        </div>
        <p className="hidden font-mono text-sm text-muted lg:block">continue rolando →</p>
      </div>

      <div aria-hidden="true" className="relative mx-auto hidden h-0.5 w-[calc(100%-8rem)] max-w-[1472px] bg-line lg:block">
        <div data-progress className="absolute inset-0 origin-left scale-x-0 bg-signal" />
        <div
          data-packet
          className="absolute -top-[7px] h-4 w-4 -translate-x-1/2 rounded-[4px] bg-signal shadow-[0_0_24px_rgba(255,138,61,0.7)]"
          style={{ left: "0%" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-16">
        <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-0.5 bg-line sm:left-8 lg:hidden">
          <div data-progress-v className="h-full w-full origin-top bg-signal" />
        </div>
        <ol
          ref={track}
          className="flex flex-col gap-14 pl-8 sm:pl-12 lg:flex-row lg:gap-[clamp(2rem,4vw,4rem)] lg:overflow-visible lg:pl-0"
        >
          {timeline.map((item) => (
            <li
              key={item.year}
              data-year-item
              data-active="true"
              className="group flex flex-none flex-col gap-4 lg:w-[clamp(22rem,34vw,30rem)] lg:gap-5"
            >
              <span className="font-display text-[clamp(5rem,13vw,9.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-signal transition-[color,-webkit-text-stroke] duration-500 [-webkit-text-stroke:2px_#ff8a3d] group-data-[active=false]:text-transparent group-data-[active=false]:[-webkit-text-stroke:2px_#6b7d9c]">
                {item.year}
              </span>
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-[17px]">{item.text}</p>
              <p className="font-mono text-[13px] text-dim">{item.meta}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
