import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentListComponent } from './admin-appointment-list.component';

describe('AdminAppointmentListComponent', () => {
  let component: AdminAppointmentListComponent;
  let fixture: ComponentFixture<AdminAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
