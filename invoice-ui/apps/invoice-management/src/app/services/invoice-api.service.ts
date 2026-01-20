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
  private readonly invoiceSelectFields = [
    'InvoiceId',
    'CompanyId',
    'JobId',
    'InvoiceTypeId',
    'AlternateClientNumber',
    'InvoiceNumber',
    'AlternateCompanyName',
    'StatementDate',
    'PdfFileName',
    'ProductId',
    'CustomField1',
    'CustomField2',
    'CustomField3',
    'CustomField4',
    'SiteId',
    'BillingClientNumber',
    'ExternalIdentifier',
    'ExcelFileName'
  ];
  private readonly invoiceTypeSelectFields = [
    'InvoiceTypeId',
    'InvoiceTypeDescription',
    'AssetDirectory',
    'SiteId'
  ];

  constructor(private readonly http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    const baseUrl = this.getBaseUrl();
    const useLocalBackend = this.isLocalBackend(baseUrl);
    const query = useLocalBackend
      ? ''
      : this.buildOdataQuery({
      top: 25,
      skip: 0,
      select: this.invoiceSelectFields,
      orderby: 'InvoiceId asc'
        });
    const endpoint = useLocalBackend ? '/api/invoices' : '/odata/Invoice';

    return this.http
      .get<Invoice[] | InvoiceApiResponse>(`${baseUrl}${endpoint}${query}`, {
        headers: this.getAuthHeaders(useLocalBackend)
      })
      .pipe(
        map((response) => this.normalizeArray(response)),
        map((items) => items.map((item) => this.mapInvoice(item)))
      );
  }

  getInvoiceTypes(): Observable<InvoiceType[]> {
    const baseUrl = this.getBaseUrl();
    const useLocalBackend = this.isLocalBackend(baseUrl);
    const query = useLocalBackend
      ? ''
      : this.buildOdataQuery({
      top: 200,
      skip: 0,
      select: this.invoiceTypeSelectFields,
      orderby: 'InvoiceTypeId asc'
        });
    const endpoint = useLocalBackend ? '/api/invoice-types' : '/odata/InvoiceType';

    return this.http
      .get<InvoiceType[] | InvoiceApiResponse>(`${baseUrl}${endpoint}${query}`, {
        headers: this.getAuthHeaders(useLocalBackend)
      })
      .pipe(
        map((response) => this.normalizeArray(response)),
        map((items) => items.map((item) => this.mapInvoiceType(item)))
      );
  }

  private getAuthHeaders(useLocalBackend: boolean): HttpHeaders | undefined {
    if (useLocalBackend) {
      return undefined;
    }

    const token =
      localStorage.getItem('alcheme_token') ??
      localStorage.getItem('token') ??
      localStorage.getItem('alcheme_api_token');
    const companyId =
      localStorage.getItem('alcheme_company_id') ??
      localStorage.getItem('companyId') ??
      localStorage.getItem('x-companyid') ??
      this.getCompanyIdFromToken(token);

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
    const pick = <T>(key: string): T | undefined => value[key] as T | undefined;
    const pickAlt = <T>(key: string, altKey: string): T | undefined =>
      (value[key] ?? value[altKey]) as T | undefined;
    const statementDateValue = pickAlt<string>('StatementDate', 'statementDate');

    return {
      id: pickAlt<number>('InvoiceId', 'invoiceId') ?? pick<number>('id'),
      companyId: pickAlt<number>('CompanyId', 'companyId') ?? null,
      jobId: pickAlt<number>('JobId', 'jobId') ?? null,
      invoiceTypeId: pickAlt<number>('InvoiceTypeId', 'invoiceTypeId') ?? null,
      alternateClientNumber:
        pickAlt<string>('AlternateClientNumber', 'alternateClientNumber') ?? null,
      invoiceNumber: pickAlt<string>('InvoiceNumber', 'invoiceNumber') ?? null,
      alternateCompanyName:
        pickAlt<string>('AlternateCompanyName', 'alternateCompanyName') ?? null,
      statementDate: statementDateValue ? new Date(statementDateValue) : null,
      pdfFileName: pickAlt<string>('PdfFileName', 'pdfFileName') ?? null,
      productId: pickAlt<number>('ProductId', 'productId') ?? null,
      customField1: pickAlt<string>('CustomField1', 'customField1') ?? null,
      customField2: pickAlt<string>('CustomField2', 'customField2') ?? null,
      customField3: pickAlt<string>('CustomField3', 'customField3') ?? null,
      customField4: pickAlt<string>('CustomField4', 'customField4') ?? null,
      siteId: pickAlt<number>('SiteId', 'siteId') ?? null,
      billingClientNumber:
        pickAlt<string>('BillingClientNumber', 'billingClientNumber') ?? null,
      externalIdentifier:
        pickAlt<string>('ExternalIdentifier', 'externalIdentifier') ?? null,
      excelFileName: pickAlt<string>('ExcelFileName', 'excelFileName') ?? null
    };
  }

  private mapInvoiceType(raw: unknown): InvoiceType {
    const value = raw as Record<string, unknown>;
    const pick = <T>(key: string): T | undefined => value[key] as T | undefined;
    const pickAlt = <T>(key: string, altKey: string): T | undefined =>
      (value[key] ?? value[altKey]) as T | undefined;

    return {
      id: pick<number>('InvoiceTypeId') ?? pick<number>('id'),
      invoiceTypeId: pickAlt<number>('InvoiceTypeId', 'invoiceTypeId') ?? null,
      invoiceTypeDescription:
        pickAlt<string>('InvoiceTypeDescription', 'invoiceTypeDescription') ?? null,
      assetDirectory: pickAlt<string>('AssetDirectory', 'assetDirectory') ?? null,
      siteId: pickAlt<number>('SiteId', 'siteId') ?? null
    };
  }

  private buildOdataQuery(options: {
    top: number;
    skip: number;
    select: string[];
    orderby?: string;
    filter?: string;
    apply?: string;
    take?: number;
  }): string {
    const params = new URLSearchParams();
    params.set('$top', options.top.toString());
    params.set('$skip', options.skip.toString());
    params.set('$select', options.select.join(','));
    if (options.orderby) {
      params.set('$orderby', options.orderby);
    }
    if (options.filter) {
      params.set('$filter', options.filter);
    }
    if (options.apply) {
      params.set('$apply', options.apply);
    }
    if (options.take != null) {
      params.set('$take', options.take.toString());
    }
    return `?${params.toString()}`;
  }

  private getBaseUrl(): string {
    return (
      localStorage.getItem('alcheme_api_base_url')?.trim() ||
      localStorage.getItem('api_base_url')?.trim() ||
      this.baseUrl
    );
  }

  private isLocalBackend(baseUrl: string): boolean {
    return baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
  }

  private getCompanyIdFromToken(token: string | null): string | null {
    if (!token) {
      return null;
    }
    try {
      const payload = token.split('.')[1];
      if (!payload) {
        return null;
      }
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const data = JSON.parse(json) as Record<string, unknown>;
      const selected = data.selectedCompanyId;
      if (typeof selected === 'string' || typeof selected === 'number') {
        return String(selected);
      }
      const userCompany = data.userCompanyId;
      if (typeof userCompany === 'string' || typeof userCompany === 'number') {
        return String(userCompany);
      }
      return null;
    } catch (error) {
      console.warn('Failed to parse company id from token.', error);
      return null;
    }
  }
}
