import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AppointmentAcceptComponent } from './appointment-accept.component';

describe('AppointmentAcceptComponent', () => {
  let component: AppointmentAcceptComponent;
  let fixture: ComponentFixture<AppointmentAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentAcceptComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentAcceptComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
