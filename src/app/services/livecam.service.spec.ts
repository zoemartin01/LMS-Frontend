import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

import { LivecamService } from './livecam.service';

import { VideoResolution } from '../types/enums/video-resolution';

describe('LivecamService', () => {
  let service: LivecamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LivecamService],
    });

    service = TestBed.inject(LivecamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create livecam service', () => {
    expect(service).toBeTruthy();
  });

  it('should schedule a recording', () => {
    const start = moment();
    const end = moment().add(1, 'hour');

    service
      .scheduleRecording(start, end, VideoResolution.V1080, 1000)
      .subscribe((res: any) => {
        expect(res).toEqual({
          id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
          user: {
            id: '284689bf-1c72-4cfa-bf04-47952c839779',
          },
          start: start.toISOString(),
          end: end.toISOString(),
          resolution: VideoResolution.V1080,
          bitrate: 1000,
          size: 0,
        });
      });

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.createSchedule}`
    );

    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual({
      start: start.toISOString(),
      end: end.toISOString(),
      resolution: VideoResolution.V1080,
      bitrate: 1000,
    });

    mockRequest.flush({
      id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
      user: {
        id: '284689bf-1c72-4cfa-bf04-47952c839779',
      },
      start: start.toISOString(),
      end: end.toISOString(),
      resolution: VideoResolution.V1080,
      bitrate: 1000,
      size: 0,
    });
  });

  it('should delete a recording', () => {
    const id = '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f';

    service.deleteRecording(id).subscribe();

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.deleteRecording}`.replace(':id', id)
    );

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush(
      {},
      {
        status: 204,
        statusText: 'No Content',
      }
    );
  });

  it('should get a recordings data', () => {
    const id = '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f';

    service.getRecordingData(id).subscribe((res: any) => {
      expect(res).toEqual({
        id: id,
        user: {
          id: '284689bf-1c72-4cfa-bf04-47952c839779',
        },
        start: '2018-08-01T00:00:00.000Z',
        end: '2018-08-01T01:00:00.000Z',
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 100,
      });
    });

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.getSingleRecording}`.replace(
        ':id',
        id
      )
    );

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
      user: {
        id: '284689bf-1c72-4cfa-bf04-47952c839779',
      },
      start: '2018-08-01T00:00:00.000Z',
      end: '2018-08-01T01:00:00.000Z',
      resolution: VideoResolution.V1080,
      bitrate: 1000,
      size: 100,
    });
  });

  it('should get all recordings', () => {
    service.getAllRecordings().subscribe((res: any) => {
      expect(res.length).toBe(2);
      expect(res).toEqual([
        {
          id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
          user: {
            id: '284689bf-1c72-4cfa-bf04-47952c839779',
          },
          start: '2018-08-01T00:00:00.000Z',
          end: '2018-08-01T01:00:00.000Z',
          resolution: VideoResolution.V1080,
          bitrate: 1000,
          size: 0,
        },
        {
          id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
          user: {
            id: '284689bf-1c72-4cfa-bf04-47952c839779',
          },
          start: '2018-08-01T00:00:00.000Z',
          end: '2018-08-01T01:00:00.000Z',
          resolution: VideoResolution.V1080,
          bitrate: 1000,
          size: 1000,
        },
      ]);
    });

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.getAllRecordings}`
    );

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush([
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
        user: {
          id: '284689bf-1c72-4cfa-bf04-47952c839779',
        },
        start: '2018-08-01T00:00:00.000Z',
        end: '2018-08-01T01:00:00.000Z',
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 0,
      },
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
        user: {
          id: '284689bf-1c72-4cfa-bf04-47952c839779',
        },
        start: '2018-08-01T00:00:00.000Z',
        end: '2018-08-01T01:00:00.000Z',
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 1000,
      },
    ]);
  });

  it('should get all scheduled recordings', () => {
    service.getAllScheduledRecordings().subscribe((res: any) => {
      expect(res.length).toBe(2);
      expect(res).toEqual([
        {
          id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
          user: {
            id: '284689bf-1c72-4cfa-bf04-47952c839779',
          },
          start: '2018-08-01T00:00:00.000Z',
          end: '2018-08-01T01:00:00.000Z',
          resolution: VideoResolution.V1080,
          bitrate: 1000,
          size: 0,
        },
        {
          id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
          user: {
            id: '284689bf-1c72-4cfa-bf04-47952c839779',
          },
          start: '2018-08-01T00:00:00.000Z',
          end: '2018-08-01T01:00:00.000Z',
          resolution: VideoResolution.V1080,
          bitrate: 1000,
          size: 1000,
        },
      ]);
    });

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.getAllScheduled}`
    );

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush([
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
        user: {
          id: '284689bf-1c72-4cfa-bf04-47952c839779',
        },
        start: '2018-08-01T00:00:00.000Z',
        end: '2018-08-01T01:00:00.000Z',
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 0,
      },
      {
        id: '0a8f8f5f-f8f8-4f8f-8f8f-8f8f8f8f8f80',
        user: {
          id: '284689bf-1c72-4cfa-bf04-47952c839779',
        },
        start: '2018-08-01T00:00:00.000Z',
        end: '2018-08-01T01:00:00.000Z',
        resolution: VideoResolution.V1080,
        bitrate: 1000,
        size: 1000,
      },
    ]);
  });

  it('should get the live stream feed', () => {
    service.getLiveStreamFeed().subscribe((res: any) => {
      url: 'ws://localhost:8080/livecam/feed';
    });

    const mockRequest = httpMock.expectOne(
      `${environment.baseUrl}${environment.apiRoutes.livecam.streamFeed}`
    );

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      url: 'ws://localhost:8080/livecam/feed',
    });
  });
});
