import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Invoice } from '../models/invoice.model';
import { InvoiceType } from '../models/invoice-type.model';

interface InvoiceApiResponse {
  value?: unknown[];
}

@Injectable({ providedIn: 'root' })
export class InvoiceApiService {
  private readonly baseUrl = 'https://cisstg03.racami.com/AlchemeAPI';

  constructor(private readonly http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http
      .get<Invoice[] | InvoiceApiResponse>(`${this.baseUrl}/odata/Invoice`, {
        headers: this.getAuthHeaders()
      })
      .pipe(
        map((response) => this.normalizeArray(response)),
        map((items) => items.map((item) => this.mapInvoice(item)))
      );
  }

  getInvoiceTypes(): Observable<InvoiceType[]> {
    return this.http
      .get<InvoiceType[] | InvoiceApiResponse>(`${this.baseUrl}/odata/InvoiceType`, {
        headers: this.getAuthHeaders()
      })
      .pipe(
        map((response) => this.normalizeArray(response)),
        map((items) => items.map((item) => this.mapInvoiceType(item)))
      );
  }

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('alcheme_api_token');
    const companyId =
      localStorage.getItem('alcheme_company_id') ??
      localStorage.getItem('companyId') ??
      localStorage.getItem('x-companyid');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (companyId) {
      headers = headers.set('x-companyid', companyId);
    }

    return headers.keys().length ? headers : undefined;
  }

  private normalizeArray(response: Invoice[] | InvoiceType[] | InvoiceApiResponse): unknown[] {
    if (Array.isArray(response)) {
      return response as unknown[];
    }
    return response.value ?? [];
  }

  private mapInvoice(raw: unknown): Invoice {
    const value = raw as Record<string, unknown>;
    return {
      id: (value.InvoiceId as number) ?? (value.invoiceId as number) ?? (value.id as number),
      companyId: (value.CompanyId as number) ?? (value.companyId as number) ?? null,
      jobId: (value.JobId as number) ?? (value.jobId as number) ?? null,
      invoiceTypeId: (value.InvoiceTypeId as number) ?? (value.invoiceTypeId as number) ?? null,
      alternateClientNumber:
        (value.AlternateClientNumber as string) ?? (value.alternateClientNumber as string) ?? null,
      invoiceNumber: (value.InvoiceNumber as string) ?? (value.invoiceNumber as string) ?? null,
      alternateCompanyName:
        (value.AlternateCompanyName as string) ?? (value.alternateCompanyName as string) ?? null,
      statementDate: value.StatementDate
        ? new Date(value.StatementDate as string)
        : value.statementDate
          ? new Date(value.statementDate as string)
          : null,
      pdfFileName: (value.PdfFileName as string) ?? (value.pdfFileName as string) ?? null,
      productId: (value.ProductId as number) ?? (value.productId as number) ?? null,
      customField1: (value.CustomField1 as string) ?? (value.customField1 as string) ?? null,
      customField2: (value.CustomField2 as string) ?? (value.customField2 as string) ?? null,
      customField3: (value.CustomField3 as string) ?? (value.customField3 as string) ?? null,
      customField4: (value.CustomField4 as string) ?? (value.customField4 as string) ?? null,
      siteId: (value.SiteId as number) ?? (value.siteId as number) ?? null,
      billingClientNumber:
        (value.BillingClientNumber as string) ?? (value.billingClientNumber as string) ?? null,
      externalIdentifier:
        (value.ExternalIdentifier as string) ?? (value.externalIdentifier as string) ?? null,
      excelFileName: (value.ExcelFileName as string) ?? (value.excelFileName as string) ?? null
    };
  }

  private mapInvoiceType(raw: unknown): InvoiceType {
    const value = raw as Record<string, unknown>;
    return {
      id: (value.InvoiceTypeId as number) ?? (value.id as number),
      invoiceTypeId: (value.InvoiceTypeId as number) ?? (value.invoiceTypeId as number) ?? null,
      invoiceTypeDescription:
        (value.InvoiceTypeDescription as string) ??
        (value.invoiceTypeDescription as string) ??
        null,
      assetDirectory: (value.AssetDirectory as string) ?? (value.assetDirectory as string) ?? null,
      siteId: (value.SiteId as number) ?? (value.siteId as number) ?? null
    };
  }
}
