import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Invoice } from './models/invoice.model';
import { InvoiceType } from './models/invoice-type.model';

interface FilterChip {
  label: string;
  value: string;
}

const ROW_ACTIONS = [
  'Invoices',
  'Edit Invoice',
  'Associated File',
  'View Details',
  'Comment',
  'Audit History'
];

const INVOICE_TYPES: InvoiceType[] = [
  {
    id: 1,
    invoiceTypeDescription: 'Standard Billing',
    assetDirectory: '/assets/invoices/standard',
    siteId: 1
  },
  {
    id: 2,
    invoiceTypeDescription: 'Escrow Statement',
    assetDirectory: '/assets/invoices/escrow',
    siteId: 1
  },
  {
    id: 3,
    invoiceTypeDescription: 'Production Run',
    assetDirectory: '/assets/invoices/production',
    siteId: 2
  }
];

const INVOICE_TYPE_MAP = new Map<number, InvoiceType>(
  INVOICE_TYPES.flatMap((invoiceType) =>
    invoiceType.id == null ? [] : ([[invoiceType.id, invoiceType]] as const)
  )
);

const INVOICES: Invoice[] = [
  {
    id: 1001,
    companyId: 24,
    jobId: 18,
    invoiceTypeId: 1,
    invoiceNumber: '2026-01191224',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-05'),
    pdfFileName: '2026-01191224.pdf',
    productId: 11,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-391',
    excelFileName: '2026-01191224.xlsx'
  },
  {
    id: 1002,
    companyId: 24,
    jobId: 22,
    invoiceTypeId: 2,
    invoiceNumber: '2026-01191225',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-06'),
    pdfFileName: '2026-01191225.pdf',
    productId: 14,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-402',
    excelFileName: '2026-01191225.xlsx'
  },
  {
    id: 1003,
    companyId: 24,
    jobId: 25,
    invoiceTypeId: 3,
    invoiceNumber: '2026-01191226',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-07'),
    pdfFileName: '2026-01191226.pdf',
    productId: 21,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-410',
    excelFileName: '2026-01191226.xlsx'
  },
  {
    id: 1004,
    companyId: 24,
    jobId: 28,
    invoiceTypeId: 1,
    invoiceNumber: '2026-01191227',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-08'),
    pdfFileName: '2026-01191227.pdf',
    productId: 25,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-415',
    excelFileName: '2026-01191227.xlsx'
  },
  {
    id: 1005,
    companyId: 24,
    jobId: 31,
    invoiceTypeId: 2,
    invoiceNumber: '2026-01191228',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-09'),
    pdfFileName: '2026-01191228.pdf',
    productId: 29,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-420',
    excelFileName: '2026-01191228.xlsx'
  },
  {
    id: 1006,
    companyId: 24,
    jobId: 33,
    invoiceTypeId: 3,
    invoiceNumber: '2026-01191229',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-10'),
    pdfFileName: '2026-01191229.pdf',
    productId: 31,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-428',
    excelFileName: '2026-01191229.xlsx'
  },
  {
    id: 1007,
    companyId: 24,
    jobId: 35,
    invoiceTypeId: 1,
    invoiceNumber: '2026-01191230',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-11'),
    pdfFileName: '2026-01191230.pdf',
    productId: 33,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-435',
    excelFileName: '2026-01191230.xlsx'
  },
  {
    id: 1008,
    companyId: 24,
    jobId: 36,
    invoiceTypeId: 2,
    invoiceNumber: '2026-01191231',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-12'),
    pdfFileName: '2026-01191231.pdf',
    productId: 36,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-441',
    excelFileName: '2026-01191231.xlsx'
  }
];

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly invoiceTypes = INVOICE_TYPES;
  readonly invoices = INVOICES;
  readonly rowActions = ROW_ACTIONS;
  readonly filters: FilterChip[] = [
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' }
  ];
  selectedInvoice: Invoice | null = null;
  detailInvoice: Invoice | null = null;

  selectInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice;
  }

  openDetails(invoice: Invoice): void {
    this.selectedInvoice = invoice;
    this.detailInvoice = invoice;
  }

  closeDetails(): void {
    this.detailInvoice = null;
  }

  getInvoiceDescription(invoice: Invoice): string {
    if (invoice.invoiceTypeId == null) {
      return '—';
    }
    return INVOICE_TYPE_MAP.get(invoice.invoiceTypeId)?.invoiceTypeDescription ?? '—';
  }

  getSiteLabel(invoice: Invoice): string {
    if (invoice.siteId == null) {
      return '—';
    }
    return `Site ${invoice.siteId}`;
  }

  getPdfUrl(invoice: Invoice): string | null {
    if (!invoice.pdfFileName) {
      return null;
    }
    return `${this.getAssetDirectory(invoice)}/${invoice.pdfFileName}`;
  }

  getExcelUrl(invoice: Invoice): string | null {
    if (!invoice.excelFileName) {
      return null;
    }
    return `${this.getAssetDirectory(invoice)}/${invoice.excelFileName}`;
  }

  private getAssetDirectory(invoice: Invoice): string {
    if (invoice.invoiceTypeId == null) {
      return '/assets/invoices';
    }
    return INVOICE_TYPE_MAP.get(invoice.invoiceTypeId)?.assetDirectory ?? '/assets/invoices';
  }
}
