"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { usePunteroFino, useReducir } from "@/components/comun/hooks";
import { img } from "@/components/comun/imagen";
import { Revelar } from "@/components/piezas";
import type { Medio } from "@/lib/datos/tipos";

/** Misma foto y animación que «Quién soy»: inclinación con el puntero y un zoom leve al hacer scroll */
export function FotoGracias({ foto }: { foto: Medio }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducir();
  const fino = usePunteroFino();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const escalaImg = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <Revelar>
      <div ref={ref} style={{ perspective: 1200 }}>
        <motion.div
          className="relative mx-auto aspect-[4/5] overflow-hidden rounded-[44px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] lg:h-[min(70svh,640px)]"
          style={{ rotateX: srx, rotateY: sry }}
          onPointerMove={(e) => {
            if (!fino || reducir) return;
            const r = e.currentTarget.getBoundingClientRect();
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
            rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
          }}
          onPointerLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
        >
          <motion.img
            src={img(foto.url, 1920)}
            alt={foto.alt}
            className="absolute inset-0 h-full w-full origin-top object-cover object-[50%_0%] [will-change:transform]"
            style={{ scale: reducir ? 1 : escalaImg }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </Revelar>
  );
}
