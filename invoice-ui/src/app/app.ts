import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Invoice } from './models/invoice.model';
import { InvoiceType } from './models/invoice-type.model';

interface NavItem {
  label: string;
  active?: boolean;
}

interface FilterChip {
  label: string;
  value: string;
}

const NAV_ITEMS: NavItem[] = [{ label: 'Invoice', active: true }];

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

const INVOICES: Invoice[] = [
  {
    id: 1001,
    companyId: 24,
    jobId: 18,
    invoiceTypeId: 1,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-05'),
    pdfFileName: 'invoice-1001.pdf',
    productId: 11,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-391',
    excelFileName: 'invoice-1001.xlsx'
  },
  {
    id: 1002,
    companyId: 24,
    jobId: 22,
    invoiceTypeId: 2,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-06'),
    pdfFileName: 'invoice-1002.pdf',
    productId: 14,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-402',
    excelFileName: 'invoice-1002.xlsx'
  },
  {
    id: 1003,
    companyId: 24,
    jobId: 25,
    invoiceTypeId: 3,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-07'),
    pdfFileName: 'invoice-1003.pdf',
    productId: 21,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-410',
    excelFileName: 'invoice-1003.xlsx'
  },
  {
    id: 1004,
    companyId: 24,
    jobId: 28,
    invoiceTypeId: 1,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-08'),
    pdfFileName: 'invoice-1004.pdf',
    productId: 25,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-415',
    excelFileName: 'invoice-1004.xlsx'
  },
  {
    id: 1005,
    companyId: 24,
    jobId: 31,
    invoiceTypeId: 2,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-09'),
    pdfFileName: 'invoice-1005.pdf',
    productId: 29,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-420',
    excelFileName: 'invoice-1005.xlsx'
  },
  {
    id: 1006,
    companyId: 24,
    jobId: 33,
    invoiceTypeId: 3,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-10'),
    pdfFileName: 'invoice-1006.pdf',
    productId: 31,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-428',
    excelFileName: 'invoice-1006.xlsx'
  },
  {
    id: 1007,
    companyId: 24,
    jobId: 35,
    invoiceTypeId: 1,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-11'),
    pdfFileName: 'invoice-1007.pdf',
    productId: 33,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-435',
    excelFileName: 'invoice-1007.xlsx'
  },
  {
    id: 1008,
    companyId: 24,
    jobId: 36,
    invoiceTypeId: 2,
    invoiceNumber: 'Primary string',
    alternateCompanyName: 'Alchem-e Labs',
    statementDate: new Date('2024-03-12'),
    pdfFileName: 'invoice-1008.pdf',
    productId: 36,
    customField1: 'Cell string',
    customField2: 'Cell string',
    customField3: 'Cell string',
    customField4: 'Cell string',
    siteId: 3,
    billingClientNumber: 'BC-441',
    excelFileName: 'invoice-1008.xlsx'
  }
];

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly navItems = NAV_ITEMS;
  readonly invoiceTypes = INVOICE_TYPES;
  readonly invoices = INVOICES;
  readonly filters: FilterChip[] = [
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' },
    { label: 'Filter name', value: 'All' }
  ];
}
