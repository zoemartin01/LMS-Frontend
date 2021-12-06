import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecamOverviewComponent } from './livecam-overview.component';

describe('OverviewComponent', () => {
  let component: LivecamOverviewComponent;
  let fixture: ComponentFixture<LivecamOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivecamOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecamOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
