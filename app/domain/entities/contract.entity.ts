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

export interface PortfolioAge {
  project: string;
  contract: string;
  location: string;
  constructionStatus: string;
  progressPercentage: number;
  customer: string;
  saleDate: string;
  deliveryDate: string;
  salePrice: number;
  totalCharged: number;
  chargedPercentage: number;
  entryBalance: number;
  hipProcedure: number;
  fStraight: number;
  from0to30: number;
  from30to60: number;
  from60to90: number;
  moreThan90: number;
  totalExpired: number;

}

export interface Receivables { 
  "Empresa": string;
  "Proyecto": string;
  "Oficial de credito": string;
  "Cliente": string;
  "Teléfono": string;
  "Email": string;
  "Oficial de cuenta": string;
  "Contrato": string;
  "Precio venta": string;
  "Ubicación": string;
  "Tipo de documento": string;
  "Descripción": string;
  "Fecha vencimiento": string;
  "Cuota": string;
  "Imp. pendiente": string;
  "Imp. bruto": string;
}