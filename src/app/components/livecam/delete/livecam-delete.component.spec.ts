import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { WINDOW_PROVIDERS } from "../../../providers/window.providers";

import { LivecamDeleteComponent } from './livecam-delete.component';

describe('LivecamDeleteComponent', () => {
  let component: LivecamDeleteComponent;
  let fixture: ComponentFixture<LivecamDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LivecamDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
        WINDOW_PROVIDERS,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LivecamDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
