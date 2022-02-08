import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { TimeslotViewComponent } from './timeslot-view.component';

describe('TimeslotViewComponent', () => {
  let component: TimeslotViewComponent;
  let fixture: ComponentFixture<TimeslotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
