import type { Charge } from "./charges.entity";
import type { Financing } from "./financing.entity";

export interface Contract {
  id: string;
  location: string;
  project: string;
  sellerCustomer: string;
}

export interface FullContract extends Contract{
  balanceValue: number;
  closingDate: string;
  creditAdvisor: string;
  currency: string;
  entranceValue: number;
  entryFeeBalance: number;
  reserveValue: number;
  salePrice: string;
  status: string;
  typeOfGood: string;
}

export interface AccountStatus {
  contract: FullContract;
  financing: Financing[];
  charges: Charge[];
}
