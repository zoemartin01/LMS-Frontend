import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recording } from 'src/app/types/recording';

import { LivecamService } from 'src/app/services/livecam.service';

@Component({
  selector: 'app-livecam-delete',
  templateUrl: './livecam-delete.component.html',
  styleUrls: ['./livecam-delete.component.scss']
})
export class LivecamDeleteComponent implements OnInit {
  public recording: Recording = {
    id: null,
  }

  constructor(public livecamService: LivecamService, private route: ActivatedRoute) {
  }

  /**
   * Init page
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recording.id = +params['id'];
    });
  }

  /**
   * Delete recording
   */
  public async deleteRecording(): Promise<void> {
    await this.livecamService.deleteRecording(this.recording.id);
  }
}
