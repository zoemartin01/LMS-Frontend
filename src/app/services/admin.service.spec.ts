import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";
import { ParseArgumentException } from "@angular/cli/models/parser";
import { environment } from "../../environments/environment";

import { AdminService } from './admin.service';

import { NotificationChannel } from "../types/enums/notification-channel";

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        AdminService,
      ],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all global settings', () => {
    service.getGlobalSettings().subscribe(
      res => {
        expect(res).toEqual([
          {
            key: "user.max_recordings",
            value: "5",
            description: "Maximum Recordings per User"
          },
          {
            key: "recording.auto_delete",
            value: "86400000",
            description: "Time after a recording gets automatically deleted"
          },
          {
            key: "static.homepage",
            value: "Here could be the homepage, ask an admin to change the content of this page.",
            description: "Homepage Content (in Markdown)"
          },
          {
            key: "static.lab_rules",
            value: "Here could be the lab rules, ask an admin to change the content of this page.",
            description: "HWLab Rules (in Markdown)"
          },
          {
            key: "static.safety_instructions",
            value: "Here could be the safety instructions, ask an admin to change the content of this page.",
            description: "Static Safety Instructions (in Markdown)"
          },
          {
            key: "static.faq",
            value: "Here could be the FAQ, ask an admin to change the content of this page.",
            description: "FAQ (in Markdown)"
          },
          {
            key: "static.faq_admin",
            value: "Here could be the admin FAQ, ask an admin to change the content of this page.",
            description: "Admin FAQ (in Markdown)"
          },
        ]);
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.getGlobalSettings}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush([
      {
        key: "user.max_recordings",
        value: "5",
        description: "Maximum Recordings per User"
      },
      {
        key: "recording.auto_delete",
        value: "86400000",
        description: "Time after a recording gets automatically deleted"
      },
      {
        key: "static.homepage",
        value: "Here could be the homepage, ask an admin to change the content of this page.",
        description: "Homepage Content (in Markdown)"
      },
      {
        key: "static.lab_rules",
        value: "Here could be the lab rules, ask an admin to change the content of this page.",
        description: "HWLab Rules (in Markdown)"
      },
      {
        key: "static.safety_instructions",
        value: "Here could be the safety instructions, ask an admin to change the content of this page.",
        description: "Static Safety Instructions (in Markdown)"
      },
      {
        key: "static.faq",
        value: "Here could be the FAQ, ask an admin to change the content of this page.",
        description: "FAQ (in Markdown)"
      },
      {
        key: "static.faq_admin",
        value: "Here could be the admin FAQ, ask an admin to change the content of this page.",
        description: "Admin FAQ (in Markdown)"
      },
    ]);
  });

  it('should get a user with specific id', () => {
    service.getUser('userXY').subscribe(
      res => {
        expect(res).toEqual({
          id: "userXY",
          email: "user@test.com",
          firstName: "user",
          lastName: "userson",
          role: 2,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: NotificationChannel.emailAndMessageBox
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.getSingleUser.replace(':id', 'userXY')}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      id: "userXY",
      email: "user@test.com",
      firstName: "user",
      lastName: "userson",
      role: 2,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: NotificationChannel.emailAndMessageBox
    });
  });

  it('should throw exception when trying to get an user with id null', () => {
    expect(() => service.getUser(null)).toThrow(ParseArgumentException);
  });

  it('should get all pending users', () => {
    service.getPendingUsers().subscribe(
      res => {
        expect(res).toEqual(
          {total: 2, data: [
              {
                id: "userXY",
                email: "user@test.com",
                firstName: "user",
                lastName: "userson",
                role: 1,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 4
              },
              {
                id:"userXYZ",
                email: "user2@test.com",
                firstName: "user2",
                lastName: "usersonson",
                role: 1,
                emailVerification: true,
                isActiveDirectory: false,
                notificationChannel: 2
              }
            ]});
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.getAllPendingUsers}` + `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush(
      {total: 2, data: [
          {
            id: "userXY",
            email: "user@test.com",
            firstName: "user",
            lastName: "userson",
            role: 1,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 4
          },
          {
            id:"userXYZ",
            email: "user2@test.com",
            firstName: "user2",
            lastName: "usersonson",
            role: 1,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 2
          }
        ]});
  });

  it('should get all accepted users', () => {
    service.getAcceptedUsers().subscribe(
      res => {
        expect(res).toEqual(
          {total: 2, data: [
          {
            id: "userXY",
            email: "user@test.com",
            firstName: "user",
            lastName: "userson",
            role: 2,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 4
          },
          {
            id:"userXYZ",
            email: "user2@test.com",
            firstName: "user2",
            lastName: "usersonson",
            role: 3,
            emailVerification: true,
            isActiveDirectory: false,
            notificationChannel: 2
          }
        ]});
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.getAllAcceptedUsers}` + `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush(
      {total: 2, data: [{
        id: "userXY",
        email: "user@test.com",
        firstName: "user",
        lastName: "userson",
        role: 2,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 4
      },
      {
        id:"userXYZ",
        email: "user2@test.com",
        firstName: "user2",
        lastName: "usersonson",
        role: 3,
        emailVerification: true,
        isActiveDirectory: false,
        notificationChannel: 2
      }
    ]});
  });

  it('should update global settings', () => {
    service.updateGlobalSettings([
      {
        key: "user.max_recordings",
        value: "5",
        description: "Maximum Recordings per User"
      },
      {
        key: "recording.auto_delete",
        value: "69420",
        description: "Time after a recording gets automatically deleted"
      }
    ]).subscribe(
      res => {
        expect(res).toEqual([
          {
            key: "user.max_recordings",
            value: "5",
            description: "Maximum Recordings per User"
          },
          {
            key: "recording.auto_delete",
            value: "69420",
            description: "Time after a recording gets automatically deleted"
          },
          {
            key: "static.homepage",
            value: "Here could be the homepage, ask an admin to change the content of this page.",
            description: "Homepage Content (in Markdown)"
          },
          {
            key: "static.lab_rules",
            value: "Here could be the lab rules, ask an admin to change the content of this page.",
            description: "HWLab Rules (in Markdown)"
          },
          {
            key: "static.safety_instructions",
            value: "Here could be the safety instructions, ask an admin to change the content of this page.",
            description: "Static Safety Instructions (in Markdown)"
          },
          {
            key: "static.faq",
            value: "Here could be the FAQ, ask an admin to change the content of this page.",
            description: "FAQ (in Markdown)"
          },
          {
            key: "static.faq_admin",
            value: "Here could be the admin FAQ, ask an admin to change the content of this page.",
            description: "Admin FAQ (in Markdown)"
          },
        ]);
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.updateGlobalSettings}`);

    expect(mockRequest.request.body).toEqual([
      {
        key: "user.max_recordings",
        value: "5",
        description: "Maximum Recordings per User"
      },
      {
        key: "recording.auto_delete",
        value: "69420",
        description: "Time after a recording gets automatically deleted"
      }
    ]);
    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush([
      {
        key: "user.max_recordings",
        value: "5",
        description: "Maximum Recordings per User"
      },
      {
        key: "recording.auto_delete",
        value: "69420",
        description: "Time after a recording gets automatically deleted"
      },
      {
        key: "static.homepage",
        value: "Here could be the homepage, ask an admin to change the content of this page.",
        description: "Homepage Content (in Markdown)"
      },
      {
        key: "static.lab_rules",
        value: "Here could be the lab rules, ask an admin to change the content of this page.",
        description: "HWLab Rules (in Markdown)"
      },
      {
        key: "static.safety_instructions",
        value: "Here could be the safety instructions, ask an admin to change the content of this page.",
        description: "Static Safety Instructions (in Markdown)"
      },
      {
        key: "static.faq",
        value: "Here could be the FAQ, ask an admin to change the content of this page.",
        description: "FAQ (in Markdown)"
      },
      {
        key: "static.faq_admin",
        value: "Here could be the admin FAQ, ask an admin to change the content of this page.",
        description: "Admin FAQ (in Markdown)"
      },
    ]);
  });

  it('should update an user with specific id', () => {
    service.updateUser('userXY', {
      email: "user@test.teco.com",
      role: 3,
    }).subscribe(
      res => {
        expect(res).toEqual({
          id: "userXY",
          email: "user@test.teco.com",
          firstName: "user",
          lastName: "userson",
          role: 3,
          emailVerification: true,
          isActiveDirectory: false,
          notificationChannel: 3
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.updateUser.replace(':id', 'userXY')}`);

    expect(mockRequest.request.body).toEqual({
      email: "user@test.teco.com",
      role: 3,
    });
    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      id: "userXY",
      email: "user@test.teco.com",
      firstName: "user",
      lastName: "userson",
      role: 3,
      emailVerification: true,
      isActiveDirectory: false,
      notificationChannel: 3
    });
  });

  it('should throw exception when trying to edit an user with id null', () => {
    expect(() => service.updateUser(null, {})).toThrow(ParseArgumentException);
  });

  it('should delete an user with specific id', () => {
    service.deleteUser('userXY').subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.user_management.deleteUser.replace(':id', 'userXY')}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete an user with id null', () => {
    expect(() => service.deleteUser(null)).toThrow(ParseArgumentException);
  });

  it('should get all whitelist retailers', () => {
    service.getWhitelistRetailers().subscribe(
      res => {
        expect(res).toEqual(
          {total: 2, data: [
          {
            id: "deaf3c7f-9ce7-400d-96db-9d5602706ba2",
            name: "McGlynn and Sons",
            domains: [
              {
                id: "227ffc6a-2953-41d7-abea-c4046720f62a",
                domain: "jordan.biz"
              },
              {
                id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
                domain: "lacey.biz"
              },
              {
                id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
                domain: "louisa.org"
              }
            ]
          },
          {
            id: "6b01d1a9-0712-46a9-baef-03edc9f7b128",
            name: "Dare Group",
            domains: [
              {
                id: "987f5291-e2cc-4ecc-9731-55b64bbeba44",
                domain: "roma.biz"
              },
              {
                id: "3c902fdf-1d62-4ecf-bf16-b75108134929",
                domain: "diana.net"
              },
              {
                id: "e27156ea-0036-4ed8-be4c-1e10e1c6e209",
                domain: "noelia.biz"
              }
            ]
          }
        ]});
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailers}` + `?limit=0&offset=0`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush(
      {total: 2, data: [
      {
        id: "deaf3c7f-9ce7-400d-96db-9d5602706ba2",
        name: "McGlynn and Sons",
        domains: [
          {
            id: "227ffc6a-2953-41d7-abea-c4046720f62a",
            domain: "jordan.biz"
          },
          {
            id: "e23fa361-c2f3-4575-9743-ef2b49b203b6",
            domain: "lacey.biz"
          },
          {
            id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
            domain: "louisa.org"
          }
        ]
      },
      {
        id: "6b01d1a9-0712-46a9-baef-03edc9f7b128",
        name: "Dare Group",
        domains: [
          {
            id: "987f5291-e2cc-4ecc-9731-55b64bbeba44",
            domain: "roma.biz"
          },
          {
            id: "3c902fdf-1d62-4ecf-bf16-b75108134929",
            domain: "diana.net"
          },
          {
            id: "e27156ea-0036-4ed8-be4c-1e10e1c6e209",
            domain: "noelia.biz"
          }
        ]
      }
    ]});
  });

  it('should get a whitelist retailer with specific id', () => {
    service.getWhitelistRetailerData('retailerExampleID').subscribe(
      res => {
        expect(res).toEqual(
          {
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
              {
                id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
                domain: "louisa.org"
              }
            ]
          }
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.getWhitelistRetailer.replace(':id', 'retailerExampleID')}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
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
        {
          id: "131d596c-1ec3-4c3d-a31e-02bb2e0b253b",
          domain: "louisa.org"
        }
      ]
    });
  });

  it('should throw exception when trying to get a whitelisted retailer with id null', () => {
    expect(() => service.getWhitelistRetailerData(null)).toThrow(ParseArgumentException);
  });

  it('should create a whitelist retailer with given data', () => {
    service.createWhitelistRetailer(['domain.1.test', 'domain.2.test'], 'retailerExampleName').subscribe(
      res => {
        expect(res).toEqual({
            id: "1dcf5601-db83-44fd-bd69-23fd28a5141b",
            name: "retailerExampleName",
            domains: [
              {
                id: "87fb921b-fe81-48f1-aaea-97c7d4aa88d3",
                domain: "domain.1.test"
              },
              {
                id: "7573995e-2586-4714-912e-c8e70a050b63",
                domain: "domain.2.test"
              }
            ]
          }
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.createWhitelistRetailer}`);

    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual({
      domains: ['domain.1.test', 'domain.2.test'],
      name: 'retailerExampleName',
    });


    mockRequest.flush({
      id: "1dcf5601-db83-44fd-bd69-23fd28a5141b",
      name: "retailerExampleName",
      domains: [
        {
          id: "87fb921b-fe81-48f1-aaea-97c7d4aa88d3",
          domain: "domain.1.test"
        },
        {
          id: "7573995e-2586-4714-912e-c8e70a050b63",
          domain: "domain.2.test"
        }
      ]
    });
  });

  it('should edit a whitelist retailer with a specific id', () => {
    service.editWhitelistRetailerData('retailerExampleID', {
      name: 'retailerExampleName',
    }).subscribe(
      res => {
        expect(res).toEqual({
            id: "retailerExampleID",
            name: "retailerExampleName",
            domains: [
              {
                id: "87fb921b-fe81-48f1-aaea-97c7d4aa88d3",
                domain: "domain.1.test"
              },
              {
                id: "7573995e-2586-4714-912e-c8e70a050b63",
                domain: "domain.2.test"
              }
            ]
          }
        );
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.updateWhitelistRetailer.replace(':id', 'retailerExampleID')}`);

    expect(mockRequest.request.method).toBe('PATCH');
    expect(mockRequest.request.body).toEqual({
      name: 'retailerExampleName',
    });

    mockRequest.flush({
      id: "retailerExampleID",
      name: "retailerExampleName",
      domains: [
        {
          id: "87fb921b-fe81-48f1-aaea-97c7d4aa88d3",
          domain: "domain.1.test"
        },
        {
          id: "7573995e-2586-4714-912e-c8e70a050b63",
          domain: "domain.2.test"
        }
      ]
    });
  });

  it('should throw exception when trying to edit an whitelisted retailer with id null', () => {
    expect(() => service.editWhitelistRetailerData(null, {})).toThrow(ParseArgumentException);
  });

  it('should delete whitelisted retailer with specific id', () => {
    service.deleteWhitelistRetailer('retailerExampleID').subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteWhitelistRetailer.replace(':id', 'retailerExampleID')}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete a whitelisted retailer with id null', () => {
    expect(() => service.deleteWhitelistRetailer(null)).toThrow(ParseArgumentException);
  });

  it('should add a domain to a whitelisted retailer', () => {
    service.addDomainToWhitelistRetailer('retailerExampleID', 'domain.2.test').subscribe(
      res => {
        expect(res).toEqual({
          id: "retailerExampleID",
          domain: "domain.2.test",
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.addDomainToWhitelistRetailer.replace(':id', 'retailerExampleID')}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      id: "retailerExampleID",
      domain: "domain.2.test",
    })
  });

  it('should throw exception when trying to add a domain to a whitelisted retailer with id null', () => {
    expect(() => service.addDomainToWhitelistRetailer(null, '')).toThrow(ParseArgumentException);
  });

  it('should edit a domain of a whitelisted retailer', () => {
    service.editDomainOfWhitelistRetailer('retailerExampleID', 'domainExampleId', {domain: 'domain.2.test'}).subscribe(
      res => {
        expect(res).toEqual({
          id: "domainExampleID",
          domain: "domain.2.test",
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.updateDomainOfWhitelistRetailer
      .replace(':id', 'retailerExampleID')
      .replace(':domainId', 'domainExampleId')}`);

    expect(mockRequest.request.method).toBe('PATCH');

    mockRequest.flush({
      id: "domainExampleID",
      domain: "domain.2.test",
    })
  });

  it('should throw exception when trying to edit a domain of a whitelisted retailer with retailer id null', () => {
    expect(() => service.editDomainOfWhitelistRetailer(null, '', {})).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to edit a domain of a whitelisted retailer with domain id null', () => {
    expect(() => service.editDomainOfWhitelistRetailer('', null, {})).toThrow(ParseArgumentException);
  });

  it('should delete a domain of a whitelisted retailer with a specific id', () => {
    service.deleteDomainOfWhitelistRetailer('retailerExampleID', 'domainExampleID').subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.deleteDomainOfWhitelistRetailer
      .replace(':id', 'retailerExampleID')
      .replace(':domainId', 'domainExampleID')}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should throw exception when trying to delete a domain of a whitelisted retailer with id null', () => {
    expect(() => service.deleteDomainOfWhitelistRetailer(null, '')).toThrow(ParseArgumentException);
  });

  it('should throw exception when trying to delete a domain of a whitelisted retailer with domain id null', () => {
    expect(() => service.deleteDomainOfWhitelistRetailer('', null)).toThrow(ParseArgumentException);
  });

  it('should accept user request', () => {
    const updateUserMethod = spyOn(service, 'updateUser');

    service.acceptUserRequest('userXY');

    expect(updateUserMethod).toHaveBeenCalledWith( "userXY", { role: 2 });
  });

  it('should decline user request', () => {
    const deleteUserMethod = spyOn(service, 'deleteUser');

    service.declineUserRequest('userXY');

    expect(deleteUserMethod).toHaveBeenCalledWith('userXY');
  });

  it('should check domain against whitelist and post true with whitelisted domain', () => {
    service.checkDomainAgainstWhitelist('domain.test').subscribe(
      res => {
        expect(res).toEqual({isWhitelisted: true});
      });

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.checkDomainAgainstWhitelist}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      isWhitelisted: true
    })
  });

  it('should check domain against whitelist and post false with whitelisted domain', () => {
    service.checkDomainAgainstWhitelist('domain.test').subscribe(
      res => {
        expect(res).toEqual({isWhitelisted: false});
      });

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.admin_settings.checkDomainAgainstWhitelist}`);

    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({
      isWhitelisted: false
    })
  });
});
