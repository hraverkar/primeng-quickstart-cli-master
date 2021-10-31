import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdditionComponent } from './job-addition.component';

describe('JobAdditionComponent', () => {
  let component: JobAdditionComponent;
  let fixture: ComponentFixture<JobAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
