import { FinancingMapper } from "./financing.mapper";
import { ChargeMapper } from "./charges.mapper";

import type { AccountStatus, Contract, FullContract } from "domain/entities";
import type { AccountStatusResponse, ContractResponse } from "infrastructure/interfaces";


export class ContractMapper{
  static fromResponseContractsCustomerToEntity(response: ContractResponse): Contract{
    return {
      id: response.id,
      location: response.ubicacion,
      sellerCustomer: response.cliente_vendedor,
      project: response.proyecto,
    }
  }

  static fromResponseFullContractToEntity(response: ContractResponse): FullContract { 
    return {
      ...ContractMapper.fromResponseContractsCustomerToEntity(response),
      balanceValue: response.valor_saldo,
      closingDate: response.fecha_cierre,
      creditAdvisor: response.asesor_credito,
      currency: response.moneda,
      entranceValue: response.valor_entrada,
      entryFeeBalance: response.saldo_ce,
      reserveValue: response.valor_reserva,
      salePrice: response.precioventa,
      status: response.estado,
      typeOfGood: response.tipo_producto,
    }
  }

  static fromResponseAccountStatusToEntity(response: AccountStatusResponse): AccountStatus { 
    return {
      contract: ContractMapper.fromResponseFullContractToEntity(
        response.contract
      ),
      financing: response.financing.map(FinancingMapper.fromResponseFinancingToEntity),
      charges: response.charges.map(ChargeMapper.fromResponseChargesToEntity),
    };
  }
}