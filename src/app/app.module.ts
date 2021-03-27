import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { SubscriptorComponent } from './subscriptor/subscriptor.component';
import { ActividadComponent } from './actividad/actividad.component';
import { LogoutComponent } from './logout/logout.component';
import { MisActividadesComponent } from './mis-actividades/mis-actividades.component';
import { ActividadFormComponent } from './actividad/actividad-form.component';
import { SubscriptoresComponent } from './subscriptor/subscriptores.component';
import { EmpleadosComponent } from './empleado/empleados.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxMomentDateModule } from '@angular-material-components/moment-adapter';
import { AsignarActividadComponent } from './mis-actividades/asignar-actividad.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmpleadoComponent,
    SubscriptorComponent,
    ActividadComponent,
    LogoutComponent,
    MisActividadesComponent,
    ActividadFormComponent,
    SubscriptoresComponent,
    EmpleadosComponent,
    AsignarActividadComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    NgxMomentDateModule
  ],
  providers: [{
    provide: MAT_DATE_FORMATS,
    useValue: MY_FORMATS
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
