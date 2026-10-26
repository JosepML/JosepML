import { getAjustes } from "./ajustes";
import { getMedios, medio } from "./medios";
import type { Medio } from "./tipos";

/** Foto por defecto de Contacto y Gracias (biblioteca: «Josep en un rodaje, con la cámara y el estabilizador») */
export const FOTO_CONTACTO = "3fba6b76-b61e-407d-9a7b-bf7232f72c4b";

/** La que se elige en Ajustes → «Foto de Contacto»; si no hay o no existe, la de por defecto y, al final, la que se pase de reserva */
export async function getFotoContacto(reserva: Medio | null): Promise<Medio | null> {
  const [ajustes, medios] = await Promise.all([getAjustes(), getMedios()]);
  return medio(medios, ajustes.fotoContacto) ?? medio(medios, FOTO_CONTACTO) ?? reserva;
}
