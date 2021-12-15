import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerEditComponent } from './whitelist-retailer-edit.component';

describe('RetailerEditComponent', () => {
  let component: WhitelistRetailerEditComponent;
  let fixture: ComponentFixture<WhitelistRetailerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
