export interface Job {
  id: number;
  invoiceId: number;
  invoiceNumber: string;
  product: string;
  rejectedQuantity: number;
  mailedQuantity: number;
  printFileName: string;
  status: string;
  shipCarrierId: string;
  shipMethodId: string;
  statusEventChangedBy: string;
  statusEventDate: string;
  pdfFileName: string;
}
