"use client";

import { Fragment, useRef, useState } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { stackLayers, practices } from "@/data/profile";

export function Stack() {
  const root = useRef<HTMLElement>(null);
  const [note, setNote] = useState<{ name: string; note: string } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Each layer lights up as the scroll reaches it, top to bottom.
        gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((layer) => {
          gsap.fromTo(
            layer,
            { opacity: 0.25, filter: "grayscale(1)", y: 24 },
            {
              opacity: 1,
              filter: "grayscale(0)",
              y: 0,
              ease: "none",
              scrollTrigger: { trigger: layer, start: "top 85%", end: "top 55%", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="stack"
      aria-labelledby="stack-titulo"
      className="relative bg-ink px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-sm text-signal">/stack</p>
          <h2
            id="stack-titulo"
            className="font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
          >
            Por onde o request passa
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Cada camada acende quando o scroll chega nela. Toque ou passe o mouse numa tecnologia para ver onde eu uso.
          </p>
          <p className="min-h-[3.5rem] rounded-xl border border-line bg-panel px-4 py-3 text-sm text-soft" aria-live="polite">
            {note ? (
              <>
                <b className="font-medium text-signal">{note.name}</b> · {note.note}
              </>
            ) : (
              <span className="text-dim">Selecione uma tecnologia.</span>
            )}
          </p>
          <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted">
            {practices.map((p) => (
              <li key={p} className="rounded-full border border-line px-3 py-1.5">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <ol className="flex flex-col">
          {stackLayers.map((layer, i) => (
            <Fragment key={layer.id}>
              {i > 0 ? <li aria-hidden="true" className="flow-line mx-auto h-10 w-0.5" /> : null}
              <li
                data-layer
                className={`flex flex-col gap-4 rounded-2xl p-5 sm:p-6 ${
                  layer.emphasis
                    ? "border-2 border-signal bg-signal/[0.08] shadow-[0_0_40px_rgba(255,138,61,0.18)]"
                    : "border border-net/50 bg-net/[0.05]"
                }`}
              >
                <span className={`font-mono text-xs uppercase tracking-wider ${layer.emphasis ? "text-signal" : "text-net"}`}>
                  {layer.label}
                </span>
                <div className={`grid gap-3 ${layer.items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                  {layer.items.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => setNote(item)}
                      onFocus={() => setNote(item)}
                      onClick={() => setNote(item)}
                      aria-pressed={note?.name === item.name}
                      className={`min-h-11 rounded-xl border px-4 py-3 text-left transition-colors ${
                        note?.name === item.name ? "border-signal bg-signal/10" : "border-line hover:border-soft"
                      } ${layer.emphasis ? "font-display text-xl font-bold sm:text-2xl" : "text-lg font-medium"}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
