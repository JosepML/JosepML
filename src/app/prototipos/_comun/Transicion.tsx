"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatoTimecode } from "./hooks";

/**
 * Transiciones de página de los prototipos:
 * - crecer: la imagen de la tarjeta crece hasta ser la cabecera de la ficha (A)
 * - cortinilla: una cortina de tinta cruza la pantalla con el título (B)
 * - corte: corte seco a negro con código de tiempo (C)
 * Con "reducir movimiento" todas pasan a un fundido a negro corto.
 */
export type EstiloTransicion = "crecer" | "cortinilla" | "corte";

type Viaje = {
  href: string;
  estilo: EstiloTransicion | "fundido";
  fase: "salida" | "esperando" | "llegada";
  imagen?: string;
  rect?: { top: number; left: number; width: number; height: number };
  rotulo?: string;
};

type Opciones = { estilo: EstiloTransicion; imagen?: HTMLImageElement | null; rotulo?: string };

const Contexto = createContext<(href: string, opciones: Opciones) => void>(() => {});

export const useTransicion = () => useContext(Contexto);

/** Alto de la cabecera de la ficha en la variante A: la imagen aterriza aquí */
export const ALTO_CABECERA = 0.78;

export function ProveedorTransicion({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducir = useReducedMotion();
  const [viaje, setViaje] = useState<Viaje | null>(null);
  const rutaSalida = useRef(pathname);

  const ir = useCallback(
    (href: string, { estilo, imagen, rotulo }: Opciones) => {
      if (viaje) return;
      rutaSalida.current = pathname;
      const r = imagen?.getBoundingClientRect();
      setViaje({
        href,
        estilo: reducir ? "fundido" : estilo,
        fase: "salida",
        imagen: imagen?.currentSrc || imagen?.src,
        rect: r ? { top: r.top, left: r.left, width: r.width, height: r.height } : undefined,
        rotulo,
      });
    },
    [pathname, reducir, viaje],
  );

  const salidaTerminada = useCallback(() => {
    setViaje((v) => (v && v.fase === "salida" ? { ...v, fase: "esperando" } : v));
  }, []);

  // Al terminar la salida, navegar
  useEffect(() => {
    if (viaje?.fase === "esperando") router.push(viaje.href);
  }, [viaje, router]);

  // La ruta ya cambió: dejar ver la página nueva
  useEffect(() => {
    if (!viaje || viaje.fase !== "esperando" || pathname === rutaSalida.current) return;
    window.scrollTo(0, 0);
    const t = window.setTimeout(
      () => setViaje((v) => (v ? { ...v, fase: "llegada" } : v)),
      viaje.estilo === "corte" ? 140 : 260,
    );
    return () => window.clearTimeout(t);
  }, [pathname, viaje]);

  const fin = useCallback(() => setViaje(null), []);

  return (
    <Contexto.Provider value={ir}>
      {children}
      {viaje && <Capa viaje={viaje} alSalir={salidaTerminada} alLlegar={fin} />}
    </Contexto.Provider>
  );
}

function Capa({ viaje, alSalir, alLlegar }: { viaje: Viaje; alSalir: () => void; alLlegar: () => void }) {
  const { estilo, fase } = viaje;
  const llegando = fase === "llegada";

  if (estilo === "crecer" && viaje.imagen && viaje.rect) {
    const destino = { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight * ALTO_CABECERA };
    return (
      <div className="pointer-events-auto fixed inset-0 z-[90]">
        <motion.div
          className="absolute inset-0 bg-[#0d0b09]"
          initial={{ opacity: 0 }}
          animate={{ opacity: llegando ? 0 : 1 }}
          transition={{ duration: llegando ? 0.4 : 0.5 }}
        />
        <motion.img
          src={viaje.imagen}
          alt=""
          className="absolute object-cover"
          initial={viaje.rect}
          animate={llegando ? { ...destino, opacity: 0 } : { ...destino, opacity: 1 }}
          transition={
            llegando
              ? { duration: 0.45, ease: "easeOut" }
              : { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }
          onAnimationComplete={() => (llegando ? alLlegar() : alSalir())}
        />
      </div>
    );
  }

  if (estilo === "cortinilla") {
    return (
      <motion.div
        className="pointer-events-auto fixed inset-0 z-[90] flex items-center justify-center bg-[#1b1712] text-[#ece6da]"
        initial={{ y: "100%" }}
        animate={{ y: llegando ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => (llegando ? alLlegar() : alSalir())}
      >
        {viaje.rotulo && (
          <motion.p
            className="proto-b-serif px-6 text-center text-4xl italic sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: llegando ? 0 : 1, y: 0 }}
            transition={{ delay: llegando ? 0 : 0.25, duration: 0.4 }}
          >
            {viaje.rotulo}
          </motion.p>
        )}
      </motion.div>
    );
  }

  if (estilo === "corte") {
    return <Corte llegando={llegando} rotulo={viaje.rotulo} alSalir={alSalir} alLlegar={alLlegar} />;
  }

  // Fundido (reducir movimiento)
  return (
    <motion.div
      className="pointer-events-auto fixed inset-0 z-[90] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: llegando ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => (llegando ? alLlegar() : alSalir())}
    />
  );
}

function Corte({
  llegando,
  rotulo,
  alSalir,
  alLlegar,
}: {
  llegando: boolean;
  rotulo?: string;
  alSalir: () => void;
  alLlegar: () => void;
}) {
  // Corte seco: sin interpolación, solo tiempos
  useEffect(() => {
    const t = window.setTimeout(llegando ? alLlegar : alSalir, llegando ? 60 : 320);
    return () => window.clearTimeout(t);
  }, [llegando, alSalir, alLlegar]);

  return (
    <div className="pointer-events-auto fixed inset-0 z-[90] flex flex-col items-center justify-center gap-3 bg-black font-mono text-xs uppercase tracking-[0.3em] text-white">
      <span className="text-[#ff2a1f]">● Corte</span>
      <span>{formatoTimecode(Math.floor(Math.random() * 24 * 600))}</span>
      {rotulo && <span className="mt-2 text-white/60">{rotulo}</span>}
    </div>
  );
}
