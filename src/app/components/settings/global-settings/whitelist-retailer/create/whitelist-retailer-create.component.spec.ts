import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerCreateComponent } from './whitelist-retailer-create.component';

describe('RetailerCreateComponent', () => {
  let component: WhitelistRetailerCreateComponent;
  let fixture: ComponentFixture<WhitelistRetailerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
