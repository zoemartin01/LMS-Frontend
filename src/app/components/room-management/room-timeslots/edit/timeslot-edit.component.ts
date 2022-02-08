import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimespanId} from "../../../../types/aliases/timespan-id";

@Component({
  selector: 'app-timeslot-edit',
  templateUrl: './timeslot-edit.component.html',
  styleUrls: ['./timeslot-edit.component.scss']
})
export class TimeslotEditComponent implements OnInit {
  @Input() timeslotId: TimespanId = '';
  @Output() closeForm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
