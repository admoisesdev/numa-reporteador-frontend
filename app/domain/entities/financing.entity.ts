import type { Charge } from "./charges.entity";

export interface Financing{
  dividendBalanceValue: number;
  dividendNumber: number;
  dividendType: string;
  dividendValue: number;
  expirationDate: string;
  charges: Charge[];
}