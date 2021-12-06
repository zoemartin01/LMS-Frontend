import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCalenderViewComponent } from './room-calender-view.component';

describe('RoomCalenderViewComponent', () => {
  let component: RoomCalenderViewComponent;
  let fixture: ComponentFixture<RoomCalenderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCalenderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCalenderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
