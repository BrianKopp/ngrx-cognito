import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
