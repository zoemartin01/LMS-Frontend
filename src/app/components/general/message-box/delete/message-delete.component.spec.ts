import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from 'rxjs';

import { MessageDeleteComponent } from './message-delete.component';

import { MessagingService } from "../../../../services/messaging.service";

import { MessageId } from "../../../../types/aliases/message-id";

class MockMessagingService {
  deleteMessage(messageId: MessageId): Observable<void> {
    return new Observable((observer) => {
      if (messageId === '312d8319-c253-4ee4-8771-a4a8d4a2f411') {
        observer.error({
          error: {
            message: 'Message not found.',
          }
        });
      }

      observer.next();
    });
  }
}

describe('MessageDeleteComponent', () => {
  let component: MessageDeleteComponent;
  let fixture: ComponentFixture<MessageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MessageDeleteComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MessagingService, useClass: MockMessagingService },
        NgbActiveModal,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create message delete component', () => {
    expect(component).toBeTruthy();
  });

  it('should init values in form fields', () => {
    expect(component.messageDeleteForm.value.title).toBe('');
    expect(component.messageDeleteForm.value.content).toBe('');

    component.message = {
      id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
      title: 'Verify Email to confirm account',
      content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
      correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
      correspondingUrlText: 'Verify Email',
      readStatus: false,
    };
    component.ngOnInit();

    expect(component.messageDeleteForm.value.title).toBe('Verify Email to confirm account');
    expect(component.messageDeleteForm.value.content).toBe('You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.');
  });

  it('should delete message', (done: DoneFn) => {
    component.message = {
      id: 'b16a9b6a-aa07-41a6-ab5a-c972c2894458',
      title: 'Verify Email to confirm account',
      content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
      correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
      correspondingUrlText: 'Verify Email',
      readStatus: false,
    };
    component.messageDeleteForm.controls['title'].setValue('Verify Email to confirm account');
    component.messageDeleteForm.controls['content'].setValue('You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.');

    let closeModal = spyOn(component.activeModal, 'close');

    component.deleteMessage().then(() => {
      expect(closeModal).toHaveBeenCalledWith('deleted');
      done();
    });
  });

  it('should handle deletion error', (done: DoneFn) => {
    component.message = {
      id: '312d8319-c253-4ee4-8771-a4a8d4a2f411',
      title: 'Verify Email to confirm account',
      content: 'You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.',
      correspondingUrl: ' http://localhost:4200/register/verify-email/2fe76781-912d-4cb4-a84c-a0dccf12d74e/ywayp',
      correspondingUrlText: 'Verify Email',
      readStatus: false,
    };
    component.messageDeleteForm.controls['title'].setValue('Verify Email to confirm account');
    component.messageDeleteForm.controls['content'].setValue('You need to click on this link to confirm your account or go to  http://localhost:4200/register/verify-email and enter user-ID: 2fe76781-912d-4cb4-a84c-a0dccf12d74e and token: ywayp.');

    let consoleError = spyOn(console, 'error');

    component.deleteMessage().then(() => {
      expect(consoleError).toHaveBeenCalled();
      done();
    });
  });
});
