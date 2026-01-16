const express = require('express');

const { buildFileUrl } = require('../utils/file-urls');
const {
  invoices: mockInvoices,
  jobs: mockJobs,
  jobDetails: mockJobDetails,
  events: mockEvents,
  comments: mockComments,
  invoiceColumns
} = require('../data/mock-data');
const { queryInvoices, queryInvoiceById, updateInvoice } = require('../db');

const router = express.Router();

function toDateValue(value) {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}

function mapInvoice(row) {
  const fileBaseUrl = process.env.FILE_BASE_URL || 'https://files.example.com/invoices';
  const pdfFileName = row.PdfFileName ?? row.pdfFileName ?? null;
  const excelFileName = row.ExcelFileName ?? row.excelFileName ?? null;
  const statementDate = row.StatementDate ?? row.statementDate ?? null;
  const siteId = row.SiteId ?? row.siteId ?? null;
  const siteName = row.SiteName ?? row.site ?? (siteId ? `Site ${siteId}` : null);

  return {
    id: row.InvoiceId ?? row.id,
    companyId: row.CompanyId ?? row.companyId ?? null,
    jobId: row.JobId ?? row.jobId ?? null,
    invoiceTypeId: row.InvoiceTypeId ?? row.invoiceTypeId ?? null,
    alternateClientNumber: row.AlternateClientNumber ?? row.alternateClientNumber ?? null,
    invoiceNumber: row.InvoiceNumber ?? row.invoiceNumber ?? null,
    alternateCompanyName: row.AlternateCompanyName ?? row.alternateCompanyName ?? null,
    statementDate: toDateValue(statementDate),
    pdfFileName,
    productId: row.ProductId ?? row.productId ?? null,
    customField1: row.CustomField1 ?? row.customField1 ?? null,
    customField2: row.CustomField2 ?? row.customField2 ?? null,
    customField3: row.CustomField3 ?? row.customField3 ?? null,
    customField4: row.CustomField4 ?? row.customField4 ?? null,
    siteId,
    site: siteName,
    billingClientNumber: row.BillingClientNumber ?? row.billingClientNumber ?? null,
    externalIdentifier: row.ExternalIdentifier ?? row.externalIdentifier ?? null,
    excelFileName,
    invoiceDescription:
      row.InvoiceTypeDescription ?? row.invoiceDescription ?? row.alternateCompanyName ?? null,
    pdfUrl: row.pdfUrl ?? buildFileUrl(fileBaseUrl, pdfFileName),
    excelUrl: row.excelUrl ?? buildFileUrl(fileBaseUrl, excelFileName)
  };
}

function applyInvoiceFilters(list, filters) {
  return list.filter((invoice) => {
    if (filters.billingClientNumber && invoice.billingClientNumber !== filters.billingClientNumber) {
      return false;
    }
    if (filters.invoiceNumber && invoice.invoiceNumber !== filters.invoiceNumber) {
      return false;
    }
    if (filters.siteId && String(invoice.siteId) !== String(filters.siteId)) {
      return false;
    }
    if (filters.startDate && new Date(invoice.statementDate) < filters.startDate) {
      return false;
    }
    if (filters.endDate && new Date(invoice.statementDate) > filters.endDate) {
      return false;
    }
    return true;
  });
}

function parseDateParam(value) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

router.get('/invoices/columns', (req, res) => {
  res.json(invoiceColumns);
});

router.get('/invoices', async (req, res, next) => {
  try {
    const filters = {
      billingClientNumber: req.query.billingClientNumber || null,
      invoiceNumber: req.query.invoiceNumber || null,
      siteId: req.query.siteId ? Number(req.query.siteId) : null,
      startDate: parseDateParam(req.query.startDate),
      endDate: parseDateParam(req.query.endDate)
    };

    const rows = await queryInvoices(filters);
    if (rows) {
      return res.json(rows.map(mapInvoice));
    }

    const filtered = applyInvoiceFilters(mockInvoices, filters)
      .map(mapInvoice)
      .sort((left, right) =>
        String(left.billingClientNumber || '').localeCompare(String(right.billingClientNumber || ''))
      );
    return res.json(filtered);
  } catch (error) {
    return next(error);
  }
});

router.get('/invoices/:id', async (req, res, next) => {
  try {
    const invoiceId = Number(req.params.id);
    const row = await queryInvoiceById(invoiceId);
    if (row) {
      return res.json(mapInvoice(row));
    }
    const invoice = mockInvoices.find((item) => item.id === invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found.' });
    }
    return res.json(mapInvoice(invoice));
  } catch (error) {
    return next(error);
  }
});

router.patch('/invoices/:id', async (req, res, next) => {
  try {
    const invoiceId = Number(req.params.id);
    const updates = req.body || {};
    const updated = await updateInvoice(invoiceId, updates);
    if (updated) {
      return res.json(mapInvoice(updated));
    }

    const invoice = mockInvoices.find((item) => item.id === invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found.' });
    }

    Object.assign(invoice, updates);
    const fileBaseUrl = process.env.FILE_BASE_URL || 'https://files.example.com/invoices';
    invoice.pdfUrl = buildFileUrl(fileBaseUrl, invoice.pdfFileName);
    invoice.excelUrl = buildFileUrl(fileBaseUrl, invoice.excelFileName);

    return res.json(mapInvoice(invoice));
  } catch (error) {
    return next(error);
  }
});

router.get('/invoices/:id/files', (req, res) => {
  const invoiceId = Number(req.params.id);
  const invoice = mockInvoices.find((item) => item.id === invoiceId);
  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found.' });
  }
  return res.json({
    invoiceId,
    pdfFileName: invoice.pdfFileName,
    excelFileName: invoice.excelFileName,
    pdfUrl: invoice.pdfUrl,
    excelUrl: invoice.excelUrl
  });
});

router.get('/invoices/:id/events', (req, res) => {
  const invoiceId = Number(req.params.id);
  const invoiceEvents = mockEvents.filter((event) => event.invoiceId === invoiceId);
  return res.json(invoiceEvents);
});

router.get('/invoices/:id/comments', (req, res) => {
  const invoiceId = Number(req.params.id);
  const invoiceComments = mockComments.filter((comment) => comment.invoiceId === invoiceId);
  return res.json(invoiceComments);
});

router.post('/invoices/:id/comments', (req, res) => {
  const invoiceId = Number(req.params.id);
  const { message, createdBy } = req.body || {};
  if (!message) {
    return res.status(400).json({ message: 'Message is required.' });
  }
  const nextId = mockComments.length
    ? Math.max(...mockComments.map((comment) => comment.id)) + 1
    : 1;
  const comment = {
    id: nextId,
    invoiceId,
    message,
    createdAt: new Date().toISOString(),
    createdBy: createdBy || 'system'
  };
  mockComments.push(comment);
  return res.status(201).json(comment);
});

router.get('/invoices/:id/jobs', (req, res) => {
  const invoiceId = Number(req.params.id);
  const invoiceJobs = mockJobs.filter((job) => job.invoiceId === invoiceId);
  return res.json(invoiceJobs);
});

router.get('/jobs/:jobId/details', (req, res) => {
  const jobId = Number(req.params.jobId);
  const details = mockJobDetails.filter((detail) => detail.jobId === jobId);
  return res.json(details);
});

module.exports = router;
