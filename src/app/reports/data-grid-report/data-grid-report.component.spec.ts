import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridReportComponent } from './data-grid-report.component';

describe('DataGridReportComponent', () => {
  let component: DataGridReportComponent;
  let fixture: ComponentFixture<DataGridReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridReportComponent]
    });
    fixture = TestBed.createComponent(DataGridReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
