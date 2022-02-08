import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotViewComponent } from './timeslot-view.component';

describe('TimeslotViewComponent', () => {
  let component: TimeslotViewComponent;
  let fixture: ComponentFixture<TimeslotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotViewComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
