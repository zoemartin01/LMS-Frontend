import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { RoomCalendarViewComponent } from './room-calendar-view.component';

describe('RoomCalendarViewComponent', () => {
  let component: RoomCalendarViewComponent;
  let fixture: ComponentFixture<RoomCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomCalendarViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCalendarViewComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
