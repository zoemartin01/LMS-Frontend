import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAppointmentListComponent } from './personal-appointment-list.component';

describe('PersonalAppointmentListComponent', () => {
  let component: PersonalAppointmentListComponent;
  let fixture: ComponentFixture<PersonalAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
