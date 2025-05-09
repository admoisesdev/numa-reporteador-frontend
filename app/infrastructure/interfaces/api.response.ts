export interface MsgResponse {
  error: string;
  message: string[] | string;
  statusCode: number;
}

export interface SelectOption {
  label: string;
  value: number | string;
}

export type ReportType = "pdf" | "excel" | undefined;

