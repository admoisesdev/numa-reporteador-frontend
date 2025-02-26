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
      expiredDocumentsValue: response.valor_documentos_vencidos,
      lateInterestPayable: response.int_mora_pagar,
      ncValue: response.valor_nc,
      netValueCancel: response.valor_neto_cancel,
      percentageCharged: response.porcentaje_cobrado,
      reserveValue: response.valor_reserva,
      salePrice: response.precioventa,
      status: response.estado,
      totalCancelDiscount: response.valor_total_descuento,
      totalExpired: response.valor_total_vencido,
      totalValueChargedCustomer: response.valor_total_cob_client,
      typeOfGood: response.tipo_producto,
      valueCancelArrears: response.valor_canc_mora,
      valueCancelCheck: response.valor_canc_cheq, //!
      valueCancelExcessPayment: response.valor_canc_pag_exced,
      valueToBeat: response.valor_por_vencer,
    };
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