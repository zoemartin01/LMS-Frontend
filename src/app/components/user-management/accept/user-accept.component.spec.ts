import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { UserAcceptComponent } from './user-accept.component';

describe('UserAcceptComponent', () => {
  let component: UserAcceptComponent;
  let fixture: ComponentFixture<UserAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserAcceptComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAcceptComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
