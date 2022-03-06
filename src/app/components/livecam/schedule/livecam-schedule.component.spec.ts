import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { LivecamScheduleComponent } from './livecam-schedule.component';

import { LivecamService } from 'src/app/services/livecam.service';

import { Recording } from 'src/app/types/recording';
import { User } from 'src/app/types/user';
import { UserRole } from 'src/app/types/enums/user-role';
import { VideoResolution } from 'src/app/types/enums/video-resolution';

class MockLivecamService {
  public scheduleRecording(
    start: moment.Moment,
    end: moment.Moment,
    resolution: VideoResolution,
    bitrate: number
  ): Observable<Recording> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Unknown Error.',
          },
        });
      }

      observer.next({
        id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
        user: {
          id: '59f1589d-197c-4f53-bfc1-4c57aae14c42',
          email: '',
          firstName: '',
          lastName: '',
          role: UserRole.admin,
        } as User,
        start: '2019-01-01T00:00:00.000Z' as unknown as moment.Moment,
        end: '2019-01-02T00:00:00.000Z' as unknown as moment.Moment,
        resolution: VideoResolution.V1080,
        bitrate: 100,
        size: 0,
      });
    });
  }
}

describe('LivecamScheduleComponent', () => {
  let component: LivecamScheduleComponent;
  let fixture: ComponentFixture<LivecamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivecamScheduleComponent],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: LivecamService, useClass: MockLivecamService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LivecamScheduleComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecamScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create livecam schedule component', () => {
    expect(component).toBeTruthy();
  });

  it('should schedule recording with valid parameters', (done: DoneFn) => {
    let closeModal = spyOn(component.activeModal, 'close');
    component.recordingScheduleForm.controls['start'].setValue('2019-01-01T00:00');
    component.recordingScheduleForm.controls['end'].setValue('2019-01-02T00:00');
    component.recordingScheduleForm.controls['resolution'].setValue(VideoResolution.V1080);
    component.recordingScheduleForm.controls['bitrate'].setValue(100);
    component.recordingScheduleForm.controls['bitrate_unit'].setValue('bps');

    expect(component.recordingScheduleForm.valid).toBeTrue();

    component.scheduleRecording().then(() => {
      expect(component.errorMessage).toEqual('');
      expect(closeModal).toHaveBeenCalledWith('scheduled')
      done();
    });
  });

  it('should schedule recording with valid parameters and bitrate unit kbps', (done: DoneFn) => {
    let closeModal = spyOn(component.activeModal, 'close');
    component.recordingScheduleForm.controls['start'].setValue('2019-01-01T00:00');
    component.recordingScheduleForm.controls['end'].setValue('2019-01-02T00:00');
    component.recordingScheduleForm.controls['resolution'].setValue(VideoResolution.V1080);
    component.recordingScheduleForm.controls['bitrate'].setValue(100);
    component.recordingScheduleForm.controls['bitrate_unit'].setValue('kbps');

    expect(component.recordingScheduleForm.valid).toBeTrue();

    component.scheduleRecording().then(() => {
      expect(component.errorMessage).toBe('');
      expect(closeModal).toHaveBeenCalledWith('scheduled')
      done();
    });
  });

  it('should schedule recording with valid parameters and bitrate unit mbps', (done: DoneFn) => {
    let closeModal = spyOn(component.activeModal, 'close');
    component.recordingScheduleForm.controls['start'].setValue('2019-01-01T00:00');
    component.recordingScheduleForm.controls['end'].setValue('2019-01-02T00:00');
    component.recordingScheduleForm.controls['resolution'].setValue(VideoResolution.V1080);
    component.recordingScheduleForm.controls['bitrate'].setValue(100);
    component.recordingScheduleForm.controls['bitrate_unit'].setValue('mbps');

    expect(component.recordingScheduleForm.valid).toBeTrue();

    component.scheduleRecording().then(() => {
      expect(component.errorMessage).toEqual('');
      expect(closeModal).toHaveBeenCalledWith('scheduled')
      done();
    });
  });

  it('should handle schedule recording error with invalid parameters', (done: DoneFn) => {
    localStorage.setItem('throwError', 'true');

    component.recordingScheduleForm.controls['start'].setValue('2019-01-02T00:00');
    component.recordingScheduleForm.controls['end'].setValue('2019-01-03T00:00');
    component.recordingScheduleForm.controls['resolution'].setValue(VideoResolution.V1080);
    component.recordingScheduleForm.controls['bitrate'].setValue('-1');
    component.recordingScheduleForm.controls['bitrate_unit'].setValue('bps');

    expect(component.recordingScheduleForm.valid).toBeTrue();

    component.scheduleRecording().then(() => {
      expect(component.errorMessage).toEqual(
        'Unknown Error.'
      );
      done();
    });
    localStorage.setItem('throwError', 'false');
  });

  it('should show error when form is invalid', (done: DoneFn) => {
    component.recordingScheduleForm.controls['start'].setValue('2019-01-02T00:00:00.000Z');
    component.recordingScheduleForm.controls['end'].setValue('2019-01-03T00:00:00.000Z');
    component.recordingScheduleForm.controls['resolution'].setValue(VideoResolution.V1080);
    component.recordingScheduleForm.controls['bitrate'].setValue('');
    component.recordingScheduleForm.controls['bitrate_unit'].setValue('bps');

    expect(component.recordingScheduleForm.valid).toBeFalse();

    component.scheduleRecording().then(() => {
      expect(component.errorMessage).toEqual(
        'You need to fill in all required fields!'
      );
      done();
    });
  });

  it('should set the minimum of end moment to be the start moment', fakeAsync((one: DoneFn) => {
    component.recordingScheduleForm.controls['start'].setValue('2019-01-02T00:00:00.000Z');
    let endMin = moment('2019-01-02T00:00:00.000Z', 'YYYY-MM-DDTHH:mm');
    component.updateEndField();
    tick();
    expect(component.endMin).toEqual(endMin);
  }));

  it('should turn all non-null enum values into strings', fakeAsync((one: DoneFn) => {
    expect(component.resolutions()).toEqual(['256x144', '320x240', '640x360', '640x480', '1280x720', '1920x1080', '2560x1440', '3840x2160']);
    tick();
  }));
});
