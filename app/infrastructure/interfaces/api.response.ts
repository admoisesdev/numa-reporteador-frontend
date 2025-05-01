export interface MsgResponse {
  error: string;
  message: string[] | string;
  statusCode: number;
}

export type ReportType = "pdf" | "excel" | undefined;
