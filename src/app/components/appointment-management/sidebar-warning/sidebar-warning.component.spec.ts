import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWarningComponent } from './sidebar-warning.component';

describe('SidebarWarningComponent', () => {
  let component: SidebarWarningComponent;
  let fixture: ComponentFixture<SidebarWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
