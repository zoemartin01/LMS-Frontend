import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AdminOrderListComponent } from './components/order-management/admin-order-list/admin-order-list.component';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AdminOrderListComponent,
    AppComponent,
    DashboardComponent,
    EditComponent,
    EmailVerificationComponent,
    GlobalSettingsComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    InventoryOrderComponent,
    ItemCreateComponent,
    ItemEditComponent,
    ItemViewComponent,
    ListComponent,
    LoginComponent,
    MessageBoxComponent,
    OrderViewComponent,
    PersonalOrderListComponent,
    RegisterComponent,
    RequestCreationComponent,
    RetailerCreateComponent,
    RetailerEditComponent,
    RetailerViewComponent,
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
