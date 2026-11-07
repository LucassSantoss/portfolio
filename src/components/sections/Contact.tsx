"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/gsap";
import { Magnetic } from "@/components/Magnetic";
import { profile } from "@/data/profile";

const response = [
  ["HTTP/1.1 201 Created", "ok"],
  ["Content-Type: application/json", "meta"],
  ["", ""],
  ["{", "p"],
  [`  "nome": "${profile.name}",`, "kv"],
  [`  "email": "${profile.email}",`, "kv"],
  [`  "local": "${profile.city}"`, "kv"],
  ["}", "p"],
] as const;

function Line({ text, kind }: { text: string; kind: string }) {
  if (kind === "ok") return <span className="text-ok">{text}</span>;
  if (kind === "meta") return <span className="text-muted">{text}</span>;
  if (kind === "kv") {
    const m = text.match(/^(\s*)("[^"]+")(: )(.*)$/);
    if (m)
      return (
        <>
          {m[1]}
          <span className="text-net">{m[2]}</span>
          {m[3]}
          <span className={m[4].startsWith("true") ? "text-signal" : "text-[#ffb98a]"}>{m[4]}</span>
        </>
      );
  }
  return <>{text}</>;
}

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const full = response.map(([t]) => t).join("\n").length;
  const [shown, setShown] = useState(full);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        setShown(0);
        const state = { n: 0 };
        ScrollTrigger.create({
          trigger: "[data-response]",
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(state, {
              n: full,
              duration: 2.2,
              ease: "none",
              onUpdate: () => setShown(Math.round(state.n)),
            }),
        });
        gsap.from("[data-big]", {
          yPercent: 100,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom bottom", scrub: 0.6 },
        });
        gsap.from("[data-cta] > *", {
          y: 30,
          opacity: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cta]", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Reveal the response character by character, keeping the colouring per line.
  const starts = response.map((_, i) => response.slice(0, i).reduce((sum, [t]) => sum + t.length + 1, 0));
  const lines = response.map(([text, kind], i) => {
    const visible = text.slice(0, Math.max(0, shown - starts[i]));
    return { text: visible, kind, done: visible.length === text.length };
  });

  const btn =
    "inline-flex min-h-12 items-center rounded-full px-6 py-3.5 text-base font-medium transition-colors sm:px-7 sm:text-[17px]";

  return (
    <section
      ref={root}
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative flex min-h-[100svh] flex-col gap-12 overflow-hidden bg-signal px-5 pt-24 text-ink sm:px-8 lg:px-16 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-sm font-semibold">/contato</p>
          <h2
            id="contato-titulo"
            className="font-display text-[clamp(2.6rem,6vw,4.75rem)] font-extrabold leading-none tracking-[-0.03em]"
          >
            Seu request chegou. Vamos conversar?
          </h2>
          <div data-cta className="flex flex-wrap gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className={`${btn} bg-ink text-white hover:bg-[#1d2c45]`}>
                Enviar e-mail
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`${btn} border-2 border-ink hover:bg-ink hover:text-signal`}>
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.github} target="_blank" rel="noreferrer" className={`${btn} border-2 border-ink hover:bg-ink hover:text-signal`}>
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className={`${btn} border-2 border-ink hover:bg-ink hover:text-signal`}>
                Baixar currículo
              </a>
            </Magnetic>
          </div>
          <p className="font-mono text-sm">
            ou copie: <span className="select-all break-all font-semibold">{profile.email}</span>
          </p>
        </div>

        <pre
          data-response
          aria-label={`Resposta: ${profile.name}, ${profile.email}, ${profile.city}.`}
          className="min-h-[19rem] min-w-0 overflow-x-auto rounded-2xl bg-ink p-5 font-mono text-[12.5px] leading-[1.75] text-soft sm:p-8 sm:text-base"
        >
          <code aria-hidden="true">
            {lines.map((l, i) => (
              <span key={i} className="block min-h-[1.75em] whitespace-pre">
                {l.done ? <Line text={l.text} kind={l.kind} /> : l.text}
              </span>
            ))}
          </code>
        </pre>
      </div>

      <div className="mx-auto mt-auto w-full max-w-[1600px] overflow-hidden" aria-hidden="true">
        <p
          data-big
          className="font-display text-[clamp(5.5rem,14.5vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.05em] sm:whitespace-nowrap"
        >
          <span className="block sm:inline">201</span> Created
        </p>
      </div>

      <footer className="mx-auto flex w-full max-w-[1600px] flex-wrap justify-between gap-3 border-t border-ink/20 py-6 font-mono text-xs">
        <span>© 2026 {profile.name}</span>
        <span>Feito com Next.js, GSAP e Three.js</span>
      </footer>
    </section>
  );
}
