import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AdminOrderListComponent } from './components/order-management/admin-order-list/admin-order-list.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderEditComponent } from './components/order-management/edit/order-edit.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { GlobalSettingsComponent } from './components/settings/global-settings/global-settings.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HwlabRulesComponent } from './components/hwlab-rules/hwlab-rules.component';
import { InventoryOrderComponent } from './components/inventory-management/inventory-order/inventory-order.component';
import { InventoryItemCreateComponent } from './components/inventory-management/item-create/inventory-item-create.component';
import { InventoryItemEditComponent } from './components/inventory-management/item-edit/inventory-item-edit.component';
import { InventoryItemViewComponent } from './components/inventory-management/item-view/inventory-item-view.component';
import { InventoryListComponent } from './components/inventory-management/list/inventory-list.component';
import { LoginComponent } from './components/login/login.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { OrderViewComponent } from './components/order-management/view/order-view.component';
import { PersonalOrderListComponent } from './components/order-management/personal-order-list/personal-order-list.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderRequestComponent } from './components/order-management/request-creation/order-request.component';
import { WhitelistRetailerCreateComponent } from './components/settings/global-settings/whitelist-retailer/create/whitelist-retailer-create.component';
import { WhitelistRetailerEditComponent } from './components/settings/global-settings/whitelist-retailer/edit/whitelist-retailer-edit.component';
import { WhitelistRetailerViewComponent } from './components/settings/global-settings/whitelist-retailer/view/whitelist-retailer-view.component';
import { RoomCreateComponent } from './components/room-managment/create/room-create.component';
import { RoomEditComponent } from './components/room-managment/edit/room-edit.component';
import { RoomListComponent } from './components/room-managment/list/room-list.component';
import { RoomViewComponent } from './components/room-managment/view/room-view.component';
import { SafetyInstructionsComponent } from './components/safety-instructions/safety-instructions.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from './components/user-management/list/user-list.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { UserViewComponent } from './components/user-management/view/user-view.component';

@NgModule({
  declarations: [
    AdminOrderListComponent,
    AppComponent,
    DashboardComponent,
    OrderEditComponent,
    EmailVerificationComponent,
    GlobalSettingsComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    InventoryOrderComponent,
    InventoryItemCreateComponent,
    InventoryItemEditComponent,
    InventoryItemViewComponent,
    InventoryListComponent,
    LoginComponent,
    MessageBoxComponent,
    OrderViewComponent,
    PersonalOrderListComponent,
    RegisterComponent,
    OrderRequestComponent,
    WhitelistRetailerCreateComponent,
    WhitelistRetailerEditComponent,
    WhitelistRetailerViewComponent,
    RoomCreateComponent,
    RoomEditComponent,
    RoomListComponent,
    RoomViewComponent,
    SafetyInstructionsComponent,
    UserEditComponent,
    UserListComponent,
    UserSettingsComponent,
    UserViewComponent,
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
