export interface AccountStatusPdfData{
  logo: string;
  title: string;
  subtitle: string;
  info: { key: string; value: string }[];
  paymentInfo: { key: string; value: string }[];
  cancelationColumns: { title: string; subcolumns: string[] }[];
  cancelationRows: { rows: { mainRow: string[][]; subRows?: string[][]}[] };
  totalsInfo: { key: string; value: number | string }[];
};

export interface ChargedPortfolioPdfData {
  logo: string;
  title: string;
  info: { key: string; value: string }[];
  contractsChargesColumns: { title: string; subcolumns: string[] }[];
  contractsChargesRows: { rows: { mainRow: string[][]; subRows?: string[][] }[] };
}