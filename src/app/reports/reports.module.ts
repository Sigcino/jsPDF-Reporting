import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DataGridReportComponent } from './data-grid-report/data-grid-report.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DataGridReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ButtonModule,
    TableModule
  ]
})
export class ReportsModule { }
