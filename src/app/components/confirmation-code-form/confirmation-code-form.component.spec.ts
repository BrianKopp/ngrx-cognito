import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCodeFormComponent } from './confirmation-code-form.component';

describe('ConfirmationCodeFormComponent', () => {
  let component: ConfirmationCodeFormComponent;
  let fixture: ComponentFixture<ConfirmationCodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationCodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
