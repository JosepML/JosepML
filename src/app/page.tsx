import { TituloCredito } from "@/components/TituloCredito";
import { getAjustesSitio } from "@/lib/ajustes";

export default async function Inicio() {
  const { ajustes, conectado } = await getAjustesSitio();

  return (
    <main className="letterbox relative flex min-h-svh items-center justify-center px-6">
      <TituloCredito nombre={ajustes.nombre} lema={ajustes.lema} />
      <p className="absolute bottom-8 left-0 right-0 z-10 text-center text-xs text-muted">
        {conectado
          ? (ajustes.estado ?? "Conectado a la base de datos")
          : "Sin conexión con la base de datos"}
      </p>
    </main>
  );
}
