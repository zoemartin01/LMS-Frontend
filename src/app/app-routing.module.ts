import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from "./components/email-verification/email-verification.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HwlabRulesComponent } from "./components/hwlab-rules/hwlab-rules.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { RoomCreateComponent } from "./components/room-managment/create/room-create.component";
import { RoomEditComponent } from "./components/room-managment/edit/room-edit.component";
import { RoomViewComponent } from "./components/room-managment/view/room-view.component";
import { RoomListComponent } from "./components/room-managment/list/room-list.component";
import { SafetyInstructionsComponent } from "./components/safety-instructions/safety-instructions.component";
import { UserEditComponent } from "./components/user-management/edit/user-edit.component";
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserViewComponent } from "./components/user-management/view/user-view.component";

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
  {
    path: 'rooms',
    component: RoomListComponent,
    pathMatch: 'full',
    data: {
      title: 'Room List'
    }
  },
  {
    path: 'room/:id',
    component: RoomViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Room'
    }
  },
  {
    path: 'room/:id/edit',
    component: RoomEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Room'
    }
  },
  {
    path: 'rooms/create',
    component: RoomCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Room'
    }
  },

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
