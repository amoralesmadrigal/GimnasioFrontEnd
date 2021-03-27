import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../models/actividad';
import Swal from 'sweetalert2';
import { ActividadService } from '../services/actividad.service';
import { PersonaService } from '../services/persona.service';
import {SubscriptorService} from '../services/subscriptor.service';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  titulo = "Actividades";
  actividades: Actividad[] = [];
  error: any;
  isAdministrador? = false;

  constructor(private service: ActividadService, private personService: PersonaService,
    private subscriptorService: SubscriptorService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(this.personService.isEmpleadoLogued()){

      this.personService.isAdministrador().subscribe(regreso =>{
        this.isAdministrador = regreso
      });

      this.service.listar().subscribe(regreso => {
        this.actividades = regreso}
      , err =>{
        if(err?.status){
          this.error = err.error;
          console.log(this.error);
          Swal.fire("Error: ", `Consulte al administrador`, 'error');
        }
      });
    }else{
      Swal.fire("Error: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }

  }

  public eliminar(id: number): void{

    Swal.fire({
      title: 'Cuidado',
      text: "¿Seguro que desea eliminar la actividad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, hazlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe(regreso => {
          Swal.fire("Eliminar: ", `Actividad eliminada con exito`, 'success');
          this.service.listar().subscribe(retorno => this.actividades = retorno);
        }, err =>{
          if(err.status === 403 || err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });
  }

}
