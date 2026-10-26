import type { Medio } from "./tipos";
import { getMedios, medio } from "./medios";

/** Foto de Josep para Contacto y Gracias (biblioteca de medios: «Josep en un rodaje, con la cámara y el estabilizador») */
export const FOTO_CONTACTO = "3fba6b76-b61e-407d-9a7b-bf7232f72c4b";

/** La foto de Contacto y Gracias; si faltara en la biblioteca, la que se le pase de reserva (la del servicio Filmmaker) */
export async function getFotoContacto(reserva: Medio | null): Promise<Medio | null> {
  return medio(await getMedios(), FOTO_CONTACTO) ?? reserva;
}
