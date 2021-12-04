import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from './components/login/login.component';
import {
  AdminAppointmentListComponent
} from "./components/appointment-managment/admin-appointment-list/admin-appointment-list.component";
import {
  AppointmentCreationComponent
} from "./components/appointment-managment/appointment-creation/appointment-creation.component";
import {AppointmentEditComponent} from "./components/appointment-managment/appointment-edit/appointment-edit.component";
import {AppointmentViewComponent} from "./components/appointment-managment/appointment-view/appointment-view.component";
import {
  PersonalAppointmentListComponent
} from "./components/appointment-managment/personal-appointment-list/personal-appointment-list.component";
import {
  RoomCalenderViewComponent
} from "./components/appointment-managment/room-calender-view/room-calender-view.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminAppointmentListComponent,
    AppointmentCreationComponent,
    AppointmentEditComponent,
    AppointmentViewComponent,
    PersonalAppointmentListComponent,
    RoomCalenderViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
