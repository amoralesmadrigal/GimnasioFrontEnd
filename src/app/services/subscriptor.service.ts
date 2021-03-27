import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';
import { Persona } from '../models/persona';
import { Subscriptor } from '../models/subscriptor';

@Injectable({
  providedIn: 'root'
})
export class SubscriptorService {
  private baseEndpoint = "http://localhost:8090/api/subscriptores/subscriptores-rest";
  private cabeceras: HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient) { }

  public nuevoConDireccion(subscriptor: Subscriptor, personaId: number):Observable<Subscriptor>{
    return this.http.post<Subscriptor>(`${this.baseEndpoint}/subscriptor-direccion/${personaId}`,subscriptor, {headers: this.cabeceras});
  }

  public editarSubscriptor(subscriptor: Subscriptor, subscriptorId: number):Observable<Subscriptor>{
    return this.http.put<Subscriptor>(`${this.baseEndpoint}/${subscriptorId}`,subscriptor, {headers: this.cabeceras});
  }

  public asignarActividad(idSubscriptor: number, idActividad: number): Observable<Subscriptor>{
    return this.http.post<Subscriptor>(`${this.baseEndpoint}/subscriptor-actividad/${idSubscriptor}/${idActividad}`, null, {headers: this.cabeceras});
  }

  public mostrar(idSubscriptor: number): Observable<Subscriptor>{
    return this.http.get<Subscriptor>(`${this.baseEndpoint}/${idSubscriptor}`);
  }

  public listar(): Observable<Subscriptor[]>{
    return this.http.get<Subscriptor[]>(this.baseEndpoint);
  }

  public editarActividadesSubscriptor(actividades: number[], idSubscriptor: number): Observable<Subscriptor>{
    return this.http.put<Subscriptor>(`${this.baseEndpoint}/subscriptor-actividad/${idSubscriptor}`, actividades, {headers: this.cabeceras});
  }

  public eliminarTodo(idSubscriptor: number): Observable<any>{
    return this.http.delete<any>(`${this.baseEndpoint}/all/${idSubscriptor}`);
  }

  public filtrar(nombre: string): Observable<Subscriptor[]>{
    return this.http.get<Subscriptor[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

}
