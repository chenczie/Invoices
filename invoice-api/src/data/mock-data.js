const { buildFileUrl } = require('../utils/file-urls');

const fileBaseUrl = process.env.FILE_BASE_URL || 'https://files.example.com/invoices';

const invoices = [
  {
    id: 93,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: '2021-10-12',
    pdfFileName: 'Invoices_03292022.pdf',
    excelFileName: 'Invoices_03292022.xls'
  },
  {
    id: 94,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '100006223',
    invoiceDescription: 'Chen Co Annex',
    invoiceNumber: '12345D',
    statementDate: '2021-10-12',
    pdfFileName: 'Invoices_11242022.pdf',
    excelFileName: 'Invoices_11242022.xls'
  },
  {
    id: 95,
    siteId: 10,
    site: 'Atlanta Office',
    billingClientNumber: '1111C',
    invoiceDescription: 'CCo',
    invoiceNumber: '12345C',
    statementDate: '2021-10-12',
    pdfFileName: 'test5.pdf',
    excelFileName: 'test5.xls'
  }
].map((invoice) => ({
  ...invoice,
  pdfUrl: buildFileUrl(fileBaseUrl, invoice.pdfFileName),
  excelUrl: buildFileUrl(fileBaseUrl, invoice.excelFileName)
}));

const jobs = [
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

const jobDetails = [
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

const events = [
  {
    id: 1,
    invoiceId: 94,
    eventType: 'Invoice Uploaded',
    description: 'Invoice upload completed.',
    createdAt: '2022-11-24 20:52:23 EST',
    createdBy: 'csasim'
  },
  {
    id: 2,
    invoiceId: 94,
    eventType: 'Audit History',
    description: 'Invoice exported to PDF and XLS.',
    createdAt: '2022-11-24 20:55:11 EST',
    createdBy: 'system'
  },
  {
    id: 3,
    invoiceId: 93,
    eventType: 'Invoice Uploaded',
    description: 'Invoice upload completed.',
    createdAt: '2022-11-24 20:50:14 EST',
    createdBy: 'csasim'
  }
];

const comments = [
  {
    id: 1,
    invoiceId: 94,
    message: 'Verified invoice totals.',
    createdAt: '2022-11-24 21:02:11 EST',
    createdBy: 'ops'
  }
];

const invoiceColumns = [
  { key: 'site', label: 'Site', configurable: true },
  { key: 'billingClientNumber', label: 'Billing Client Number', configurable: true },
  { key: 'invoiceDescription', label: 'Invoice Description', configurable: true },
  { key: 'invoiceNumber', label: 'Invoice Number', configurable: true },
  { key: 'statementDate', label: 'Invoice Date', configurable: true },
  { key: 'pdfFileName', label: 'PDF', configurable: false },
  { key: 'excelFileName', label: 'Spreadsheet Download', configurable: false },
  { key: 'events', label: 'View Events', configurable: false }
];

module.exports = {
  invoices,
  jobs,
  jobDetails,
  events,
  comments,
  invoiceColumns
};
