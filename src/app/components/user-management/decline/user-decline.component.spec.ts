import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { UserDeclineComponent } from './user-decline.component';

describe('UserDeclineComponent', () => {
  let component: UserDeclineComponent;
  let fixture: ComponentFixture<UserDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserDeclineComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeclineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
