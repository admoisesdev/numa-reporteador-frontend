import type { Charge } from "domain/entities";
import type { ChargeResponse } from "infrastructure/interfaces";

export class ChargeMapper{
  static fromResponseChargesToEntity(response: ChargeResponse): Charge{
    return {
      
    }
  }
}