import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import Swal from 'sweetalert2';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  id: number;
  personaRegreso : Persona;
  error: any;

  constructor(private formBuilder: FormBuilder, private service: PersonaService, private router: Router) { }

  ngOnInit(): void {

   this.initialize();

   if(this.service.isPersonaLogued()){
    this.router.navigate(['/inicio']);
   }else{
    this.router.navigate(['/login']);
   }

  }

  initialize() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',  Validators.required]
    });
  }

  get username(){
    return this.loginForm.get("username");
  }

  get password(){
    return this.loginForm.get("password");
  }

  public login(){
    this.service.login(this.loginForm.value).subscribe(regreso => {
      this.personaRegreso = regreso;
      this.service.logout();
      if(this.personaRegreso.subscriptorId){
        this.id = this.personaRegreso.subscriptorId.id;
        this.service.guardarEnSession(this.service.SUBSCRIPTOR_ID, this.id);
        this.service.guardarEnSession(this.service.PERSONA_ID, this.personaRegreso.id);
        //this.app.isSubscriptor = true;
        this.router.navigate(['/misactividades', this.id]);

      }else if(this.personaRegreso.empleadoId){
        this.id = this.personaRegreso.empleadoId.id;
        this.service.guardarEnSession(this.service.EMPLEADO_ID, this.id);
        this.service.guardarEnSession(this.service.PERSONA_ID, this.personaRegreso.id);
        //this.app.isEmpleado = true;
        this.router.navigate(['/inicio']);
      }


    }, err =>{

      if(err.status === 403 || err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });


  }

}
