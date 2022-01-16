import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { WhitelistRetailerViewComponent } from './whitelist-retailer-view.component';

describe('ViewComponent', () => {
  let component: WhitelistRetailerViewComponent;
  let fixture: ComponentFixture<WhitelistRetailerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerViewComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
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
