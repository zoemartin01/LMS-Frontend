import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistRetailerUserListComponent } from './whitelist-retailer-user-list.component';

describe('WhitelistRetailerUserListComponent', () => {
  let component: WhitelistRetailerUserListComponent;
  let fixture: ComponentFixture<WhitelistRetailerUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerUserListComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistRetailerUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
