import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PersonaService } from './services/persona.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  valor : number;
  constructor(private service: PersonaService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const valorEsperado = route.data.valorEsperado;

    if(this.service.isPersonaLogued()){
      this.service.getRol(this.service.obtenerPersonaId()).subscribe(regreso => {
        this.valor = regreso;
      });
    }

    if(valorEsperado != 2 ){
      this.router.navigate['/login'];
      return false;
    }else{
      return true;
    }
  }

}
