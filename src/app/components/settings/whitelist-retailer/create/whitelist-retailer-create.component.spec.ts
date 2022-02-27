import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { WhitelistRetailerCreateComponent } from './whitelist-retailer-create.component';

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";

class MockAdminService {
  createWhitelistRetailer(domains: String[], name: String): Observable<WhitelistRetailer> {
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
    })
  }
}

class MockModalService {
  domain: String = "";
  open(): { componentInstance: { domain: String }, result: Promise<string> } {
    return {
      componentInstance: {
        domain: this.domain,
      },
      result: new Promise<string>(resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

describe('WhitelistRetailerCreateComponent', () => {
  let component: WhitelistRetailerCreateComponent;
  let fixture: ComponentFixture<WhitelistRetailerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerCreateComponent,
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
        { provide: NgbModal, useClass: MockModalService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create whitelist retailer', fakeAsync(() => {
    component.retailerCreateForm.controls['name'].setValue('McGlynn and Sons and daughters')
    component.domains = [
      "jordan.biz",
      "lacey.biz"
    ];

    const modalClose = spyOn(component.activeModal, 'close');

    component.createWhitelistRetailer();
    tick();

    expect(modalClose).toHaveBeenCalledWith('created retailerExampleID');
  }));

  it('should throw an error on create whitelist retailer', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');
    component.retailerCreateForm.controls['name'].setValue('McGlynn and Sons and daughters')
    component.domains = [
      "jordan.biz",
      "lacey.biz"
    ];

    const modalClose = spyOn(component.activeModal, 'close');
    const consoleError = spyOn(console, 'error');

    component.createWhitelistRetailer();
    tick();

    expect(consoleError).toHaveBeenCalled();
    expect(modalClose).not.toHaveBeenCalledWith('created retailerExampleID');

    localStorage.removeItem('throwError');
  }));

  it('should open whitelist retailer domain creation form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created');

    component.dirty = false;

    component.openWhitelistRetailerDomainCreationForm();
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer domain edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    component.dirty = false;

    component.openWhitelistRetailerDomainEditForm('exampleDomainId');
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.dirty = false;
    component.domains = [
      'domain.test',
      'domain.2.test'
    ]

    component.openWhitelistRetailerDomainDeletionDialog('domain.test');
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));
});
