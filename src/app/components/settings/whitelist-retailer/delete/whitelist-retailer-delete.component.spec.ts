import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {WhitelistRetailerDeleteComponent} from './whitelist-retailer-delete.component';

import {AdminService} from "../../../../services/admin.service";

import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {WhitelistRetailerId} from "../../../../types/aliases/whitelist-retailer-id";

class MockAdminService {
  getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Whitelist Retailer not Found.',
          }
        });
      }

      observer.next({
        id: "retailerExampleID",
        name: "McGlynn and Sons and daughters",
        domains: [
          {
            id: "227ffc6a-2953-41d7-abea-c4046720f62a",
            domain: "jordan.biz"
          },
          {
            id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
            domain: "lacey.biz"
          },
        ],
      });
    });
  }

  deleteWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Whitelist Retailer not Found.',
          }
        });
      }

      observer.next();
    });
  }
}

describe('WhitelistRetailerDeleteComponent', () => {
  let component: WhitelistRetailerDeleteComponent;
  let fixture: ComponentFixture<WhitelistRetailerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerDeleteComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AdminService, useClass: MockAdminService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailer).toEqual({
      id: "retailerExampleID",
      name: "McGlynn and Sons and daughters",
      domains: [
        {
          id: "227ffc6a-2953-41d7-abea-c4046720f62a",
          domain: "jordan.biz"
        },
        {
          id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
          domain: "lacey.biz"
        },
      ],
    });

    expect(component.retailerDeleteForm.controls['name'].value).toEqual("McGlynn and Sons and daughters");
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    expect(component.retailerDeleteForm.controls['name'].value).toEqual('');

    localStorage.removeItem('throwError');
  }));

  it('should delete whitelist retailer', fakeAsync(() => {
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteWhitelistRetailer();

    expect(modalClose).toHaveBeenCalledWith('deleted');
  }));

  it('should throw error on delete whitelist retailer', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteWhitelistRetailer();

    expect(modalClose).not.toHaveBeenCalledWith('deleted');

    localStorage.removeItem('throwError');
  }));
});
