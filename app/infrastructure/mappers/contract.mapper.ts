import { FinancingMapper } from "./financing.mapper";

import type {
  AccountStatus,
  ChargedPortfolio,
  Contract,
  FullContract,
  PortfolioAge,
} from "domain/entities";
import type {
  AccountStatusResponse,
  ChargedPortfolioResponse,
  ContractResponse,
  PortfolioAgeResponse,
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

  static fromResponsePortfolioAgeToEntity(
    response: PortfolioAgeResponse
  ): PortfolioAge { 
    return {
      project: response.proyecto,
      contract: response.contrato,
      location: response.ubicacion,
      constructionStatus: response.estado_construccion,
      progressPercentage: Number(response.por_avance),
      customer: response.cliente,
      saleDate: response.fecha_venta,
      deliveryDate: response.fecha_entrega,
      salePrice: Number(response.precioventa),
      totalCharged: Number(response.total_cobrado),
      chargedPercentage: Number(response.por_cobrado),
      entryBalance: Number(response.saldo_entrada),
      hipProcedure: Number(response.h_tramite),
      fStraight: Number(response.f_directo),
      from0to30: Number(response.de_0_30),
      from30to60: Number(response.de_30_60),
      from60to90: Number(response.de_60_90),
      moreThan90: Number(response.mayor_90),
      totalExpired: Number(response.total),
    };
  }
}
