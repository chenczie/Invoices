export interface Invoice {
  id?: number;
  companyId?: number | null;
  jobId?: number | null;
  invoiceTypeId?: number | null;
  alternateClientNumber?: string | null;
  invoiceNumber?: string | null;
  alternateCompanyName?: string | null;
  statementDate?: Date | null;
  pdfFileName?: string | null;
  productId?: number | null;
  customField1?: string | null;
  customField2?: string | null;
  customField3?: string | null;
  customField4?: string | null;
  siteId?: number | null;
  billingClientNumber?: string | null;
  externalIdentifier?: string | null;
  excelFileName?: string | null;
}
