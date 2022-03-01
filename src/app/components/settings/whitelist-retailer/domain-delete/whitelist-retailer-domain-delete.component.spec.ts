import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { WhitelistRetailerDomainDeleteComponent } from './whitelist-retailer-domain-delete.component';

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../../../types/aliases/whitelist-retailer-id";
import { WhitelistRetailerDomainId } from "../../../../types/aliases/whitelist-retailer-domain-id";

class MockAdminService {
  getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Whitelist Retailer not Found.',
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

  deleteDomainOfWhitelistRetailer(whitelistRetailerId: WhitelistRetailerId, whitelistRetailerDomainId: WhitelistRetailerDomainId): Observable<void> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Whitelist Retailer not Found.',
            }
          }
        });
      }

      observer.next();
    });
  }
}

describe('WhitelistRetailerDomainDeleteComponent', () => {
  let component: WhitelistRetailerDomainDeleteComponent;
  let fixture: ComponentFixture<WhitelistRetailerDomainDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerDomainDeleteComponent,
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

    fixture = TestBed.createComponent(WhitelistRetailerDomainDeleteComponent);
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

    expect(component.domainDeleteForm.controls['name'].value).toEqual('');
    expect(component.domainDeleteForm.controls['domain'].value).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';
    component.whitelistRetailerDomain.id = 'e23fa361-c2f3-4575-9743-ef2b49b203b6';

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
    expect(component.domainDeleteForm.controls['name'].value).toEqual('McGlynn and Sons and daughters');
    expect(component.domainDeleteForm.controls['domain'].value).toEqual('lacey.biz');
  }));

  it('should throw error on initialization of page', fakeAsync(() => {
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

  it('should update form on init if whitelist retailer id is null', fakeAsync(() => {
    component.name = 'Duck Putin'
    component.domain = 'russianwarshipgofuckyourself.club'

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    component.ngOnInit();
    tick();

    expect(component.domainDeleteForm.controls['name'].value).toEqual('Duck Putin');
    expect(component.domainDeleteForm.controls['domain'].value).toEqual('russianwarshipgofuckyourself.club');
  }));

  it('should delete whitelist retailer domain', fakeAsync(() => {
    component.whitelistRetailer.id = 'retailerExampleID';
    component.whitelistRetailerDomain.id = 'e23fa361-c2f3-4575-9743-ef2b49b203b6';

    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteDomainOfWhitelistRetailer();
    tick();

    expect(modalClose).toHaveBeenCalledWith('deleted')
  }));

  it('should delete whitelist retailer when whitelist retailer id is null', fakeAsync(() => {
    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });

    component.name = 'Duck Putin';
    component.domain = 'russianwarshipgofuckyourself.club';

    const modalClose = spyOn(component.activeModal, 'close');

    component.deleteDomainOfWhitelistRetailer();
    tick();

    expect(modalClose).toHaveBeenCalledWith('deleted');
  }));

  it('should throw an error on delete of whitelist retailer domain', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.whitelistRetailer.id = 'retailerExampleID';
    component.whitelistRetailerDomain.id = 'e23fa361-c2f3-4575-9743-ef2b49b203b6';

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.deleteDomainOfWhitelistRetailer();
    tick();

    expect(modalClose).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();

    localStorage.removeItem('throwError');
  }));
});
