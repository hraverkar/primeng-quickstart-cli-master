import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogTestComponent } from './confirm-dialog.component';

describe('ConfirmDialogTestComponent', () => {
  let component: ConfirmDialogTestComponent;
  let fixture: ComponentFixture<ConfirmDialogTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
