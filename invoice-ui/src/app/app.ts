import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Invoice } from './models/invoice.model';
import { Job } from './models/job.model';
import { JobDetail } from './models/job-detail.model';

const INVOICES: Invoice[] = [
  {
    id: 93,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'Invoices_03292022.pdf',
    excelFileName: 'Invoices_03292022.xls',
    pdfUrl: '/assets/invoices/Invoices_03292022.pdf',
    excelUrl: '/assets/invoices/Invoices_03292022.xls'
  },
  {
    id: 94,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '100006223',
    invoiceDescription: 'Chen Co Annex',
    invoiceNumber: '12345D',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'Invoices_11242022.pdf',
    excelFileName: 'Invoices_11242022.xls',
    pdfUrl: '/assets/invoices/Invoices_11242022.pdf',
    excelUrl: '/assets/invoices/Invoices_11242022.xls'
  },
  {
    id: 95,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'test5.pdf',
    excelFileName: 'test5.xls',
    pdfUrl: '/assets/invoices/test5.pdf',
    excelUrl: '/assets/invoices/test5.xls'
  },
  {
    id: 96,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'test5.pdf',
    excelFileName: 'test5.xls',
    pdfUrl: '/assets/invoices/test5.pdf',
    excelUrl: '/assets/invoices/test5.xls'
  },
  {
    id: 97,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'test5.pdf',
    excelFileName: 'test5.xls',
    pdfUrl: '/assets/invoices/test5.pdf',
    excelUrl: '/assets/invoices/test5.xls'
  },
  {
    id: 98,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: new Date('2021-10-12'),
    pdfFileName: 'test5.pdf',
    excelFileName: 'test5.xls',
    pdfUrl: '/assets/invoices/test5.pdf',
    excelUrl: '/assets/invoices/test5.xls'
  }
];

const JOBS: Job[] = [
  {
    id: 1544,
    invoiceId: 94,
    invoiceNumber: '12345D',
    product: 'Credit Card Statements',
    rejectedQuantity: 0,
    mailedQuantity: 264,
    printFileName: '11310_1231.pdf',
    status: 'Job Approved',
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: 'Ops Team',
    statusEventDate: '2022-11-14 07:24:03 EST',
    pdfFileName: '11310_1231.pdf'
  },
  {
    id: 1416,
    invoiceId: 94,
    invoiceNumber: '12345D',
    product: 'Credit Card Statements',
    rejectedQuantity: 0,
    mailedQuantity: 0,
    printFileName: '11308_1129.pdf',
    status: 'Job Approved',
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: 'Ops Team',
    statusEventDate: '2022-11-14 05:27:31 EST',
    pdfFileName: '11308_1129.pdf'
  },
  {
    id: 1417,
    invoiceId: 93,
    invoiceNumber: '12345C',
    product: 'Credit Card Statements',
    rejectedQuantity: 0,
    mailedQuantity: 0,
    printFileName: '11307_1128.pdf',
    status: 'Job Approved',
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: 'Ops Team',
    statusEventDate: '2022-11-11 19:21:45 EST',
    pdfFileName: '11307_1128.pdf'
  }
];

const JOB_DETAILS: JobDetail[] = [
  {
    id: 1,
    jobId: 1544,
    status: 'Ready for Print',
    optionId: '12131',
    slaDate: '2022-11-17 07:24:51 EST',
    printFileName: '11310_1231.pdf',
    product: 'Credit - SMS',
    rejectedQuantity: 0,
    mailedQuantity: 64,
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: '-',
    statusEventDate: '2022-11-14 07:27:05 EST',
    pdfFileName: '11310_1231.pdf'
  },
  {
    id: 2,
    jobId: 1544,
    status: 'Rejected',
    optionId: '12130',
    slaDate: '2022-11-18 07:24:31 EST',
    printFileName: '11310_12130.pdf',
    product: 'Credit - Print',
    rejectedQuantity: 0,
    mailedQuantity: 100,
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: '-',
    statusEventDate: '2022-11-14 07:27:05 EST',
    pdfFileName: '11310_12130.pdf'
  },
  {
    id: 3,
    jobId: 1417,
    status: 'Ready for Print',
    optionId: '12129',
    slaDate: '2022-11-17 07:24:23 EST',
    printFileName: '11307_12129.pdf',
    product: 'Credit - Email',
    rejectedQuantity: 0,
    mailedQuantity: 100,
    shipCarrierId: '-',
    shipMethodId: '-',
    statusEventChangedBy: '-',
    statusEventDate: '2022-11-14 07:27:05 EST',
    pdfFileName: '11307_12129.pdf'
  }
];

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly invoices = [...INVOICES].sort((left, right) =>
    (left.billingClientNumber ?? '').localeCompare(right.billingClientNumber ?? '')
  );
  readonly jobs = JOBS;
  readonly jobDetails = JOB_DETAILS;

  selectedInvoiceId: number | null = this.invoices[0]?.id ?? null;
  selectedJobId: number | null = null;

  constructor() {
    const initialJob = this.filteredJobs[0];
    this.selectedJobId = initialJob?.id ?? null;
  }

  get selectedInvoice(): Invoice | undefined {
    return this.invoices.find((invoice) => invoice.id === this.selectedInvoiceId);
  }

  get filteredJobs(): Job[] {
    if (!this.selectedInvoiceId) {
      return [];
    }
    return this.jobs.filter((job) => job.invoiceId === this.selectedInvoiceId);
  }

  get filteredJobDetails(): JobDetail[] {
    if (!this.selectedJobId) {
      return [];
    }
    return this.jobDetails.filter((detail) => detail.jobId === this.selectedJobId);
  }

  selectInvoice(invoice: Invoice): void {
    this.selectedInvoiceId = invoice.id ?? null;
    const nextJob = this.filteredJobs[0];
    this.selectedJobId = nextJob?.id ?? null;
  }

  selectJob(job: Job): void {
    this.selectedJobId = job.id;
  }
}
