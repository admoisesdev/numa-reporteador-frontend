import type { AccountStatus, ChargedPortfolio } from "domain/entities";
import type {
  AccountStatusPdfData,
  ChargedPortfolioPdfData,
} from "infrastructure/interfaces";

import { Formatter } from "config/helpers";
import { DateAdapter } from "config/adapters";

export class PdfMapper {
  static fromAccountStatusToPdfData(
    accountStatus: AccountStatus,
    customerName: string
  ): AccountStatusPdfData {
    const cancelationsData = accountStatus?.financing.map((financing) => {
      return {
        mainRow: [
          [
            financing.dividendNumber ?? "N/A",
            financing.dividendType ?? "N/A",
            financing.expirationDate ?? "N/A",
            Formatter.numberWithCommasAndDots(financing.dividendValue) ?? "N/A",
          ],
          ["", "", ""],
          [
            Formatter.numberWithCommasAndDots(financing.dividendBalanceValue) ??
              "N/A",
          ],
        ],
        subRows:
          financing.charges.map((charge) => [
            `${charge.reference} ${charge.dividendType}` || "N/A",
            "",
            charge.receiptNumber ?? "N/A",
            charge.chargeDate ?? "N/A",
            Formatter.numberWithCommasAndDots(charge.chargedValue) ?? "N/A",
            "",
          ]) ?? [],
      };
    }) as { mainRow: string[][]; subRows: string[][] }[];

    return {
      logo: "./logo.png",
      title: "Numa S.A.S",
      subtitle: "Estado de cuenta",
      info: [
        {
          key: "fecha del corte",
          value: DateAdapter.formatDate(new Date()) ?? "N/A",
        },
        { key: "proyecto", value: accountStatus?.contract.project! ?? "N/A" },
        { key: "cliente", value: customerName ?? "N/A" },
        { key: "modelo", value: accountStatus?.contract.location! ?? "N/A" },
        {
          key: "urbanizacion",
          value: accountStatus?.contract.project! ?? "N/A",
        },
        {
          key: "fecha cont",
          value: accountStatus?.contract.closingDate! ?? "N/A",
        },
        {
          key: "tipo del bien",
          value: accountStatus?.contract.typeOfGood! ?? "N/A",
        },
        { key: "estado cont", value: accountStatus?.contract.status! ?? "N/A" },
        { key: "Nro. contrato", value: accountStatus?.contract.id! ?? "N/A" },
        {
          key: "asesor de crédito",
          value: accountStatus?.contract.creditAdvisor! ?? "N/A",
        },
        {
          key: "vendedor",
          value: accountStatus?.contract.sellerCustomer! ?? "N/A",
        },
        { key: "moneda", value: accountStatus?.contract.currency! ?? "N/A" },
        {
          key: "precio de venta",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.salePrice!
            ) ?? "N/A",
        },
      ],
      paymentInfo: [
        {
          key: "cuota de entrada",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.entranceValue!
            ) ?? "N/A",
        },
        {
          key: "pago inicial",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.reserveValue!
            ) ?? "N/A",
        },
        {
          key: "saldo cuota de entrada",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.entryFeeBalance!
            ) ?? "N/A",
        },
        {
          key: "credito institucion financiera",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.balanceValue!
            ) ?? "N/A",
        },
      ],
      cancelationColumns: [
        {
          title: "Documento por cobrar",
          subcolumns: ["N°", "Documento", "Vcto.", "Valor"],
        },
        {
          title: "Cancelaciones",
          subcolumns: ["Rec. #", "Fecha", "Valor"],
        },
        {
          title: "Saldo doct.",
          subcolumns: ["Valor"],
        },
      ],
      cancelationRows: { rows: cancelationsData },
      totalsInfo: [
        {
          key: "Por vencer",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.valueToBeat!
            ) ?? "N/A",
        },
        {
          key: "Totales canc. por dcto.",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.totalCancelDiscount!
            ) ?? "N/A",
        },
        {
          key: "Porcentaje cobrado",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.percentageCharged!
            ) ?? "N/A",
        },
        {
          key: "Canc. por mora",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.valueCancelArrears!
            ) ?? "N/A",
        },
        {
          key: "Docts. vencidos",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.expiredDocumentsValue!
            ) ?? "N/A",
        },
        {
          key: "Canc. por pago excedente",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.valueCancelExcessPayment!
            ) ?? "N/A",
        },
        {
          key: "Int. mora a pagar",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.lateInterestPayable!
            ) ?? "N/A",
        },
        {
          key: "Neto cancelaciones",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.netValueCancel!
            ) ?? "N/A",
        },
        {
          key: "Total vencido",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.totalExpired!
            ) ?? "N/A",
        },
        {
          key: "Canc. com. cheq. prot.",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.valueCancelProtestedCheck!
            ) ?? "N/A",
        },
        {
          key: "Resumen de notas de crédito",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.ncValue!
            ) ?? "N/A",
        },
        {
          key: "Valor total por cobrar al cliente en USD",
          value:
            Formatter.numberWithCommasAndDots(
              accountStatus?.contract.totalValueChargedCustomer!
            ) ?? "N/A",
        },
      ],
    };
  }

  static fromChargedPortfolioToPdfData(
    chargedPortfolio: ChargedPortfolio[],
    startDate: Date,
    endDate: Date,
  ): ChargedPortfolioPdfData {
    return {
      logo: "./logo.png",
      title: "Cartera cobrada",
      info: [
        {
          key: "Fecha desde",
          value: DateAdapter.formatDate(startDate) ?? "N/A",
        },
        {
          key: "Fecha hasta",
          value: DateAdapter.formatDate(endDate) ?? "N/A",
        },
      ],
      contractsChargesColumns: [],
      contractsChargesRows: { rows: [] },
    };
  }
}
