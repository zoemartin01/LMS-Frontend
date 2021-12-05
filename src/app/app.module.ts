import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { HelpFaqComponent } from './components/help-faq/help-faq.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HwlabRulesComponent } from './components/hwlab-rules/hwlab-rules.component';
import { LoginComponent } from './components/login/login.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomCreateComponent } from './components/room-managment/create/room-create.component';
import { RoomEditComponent } from './components/room-managment/edit/room-edit.component';
import { RoomListComponent } from './components/room-managment/list/room-list.component';
import { RoomViewComponent } from './components/room-managment/view/room-view.component';
import { SafetyInstructionsComponent } from './components/safety-instructions/safety-instructions.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from "./components/user-management/list/user-list.component";
import { UserViewComponent } from './components/user-management/view/user-view.component';
import { StartComponent } from './components/inventory-management/list/start.component';
import { ItemViewComponent } from './components/inventory-management/item-view/item-view.component';
import { ItemEditComponent } from './components/inventory-management/item-edit/item-edit.component';
import { ItemCreateComponent } from './components/inventory-management/item-create/item-create.component';
import { InventoryOrderComponent } from './components/inventory-management/inventory-order/inventory-order.component';
import { PersonalOrderListComponent } from './components/order-management/personal-order-list/personal-order-list.component';
import { AdminOrderListComponent } from './components/order-management/admin-order-list/admin-order-list.component';
import { OrderViewComponent } from './components/order-management/view/order-view.component';
import { EditComponent } from './components/order-management/edit/edit.component';
import { RequestCreationComponent } from './components/order-management/request-creation/request-creation.component';
import { ListComponent } from './components/inventory-management/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmailVerificationComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    LoginComponent,
    MessageBoxComponent,
    RegisterComponent,
    RoomCreateComponent,
    RoomEditComponent,
    RoomListComponent,
    RoomViewComponent,
    SafetyInstructionsComponent,
    UserEditComponent,
    UserListComponent,
    UserViewComponent,
    StartComponent,
    ItemViewComponent,
    ItemEditComponent,
    ItemCreateComponent,
    InventoryOrderComponent,
    PersonalOrderListComponent,
    AdminOrderListComponent,
    OrderViewComponent,
    EditComponent,
    RequestCreationComponent,
    ListComponent,
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
