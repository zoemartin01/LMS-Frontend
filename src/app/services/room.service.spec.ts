import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {RoomService} from './room.service';
import {environment} from "../../environments/environment";
import {ParseArgumentException} from "@angular/cli/models/parser";
import * as moment from "moment";
import {TimeSlotRecurrence} from "../types/enums/timeslot-recurrence";

describe('RoomService', () => {
  let service: RoomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(RoomService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all rooms', () => {
    service.getRoomsData().subscribe(
      res => {
        expect(res).toEqual({
          total: 3,
          data: [
            {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: true
            },
            {
              id: "c2349c343c40-c918c-c319c",
              name: "Test room 2",
              description: "room to test 3",
              maxConcurrentBookings: 2,
              autoAcceptBookings: true
            },
            {
              id: "c7203923n-43-f-23--84ac",
              name: "Test room 3",
              description: "room to test 3",
              maxConcurrentBookings: 3,
              autoAcceptBookings: true
            },
          ]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getAllRooms}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 3,
      data: [
        {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        },
        {
          id: "c2349c343c40-c918c-c319c",
          name: "Test room 2",
          description: "room to test 3",
          maxConcurrentBookings: 2,
          autoAcceptBookings: true
        },
        {
          id: "c7203923n-43-f-23--84ac",
          name: "Test room 3",
          description: "room to test 3",
          maxConcurrentBookings: 3,
          autoAcceptBookings: true
        },
      ]
    });
  });

  it('should get room data', () => {
    service.getRoomData("c7231328-203e-43f5-9ac1-d374d90484ac").subscribe(
      res => {
        expect(res).toEqual({
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: true
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getSingleRoom
      .replace(':id', "c7231328-203e-43f5-9ac1-d374d90484ac")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: true
    });
  });

  it('should throw exception when trying to get an room with id null', () => {
    expect(() => service.getRoomData(null)).toThrow(ParseArgumentException);
  });

  it('should get room calendar', () => {
    service.getRoomCalendar("7d083749-e35a-4de5-a4f2-889a6cf9ca5a").subscribe(
      res => {
        expect(res).toEqual({
          calendar: [
            [["unavailable"], ["available"], ["unavailable"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], ["available"], ["available"], [
              {
                id: "410cda0c-1027-4681-b578-61e3822534bc",
                start: moment("2022-01-28T09:00:00.000Z"),
                end: moment("2022-01-28T12:00:00.000Z"),
                type: 1,
                confirmationStatus: 2,
                seriesId: null,
                timeSlotRecurrence: 1,
                maxStart: null,
                amount: 1,
                room: {
                  id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
                  name: "algorithms",
                  description: "Quidem laudantium deleniti eum.",
                  maxConcurrentBookings: 1,
                  autoAcceptBookings: false
                },
                user: {
                  id: "540618e7-98c8-4830-8917-0f52787360d6",
                  email: "admin@test.com",
                  firstName: "Admin",
                  lastName: "Admin",
                  role: 3,
                  emailVerification: true,
                  isActiveDirectory: false,
                  notificationChannel: 3
                }
              }], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], [
              {
                id: "5da3a161-7433-422b-b5ee-8375832d1eff",
                start: moment("2022-01-26T10:00:00.000Z"),
                end: moment("2022-01-26T13:00:00.000Z"),
                type: 1,
                confirmationStatus: 1,
                seriesId: null,
                timeSlotRecurrence: 1,
                maxStart: null,
                amount: 1,
                room: {
                  id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
                  name: "algorithms",
                  description: "Quidem laudantium deleniti eum.",
                  maxConcurrentBookings: 1,
                  autoAcceptBookings: false
                },
                user: {
                  id: "540618e7-98c8-4830-8917-0f52787360d6",
                  email: "admin@test.com",
                  firstName: "Admin",
                  lastName: "Admin",
                  role: 3,
                  emailVerification: true,
                  isActiveDirectory: false,
                  notificationChannel: 3
                }
              }], ["available"], [null], ["unavailable"], ["unavailable"]],
            [["unavailable"], ["available"], [null], ["available"], [null], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], [null], ["available"], [null], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], [null], ["available"], ["available"], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"], ["unavailable"]],
            [["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"], ["unavailable"]],
          ],
          minTimeslot: 9
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getRoomCalendar
      .replace(':id', "7d083749-e35a-4de5-a4f2-889a6cf9ca5a")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      calendar: [
        [["unavailable"], ["available"], ["unavailable"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], ["available"], ["available"], [
          {
            id: "410cda0c-1027-4681-b578-61e3822534bc",
            start: moment("2022-01-28T09:00:00.000Z"),
            end: moment("2022-01-28T12:00:00.000Z"),
            type: 1,
            confirmationStatus: 2,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], [
          {
            id: "5da3a161-7433-422b-b5ee-8375832d1eff",
            start: moment("2022-01-26T10:00:00.000Z"),
            end: moment("2022-01-26T13:00:00.000Z"),
            type: 1,
            confirmationStatus: 1,
            seriesId: null,
            timeSlotRecurrence: 1,
            maxStart: null,
            amount: 1,
            room: {
              id: "7d083749-e35a-4de5-a4f2-889a6cf9ca5a",
              name: "algorithms",
              description: "Quidem laudantium deleniti eum.",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false
            },
            user: {
              id: "540618e7-98c8-4830-8917-0f52787360d6",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            }
          }], ["available"], [null], ["unavailable"], ["unavailable"]],
        [["unavailable"], ["available"], [null], ["available"], [null], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], [null], ["available"], [null], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], [null], ["available"], ["available"], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"], ["unavailable"]],
        [["available"], ["available"], ["available"], ["available"], ["unavailable"], ["unavailable"], ["unavailable"]],
      ],
      minTimeslot: 9
    });
  });

  it('should throw exception when trying to get room calendar with roomId null', () => {
    expect(() => service.getRoomCalendar(null)).toThrow(ParseArgumentException);
  });

  it('should create a room', () => {
    service.createRoom(
      "Test room",
      "room to test",
      1,
      true)
      .subscribe(
        res => {
          expect(res).toEqual({
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: true
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.createRoom}`);

    expect(mockRequest.request.method).toBe('POST');


    mockRequest.flush({
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "room to test",
      maxConcurrentBookings: 1,
      autoAcceptBookings: true
    });
  });

  it('should edit a room', () => {
    service.editRoomData("c7231328-203e-43f5-9ac1-d374d90484ac", {
      description: "changed description",
      maxConcurrentBookings: 2
    })
      .subscribe(
        res => {
          expect(res).toEqual({
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "changed description",
            maxConcurrentBookings: 2,
            autoAcceptBookings: true
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.updateRoom
      .replace(':id', "c7231328-203e-43f5-9ac1-d374d90484ac")}`);

    expect(mockRequest.request.method).toBe('PATCH');


    mockRequest.flush({
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "changed description",
      maxConcurrentBookings: 2,
      autoAcceptBookings: true
    });
  });

  it('should throw exception when trying to edit room with roomId null', () => {
    expect(() => service.editRoomData(null, {})).toThrow(ParseArgumentException);
  });

  it('should delete a room', () => {
    service.deleteRoom("c7231328-203e-43f5-9ac1-d374d90484ac")
      .subscribe(
        res => {
          expect(res).toEqual({
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "changed description",
            maxConcurrentBookings: 2,
            autoAcceptBookings: true
          });
        }
      );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.deleteRoom
      .replace(':id', "c7231328-203e-43f5-9ac1-d374d90484ac")}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({
      id: "c7231328-203e-43f5-9ac1-d374d90484ac",
      name: "Test room",
      description: "changed description",
      maxConcurrentBookings: 2,
      autoAcceptBookings: true
    }, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete room with roomId null', () => {
    expect(() => service.deleteRoom(null)).toThrow(ParseArgumentException);
  });

  it('should get all available timeslots', () => {
    service.getAvailableTimeslots("c7231328-203e-43f5-9ac1-d374d90484ac").subscribe(
      res => {
        expect(res).toEqual({
          total: 3,
          data: [
            {
              id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
              start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
            {
              id: "377ec178-5fd7-41e6-b663-664dacf5c546",
              start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
            {
              id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
              start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
          ]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getAllAvailableTimeslotsForRoom.replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 3,
      data: [
        {
          id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
          start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
      ]
    });
  });

  it('should get all unavailable timeslots', () => {
    service.getUnavailableTimeslots("2c7231328-203e-43f5-9ac1-d374d90484ac").subscribe(
      res => {
        expect(res).toEqual({
          total: 3,
          data: [
            {
              id: "28e762183-dcb3-4018-b02d-fb5c3c46a9f8",
              start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false
              }
            },
            {
              id: "2377ec178-5fd7-41e6-b663-664dacf5c546",
              start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false
              }
            },
            {
              id: "2cfa078ce-402e-4453-b3cf-a2faf003c09a",
              start: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-18T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false
              }
            },
          ]
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getAllUnavailableTimeslotsForRoom.replace(':roomId', "2c7231328-203e-43f5-9ac1-d374d90484ac")}` +
      `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      total: 3,
      data: [
        {
          id: "28e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
        {
          id: "2377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
        {
          id: "2cfa078ce-402e-4453-b3cf-a2faf003c09a",
          start: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-18T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "25bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-17T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "2c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false
          }
        },
      ]
    });
  });

  it('should get availability calendar', () => {
    service.getAvailabilityCalendar("2c7231328-203e-43f5-9ac1-d374d90484ac").subscribe(
      res => {
        expect(res).toEqual(
          [
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              null,
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              null,
              null,
              null
            ],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              "unavailable c1db4cc9-b48f-4d2a-93f3-8caeb10cb9a7",
              "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
              "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              null,
              "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              null,
              "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
              "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "available 2957a506-b4d7-4184-86fa-25383e56edb6",
              null,
              null
            ],
            [
              null,
              null,
              null,
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
              null,
              null
            ],
            [
              null,
              null,
              null,
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
              null,
              null
            ],
            [
              null,
              null,
              null,
              "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
              "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
              null,
              null
            ],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
            [null, null, null, null, null, null, null]
          ]
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getAvailabilityCalendar
      .replace(':id', "2c7231328-203e-43f5-9ac1-d374d90484ac")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush([
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        null,
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        null,
        null,
        null
      ],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        "unavailable c1db4cc9-b48f-4d2a-93f3-8caeb10cb9a7",
        "unavailable 36e4beb7-8ae8-4f0c-91ef-ac77dd3fb99a",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        "available 9e0a67db-8595-4d0e-8606-8bc3f7972168",
        "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        null,
        "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        null,
        "available 1e61e1f9-5a78-4f27-82b4-b1528170a20f",
        "available 4fa3c7ef-b5cc-4535-a55f-1fd9f7e5a64d",
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "available 2957a506-b4d7-4184-86fa-25383e56edb6",
        null,
        null
      ],
      [
        null,
        null,
        null,
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
        null,
        null
      ],
      [
        null,
        null,
        null,
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
        null,
        null
      ],
      [
        null,
        null,
        null,
        "available 33134e85-0737-48d3-9e62-3b3123d2d5ff",
        "unavailable 38b38803-a180-44e7-a90a-aae7433b29f7",
        null,
        null
      ],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, "available 33134e85-0737-48d3-9e62-3b3123d2d5ff", null, null, null],
      [null, null, null, null, null, null, null]
    ]);
  });

  it('should throw exception when trying to get availability calendar with roomId null', () => {
    expect(() => service.getAvailabilityCalendar(null)).toThrow(ParseArgumentException);
  });

  it('should get timeslot', () => {
    service.getTimeslot("c7231328-203e-43f5-9ac1-d374d90484ac", "8e762183-dcb3-4018-b02d-fb5c3c46a9f8").subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
            start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 2,
            seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
            amount: 3,
            timeSlotRecurrence: 2,
            maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false,
            },
          },
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.getTimeslot
      .replace(':id', "c7231328-203e-43f5-9ac1-d374d90484ac")
      .replace(':timeslotId', "8e762183-dcb3-4018-b02d-fb5c3c46a9f8")}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
        id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 3,
        timeSlotRecurrence: 2,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false,
        },
      },
    );
  });

  it('should throw exception when trying to get timeslot with roomId null', () => {
    expect(() => service.getTimeslot(null, "8e762183-dcb3-4018-b02d-fb5c3c46a9f8")).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to get timeslot with timeslotId null', () => {
    expect(() => service.getTimeslot("c7231328-203e-43f5-9ac1-d374d90484ac", null)).toThrow(ParseArgumentException);
  });

  it('should create timeslot', () => {
    service.createTimeslot({
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false,
      },
      moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      2).subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
            start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 2,
            seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
            amount: 1,
            timeSlotRecurrence: 1,
            maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false,
            },
          },
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslot
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
    }`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
        id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 1,
        timeSlotRecurrence: 1,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false,
        },
      },
    );
  });

  it('should throw exception when trying to create timeslot with roomId null', () => {
    expect(() => service.createTimeslot({
        id: null,
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false,
      },
      moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      2)).toThrow(ParseArgumentException);
  });

  it('should create timeslot series', () => {
    service.createTimeslotSeries({
        id: "c7231328-203e-43f5-9ac1-d374d90484ac",
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false,
      },
      moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      2,
      TimeSlotRecurrence.weekly,
      3).subscribe(
      res => {
        expect(res).toEqual([
            {
              id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
              start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
            {
              id: "377ec178-5fd7-41e6-b663-664dacf5c546",
              start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
            {
              id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
              start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 3,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
          ]
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.createTimeslotSeries
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
    }`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush([
        {
          id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "cfa078ce-402e-4453-b3cf-a2faf003c09a",
          start: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-16T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 3,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
      ]
    );
  });

  it('should throw exception when trying to create timeslot series with roomId null', () => {
    expect(() => service.createTimeslotSeries({
        id: null,
        name: "Test room",
        description: "room to test",
        maxConcurrentBookings: 1,
        autoAcceptBookings: false,
      },
      moment("2022-02-13T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      moment("2022-02-14T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      2,
      TimeSlotRecurrence.weekly,
      3)).toThrow(ParseArgumentException);
  });

  it('should edit timeslot', () => {
    service.editTimeslot("c7231328-203e-43f5-9ac1-d374d90484ac",
      "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      }
    ).subscribe(
      res => {
        expect(res).toEqual(
          {
            id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
            start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            type: 2,
            seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
            amount: 1,
            timeSlotRecurrence: 1,
            maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
            room: {
              id: "c7231328-203e-43f5-9ac1-d374d90484ac",
              name: "Test room",
              description: "room to test",
              maxConcurrentBookings: 1,
              autoAcceptBookings: false,
            },
          },
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.updateTimeslot
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
      .replace(':timeslotId', "8e762183-dcb3-4018-b02d-fb5c3c46a9f8")}`);


    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
        id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        type: 2,
        seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
        amount: 1,
        timeSlotRecurrence: 1,
        maxStart: moment("2022-02-15T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        room: {
          id: "c7231328-203e-43f5-9ac1-d374d90484ac",
          name: "Test room",
          description: "room to test",
          maxConcurrentBookings: 1,
          autoAcceptBookings: false,
        },
      },
    );
  });

  it('should throw exception when trying to edit timeslot with roomId null', () => {
    expect(() => service.editTimeslot(
      null,
      "c7231328-203e-43f5-9ac1-d374d90484ac",
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      })).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to edit timeslot with timeslotId null', () => {
    expect(() => service.editTimeslot(
      "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
      null,
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      })).toThrow(ParseArgumentException);
  });

  it('should edit timeslot series', () => {
    service.editTimeslotSeries("c7231328-203e-43f5-9ac1-d374d90484ac",
      "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        amount: 2,
      }).subscribe(
      res => {
        expect(res).toEqual([
            {
              id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
              start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 2,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
            {
              id: "377ec178-5fd7-41e6-b663-664dacf5c546",
              start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              type: 2,
              seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
              amount: 2,
              timeSlotRecurrence: 2,
              maxStart: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
              room: {
                id: "c7231328-203e-43f5-9ac1-d374d90484ac",
                name: "Test room",
                description: "room to test",
                maxConcurrentBookings: 1,
                autoAcceptBookings: false,
              },
            },
          ]
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.updateTimeslotSeries
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
      .replace(':seriesId', "5bbb467a-4539-4d4a-9b19-7fe0341be0ef")}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush([
        {
          id: "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
          start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 2,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
        {
          id: "377ec178-5fd7-41e6-b663-664dacf5c546",
          start: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          end: moment("2022-02-15T22:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          type: 2,
          seriesId: "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
          amount: 2,
          timeSlotRecurrence: 2,
          maxStart: moment("2022-02-14T23:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
          room: {
            id: "c7231328-203e-43f5-9ac1-d374d90484ac",
            name: "Test room",
            description: "room to test",
            maxConcurrentBookings: 1,
            autoAcceptBookings: false,
          },
        },
      ]
    );
  });

  it('should throw exception when trying to edit timeslot series with roomId null', () => {
    expect(() => service.editTimeslotSeries(
      null,
      "5bbb467a-4539-4d4a-9b19-7fe0341be0ef",
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      })).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to edit timeslot series with seriesId null', () => {
    expect(() => service.editTimeslotSeries(
      "8e762183-dcb3-4018-b02d-fb5c3c46a9f8",
      null,
      {
        start: moment("2022-02-13T20:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
        end: moment("2022-02-13T24:00:00.000Z", 'YYYY-MM-DDTHH:mm'),
      })).toThrow(ParseArgumentException);
  });

  it('should delete timeslot', () => {
    service.deleteTimeslot("c7231328-203e-43f5-9ac1-d374d90484ac", "8e762183-dcb3-4018-b02d-fb5c3c46a9f8").subscribe();


    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslot
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
      .replace(':timeslotId', "8e762183-dcb3-4018-b02d-fb5c3c46a9f8")}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({},
      {
        status: 204,
        statusText: "No Content",
      }
    );
  });

  it('should throw exception when trying to delete timeslot with roomId null', () => {
    expect(() => service.deleteTimeslot(null, "8e762183-dcb3-4018-b02d-fb5c3c46a9f8")).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to delete timeslot with timeslotId null', () => {
    expect(() => service.deleteTimeslot("c7231328-203e-43f5-9ac1-d374d90484ac", null)).toThrow(ParseArgumentException);
  });

  it('should delete timeslot series', () => {
    service.deleteTimeslotSeries("c7231328-203e-43f5-9ac1-d374d90484ac", "5bbb467a-4539-4d4a-9b19-7fe0341be0ef").subscribe();


    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.rooms.deleteTimeslotSeries
      .replace(':roomId', "c7231328-203e-43f5-9ac1-d374d90484ac")
      .replace(':seriesId', "5bbb467a-4539-4d4a-9b19-7fe0341be0ef")}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({},
      {
        status: 204,
        statusText: "No Content",
      }
    );
  });

  it('should throw exception when trying to delete timeslot series with roomId null', () => {
    expect(() => service.deleteTimeslotSeries(null, "5bbb467a-4539-4d4a-9b19-7fe0341be0ef")).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to delete timeslot series with seriesId null', () => {
    expect(() => service.deleteTimeslotSeries("c7231328-203e-43f5-9ac1-d374d90484ac", null)).toThrow(ParseArgumentException);
  });
});
