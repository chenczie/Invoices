const sql = require('mssql');

let poolPromise = null;

function getConnectionString() {
  return process.env.MSSQL_CONNECTION_STRING;
}

async function getPool() {
  const connectionString = getConnectionString();
  if (!connectionString) {
    return null;
  }
  if (!poolPromise) {
    poolPromise = sql.connect(connectionString);
  }
  return poolPromise;
}

async function queryInvoices(filters) {
  const pool = await getPool();
  if (!pool) {
    return null;
  }

  const request = pool.request();
  request.input('billingClientNumber', sql.VarChar(30), filters.billingClientNumber || null);
  request.input('invoiceNumber', sql.VarChar(20), filters.invoiceNumber || null);
  request.input('siteId', sql.Int, filters.siteId ?? null);
  request.input('startDate', sql.DateTime, filters.startDate ?? null);
  request.input('endDate', sql.DateTime, filters.endDate ?? null);

  const query = `
    SELECT
      i.InvoiceId,
      i.CompanyId,
      i.JobId,
      i.InvoiceTypeId,
      i.AlternateClientNumber,
      i.InvoiceNumber,
      i.AlternateCompanyName,
      i.StatementDate,
      i.PdfFileName,
      i.ProductId,
      i.CustomField1,
      i.CustomField2,
      i.CustomField3,
      i.CustomField4,
      i.SiteId,
      i.BillingClientNumber,
      i.ExternalIdentifier,
      i.ExcelFileName,
      it.InvoiceTypeDescription
    FROM Invoice i
    LEFT JOIN InvoiceType it
      ON it.InvoiceTypeId = i.InvoiceTypeId
    WHERE (@billingClientNumber IS NULL OR i.BillingClientNumber = @billingClientNumber)
      AND (@invoiceNumber IS NULL OR i.InvoiceNumber = @invoiceNumber)
      AND (@siteId IS NULL OR i.SiteId = @siteId)
      AND (@startDate IS NULL OR i.StatementDate >= @startDate)
      AND (@endDate IS NULL OR i.StatementDate <= @endDate)
    ORDER BY i.BillingClientNumber, i.InvoiceNumber;
  `;

  const result = await request.query(query);
  return result.recordset;
}

async function queryInvoiceById(invoiceId) {
  const pool = await getPool();
  if (!pool) {
    return null;
  }
  const request = pool.request();
  request.input('invoiceId', sql.Int, invoiceId);
  const query = `
    SELECT
      i.InvoiceId,
      i.CompanyId,
      i.JobId,
      i.InvoiceTypeId,
      i.AlternateClientNumber,
      i.InvoiceNumber,
      i.AlternateCompanyName,
      i.StatementDate,
      i.PdfFileName,
      i.ProductId,
      i.CustomField1,
      i.CustomField2,
      i.CustomField3,
      i.CustomField4,
      i.SiteId,
      i.BillingClientNumber,
      i.ExternalIdentifier,
      i.ExcelFileName,
      it.InvoiceTypeDescription
    FROM Invoice i
    LEFT JOIN InvoiceType it
      ON it.InvoiceTypeId = i.InvoiceTypeId
    WHERE i.InvoiceId = @invoiceId;
  `;
  const result = await request.query(query);
  return result.recordset[0] || null;
}

async function updateInvoice(invoiceId, updates) {
  const pool = await getPool();
  if (!pool) {
    return null;
  }

  const editableFields = [
    { key: 'alternateClientNumber', column: 'AlternateClientNumber', type: sql.VarChar(30) },
    { key: 'invoiceNumber', column: 'InvoiceNumber', type: sql.VarChar(20) },
    { key: 'alternateCompanyName', column: 'AlternateCompanyName', type: sql.VarChar(100) },
    { key: 'statementDate', column: 'StatementDate', type: sql.DateTime },
    { key: 'pdfFileName', column: 'PdfFileName', type: sql.VarChar(200) },
    { key: 'excelFileName', column: 'ExcelFileName', type: sql.VarChar(200) },
    { key: 'billingClientNumber', column: 'BillingClientNumber', type: sql.VarChar(30) }
  ];

  const assignments = [];
  const request = pool.request();
  request.input('invoiceId', sql.Int, invoiceId);

  editableFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(updates, field.key)) {
      assignments.push(`${field.column} = @${field.key}`);
      request.input(field.key, field.type, updates[field.key]);
    }
  });

  if (assignments.length === 0) {
    return queryInvoiceById(invoiceId);
  }

  const query = `
    UPDATE Invoice
    SET ${assignments.join(', ')}
    WHERE InvoiceId = @invoiceId;
  `;
  await request.query(query);
  return queryInvoiceById(invoiceId);
}

module.exports = {
  getPool,
  queryInvoices,
  queryInvoiceById,
  updateInvoice
};
