import { Actividad } from "./actividad";
import { Direccion } from "./direccion";
import { SubscriptorActividad } from "./subscriptor-actividad";
import { TipoInscripcion } from "./tipo-inscripcion.enum";

export class Subscriptor {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  documentacion: string;
  numeroTelefono: string;
  email: string;
  fechaNacimiento: string;
  createdAt: string;
  direccion: Direccion;
  status: boolean;
  tipoInscripcion: TipoInscripcion;
  actividades: Actividad[] = [];
  subscriptorActividad: SubscriptorActividad[] = [];
  fotoId: string;
}
