import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotEditComponent } from './timeslot-edit.component';

describe('TimeslotEditComponent', () => {
  let component: TimeslotEditComponent;
  let fixture: ComponentFixture<TimeslotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
