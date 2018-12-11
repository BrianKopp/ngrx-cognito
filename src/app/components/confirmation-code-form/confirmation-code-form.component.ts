import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-code-form',
  templateUrl: './confirmation-code-form.component.html',
  styleUrls: ['./confirmation-code-form.component.css']
})
export class ConfirmationCodeFormComponent {
  @Input() errorMessage: string | null;
  @Output() submitEvent = new EventEmitter();

  confirmationForm: FormGroup = new FormGroup({
    confirmationCode: new FormControl('', [Validators.required])
  });

  constructor() {}

  submit() {
    if (this.confirmationForm.valid) {
      this.submitEvent.emit(this.confirmationForm.value);
    }
  }
}
