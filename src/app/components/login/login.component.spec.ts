import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ConfirmationCodeFormComponent } from '../confirmation-code-form/confirmation-code-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CognitoFacade } from 'ngrx-cognito';
import { StoreModule } from '@ngrx/store';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot([])],
      providers: [CognitoFacade],
      declarations: [LoginComponent, LoginFormComponent, ConfirmationCodeFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
