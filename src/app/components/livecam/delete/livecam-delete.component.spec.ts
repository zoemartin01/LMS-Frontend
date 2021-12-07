import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecamDeleteComponent } from './livecam-delete.component';

describe('LivecamDeleteComponent', () => {
  let component: LivecamDeleteComponent;
  let fixture: ComponentFixture<LivecamDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivecamDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecamDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
