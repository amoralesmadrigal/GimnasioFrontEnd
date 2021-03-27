import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseEndpoint = "http://localhost:8090/api/subscriptores/empleados-rest";
  private cabeceras: HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient) { }

  public listar(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.baseEndpoint);
  }

  public mostrar(idEmpleado: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.baseEndpoint}/${idEmpleado}`);
  }

  public nuevoConDireccion(empleado: Empleado, personaId: number):Observable<number>{
    return this.http.post<number>(`${this.baseEndpoint}/empleado-direccion/${personaId}`,empleado, {headers: this.cabeceras});
  }

  public editarEmpleado(subscriptor: Empleado, empleadoId: number):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.baseEndpoint}/${empleadoId}`,subscriptor, {headers: this.cabeceras});
  }

  public filtrar(nombre: string): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

  public eliminarTodo(idEmpleado: number): Observable<any>{
    return this.http.delete<any>(`${this.baseEndpoint}/all/${idEmpleado}`);
  }
}
