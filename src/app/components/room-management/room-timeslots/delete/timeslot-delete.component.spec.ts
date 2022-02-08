import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotDeleteComponent } from './timeslot-delete.component';

describe('TimeslotDeleteComponent', () => {
  let component: TimeslotDeleteComponent;
  let fixture: ComponentFixture<TimeslotDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotDeleteComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
