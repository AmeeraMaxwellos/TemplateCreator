import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplateData } from './models/template-data.model';

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
}
