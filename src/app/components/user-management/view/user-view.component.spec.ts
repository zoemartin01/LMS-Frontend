import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { UserViewComponent } from './user-view.component';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
