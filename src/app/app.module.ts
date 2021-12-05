import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HwlabRulesComponent } from './components/hwlab-rules/hwlab-rules.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SafetyInstructionsComponent } from './components/safety-instructions/safety-instructions.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserViewComponent } from './components/user-management/view/user-view.component';
import { RetailerViewComponent } from './components/whitelist-retailer/view/retailer-view.component';
import { RetailerEditComponent } from './components/whitelist-retailer/edit/retailer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmailVerificationComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    LoginComponent,
    RegisterComponent,
    SafetyInstructionsComponent,
    UserEditComponent,
    UserListComponent,
    UserViewComponent,
    RetailerViewComponent,
    RetailerEditComponent,
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
