import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from "./components/email-verification/email-verification.component";
import { GlobalSettingsComponent} from "./components/global-settings/global-settings.component";
import { HelpFaqComponent } from "./components/help-faq/help-faq.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HwlabRulesComponent } from "./components/hwlab-rules/hwlab-rules.component";
import { LoginComponent } from "./components/login/login.component";
import { MessageBoxComponent } from "./components/message-box/message-box.component";
import { RegisterComponent } from "./components/register/register.component";
import { RoomCreateComponent } from "./components/room-managment/create/room-create.component";
import { RoomEditComponent } from "./components/room-managment/edit/room-edit.component";
import { RoomViewComponent } from "./components/room-managment/view/room-view.component";
import { RoomListComponent } from "./components/room-managment/list/room-list.component";
import { SafetyInstructionsComponent } from "./components/safety-instructions/safety-instructions.component";
import { UserEditComponent } from "./components/user-management/edit/user-edit.component";
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserSettingsComponent } from "./components/settings/user-settings/user-settings.component";
import { UserViewComponent } from "./components/user-management/view/user-view.component";
import { LivecamOverviewComponent } from './components/livecam/overview/livecam-overview.component';
import { LivecamDeleteComponent } from './components/livecam/delete/livecam-delete.component';

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
    path: '/settings',
    canActivate: [AuthGuard],
    component: UserSettingsComponent,
    pathMatch: 'full',
    data: {
      title: 'Account Settings'
    }
  },
  {
    path: 'global-settings',
    canActivate: [AuthGuard, AdminGuard],
    component: GlobalSettingsComponent,
    pathMatch: 'full',
    data: {
      title: 'Global Settings'
    }
  },

  //User Management
  {
    path: 'users',
    canActivate: [AuthGuard, AdminGuard],
    component: UserListComponent,
    pathMatch: 'full',
    data: {
      title: 'User List'
    }
  },
  {
    path: 'user/:id',
    canActivate: [AuthGuard, AdminGuard],
    component: UserViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View User'
    }
  },
  {
    path: 'user/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: UserEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit User'
    }
  },

  //Room Management
  {
    path: 'rooms',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomListComponent,
    pathMatch: 'full',
    data: {
      title: 'Room List'
    }
  },
  {
    path: 'room/:id',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Room'
    }
  },
  {
    path: 'room/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Room'
    }
  },
  {
    path: 'rooms/create',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Room'
    }
  },

  //Appointment Management

  //Inventory & Order Management

  //Livecam
  {
    path: 'livecam',
    canActivate: [AdminGuard],
    component: LivecamOverviewComponent,
    pathMatch: 'full',
    data: {
      title: 'LiveCam Dashboard'
    },
  },
  {
    path: 'livecam/:id/delete',
    canActivate: [AdminGuard],
    component: LivecamDeleteComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
