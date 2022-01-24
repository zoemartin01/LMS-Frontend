import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { AppointmentEditComponent } from './appointment-edit.component';

describe('AppointmentEditComponent', () => {
  let component: AppointmentEditComponent;
  let fixture: ComponentFixture<AppointmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentEditComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
