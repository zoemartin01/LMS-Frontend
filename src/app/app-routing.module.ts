import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';

import {AdminAppointmentListComponent} from "./components/appointment-management/admin-list/admin-appointment-list.component";
import {AdminOrderListComponent} from './components/order-management/admin-list/admin-order-list.component';
import {DashboardComponent} from './components/general/dashboard/dashboard.component';
import {EmailVerificationComponent} from './components/auth/email-verification/email-verification.component';
import {GlobalSettingsComponent} from './components/settings/global-settings/global-settings.component';
import {HelpFaqComponent} from './components/general/help-faq/help-faq.component';
import {HomepageComponent} from './components/general/homepage/homepage.component';
import {HwlabRulesComponent} from './components/general/hwlab-rules/hwlab-rules.component';
import {InventoryListComponent} from './components/inventory-management/list/inventory-list.component';
import {InventoryOrderComponent} from './components/order-management/inventory-order/inventory-order.component';
import {LivecamOverviewComponent} from './components/livecam/overview/livecam-overview.component';
import {LoginComponent} from './components/auth/login/login.component';
import {MessageBoxComponent} from './components/general/message-box/message-box.component';
import {PersonalAppointmentListComponent} from "./components/appointment-management/list/personal-appointment-list.component";
import {PersonalOrderListComponent} from './components/order-management/list/personal-order-list.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {RoomCalendarViewComponent} from "./components/appointment-management/calendar-view/room-calendar-view.component";
import {RoomListComponent} from './components/room-management/list/room-list.component';
import {RoomTimeslotsComponent} from './components/room-management/room-timeslots/room-timeslots.component';
import {SafetyInstructionsComponent} from './components/general/safety-instructions/safety-instructions.component';
import {UserListComponent} from './components/user-management/list/user-list.component';
import {UserSettingsComponent} from './components/settings/user-settings/user-settings.component';

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
    path: 'register/verify-email',
    component: EmailVerificationComponent,
    pathMatch: 'full',
    data: {
      title: 'Verify Email'
    }
  },
  {
    path: 'register/verify-email/:userId/:token',
    component: EmailVerificationComponent,
    pathMatch: 'full',
    data: {
      title: 'Verify Email'
    }
  },

  //Settings
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: UserSettingsComponent,
    pathMatch: 'full',
    data: {
      title: 'Account Settings'
    }
  },
  {
    path: 'application-settings',
    canActivate: [AuthGuard, AdminGuard],
    component: GlobalSettingsComponent,
    pathMatch: 'full',
    data: {
      title: 'Application Settings'
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
    path: 'room/:id/edit-timeslots',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomTimeslotsComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Timeslots'
    }
  },

  //Appointment Management
  {
    path: 'room-overview',
    canActivate: [AuthGuard],
    component: RoomCalendarViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Room Overview'
    }
  },
  {
    path: 'room-overview/:id',
    canActivate: [AuthGuard],
    component: RoomCalendarViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Room Overview'
    }
  },
  {
    path: 'appointments',
    canActivate: [AuthGuard],
    component: PersonalAppointmentListComponent,
    pathMatch: 'full',
    data: {
      title: 'My Appointments'
    }
  },
  {
    path: 'appointments/all',
    canActivate: [AuthGuard, AdminGuard],
    component: AdminAppointmentListComponent,
    pathMatch: 'full',
    data: {
      title: 'All Appointments'
    }
  },

  //Inventory & Order Management
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    component: InventoryListComponent,
    pathMatch: 'full',
    data: {
      title: 'Inventory'
    }
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    component: PersonalOrderListComponent,
    pathMatch: 'full',
    data: {
      title: 'My Orders'
    }
  },
  {
    path: 'orders/all',
    canActivate: [AuthGuard, AdminGuard],
    component: AdminOrderListComponent,
    pathMatch: 'full',
    data: {
      title: 'All Orders'
    }
  },
  {
    path: 'order/:id/inventory',
    canActivate: [AuthGuard, AdminGuard],
    component: InventoryOrderComponent,
    pathMatch: 'full',
    data: {
      title: 'Inventory Order'
    }
  },

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
