import type {
  AccountStatus,
  ChargedPortfolio,
  PortfolioAge,
} from "domain/entities";
import type {
  AccountStatusPdfData,
  ChargedPortfolioPdfData,
  PortfolioAgePdfData,
} from "infrastructure/interfaces";

import { Formatter } from "config/helpers";
import { DateAdapter } from "config/adapters";

interface MainRow {
  mainRow: string[][];
  subRows?: string[][];
};


export class PdfMapper {
  private static accountStatusData(accountStatus: AccountStatus): MainRow[] {

    const data = accountStatus?.financing.map((financing) => {
      return {
        mainRow: [
          [
            financing.dividendNumber ?? "N/A",
            financing.dividendType ?? "N/A",
            DateAdapter.format(financing.expirationDate, "dd/MM/yyyy") ?? "N/A",
            Formatter.numberWithCommasAndDots(financing.dividendValue) ?? "N/A",
          ],
          ["", "", ""],
          [
            Formatter.numberWithCommasAndDots(financing.dividendBalanceValue) ??
              "N/A",
          ],
        ],
        subRows:
          financing.charges.map((charge) => {
            return [
              `${charge.reference} ${charge.dividendType}` || "N/A",
              "",
              charge.receiptNumber ?? "N/A",
              DateAdapter.format(charge.chargeDate, "dd/MM/yyyy") ?? "N/A",
              Formatter.numberWithCommasAndDots(charge.chargedValue) ?? "N/A",
              "",
            ];
          }) ?? [],
      };
    }) as MainRow[];

    return data;
  }

  private static chargedPortfolioData(
    chargedPortfolio: ChargedPortfolio[]
  ): MainRow[] {
    const totals = {
      initialFee: 0,
      expiredLess30Fb: 0,
      expiredMore30Fb: 0,
      onTimeFb: 0,
      prepaymentFb: 0,
      totalChargedFb: 0,
      expiredLess30Ce: 0,
      expiredMore30Ce: 0,
      onTimeCe: 0,
      prepaymentCe: 0,
      totalChargedCe: 0,
      totalCustomer: 0,
    };

    const data = chargedPortfolio.map((item) => {
      totals.initialFee += item.initialFee || 0;
      totals.expiredLess30Fb += item.expiredLess30Fb || 0;
      totals.expiredMore30Fb += item.expiredMore30Fb || 0;
      totals.onTimeFb += item.onTimeFb || 0;
      totals.prepaymentFb += item.prepaymentFb || 0;
      totals.totalChargedFb += item.totalChargedFb || 0;
      totals.expiredLess30Ce += item.expiredLess30Ce || 0;
      totals.expiredMore30Ce += item.expiredMore30Ce || 0;
      totals.onTimeCe += item.onTimeCe || 0;
      totals.prepaymentCe += item.prepaymentCe || 0;
      totals.totalChargedCe += item.totalChargedCe || 0;
      totals.totalCustomer += item.totalCustomer || 0;
      return {
        mainRow: [
          [
            item.contract,
            item.creditAdvisor,
            item.location,
            item.customer,
            DateAdapter.format(item.deliveryDate, "dd/MM/yyyy"),
            Formatter.numberWithCommasAndDots(item.initialFee.toFixed(2)),
          ],
          [
            Formatter.numberWithCommasAndDots(item.expiredLess30Fb.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.expiredMore30Fb.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.onTimeFb.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.prepaymentFb.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.totalChargedFb.toFixed(2)),
          ],
          [
            Formatter.numberWithCommasAndDots(item.expiredLess30Ce.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.expiredMore30Ce.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.onTimeCe.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.prepaymentCe.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.totalChargedCe.toFixed(2)),
          ],
          [Formatter.numberWithCommasAndDots(item.totalCustomer.toFixed(2))],
        ],
      };
    });

    data.push({
      mainRow: [
        [
          "",
          "",
          "Totales",
          "Por",
          "Proyecto",
          Formatter.numberWithCommasAndDots(totals.initialFee.toFixed(2)) ??
            "N/A",
        ],
        [
          totals.expiredLess30Fb,
          totals.expiredMore30Fb,
          totals.onTimeFb,
          totals.prepaymentFb,
          totals.totalChargedFb,
        ].map(
          (value) =>
            Formatter.numberWithCommasAndDots(value.toFixed(2)) ?? "N/A"
        ),
        [
          totals.expiredLess30Ce,
          totals.expiredMore30Ce,
          totals.onTimeCe,
          totals.prepaymentCe,
          totals.totalChargedCe,
        ].map(
          (value) =>
            Formatter.numberWithCommasAndDots(value.toFixed(2)) ?? "N/A"
        ),
        [
          Formatter.numberWithCommasAndDots(totals.totalCustomer.toFixed(2)) ??
            "N/A",
        ],
      ],
    });

    return data;
  }

  private static portfolioAgeData(portfolioAge: PortfolioAge[]): MainRow[] {
    const totals = {
      salePrice: 0,
      totalCharged: 0,
      entryBalance: 0,
      hipProcedure: 0,
      fStraight: 0,
      from0to30: 0,
      from30to60: 0,
      from60to90: 0,
      moreThan90: 0,
      totalExpired: 0,
    };

    const data = portfolioAge.map((item) => {
      totals.salePrice += item.salePrice || 0;
      totals.totalCharged += item.totalCharged || 0;
      totals.entryBalance += item.entryBalance || 0;
      totals.hipProcedure += item.hipProcedure || 0;
      totals.fStraight += item.fStraight || 0;
      totals.from0to30 += item.from0to30 || 0;
      totals.from30to60 += item.from30to60 || 0;
      totals.from60to90 += item.from60to90 || 0;
      totals.moreThan90 += item.moreThan90 || 0;
      totals.totalExpired += item.totalExpired || 0;

      return {
        mainRow: [
          [
            item.project,
            item.contract,
            item.location,
            item.constructionStatus ?? "N/A",
            `${Formatter.numberWithCommasAndDots(
              item.progressPercentage.toFixed(2)
            )}%`,
            item.customer,
            DateAdapter.format(item.saleDate, "dd/MM/yyyy"),
            DateAdapter.format(item.deliveryDate, "dd/MM/yyyy"),
            Formatter.numberWithCommasAndDots(item.salePrice.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.totalCharged.toFixed(2)),
            `${Formatter.numberWithCommasAndDots(
              item.chargedPercentage.toFixed(2)
            )}%`,
          ],
          [
            Formatter.numberWithCommasAndDots(item.entryBalance.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.hipProcedure.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.fStraight.toFixed(2)),
          ],
          [
            Formatter.numberWithCommasAndDots(item.from0to30.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.from30to60.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.from60to90.toFixed(2)),
            Formatter.numberWithCommasAndDots(item.moreThan90.toFixed(2)),
          ],
          [],
          [Formatter.numberWithCommasAndDots(item.totalExpired.toFixed(2))],
        ],
      };
    });

    data.push({
      mainRow: [
        [
          "",
          "",
          "Totales",
          "Por",
          "Proyecto",
          "",
          "",
          "",
          Formatter.numberWithCommasAndDots(totals.salePrice),
          Formatter.numberWithCommasAndDots(totals.totalCharged),
          "",
        ],
        [totals.entryBalance, totals.hipProcedure, totals.fStraight].map(
          (value) =>
            Formatter.numberWithCommasAndDots(value.toFixed(2)) ?? "N/A"
        ),
        [
          totals.from0to30,
          totals.from30to60,
          totals.from60to90,
          totals.moreThan90,
        ].map(
          (value) =>
            Formatter.numberWithCommasAndDots(value.toFixed(2)) ?? "N/A"
        ),
        [Formatter.numberWithCommasAndDots(totals.totalExpired.toFixed(2))],
      ],
    });

    const totalIndices = {
      totalCharged: (totals.totalCharged / totals.salePrice) * 100,
      entryBalance: (totals.entryBalance / totals.salePrice) * 100,
      hipProcedure: (totals.hipProcedure / totals.salePrice) * 100,
      fStraight: (totals.fStraight / totals.salePrice) * 100,
      from0to30: (totals.from0to30 / totals.totalExpired) * 100,
      from30to60: (totals.from30to60 / totals.totalExpired) * 100,
      from60to90: (totals.from60to90 / totals.totalExpired) * 100,
      moreThan90: (totals.moreThan90 / totals.totalExpired) * 100,
    };

    const totalExpiredIndice =
      totalIndices.from0to30 +
      totalIndices.from30to60 +
      totalIndices.from60to90 +
      totalIndices.moreThan90;

    data.push({
      mainRow: [
        [
          "",
          "",
          "",
          "Índice",
          "",
          "",
          "",
          "",
          "",
          `${Formatter.numberWithCommasAndDots(
            totalIndices.totalCharged.toFixed(2)
          )}%`,
          "",
        ],
        [
          `${Formatter.numberWithCommasAndDots(
            totalIndices.entryBalance.toFixed(2)
          )}%`,
          `${Formatter.numberWithCommasAndDots(
            totalIndices.hipProcedure.toFixed(2)
          )}%`,
          `${Formatter.numberWithCommasAndDots(
            totalIndices.fStraight.toFixed(2)
          )}%`,
        ],
        [
          `${Formatter.numberWithCommasAndDots(
            totalIndices.from0to30.toFixed(2)
          )}%`,
          `${Formatter.numberWithCommasAndDots(
            totalIndices.from30to60.toFixed(2)
          )}%`,
          `${Formatter.numberWithCommasAndDots(
            totalIndices.from60to90.toFixed(2)
          )}%`,
          `${Formatter.numberWithCommasAndDots(
            totalIndices.moreThan90.toFixed(2)
          )}%`,
        ],
        [`${Formatter.numberWithCommasAndDots(totalExpiredIndice)}%`],
      ],
    });

    const overdueDebt = (totals.totalExpired / totals.entryBalance) * 100;
    const overdueDebtFrom31to60Days = (totals.from30to60 / totals.totalExpired) * 100;

    data.push(
      {
        mainRow: [
          ["", "", "", "", "", "", "", "", "", "", ""],
          ["", "", ""],
          ["Índice de", "morosidad", "deuda", "vencida"],
          [`${Formatter.numberWithCommasAndDots(overdueDebt.toFixed(2))}%`],
        ],
      },
      {
        mainRow: [
          ["", "", "", "", "", "", "", "", "", "", ""],
          ["", "", ""],
          ["Resumen", "vencidos", "de 31 a 60", "días"],
          [`${Formatter.numberWithCommasAndDots(overdueDebtFrom31to60Days.toFixed(2))}%`],
        ],
      }
    );

    return data;
  }

  static fromAccountStatusToPdfData(
    accountStatus: AccountStatus,
    customerName: string
  ): AccountStatusPdfData {
    const cancelationsData = PdfMapper.accountStatusData(accountStatus);

    return {
      logo: "./logo.png",
      title: "Numa S.A.S",
      subtitle: "Estado de cuenta",
      info: [
        {
          key: "fecha del corte",
          value: DateAdapter.format(new Date(), "dd/MM/yyyy") ?? "N/A",
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
          value:
            DateAdapter.format(
              accountStatus?.contract.closingDate!,
              "dd/MM/yyyy"
            ) ?? "N/A",
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
          key: "Canc. por dcto.",
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
          key: "Docs. vencidos",
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
    endDate: Date
  ): ChargedPortfolioPdfData {
    const chargedPortfolioRows =
      PdfMapper.chargedPortfolioData(chargedPortfolio);

    return {
      logo: "./logo.png",
      title: "Cartera cobrada",
      info: [
        {
          key: "Fecha desde",
          value: DateAdapter.format(startDate, "dd/MM/yyyy") ?? "N/A",
        },
        {
          key: "Fecha hasta",
          value: DateAdapter.format(endDate, "dd/MM/yyyy") ?? "N/A",
        },
      ],
      contractsChargesColumns: [
        {
          title: " ",
          subcolumns: [
            "Contrato",
            "Oficial de crédito",
            "Ubicación",
            "Cliente",
            "Fecha entrega",
            "Cuota inicial",
          ],
        },
        {
          title: "Hipoteca Cobrada",
          subcolumns: [
            "Vencido < 30 días",
            "Vencido > 30 días",
            "Al vencimiento",
            "Prepago",
            "Total Cobrado",
          ],
        },
        {
          title: "Letra Cliente Cobrada",
          subcolumns: [
            "Vencido < 30 días",
            "Vencido > 30 días",
            "Al vencimiento",
            "Prepago",
            "Total Cobrado",
          ],
        },
        {
          title: "Total",
          subcolumns: ["Cobrado Cliente"],
        },
      ],
      contractsChargesRows: { rows: chargedPortfolioRows },
    };
  }

  static fromPortfolioAgeToPdfData(
    portfolioAge: PortfolioAge[],
    expiredDate: Date
  ): PortfolioAgePdfData {
    const portfolioAgeRows = PdfMapper.portfolioAgeData(portfolioAge);

    return {
      logo: "./logo.png",
      title: "Reporte Antiguedad de Cartera",
      subtitle: "Numa S.A.S",
      info: [
        {
          key: "Fecha de corte",
          value: DateAdapter.format(expiredDate, "dd/MM/yyyy") ?? "N/A",
        },
      ],
      portfolioAgeColumns: [
        {
          title: " ",
          subcolumns: [
            "Proyecto",
            "Contrato",
            "Ubicación",
            "Estado Const.",
            "% Avan.",
            "Cliente",
            "Fecha venta",
            "Fecha entrega",
            "Precio de venta",
            "Total Cobrado",
            "% Cobrado",
          ],
        },
        {
          title: "Saldo",
          subcolumns: ["C. Entrada", "Hip Trámite", "F. Directo"],
        },
        {
          title: "Vencidos (días)",
          subcolumns: ["0 - 30", "31 - 60", "61 - 90", "Más de 90"],
        },
        {
          title: "Total",
          subcolumns: ["Vencido"],
        },
      ],
      portfolioAgeRows: {
        rows: portfolioAgeRows,
      },
    };
  }
}
