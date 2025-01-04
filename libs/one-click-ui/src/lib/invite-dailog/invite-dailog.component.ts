import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { AlertService, CommonServiceService } from '@one-click/one-click-services';
import { messages } from '@one-click/data';

export interface Email {
  name: string;
}

@Component({
  selector: 'one-click-invite-dailog',
  templateUrl: './invite-dailog.component.html',
  styleUrls: ['./invite-dailog.component.scss'],
})
export class InviteDailogComponent {

  constructor(
    public alertService: AlertService,
    public commonServiceService: CommonServiceService
  ) {

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: Email[] = [];
  private emailPattern: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.emailPattern.test(value)) {
      this.emails.push({ name: value });
      event.chipInput!.clear();
    } else {
      this.alertService.error(messages.EMAIL_NOTVALID);
    }

    // Clear the input value

  }

  remove(fruit: Email): void {
    const index = this.emails.indexOf(fruit);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(fruit: Email, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Validate the edited value as an email
    if (value && this.emailPattern.test(value)) {
      // Edit existing fruit if the value is valid
      const index = this.emails.indexOf(fruit);
      if (index >= 0) {
        this.emails[index].name = value;
      }
    } else if (!value) {
      // Remove fruit if it no longer has a name
      this.remove(fruit);
    } else {
      console.error('Invalid email format');
    }
  }

  invite() {
    this.commonServiceService.invitMember({ emails: this.emails })
  }
}
