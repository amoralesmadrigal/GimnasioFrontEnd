import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isEmpleado? = false;
  isSubscriptor? = false;
  isAdministrador? = false;
  isLogged? = false;

  constructor(private personService: PersonaService) { }

  ngOnInit(): void {
    this.isEmpleado = this.personService.isEmpleadoLogued();
    this.isSubscriptor = this.personService.isSubsLogued();

    if(this.isEmpleado || this.isSubscriptor){
      this.isLogged = true;
    }

    this.personService.isAdministrador().subscribe(regreso => this.isAdministrador = regreso);

  }


}
