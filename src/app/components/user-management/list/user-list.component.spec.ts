import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";

import { UserListComponent } from './user-list.component';

import { AdminService } from "../../../services/admin.service";

import { User } from "../../../types/user";
import { UserRole } from "../../../types/enums/user-role";
import { NotificationChannel } from "../../../types/enums/notification-channel";
import { PagedList } from "../../../types/paged-list";
import { PagedResponse } from "../../../types/paged-response";

class MockAdminService {
  getPendingUsers(limit: number = 0, offset: number = 0): Observable<PagedResponse<User>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next({
        total: 2,
        data: [
          {
            id: "userAB",
            email: "user11@test.com",
            firstName: "user",
            lastName: "usersonsonson",
            role: 1,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 4,
          },
          {
            id:"userABC",
            email: "user22@test.com",
            firstName: "user22",
            lastName: "usersonsonsonson",
            role: 1,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 2,
          },
        ],
      });
    });
  }

  getAcceptedUsers(limit: number = 0, offset: number = 0): Observable<PagedResponse<User>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            },
          },
        });
      }

      observer.next({
        total: 2,
        data: [
          {
            id: "userXY",
            email: "user@test.com",
            firstName: "user",
            lastName: "userson",
            role: 2,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 4,
          },
          {
            id:"userXYZ",
            email: "user2@test.com",
            firstName: "user2",
            lastName: "usersonson",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 2,
          },
        ],
      });
    });
  }
}

class MockModalService {
  public user: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.unknown,
    notificationChannel: NotificationChannel.unknown,
    emailVerification: true,
    isActiveDirectory: false,
  };
  open(): { componentInstance: { user: User }, result: Promise<string> } {
    return {
      componentInstance: {
        user: this.user,
      },
      result: new Promise<string>(
        resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    let acceptedUsers: PagedList<User> = new PagedList<User>();
    let pendingUsers: PagedList<User> = new PagedList<User>();

    expect(component.acceptedUsers).toEqual(acceptedUsers);
    expect(component.pendingUsers).toEqual(pendingUsers);

    component.ngOnInit();
    tick();

    acceptedUsers.total = 2;
    pendingUsers.total = 2;
    acceptedUsers.data = [
      {
        id: "userXY",
        email: "user@test.com",
        firstName: "user",
        lastName: "userson",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4,
      },
      {
        id:"userXYZ",
        email: "user2@test.com",
        firstName: "user2",
        lastName: "usersonson",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 2,
      },
    ];

    pendingUsers.data = [
      {
        id: "userAB",
        email: "user11@test.com",
        firstName: "user",
        lastName: "usersonsonson",
        role: 1,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4,
      },
      {
        id:"userABC",
        email: "user22@test.com",
        firstName: "user22",
        lastName: "usersonsonsonson",
        role: 1,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 2,
      },
    ];

    expect(component.pendingUsers).toEqual(pendingUsers);
    expect(component.acceptedUsers).toEqual(acceptedUsers);
  }));

  it('should throw an error on initialization of page', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    let acceptedUsers: PagedList<User> = new PagedList<User>();
    let pendingUsers: PagedList<User> = new PagedList<User>();

    expect(component.acceptedUsers).toEqual(acceptedUsers);
    expect(component.pendingUsers).toEqual(pendingUsers);

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(component.acceptedUsers).toEqual(acceptedUsers);
    expect(component.pendingUsers).toEqual(pendingUsers);
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should get all pending users', fakeAsync(() => {
    let pendingUsers: PagedList<User> = new PagedList<User>();

    expect(component.pendingUsers).toEqual(pendingUsers);

    component.pendingUsers.page = 1;

    component.getPendingUsers();
    tick();

    pendingUsers.total = 2;
    pendingUsers.data = [
      {
        id: "userAB",
        email: "user11@test.com",
        firstName: "user",
        lastName: "usersonsonson",
        role: 1,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4,
      },
      {
        id:"userABC",
        email: "user22@test.com",
        firstName: "user22",
        lastName: "usersonsonsonson",
        role: 1,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 2,
      },
      ];

    expect(component.pendingUsers).toEqual(pendingUsers);
  }));

  it('should get all accepted users', fakeAsync(() => {
    let acceptedUsers: PagedList<User> = new PagedList<User>();

    expect(component.acceptedUsers).toEqual(acceptedUsers);

    component.acceptedUsers.page = 1;

    component.getAcceptedUsers();
    tick();

    acceptedUsers.total = 2;
    acceptedUsers.data = [
      {
        id: "userXY",
        email: "user@test.com",
        firstName: "user",
        lastName: "userson",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4,
      },
      {
        id:"userXYZ",
        email: "user2@test.com",
        firstName: "user2",
        lastName: "usersonson",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 2,
      },
    ];

    expect(component.acceptedUsers).toEqual(acceptedUsers);
  }));

  it('should open user accept dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'accepted');

    const getPendingUsersMethod = spyOn(component, 'getPendingUsers');
    const getAcceptedUsersMethod = spyOn(component, 'getAcceptedUsers');

    component.openUserAcceptDialog('userAB');
    tick();

    expect(getPendingUsersMethod).toHaveBeenCalled();
    expect(getAcceptedUsersMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open decline user dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'declined');

    const getPendingUsersMethod = spyOn(component, 'getPendingUsers');
    const getAcceptedUsersMethod = spyOn(component, 'getAcceptedUsers');

    component.openUserDeclineUser('userABC');
    tick();

    expect(getPendingUsersMethod).toHaveBeenCalled();
    expect(getAcceptedUsersMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open user view', fakeAsync(() => {
    localStorage.setItem('returnVal', 'dirty');

    const getAcceptedUsersMethod = spyOn(component, 'getAcceptedUsers');

    component.openUserView('userXY');
    tick();

    expect(getAcceptedUsersMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open user edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const getAcceptedUsersMethod = spyOn(component, 'getAcceptedUsers');

    component.openUserEditForm('userXY');
    tick();

    expect(getAcceptedUsersMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open user deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const getAcceptedUsersMethod = spyOn(component, 'getAcceptedUsers');

    component.openUserDeletionDialog('userXYZ');
    tick();

    expect(getAcceptedUsersMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});
