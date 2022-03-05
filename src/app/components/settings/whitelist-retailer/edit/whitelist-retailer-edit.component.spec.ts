import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {WhitelistRetailerEditComponent} from './whitelist-retailer-edit.component';

import {AdminService} from "../../../../services/admin.service";

import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {WhitelistRetailerId} from "../../../../types/aliases/whitelist-retailer-id";
import {WhitelistRetailerDomain} from "../../../../types/whitelist-retailer-domain";

class MockAdminService {
  getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Whitelist Retailer not found.',
          },
        });
      }

      observer.next({
        id: "retailerExampleID",
        name: "McGlynn and Sons and daughters",
        domains: [
          {
            id: "227ffc6a-2953-41d7-abea-c4046720f62a",
            domain: "jordan.biz",
          },
          {
            id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
            domain: "lacey.biz",
          },
        ]
      });
    });
  }

  editWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId, changedData: object)
    : Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Whitelist Retailer not found.',
          },
        });
      }

      observer.next();
    });
  }
}

class MockModalService {
  whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  };
  whitelistRetailerDomain: WhitelistRetailerDomain = {
    id: null,
    domain: '',
  };

  open(): { componentInstance: { whitelistRetailer: WhitelistRetailer, whitelistRetailerDomain: WhitelistRetailerDomain }, result: Promise<string> } {
    return {
      componentInstance: {
        whitelistRetailer: this.whitelistRetailer,
        whitelistRetailerDomain: this.whitelistRetailerDomain,
      },
      result: new Promise<string>(
        resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  }
}

describe('RetailerEditComponent', () => {
  let component: WhitelistRetailerEditComponent;
  let fixture: ComponentFixture<WhitelistRetailerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerEditComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: AdminService, useClass: MockAdminService},
        {provide: NgbModal, useClass: MockModalService},
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerEditComponent);
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
    expect(component.retailerEditForm.controls['name'].value).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailer).toEqual({
      id: "retailerExampleID",
      name: "McGlynn and Sons and daughters",
      domains: [
        {
          id: "227ffc6a-2953-41d7-abea-c4046720f62a",
          domain: "jordan.biz",
        },
        {
          id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
          domain: "lacey.biz",
        },
      ]
    });
    expect(component.retailerEditForm.controls['name'].value).toEqual('McGlynn and Sons and daughters');
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });
    expect(component.retailerEditForm.controls['name'].value).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(component.whitelistRetailer).toEqual({
      id: 'retailerExampleID',
      name: '',
      domains: [],
    });
    expect(component.retailerEditForm.controls['name'].value).toEqual('');

    localStorage.removeItem('throwError');
  }));

  it('should edit whitelist retailer', fakeAsync(() => {
    component.whitelistRetailer.id = 'retailerExampleID';
    component.retailerEditForm.controls['name'].setValue('Duck Putin');

    const modalClose = spyOn(component.activeModal, 'close');

    component.editWhitelistRetailerData();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should throw an error on edit whitelist retailer', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.whitelistRetailer.id = 'retailerExampleID';
    component.retailerEditForm.controls['name'].setValue('Duck Putin');

    expect(component.errorMessage).toEqual('');

    const modalClose = spyOn(component.activeModal, 'close');

    component.editWhitelistRetailerData();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Whitelist Retailer not found.');

    localStorage.removeItem('throwError');
  }));

  it('should open whitelist retailer domain edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    component.dirty = false;
    component.whitelistRetailer.id = 'retailerExampleID';

    component.openWhitelistRetailerDomainEditForm('227ffc6a-2953-41d7-abea-c4046720f62a');
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer domain deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.dirty = false;
    component.whitelistRetailer.id = 'retailerExampleID';

    component.openWhitelistRetailerDomainDeletionDialog('227ffc6a-2953-41d7-abea-c4046720f62a');
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer domain creation form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created domainExampleId');

    component.dirty = false;
    component.whitelistRetailer.id = 'retailerExampleID';

    component.openWhitelistRetailerDomainCreationForm();
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should throw an error when retailer name is empty', fakeAsync(() => {
    expect(component.errorMessage).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';
    component.retailerEditForm.controls['name'].setValue('');

    component.editWhitelistRetailerData();
    tick();

    expect(component.errorMessage).toEqual('Retailer name cannot be empty');
  }));
});
