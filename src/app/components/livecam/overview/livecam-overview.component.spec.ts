import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal , NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { Observable } from "rxjs";
import * as moment from "moment";

import { LivecamOverviewComponent } from './livecam-overview.component';

import { LivecamService } from "../../../services/livecam.service";

import { Recording } from "../../../types/recording";
import { RecordingId } from "../../../types/aliases/recording-id";
import { VideoResolution } from "../../../types/enums/video-resolution";
import { PagedResponse } from "../../../types/paged-response";
import { PagedList } from "../../../types/paged-list";

class MockLivecamService {
  getFinishedRecordings(): Observable<PagedResponse<Recording>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
              message: 'Unknown Error.',
          },
        });
      }

      const recordings: PagedResponse<Recording> = {
        total: 2,
        data: [
          {
            id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3,
            },
            start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            resolution: VideoResolution.V1080,
            bitrate: 1000,
            size: 0,
          },
          {
            id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3,
            },
            start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            resolution: VideoResolution.V1080,
            bitrate: 1000,
            size: 1000,
          },
        ]
      };

      observer.next(recordings);
    });
  }

  getAllScheduledRecordings(): Observable<PagedResponse<Recording>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
              message: 'Unknown Error.',
          },
        });
      }

      const recordings: PagedResponse<Recording> = {
        total: 2,
        data: [
          {
            id: '20a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3
            },
            start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            resolution: VideoResolution.V1080,
            bitrate: 1000,
            size: 0,
          },
          {
            id: '20a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
            user: {
              id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
              email: "admin@test.com",
              firstName: "Admin",
              lastName: "Admin",
              role: 3,
              emailVerification: true,
              isActiveDirectory: false,
              notificationChannel: 3,
            },
            start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
            resolution: VideoResolution.V1080,
            bitrate: 1000,
            size: 1000,
          },
        ]
      };

      observer.next(recordings);
    });
  }

  getRecordingData(recordingId: RecordingId): Observable<Recording> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      const recording: Recording = {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
        start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 0,
      };

      observer.next(recording);
    });
  }

  downloadRecording(recordingId: RecordingId): Observable<ArrayBuffer> {
      return new Observable((observer) => {
        if (localStorage.getItem('throwError') === 'true') {
          observer.error({
            error: {
              message: 'Unknown Error.',
            },
          });
        }

        const recordingData: ArrayBuffer = new ArrayBuffer(8);

        observer.next(recordingData);
      });
  }

  getLiveStreamFeedPath(): string {
    return "ws://PATH";
  }
}

class MockModalService {
  open(): { componentInstance: { recording: Recording | null }, result: Promise<string> } {
    return {
      componentInstance: {
        recording: {
          id: null,
          user: {
            id: null,
            email: '',
            firstName: "",
            lastName: "",
            role: 0,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 0,
          },
          start: null,
          end: null,
          resolution: VideoResolution.unknown,
          bitrate: 1000,
          size: 0,
        },
      },
      result: new Promise<string>(
        resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  };
}

describe('Livecam overview method calls', () => {
  let component: LivecamOverviewComponent;
  let fixture: ComponentFixture<LivecamOverviewComponent>;
  let consoleError: jasmine.Spy<any>;
  let getFinishedRecordingsMethod: jasmine.Spy<any>;
  let getScheduledRecordingsMethod: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LivecamOverviewComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: LivecamService, useClass: MockLivecamService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LivecamOverviewComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();

    getFinishedRecordingsMethod = spyOn(component, 'getFinishedRecordings');
    getFinishedRecordingsMethod.calls.reset();
    getScheduledRecordingsMethod = spyOn(component, 'getScheduledRecordings');
    getScheduledRecordingsMethod.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all livecam recordings', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(getFinishedRecordingsMethod).toHaveBeenCalled();
    expect(getScheduledRecordingsMethod).toHaveBeenCalled();
  }));

  it('should init page', fakeAsync(() => {
    component.ngAfterViewInit();
    tick();

    expect(true).toBeTruthy();
  }));

  it('should update recordings when recording is deleted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.openRecordingDeletionDialog('0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f');
    tick();

    expect(getFinishedRecordingsMethod).toHaveBeenCalled();
    expect(getScheduledRecordingsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update recordings when recording is deletion is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openRecordingDeletionDialog('0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f');
    tick();

    expect(getFinishedRecordingsMethod).not.toHaveBeenCalled();
    expect(getScheduledRecordingsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update recordings when recording is scheduled', fakeAsync(() => {
    localStorage.setItem('returnVal', 'scheduled');

    component.openScheduleRecordingForm();
    tick();

    expect(getFinishedRecordingsMethod).toHaveBeenCalled();
    expect(getScheduledRecordingsMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should not update recordings when recording is schedule is aborted', fakeAsync(() => {
    localStorage.setItem('returnVal', 'aborted');

    component.openScheduleRecordingForm();
    tick();

    expect(getFinishedRecordingsMethod).not.toHaveBeenCalled();
    expect(getScheduledRecordingsMethod).not.toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));
});


describe('LivecamOverviewComponent method calls', () => {
  let component: LivecamOverviewComponent;
  let fixture: ComponentFixture<LivecamOverviewComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LivecamOverviewComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: LivecamService, useClass: MockLivecamService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LivecamOverviewComponent);
    component = fixture.componentInstance;

    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should get all finished recordings', fakeAsync(() => {
    component.doneRecordings.pageSize = 10;

    component.getFinishedRecordings();
    tick();

    let pagedListRecordings = new PagedList<Recording>();
    pagedListRecordings.pageSize = 10;
    pagedListRecordings.total = 2;
    pagedListRecordings.data = [
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
        start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 0,
      },
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
        start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 1000,
      },
    ];

    expect(component.doneRecordings).toEqual(pagedListRecordings);
  }));

  it('should get all scheduled recordings', fakeAsync(() => {
    component.scheduledRecordings.pageSize = 10;

    component.getScheduledRecordings();
    tick();

    let pagedListRecordings = new PagedList<Recording>();
    pagedListRecordings.pageSize = 10;
    pagedListRecordings.total = 2;
    pagedListRecordings.data = [
      {
        id: '20a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
        start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 0,
      },
      {
        id: '20a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
        user: {
          id: "ecaf341e-e600-4e4e-adab-a7e016c993ac",
          email: "admin@test.com",
          firstName: "Admin",
          lastName: "Admin",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3,
        },
        start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 1000,
      },
    ];

    expect(component.scheduledRecordings).toEqual(pagedListRecordings);
  }));

  it('should show error message on get finished recordings error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getFinishedRecordings();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on get scheduled recordings error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getScheduledRecordings();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should download recording', fakeAsync(() => {
    const link = <HTMLAnchorElement><unknown>{
      href: '',
      download: '',
      dispatchEvent: () => {},
      remove: () => {},
    };
    spyOn(document, 'createElement').and.returnValue(link);

    component.downloadRecording('id');
    tick(100);

    expect(link.download).toBe('Recording-2018-08-01_00-00.mp4');
  }));

  it('should download recording', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.downloadRecording('id');
    tick();

    expect(consoleError).toHaveBeenCalledWith('There was an error!', {
      error: {
        message: 'Unknown Error.',
      },
    });

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on get finished recordings error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getFinishedRecordings();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});

