import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Invoice } from './models/invoice.model';
import { InvoiceType } from './models/invoice-type.model';

interface FilterChip {
  label: string;
  value: string;
}

interface InvoiceColumn {
  field: string;
  label: string;
  visible: boolean;
}

const ROW_ACTIONS = [
  'Invoices',
  'Edit Invoice',
  'Associated File',
  'View Details',
  'Comment',
  'Audit History'
];

const INVOICE_COLUMNS: InvoiceColumn[] = [
  { field: 'Id', label: 'Id', visible: true },
  { field: 'CompanyName', label: 'Company Name', visible: true },
  { field: 'ParentCompany', label: 'Parent Company', visible: true },
  { field: 'EmailFromEmail', label: 'Email (From Email)', visible: true }
];

const COLUMN_FIELD_OPTIONS = INVOICE_COLUMNS.map((column) => column.field);

const COLUMN_CLASS_MAP: Record<string, string> = {
  Id: 'col-id',
  CompanyName: 'col-company',
  ParentCompany: 'col-parent',
  EmailFromEmail: 'col-email'
};

const SORTABLE_FIELDS = new Set(['CompanyName']);

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
    alternateClientNumber: 'ALT-391',
    invoiceNumber: '2026-01191224',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-05'),
    pdfFileName: '2026-01191224.pdf',
    productId: 11,
    customField1: 'Chan Co',
    customField2: 'billing@alchem-e.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-391',
    externalIdentifier: 'EXT-1001',
    excelFileName: '2026-01191224.xlsx'
  },
  {
    id: 1002,
    companyId: 24,
    jobId: 22,
    invoiceTypeId: 2,
    alternateClientNumber: 'ALT-402',
    invoiceNumber: '2026-01191225',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-06'),
    pdfFileName: '2026-01191225.pdf',
    productId: 14,
    customField1: 'racami',
    customField2: 'support@racami.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-402',
    externalIdentifier: 'EXT-1002',
    excelFileName: '2026-01191225.xlsx'
  },
  {
    id: 1003,
    companyId: 24,
    jobId: 25,
    invoiceTypeId: 3,
    alternateClientNumber: 'ALT-410',
    invoiceNumber: '2026-01191226',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-07'),
    pdfFileName: '2026-01191226.pdf',
    productId: 21,
    customField1: 'Alchem-e',
    customField2: 'production@alchem-e.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-410',
    externalIdentifier: 'EXT-1003',
    excelFileName: '2026-01191226.xlsx'
  },
  {
    id: 1004,
    companyId: 24,
    jobId: 28,
    invoiceTypeId: 1,
    alternateClientNumber: 'ALT-415',
    invoiceNumber: '2026-01191227',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-08'),
    pdfFileName: '2026-01191227.pdf',
    productId: 25,
    customField1: 'Chan Co',
    customField2: 'billing@alchem-e.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-415',
    externalIdentifier: 'EXT-1004',
    excelFileName: '2026-01191227.xlsx'
  },
  {
    id: 1005,
    companyId: 24,
    jobId: 31,
    invoiceTypeId: 2,
    alternateClientNumber: 'ALT-420',
    invoiceNumber: '2026-01191228',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-09'),
    pdfFileName: '2026-01191228.pdf',
    productId: 29,
    customField1: 'racami',
    customField2: 'support@racami.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-420',
    externalIdentifier: 'EXT-1005',
    excelFileName: '2026-01191228.xlsx'
  },
  {
    id: 1006,
    companyId: 24,
    jobId: 33,
    invoiceTypeId: 3,
    alternateClientNumber: 'ALT-428',
    invoiceNumber: '2026-01191229',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-10'),
    pdfFileName: '2026-01191229.pdf',
    productId: 31,
    customField1: 'Alchem-e',
    customField2: 'production@alchem-e.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-428',
    externalIdentifier: 'EXT-1006',
    excelFileName: '2026-01191229.xlsx'
  },
  {
    id: 1007,
    companyId: 24,
    jobId: 35,
    invoiceTypeId: 1,
    alternateClientNumber: 'ALT-435',
    invoiceNumber: '2026-01191230',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-11'),
    pdfFileName: '2026-01191230.pdf',
    productId: 33,
    customField1: 'Chan Co',
    customField2: 'billing@alchem-e.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-435',
    externalIdentifier: 'EXT-1007',
    excelFileName: '2026-01191230.xlsx'
  },
  {
    id: 1008,
    companyId: 24,
    jobId: 36,
    invoiceTypeId: 2,
    alternateClientNumber: 'ALT-441',
    invoiceNumber: '2026-01191231',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-12'),
    pdfFileName: '2026-01191231.pdf',
    productId: 36,
    customField1: 'racami',
    customField2: 'support@racami.com',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-441',
    externalIdentifier: 'EXT-1008',
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
  readonly invoices = INVOICES;
  readonly rowActions = ROW_ACTIONS;
  readonly invoiceColumns = INVOICE_COLUMNS;
  readonly columnFieldOptions = COLUMN_FIELD_OPTIONS;
  readonly filters: FilterChip[] = [
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' }
  ];
  selectedInvoice: Invoice | null = null;
  detailInvoice: Invoice | null = null;
  showColumnSettings = false;

  selectInvoice(invoice: Invoice): void {
    this.selectedInvoice = invoice;
  }

  openDetails(invoice: Invoice): void {
    this.selectedInvoice = invoice;
    this.detailInvoice = invoice;
    this.showColumnSettings = false;
  }

  closeDetails(): void {
    this.detailInvoice = null;
  }

  openColumnSettings(): void {
    this.showColumnSettings = true;
    this.detailInvoice = null;
  }

  closeColumnSettings(): void {
    this.showColumnSettings = false;
  }

  getColumnClass(field: string): string {
    return COLUMN_CLASS_MAP[field] ?? 'col-default';
  }

  isSortable(field: string): boolean {
    return SORTABLE_FIELDS.has(field);
  }

  getColumnValue(invoice: Invoice, field: string): string {
    switch (field) {
      case 'Id':
        return invoice.id?.toString() ?? '—';
      case 'CompanyName':
        return invoice.alternateCompanyName ?? '—';
      case 'ParentCompany':
        return invoice.customField1 ?? '—';
      case 'EmailFromEmail':
        return invoice.customField2 ?? '—';
      default:
        return '—';
    }
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
