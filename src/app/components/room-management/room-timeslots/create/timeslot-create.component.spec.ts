import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotCreateComponent } from './timeslot-create.component';

describe('TimeslotCreateComponent', () => {
  let component: TimeslotCreateComponent;
  let fixture: ComponentFixture<TimeslotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotCreateComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
