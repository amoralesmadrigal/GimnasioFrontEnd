import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private baseEndpoint = "http://localhost:8090/api/actividades/actividades-rest";
  private cabeceras: HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient) { }

  public listar(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.baseEndpoint);
  }

  public eliminar(id: number):Observable<any>{
    return this.http.delete<any>(`${this.baseEndpoint}/${id}`);
  }

  public nuevo(actividad: Actividad): Observable<Actividad>{
    return this.http.post<Actividad>(this.baseEndpoint, actividad, {headers: this.cabeceras})
  }

  public editarActividad(actividad: Actividad, id: number): Observable<Actividad>{
    return this.http.put<Actividad>(`${this.baseEndpoint}/${id}`, actividad, {headers: this.cabeceras})
  }

  public mostrar(id: number):Observable<Actividad>{
    return this.http.get<Actividad>(`${this.baseEndpoint}/${id}`);
  }

  public filtrar(nombre: string): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

}
