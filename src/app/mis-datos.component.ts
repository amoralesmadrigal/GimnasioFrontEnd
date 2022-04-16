import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  constructor(private service: PersonaService, private route : Router) { }

  ngOnInit(): void {
    if(this.service.isSubsLogued()){
      this.route.navigate(["/subscriptor", this.service.obtenerSubscriptorId()]);
    }else if(this.service.isEmpleadoLogued()){
      this.route.navigate(["/empleado", this.service.obtenerEmpleadoId()]);
    }else{
      this.route.navigate(["/login"]);
    }
  }

}
