import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TimeslotCreateComponent } from './timeslot-create.component';

describe('TimeslotCreateComponent', () => {
  let component: TimeslotCreateComponent;
  let fixture: ComponentFixture<TimeslotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotCreateComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
