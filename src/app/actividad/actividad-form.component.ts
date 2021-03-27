import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../models/actividad';
import { ActividadService } from '../services/actividad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.css']
})
export class ActividadFormComponent implements OnInit {
  title = "Nueva Actividad";
  actividadForm : FormGroup;
  actividadBD : Actividad;
  error: any;
  id: number;

  constructor(private fb: FormBuilder, private service: ActividadService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialize();
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      if(this.id){
        this.title = "Editar Actividad";
        this.service.mostrar(this.id).subscribe(regreso => {

          this.actividadForm = this.fb.group({
            "nombre" : [regreso.nombre, Validators.required],
            "duracion": [regreso.duracion, Validators.required],
            "inicio": [regreso.inicio, Validators.required],
            "fin": [regreso.fin, Validators.required],
            "aforoMaximo": [regreso.aforoMaximo, Validators.required],
            "lleno": [regreso.lleno]
          });
        });
      }
    });

  }

  public initialize(): void{
    this.actividadForm = this.fb.group({
      "nombre" : ['', Validators.required],
      "duracion": ['', Validators.required],
      "inicio": ['', Validators.required],
      "fin": ['', Validators.required],
      "aforoMaximo": ['', Validators.required],
      "lleno": [false]
    });
  }

  public accion(): void{

    if(this.id){
      this.editar();
    }else{
      this.guardar();
    }
  }

  public guardar():void{
    this.service.nuevo(this.actividadForm.value).subscribe(regreso => {
      this.actividadBD = regreso
      Swal.fire("Nuevo: ", `Actividad ${this.actividadBD.nombre} creado con exito`, 'success');
      this.router.navigate(["/actividad"]);
    }, err =>{
      if(err.status === 403 || err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar():void{
    this.service.editarActividad(this.actividadForm.value, this.id).subscribe(regreso => {
      this.actividadBD = regreso
      Swal.fire("Modificación: ", `Actividad ${this.actividadBD.nombre} modificado con exito`, 'success');
      this.router.navigate(["/actividad"]);
    }, err =>{
      if(err.status === 403 || err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  get nombre(){
    return this.actividadForm.get("nombre");
  }

  get duracion(){
    return this.actividadForm.get("duracion");
  }

  get inicio(){
    return this.actividadForm.get("inicio");
  }

  get fin(){
    return this.actividadForm.get("fin");
  }

  get aforoMaximo(){
    return this.actividadForm.get("aforoMaximo");
  }
}
