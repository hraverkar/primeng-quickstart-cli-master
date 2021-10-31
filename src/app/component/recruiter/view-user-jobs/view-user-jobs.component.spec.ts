import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserJobsComponent } from './view-user-jobs.component';

describe('ViewUserJobsComponent', () => {
  let component: ViewUserJobsComponent;
  let fixture: ComponentFixture<ViewUserJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
