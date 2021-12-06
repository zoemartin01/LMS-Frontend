import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerViewComponent } from './whitelist-retailer-view.component';

describe('ViewComponent', () => {
  let component: WhitelistRetailerViewComponent;
  let fixture: ComponentFixture<WhitelistRetailerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
