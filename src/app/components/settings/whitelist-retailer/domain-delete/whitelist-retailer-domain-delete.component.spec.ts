import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerDomainDeleteComponent } from './whitelist-retailer-domain-delete.component';

describe('WhitelistRetailerDomainDeleteComponent', () => {
  let component: WhitelistRetailerDomainDeleteComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerDomainDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerDomainDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
