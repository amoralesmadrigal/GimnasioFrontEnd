import { Empleado } from "./empleado";
import { Subscriptor } from "./subscriptor";

export class Persona {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  empleadoId: Empleado;
  subscriptorId: Subscriptor;
}
