// Regenera src/app/prototipos/d/textos.ts a partir de plan/contenido/proyectos/*.md.
// Uso: node scripts/textos-prototipo.mjs
// La sección "Para revisar con Josep" no se publica. Cuando exista la base de datos, esto sobra (tarea S4).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "plan/contenido/proyectos";
const SALIDA = "src/app/prototipos/d/textos.ts";

const textos = {};
for (const archivo of readdirSync(DIR).filter((f) => f.endsWith(".md") && f !== "README.md").sort()) {
  const md = readFileSync(join(DIR, archivo), "utf8").replace(/\r\n/g, "\n");
  const slug = md.match(/^slug:\s*(.+)$/m)[1].trim();
  const cuerpo = md.slice(md.indexOf("\n---\n", 4) + 5);
  const proyecto = { tarjeta: "", secciones: [] };
  for (const trozo of cuerpo.split(/^## /m).slice(1)) {
    const [titulo, ...resto] = trozo.split("\n");
    if (titulo.startsWith("Para revisar")) continue;
    const bloques = [];
    for (const parrafo of resto.join("\n").trim().split(/\n\s*\n/)) {
      const lineas = parrafo.split("\n").map((l) => l.trim()).filter(Boolean);
      if (!lineas.length) continue;
      if (lineas.every((l) => l.startsWith("- "))) bloques.push({ t: "li", x: lineas.map((l) => l.slice(2)) });
      else bloques.push({ t: "p", x: lineas.join(" ") });
    }
    if (titulo.trim() === "Tarjeta") proyecto.tarjeta = bloques.map((b) => b.x).join(" ");
    else if (bloques.length) proyecto.secciones.push({ titulo: titulo.trim(), bloques });
  }
  textos[slug] = proyecto;
}

writeFileSync(
  SALIDA,
  `// Textos de los proyectos para la ficha del prototipo. Generado con scripts/textos-prototipo.mjs a partir de
// plan/contenido/proyectos/*.md (no editar a mano). Cuando exista la base de datos, esto sale de la tabla \`proyectos\`.
export type BloqueTexto = { t: "p"; x: string } | { t: "li"; x: string[] };
export type TextosProyecto = { tarjeta: string; secciones: { titulo: string; bloques: BloqueTexto[] }[] };

export const TEXTOS: Record<string, TextosProyecto> = ${JSON.stringify(textos, null, 2)};
`,
);
console.log(`${Object.keys(textos).length} proyectos -> ${SALIDA}`);
