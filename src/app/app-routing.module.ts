import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from "./guards/role-guard.guard";
import { AuthGuard } from "./guards/auth.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: HelpFaqComponent,
    pathMatch: 'full',
    data: {
      title: 'Help & FAQ'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      title: 'Login'
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
