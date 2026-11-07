"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A ring that follows the pointer on devices with a precise pointer.
 * Over elements marked data-cursor="Texto" it grows and shows that label.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border-solid border-signal font-mono text-xs font-semibold text-ink"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      initial={false}
      animate={{
        width: label ? 84 : 16,
        height: label ? 84 : 16,
        backgroundColor: label ? "rgba(255,138,61,1)" : "rgba(255,138,61,0)",
        borderWidth: label ? 0 : 1.5,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {label}
    </motion.div>
  );
}
