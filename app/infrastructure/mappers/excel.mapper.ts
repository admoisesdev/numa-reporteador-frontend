import type { ChargedPortfolio } from "domain/entities";
import type { ChargedPortfolioExcelData, ReceivablesExcelData, ReceivablesResponse } from "infrastructure/interfaces";

export class ExcelMapper {
  static fromChargedPortfolioToExcelData(
    data: ChargedPortfolio
  ): ChargedPortfolioExcelData {
    return {
      Contrato: data.contract,
      "Oficial de crédito": data.creditAdvisor,
      Ubicación: data.location,
      Cliente: data.customer,
      "Fecha entrega": data.deliveryDate,
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

  static fromReceivablesToExcelData(data: ReceivablesResponse): ReceivablesExcelData{
    return {
      Empresa: data.empresa,
      Proyecto: data.proyecto,
      "Oficial de credito": data.oficial_credito,
      Cliente: data.cliente,
      "Teléfono": data.telefono,
      Email: data.email,
      "Oficial de cuenta": data.oficial_cuenta,
      Contrato: data.contrato,
      "Precio venta": data.precio_venta,
      Ubicación: data.ubicacion,
      "Tipo de documento": data.tipo_documento,
      Descripción: data.descripcion,
      "Fecha vencimiento": data.fecha_vencimiento,
      Cuota: data.cuota,
      "Imp. pendiente": data.imp_pendiente,
      "Imp. bruto": data.imp_bruto,
    }
  }
}