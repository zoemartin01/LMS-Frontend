import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import {
  AdminAppointmentListComponent
} from "./components/appointment-managment/admin-appointment-list/admin-appointment-list.component";
import { AppComponent } from './app.component';
import {
  AppointmentCreationComponent
} from "./components/appointment-managment/appointment-creation/appointment-creation.component";
import {AppointmentEditComponent} from "./components/appointment-managment/appointment-edit/appointment-edit.component";
import {AppointmentViewComponent} from "./components/appointment-managment/appointment-view/appointment-view.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HwlabRulesComponent } from './components/hwlab-rules/hwlab-rules.component';
import { LoginComponent } from './components/login/login.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import {
  PersonalAppointmentListComponent
} from "./components/appointment-managment/personal-appointment-list/personal-appointment-list.component";
import { RegisterComponent } from './components/register/register.component';
import {
  RoomCalenderViewComponent
} from "./components/appointment-managment/room-calender-view/room-calender-view.component";
import { RoomCreateComponent } from './components/room-managment/create/room-create.component';
import { RoomEditComponent } from './components/room-managment/edit/room-edit.component';
import { RoomListComponent } from './components/room-managment/list/room-list.component';
import { RoomViewComponent } from './components/room-managment/view/room-view.component';
import { SafetyInstructionsComponent } from './components/safety-instructions/safety-instructions.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserViewComponent } from './components/user-management/view/user-view.component';

@NgModule({
  declarations: [
    AdminAppointmentListComponent,
    AppComponent,
    AppointmentCreationComponent,
    AppointmentEditComponent,
    AppointmentViewComponent,
    DashboardComponent,
    EmailVerificationComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    LoginComponent,
    MessageBoxComponent,
    PersonalAppointmentListComponent,
    RegisterComponent,
    RoomCalenderViewComponent,
    RoomCreateComponent,
    RoomEditComponent,
    RoomListComponent,
    RoomViewComponent,
    SafetyInstructionsComponent,
    UserEditComponent,
    UserListComponent,
    UserViewComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
