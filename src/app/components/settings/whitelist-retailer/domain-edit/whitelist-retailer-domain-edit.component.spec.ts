import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { WhitelistRetailerDomainEditComponent } from './whitelist-retailer-domain-edit.component';

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../../../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomain } from "../../../../types/whitelist-retailer-domain";
import { WhitelistRetailerDomainId } from "../../../../types/aliases/whitelist-retailer-domain-id";

class MockAdminService {
  getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Whitelist Retailer not found.',
            }
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

  editDomainOfWhitelistRetailer(
    whitelistRetailerId: WhitelistRetailerId,
    whitelistRetailerDomainId: WhitelistRetailerDomainId,
    changedData: object): Observable<WhitelistRetailerDomain> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Internal Server Error.',
            }
          }
        });
      }

      observer.next();
    });
  }
}

describe('WhitelistRetailerDomainEditComponent', () => {
  let component: WhitelistRetailerDomainEditComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerDomainEditComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerDomainEditComponent);
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
    expect(component.domainEditForm.controls['domain'].value).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';
    component.whitelistRetailerDomain.id = '227ffc6a-2953-41d7-abea-c4046720f62a';

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
    expect(component.domainEditForm.controls['domain'].value).toEqual('jordan.biz')
  }));

  it('should not try to get whitelist retailer data when whitelist retailer id is null',
    fakeAsync(() => {
    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(consoleError).not.toHaveBeenCalled();
    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    component.whitelistRetailer.id = 'retailerExampleID';

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailer).toEqual({
      id: 'retailerExampleID',
      name: '',
      domains: [],
    });
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should add domain to whitelist retailer', fakeAsync(() => {
    component.domainEditForm.controls['domain'].setValue('jordan.org');
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');

    component.editDomainOfWhitelistRetailer();
    tick();

    expect(modalClose).toHaveBeenCalledWith('edited');
  }));

  it('should return domain if domain has to be added to a not yet existing whitelist retailer',
    fakeAsync(() => {
    component.domainEditForm.controls['domain'].setValue('russianwarshipgofuckyourself.club');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.editDomainOfWhitelistRetailer();
    tick();

    expect(consoleError).not.toHaveBeenCalled();
    expect(modalClose).toHaveBeenCalledWith(component.domainEditForm.value.domain);
  }))

  it('should throw an error when adding a domain to a whitelisted retailer', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.domainEditForm.controls['domain'].setValue('jordan.org');
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.editDomainOfWhitelistRetailer();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));
});
