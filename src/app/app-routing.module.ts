import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridReportComponent } from './reports/data-grid-report/data-grid-report.component';

const routes: Routes = [
  {
    path: '',
    component: DataGridReportComponent
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
