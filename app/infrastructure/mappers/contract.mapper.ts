import { FinancingMapper } from "./financing.mapper";
import { ChargeMapper } from "./charges.mapper";

import type {
  AccountStatus,
  ChargedPortfolio,
  Contract,
  FullContract,
} from "domain/entities";
import type {
  AccountStatusResponse,
  ChargedPortfolioResponse,
  ContractResponse,
} from "infrastructure/interfaces";

export class ContractMapper {
  static fromResponseContractsCustomerToEntity(
    response: ContractResponse
  ): Contract {
    return {
      id: response.id,
      location: response.ubicacion,
      sellerCustomer: response.cliente_vendedor,
      project: response.proyecto,
    };
  }

  static fromResponseFullContractToEntity(
    response: ContractResponse
  ): FullContract {
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
      valueCancelProtestedCheck: response.valor_canc_cheq,
      valueCancelExcessPayment: response.valor_canc_pag_exced,
      valueToBeat: response.valor_por_vencer,
    };
  }

  static fromResponseAccountStatusToEntity(
    response: AccountStatusResponse
  ): AccountStatus {
    return {
      contract: ContractMapper.fromResponseFullContractToEntity(
        response.contract
      ),
      financing: response.financing.map(
        FinancingMapper.fromResponseFinancingToEntity
      ),
    };
  }

  static fromResponseChargedPortfolioToEntity(
    response: ChargedPortfolioResponse
  ): ChargedPortfolio {
    return {
      contract: response.contrato,
      creditAdvisor: response.oficial_credito,
      location: response.ubicacion,
      customer: response.cliente,
      deliveryDate: response.fecha_entrega,
      initialFee: Number(response.cuota_inicial),
      expiredLess30Fb: Number(response.vencida_menor_30_fb),
      expiredMore30Fb: Number(response.vencida_mayor_30_fb),
      onTimeFb: Number(response.al_tiemopo_fb),
      prepaymentFb: Number(response.prepago_fb),
      totalChargedFb: Number(response.total_cobradofb),
      expiredLess30Ce: Number(response.vencida_menor_30_ce),
      expiredMore30Ce: Number(response.vencida_mayor_30_ce),
      onTimeCe: Number(response.al_tiemopo_ce),
      prepaymentCe: Number(response.prepago_ce),
      totalChargedCe: Number(response.total_cobradoce),
      totalCustomer: Number(response.total),
    };
  }
}
