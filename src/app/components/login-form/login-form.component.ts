import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Input() errorMessage: string | null;
  @Output() submitEvent = new EventEmitter();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor() {}
  submitForm() {
    if (this.loginForm.valid) {
      this.submitEvent.emit(this.loginForm.value);
    }
  }
}
