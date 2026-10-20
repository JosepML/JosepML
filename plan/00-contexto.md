# Contexto común (leer en cada chat)

## Qué queremos

Una web nueva para **Josep Mira Lozano**: director de fotografía y filmmaker (ejes principales) y editor. Debe ser una mezcla de **página de venta de servicios audiovisuales y portfolio**, no solo portfolio.

- **Tono:** personal y cálido, en primera persona. Nada empresarial.
- **Estética:** cinematográfica, bonita, elegante. Fondo negro cálido, acento tungsteno, tipografía editorial, formato panorámico.
- **Animaciones:** que la web se sienta dinámica y audiovisual, con animaciones visualmente interesantes pero nunca molestas. Respetar "reducir movimiento" y simplificar en móvil.
- **Viva y editable:** todo el contenido sale de una base de datos que Josep edita desde un panel privado (crear artículos, proyectos, secciones y páginas) sin tocar código.
- **No se pierde nada:** todo el contenido de la web actual (21 proyectos, 3 artículos, Recreaciones, páginas fijas, imágenes) se migra.

## Reglas de trabajo (decididas por Josep)

- La web publicada **no se toca** hasta el lanzamiento. Se publica todo de una vez al final.
- Se trabaja **en local**: Josep ve la web en `http://localhost:3000` en su PC. No quiere registrarse en Vercel durante el desarrollo.
- Cada fase se ejecuta en un chat distinto, leyendo estos archivos (ver `README.md`).

## Datos técnicos

| Qué | Valor |
| --- | --- |
| Repositorio | JosepML/JosepML (GitHub) |
| Rama de trabajo | `claude/project-thread-9vb26d` |
| Web publicada actual | `master` → GitHub Pages, `josepml.github.io/JosepML` (React + Vite, HashRouter) |
| Código de la web antigua | carpeta `legacy/` en la rama de trabajo (contenido en `legacy/constants.ts`) |
| Web nueva | Next.js 15 (App Router) + TypeScript + Tailwind 4 + Motion + Lenis |
| Base de datos | Supabase, proyecto "Web Josep Mira", id `oadmqwtnxpbotxcgzaoo`, región eu-west-3 |
| Claves públicas | en `.env` (solo URL y clave publicable; los secretos irían en `.env.local`, que no se sube) |
| Proyecto Supabase prohibido | "JML Studio" (`jgolxrpxyuxpqqdyikwb`): app de facturación de Josep, **no tocar** |
| Copia local en el PC de Josep | `C:\Users\Josep\Documents\WEB JOSEP MIRA` (Windows, Node 26, git 2.54) |
| Arrancar en local | `npm install` y `npm run dev` en esa carpeta |
| Google Analytics 4 | `G-RKBDRMVL1J` (mantener el mismo ID) |
| Formulario actual | Formspree (se sustituirá por guardado en la base de datos + aviso por correo) |
| Redes | Instagram @josepmiralozano, LinkedIn, YouTube |

Nota para Claude en la nube: el contenedor en la nube no puede conectar con `*.supabase.co` (el proxy lo bloquea). Para leer o escribir en la base de datos usa las herramientas de Supabase (MCP); la conexión real de la web se comprueba en el PC de Josep.

## Decisiones tomadas

- 2026-10-20: Plan de 7 fases aprobado.
- 2026-10-20: Previsualización en local en el PC de Josep en vez de Vercel. Vercel (u otro alojamiento) solo para el lanzamiento.
- 2026-10-20: Ejecución por fases en chats distintos con estos archivos .md.

## Decisiones pendientes de Josep

| Decisión | Por defecto si no dice nada | Fase |
| --- | --- | --- |
| Dominio propio (p. ej. josepmira.com) | Usar uno propio; comprarlo antes de lanzar si no lo tiene | 7 |
| Plan de pago de Vercel para uso comercial (unos 20 USD/mes, confirmar precio) | Sí, solo desde el lanzamiento | 7 |
| Reel actualizado para la portada | Montar uno provisional con material de los proyectos | 3 |
| Opiniones de clientes | Sección preparada y oculta hasta que las haya | 2 |
| Fotos de Josep trabajando para "Sobre mí" | Usar las que tenga; si no, planificar sesión | 2 |
| Idiomas | Solo español, base de datos preparada para añadir más | 4 |
| Precios orientativos en Servicios | "Desde X €" en cada servicio | 2 |
