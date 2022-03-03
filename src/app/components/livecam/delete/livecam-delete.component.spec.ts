import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {RecordingId} from "../../../types/aliases/recording-id";
import {Recording} from "../../../types/recording";
import * as moment from "moment";
import {VideoResolution} from "../../../types/enums/video-resolution";
import {LivecamDeleteComponent} from "./livecam-delete.component";
import {LivecamService} from "../../../services/livecam.service";

class MockLivecamService {
  getRecordingData(recordingId: RecordingId): Observable<Recording> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            },
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
            notificationChannel: 3
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

  deleteRecording(recordingId: RecordingId): Observable<Recording> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Unknown Error.',
            },
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
          notificationChannel: 3
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
}

describe('LivecamDeleteComponent method calls', () => {
  let component: LivecamDeleteComponent;
  let fixture: ComponentFixture<LivecamDeleteComponent>;
  let consoleError: jasmine.Spy<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LivecamDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: LivecamService, useClass: MockLivecamService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LivecamDeleteComponent);
    component = fixture.componentInstance;
    consoleError = spyOn(console, 'error');
    consoleError.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recording to init page and set component attributes', fakeAsync(() => {
    component.ngOnInit();
    tick();

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
        notificationChannel: 3
      },
      start: moment('2018-08-01T00:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
      end: moment('2018-08-01T01:00:00.000Z', 'YYYY-MM-DDTHH:mm'),
      resolution: VideoResolution.V1080,
      bitrate: 1000,
      size: 0,
    };

    expect(component.recording).toEqual(recording);
    expect(component.recordingDeleteForm.controls['user_name'].value).toEqual(`${recording.user.firstName} ${recording.user.lastName}`);
    // @ts-ignore
    expect(component.recordingDeleteForm.controls['start'].value).toEqual(recording.start.format('YYYY-MM-DDTHH:mm'));
    // @ts-ignore
    expect(component.recordingDeleteForm.controls['end'].value).toEqual(recording.end.format('YYYY-MM-DDTHH:mm'));
    expect(component.recordingDeleteForm.controls['resolution'].value).toEqual(recording.resolution);
    expect(component.recordingDeleteForm.controls['bitrate'].value).toEqual(recording.bitrate + ' Bytes');
  }));

  it('should delete a recording', fakeAsync(() => {
    component.recording.id = '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f';

    component.getRecordingData();
    tick();

    let closeModal = spyOn(component.activeModal, 'close');

    component.deleteRecording()
    tick();

    expect(closeModal).toHaveBeenCalledWith('deleted');
  }));

  it('should show error message on get recording error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.getRecordingData();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));

  it('should show error message on delete recording error', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.deleteRecording();
    tick();

    expect(consoleError).toHaveBeenCalled();

    localStorage.setItem('throwError', 'false');
  }));
});
