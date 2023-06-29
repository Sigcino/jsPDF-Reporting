import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridReportComponent } from './data-grid-report/data-grid-report.component';

const routes: Routes = [
  {path: 'data-grid-report', component: DataGridReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
