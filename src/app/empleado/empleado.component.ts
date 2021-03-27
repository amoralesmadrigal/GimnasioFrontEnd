import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleadoForm: FormGroup;
  empleadoBD: Empleado;
  error: any;
  personaId: number;
  empleadoId: number;
  tipoEmpleado :  string[] = ['MONITOR', 'MANAGER', 'ADMINISTRADOR'];

  constructor(private formBuilder: FormBuilder, private service: EmpleadoService, private personaService: PersonaService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initiliaze();
    if(!this.personaService.isEmpleadoLogued()){
      this.router.navigate(["/login"]);
    }else{
       //cuando viene desde registrar
      this.route.paramMap.subscribe(params => {
        this.personaId = +params.get('regresoId');
        console.log('regresoId' + this.personaId);
      });

      //cuando viene desde empleados
      this.route.paramMap.subscribe(params => {
        this.empleadoId = +params.get('id');
        console.log('empleadoId'+ this.empleadoId);
        if(this.empleadoId > 0){
          this.service.mostrar(this.empleadoId).subscribe(regreso =>{
            this.empleadoForm = this.formBuilder.group({
              nombre: [regreso.nombre, Validators.required],
              primerApellido: [regreso.primerApellido, Validators.required],
              segundoApellido: [regreso.segundoApellido, Validators.required],
              documentacion: [regreso.documentacion, Validators.required],
              numeroTelefono: [regreso.numeroTelefono],
              email: [regreso.email],
              fechaNacimiento: [moment(regreso.fechaNacimiento, 'DD/MM/YYYY').toDate()],
              tipoEmpleado: [regreso.tipoEmpleado],
              direccion: this.formBuilder.group({
                ciudad: [regreso.direccion?.ciudad],
                calle: [regreso.direccion?.calle],
                numero: [regreso.direccion?.numero],
                piso: [regreso.direccion?.piso],
                puerta: [regreso.direccion?.puerta],
                codigoPostal:[regreso.direccion?.codigoPostal]
              }),
            });
          });
        }
      });
    }


  }

  public initiliaze(): void{
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      documentacion: ['', Validators.required],
      numeroTelefono: [''],
      email: [''],
      fechaNacimiento: [''],
      tipoEmpleado: ['MONITOR'],
      direccion: this.formBuilder.group({
        ciudad: [''],
        calle: [''],
        numero: [''],
        piso: [''],
        puerta: [''],
        codigoPostal:['']
      }),
    });
  }

  public accion(): void{
    if(this.empleadoId > 0){
      console.log('editar');
      this.editar();
    }else{
      this.guardar();
    }
  }

  public guardar(): void{
    this.patchFechaNacimiento();
    this.service.nuevoConDireccion(this.empleadoForm.value, this.personaId).subscribe(regreso =>{
      this.personaService.guardarEnSession(this.personaService.EMPLEADO_ID, regreso);
      console.log(this.empleadoBD);
      Swal.fire("Nuevo: ", `Empleado creado con exito`, 'success');
      this.router.navigate(["/empleados"]);
    }, err =>{
      console.log(err);
      if(err.status){
        this.error = err.error;
        Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
        this.router.navigate(["/empleados"]);
      }
    });
  }

  public editar(): void{
    this.patchFechaNacimiento();
    this.service.editarEmpleado(this.empleadoForm.value, this.empleadoId).subscribe(regreso =>{
      this.empleadoBD = regreso;
      this.personaService.guardarEnSession(this.personaService.EMPLEADO_ID, regreso.id);
      Swal.fire("Modificación: ", `Empleado modificado con exito`, 'success');
      this.router.navigate(["/empleados"]);
    }, err =>{
      console.log(err);
      if(err.status){
        this.error = err.error;
        Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
        this.router.navigate(["/empleados"]);
      }
    });
  }

  private patchFechaNacimiento():void{
    let dateOfBirth = this.empleadoForm.get('fechaNacimiento').value as Date;
    let fecha = dateOfBirth.toLocaleDateString();
    let fechaArr :string[] = fecha.split('/');

    this.empleadoForm.patchValue({
      'fechaNacimiento' : `${fechaArr[1]}/${fechaArr[0]}/${fechaArr[2]}`
    });
  }

  get nombre(){
    return this.empleadoForm.get("nombre");
  }

  get primerApellido(){
    return this.empleadoForm.get("primerApellido");
  }

  get documentacion(){
    return this.empleadoForm.get("documentacion");
  }

  get fechaNacimiento(){
    return this.empleadoForm.get("fechaNacimiento");
  }

}
