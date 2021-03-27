import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../models/actividad';
import { Subscriptor } from '../models/subscriptor';
import { SubscriptorActividad } from '../models/subscriptor-actividad';
import { ActividadService } from '../services/actividad.service';
import { PersonaService } from '../services/persona.service';
import { SubscriptorService } from '../services/subscriptor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {
  tituloTab1 = "Mis Actividades";
  tituloTab2 = "Actividades";
  personaId: number;
  actividades: Actividad[] = [];
  misActividades: Actividad[] = [];
  subscriptorActividad: SubscriptorActividad[] = [];
  subscriptorBD: Subscriptor;
  error: any;
  tabIndex = 0;

  constructor(private service: ActividadService, private personService: PersonaService,
              private subscriptorService: SubscriptorService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //recuperar id por parametro
    this.route.paramMap.subscribe(params => this.personaId = +params.get('id'));

    if (this.personService.isSubsLogued()) {
      //obtener la lista de actividades
      this.service.listar().subscribe(regreso => {
        this.actividades = regreso;

        this.subscriptorService.mostrar(this.personService.obtenerSubscriptorId()).subscribe(regreso => {

            if (regreso.subscriptorActividad?.length > 0) {
              let contador = 0;
              regreso.subscriptorActividad.forEach(sa => {
                this.actividades.map(act => {
                  if (act.id == sa.actividadId) {
                    this.misActividades[contador++] = act;
                  }
                });
              });
            }
          }, err =>{
            if(err.status === 403 || err.status === 400 || err.status === 503){
              this.error = err.error;
              console.log(this.error);
              Swal.fire("Error: ", `Consulte al administrador`, 'error');
            }
          });
      }, err =>{
        if(err.status === 403 || err.status === 400 || err.status === 503){
          this.error = err.error;
          console.log(this.error);
          Swal.fire("Error: ", `Consulte al administrador`, 'error');
        }
      });
    } else {
      Swal.fire("Informacion: ", `Usted no es un subscriptor; entre como subscriptor`, 'error');
      this.router.navigate(['/login']);
    }
  }

  public eliminar(idActividad: number): void {
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
        let actividadesEliminar : number[] = [];
        actividadesEliminar.push(idActividad)
        this.subscriptorService.editarActividadesSubscriptor(actividadesEliminar, this.personService.obtenerSubscriptorId()).subscribe(regreso =>{
          this.misActividades = [];

        if (regreso.subscriptorActividad?.length > 0) {
          let contador = 0;
          regreso.subscriptorActividad.forEach(sa => {
            this.actividades.map(act => {
              if (act.id == sa.actividadId) {
                this.misActividades[contador++] = act;
              }
            });
          });
        }
        }, err =>{
          if(err.status === 403 || err.status === 400 || err.status === 503){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
      }
    });
  }

  public asignarActividad(idActividad: number): void {

    const actividad = this.misActividades.find(act => act.id === idActividad);
    if(actividad){
      Swal.fire("Cuidado: ", `Ya tienes ${actividad.nombre} agregada; por favor selecciona otra`, 'info');
    }else{
      this.subscriptorService.asignarActividad(this.personService.obtenerSubscriptorId(), idActividad).subscribe(
        regreso => {
          this.subscriptorBD = regreso;

          if (regreso.subscriptorActividad?.length > 0) {
            let contador = 0;
            regreso.subscriptorActividad.forEach(sa => {
              this.actividades.map(act => {
                if (act.id == sa.actividadId) {
                  this.misActividades[contador++] = act;
                }
              });
            });
          }

          this.tabIndex = 0;
        }, err =>{
          if(err.status === 403 || err.status === 400 || err.status === 503){
            this.error = err.error;
            console.log(this.error);
            Swal.fire("Error: ", `Consulte al administrador`, 'error');
          }
        });
      }
  }
}
