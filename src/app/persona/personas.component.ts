import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../services/empleado.service';
import { SubscriptorService } from '../services/subscriptor.service';
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  titulo = "Personas";
  personas: Persona[] = [];
  error: any;
  isAdministrador? = false;

  constructor(private service: PersonaService, private empleadoService: EmpleadoService,
              private subsService: SubscriptorService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.service.isEmpleadoLogued()){
      this.service.isAdministrador().subscribe(regreso =>{
        this.isAdministrador = regreso
      });
      this.service.listar().subscribe(regreso => {this.personas = regreso},
        err =>{
          if(err?.status){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
    }else{
      Swal.fire("Informacion: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }
  }

  buscarPersona(nombre: string){
    if(this.service.isEmpleadoLogued()){

      nombre = nombre !== undefined ? nombre.trim() : "";
      if( nombre != ""){
        this.service.filtrar(nombre).subscribe(regreso => {
          this.personas = regreso
        }, err =>{
          if(err?.status){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
      }else{
        this.service.listar().subscribe(regreso => this.personas = regreso);
      }


    }else{
      Swal.fire("Informacion: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }
  }

  public eliminar(id: number, tipo: string): void{
    if(this.isAdministrador){
      Swal.fire({
        title: 'Cuidado',
        text: "¿Seguro que desea eliminar a la persona?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, hazlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          if(tipo === "empleado"){
            let empleadoId = this.service.obtenerEmpleadoId();

            if(empleadoId === id){
              Swal.fire("Información: ", `No te puedes eliminar a ti mismo`, 'info');
              this.router.navigate(['/personas']);
            }else{
              this.empleadoService.eliminarTodo(id).subscribe(regreso => {
                Swal.fire("Eliminar: ", `Persona eliminada con exito`, 'success');
                this.service.listar().subscribe(retorno => this.personas = retorno);
              }, err =>{
                console.log(err);
                if(err.status){
                  this.error = err.error;
                  Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');

                }
              });
            }
          }else if(tipo === "subscriptor"){
            let subscriptorId = this.service.obtenerSubscriptorId();

            if(subscriptorId === id){
              Swal.fire("Información: ", `No te puedes eliminar a ti mismo`, 'info');
              this.router.navigate(['/personas']);
            }else{
             this.subsService.eliminarTodo(id).subscribe(regreso => {
                Swal.fire("Eliminar: ", `Persona eliminada con exito`, 'success');
                this.service.listar().subscribe(retorno => this.personas = retorno);
              }, err =>{
                console.log(err);
                if(err.status){
                  this.error = err.error;
                  Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.error}, consulte con el administrador `, 'error');
                }
              });
            }
          }
        }
      });
    }else{
      Swal.fire("Informacion: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/indice']);
    }
  }
}
