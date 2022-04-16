import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personaForm : FormGroup;
  personaBD : Persona;
  error : any;
  personaId: number;
  usernameParam: string;
  isAdministrador : boolean = false;


  constructor(private formBuilder: FormBuilder, private service: PersonaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.personaId = +params.get('id');
      this.usernameParam = params.get('username');
    });
    this.initiliaze();


    if(this.personaId == 0){
      this.personaId = this.service.obtenerPersonaId();
      this.service.mostrar(this.personaId).subscribe(regreso =>{
        this.usernameParam = regreso.username;
        this.personaForm.patchValue({
          username : regreso.username,
          password : regreso.password,
          confirmPassword : regreso.confirmPassword
        })
      }, err =>{
        console.log(err);
        if(err.status){
          Swal.fire("Error: ", `Ha ocurrido el siguiente error ${this.error.error}`, 'error');
        }
      });
    }
  }

  initiliaze(){
    this.personaForm  =this.formBuilder.group({
       username : [{value : this.usernameParam, disabled : true}],
       password: ['', Validators.required],
       confirmPassword : ['', Validators.required]
    });
  }

  actualizar():void{
    let persona = new Persona();
    persona.username = this.usernameParam;
    persona.password = this.personaForm.get("password").value;
    persona.confirmPassword = this.personaForm.get("confirmPassword").value;

    this.service.updatePassword(this.personaId, persona).subscribe(regreso =>{
      Swal.fire("Modificación: ", `Persona modificada con exito`, 'success');

      this.esAdministrador();

    }, err =>{
      console.log(err);
      if(err.status){
        this.error = err.error;

        if(this.error.password){
          Swal.fire("Error: ", `Ha ocurrido el siguiente error ${this.error.password}`, 'error');
        }else{
          Swal.fire("Error: ", `Ha ocurrido el siguiente error ${this.error.error}, consulte con el administrador `, 'error');
          this.esAdministrador();
        }

      }
    });
  }

  private esAdministrador():void{
    this.service.isAdministrador().subscribe(regreso =>{
      this.isAdministrador = regreso
    });

    if(this.isAdministrador){
      this.router.navigate(["/personas"]);
    }else{
      this.router.navigate(["/inicio"]);
    }
  }

  get password(){
    return this.personaForm.get("password");
  }

  get confirmPassword(){
    return this.personaForm.get("confirmPassword");
  }

}
