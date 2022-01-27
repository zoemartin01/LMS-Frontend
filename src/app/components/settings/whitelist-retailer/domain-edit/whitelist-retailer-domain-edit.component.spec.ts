import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerDomainEditComponent } from './whitelist-retailer-domain-edit.component';

describe('WhitelistRetailerDomainEditComponent', () => {
  let component: WhitelistRetailerDomainEditComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhitelistRetailerDomainEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerDomainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
