import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from '../models/actividad';
import { ActividadService } from '../services/actividad.service';

@Component({
  selector: 'app-asignar-actividad',
  templateUrl: './asignar-actividad.component.html',
  styleUrls: ['./asignar-actividad.component.css']
})
export class AsignarActividadComponent implements OnInit {
  actividadesAsignar : Actividad[] = [];
  mostrarColumnas : string[] = ['nombre','inicio', 'fin'];

  constructor(private service: ActividadService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{

    });
  }

  filtrar(nombre: string): void{
    nombre = nombre !== undefined? nombre.trim(): '';
    if(nombre !== ''){
      this.service.filtrar(nombre).subscribe(regreso => {
        this.actividadesAsignar = regreso;
      });
    }
  }

}
