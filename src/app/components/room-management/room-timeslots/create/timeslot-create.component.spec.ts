import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotCreateComponent } from './timeslot-create.component';

describe('TimeslotCreateComponent', () => {
  let component: TimeslotCreateComponent;
  let fixture: ComponentFixture<TimeslotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
