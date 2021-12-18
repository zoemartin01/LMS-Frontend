import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerDeleteComponent } from './whitelist-retailer-delete.component';

describe('WhitelistRetailerDeleteComponent', () => {
  let component: WhitelistRetailerDeleteComponent;
  let fixture: ComponentFixture<WhitelistRetailerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
