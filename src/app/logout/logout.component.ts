import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: PersonaService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  public logout(): void{
    this.service.logout();
    //console.log(this.app.isSubscriptor);
    //this.app.isSubscriptor = false;
    //this.app.isEmpleado = false;
    this.router.navigate(['/login']);
  }
}
