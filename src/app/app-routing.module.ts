import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { AdminOrderListComponent } from './components/order-management/admin-order-list/admin-order-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/order-management/edit/edit.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HwlabRulesComponent } from './components/hwlab-rules/hwlab-rules.component';
import { InventoryOrderComponent } from './components/inventory-management/inventory-order/inventory-order.component';
import { ItemCreateComponent } from './components/inventory-management/item-create/item-create.component';
import { ItemEditComponent } from './components/inventory-management/item-edit/item-edit.component';
import { ItemViewComponent } from './components/inventory-management/item-view/item-view.component';
import { ListComponent } from './components/inventory-management/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { OrderViewComponent } from './components/order-management/view/order-view.component';
import { PersonalOrderListComponent } from './components/order-management/personal-order-list/personal-order-list.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestCreationComponent } from './components/order-management/request-creation/request-creation.component';
import { RetailerCreateComponent } from './components/whitelist-retailer/create/retailer-create.component';
import { RetailerEditComponent } from './components/whitelist-retailer/edit/retailer-edit.component';
import { RetailerViewComponent } from './components/whitelist-retailer/view/retailer-view.component';
import { RoomCreateComponent } from './components/room-managment/create/room-create.component';
import { RoomEditComponent } from './components/room-managment/edit/room-edit.component';
import { RoomListComponent } from './components/room-managment/list/room-list.component';
import { RoomViewComponent } from './components/room-managment/view/room-view.component';
import { SafetyInstructionsComponent } from './components/safety-instructions/safety-instructions.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from './components/user-management/list/user-list.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { UserViewComponent } from './components/user-management/view/user-view.component';

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
    path: 'global-settings/retailer/:id',
    canActivate: [AuthGuard, AdminGuard],
    component: RetailerViewComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer View'
    }
  },
  {
    path: 'global-settings/retailer/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: RetailerEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer Edit'
    }
  },
  {
    path: 'global-settings/retailer/create',
    canActivate: [AuthGuard, AdminGuard],
    component: RetailerCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Retailer Creation'
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
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    component: ListComponent,
    pathMatch: 'full',
    data: {
      title: 'Inventory'
    }
  },
  {
    path: 'inventory/item/:id',
    canActivate: [AuthGuard],
    component: ItemViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Inventory Item'
    }
  },
  {
    path: 'inventory/item/:id/edit',
    canActivate: [AuthGuard, AdminGuard],
    component: ItemEditComponent,
    pathMatch: 'full',
    data: {
      title: 'Edit Inventory Item'
    }
  },
  {
    path: 'inventory/item/create',
    canActivate: [AuthGuard, AdminGuard],
    component: ItemCreateComponent,
    pathMatch: 'full',
    data: {
      title: 'Create Inventory Item'
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
    path: 'order/:id',
    canActivate: [AuthGuard],
    component: OrderViewComponent,
    pathMatch: 'full',
    data: {
      title: 'View Order'
    }
  },
  {
    path: 'order/:id/edit',
    canActivate: [AuthGuard],
    component: EditComponent,
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
    path: 'orders/create',
    canActivate: [AuthGuard],
    component: RequestCreationComponent,
    pathMatch: 'full',
    data: {
      title: 'Request Order'
    }
  },

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
