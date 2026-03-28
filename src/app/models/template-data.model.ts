export interface TemplateData {
  letterhead: string | ArrayBuffer | null;
  clientName: string;
  companyName: string;
  requirement: string;
  amount: number | null;
  documentType: 'Quotation' | 'Invoice' | 'Proposal';
}
