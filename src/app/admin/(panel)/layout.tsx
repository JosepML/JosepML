import { ProveedorDialogos } from "@/components/admin/Dialogos";
import { BarraLateral } from "@/components/admin/BarraLateral";
import { exigirAdmin } from "@/lib/admin/sesion";

// El panel siempre se pinta con datos al día (lee con la sesión de Josep, sin caché)
export const dynamic = "force-dynamic";

export default async function LayoutPanel({ children }: { children: React.ReactNode }) {
  await exigirAdmin({ redirigir: "/admin" });
  return (
    <ProveedorDialogos>
      <div className="lg:flex">
        <BarraLateral />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-20 sm:px-8 lg:pt-10">{children}</main>
      </div>
    </ProveedorDialogos>
  );
}
