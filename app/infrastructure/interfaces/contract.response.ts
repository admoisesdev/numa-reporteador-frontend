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

export interface ChargedPortfolioResponse {
  contrato: string;
  oficial_credito: string;
  ubicacion: string;
  cliente: string;
  fecha_entrega: string;
  cuota_inicial: string;
  vencida_menor_30_fb: string;
  vencida_mayor_30_fb: string;
  al_tiemopo_fb: string;
  prepago_fb: string;
  total_cobradofb: string;
  vencida_menor_30_ce: string;
  vencida_mayor_30_ce: string;
  al_tiemopo_ce: string;
  prepago_ce: string;
  total_cobradoce: string;
  total: string;
}


export interface ReceivablesResponse {
  empresa: string;
  proyecto: string;
  oficial_credito: string;
  cliente: string;
  telefono: string;
  email: string;
  oficial_cuenta: string;
  contrato: string;
  precio_venta: string;
  ubicacion: string;
  tipo_documento: string;
  descripcion: string;
  fecha_vencimiento: string;
  cuota: string;
  imp_pendiente: string;
  imp_bruto: string;
}

export interface PortfolioAgeResponse {
  proyecto: string;
  contrato: string;
  ubicacion: string;
  estado_construccion: string;
  por_avance: string;
  cliente: string;
  fecha_venta: string;
  fecha_entrega: string;
  precioventa: string;
  total_cobrado: string;
  por_cobrado: string;
  saldo_entrada: string;
  h_tramite: string;
  f_directo: string;
  de_0_30: string;
  de_30_60: string;
  de_60_90: string;
  mayor_90: string;
  total: string;
}
