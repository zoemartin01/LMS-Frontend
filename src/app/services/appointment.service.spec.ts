import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";
import * as moment from "moment";

import { AppointmentService } from './appointment.service';

import { ConfirmationStatus } from "../types/enums/confirmation-status";
import { TimeSlotRecurrence } from "../types/enums/timeslot-recurrence";

describe('AppointmentService', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AppointmentService,
      ],
    });
    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all pending appointments', () => {
    service.getAllAppointments(0, 0, ConfirmationStatus.pending).subscribe(
      res => {
        expect(res).toEqual({
          total: 5,
          data: [
            {
              id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
              start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 4,
              timeSlotRecurrence: 3,
              confirmationStatus: 1,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
              start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: null,
              amount: 1,
              timeSlotRecurrence: 1,
              confirmationStatus: 1,
              maxStart: null,
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
              start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 4,
              timeSlotRecurrence: 3,
              confirmationStatus: 1,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "1415b732-328a-46a4-abcb-c1493252a9cc",
              start: moment("2022-02-28T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-28T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 4,
              timeSlotRecurrence: 3,
              confirmationStatus: 1,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "a229732c-32a3-4aee-b678-3b52f6b8a4a0",
              start: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-03-07T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 4,
              timeSlotRecurrence: 3,
              confirmationStatus: 1,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }
          ]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getAllAppointments}?limit=0&offset=0&confirmationStatus=1`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 5,
      data: [
        {
          id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
          start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 4,
          timeSlotRecurrence: 3,
          confirmationStatus: 1,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
          start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: null,
          amount: 1,
          timeSlotRecurrence: 1,
          confirmationStatus: 1,
          maxStart: null,
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
          start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 4,
          timeSlotRecurrence: 3,
          confirmationStatus: 1,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "1415b732-328a-46a4-abcb-c1493252a9cc",
          start: moment("2022-02-28T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-28T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 4,
          timeSlotRecurrence: 3,
          confirmationStatus: 1,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "a229732c-32a3-4aee-b678-3b52f6b8a4a0",
          start: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-03-07T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 4,
          timeSlotRecurrence: 3,
          confirmationStatus: 1,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }
      ]
    });
  });

  it('should get all accepted appointments', () => {
    service.getAllAppointments(0, 0, ConfirmationStatus.accepted).subscribe(
      res => {
        expect(res).toEqual({
          total: 2,
          data: [
            {
              id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
              start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 2,
              timeSlotRecurrence: 3,
              confirmationStatus: 2,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
              start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 2,
              timeSlotRecurrence: 3,
              confirmationStatus: 2,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getAllAppointments}?limit=0&offset=0&confirmationStatus=2`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 2,
      data: [
        {
          id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
          start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
          start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
    });
  });

  it('should get all declined appointments', () => {
    service.getAllAppointments(0, 0, ConfirmationStatus.denied).subscribe(
      res => {
        expect(res).toEqual({
          total: 1,
          data: [
            {
              id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
              start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: null,
              amount: 1,
              timeSlotRecurrence: 1,
              confirmationStatus: 3,
              maxStart: null,
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getAllAppointments}?limit=0&offset=0&confirmationStatus=3`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 1,
      data: [
        {
          id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
          start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: null,
          amount: 1,
          timeSlotRecurrence: 1,
          confirmationStatus: 3,
          maxStart: null,
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
    });
  });

  it('should get all declined appointments', () => {
    service.getAllAppointments(0, 0, ConfirmationStatus.denied).subscribe(
      res => {
        expect(res).toEqual({
          total: 1,
          data: [
            {
              id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
              start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: null,
              amount: 1,
              timeSlotRecurrence: 1,
              confirmationStatus: 3,
              maxStart: null,
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getAllAppointments}?limit=0&offset=0&confirmationStatus=3`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 1,
      data: [
        {
          id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
          start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: null,
          amount: 1,
          timeSlotRecurrence: 1,
          confirmationStatus: 3,
          maxStart: null,
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
    });
  });

  it('should get all appointments of current User', () => {
    service.getAllAppointmentsForCurrentUser().subscribe(
      res => {
        expect(res).toEqual({
          total: 1,
          data: [
            {
              id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
              start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: null,
              amount: 1,
              timeSlotRecurrence: 1,
              confirmationStatus: 3,
              maxStart: null,
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getCurrentUserAppointments}?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 1,
      data: [
        {
          id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
          start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: null,
          amount: 1,
          timeSlotRecurrence: 1,
          confirmationStatus: 3,
          maxStart: null,
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
    });
  });

  it('should get all data of one specific room', () => {
    service.getAppointmentData("3f7af855-ad57-4a4c-81e7-769ba90f9e76").subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 3,
            maxStart: null,
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getSingleAppointment}`.replace(':id', '3f7af855-ad57-4a4c-81e7-769ba90f9e76'));

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
      start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: null,
      amount: 1,
      timeSlotRecurrence: 1,
      confirmationStatus: 3,
      maxStart: null,
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    });
  });

  it('should get all appointments of a specific series', () => {
    service.getAllAppointmentsForSeries("eef5fadc-53d9-4a49-83be-e55b2f94bb8e", 0, 0).subscribe(
      res => {
        expect(res).toEqual({
          total: 2,
          data: [
            {
              id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
              start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 2,
              timeSlotRecurrence: 3,
              confirmationStatus: 2,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            },
            {
              id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
              start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 1,
              seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
              amount: 2,
              timeSlotRecurrence: 3,
              confirmationStatus: 2,
              maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: true
              },
              user: {
                id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
                email: "admin@test.com",
                firstName: "Admin",
                lastName: "Admin",
                role: 3,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 3
              }
            }]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.getSeriesAppointments}?limit=0&offset=0`.replace(':id', "eef5fadc-53d9-4a49-83be-e55b2f94bb8e"));

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 2,
      data: [
        {
          id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
          start: moment("2022-02-14T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        },
        {
          id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
          start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 1,
          seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
          amount: 2,
          timeSlotRecurrence: 3,
          confirmationStatus: 2,
          maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          },
          user: {
            id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
            email: "admin@test.com",
            firstName: "Admin",
            lastName: "Admin",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 3
          }
        }]
    });
  });

  it('should create an appointment', () => {
    service.createAppointment({
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
    ).subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 2,
            maxStart: null,
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.createAppointment}`);

    expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toEqual({
      roomId: "c7231328-203e-43f5-9ac1-d374d90484ac",
      start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm').toISOString(),
      end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm').toISOString(),
    });

    mockRequest.flush({
      id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
      start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-16T06:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: null,
      amount: 1,
      timeSlotRecurrence: 1,
      confirmationStatus: 2,
      maxStart: null,
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    });
  });

  it('should create an appointment series', () => {
    service.createAppointmentSeries({
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      TimeSlotRecurrence.weekly,
      2,
      false,
    ).subscribe(
      res => {
        expect(res).toEqual(
          [{
            id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
            start: moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 2,
            timeSlotRecurrence: 3,
            confirmationStatus: 2,
            maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          },
          {
            id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
            start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 2,
            timeSlotRecurrence: 3,
            confirmationStatus: 2,
            maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }]
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.createAppointmentSeries}`);

    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual({
      roomId: "c7231328-203e-43f5-9ac1-d374d90484ac",
      start: moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm').toISOString(),
      end: moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm').toISOString(),
      timeSlotRecurrence: TimeSlotRecurrence.weekly,
      amount: 2,
      force: false,
    });

    mockRequest.flush([{
      id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
      start: moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      amount: 2,
      timeSlotRecurrence: 3,
      confirmationStatus: 2,
      maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    },
    {
      id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
      start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      amount: 2,
      timeSlotRecurrence: 3,
      confirmationStatus: 2,
      maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    }]);
  });

  it('should update an appointment', () => {
    service.editAppointment(
      "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
      {
        start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      }
    ).subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
            start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: null,
            amount: 1,
            timeSlotRecurrence: 1,
            confirmationStatus: 2,
            maxStart: null,
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.updateAppointment}`.replace(':id', "3f7af855-ad57-4a4c-81e7-769ba90f9e76"));

    expect(mockRequest.request.method).toBe('PATCH');
    expect(mockRequest.request.body).toEqual({
        start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
    });

    mockRequest.flush({
      id: "3f7af855-ad57-4a4c-81e7-769ba90f9e76",
      start: moment("2022-02-16T05:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: null,
      amount: 1,
      timeSlotRecurrence: 1,
      confirmationStatus: 2,
      maxStart: null,
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    });
  });

  it('should update an appointment series', () => {
    service.editAppointmentSeries(
      "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      {
        start: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-16T11:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      }
    ).subscribe(
      res => {
        expect(res).toEqual(
          [{
            id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
            start: moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 2,
            timeSlotRecurrence: 3,
            confirmationStatus: 2,
            maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          },
          {
            id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
            start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 1,
            seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
            amount: 2,
            timeSlotRecurrence: 3,
            confirmationStatus: 2,
            maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }]);
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.appointments.updateAppointmentSeries}`.replace(':id', "eef5fadc-53d9-4a49-83be-e55b2f94bb8e"));

    expect(mockRequest.request.method).toBe('PATCH');
    expect(mockRequest.request.body).toEqual({
      start: moment("2022-02-16T07:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-16T11:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
    });

    mockRequest.flush([{
      id: "c3a70a44-374c-46a9-be05-a3f6ef4e39a5",
      start: moment("2022-02-15T08:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-15T09:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      amount: 2,
      timeSlotRecurrence: 3,
      confirmationStatus: 2,
      maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    },
    {
      id: "e401b04a-3688-49d8-b36a-f38e1942ff3f",
      start: moment("2022-02-21T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      end: moment("2022-02-21T16:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      type: 1,
      seriesId: "eef5fadc-53d9-4a49-83be-e55b2f94bb8e",
      amount: 2,
      timeSlotRecurrence: 3,
      confirmationStatus: 2,
      maxStart: moment("2022-03-07T13:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      room: {
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: true
      },
      user: {
        id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
        email: "admin@test.com",
        firstName: "Admin",
        lastName: "Admin",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 3
      }
    }]);
  });
});
