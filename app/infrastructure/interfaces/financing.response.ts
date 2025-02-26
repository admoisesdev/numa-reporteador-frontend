export interface FinancingResponse {
  id: number;
  cabecera_factura: number;
  cabecera_id: number;
  estado_dividendo: string;
  estado: string;
  fecha_creacion: string;
  fecha_pago_div: string;
  fecha_refinanciamiento: string;
  fecha_vencimiento: string;
  mostrar_reporte: boolean;
  numero_dividendo: number;
  tipo_dividendo: string;
  total_dividendo: number;
  valor_dividendos: number;
  valor_interes_div: number;
  valor_mora: number;
  valor_pagado_div: number;
  valor_saldo_div: number;
  id_contrato: string;
}