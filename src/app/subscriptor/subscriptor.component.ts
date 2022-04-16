import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriptor } from '../models/subscriptor';
import { PersonaService } from '../services/persona.service';
import { SubscriptorService } from '../services/subscriptor.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import Swal from 'sweetalert2';

const moment = _moment;


@Component({
  selector: 'app-subscriptor',
  templateUrl: './subscriptor.component.html',
  styleUrls: ['./subscriptor.component.css']
})
export class SubscriptorComponent implements OnInit {
  subscriptorForm: FormGroup;
  subscriptorBD: Subscriptor;
  error: any;
  date = new Date();
  subscriptorId: number;
  personaId: number;
  title = "Nuevo Subscriptor";
  tiposInscripcion :  string[] = ['MENSUAL', 'TRIMENSTRAL' , 'SEMESTRAL' , 'ANUAL'];
  isAdministrador?: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: SubscriptorService,
              private personService: PersonaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initiliaze();

    if(!this.personService.isSubsLogued()){
      this.router.navigate(["/login"]);
    }else{

      this.route.paramMap.subscribe(params => {
        this.personaId = +params.get('regresoId');
        console.log("personaId->"+this.personaId);

        //edicion
        this.subscriptorId = +params.get('id');
        console.log("subscriptorId->" + this.subscriptorId);
          if(this.subscriptorId > 0){
            this.personService.isAdministrador().subscribe(regreso =>{
              this.isAdministrador = regreso;
            });

            this.service.mostrar(this.subscriptorId).subscribe(regreso => {
              this.title = "Editar Subscriptor";

              this.subscriptorForm = this.formBuilder.group({
                nombre: [regreso.nombre, Validators.required],
                primerApellido: [regreso.primerApellido, Validators.required],
                segundoApellido: [regreso.segundoApellido, Validators.required],
                documentacion: [regreso.documentacion, Validators.required],
                numeroTelefono: [regreso.numeroTelefono],
                email: [regreso.email],
                fechaNacimiento: [moment(regreso.fechaNacimiento, 'DD/MM/YYYY').toDate()],
                status: [regreso.status],
                tipoInscripcion: [regreso.tipoInscripcion],
                direccion: this.formBuilder.group({
                  ciudad: [regreso.direccion.ciudad],
                  calle: [regreso.direccion.calle],
                  numero: [regreso.direccion.numero],
                  piso: [regreso.direccion.piso],
                  puerta: [regreso.direccion.puerta],
                  codigoPostal:[regreso.direccion.codigoPostal]
                })
              });
            }, err =>{
              console.log(err);
              if(err.status){
                this.error = err.error;
                Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
                this.router.navigate(["/inicio"]);
              }
            });
          }


      });
    }

  }

  public initiliaze(): void{
    this.subscriptorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      documentacion: ['', Validators.required],
      numeroTelefono: [''],
      email: [''],
      fechaNacimiento: [this.date],
      status: [''],
      tipoInscripcion: ['MENSUAL'],
      direccion: this.formBuilder.group({
        ciudad: [''],
        calle: [''],
        numero: [''],
        piso: [''],
        puerta: [''],
        codigoPostal:['']
      })
    });
  }

  public guardar(): void{
    this.patchFechaNacimiento();

    this.service.nuevoConDireccion(this.subscriptorForm.value, this.personaId).subscribe(regreso =>{
        this.subscriptorBD = regreso;
        console.log(this.subscriptorBD);
        this.personService.guardarEnSession(this.personService.SUBSCRIPTOR_ID, this.subscriptorBD.id);
        Swal.fire("Nuevo: ", `Subscriptor creado con exito`, 'success');
        this.router.navigate(["/subscriptores"]);
      }, err =>{
        console.log(err);
        if(err.status){
          this.error = err.error;
          Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
          this.router.navigate(["/subscriptores"]);
        }
    });
  }

  public accion(): void{
    if(this.subscriptorId > 0){
      console.log('editar');
      this.editar();
    }else{
      console.log('guardar');
      this.guardar();
    }
  }

  public editar(): void{

    this.patchFechaNacimiento();
    console.log(this.subscriptorForm.get('fechaNacimiento').value);
    this.service.editarSubscriptor(this.subscriptorForm.value, this.subscriptorId).subscribe(regreso =>{
      this.subscriptorBD = regreso;
      console.log(this.subscriptorBD);
      Swal.fire("Modificación: ", `Subscriptor modificado con exito`, 'success');
      this.router.navigate(["/subscriptores"]);
    }, err =>{
      console.log(err);
      if(err.status){
        this.error = err.error;
        Swal.fire("Error: ", `Ha ocurrido el siguiente error ${err.status}, consulte con el administrador `, 'error');
        this.router.navigate(["/subscriptores"]);
      }
    });
  }

  private patchFechaNacimiento():void{
    let dateOfBirth = this.subscriptorForm.get('fechaNacimiento').value as Date;
    let fecha = dateOfBirth.toLocaleDateString();
    let fechaArr :string[] = fecha.split('/');

    this.subscriptorForm.patchValue({
      'fechaNacimiento' : `${fechaArr[1]}/${fechaArr[0]}/${fechaArr[2]}`
    });
  }

  get nombre(){
    return this.subscriptorForm.get("nombre");
  }

  get primerApellido(){
    return this.subscriptorForm.get("primerApellido");
  }

  get documentacion(){
    return this.subscriptorForm.get("documentacion");
  }

  get fechaNacimiento(){
    return this.subscriptorForm.get("fechaNacimiento");
  }

}
