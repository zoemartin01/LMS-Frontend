import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { NgxPaginationModule } from "ngx-pagination";

import { GlobalSettingsComponent } from './global-settings.component';

import { AdminService } from "../../../services/admin.service";

import { GlobalSetting } from "../../../types/global-setting";
import { WhitelistRetailer } from "../../../types/whitelist-retailer";
import { PagedResponse } from "../../../types/paged-response";
import { PagedList } from "../../../types/paged-list";

class MockAdminService {
  getGlobalSettings(): Observable<GlobalSetting[]> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          },
        });
      }

      let globalSettings: GlobalSetting[] = [
        {
          key: "user.max_recordings",
          value: "5",
          description: "Maximum Recordings per User",
        },
        {
          key: "recording.auto_delete",
          value: "86400000",
          description: "Time after a recording gets automatically deleted",
        },
      ];
      observer.next(globalSettings);
    });
  }

  getWhitelistRetailers(limit: number = 0, offset: number = 0): Observable<PagedResponse<WhitelistRetailer>> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Internal Server Error.',
          }
        });
      }

      let pagedList = new PagedList<WhitelistRetailer>();
      pagedList.data = [
        {
          id: "deaf3c7f-9ce7-400d-96db-9d5602706ba2",
          name: "McGlynn and Sons",
          domains: [
            {
              id: "227ffc6a-2953-41d7-abea-c4046720f62a",
              domain: "jordan.biz",
            },
            {
              id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
              domain: "lacey.biz",
            },
            {
              id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
              domain: "louisa.org",
            },
          ],
        },
        {
          id: "6b01d1a9-0712-46a9-baef-03edc9f7b128",
          name: "Dare Group",
          domains: [
            {
              id: "987f5291-e2cc-4ecc-9731-55b64bbeba44",
              domain: "roma.biz",
            },
            {
              id: "3c902fdf-1d62-4ecf-bf16-b75108134929",
              domain: "diana.net",
            },
            {
              id: "e27156ea-0036-4ed8-be4c-1e10e1c6e209",
              domain: "noelia.biz",
            },
          ],
        }]
      observer.next(pagedList);
    });
  }

  updateGlobalSettings(changedData: object): Observable<GlobalSetting[]> {
    return new Observable((observer) => {
      if (localStorage.getItem('throwError') === 'true') {
        observer.error({
          error: {
            message: 'Inventory Item not Found.',
          }
        });
      }
      let globalSettings: GlobalSetting[] = [
        {
          key: "user.max_recordings",
          value: "10",
          description: "Maximum Recordings per User"
        },
        {
          key: "recording.auto_delete",
          value: "69420",
          description: "Time after a recording gets automatically deleted"
        }]

      observer.next(globalSettings);
    })
  }
}

class MockModalService {
  open(): { componentInstance: { whitelistRetailer: { id: string | null } }, result: Promise<string> } {
    return {
      componentInstance: {
        whitelistRetailer: { id: null },
      },
      result: new Promise<string>(resolve => resolve(localStorage.getItem('returnVal') ?? 'aborted')),
    };
  };
}

class MockFileReader {
  public onload: (() => void);
  public result: string = "";

  constructor() {
    this.onload = () => {};
  }

  public readAsText(file: File): void {
    file.text().then(
      (content: string) => {
        this.result = content;
        this.onload();
      }
    );
  }
}

describe('GlobalSettingsComponent', () => {
  let component: GlobalSettingsComponent;
  let fixture: ComponentFixture<GlobalSettingsComponent>;

  beforeEach(async () => {
    let fileReader = new MockFileReader();

    await TestBed.configureTestingModule({
      declarations: [
        GlobalSettingsComponent,
      ],
      imports: [
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AdminService, useClass: MockAdminService },
        { provide: NgbModal, useClass: MockModalService },
        { provide: FileReader, useFactory: () => fileReader },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalSettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init page', fakeAsync(() => {
    let pagedListW = new PagedList<WhitelistRetailer>();

    expect(component.globalSettingsForm.controls['user.max_recordings'].value).toEqual('');
    expect(component.globalSettingsForm.controls['recording.auto_delete'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.homepage'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.lab_rules'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq_admin'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.safety_instructions'].value).toEqual('');

    expect(component.whitelistRetailers).toEqual(pagedListW);

    component.ngOnInit();
    tick();

    let globalSettings: GlobalSetting[] = [
      {
        key: "user.max_recordings",
        value: "5",
        description: "Maximum Recordings per User",
      },
      {
        key: "recording.auto_delete",
        value: "86400000",
        description: "Time after a recording gets automatically deleted",
      },
    ];

    pagedListW.data = [
      {
        id: "deaf3c7f-9ce7-400d-96db-9d5602706ba2",
        name: "McGlynn and Sons",
        domains: [
          {
            id: "227ffc6a-2953-41d7-abea-c4046720f62a",
            domain: "jordan.biz",
          },
          {
            id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
            domain: "lacey.biz",
          },
          {
            id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
            domain: "louisa.org",
          },
        ],
      },
      {
        id: "6b01d1a9-0712-46a9-baef-03edc9f7b128",
        name: "Dare Group",
        domains: [
          {
            id: "987f5291-e2cc-4ecc-9731-55b64bbeba44",
            domain: "roma.biz",
          },
          {
            id: "3c902fdf-1d62-4ecf-bf16-b75108134929",
            domain: "diana.net",
          },
          {
            id: "e27156ea-0036-4ed8-be4c-1e10e1c6e209",
            domain: "noelia.biz",
          },
        ],
      }];

    expect(component.globalSettingsForm.controls['user.max_recordings'].value).toEqual(+globalSettings.filter((setting: GlobalSetting) => setting.key === 'user.max_recordings')[0].value);
    expect(component.globalSettingsForm.controls['recording.auto_delete'].value).toEqual((+globalSettings.filter((setting: GlobalSetting) => setting.key === 'recording.auto_delete')[0].value / 86400000));
    expect(component.globalSettingsForm.controls['static.homepage'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.lab_rules'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq_admin'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.safety_instructions'].value).toEqual('');

    expect(component.whitelistRetailers).toEqual(pagedListW);
  }));

  it('should throw error on page init', () => {
    localStorage.setItem('throwError', 'true');

    let pagedListW = new PagedList<WhitelistRetailer>();

    expect(component.globalSettingsForm.controls['user.max_recordings'].value).toEqual('');
    expect(component.globalSettingsForm.controls['recording.auto_delete'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.homepage'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.lab_rules'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq_admin'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.safety_instructions'].value).toEqual('');

    expect(component.whitelistRetailers).toEqual(pagedListW);

    const consoleError = spyOn(console, 'error');

    component.ngOnInit();

    expect(consoleError).toHaveBeenCalled();

    expect(component.globalSettingsForm.controls['user.max_recordings'].value).toEqual('');
    expect(component.globalSettingsForm.controls['recording.auto_delete'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.homepage'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.lab_rules'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.faq_admin'].value).toEqual('');
    expect(component.globalSettingsForm.controls['static.safety_instructions'].value).toEqual('');

    expect(component.whitelistRetailers).toEqual(pagedListW);

    localStorage.removeItem('throwError');
  });

  it('should update global settings', fakeAsync(() => {
    component.globalSettingsForm.controls['user.max_recordings'].setValue('10');
    component.globalSettingsForm.controls['recording.auto_delete'].setValue('69420');

    component.editGlobalSettings();
    tick();

    expect(component.globalSettingsForm.controls['user.max_recordings'].value).toEqual(10);
    expect(component.globalSettingsForm.controls['recording.auto_delete'].value).toEqual(69420 / 86400000);
  }));

  it('should throw error on update global settings', fakeAsync(() => {
    localStorage.setItem('throwError', 'true');

    component.globalSettingsForm.controls['user.max_recordings'].setValue('10');
    component.globalSettingsForm.controls['user.max_recordings'].markAsDirty();
    component.globalSettingsForm.controls['recording.auto_delete'].setValue('69420');
    component.globalSettingsForm.controls['recording.auto_delete'].markAsDirty();

    component.editGlobalSettings();
    tick();

    expect(component.errorMessage).toBe('Inventory Item not Found.');

    localStorage.removeItem('throwError');
  }));

  it('should throw an error on edit global settings if form values are empty', fakeAsync(() => {
    expect(component.errorMessage).toBe('')

    component.globalSettingsForm.controls['user.max_recordings'].setValue('');
    component.globalSettingsForm.controls['user.max_recordings'].markAsDirty();
    component.globalSettingsForm.controls['recording.auto_delete'].setValue('');
    component.globalSettingsForm.controls['recording.auto_delete'].markAsDirty();

    component.editGlobalSettings();
    tick();

    expect(component.errorMessage).toBe('You need to fill in all required fields!')
  }));

  it('should reload after retailer create', fakeAsync(() => {
    localStorage.setItem('returnVal', 'created exampleWhitelistRetailerId');

    const getWhitelistRetailerMethod = spyOn(component, 'getWhitelistRetailers');

    component.openWhitelistRetailerCreationForm();
    tick();

    expect(getWhitelistRetailerMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer view', fakeAsync(() => {
    localStorage.setItem('returnVal', 'dirty');

    const getWhitelistRetailerMethod = spyOn(component, 'getWhitelistRetailers');

    component.openWhitelistRetailerView('exampleWhitelistRetailerId');
    tick();

    expect(getWhitelistRetailerMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer edit form', fakeAsync(() => {
    localStorage.setItem('returnVal', 'edited');

    const getWhitelistRetailerMethod = spyOn(component, 'getWhitelistRetailers');

    component.openWhitelistRetailerEditForm('exampleWhitelistRetailerId');
    tick();

    expect(getWhitelistRetailerMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should open whitelist retailer deletion dialog', fakeAsync(() => {
    localStorage.setItem('returnVal', 'deleted');

    const getWhitelistRetailerMethod = spyOn(component, 'getWhitelistRetailers');

    component.openWhitelistRetailerDeletionDialog('exampleWhitelistRetailerId');
    tick();

    expect(getWhitelistRetailerMethod).toHaveBeenCalled();

    localStorage.removeItem('returnVal');
  }));

  it('should update content on static page with txt or md file', fakeAsync(() => {
    let file = new File([
      "first line", "second line"
    ], 'bla.txt');
    let event = {
      target: {
        files: [
          file,
        ],
      },
    };
    component.onFileSelected(
      event,
      "static.homepage"
    );
    tick();

    expect(component.globalSettingsForm.controls["static.homepage"].value).toEqual("");
  }));

  it('should throw an error when trying to update content on static page with non txt or md file', () => {
    let file = new File([
      "first line", "second line"
    ], 'bla.pdf');

    const consoleError = spyOn(console, 'error');

    component.onFileSelected(
      {
        target: {
          files: [
            file,
          ],
        },
      },
      "static.homepage"
    );

    expect(consoleError).toHaveBeenCalled();
  });
});
