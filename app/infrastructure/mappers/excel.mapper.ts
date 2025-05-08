import { DateAdapter } from "config/adapters";
import type { ChargedPortfolio, PortfolioAge } from "domain/entities";
import type {
  ChargedPortfolioExcelData,
  PortfolioAgeExcelData,
  ReceivablesExcelData,
  ReceivablesResponse,
} from "infrastructure/interfaces";

export class ExcelMapper {
  static fromChargedPortfolioToExcelData(
    data: ChargedPortfolio
  ): ChargedPortfolioExcelData {
    return {
      Contrato: data.contract,
      "Oficial de crédito": data.creditAdvisor,
      Ubicación: data.location,
      Cliente: data.customer,
      "Fecha entrega": DateAdapter.format(data.deliveryDate, "dd/MM/yyyy"),
      "Cuota inicial": data.initialFee,
      "Vencido menos de 30 días": data.expiredLess30Fb,
      "Vencido más de 30 días": data.expiredMore30Fb,
      "Al vencimiento": data.onTimeFb,
      Prepago: data.prepaymentFb,
      "Total cobrado": data.totalChargedFb,
      "Vencido menos de 30 días (CE)": data.expiredLess30Ce,
      "Vencido más de 30 días (CE)": data.expiredMore30Ce,
      "Al vencimiento (CE)": data.onTimeCe,
      "Prepago (CE)": data.prepaymentCe,
      "Total cobrado (CE)": data.totalChargedCe,
      "Total cobrado cliente": data.totalCustomer,
    };
  }

  static fromReceivablesToExcelData(
    data: ReceivablesResponse
  ): ReceivablesExcelData {
    return {
      Empresa: data.empresa,
      Proyecto: data.proyecto,
      "Oficial de credito": data.oficial_credito,
      Cliente: data.cliente,
      Teléfono: data.telefono,
      Email: data.email,
      "Oficial de cuenta": data.oficial_cuenta,
      Contrato: data.contrato,
      "Precio venta": data.precio_venta,
      Ubicación: data.ubicacion,
      "Tipo de documento": data.tipo_documento,
      Descripción: data.descripcion,
      "Fecha vencimiento": DateAdapter.format(
        data.fecha_vencimiento,
        "dd/MM/yyyy"
      ),
      Cuota: data.cuota,
      "Imp. pendiente": data.imp_pendiente,
      "Imp. bruto": data.imp_bruto,
    };
  }

  static fromPortfolioAgeToExcelData(
    data: PortfolioAge
  ): PortfolioAgeExcelData {
    return {
      Proyecto: data.project,
      Contrato: data.contract,
      Ubicación: data.location,
      "Estado Const.": data.constructionStatus,
      "% Avan.": data.progressPercentage,
      Cliente: data.customer,
      "Fecha venta": DateAdapter.format(data.saleDate, "dd/MM/yyyy"),
      "Fecha entrega": DateAdapter.format(data.deliveryDate, "dd/MM/yyyy"),
      "Precio de venta": data.salePrice,
      "Total cobrado": data.totalCharged,
      "Pago cubierto": data.chargedPercentage,
      "C. de entrada": data.entryBalance,
      "Hip Trámite": data.hipProcedure,
      "F. Directo": data.fStraight,
      "0 - 30": data.from0to30,
      "31 - 60": data.from30to60,
      "61 - 90": data.from60to90,
      "Más de 90": data.moreThan90,
      "Total vencido": data.totalExpired,
    };
  }
}
