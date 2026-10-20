/** Rama de laurel doble, en el color del texto. */
export function Laurel({ className = "" }: { className?: string }) {
  const hojas = Array.from({ length: 6 }, (_, i) => i);
  const rama = (lado: 1 | -1) => (
    <g transform={lado === -1 ? "translate(64 0) scale(-1 1)" : undefined}>
      <path d="M26 54 C 12 46, 8 26, 16 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {hojas.map((i) => {
        const t = i / 5;
        const x = 26 - 14 * t + 4 * Math.sin(t * Math.PI);
        const y = 52 - 44 * t;
        return (
          <ellipse
            key={i}
            cx={x - 3}
            cy={y}
            rx="2.4"
            ry="5.5"
            transform={`rotate(${-50 + t * 30} ${x - 3} ${y})`}
            fill="currentColor"
          />
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 64 60" className={className} aria-hidden>
      {rama(1)}
      {rama(-1)}
    </svg>
  );
}
