export interface ChargeResponse {
  id: number;
  concepto: string;
  cuenta_plan: string;
  fecha_cobro: string;
  fecha_vcto_cobro: string;
  id_transaccion: number;
  nombre_cuenta: string;
  nro_documento: string;
  num_dividendo: number;
  recibo_num: string;
  referencia: string;
  tipo_comprobante: string;
  tipo_dividendo: string;
  tipo_transaccion: string;
  valor_cobrado: number;
  id_contrato: string;
}