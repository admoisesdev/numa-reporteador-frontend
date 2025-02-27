import type {  FinancingResponse } from "./";

export interface ContractResponse {
  id: string;
  asesor_credito: string;
  cantidad_cuota_inicial: string;
  cliente_vendedor: string;
  cuota_reserv2: number;
  cuota_reserv8: number;
  descuento: number;
  empresa: string;
  estado: string;
  fecha_cierre: string;
  fecha_creacion: string;
  fecha_reserva: string;
  financiamiento_idvigente: number;
  int_mora_pagar: number;
  moneda: string;
  plazo_ce: number;
  porcentaje_cobrado: number;
  precio_lista: string;
  precioventa: string;
  proyecto: string;
  saldo_ce: number;
  tipo_contratoid: string;
  tipo_producto: string;
  ubicacion: string;
  valor_canc_cheq: number;
  valor_canc_mora: number;
  valor_canc_pag_exced: number;
  valor_contrato: string;
  valor_documentos_vencidos: number;
  valor_entrada: number;
  valor_nc: number;
  valor_neto_cancel: number;
  valor_por_vencer: number;
  valor_reserva: number;
  valor_saldo: number;
  valor_total_cob_client: number
  valor_total_vencido: number;
  valor_total_descuento: number;
  cliente_id: number;
}

export interface AccountStatusResponse {
  contract: ContractResponse;
  financing: FinancingResponse[];
}
