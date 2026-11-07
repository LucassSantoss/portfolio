"use client";

import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, MOBILE_MOTION } from "@/lib/gsap";

const lead =
  "Eu gosto da parte do software que ninguém vê, mas todo mundo sente: APIs rápidas, dados bem modelados e sistemas que não caem às três da manhã.";

const codeLines: { indent?: boolean; parts: [string, string][] }[] = [
  { parts: [["k", "public sealed class "], ["t", "Lucas"], ["p", " : "], ["n", "BackendDeveloper"]] },
  { parts: [["p", "{"]] },
  { indent: true, parts: [["k", "string "], ["t", "Cidade"], ["p", "  => "], ["s", '"São Carlos, SP"'], ["p", ";"]] },
  { indent: true, parts: [["k", "string "], ["t", "Cargo"], ["p", "   => "], ["s", '"Backend @ Softable"'], ["p", ";"]] },
  { indent: true, parts: [["k", "string "], ["t", "Curso"], ["p", "   => "], ["s", '"Eng. de Software, IFSP"'], ["p", ";"]] },
  { indent: true, parts: [["k", "int    "], ["t", "AnosXp"], ["p", "  => "], ["n", "2"], ["p", ";"]] },
  { indent: true, parts: [["k", "string[] "], ["t", "Pratica"], ["p", " => ["], ["s", '"TDD"'], ["p", ", "], ["s", '"SOLID"'], ["p", ", "], ["s", '"CI/CD"'], ["p", "];"]] },
  { indent: true, parts: [["k", "string[] "], ["t", "Idiomas"], ["p", " => ["], ["s", '"PT"'], ["p", ", "], ["s", '"EN avançado"'], ["p", "];"]] },
  { parts: [["p", "}"]] },
];

const tone: Record<string, string> = {
  k: "text-signal",
  t: "text-fg",
  n: "text-net",
  s: "text-ok",
  p: "text-muted",
};

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const build = (pin: boolean) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: pin ? "top top" : "top 70%",
            end: pin ? "+=140%" : "bottom 60%",
            scrub: 0.6,
            pin,
          },
        });
        tl.from("[data-word]", { opacity: 0.16, stagger: 0.1, ease: "none" }, 0)
          .from("[data-code-line]", { opacity: 0.2, x: -8, stagger: 0.25, ease: "none" }, 0)
          .from("[data-bar]", { scaleX: 0, ease: "none", duration: tl.duration() || 2 }, 0)
          .from("[data-ok]", { scale: 0.6, opacity: 0, ease: "back.out(2)", duration: 0.4 });
      };
      mm.add(DESKTOP_MOTION, () => build(true));
      mm.add(MOBILE_MOTION, () => build(false));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="relative flex min-h-[100svh] items-center bg-ink px-5 py-24 sm:px-8 lg:px-16 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-1 flex flex-col gap-7 lg:order-2 lg:gap-8">
          <h2 id="sobre-titulo" className="font-mono text-sm text-signal">
            /sobre
          </h2>
          <p className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.02em]">
            {lead.split(" ").map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Há dois anos escrevo backend em C# e Java, do estágio ao time de produto. Hoje também lidero a equipe de um app
            de roteiros de viagem com IA.
          </p>
          <div className="h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div data-bar className="h-full origin-left rounded-full bg-signal" />
          </div>
        </div>

        <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-1">
          <p className="font-mono text-sm text-muted">Lucas.cs · compilando…</p>
          <pre
            className="overflow-x-auto rounded-2xl border border-line bg-panel p-5 font-mono text-[13px] leading-[1.75] sm:p-8 sm:text-base"
            aria-label="Resumo do perfil escrito como uma classe em C#"
          >
            <code>
              {codeLines.map((line, i) => (
                <span key={i} data-code-line className="block whitespace-pre">
                  {line.indent ? "    " : ""}
                  {line.parts.map(([k, text], j) => (
                    <span key={j} className={tone[k]}>
                      {text}
                    </span>
                  ))}
                </span>
              ))}
            </code>
          </pre>
          <div className="flex flex-wrap items-center gap-4">
            <span data-ok className="rounded-md bg-ok px-3.5 py-2 font-mono text-[15px] font-semibold text-ink">
              200 OK
            </span>
            <span className="font-mono text-sm text-muted">42 ms · application/json</span>
          </div>
        </div>
      </div>
    </section>
  );
}
