import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { WINDOW_PROVIDERS } from "../../../providers/window.providers";

import { LivecamOverviewComponent } from './livecam-overview.component';

describe('OverviewComponent', () => {
  let component: LivecamOverviewComponent;
  let fixture: ComponentFixture<LivecamOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LivecamOverviewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        WINDOW_PROVIDERS,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecamOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
