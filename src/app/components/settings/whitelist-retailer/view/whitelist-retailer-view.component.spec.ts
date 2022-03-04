import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { WhitelistRetailerViewComponent } from './whitelist-retailer-view.component';

import { AdminService } from "../../../../services/admin.service";

import { WhitelistRetailer } from "../../../../types/whitelist-retailer";
import { WhitelistRetailerId } from "../../../../types/aliases/whitelist-retailer-id";

class MockAdminService {
  getWhitelistRetailerData(whitelistRetailerId: WhitelistRetailerId): Observable<WhitelistRetailer> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            error: {
              message: 'Whitelist Retailer not found.',
            },
          },
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
}

class MockModalService {
  whitelistRetailer: WhitelistRetailer = {
    id: null,
    name: '',
    domains: [],
  };

  open(): { componentInstance: { whitelistRetailer: WhitelistRetailer }, result: Promise<string> } {
    return {
      componentInstance: {
        whitelistRetailer: this.whitelistRetailer,
      },
      result: new Promise<string>(
        resolve =>  resolve(localStorage.getItem('returnVal') ?? 'aborted')
      ),
    };
  }
}

describe('WhitelistRetailerViewComponent', () => {
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
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        { provide: NgbModal, useClass: MockModalService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhitelistRetailerViewComponent);
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
    expect(component.retailerViewForm.controls['name'].value).toEqual('');

    component.whitelistRetailer.id = 'retailerExampleID';

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
    expect(component.retailerViewForm.controls['name'].value).toEqual('McGlynn and Sons and daughters');
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.whitelistRetailer).toEqual({
      id: null,
      name: '',
      domains: [],
    });
    expect(component.retailerViewForm.controls['name'].value).toEqual('');

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
    expect(component.retailerViewForm.controls['name'].value).toEqual('');

    localStorage.removeItem('throwError');
  }));

  it('should open whitelist retailer edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    component.dirty = false;
    component.whitelistRetailer.id = 'retailerExampleID';

    component.openWhitelistRetailerEditForm();
    tick();

    expect(component.dirty).toEqual(true);

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer domain deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    component.whitelistRetailer.id = 'retailerExampleID';

    const modalClose = spyOn(component.activeModal, 'close');

    component.openWhitelistRetailerDeletionDialog();
    tick();

    expect(modalClose).toHaveBeenCalledWith('dirty');

    localStorage.removeItem('returnVal');
  }));
});
