import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../environments/environment";

import { MessagingService } from './messaging.service';

describe('MessagingService', () => {
  let service: MessagingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers:  [
        MessagingService,
      ],
    });

    service = TestBed.inject(MessagingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get all messages for current user', () => {
    service.getMessages().subscribe(
      res => {
        expect(res).toEqual([
          {
            "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
            "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
            "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
            "correspondingUrl": "http://gertrude.biz",
            "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
            "readStatus": false
          },
          {
            "id": "22a7f94f-a6c2-40d2-97bc-8ac8c0ac60a9",
            "title": "Et doloribus natus temporibus quas maxime aliquid officiis eveniet.",
            "content": "Nesciunt eveniet fugit corporis nisi fuga quos sit. Eligendi incidunt incidunt eaque. Molestias omnis possimus. Voluptates quasi vero provident qui consequuntur et.",
            "correspondingUrl": "https://berenice.biz",
            "correspondingUrlText": "Non sed accusantium voluptatem non est suscipit.",
            "readStatus": false
          },
          {
            "id": "05529bda-a702-49c4-a092-76f5459cbc9f",
            "title": "Dolorem omnis ex.",
            "content": "Dolorem sed fuga quod in quae ut neque. Modi voluptas quisquam error ea et expedita. Totam tempore facere in ducimus quod totam iure repellendus.",
            "correspondingUrl": "http://palma.org",
            "correspondingUrlText": "Sint ad culpa et.",
            "readStatus": false
          },
          {
            "id": "093059f0-811b-4be9-8e7f-1cf0d9387a37",
            "title": "Rerum quia in quisquam sint voluptatem nobis.",
            "content": "Fuga cum est voluptatem iusto repellendus possimus ut vitae. Omnis ipsa voluptates reiciendis nulla quis hic corporis id. Id voluptatem perferendis provident. Consequatur quidem amet ipsa tenetur perferendis. Eaque voluptatem consequatur voluptatem autem delectus quia.",
            "correspondingUrl": "https://ursula.biz",
            "correspondingUrlText": "Eos necessitatibus eum nostrum officia pariatur.",
            "readStatus": false
          },
        ]);
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.messages
      .getCurrentUserMessages}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush([
      {
        "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
        "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
        "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
        "correspondingUrl": "http://gertrude.biz",
        "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
        "readStatus": false
      },
      {
        "id": "22a7f94f-a6c2-40d2-97bc-8ac8c0ac60a9",
        "title": "Et doloribus natus temporibus quas maxime aliquid officiis eveniet.",
        "content": "Nesciunt eveniet fugit corporis nisi fuga quos sit. Eligendi incidunt incidunt eaque. Molestias omnis possimus. Voluptates quasi vero provident qui consequuntur et.",
        "correspondingUrl": "https://berenice.biz",
        "correspondingUrlText": "Non sed accusantium voluptatem non est suscipit.",
        "readStatus": false
      },
      {
        "id": "05529bda-a702-49c4-a092-76f5459cbc9f",
        "title": "Dolorem omnis ex.",
        "content": "Dolorem sed fuga quod in quae ut neque. Modi voluptas quisquam error ea et expedita. Totam tempore facere in ducimus quod totam iure repellendus.",
        "correspondingUrl": "http://palma.org",
        "correspondingUrlText": "Sint ad culpa et.",
        "readStatus": false
      },
      {
        "id": "093059f0-811b-4be9-8e7f-1cf0d9387a37",
        "title": "Rerum quia in quisquam sint voluptatem nobis.",
        "content": "Fuga cum est voluptatem iusto repellendus possimus ut vitae. Omnis ipsa voluptates reiciendis nulla quis hic corporis id. Id voluptatem perferendis provident. Consequatur quidem amet ipsa tenetur perferendis. Eaque voluptatem consequatur voluptatem autem delectus quia.",
        "correspondingUrl": "https://ursula.biz",
        "correspondingUrlText": "Eos necessitatibus eum nostrum officia pariatur.",
        "readStatus": false
      },
    ]);
  });

  it('should get amount of unread messages for current user', () => {
    service.getUnreadMessagesAmounts().subscribe(
      res => {
        expect(res).toEqual({
          sum: 20,
          appointments: 5,
          orders: 7,
          users: 2,
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.messages
      .getCurrentUserUnreadMessagesAmounts}`);

    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush({
      sum: 20,
      appointments: 5,
      orders: 7,
      users: 2,
    });
  });

  it('should delete a message', () => {
    service.deleteMessage('ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1').subscribe();

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.messages.deleteMessage
      .replace(':id', 'ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1')}`);

    expect(mockRequest.request.method).toBe('DELETE');

    mockRequest.flush({}, {
      status: 204,
      statusText: "No Content",
    });
  });

  it('should update a message\'s read status', () => {
    service.markMessageAsRead('ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1').subscribe(
      res => {
        expect(res).toEqual({
          "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
          "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
          "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
          "correspondingUrl": "http://gertrude.biz",
          "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
          "readStatus": true,
        });
      }
    );

    const mockRequest = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.messages.updateMessage
      .replace(':id', 'ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1')}`);

    expect(mockRequest.request.method).toBe('PATCH');
    expect(mockRequest.request.body).toEqual({ readStatus: true });

    mockRequest.flush({
      "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
      "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
      "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
      "correspondingUrl": "http://gertrude.biz",
      "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
      "readStatus": true,
    });

    service.markMessageAsUnread('ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1').subscribe(
      res => {
        expect(res).toEqual({
          "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
          "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
          "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
          "correspondingUrl": "http://gertrude.biz",
          "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
          "readStatus": false,
        });
      }
    );

    const mockRequestTwo = httpMock.expectOne(`${environment.baseUrl}${environment.apiRoutes.messages.updateMessage
      .replace(':id', 'ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1')}`);

    expect(mockRequestTwo.request.method).toBe('PATCH');
    expect(mockRequestTwo.request.body).toEqual({ readStatus: false });

    mockRequestTwo.flush({
      "id": "ac155039-d3a1-4b7e-a8a0-0ec1223ef2b1",
      "title": "Est quis nulla nesciunt facere laborum aut maiores nobis.",
      "content": "Eum molestiae perferendis maiores ut. Quasi optio in sint quis. Animi voluptatibus quis minima vel reiciendis est praesentium aut non. Autem voluptatem molestiae. Aut eum sit nesciunt rerum laborum repellat quas. Consequuntur minima quia.",
      "correspondingUrl": "http://gertrude.biz",
      "correspondingUrlText": "Animi doloribus consequuntur quae sed quis vel et.",
      "readStatus": false,
    });
  });
});
