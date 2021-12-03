import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role-guard.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HwlabRulesComponent } from "./components/hwlab-rules/hwlab-rules.component";
import { LoginComponent } from "./components/login/login.component";
import { MessageBoxComponent } from "./components/message-box/message-box.component";
import { SafetyInstructionsComponent } from "./components/safety-instructions/safety-instructions.component";

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
    path: 'hwlab-rules',
    component: HwlabRulesComponent,
    pathMatch: 'full',
    data: {
      title: 'Hardware-Lab Rules'
    }
  },
  {
    path: 'safety-instructions',
    component: SafetyInstructionsComponent,
    pathMatch: 'full',
    data: {
      title: 'Safety Instructions'
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
  {
    path: 'message-box',
    canActivate: [AuthGuard],
    component: MessageBoxComponent,
    pathMatch: 'full',
    data: {
      title: 'Message Box'
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
