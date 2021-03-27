import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriptor } from '../models/subscriptor';
import { PersonaService } from '../services/persona.service';
import { SubscriptorService } from '../services/subscriptor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subscriptores',
  templateUrl: './subscriptores.component.html',
  styleUrls: ['./subscriptores.component.css']
})
export class SubscriptoresComponent implements OnInit {
  titulo = "Subscriptores";
  subscriptores: Subscriptor[] = [];
  error: any;
  isAdministrador? = false;
  constructor(private service: SubscriptorService, private personService: PersonaService,
              private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.personService.isEmpleadoLogued()){

      this.personService.isAdministrador().subscribe(regreso =>{
        this.isAdministrador = regreso
      });

      this.service.listar().subscribe(regreso => this.subscriptores = regreso);
    }else{
      Swal.fire("Informacion: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }
  }

  public eliminar(idSubscriptor : number): void{

    Swal.fire({
      title: 'Cuidado',
      text: "¿Seguro que desea eliminar al subscriptor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, hazlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarTodo(idSubscriptor).subscribe(regreso => {
          Swal.fire("Eliminar: ", `Subscriptor eliminado con exito`, 'success');
          this.service.listar().subscribe(retorno => this.subscriptores = retorno);
        }, err =>{
          if(err.status === 403 || err.status === 400 || err.status === 500){
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });
  }

  buscarSubscriptor(nombre: string){
    if(this.personService.isEmpleadoLogued()){
      nombre = nombre !== undefined ? nombre.trim() : "";
      if( nombre != ""){
        this.service.filtrar(nombre).subscribe(regreso => {
          this.subscriptores = regreso
        }, err =>{
          if(err.status === 403 || err.status === 400 || err.status === 503){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
      }else{
        this.service.listar().subscribe(regreso => this.subscriptores = regreso);
      }

    }else{
      Swal.fire("Información: ", `Usted no es un subscriptor; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }
  }

}
