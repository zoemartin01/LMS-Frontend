import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MessagingService } from "../../../../services/messaging.service";

import { Message } from "../../../../types/message";

@Component({
  selector: 'app-message-delete',
  templateUrl: './message-delete.component.html',
  styleUrls: ['./message-delete.component.scss']
})

/**
 * Component for the deletion of a message
 */
export class MessageDeleteComponent implements OnInit {
  public messageDeleteForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  public message: Message = {
    id: '',
    title: '',
    content: '',
    correspondingUrl: '',
    correspondingUrlText: '',
    readStatus: true,
  };

  /**
   * Constructor
   * @constructor
   * @param {MessagingService} messagingService service providing messaging functionalities
   * @param {NgbActiveModal} activeModal modal containing this component
   */
  constructor(public messagingService: MessagingService, public activeModal: NgbActiveModal) {
    this.messageDeleteForm.disable();
  }

  ngOnInit(): void {
    this.messageDeleteForm.controls['title'].setValue(this.message.title);
    this.messageDeleteForm.controls['content'].setValue(this.message.content);
  }

  /**
   * Deletes message
   */
  public async deleteMessage(): Promise<void> {
    this.messagingService.deleteMessage(this.message.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
