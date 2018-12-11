import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CognitoFacade } from 'ngrx-cognito';
import { SignupFormComponent } from '../signup-form/signup-form.component';
import { ConfirmationCodeFormComponent } from '../confirmation-code-form/confirmation-code-form.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot([])],
      providers: [CognitoFacade],
      declarations: [SignupComponent, SignupFormComponent, ConfirmationCodeFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
