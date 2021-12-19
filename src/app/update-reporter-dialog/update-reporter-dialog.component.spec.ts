import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReporterDialogComponent } from './update-reporter-dialog.component';

describe('UpdateReporterDialogComponent', () => {
  let component: UpdateReporterDialogComponent;
  let fixture: ComponentFixture<UpdateReporterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReporterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReporterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
