import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    for (let i = 0; i < repeat; i++) {
      data.id = (i + 1).toString();
      data.total_amount = ((isNaN(Number(data.qty_ordered)) ? 0 : Number(data.qty_ordered)) * (isNaN(Number(data.unit_price)) ? 0 : Number(data.unit_price))).toString();
      results.push(Object.assign({}, data));
    }
    return results;
  }

  generateJsPDF(fileName: string, elementId: string) {
    const pdf = new jsPDF('p', 'in', 'letter');
    const margin = 0.5; // Margins in inches
    const totalPagesExp = '{total_pages_count_string}';

    const element = document.getElementById(elementId);

    if(element)
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let position = margin;

      // Add page numbers
      let page = 1;
      // Add header section
      const header = document.getElementById('header-section');

      if(header)
      html2canvas(header).then((headerCanvas) => {
        const headerData = headerCanvas.toDataURL('image/png');
        const headerHeight = (headerCanvas.height * pdfWidth) / headerCanvas.width;

        // Calculate remaining height for body content
        const availableHeight = pageHeight - margin - headerHeight;

        // Add body section
        const bodyHeight = pdfHeight - headerHeight;
        const numPages = Math.ceil(bodyHeight / availableHeight);

        let remainingHeight = bodyHeight;
        let currentHeight = 0;

        for (let i = 0; i < numPages; i++) {
          // Add header
          pdf.addImage(headerData, 'PNG', 0, margin, pdfWidth, headerHeight);          
          // Calculate remaining height for current page
          remainingHeight = bodyHeight - currentHeight;

          // Adjust remaining height if it exceeds available height
          if (remainingHeight > availableHeight) {
            remainingHeight = availableHeight;
          }

          // Add body content
          pdf.addImage(imgData, 'PNG', 0, margin + headerHeight + currentHeight, pdfWidth - 0.3, remainingHeight);

          // Increment current height
          currentHeight += remainingHeight;

          // Add page numbers
          pdf.setTextColor(150);
          pdf.setFontSize(9);
          pdf.text(`Page ${page} of ${numPages}`, pdfWidth - 0.8, margin + headerHeight + remainingHeight + 0.2);

          page++;

          // Add new page
          if(i > 0) pdf.addPage();
        }

        // Save the PDF file
        pdf.save(`${fileName}.pdf`);
      });
    });
  
  }
  
}

