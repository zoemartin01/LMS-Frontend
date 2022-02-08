import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxPaginationModule } from "ngx-pagination";

import { TimeslotsListComponent } from './timeslots-list.component';

describe('TimeslotsListComponent', () => {
  let component: TimeslotsListComponent;
  let fixture: ComponentFixture<TimeslotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeslotsListComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        RouterTestingModule,
      ],
      providers: [
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
