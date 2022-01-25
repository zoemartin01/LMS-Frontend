import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutosizeModule } from 'ngx-autosize';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";

import { AdminAppointmentListComponent } from "./components/appointment-management/admin-list/admin-appointment-list.component";
import { AdminOrderListComponent } from './components/order-management/admin-list/admin-order-list.component';
import { AppComponent } from './app.component';
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
import { MessageDeleteComponent } from './components/general/message-box/delete/message-delete.component';
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
import { UserAcceptComponent } from './components/user-management/accept/user-accept.component';
import { UserDeclineComponent } from './components/user-management/decline/user-decline.component';
import { UserDeleteComponent } from './components/user-management/delete/user-delete.component';
import { UserEditComponent } from './components/user-management/edit/user-edit.component';
import { UserListComponent } from './components/user-management/list/user-list.component';
import { UserSettingsComponent } from './components/settings/user-settings/user-settings.component';
import { UserViewComponent } from './components/user-management/view/user-view.component';
import { WhitelistRetailerCreateComponent } from './components/settings/whitelist-retailer/create/whitelist-retailer-create.component';
import { WhitelistRetailerDeleteComponent } from './components/settings/whitelist-retailer/delete/whitelist-retailer-delete.component';
import { WhitelistRetailerEditComponent } from './components/settings/whitelist-retailer/edit/whitelist-retailer-edit.component';
import { WhitelistRetailerViewComponent } from './components/settings/whitelist-retailer/view/whitelist-retailer-view.component';

@NgModule({
  declarations: [
    AdminAppointmentListComponent,
    AdminOrderListComponent,
    AppComponent,
    AppointmentCreateComponent,
    AppointmentDeleteComponent,
    AppointmentEditComponent,
    AppointmentViewComponent,
    DashboardComponent,
    EmailVerificationComponent,
    GlobalSettingsComponent,
    HelpFaqComponent,
    HomepageComponent,
    HwlabRulesComponent,
    InventoryItemCreateComponent,
    InventoryItemDeleteComponent,
    InventoryItemEditComponent,
    InventoryItemViewComponent,
    InventoryListComponent,
    InventoryOrderComponent,
    LivecamDeleteComponent,
    LivecamOverviewComponent,
    LivecamScheduleComponent,
    LoginComponent,
    MessageBoxComponent,
    MessageDeleteComponent,
    OrderDeleteComponent,
    OrderEditComponent,
    OrderRequestComponent,
    OrderViewComponent,
    PersonalAppointmentListComponent,
    PersonalOrderListComponent,
    RegisterComponent,
    RoomCalendarViewComponent,
    RoomCreateComponent,
    RoomDeleteComponent,
    RoomEditComponent,
    RoomListComponent,
    RoomTimeslotsComponent,
    RoomViewComponent,
    SafetyInstructionsComponent,
    UserAcceptComponent,
    UserDeclineComponent,
    UserDeleteComponent,
    UserEditComponent,
    UserListComponent,
    UserSettingsComponent,
    UserViewComponent,
    WhitelistRetailerCreateComponent,
    WhitelistRetailerDeleteComponent,
    WhitelistRetailerEditComponent,
    WhitelistRetailerViewComponent,
  ],
  imports: [
    AppRoutingModule,
    AutosizeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
