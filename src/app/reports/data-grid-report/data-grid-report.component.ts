import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportServiceService } from '../service/report-service.service';
import { HelperFunctions } from 'src/app/_globals/helper-functions'

@Component({
  selector: 'app-data-grid-report',
  templateUrl: './data-grid-report.component.html',
  styleUrls: ['./data-grid-report.component.css']
})
export class DataGridReportComponent implements OnInit, OnDestroy {
  helper = HelperFunctions;
  componentActive = true;
  products: any[] = [];

  constructor(private service: ReportServiceService) { }
  
  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    if (this.componentActive) {
      let productData = this.service.generateData(20);
      if(productData) {
        this.products = this.helper.DeepCopy(productData);
      }
    }
  }

  downloadPDF() {
    this.service.generateJsPDF('datagrid-report','body-section');
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
