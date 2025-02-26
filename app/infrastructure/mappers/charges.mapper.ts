import type { Charge } from "domain/entities";
import type { ChargeResponse } from "infrastructure/interfaces";

export class ChargeMapper{
  static fromResponseChargesToEntity(response: ChargeResponse): Charge{
    return {
      chargeDate: response.fecha_cobro,
      chargedValue: response.valor_cobrado,
      dividendType: response.tipo_dividendo,
      receiptNumber: Number(response.recibo_num),
      reference: response.referencia,
    };
  }
}