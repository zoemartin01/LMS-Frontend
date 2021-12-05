import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role-guard.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from "./components/email-verification/email-verification.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HwlabRulesComponent } from "./components/hwlab-rules/hwlab-rules.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SafetyInstructionsComponent } from "./components/safety-instructions/safety-instructions.component";
import { UserEditComponent } from "./components/user-management/edit/user-edit.component";
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserViewComponent } from "./components/user-management/view/user-view.component";
import { RetailerViewComponent } from "./components/whitelist-retailer/view/retailer-view.component";
import { RetailerEditComponent} from "./components/whitelist-retailer/edit/retailer-edit.component";
import { RetailerCreationComponent} from "./components/whitelist-retailer/creation/retailer-creation.component";

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

  //Authentication
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    data: {
      title: 'Register'
    }
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent,
    pathMatch: 'full',
    data: {
      title: 'Verify Email'
    }
  },

  //Settings

  {
    path: 'retailer/:id',
    component: RetailerViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer View'
    }
  },

  {
    path: 'retailer/:id/edit',
    component: RetailerEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer Edit'
    }
  },


  {
    path: 'retailer-creation',
    component: RetailerCreationComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer Creation'
    }
  },

  //User Management
  {
    path: 'users',
    component: UserListComponent,
    pathMatch: 'full',
    data: {
      title: 'User List'
    }
  },
  {
    path: 'user/:id',
    component: UserViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View User'
    }
  },
  {
    path: 'user/:id/edit',
    component: UserEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit User'
    }
  },

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
