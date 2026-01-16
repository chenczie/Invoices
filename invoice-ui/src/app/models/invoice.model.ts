export interface Invoice {
  id: number;
  companyId?: number | null;
  jobId?: number | null;
  invoiceTypeId?: number | null;
  alternateClientNumber?: string | null;
  invoiceNumber: string;
  alternateCompanyName?: string | null;
  statementDate: Date;
  pdfFileName: string;
  productId?: number | null;
  customField1?: string | null;
  customField2?: string | null;
  customField3?: string | null;
  customField4?: string | null;
  siteId?: number | null;
  site: string;
  billingClientNumber: string;
  excelFileName: string;
  invoiceDescription: string;
  pdfUrl: string;
  excelUrl: string;
}
