"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "sobre", label: "/sobre" },
  { href: "jornada", label: "/jornada" },
  { href: "projetos", label: "/projetos" },
  { href: "stack", label: "/stack" },
  { href: "contato", label: "/contato" },
];

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open ? "bg-ink/75 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-16 lg:py-6">
          <Link href="/" className="font-mono text-[15px] font-semibold text-fg" onClick={() => setOpen(false)}>
            lucas.santos<span className="text-signal">()</span>
          </Link>

          <nav aria-label="Seções" className="hidden items-center gap-8 font-mono text-sm lg:flex">
            {links.map((l) => (
              <a key={l.href} href={href(l.href)} className="text-muted transition-colors hover:text-signal">
                {l.label}
              </a>
            ))}
          </nav>

          <span className="hidden items-center gap-2.5 text-sm text-muted xl:flex">
            <span className="pulse-dot h-2 w-2 rounded-full bg-ok" />
            Aberto a novas oportunidades
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h10" />}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-28 sm:px-8 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
          >
            <nav aria-label="Menu" className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={href(l.href)}
                  onClick={() => setOpen(false)}
                  className="font-display text-[clamp(2.5rem,11vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <span className="mr-3 font-mono text-base font-normal text-signal">0{i + 1}</span>
                  {l.label.slice(1)}
                </motion.a>
              ))}
            </nav>
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-ok" />
              Aberto a novas oportunidades
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
