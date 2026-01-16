export interface JobDetail {
  id: number;
  jobId: number;
  status: string;
  optionId: string;
  slaDate: string;
  printFileName: string;
  product: string;
  rejectedQuantity: number;
  mailedQuantity: number;
  shipCarrierId: string;
  shipMethodId: string;
  statusEventChangedBy: string;
  statusEventDate: string;
  pdfFileName: string;
}
