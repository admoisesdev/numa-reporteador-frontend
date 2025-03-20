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
  expiredDocumentsValue: number;
  lateInterestPayable: number;
  ncValue: number;
  netValueCancel: number;
  percentageCharged: number;
  reserveValue: number;
  salePrice: string;
  status: string;
  totalCancelDiscount: number;
  totalExpired: number;
  totalValueChargedCustomer: number;
  typeOfGood: string;
  valueCancelArrears: number;
  valueCancelProtestedCheck: number; 
  valueCancelExcessPayment: number;
  valueToBeat: number;
}

export interface AccountStatus {
  contract: FullContract;
  financing: Financing[];
}

export interface ChargedPortfolio {
  contract: string;
  creditAdvisor: string;
  location: string;
  customer: string;
  deliveryDate: string;
  initialFee: number;
  expiredLess30Fb: number;
  expiredMore30Fb: number;
  onTimeFb: number;
  prepaymentFb: number;
  totalChargedFb: number;
  expiredLess30Ce: number;
  expiredMore30Ce: number;
  onTimeCe: number;
  prepaymentCe: number;
  totalChargedCe: number;
  totalCustomer: number;
}
