import { Direccion } from "./direccion";
import { TipoEmpleado } from "./tipo-empleado.enum";

export class Empleado {
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
  tipoEmpleado: TipoEmpleado;
}
