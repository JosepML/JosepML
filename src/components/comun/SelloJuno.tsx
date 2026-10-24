/**
 * Marca de los proyectos hechos bajo el sello de JUNO Media (`proyectos.con_juno`). Dice «con»: Josep trabaja
 * en sinergia con JUNO Media, no forma parte de ella. Va sobre imagen, así que siempre en blanco.
 */
export function SelloJuno({ pequeno, className = "" }: { pequeno?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 ${pequeno ? "bg-black/45 px-2.5 py-1 text-[10px] leading-none" : "bg-black/35 px-3.5 py-1.5 text-xs"} text-white ${className}`}>
      <span className="font-medium text-white/65">con</span>
      <span className="tracking-[0.14em]">
        <span className="font-extrabold">JUNO</span>
        <span className="ml-[0.3em] font-light">MEDIA</span>
      </span>
    </span>
  );
}
