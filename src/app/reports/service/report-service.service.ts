import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})

export class ReportServiceService {

  constructor() { }

  generateData(repeat: number) {
    let results = [];
    let data = {
      id: '0',
      product_name: 'Milk',
      product_description: 'Pasteurized Milk',
      qty_ordered: '25',
      units: 'ltr',
      unit_price: '28.78',
      total_amount: '0.00'
    }

    for(let i = 0; i < repeat; i++) {
      data.id = (i+1).toString();
      data.total_amount = ((isNaN(Number(data.qty_ordered)) ? 0 : Number(data.qty_ordered)) * (isNaN(Number(data.unit_price)) ? 0 : Number(data.unit_price))).toString();
      results.push(Object.assign({}, data));
    }
    return results;
  }

  generateHeader() {
    return ['ID', 'Product Name', 'Description', 'Qty', 'UOM', 'Unit Price', 'Total Price'];
  }

  generateJsPDF() {
    const headers = this.generateHeader();

    let pdf = new jsPDF({format: 'a4', orientation: 'p', unit: 'in'});

    pdf.table(1, 1, this.generateData(50), headers, {autoSize: true})
  }
}
