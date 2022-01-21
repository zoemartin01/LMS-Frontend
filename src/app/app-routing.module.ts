import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { AdminAppointmentListComponent } from "./components/appointment-management/admin-list/admin-appointment-list.component";
import { AdminOrderListComponent } from './components/order-management/admin-list/admin-order-list.component';
import { AppointmentCreateComponent } from "./components/appointment-management/create/appointment-create.component";
import { AppointmentDeleteComponent } from './components/appointment-management/delete/appointment-delete.component';
import { AppointmentEditComponent } from "./components/appointment-management/edit/appointment-edit.component";
import { AppointmentViewComponent } from "./components/appointment-management/view/appointment-view.component";
import { DashboardComponent } from './components/general/dashboard/dashboard.component';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';
import { GlobalSettingsComponent } from './components/settings/global-settings/global-settings.component';
import { HelpFaqComponent } from './components/general/help-faq/help-faq.component';
import { HomepageComponent } from './components/general/homepage/homepage.component';
import { HwlabRulesComponent } from './components/general/hwlab-rules/hwlab-rules.component';
import { InventoryItemCreateComponent } from './components/inventory-management/item-create/inventory-item-create.component';
import { InventoryItemDeleteComponent } from './components/inventory-management/item-delete/inventory-item-delete.component';
import { InventoryItemEditComponent } from './components/inventory-management/item-edit/inventory-item-edit.component';
import { InventoryItemViewComponent } from './components/inventory-management/item-view/inventory-item-view.component';
import { InventoryListComponent } from './components/inventory-management/list/inventory-list.component';
import { InventoryOrderComponent } from './components/order-management/inventory-order/inventory-order.component';
import { LivecamDeleteComponent } from './components/livecam/delete/livecam-delete.component';
import { LivecamOverviewComponent } from './components/livecam/overview/livecam-overview.component';
import { LivecamScheduleComponent } from './components/livecam/schedule/livecam-schedule.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MessageBoxComponent } from './components/general/message-box/message-box.component';
import { OrderDeleteComponent } from './components/order-management/delete/order-delete.component';
import { OrderEditComponent } from './components/order-management/edit/order-edit.component';
import { OrderRequestComponent } from './components/order-management/request/order-request.component';
import { OrderViewComponent } from './components/order-management/view/order-view.component';
import { PersonalAppointmentListComponent } from "./components/appointment-management/list/personal-appointment-list.component";
import { PersonalOrderListComponent } from './components/order-management/list/personal-order-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RoomCalendarViewComponent } from "./components/appointment-management/calendar-view/room-calendar-view.component";
import { RoomCreateComponent } from './components/room-management/create/room-create.component';
import { RoomDeleteComponent } from './components/room-management/delete/room-delete.component';
import { RoomEditComponent } from './components/room-management/edit/room-edit.component';
import { RoomListComponent } from './components/room-management/list/room-list.component';
import { RoomTimeslotsComponent } from './components/room-management/room-timeslots/room-timeslots.component';
import { RoomViewComponent } from './components/room-management/view/room-view.component';
import { SafetyInstructionsComponent } from './components/general/safety-instructions/safety-instructions.component';
import { UserDeleteComponent } from './components/user-management/delete/user-delete.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from './components/user-management/list/user-list.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { UserViewComponent } from './components/user-management/view/user-view.component';
import { WhitelistRetailerCreateComponent } from './components/settings/whitelist-retailer/create/whitelist-retailer-create.component';
import { WhitelistRetailerDeleteComponent } from './components/settings/whitelist-retailer/delete/whitelist-retailer-delete.component';
import { WhitelistRetailerEditComponent } from './components/settings/whitelist-retailer/edit/whitelist-retailer-edit.component';
import { WhitelistRetailerViewComponent } from './components/settings/whitelist-retailer/view/whitelist-retailer-view.component';

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
    path: 'global-settings',
    canActivate: [AuthGuard, AdminGuard],
    component: GlobalSettingsComponent,
    pathMatch: 'full',
    data: {
      title: 'Global Settings'
    }
  },
  {
    path: 'global-settings/whitelist-retailer/:id',
    canActivate: [AuthGuard, AdminGuard],
    component: WhitelistRetailerViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Whitelist-Retailer View'
    }
  },
  {
    path: 'global-settings/whitelist-retailer/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: WhitelistRetailerEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Whitelist-Retailer Edit'
    }
  },
  {
    path: 'global-settings/whitelist-retailer/:id/delete',
    canActivate: [AuthGuard, AdminGuard],
    component: WhitelistRetailerDeleteComponent,
    pathMatch: 'full',
    data: {
      title: 'Whitelist-Retailer Delete'
    }
  },
  {
    path: 'global-settings/whitelist-retailer/create',
    canActivate: [AuthGuard, AdminGuard],
    component: WhitelistRetailerCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Whitelist-Retailer'
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
  {
    path: 'user/:id/delete',
    canActivate: [AuthGuard],
    component: UserDeleteComponent,
    pathMatch: 'full',
    data: {
      title: 'Delete User'
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
    path: 'room/:id/delete',
    canActivate: [AuthGuard, AdminGuard],
    component: RoomDeleteComponent,
    pathMatch: 'full',
    data: {
      title: 'Delete Room'
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
  {
    path: 'room-overview/:room_id/appointment/:id',
    canActivate: [AuthGuard],
    component: AppointmentViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Appointment'
    }
  },
  {
    path: 'room-overview/:room_id/appointment/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: AppointmentEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Appointment'
    }
  },
  {
    path: 'room-overview/:room_id/appointment/:id/delete',
    canActivate: [AuthGuard],
    component: AppointmentDeleteComponent,
    pathMatch: 'full',
    data: {
      title: 'Delete Appointment'
    }
  },
  {
    path: 'room-overview/:room_id/appointments/create',
    canActivate: [AuthGuard],
    component: AppointmentCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Appointment'
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
    path: 'inventory/item/:id',
    canActivate: [AuthGuard],
    component: InventoryItemViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Inventory Item'
    }
  },
  {
    path: 'inventory/item/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: InventoryItemEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Inventory Item'
    }
  },
  {
    path: 'inventory/items/create',
    canActivate: [AuthGuard, AdminGuard],
    component: InventoryItemCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Inventory Item'
    }
  },
  {
    path: 'inventory/items/:id/delete',
    canActivate: [AuthGuard, AdminGuard],
    component: InventoryItemDeleteComponent,
    pathMatch: 'full',
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
    path: 'order/:id',
    canActivate: [AuthGuard],
    component: OrderViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Order'
    }
  },
  {
    path: 'order/:id/delete',
    canActivate: [AuthGuard],
    component: OrderDeleteComponent,
    pathMatch: 'full',
    data: {
      title: 'Delete Order'
    }
  },
  {
    path: 'order/:id/edit',
    canActivate: [AuthGuard],
    component: OrderEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Order'
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
  {
    path: 'orders/request',
    canActivate: [AuthGuard],
    component: OrderRequestComponent,
    pathMatch: 'full',
    data: {
      title: 'Request Order'
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
  {
    path: 'livecam/schedule/:id/delete',
    canActivate: [AdminGuard],
    component: LivecamDeleteComponent,
    pathMatch: 'full',
  },
  {
    path: 'livecam/schedule',
    canActivate: [AdminGuard],
    component: LivecamScheduleComponent,
    pathMatch: 'full',
    data: {
      title: 'LiveCam Schedule'
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
