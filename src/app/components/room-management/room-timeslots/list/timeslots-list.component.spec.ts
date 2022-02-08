import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsListComponent } from './timeslots-list.component';

describe('TimeslotsListComponent', () => {
  let component: TimeslotsListComponent;
  let fixture: ComponentFixture<TimeslotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotsListComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
