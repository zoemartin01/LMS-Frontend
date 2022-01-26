import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { GlobalSettingsComponent } from './global-settings.component';

import { AdminService } from "../../../services/admin.service";

describe('GlobalSettingsComponent', () => {
  let component: GlobalSettingsComponent;
  let fixture: ComponentFixture<GlobalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GlobalSettingsComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule ,
        RouterTestingModule,
      ],
      providers: [
        AdminService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
