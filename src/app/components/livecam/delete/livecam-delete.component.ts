import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recording } from 'src/app/types/recording';
import { VideoResolution } from "../../../types/enums/video-resolution";

import { LivecamService } from 'src/app/services/livecam.service';

@Component({
  selector: 'app-livecam-delete',
  templateUrl: './livecam-delete.component.html',
  styleUrls: ['./livecam-delete.component.scss']
})

/**
 * Component for the deletion of a livecam recording
 *
 *
 */
export class LivecamDeleteComponent implements OnInit {
  public recording: Recording = {
    id: null,
    userId: null,
    start: null,
    end: null,
    resolution: VideoResolution.unknown,
    bitrate: 0,
    size: 0,
  }

  /**
   * Constructor
   * @constructor
   * @param {LivecamService} livecamService service providing livecam functionalities
   * @param {ActivatedRoute} route route that activated this component
   */
  constructor(public livecamService: LivecamService, private route: ActivatedRoute) {
  }

  /**
   * Inits page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recording.id = params['id'];
    });
  }

  /**
   * Deletes recording
   */
  public async deleteRecording(): Promise<void> {
    await this.livecamService.deleteRecording(this.recording.id);
  }
}
