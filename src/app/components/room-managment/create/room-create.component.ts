import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  constructor() { }

  /**
   * Init page
   */
  ngOnInit(): void {
  }

  /**
   * Creates room with data
   *
   * @param {NgForm} roomCreationForm submitted creation form
   */
  public createRoom(roomCreationForm: NgForm): Promise<void> {
  }
}
