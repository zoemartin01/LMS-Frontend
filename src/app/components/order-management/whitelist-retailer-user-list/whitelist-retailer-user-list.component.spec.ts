import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";

import {WhitelistRetailerUserListComponent} from './whitelist-retailer-user-list.component';

import {AdminService} from "../../../services/admin.service";

import {WhitelistRetailer} from "../../../types/whitelist-retailer";
import {PagedResponse} from "../../../types/paged-response";

class MockAdminService {
  public getWhitelistRetailers(limit: number = 0, offset: number = 0): Observable<PagedResponse<WhitelistRetailer>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          }
        });
      }

      observer.next({
        total: 10,
        data: [{
          id: "eb592c39-fdf0-4f1a-9c03-746f6adc42f6",
          name: "Cassin - Mitchell",
          domains: [{
            id: "10e43b10-9465-4734-b4f5-dfc26a35d0c0",
            domain: "sammie.name"
          }, {
            id: "20ff94a9-b52f-4d6a-aea4-08b661742870",
            domain: "kylie.info"
          }, {
            id: "a4ddc5d2-c665-4718-89be-aa74d56c6bbc",
            domain: "frances.biz"
          }]
        }, {
          id: "071ba8f2-9fe1-4a53-8ff3-9ee66f7952d6",
          name: "Gorczany - Harvey",
          domains: [{
            id: "1eecb967-9e5b-4f2e-87de-28173a07e9ee",
            domain: "tremayne.net"
          }, {
            id: "c5008c24-1acc-42b9-9568-e283af7b3650",
            domain: "benny.info"
          }, {
            id: "d14e5021-4057-4af8-bd2c-a961613aecfa",
            domain: "mohammed.biz"
          }]
        }, {
          id: "15f48103-e1ee-4e9f-9ad7-0bb46f819a4e",
          name: "Grimes Group",
          domains: [{
            id: "b5ea8671-28db-4fbd-9072-051af259b1ef",
            domain: "johan.name"
          }, {
            id: "9e8c3d72-78b8-4af8-8ad6-f3455ad35a80",
            domain: "drake.org"
          }, {
            id: "c17f7577-7fa4-43a6-a5f5-0f3d3a967dc0",
            domain: "kody.org"
          }]
        }, {
          id: "9e4469ce-8b1e-463f-8166-59d2e3542cb3",
          name: "Hand - Bruen",
          domains: [{
            id: "9f3c6a87-2d6a-4ff3-a3ad-5785a852c017",
            domain: "marlin.org"
          }, {
            id: "81d1261e-aec8-4fcb-9dde-dfbbb5adb39a",
            domain: "kay.biz"
          }, {
            id: "40c1b949-2b44-460a-9d80-5fe1fbb18972",
            domain: "ashley.biz"
          }]
        }, {
          id: "7a3df1f5-baa9-4b69-919a-0fa71d5d669c",
          name: "Legros and Sons",
          domains: [{
            id: "cb15c4bc-6365-4f67-a154-a476be175724",
            domain: "braden.biz"
          }, {
            id: "e4f77e0e-0f93-48b8-9ed6-55e2d08ba4b1",
            domain: "lilly.com"
          }, {
            id: "85d30781-8510-48b3-8ae7-351fa3c2177a",
            domain: "saul.com"
          }]
        }, {
          id: "f3528a29-7072-40af-ae87-c94ed004fa70",
          name: "Murphy, Streich and Weber",
          domains: [{
            id: "a6a1caad-8a8e-4e03-ad57-71dafb9e0491",
            domain: "sabrina.biz"
          }, {
            id: "6f051c47-4654-4458-ba73-ba6b863ce48e",
            domain: "deangelo.info"
          }, {
            id: "9e0e93cb-a2bd-44b4-bfae-3110c6c6ef35",
            domain: "declan.com"
          }]
        }, {
          id: "e4a87a1b-4f7c-48f7-9662-24be1b883836",
          name: "Ondricka, Huels and Rowe",
          domains: [{
            id: "080d3c0a-03d7-4c34-96cd-7d68d89fa284",
            domain: "shania.com"
          }, {
            id: "35d24068-95e1-43a6-8e76-24f985c69af9",
            domain: "susana.name"
          }, {
            id: "2a8d8402-f4d4-41a8-b027-85eb99ca1fae",
            domain: "luther.org"
          }]
        }]
      });
    });
  }
}

describe('WhitelistRetailerUserListComponent', () => {
  let component: WhitelistRetailerUserListComponent;
  let fixture: ComponentFixture<WhitelistRetailerUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhitelistRetailerUserListComponent,
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

    fixture = TestBed.createComponent(WhitelistRetailerUserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    expect(component.whitelistRetailers.total).toBe(0);
    expect(component.whitelistRetailers.page).toBe(1);
    expect(component.whitelistRetailers.data).toEqual([]);

    component.ngOnInit();
    tick();

    expect(component.whitelistRetailers.total).toBe(10);
    expect(component.whitelistRetailers.page).toBe(1);
    expect(component.whitelistRetailers.data).toEqual([
      {
        id: "eb592c39-fdf0-4f1a-9c03-746f6adc42f6",
        name: "Cassin - Mitchell",
        domains: [{
          id: "10e43b10-9465-4734-b4f5-dfc26a35d0c0",
          domain: "sammie.name"
        }, {
          id: "20ff94a9-b52f-4d6a-aea4-08b661742870",
          domain: "kylie.info"
        }, {
          id: "a4ddc5d2-c665-4718-89be-aa74d56c6bbc",
          domain: "frances.biz"
        }]
      }, {
        id: "071ba8f2-9fe1-4a53-8ff3-9ee66f7952d6",
        name: "Gorczany - Harvey",
        domains: [{
          id: "1eecb967-9e5b-4f2e-87de-28173a07e9ee",
          domain: "tremayne.net"
        }, {
          id: "c5008c24-1acc-42b9-9568-e283af7b3650",
          domain: "benny.info"
        }, {
          id: "d14e5021-4057-4af8-bd2c-a961613aecfa",
          domain: "mohammed.biz"
        }]
      }, {
        id: "15f48103-e1ee-4e9f-9ad7-0bb46f819a4e",
        name: "Grimes Group",
        domains: [{
          id: "b5ea8671-28db-4fbd-9072-051af259b1ef",
          domain: "johan.name"
        }, {
          id: "9e8c3d72-78b8-4af8-8ad6-f3455ad35a80",
          domain: "drake.org"
        }, {
          id: "c17f7577-7fa4-43a6-a5f5-0f3d3a967dc0",
          domain: "kody.org"
        }]
      }, {
        id: "9e4469ce-8b1e-463f-8166-59d2e3542cb3",
        name: "Hand - Bruen",
        domains: [{
          id: "9f3c6a87-2d6a-4ff3-a3ad-5785a852c017",
          domain: "marlin.org"
        }, {
          id: "81d1261e-aec8-4fcb-9dde-dfbbb5adb39a",
          domain: "kay.biz"
        }, {
          id: "40c1b949-2b44-460a-9d80-5fe1fbb18972",
          domain: "ashley.biz"
        }]
      }, {
        id: "7a3df1f5-baa9-4b69-919a-0fa71d5d669c",
        name: "Legros and Sons",
        domains: [{
          id: "cb15c4bc-6365-4f67-a154-a476be175724",
          domain: "braden.biz"
        }, {
          id: "e4f77e0e-0f93-48b8-9ed6-55e2d08ba4b1",
          domain: "lilly.com"
        }, {
          id: "85d30781-8510-48b3-8ae7-351fa3c2177a",
          domain: "saul.com"
        }]
      }, {
        id: "f3528a29-7072-40af-ae87-c94ed004fa70",
        name: "Murphy, Streich and Weber",
        domains: [{
          id: "a6a1caad-8a8e-4e03-ad57-71dafb9e0491",
          domain: "sabrina.biz"
        }, {
          id: "6f051c47-4654-4458-ba73-ba6b863ce48e",
          domain: "deangelo.info"
        }, {
          id: "9e0e93cb-a2bd-44b4-bfae-3110c6c6ef35",
          domain: "declan.com"
        }]
      }, {
        id: "e4a87a1b-4f7c-48f7-9662-24be1b883836",
        name: "Ondricka, Huels and Rowe",
        domains: [{
          id: "080d3c0a-03d7-4c34-96cd-7d68d89fa284",
          domain: "shania.com"
        }, {
          id: "35d24068-95e1-43a6-8e76-24f985c69af9",
          domain: "susana.name"
        }, {
          id: "2a8d8402-f4d4-41a8-b027-85eb99ca1fae",
          domain: "luther.org"
        }]
      }]
    );
  }));

  it('should throw error on page init', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    expect(component.whitelistRetailers.total).toBe(0);
    expect(component.whitelistRetailers.page).toBe(1);
    expect(component.whitelistRetailers.data).toEqual([]);

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(consoleError).toHaveBeenCalled();

    expect(component.whitelistRetailers.total).toBe(0);
    expect(component.whitelistRetailers.page).toBe(1);
    expect(component.whitelistRetailers.data).toEqual([]);

    localStorage.removeItem('throwError');
  }));
});
