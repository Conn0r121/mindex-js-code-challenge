import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReporterDialogComponent } from './delete-reporter-dialog.component';

describe('DeleteReporterDialogComponent', () => {
  let component: DeleteReporterDialogComponent;
  let fixture: ComponentFixture<DeleteReporterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReporterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReporterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
