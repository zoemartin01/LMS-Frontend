import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TimeslotEditComponent } from './timeslot-edit.component';

describe('TimeslotEditComponent', () => {
  let component: TimeslotEditComponent;
  let fixture: ComponentFixture<TimeslotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotEditComponent,
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

    fixture = TestBed.createComponent(TimeslotEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
