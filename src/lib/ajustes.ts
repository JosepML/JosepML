import { createClient } from "@/lib/supabase/server";

export type AjustesSitio = {
  nombre: string;
  lema: string;
  estado?: string;
};

const PREDETERMINADOS: AjustesSitio = {
  nombre: "Josep Mira Lozano",
  lema: "Dirección de fotografía, filmmaker y edición",
};

export async function getAjustesSitio(): Promise<{ ajustes: AjustesSitio; conectado: boolean }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ajustes")
    .select("valor")
    .eq("clave", "sitio")
    .maybeSingle();

  if (error || !data) {
    return { ajustes: PREDETERMINADOS, conectado: false };
  }
  return { ajustes: { ...PREDETERMINADOS, ...(data.valor as AjustesSitio) }, conectado: true };
}
