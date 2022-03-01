import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { WhitelistRetailerDomainCreateComponent } from './whitelist-retailer-domain-create.component';
import {WhitelistRetailerId} from "../../../../types/aliases/whitelist-retailer-id";
import {Observable} from "rxjs";
import {WhitelistRetailer} from "../../../../types/whitelist-retailer";
import {WhitelistRetailerDomain} from "../../../../types/whitelist-retailer-domain";
import {AdminService} from "../../../../services/admin.service";

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

      observer.next({id: "retailerExampleID",
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
        ]});
    });
    }

  addDomainToWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomain: string): Observable<WhitelistRetailerDomain> {
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

      observer.next(
        {id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
        domain: "louisa.org"}
      );
    });
    }
  }

describe('WhitelistRetailerDomainCreateComponent', () => {
  let component: WhitelistRetailerDomainCreateComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerDomainCreateComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: AdminService, useClass: MockAdminService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerDomainCreateComponent);
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

    component.whitelistRetailer.id = 'retailerExampleID';

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailer).toEqual({id: "retailerExampleID",
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
      ]});
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

  it('should not try to get whitelist retailer data when id is null', fakeAsync(() => {
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

  it('should add domain to whitelist retailer', fakeAsync(() => {
    component.domainCreateForm.controls['domain'].setValue('louisa.org');
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');

    component.addDomainToWhitelistRetailer();
    tick();

    expect(modalClose).toHaveBeenCalledWith('created 131d596c-1ec3-4c3d-a31e-02bb2e0b253b');
  }));

  it('should throw an error when adding a domain to a whitelisted retailer', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.domainCreateForm.controls['domain'].setValue('louisa.org');
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.addDomainToWhitelistRetailer();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));

  it('should return domain if domain has to be added to a not yet existing whitelist retailer', fakeAsync(() => {
    component.domainCreateForm.controls['domain'].setValue('russianwarshipgofuckyourself.club');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.addDomainToWhitelistRetailer();
    tick();

    expect(consoleError).not.toHaveBeenCalled();
    expect(modalClose).toHaveBeenCalledWith(component.domainCreateForm.value.domain);
  }));

  it('should throw an error when trying to add an empty domain to a whitelisted retailer', fakeAsync(() => {
    component.domainCreateForm.controls['domain'].setValue('');
    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.addDomainToWhitelistRetailer();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));
});
