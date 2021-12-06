import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrderListComponent } from './personal-order-list.component';

describe('PersonalOrderListComponent', () => {
  let component: PersonalOrderListComponent;
  let fixture: ComponentFixture<PersonalOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
