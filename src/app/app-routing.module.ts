import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadFormComponent } from './actividad/actividad-form.component';
import { ActividadComponent } from './actividad/actividad.component';
import { AuthGuard as guard } from './auth.guard';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadosComponent } from './empleado/empleados.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AsignarActividadComponent } from './mis-actividades/asignar-actividad.component';
import { MisActividadesComponent } from './mis-actividades/mis-actividades.component';
import { RegisterComponent } from './register/register.component';
import { SubscriptorComponent } from './subscriptor/subscriptor.component';
import { SubscriptoresComponent } from './subscriptor/subscriptores.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'subscriptores', component: SubscriptoresComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'subscriptor', component: SubscriptorComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'subscriptor/:id', component: SubscriptorComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'subscriptor/nuevo/:regresoId', component: SubscriptorComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'empleados', component: EmpleadosComponent},
  { path: 'empleado', component: EmpleadoComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'empleado/:id', component: EmpleadoComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'empleado/nuevo/:regresoId', component: EmpleadoComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'actividad', component: ActividadComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'actividad/form', component: ActividadFormComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'actividad/form/:id', component: ActividadFormComponent, canActivate: [guard], data: {valorEsperado:[2]} },
  { path: 'misactividades', component: MisActividadesComponent },
  { path: 'misactividades/:id', component: MisActividadesComponent },
  { path: 'misactividades/asignar/:id', component: AsignarActividadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
