import { RedireccionPagina } from "@/components/comun/RedireccionPagina";
import { RUTAS } from "@/lib/rutas";

export default function RedireccionJuno() {
  return <RedireccionPagina hacia={RUTAS.juno} />;
}
