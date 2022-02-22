import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { SidebarWarningComponent } from './sidebar-warning.component';

describe('SidebarWarningComponent', () => {
  let component: SidebarWarningComponent;
  let fixture: ComponentFixture<SidebarWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarWarningComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarWarningComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
