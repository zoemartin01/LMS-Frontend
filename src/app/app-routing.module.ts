import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from "./guards/role-guard.guard";
import { AuthGuard } from "./guards/auth.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  //General
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
    data: {
      title: 'Homepage'
    }
  },
  {
    path: 'help',
    component: HelpFaqComponent,
    pathMatch: 'full',
    data: {
      title: 'Help & FAQ'
    }
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    pathMatch: 'full',
    data: {
      title: 'Dashboard'
    }
  },

  //Authentication
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      title: 'Login'
    }
  },

  //Settings

  //User Management

  //Room Management

  //Appointment Management

  //Inventory & Order Management

  //Livecam
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
