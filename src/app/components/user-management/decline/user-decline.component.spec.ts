import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeclineComponent } from './user-decline.component';

describe('UserDeclineComponent', () => {
  let component: UserDeclineComponent;
  let fixture: ComponentFixture<UserDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
