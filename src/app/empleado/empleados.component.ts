import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  titulo = "Empleados";
  empleados: Empleado[] = [];
  error: any;
  isAdministrador? = false;

  constructor(private service: EmpleadoService, private personService: PersonaService,
    private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.personService.isEmpleadoLogued()){
      this.personService.isAdministrador().subscribe(regreso =>{
        this.isAdministrador = regreso
      });
      this.service.listar().subscribe(regreso => {this.empleados = regreso},
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

  buscarEmpleado(nombre: string){
    if(this.personService.isEmpleadoLogued()){

      nombre = nombre !== undefined ? nombre.trim() : "";
      if( nombre != ""){
        this.service.filtrar(nombre).subscribe(regreso => {
          this.empleados = regreso
        }, err =>{
          if(err?.status){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
      }else{
        this.service.listar().subscribe(regreso => this.empleados = regreso);
      }


    }else{
      Swal.fire("Informacion: ", `Usted no es un administrador; acceso denegado`, 'error');
      this.router.navigate(['/login']);
    }
  }

  public eliminar(idEmpleado : number): void{

    Swal.fire({
      title: 'Cuidado',
      text: "¿Seguro que desea eliminar al empleado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, hazlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarTodo(idEmpleado).subscribe(regreso => {
          Swal.fire("Eliminar: ", `Empleado eliminado con exito`, 'success');
          this.service.listar().subscribe(retorno => this.empleados = retorno);
        }, err =>{
          console.log(err);
          if(err.status){
            this.error = err.error;
            Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
            this.router.navigate(["/empleados"]);
          }
        });
      }
    });
  }

}
