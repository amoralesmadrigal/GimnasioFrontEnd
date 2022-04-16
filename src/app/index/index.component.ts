import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title : string;
  personaBD : Persona;
  error : any;
  constructor(private service: PersonaService, private route: Router) { }

  ngOnInit(): void {
    if(this.service.isPersonaLogued()){

      this.service.mostrar(this.service.obtenerPersonaId()).subscribe(regreso => {
        this.personaBD = regreso;
        let nombre : string;
        if(this.personaBD.empleadoId?.nombre && this.personaBD.empleadoId?.primerApellido){
          nombre = `${this.personaBD.empleadoId?.nombre} ${this.personaBD.empleadoId?.primerApellido}`;
        }else if (this.personaBD.subscriptorId?.nombre && this.personaBD.subscriptorId?.primerApellido){
          nombre = `${this.personaBD.subscriptorId?.nombre} ${this.personaBD.subscriptorId?.primerApellido}`
        }

        this.title = `Bienvenido ${ nombre }`;
      }, err =>{
        if(err?.status){
          this.error = err.error;
          console.log(this.error);
          Swal.fire("Error: ", `Consulte al administrador`, 'error');
        }
      });

    }else{
      this.route.navigate(['/login']);
    }
  }

}
