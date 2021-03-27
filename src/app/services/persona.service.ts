import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { TipoEmpleado } from '../models/tipo-empleado.enum';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private baseEndpoint = "http://localhost:8090/api/subscriptores/personas-rest";
  private cabeceras: HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  SUBSCRIPTOR_ID = 'subscriptorID';
  EMPLEADO_ID = 'empleadoID';
  PERSONA_ID = "personaID";
  _isAdmin$ : BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this._isAdmin$ = new BehaviorSubject<boolean>(false);
  }

  public login(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.baseEndpoint+"/login", persona, {headers: this.cabeceras});;
  }

  public signup(persona: Persona): Observable<number>{
    return this.http.post<number>(this.baseEndpoint+"/signup", persona, {headers: this.cabeceras});
  }

  public getRol(id: number): Observable<number>{
    return this.http.get<number>(`${this.baseEndpoint}/${id}`);
  }

  public logout(): void{
    window.sessionStorage.clear();
  }

  public guardarEnSession(nameItem: string, id: number){
    window.sessionStorage.setItem(nameItem, String(id));
  }

  public obtenerSubscriptorId(): number{
    return Number(window.sessionStorage.getItem(this.SUBSCRIPTOR_ID));
  }

  public obtenerEmpleadoId(): number{
    return Number(window.sessionStorage.getItem(this.EMPLEADO_ID));
  }

  public obtenerPersonaId(): number{
    return Number(window.sessionStorage.getItem(this.PERSONA_ID));
  }

  public isSubsLogued(): boolean{

    let usuario = window.sessionStorage.getItem(this.SUBSCRIPTOR_ID);

    if(usuario){
      return  true;
    }else{
      return false;
    }
  }

  public isEmpleadoLogued(): boolean{

    let usuario = window.sessionStorage.getItem(this.EMPLEADO_ID);

    if(usuario){
      return  true;
    }else{
      return false;
    }
  }

  public isPersonaLogued(): boolean{

    let usuario = window.sessionStorage.getItem(this.PERSONA_ID);

    if(usuario){
      return  true;
    }else{
      return false;
    }
  }

  public isAdministrador(): Observable<boolean>{
    let personaId = this.obtenerPersonaId();
    if(personaId > 0){
      this.getRol(personaId).subscribe(regreso =>{
        if(regreso == TipoEmpleado.ADMINISTRADOR.valueOf()){
          this._isAdmin$.next(true);
        }
      }, err =>{
        console.log(err);
      });
    }
    this._isAdmin$.next(false);
    return this._isAdmin$;
  }

}
