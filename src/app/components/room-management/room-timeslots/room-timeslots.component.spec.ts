import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTimeslotsComponent } from './room-timeslots.component';

describe('RoomTimeslotsComponent', () => {
  let component: RoomTimeslotsComponent;
  let fixture: ComponentFixture<RoomTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTimeslotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
