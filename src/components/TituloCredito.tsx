"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  nombre: string;
  lema: string;
};

export function TituloCredito({ nombre, lema }: Props) {
  const reducir = useReducedMotion();
  const entrada = reducir
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 12, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" } };

  return (
    <div className="text-center">
      <motion.h1
        {...entrada}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl tracking-[0.04em] sm:text-7xl"
      >
        {nombre}
      </motion.h1>
      <motion.p
        {...entrada}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-xs uppercase tracking-[0.35em] text-muted sm:text-sm"
      >
        {lema}
      </motion.p>
    </div>
  );
}
