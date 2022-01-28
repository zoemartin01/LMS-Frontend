import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerDomainCreateComponent } from './whitelist-retailer-domain-create.component';

describe('WhitelistRetailerDomainCreateComponent', () => {
  let component: WhitelistRetailerDomainCreateComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerDomainCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerDomainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
