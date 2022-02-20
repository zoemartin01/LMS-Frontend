import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxPaginationModule} from "ngx-pagination";

import {AdminAppointmentListComponent} from './admin-appointment-list.component';
import {ConfirmationStatus} from "../../../types/enums/confirmation-status";
import {Observable} from "rxjs";
import {PagedResponse} from "../../../types/paged-response";
import {Appointment} from "../../../types/appointment";


class MockAppointmentService {
  public getAllAppointments(limit: number = 0, offset: number = 0, confirmationStatus: ConfirmationStatus|undefined = undefined): Observable<PagedResponse<Appointment>> {
    if (localStorage.getItem('throwError') === 'true') {
      observer.error({
        error: {
          error: {
            message: 'Unknown Error.',
          }
        }
      });
    }

    const pendingAppointments: Appointment[] = [
      {
        /*id: '312d8319-c253-4ee4-8771-a4a8d4a2f411',
        title: 'Verify Email to confirm account',
        content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
        correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
        correspondingUrlText: 'Verify Email',
        readStatus: false,*/
      },
      {
        /*id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
        title: 'Verify Email to confirm account',
        content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
        correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
        correspondingUrlText: 'Verify Email',
        readStatus: false,*/
      },
    ];
    if (confirmationStatus == ConfirmationStatus.pending) {
      observer.next(pendingAppointments);
    }
    if (confirmationStatus == ConfirmationStatus.accepted) {
      observer.next(acceptedAppointments);
    }
    if (confirmationStatus == ConfirmationStatus.denied) {
      observer.next(deniedAppointments);
    }
  });


  }

  getMessages(): Observable<Message[]> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            }
          }
        });
      }

      const messages: Message[] = [
        {
          id: '312d8319-c253-4ee4-8771-a4a8d4a2f411',
          title: 'Verify Email to confirm account',
          content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
          correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
          correspondingUrlText: 'Verify Email',
          readStatus: false,
        },
        {
          id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
          title: 'Verify Email to confirm account',
          content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
          correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
          correspondingUrlText: 'Verify Email',
          readStatus: false,
        },
      ];

      observer.next(messages);
    });
  }
getAllAppointments(pending)
  getAllAppointments(accepted)
  getAllAppointments(denied)


}

class MockUserService {

}

describe('AdminAppointmentListComponent', () => {
  let component: AdminAppointmentListComponent;
  let fixture: ComponentFixture<AdminAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointmentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
