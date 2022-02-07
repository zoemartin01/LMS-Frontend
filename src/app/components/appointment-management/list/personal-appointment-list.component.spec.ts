import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxPaginationModule } from "ngx-pagination";

import { PersonalAppointmentListComponent } from './personal-appointment-list.component';

describe('PersonalAppointmentListComponent', () => {
  let component: PersonalAppointmentListComponent;
  let fixture: ComponentFixture<PersonalAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PersonalAppointmentListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalAppointmentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
