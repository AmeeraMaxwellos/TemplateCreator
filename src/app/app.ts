import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplateData } from './models/template-data.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  data: TemplateData = {
    letterhead: null,
    clientName: '',
    companyName: '',
    requirement: '',
    amount: null,
    documentType: 'Quotation'
  };

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.data.letterhead = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  printDocument() {
    window.print();
  }

  downloadPDF() {
    const content = document.querySelector('.a4-page') as HTMLElement;
    if (!content) return;
    
    html2canvas(content, { scale: 2 }).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${this.data.documentType}_${this.data.clientName || 'Document'}.pdf`);
    });
  }

  clearForm() {
    this.data = {
      letterhead: null,
      clientName: '',
      companyName: '',
      requirement: '',
      amount: null,
      documentType: 'Quotation'
    };
  }
}
