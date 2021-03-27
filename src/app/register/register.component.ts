import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: any;

  constructor(private formBuilder: FormBuilder, private service: PersonaService,
              private router: Router) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      tipoPersona: ['0']//Para empleado
    });
  }

  get username(){
    return this.registerForm.get("username");
  }

  get password(){
    return this.registerForm.get("password");
  }

  get confirmPassword(){
    return this.registerForm.get("confirmPassword");
  }

  public signup(){

    this.service.signup(this.registerForm.value).subscribe(regresoId => {
      this.service.guardarEnSession(this.service.PERSONA_ID, regresoId);

      //Empleado
      if(this.registerForm.get('tipoPersona').value === '0'){
        //this.app.isEmpleado = true;
        this.router.navigate(['/empleado/nuevo', regresoId]);
      }
      //Subscriptor
      else if(this.registerForm.get('tipoPersona').value === '1'){
        //this.app.isSubscriptor = true;
        this.router.navigate(['/subscriptor/nuevo', regresoId]);
      }
    }, err =>{

      if(err.status === 403 || err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });

  }
}
