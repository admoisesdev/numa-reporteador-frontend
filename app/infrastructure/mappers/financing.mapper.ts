import type { Financing } from "domain/entities";
import type { FinancingResponse } from "infrastructure/interfaces";
import { ChargeMapper } from "./charges.mapper";

export class FinancingMapper{
  static fromResponseFinancingToEntity(response: FinancingResponse): Financing{
    return {
      dividendBalanceValue: response.valor_saldo_div,
      dividendNumber: response.numero_dividendo,
      dividendType: response.tipo_dividendo,
      dividendValue: response.valor_dividendos,
      expirationDate: response.fecha_vencimiento,
      charges: response.charges.map(ChargeMapper.fromResponseChargesToEntity),
    };
  }
}